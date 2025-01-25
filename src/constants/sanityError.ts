// types/sanityErrors.ts
// types/sanityErrors.ts

export type SanityErrorDetails = {
    message: string; // A human-readable error message
    code: string;    // Error code (e.g., 'invalid_request', 'not_found', etc.)
    status: number;  // HTTP status code (e.g., 400, 500)
    error?: string;  // Additional error detail, often used for validation errors
    errors?: Array<{ path: string; message: string; code: string }>; // Validation errors
  };
  
  export class SanityClientErrorResponse extends Error {
    statusCode: number;
    responseBody: SanityErrorDetails;
  
    constructor(message: string, statusCode: number, responseBody: SanityErrorDetails) {
      super(message);
      this.statusCode = statusCode;
      this.responseBody = responseBody;
      this.name = 'SanityClientErrorResponse';
    }
  }
  