import axios from "axios";

/**
 * Handles errors in a standardized way.
 * 
 * @param {unknown} error - The error object.
 * @returns {string} - A descriptive error message.
 */
export const handleGenericError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    // Axios error handling
    if (error.response) {
      // Server responded with a status code outside of the 2xx range
      const responseData = error.response.data;

      return (
        responseData?.message || // General error message
        (Array.isArray(responseData?.email) ? responseData.email.join(", ") : "") || // Email-specific error array
        responseData?.detail || // Django-like detail error
        responseData?.error || // Generic error key
        error.message // Axios error message
      );
    } else if (error.request) {
      // Request was made, but no response was received
      return "No response received from the server. Please check your network.";
    } else {
      // Any other errors in the request setup
      return error.message || "An unexpected error occurred.";
    }
  }

  if (error instanceof Error) {
    // Non-Axios error (native JavaScript error)
    return error.message;
  }

  // Fallback for unknown error types
  return "An unknown error occurred.";
};
