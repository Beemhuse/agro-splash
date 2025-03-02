import { client } from "@/sanity/client";

/**
 * Toggle favourite status for a product.
 * 
 * @param {string} productId - The ID of the product.
 * @param {string} userId - The ID of the user.
 */
export const addFavourite = async (productId: string, userId: string) => {
    try {
      const product = await client.fetch(
        `*[_type == "product" && _id == $productId][0] {
          "isAlreadyFavourite": defined(favouriteBy[_ref == $userId])
        }`,
        { productId, userId }
      );
  
      // If the user has already favorited the product, skip the action
      if (product?.isAlreadyFavourite) {
        return;
      }
  
      // Add user to favorites
      await client
        .patch(productId)
        .setIfMissing({ favouriteBy: [] }) // Ensure the field exists
        .append("favouriteBy", [{ _type: "reference", _ref: userId, _key: Date.now().toString()  }]) // Add the user reference
        .commit();
  
      console.log("User added to favourites");
    } catch (error) {
      console.error("Failed to add to favourites:", error);
    }
  };
  export const removeFavourite = async (productId: string, userId: string) => {
    try {
      const product = await client.fetch(
        `*[_type == "product" && _id == $productId][0] {
          "isAlreadyFavourite": defined(favouriteBy[_ref == $userId])
        }`,
        { productId, userId }
      );
  
      // If the user hasn't favorited the product, skip the action
      if (!product?.isAlreadyFavourite) {
        console.log("User has not favorited this product");
        return;
      }
  
      // Remove user from favorites
      await client
        .patch(productId)
        .unset([`favouriteBy[_ref == "${userId}"]`]) // Remove the specific user reference
        .commit({ returnDocuments: false });
  
      console.log("User removed from favourites");
    } catch (error) {
      console.error("Failed to remove from favourites:", error);
    }
  };
    
  export const isProductFavourited = async (productId: string, userId: string) => {
    try {
      // Fetch only whether the user is in the favouriteBy array
      const isFavourite = await client.fetch(
        `count(*[_type == "product" && _id == $productId && favouriteBy[_ref == $userId]]) > 0`,
        { productId, userId }
      );
      return isFavourite; // Returns true if the user exists in the favouriteBy array
    } catch (error) {
      console.error("Failed to check favourite status:", error);
      return false;
    }
  };
  
  