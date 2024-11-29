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
interface IReview {
  _id: string;
  comment: string;
  rating: number; // Rating (1 to 5)
  createdAt: string;
  user: {
    name: string;
  };
}
export interface IProduct {
  _id: string;
  name: string;
  slug: ISlug;
  category: ICategory;
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
