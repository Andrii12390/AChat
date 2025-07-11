import { z } from 'zod';

const emailSchema = z.string().trim().min(1, 'Email is required').email('Invalid email');

export const LoginFormSchema = z.object({
  email: emailSchema,
  password: z.string().trim().min(1, 'Password is required'),
});

export const RegistrationFormSchema = z
  .object({
    email: emailSchema,
    username: z
      .string()
      .trim()
      .min(4, 'Username cannot be shorter than 4 characters')
      .max(25, 'Username cannot be longer than 25 characters'),
    password: z
      .string()
      .trim()
      .min(4, 'Password cannot be shorter than 4 characters')
      .max(25, 'Password cannot be shorter than 4 characters'),
    confirmPassword: z.string().trim().min(1, 'Confirmation password is required'),
  })
  .refine(values => values.password === values.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type LoginValues = z.infer<typeof LoginFormSchema>;
export type RegistrationValues = z.infer<typeof RegistrationFormSchema>;
