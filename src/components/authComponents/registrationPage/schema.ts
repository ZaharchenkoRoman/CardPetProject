import {z} from "zod";
import {Infer} from "next/dist/compiled/superstruct";


export const schema =
  z.object({
    password: z.string().min(8, "Password must be at least 8 characters")
      .max(20, "Password is too long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number").trim(),
    email: z.string().min(1, "Email is required").email("Please enter a valid email address").trim(),
    confirmPassword: z.string()
  })
    .refine(
      (data) => data.password === data.confirmPassword,
      {
        message: "Passwords must match",
        path: [ "confirmPassword" ]
      }
    );

export type schemaType = Infer<typeof schema>