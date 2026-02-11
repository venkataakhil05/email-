import { z } from "zod";
export const createUserDTO = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
});
export const updateUserDTO = z.object({
    name: z.string().min(3).optional(),
    email: z.string().email().optional(),
});