// Interface for the Customer
export interface ICustomer {
    name: string;
    email: string;
    phone: string;
    address: string;
  }
  
  // Interface for the Product
  export interface IProduct {
    _id: string;
    name: string;
    price: number;
    image: {
        asset: {
          url: string;
        };
      }[]
      }
  
  // Interface for ProductItem in the Order (Product + Quantity)
  export interface IProductItem {
    product: IProduct;
    quantity: number;
  }
  
  // Interface for the Order
  export interface IOrder {
    _id: string;
    total: number;
    products: IProductItem[];
    serviceFee: {
        fee: number,
        _id: string
    };
    customer: ICustomer;
    status: string; // e.g., "Processing", "Completed"
    streetAddress: string; // e.g., "Processing", "Completed"
    createdAt: string; // ISO date string
  }
  
  // Interface for the Transaction
  export interface ITransaction {
    _id: string;
    transactionRef: string;
    amount: number;
    status: string; // e.g., "Pending", "Completed"
    method: string; // e.g., "paystack", "paypal"
    transactionDate: string; // ISO date string
    order: IOrder; // Reference to the related Order
  }
  