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
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";

const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be exactly 6 digits"),
});

export default function VerifyOtpPage() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  async function onSubmit(values: z.infer<typeof otpSchema>) {
    setIsLoading(true);
    try {
      console.log("OTP data:", values);
      // Handle OTP verification
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Verify your email</h1>
        <p className="text-sm text-muted-foreground">
          We've sent a 6-digit code to your email. Enter it below to verify your account.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input 
                    placeholder="000000" 
                    className="text-center text-2xl tracking-widest h-14" 
                    maxLength={6}
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-center" />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Verify Account
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm">
        Didn't receive a code?{" "}
        <button type="button" className="font-semibold text-primary hover:underline">
          Resend code
        </button>
      </div>
    </div>
  );
}
