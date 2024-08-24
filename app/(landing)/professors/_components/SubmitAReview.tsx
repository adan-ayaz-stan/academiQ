"use client";

import { Button } from "@/components/ui/button";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import { Image, Loader } from "lucide-react";
import CreatableSelect from "react-select/creatable";
import { DEPARTMENTS, MAJORS } from "./constants";
import AsyncSelect from "react-select/async";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { TProfessor } from "@/lib/db/schema/professors";

const formSchema = z.object({
  is_scrape: z
    .enum(["true", "false"])
    .transform((val) => val === "true")
    .optional(),
  scrape_link: z.string().optional(),
  professor: z.object({
    name: z.string(),
    college: z.string(),
    department: z
      .object({ value: z.string(), label: z.string() })
      .transform((val) => {
        return val.label;
      }),
    subjects: z
      .array(z.object({ label: z.string(), value: z.string() }))
      .transform((val) => {
        return val.map((v) => v.label);
      }),
  }),
  review: z
    .string()
    .min(10, { message: "Please write a review with some material." }),
  rating: z.coerce.number().min(1).max(5),
});

type TSearchOption = Omit<TProfessor, "subjects" | "tags"> & {
  label: string;
  value: string;
  img?: string;
  subjects: string[];
  tags: string[];
};

