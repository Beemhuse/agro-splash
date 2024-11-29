import { client } from "@/sanity/client";

/**
 * Updates a user in the Sanity database.
 * @param {Object} user - The user object to update.
 * @returns {Promise<Object>} - The updated user document.
 */

interface User {
    _id: string;
    [key: string]: unknown; // Allow additional properties
  }
  
export async function updateUser(user: User): Promise<object> {
  if (!user._id) {
    throw new Error("User ID is required to update the user.");
  }

  const { _id, ...fieldsToUpdate } = user;

  try {
    const updatedUser = await client
      .patch(_id) // Select the document by its ID
      .set(fieldsToUpdate) // Update with the provided fields
      .commit(); // Commit the changes

    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update the user.");
  }
}
