import React from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { PostValidation } from '@/lib/validation/index'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import FileUploader from '@/_root/AddBlog/FileUploader'
import { Input } from "@/components/ui/input"
import { toast, Toaster } from "sonner"
import { useNavigate } from "react-router-dom"
import Loader from '@/components/shared/Loader'
import logoPost from '@/assets/icons/add-post.svg'
import { useCreatBlogs } from '@/lib/react_query/querieAndMutation'

function AddBlog({ post }: { post?: any }) {


  const { mutateAsync: createPosts, isPending: isPostCreate, isSuccess } = useCreatBlogs()
  const navigate = useNavigate()
  const [uploadProgress, setUploadProgress] = React.useState(0);


  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      title: post ? post?.title : "",
      file: [],
      excerpt: post ? post?.location : "",
    },
  })

  async function onSubmit(data: z.infer<typeof PostValidation>) {
    setUploadProgress(0);
    const formPost = { ...data }
    const NewPost = await createPosts({
      formPost, onProgress: (progress:any) => {
        setUploadProgress(progress);
      }
    })

    if (!NewPost) {
      toast.error('error on create post, try again.')
    }

    if (isSuccess) {
      navigate('/layout')
    }

  }


  return (
    <Card className=" bg-black text-white border-none sm:w-full md:w-2/3">
      <Toaster position="top-right" />
      <CardHeader className="w-full">
        <div className='flex  justify-start gap-4 items-center h-30'>
          <img src={logoPost} alt="" width={40} />
          <p className='font-semibold text-3xl '>Create Blug</p>
        </div>
        <CardDescription className="text-xl">
          Help us improve by reporting bugs you encounter.
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full ">
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="grid grid-col-2 gap-10 h-[80%]">
            <div className='w-full '>
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title " className="text-xl text-white">
                      title
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-title"
                      placeholder="Login button not working on mobile"
                      autoComplete="on"
                      className="bg-gray-700 h-20 px-10 text-2xl font-semibold"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} className="text-white" />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="file"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-description" className="text-xl">
                      Add content blug
                    </FieldLabel>
                    <FileUploader fieldChange={field.onChange} mediaUrl={post?.imageUrl} />
                    <div
                      className="bg-indigo-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                    <FieldDescription>
                      Include steps to reproduce, expected behavior, and what
                      actually happened.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
            <div className='w-full '>
              <Controller
                name="excerpt"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title " className="text-xl">
                      Add excerpt
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-title"
                      placeholder="Login button not working on mobile"
                      autoComplete="on"
                      className="bg-gray-700 h-20"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} className="text-white" />
                    )}
                  </Field>
                )}
              />

            </div>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="w-full ">
        <Field orientation="horizontal" className="flex justify-end">
          <Button type="button" variant="outline" onClick={() => form.reset()} className="text-black hover:bg-gray-700">
            Reset
          </Button>
          <Button type="submit" form="form-rhf-demo" className="bg-indigo-700 transition hover:bg-indigo-800">
            {isPostCreate ? <div className='flex '><Loader /> Loading...</div> : "Submit"}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}

export default AddBlog