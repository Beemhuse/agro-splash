import { client } from "@/sanity/client";

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
