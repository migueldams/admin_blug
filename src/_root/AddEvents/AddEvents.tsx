import React from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader
} from "@/components/ui/card"
import { EventsValidation} from '@/lib/validation/index'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast, Toaster } from "sonner"
import { useNavigate } from "react-router-dom"
import Loader from '@/components/shared/Loader'
import logoPost from '@/assets/icons/add-post.svg'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { ChevronDownIcon } from "lucide-react"
import { useCreateEvents } from '@/lib/react_query/querieAndMutation'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function AddEvents({ post }: { post?: any }) {
  const { mutateAsync: createEvents, isPending } = useCreateEvents();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const form = useForm<z.infer<typeof EventsValidation>>({
    resolver: zodResolver(EventsValidation),
    defaultValues: {
      title: post?.title ?? "",
      location: "",
      description: "",
      types: "",
      status: "upcoming",
      date: undefined,
      time: "10:30:00",
    },
  });

  async function onSubmit(data: z.infer<typeof EventsValidation>) {

    console.log(data);
    await createEvents(data);
    toast.success("Event created successfully");
    navigate("/layout/home");

  }

  return (
    <Card className="bg-black text-white border-none sm:w-full md:w-2/3 h-screen">
      <Toaster position="top-right" />

      <CardHeader>
        <div className="flex gap-4 items-center">
          <img src={logoPost} alt="" width={40} />
          <p className="font-semibold text-3xl">Create Article</p>
        </div>
        <CardDescription className="text-xl">
          Help us improve by reporting bugs you encounter.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="grid grid-cols-1 gap-10">

            {/* TITLE */}
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-xl">Title</FieldLabel>
                  <Input {...field} className="bg-gray-700 h-40 px-10 text-2xl" />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />

            {/* DESCRIPTION */}
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-xl">Description</FieldLabel>
                  <Input {...field} className="bg-gray-700 h-40" />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />

            {/* DATE */}
            <Controller
              name="date"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Label>Date</Label>

                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button variant="outline">
                        {field.value
                          ? field.value.toLocaleString()
                          : "Select date"}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          setOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>

                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />


            {/* TIME */}
            <Controller
              name="time"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <Label>Time</Label>
                  <Input type="time" {...field} />
                </Field>
              )}
            />

            {/* TYPE */}
            <Controller
              name="types"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <Label>Type of event</Label>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-[180px] bg-gray-700 border-2 border-white">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="salon">Salon</SelectItem>
                        <SelectItem value="conference">Conference</SelectItem>
                        <SelectItem value="atelier">Atelier</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />

            {/* LOCATION */}
            <Controller
              name="location"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <Label>Location</Label>
                  <Input {...field} className="bg-gray-700" />
                </Field>
              )}
            />

          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex justify-end gap-4">
        <Button variant="outline" onClick={() => form.reset()}>
          Reset
        </Button>
        <Button type="submit" form="form-rhf-demo" className="bg-indigo-700">
          {isPending ? <Loader /> : "Submit"}
        </Button>
      </CardFooter>
    </Card>
  );
}




export default AddEvents