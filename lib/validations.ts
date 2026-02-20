import { z } from "zod";

export const waitlistSchema = z.object({
    full_name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    company_name: z.string().min(2, "Company name is required"),
    company_size: z.string().min(1, "Company size is required"),
    seo_spend: z.string().min(1, "Please select current SEO spend"),
    frustration: z.string().max(300, "Maximum 300 characters").optional(),
});

export type WaitlistFormData = z.infer<typeof waitlistSchema>;
