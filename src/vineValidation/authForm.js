import { z } from 'zod';

export const FirstStepSchema = z.object({
  firstName: z.string().min(2, "le prénom est requis"),
  lastName: z.string().min(2, "le nom est requis"),
  email: z.string().email("email invalide"),
  phoneNumber: z.string().regex(/^\d{9,15}$/, "numéro de téléphone invalide"),
  dob: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "date invalide",
  }).nullable(),
});

export const validateEmailSchema=z.object({
    email: z.string().email("email invalide"),
})

export const SecondStepSchema = z.object({
  country: z.string().min(4, "le pays est requis"),
  city: z.string().min(4, "la ville est requise"),
  address: z.string().min(4, "adresse invalide").nullable(),
  firstLangage: z.string().min(4, "première langue requise"),
  secondLangage: z.string().min(4, "seconde langue requise").nullable(),
});

export const ThirdStepSchema = z
  .object({
    password: z
      .string()
      .min(8, "8 caractères minimum"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "mot de passe invalide",
    path: ["confirmPassword"],
  });


export function validateFirstStep(formData) {
  const result = FirstStepSchema.safeParse(formData);
  if (result.success) {
    return { isValid: true, data: result.data, errors: null };
  } else {
    return {
      isValid: false,
      data: null,
      errors: result.error.flatten().fieldErrors,
    };
  }
}

export function validateSecondStep(formData) {
  const result = SecondStepSchema.safeParse(formData);
  if (result.success) {
    return { isValid: true, data: result.data, errors: null };
  } else {
    return {
      isValid: false,
      data: null,
      errors: result.error.flatten().fieldErrors,
    };
  }
}

export function validateThirdStep(formData) {
  const result = ThirdStepSchema.safeParse(formData);
  if (result.success) {
    return { isValid: true, data: result.data, errors: null };
  } else {
    return {
      isValid: false,
      data: null,
      errors: result.error.flatten().fieldErrors,
    };
  }
}

export function validateEmail(formData){
   const result = validateEmailSchema.safeParse(formData);
  if (result.success) {
    return { isValid: true, data: result.data, errors: null };
  } else {
    return {
      isValid: false,
      data: null,
      errors: result.error.flatten().fieldErrors,
    };
  }
}
