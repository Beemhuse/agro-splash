import { client } from './client';
// import { ensureUserExists } from '@/utils/checkUser';


export const getUserByEmail = async (email: string) => {
  const query = '*[_type == "customer" && email == $email][0]';
  const params = { email };
  try {
    const user = await client.fetch(query, params);
    return user;
  } catch (error) {
    console.error('Error fetching user by email:', error);
    return null;
  }
};


// export async function getAdminByEmail(email) {
//   const query = `*[_type == "admin" && email == $email][0]{
//     _id,
//     name,
//     email,
//     password,
//     role
//   }`;
//   return client.fetch(query, { email });
// }

export interface Customer {
    _id?: string; // Sanity document ID, optional as it's generated on creation
    _type: "customer"; // Specifies the schema type
    name?: string; // Customer's email
    email: string; // Customer's email
    password: string; // Hashed password
    phone: string; // Hashed password
    address: string; // Hashed password
    createdAt?: string; // Creation date in ISO format, optional for new objects
    updatedAt?: string; // Last updated date in ISO format, optional for new objects
    isActive: boolean; // Indicates if the customer is active
  }
  

  export const createUser = async (user: Omit<Customer, "_id" | "createdAt" | "updatedAt">) => {
    try {
      // Add default values for `createdAt` and `updatedAt` if needed
      const userData = {
        ...user,
        _type: "customer",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
  
      // Only pass valid fields to the Sanity client
      const sanityResponse = await client.create(userData);
      return sanityResponse as Customer; // Ensure returned type matches Customer interface
    } catch (sanityError) {
        if (sanityError instanceof Error) {
            console.error("Error creating user:", sanityError.message);
            return { error: "Internal Server Error", message: sanityError.message };
          } else {
            console.error("Unknown error occurred:", sanityError);
            return { error: "Internal Server Error", message: "An unknown error occurred" };
          }
    }
  };
// export const createAdmin = async (user) => {
//   try {
//     const sanityResponse = await client.create({ _type: 'admin', ...user });
//     // console.log('User saved to Sanity:', sanityResponse);
//     return sanityResponse;
//   } catch (sanityError) {
//     console.error('Error saving user to Sanity:', sanityError);
//     return { error: 'Internal Server Error', message: sanityError.message };
//   }
// };


// export const createOrder = async ({
//   products,
//   total,
//   email,
//   serviceFee,
//   name,
//   streetAddress,
//   apartment,
//   townCity,
//   phone,
//   transactionRef,
//   notes,
//   customer
// }) => {
//   try {
//     // Ensure the user exists or create a new one if necessary
//     // const ensuredUserId = await ensureUserExists(customer?._ref);

//     // Map products to an array of references with unique keys
//     const cartItemsWithKeys = products.map((item, index) => ({
//       _key: `orderedItem_${index}`, // Unique key for each item
//       _type: 'reference',
//       _ref: item._id, // Reference to the product document in Sanity
//     }));

//     // Ensure that the serviceFee and user references are valid strings
//     const serviceFeeRef = typeof serviceFee === 'string' ? serviceFee : serviceFee._ref;
//     // const userRef = typeof ensuredUserId === 'string' ? ensuredUserId : ensuredUserId._id;
//     // Create the order document in Sanity
//     const order = await client.create({
//       _type: 'order',
//       products: cartItemsWithKeys, // Use the mapped products array
//       total,
//       serviceFee: serviceFeeRef,
//       transactionDate: new Date(), // Use current date for transactionDate
//       email,
//       name,
//       streetAddress,
//       apartment,
//       townCity,
//       phone,
//       transactionRef,
//       notes,
//       customer, 
//       status: 'pending', // Set the initial status to "Pending"

//     });

//     // Update the order with its own ID as orderId (optional)
//     await client.patch(order._id).set({ orderId: order._id }).commit();

//     return order;
//   } catch (sanityError) {
//     console.error('Error saving order to Sanity:', sanityError);
//     return { error: 'Internal Server Error', message: sanityError.message };
//   }
// };


// export const createTransaction = async ({
//   order,
//   amount,
//   transactionRef,
//   userId,
//   status = 'pending', // Default value is 'pending'
//   method
// }) => {
  
//   console.log("transaction ==>>>", order)
//   try {
//     // Your logic to create a transaction document in Sanity
//     // Generate a shorter custom ID for the transaction
//     const shortUuid = uuidv4().split('-')[0]; // Take only the first segment of the UUID
//     const customTransactionId = `txn-${shortUuid}`;


//     const transaction = await client.create({
//       _type: 'transaction',
//       id: customTransactionId,
//       order,
//       amount,
//       transactionRef,
//       userId,
//       transactionDate: new Date(), // Use current date for transactionDate
//       status,
//       method
//     });

//     console.log('Transaction saved to Sanity:', transaction);

    
//     return transaction;
//   } catch (sanityError) {
//     console.error('Error saving transaction to Sanity:', sanityError);
//     return { error: 'Internal Server Error', message: sanityError.message };
//   }
// };

// export const getTransactionRefs = async () => {
//   try {
//     // Query Sanity to fetch all transactions and select the transactionRef field
//     const transactions = await client.fetch(`*[_type == 'transaction']{transactionRef}`);

//     // Extract and return an array of transactionRef values
//     const transactionRefs = transactions.map(transaction => transaction.transactionRef);
    
//     return transactionRefs;
//   } catch (error) {
//     console.error('Error fetching transaction references:', error);
//     throw error;
//   }
// };


// export const updateTransactionStatus = async (transactionRef, newStatus) => {
//   try {
//     // Query Sanity to fetch the transaction with the given transactionRef
//     const transaction = await client.fetch(`*[_type == 'transaction' && transactionRef == $transactionRef][0]`, { transactionRef });

//     // Check if transaction exists
//     if (!transaction) {
//       throw new Error(`Transaction with transactionRef ${transactionRef} not found`);
//     }

//     // Update the status field with the new status value
//     const updatedTransaction = await client
//       .patch(transaction._id) // Use the _id of the fetched transaction
//       .set({ status: newStatus })
//       .commit();

//     return updatedTransaction;
//   } catch (error) {
//     console.error('Error updating transaction status:', error);
//     throw error;
//   }
// };