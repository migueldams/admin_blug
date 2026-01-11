import { z } from "zod"


export const SignInValidation = z.object({
  email: z.string({ message: "champs obligatoire" }).min(2).max(50).regex(/^\S*$/, { message: "Le nom d'utilisateur ne doit pas contenir d'espaces" }), // ❌ interdit espaces
  password: z.string({ message: "champs obligatoire" })

});

export const PostValidation = z.object({
  title: z.string().max(200),
  file: z.array(z.instanceof(File)).min(1, "File is required"),
  excerpt: z.string().max(200),
})

export const EventsValidation = z.object({
  title: z.string().max(200),
  date: z.date(),
  time: z.string().max(100),
  location: z.string().max(200),
  description: z.string().max(1000),
  types: z.string().max(100),
  status: z.string().max(100),
})
