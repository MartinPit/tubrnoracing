import z from "zod";

export const partnerFormSchema = z.object({
  company: z.string().min(2, "Company name required"),
  phone: z.string().min(5, "Contact phone required"),
  email: z.string().email("Invalid email address"),
  tier: z.string().min(1, "Please select a tier"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})
