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

export interface IProduct {
  _id: string;
  name: string;
  category: ICategory;
  price: number;
  originalPrice?: number;
  discount?: number | null;
  savings: number;
  image: {
    asset: {
      url: string; // URL of the product image
    };
  };
  isOutOfStock: boolean;
  rating: number;
  description: string;
}
