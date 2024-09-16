import {z} from 'zod';

export const passwordSchema = z.string().min(5, {message: "enter correct password"});

export const formLoginSchema = z.object({
  username: z.string().min(5, {message: "enter correct username"}),
  password: passwordSchema,
});

export const formRegisterSchema = formLoginSchema.merge(
  z.object({
    confirmPassword: passwordSchema,
  })
).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

export type TFormLoginValues = z.infer<typeof formLoginSchema>;
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>;