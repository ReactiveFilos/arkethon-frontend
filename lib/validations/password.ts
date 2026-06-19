import { z } from "zod";

export const resetPasswordEmailFormSchema = z.object({
  email: z.email("Email non valida"),
});

const passwordBaseSchema = z.object({
  password: z.string().min(8, "La password deve essere almeno 8 caratteri"),
  confirmPassword: z
    .string()
    .min(8, "La password deve essere almeno 8 caratteri"),
});

export const resetPasswordFormSchema = passwordBaseSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    path: ["confirmPassword"],
    message: "Le password non coincidono",
  }
);

export const firstAccessFormSchema = passwordBaseSchema
  .extend({
    privacyPolicy: z.boolean().refine((val) => val === true, {
      message: "Devi accettare la Privacy Policy per continuare",
    }),
    termsAndConditions: z.boolean().refine((val) => val === true, {
      message: "Devi accettare i Termini e Condizioni per continuare",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Le password non coincidono",
  });

export const changePasswordFormSchema = z
  .object({
    oldPassword: z.string().min(1, "La password attuale è obbligatoria"),
    password: z.string().min(8, "La password deve essere almeno 8 caratteri"),
    confirmPassword: z
      .string()
      .min(8, "La password deve essere almeno 8 caratteri"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Le password non coincidono",
  })
  .refine((data) => data.oldPassword !== data.password, {
    path: ["password"],
    message: "La nuova password deve essere diversa da quella attuale",
  });
