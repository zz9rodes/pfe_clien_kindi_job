import { z } from 'zod';

export const FirstStepSchema = z.object({
  firstName: z.string().min(2, "first name required"),
  lastName: z.string().min(2, "last name required"),
  email: z.string().email("invalid email"),
  phoneNumber: z.string().regex(/^\d{9,15}$/, "invalid phone number"),
  dob: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "invalid date",
  }).nullable(),
});

export const validateEmailSchema=z.object({
    email: z.string().email("invalid email"),
})

export const SecondStepSchema = z.object({
  country: z.string().min(4, "country is required"),
  city: z.string().min(4, "city required"),
  address: z.string().min(4, "invalid address").nullable(),
  firstLangage: z.string().min(4, "first language required"),
  secondLangage: z.string().min(4, "second language required").nullable(),
});

export const ThirdStepSchema = z
  .object({
    password: z
      .string()
      .min(8, "min 8 caracters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "invalid password",
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
