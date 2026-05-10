"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2, ArrowLeft } from "lucide-react";
import { useAuth } from "@/api/hooks/use-auth";
import { toast } from "sonner";

const forgotSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export default function ForgotPasswordPage() {
  const { forgotPassword, isForgotPasswordLoading } = useAuth();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof forgotSchema>>({
    resolver: zodResolver(forgotSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof forgotSchema>) {
    try {
      await forgotPassword(values.email);
      setIsSubmitted(true);
      toast.success("Reset link sent! Please check your inbox.");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
    }
  }

  if (isSubmitted) {
    return (
      <div className="space-y-6 text-center">
        <div className="space-y-2">
          <h1 className="text-2xl font-black tracking-tight">Check your email</h1>
          <p className="text-sm font-medium text-muted-foreground">
            We've sent a password reset link to {form.getValues("email")}.
          </p>
        </div>
        <Button variant="outline" className="w-full rounded-full h-12 font-bold" onClick={() => setIsSubmitted(false)}>
          Try another email
        </Button>
        <div className="mt-4">
          <a href="/login" className="text-sm font-bold text-primary hover:underline flex items-center justify-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-black tracking-tight">Forgot password?</h1>
        <p className="text-sm font-medium text-muted-foreground">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-4">Email Address</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="name@example.com" 
                    className="h-12 rounded-full px-6 border-2 border-primary/10 bg-background/50 focus:border-primary transition-all font-medium"
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="ml-4" />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full h-14 rounded-full text-lg font-black shadow-xl hover:shadow-primary/20 transition-all" disabled={isForgotPasswordLoading}>
            {isForgotPasswordLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Send reset link"}
          </Button>
        </form>
      </Form>

      <div className="text-center">
        <a href="/login" className="text-sm font-bold text-primary hover:underline flex items-center justify-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to login
        </a>
      </div>
    </div>
  );
}

