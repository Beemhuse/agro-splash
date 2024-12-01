import { client } from "@/sanity/client";
import { buildOrdersQuery, getCustomerDetailsQuery } from "@/sanity/queries";

/**
 * Fetch product details with the favourite status for a specific user.
 * 
 * @param {string} productId - The ID of the product.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<object>} - The product with the favourite status.
 */
export const getProductWithFavouriteStatus = async (productId: string, userId: string): Promise<object> => {
  try {
    const product = await client.fetch(
      `*[_type == "product" && _id == $productId][0] {
        _id,
        name,
        price,
        description,
        "isFavourite": defined(*[_type == "favouriteBy" && userId == $userId && productId._ref == ^._id][0]),
        category-> {
          _id,
          name
        },
        image[] {
          asset-> {
            url
          }
        }
      }`,
      { productId, userId }
    );
    return product;
  } catch (error) {
    console.error("Error fetching product with favourite status:", error);
    throw new Error("Failed to fetch product details.");
  }
};


export const getServiceFees = async () => {
  const query = `*[_type == "serviceFee"]{_id, location, fee}`;
  const data = await client.fetch(query);
  return data || [];
};


export const getOrderHistory = async (customerId: string) => {
  const query = buildOrdersQuery(customerId);
  const data = await client.fetch(query);
  return data;
};

export const getOrderById = async (orderId: string) => {
  const query = `
    *[_type == "order" && _id == $orderId][0]{
      _id,
      transactionRef,
      total,
      products[] {
        product->{
          _id,
          name,
          price,
          "image": image.asset->url
        },
        quantity
      },
      discount,
      shippingCost,
      serviceFee->{
        _id,
        location,
        fee
      },
      customer->{
        name,
        email,
        phone,
        address
      },
      status,
      paymentMethod,
      createdAt
    }
  `;
  const data = await client.fetch(query, { orderId });
  return data;
};


export const fetchCustomerDetails = async (customerId: string) => {
  try {
    const query = getCustomerDetailsQuery(customerId);
    const userDetails = await client.fetch(query, { customerId });
    return userDetails;
  } catch (error) {
    console.error("Error fetching customer details:", error);
    return null;
  }
};
