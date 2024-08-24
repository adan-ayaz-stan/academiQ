"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { TProfessor } from "@/lib/db/schema/professors";
import {
  BookIcon,
  BoxIcon,
  ImageIcon,
  Loader2,
  LocateIcon,
  Star,
  TagIcon,
} from "lucide-react";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createReview,
  getProfessorReviews,
} from "@/server/actions/reviews.actions";
import { toast } from "sonner";
import { useRef } from "react";

const formSchema = z.object({
  title: z.string().min(2).max(100),
  review: z.string().min(2),
  rating: z.coerce.number().min(1).max(5),
});

export default function ProfessorProfile({
  data,
}: {
  data: TProfessor & { id: string };
}) {
  const queryClient = useQueryClient();
  const dialogCloseRef = useRef<HTMLButtonElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      review: "",
      rating: 4,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      toast.loading("Creating Review...", { id: "create" });
      await createReview(data.id, {
        title: values.review,
        rating: values.rating,
        content: values.review,
      });

      toast.success("Review Created", { id: "create" });
      dialogCloseRef.current?.click();
      await queryClient.invalidateQueries({ queryKey: ["professor"] });
    } catch (err) {
      toast.error("Failed to Create Review", { id: "create" });
    }
  }
  return (
    <div className="relative w-full max-w-xl p-4 flex flex-row gap-8 rounded-md bg-white shadow-primary">
      {/* College Logo */}
      {/* {data. && (
        <Image
          src={data.collegeIcon}
          alt="college"
          height={100}
          width={100}
          className="h-16 w-16 absolute top-4 right-8"
        />
      )} */}

      {/*  */}
      {data.image ? (
        <Image
          src={data.image}
          alt="hero"
          height={500}
          width={500}
          className="w-56 h-72 border rounded-sm object-contain"
        />
      ) : (
        <div className="w-56 h-72 border rounded-sm bg-scampi-100 flex">
          <ImageIcon className="m-auto h-12 w-12 text-muted-foreground" />
        </div>
      )}
      <div className="w-full flex-1 flex flex-col justify-end">
        <p className="px-2 bg-yellow-400 w-fit rounded font-bold text-white flex items-center gap-1">
          <Star />
          {data.rating}
        </p>
        <p className="text-sm text-scampi-500 font-semibold mb-auto">
          {data.totalReviews} Reviews
        </p>

        <h3>{data.name}</h3>
        <p className="flex gap-2 items-center hover:text-xl transition-all duration-300">
          <LocateIcon /> {data.college}
        </p>
        <p className="flex gap-2 items-center hover:text-xl transition-all duration-300">
          <BoxIcon /> {data.department}
        </p>
        <p className="flex gap-2 items-center hover:text-xl transition-all duration-300">
          <TagIcon /> {(data.tags as unknown as string[]).join(", ")}
        </p>
        <p className="flex gap-2 items-center hover:text-xl transition-all duration-300">
          <BookIcon />
          {(data.subjects as unknown as string[]).join(", ")}
        </p>

        <Drawer>
          <DrawerTrigger asChild>
            <Button className="mt-4">See Reviews</Button>
          </DrawerTrigger>
          <DrawerContent className="h-[calc(100vh-4rem)] p-4">
            <div className="w-full flex justify-between items-center gap-4">
              <h1>{data.name}</h1>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Add Your Review</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogClose ref={dialogCloseRef} className="hidden" />
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-8"
                    >
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Awesome experience.."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="review"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Review</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us a little bit about yourself and your experience with the professor..."
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="rating"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Rating</FormLabel>
                            <div className="mt-4 flex justify-between items-center">
                              <span className="text-sm">
                                Don&apos;t recommend
                              </span>
                              <span className="text-sm">Recommend</span>
                            </div>
                            <FormControl>
                              <Slider
                                min={0}
                                max={5}
                                step={1}
                                defaultValue={[field.value]}
                                onValueChange={(v: number[]) =>
                                  field.onChange(v[0])
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        className="w-fit ml-auto px-8 pointer-events-auto"
                      >
                        Submit Review
                      </Button>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Reviews Go Here */}
            <ProfessorReviews professor_id={data.id} />
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}

function ProfessorReviews({ professor_id }: { professor_id: string }) {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["professor", professor_id, "reviews"],
    queryFn: () => getProfessorReviews(professor_id),
  });

  return (
    <div>
      {isLoading && (
        <Loader2 className="mx-auto mt-12 h-12 w-12 animate-spin text-scampi-900" />
      )}
      {isSuccess && (
        <div className="flex flex-row flex-wrap gap-4 mt-8">
          {data?.map((review) => (
            <div
              key={review.id}
              className="w-full max-w-xl flex flex-col border-2 p-4 rounded-xl bg-scampi-100 border-primary text-primary font-semibold"
            >
              <p>{review.content}</p>
              <p className="w-fit ml-auto mt-auto flex items-center gap-1 p-2 px-4 bg-primary rounded text-white">
                <Star />
                {review.rating}
              </p>
            </div>
          ))}
        </div>
      )}
      {isSuccess && !isLoading && data?.length === 0 && (
        <p className="text-scampi-500 text-center font-bold text-lg mt-12">
          No reviews yet
        </p>
      )}
    </div>
  );
}
