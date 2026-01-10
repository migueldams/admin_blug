import { z } from "zod"


export const SignInValidation = z.object({
  email: z.string({ message: "champs obligatoire" }).min(2).max(50).regex(/^\S*$/, { message: "Le nom d'utilisateur ne doit pas contenir d'espaces" }), // ❌ interdit espaces
  password: z.string({ message: "champs obligatoire" })

});

export const PostValidation = z.object({
  title: z.string().max(200),
  file: z.custom<File[]>(),
  excerpt: z.string().max(200),
})