export default function SubmitAReview() {
  const [activeTab, setActiveTab] = useState<
    "step-1" | "step-2" | "step-3" | "step-4" | "step-5"
  >("step-1");

  const promiseOptions = (inputValue: string) =>
    new Promise<TSearchOption[]>((resolve) => {
      setTimeout(() => {
        if (inputValue === "") {
          resolve([]);
        }

        resolve([
          {
            label: inputValue,
            value: inputValue,
            name: "Professor Moriarty",
            college: "University of California, Berkeley",
            department: "Computer Science",
            subjects: [
              "Artificial Intelligence",
              "Machine Learning",
              "Computer Science",
            ],
            tags: ["AI", "Machine Learning", "Computer Science"],
          },
        ]);
      }, 1000);
    });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      scrape_link: "",
      rating: 4,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    // Create Embeddings Here

    console.log(values);
  }

  function onScrapingChoice(choice: boolean) {
    if (choice) {
      setActiveTab("step-2");
    } else {
      setActiveTab("step-4");
      //   api?.scrollTo(2);
    }
  }

  async function onSubmitScraping() {
    const link = form.getValues("scrape_link");

    const linkSchema = z.string().url();

    const valid = linkSchema.safeParse(link);

    if (valid.success) {
      // Initiate scraping process
      setActiveTab("step-3");

      //   Scrape here

      await new Promise((resolve) => setTimeout(resolve, 2000));

      //   Proceed to step 4

      setActiveTab("step-4");
    } else {
      form.setError("scrape_link", { message: "Invalid link" });
    }
  }

  async function onProfessorDetailsSubmit() {
    // Check fields for validity

    await form.trigger("professor");

    const name = form.getFieldState("professor.name");
    const college = form.getFieldState("professor.college");
    const department = form.getFieldState("professor.department");
    const subjects = form.getFieldState("professor.subjects");

    if (name.error) {
      form.setError("professor.name", {
        message: "Please enter Professor's Name",
      });
    }

    if (college.error) {
      form.setError("professor.college", {
        message: "Please enter Professor's College",
      });
    }

    if (department.error) {
      console.log(department.error);
      form.setError("professor.department", {
        message: "Please enter Professor's Department",
      });
    }

    if (subjects.error) {
      form.setError("professor.subjects", {
        message: "Please enter Professor's Subjects",
      });
    }

    if (!name.error && !college.error && !department.error && !subjects.error) {
      setActiveTab("step-5");
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Tabs defaultValue={activeTab} value={activeTab}>
            <TabsContent
              value="step-1"
              className="animate-in fade-in-0 duration-1000"
            >
              <div className="space-y-8">
                <h2>Professor Selection</h2>

                {/* Existing Professor's Search Box */}
                <AsyncSelect
                  cacheOptions
                  defaultOptions
                  placeholder="Search for an existing professor"
                  classNames={{
                    container: () => "w-full text-sm",
                    menuList: () =>
                      "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-scampi-500 scrollbar-corner-scampi-500",
                  }}
                  components={{
                    NoOptionsMessage: () => (
                      <p className="text-sm text-center py-2 px-4">
                        Nothing could be found.
                      </p>
                    ),
                    Option: (props) => {
                      return (
                        <div
                          onClick={() => {
                            // Set form professor field to selected value
                            form.setValue("professor", {
                              name: props.data.name,
                              college: props.data.college,
                              department: props.data.department,
                              // @ts-ignore
                              subjects: props.data.subjects.map((s) => ({
                                label: s,
                                value: s,
                              })),
                            });
                            setActiveTab("step-5");
                          }}
                          className="text-sm flex flex-row items-center gap-4 p-2 cursor-pointer hover:bg-scampi-100 transition"
                        >
                          {props.data.img ? (
                            <img
                              src={props.data.img}
                              alt="prof-mor"
                              className="h-16 w-16 object-contain"
                            />
                          ) : (
                            <div className="bg-scampi-300 p-2">
                              <Image className="h-12 w-12" />
                            </div>
                          )}
                          <div className="space-y-1">
                            <strong>{props.data.name}</strong>
                            <p className="text-sm text-muted-foreground">
                              {props.data.college}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {props.data.department}
                            </p>
                          </div>
                        </div>
                      );
                    },
                  }}
                  styles={{
                    control: (base) => ({
                      ...base,
                      boxShadow: "none",
                      borderColor: "#5e63b6",
                      borderRadius: "0.75rem",
                      padding: "0.2rem",
                      "&:hover": {
                        borderColor: "#5e63b6",
                      },
                      "&:focus": {
                        boxShadow: "none",
                        borderColor: "#5e63b6",
                      },
                    }),
                    multiValue: (base) => ({
                      ...base,
                      backgroundColor: "#d1ddf4",
                    }),
                    placeholder: (base) => ({
                      ...base,
                      color: "#b4c6ed",
                    }),
                    menuList: (base) => ({
                      ...base,
                      maxHeight: "200px",
                    }),
                  }}
                  loadOptions={promiseOptions}
                />

                {/*  */}

                <FormField
                  control={form.control}
                  name="is_scrape"
                  render={({ field }) => (
                    <FormItem className="space-y-3 pointer-events-auto">
                      <FormControl>
                        <RadioGroup
                          onValueChange={(e) => {
                            field.onChange(e);
                            onScrapingChoice(e === "true");
                          }}
                          defaultValue={`${field.value}`}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0 border-2 rounded pl-4 active:bg-scampi-300 transition duration-100">
                            <FormControl>
                              <RadioGroupItem value={"true"} />
                            </FormControl>
                            <FormLabel className="font-normal w-full p-4 cursor-pointer">
                              Scrape information from link
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0 border-2 rounded pl-4 active:bg-scampi-300 transition duration-100">
                            <FormControl>
                              <RadioGroupItem value="false" />
                            </FormControl>
                            <FormLabel className="font-normal w-full p-4 cursor-pointer">
                              Enter Info Manually
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </TabsContent>
            <TabsContent
              value="step-2"
              className="animate-in fade-in-0 duration-1000"
            >
              <div className="min-h-[50vh] flex flex-col gap-6 justify-center">
                <h2>Enter link to professor's page</h2>
                <FormField
                  control={form.control}
                  name="scrape_link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL Link</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://university.com/professor/moriarty"
                          className="pointer-events-auto"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-scampi-700">
                        This is the link that will be scraped for information.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="button"
                  onClick={onSubmitScraping}
                  className="w-fit ml-auto px-8 pointer-events-auto"
                >
                  Scrape
                </Button>
              </div>
            </TabsContent>

            <TabsContent
              value="step-3"
              className="animate-in fade-in-0 duration-1000"
            >
              <div className="min-h-[50vh] flex items-center justify-center flex-col gap-6">
                <Loader className="w-12 h-12 animate-spin" />
                <p>Scraping inprogress...</p>
              </div>
            </TabsContent>
            <TabsContent
              value="step-4"
              className="animate-in fade-in-0 duration-1000"
            >
              <div className="min-h-[50vh] max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-scampi-500 scrollbar-corner-scampi-500 flex flex-col gap-6">
                <h3>Professor details</h3>

                <FormField
                  control={form.control}
                  name="professor.name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Moriarty" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="professor.college"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>College</FormLabel>
                      <FormControl>
                        <Input placeholder="UC Berkeley" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="professor.department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <CreatableSelect
                        placeholder="Department of Computer Science"
                        options={
                          DEPARTMENTS.sort((a, b) =>
                            a.label.localeCompare(b.label)
                          ) as any
                        }
                        classNames={{
                          container: () => "w-full text-sm",
                          menuList: () =>
                            "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-scampi-500 scrollbar-corner-scampi-500",
                        }}
                        styles={{
                          control: (base) => ({
                            ...base,
                            boxShadow: "none",
                            borderColor: "#5e63b6",
                            borderRadius: "0.75rem",
                            padding: "0.2rem",
                            "&:hover": {
                              borderColor: "#5e63b6",
                            },
                            "&:focus": {
                              boxShadow: "none",
                              borderColor: "#5e63b6",
                            },
                          }),
                          placeholder: (base) => ({
                            ...base,
                            color: "#b4c6ed",
                          }),
                          menuList: (base) => ({
                            ...base,
                            maxHeight: "200px",
                          }),
                        }}
                        className="pointer-events-auto"
                        {...field}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="professor.subjects"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subjects</FormLabel>
                      <CreatableSelect
                        isMulti
                        placeholder="Computer Science"
                        options={
                          MAJORS.sort((a, b) =>
                            a.label.localeCompare(b.label)
                          ) as any
                        }
                        classNames={{
                          container: () => "w-full text-sm",
                          menuList: () =>
                            "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-scampi-500 scrollbar-corner-scampi-500",
                        }}
                        styles={{
                          control: (base) => ({
                            ...base,
                            boxShadow: "none",
                            borderColor: "#5e63b6",
                            borderRadius: "0.75rem",
                            padding: "0.2rem",
                            "&:hover": {
                              borderColor: "#5e63b6",
                            },
                            "&:focus": {
                              boxShadow: "none",
                              borderColor: "#5e63b6",
                            },
                          }),
                          multiValue: (base) => ({
                            ...base,
                            backgroundColor: "#d1ddf4",
                          }),
                          placeholder: (base) => ({
                            ...base,
                            color: "#b4c6ed",
                          }),
                          menuList: (base) => ({
                            ...base,
                            maxHeight: "200px",
                          }),
                        }}
                        className="pointer-events-auto"
                        {...field}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="button"
                  className="w-fit ml-auto px-8 pointer-events-auto"
                  onClick={onProfessorDetailsSubmit}
                >
                  Submit
                </Button>
              </div>
            </TabsContent>
            <TabsContent
              value="step-5"
              className="animate-in fade-in-0 duration-1000 flex flex-col gap-6"
            >
              <div className="space-y-2">
                <h3>Write a review</h3>
                <p className="text-sm">
                  You are writing a review on{" "}
                  <strong>{form.getValues("professor.name")}</strong>
                </p>
              </div>

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
                      <span className="text-sm">Don&apos;t recommend</span>
                      <span className="text-sm">Recommend</span>
                    </div>
                    <FormControl>
                      <Slider
                        min={0}
                        max={5}
                        step={1}
                        defaultValue={[field.value]}
                        onValueChange={(v: number[]) => field.onChange(v[0])}
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
            </TabsContent>
          </Tabs>
        </form>
      </Form>
    </div>
  );
}
