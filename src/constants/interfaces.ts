export interface ITopCategory {
  name: string; // Define the type for a category
  image: {
    asset: {
      url: string; // URL of the product image
    };
  };
}
export interface ICategory {
  _id: string;
  name: string; // Define the type for a category
  subCategories?: ISubcategory[]; // Define the type for a category
}
export interface ISlug {
  current: string; // Define the type for a category
}
export interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: {
    asset: {
      url: string; // URL of the product image
    };
  };
}
export interface IPromotion {
  _id: string; // Unique identifier for the promotion
  brand: string; // Brand name
  description: string; // Description of the promotion
  image: {
    asset: {
      url: string; // URL of the product image
    };
  };
  backgroundColor: string; // Hex code for the background color
}
export interface ICourse {
  _id: string; // Unique identifier for the promotion
  title: string; // Brand name
  videoLink: string;
  slug: ISlug; // Description of the promotion
  price: string; // Description of the promotion
  rating: number; // Description of the promotion
  thumbnail: {
    asset: {
      url: string; // URL of the product image
    };
  };
  backgroundColor: string; // Hex code for the background color
}
export interface IBook {
  _id: string; // Unique identifier for the book
  title: string; // Title of the book
  author: string; // Author of the book
  description: string; // Description of the book
  coverImage: {
    asset: {
      url: string; // URL of the book's cover image
    };
  };
  price: number; // Price of the book
  rating: number; // Rating of the book (0 to 5)
  slug: ISlug; // URL-friendly slug derived from the title
  publisher: string; // Publisher of the book
  publishedDate: string; // Date the book was published (ISO format)
  isbn: string; // ISBN of the book
}
interface IReview {
  _id: string;
  comment: string;
  rating: number; // Rating (1 to 5)
  createdAt: string;
  user: {
    name: string;
  };
}
export interface ISubcategory {
  name: string;
  id: string;
}
export interface IProduct {
  _id: string;
  name: string;
  slug: ISlug;
  category: ICategory;
  subcategory?: ISubcategory;  // Optional field for subcategory
  favouriteBy?: boolean;
  price: number;
  originalPrice?: number;
  discount?: number | null;
  savings: number;
  image: {
    asset: {
      url: string; // URL of the product image
    };
  }[];
  additionalInfo?: string;
  isOutOfStock: boolean;
  rating: number;
  description: string;
  review?: IReview[]
}



// src/constants/interfaces.ts
export interface IProducts {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: {
    asset: {
      url: string;
    };
  };
}

export interface ICustomer {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface IOrder {
  _id: string;
  transactionRef: string;
  total: number;
  products: IProducts[];
  discount: number;
  shippingCost: number;
  customer: ICustomer;
  status: string; // 1 = Order Received, 2 = Processing, etc.
  paymentMethod: string;
  orderDate: string;
  _createdAt: string
}
