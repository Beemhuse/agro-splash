import { handleGenericError } from "@/utils/errorHandler";
import axios from "axios";

/**
 * Perform a POST request.
 *
 * @param {string} endpoint - The API endpoint to send the POST request to.
 * @param {Record<string, any>} data - The request payload.
 * @param {AxiosRequestConfig} [config] - Optional Axios configuration.
 * @returns {Promise<T>} - The response data.
 * @throws {Error} - Throws an error if the request fails.
 */
export const postRequest = async <T>(
    endpoint: string,
    data: Record<string, unknown>,
    // config: AxiosRequestConfig = {}
  ): Promise<T> => {
    try {
      const response = await axios.post<T>(endpoint, data);
      return response.data;
    } catch (error: unknown) {
      // Handle the error and throw a standardized error
      throw handleGenericError(error);
    }
  }