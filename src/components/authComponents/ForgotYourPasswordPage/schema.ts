import z from "zod";
import { InferType } from "prop-types";

export const schema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address").trim(),
});

export type EmailRecoveryType = InferType<typeof schema>;
