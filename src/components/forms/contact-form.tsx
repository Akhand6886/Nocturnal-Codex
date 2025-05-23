
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters.").max(50, "Name must be at most 50 characters."),
  email: z.string().email("Invalid email address."),
  subject: z.string().min(5, "Subject must be at least 5 characters.").max(100, "Subject must be at most 100 characters."),
  message: z.string().min(10, "Message must be at least 10 characters.").max(1000, "Message must be at most 1000 characters."),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const { toast } = useToast();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(data: ContactFormValues) {
    form.control.disabled = true;
    console.log("Form submitted (demonstration only):", data);
    try {
      // Simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Form Submitted (Demonstration)",
        description: "Thank you! This form is for demonstration purposes only. Your message has not been sent or saved.",
        variant: "default",
      });
      form.reset();
    } catch (error) {
      console.error("Error in form submission simulation: ", error);
      toast({
        title: "Error",
        description: "Something went wrong during the form submission simulation.",
        variant: "destructive",
      });
    } finally {
       form.control.disabled = false;
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6 border border-border rounded-lg shadow-lg bg-card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Ada Lovelace" {...field} disabled={form.formState.isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="ada@example.com" {...field} disabled={form.formState.isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input placeholder="Inquiry about..." {...field} disabled={form.formState.isSubmitting} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Your detailed message..."
                  className="min-h-[120px]"
                  {...field}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Submitting..." : "Send Message (Demo)"}
          {!form.formState.isSubmitting && <Send className="ml-2 h-4 w-4" />}
        </Button>
      </form>
    </Form>
  );
}
