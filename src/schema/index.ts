import { z } from "zod";
// Zod Schema for Validation
export const registerSchema = z
  .object({
    email: z.string().email("Invalid email address").nonempty("Email is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .nonempty("Password is required"),
    confirmPassword: z
      .string()
      .nonempty("Please confirm your password"),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export const loginSchema = z
  .object({
    email: z.string().email("Invalid email address").nonempty("Email is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .nonempty("Password is required"),
  
  })

  export const accountSettingsSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string().min(10, "Phone number is required"),
  });
  
  export const billingAddressSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    companyName: z.string().optional(),
    streetAddress: z.string().min(1, "Street address is required"),
    country: z.string().min(1, "Country is required"),
    state: z.string().min(1, "State is required"),
    zipCode: z.string().min(1, "Zip code is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number is required"),
  });
  
  export const changePasswordSchema = z.object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must match")
      // .refine((val, ctx) => val === ctx.parent.newPassword, {
      //   message: "Passwords do not match",
      // }),
  });
  

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type AccountSettingsData = z.infer<typeof accountSettingsSchema>;
export type BillingAddressData = z.infer<typeof billingAddressSchema>;
export type ChangePasswordData = z.infer<typeof changePasswordSchema>;
