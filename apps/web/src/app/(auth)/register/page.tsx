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
import { Eye, EyeOff, Loader2, Upload, Plus, ArrowRight } from "lucide-react";
import { useAuth } from "@/api/hooks/use-auth";
import { toast } from "sonner";

const registerSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  additionalInfo: z.string().optional(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { register, isRegisterLoading } = useAuth();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      city: "",
      country: "",
      additionalInfo: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    try {
      await register(values);
      toast.success("Account created successfully! Welcome to Traveloop.");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed. Please try again.");
    }
  }

  return (
    <div className="space-y-8">
      {/* Photo Placeholder - Screen 2 */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative group cursor-pointer">
          <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl group-hover:bg-primary/20 transition-all" />
          <div className="relative w-28 h-28 rounded-full border-4 border-dashed border-primary/30 flex flex-col items-center justify-center bg-background/50 hover:bg-background transition-all overflow-hidden">
            <Upload className="h-8 w-8 text-primary/60 mb-1" />
            <span className="text-[10px] font-black uppercase tracking-tighter text-primary/60">Photo</span>
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Plus className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-black text-foreground tracking-tight">Create Your Account</h1>
          <p className="text-muted-foreground text-sm font-medium">Join the world of effortless planning</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-4">First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" className="h-12 rounded-full px-6 border-2 border-primary/10 bg-background/50 focus:border-primary transition-all font-medium" {...field} />
                  </FormControl>
                  <FormMessage className="ml-4" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-4">Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" className="h-12 rounded-full px-6 border-2 border-primary/10 bg-background/50 focus:border-primary transition-all font-medium" {...field} />
                  </FormControl>
                  <FormMessage className="ml-4" />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-4">Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="name@world.com" className="h-12 rounded-full px-6 border-2 border-primary/10 bg-background/50 focus:border-primary transition-all font-medium" {...field} />
                  </FormControl>
                  <FormMessage className="ml-4" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-4">Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+1 555 000" className="h-12 rounded-full px-6 border-2 border-primary/10 bg-background/50 focus:border-primary transition-all font-medium" {...field} />
                  </FormControl>
                  <FormMessage className="ml-4" />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-4">City</FormLabel>
                  <FormControl>
                    <Input placeholder="Paris" className="h-12 rounded-full px-6 border-2 border-primary/10 bg-background/50 focus:border-primary transition-all font-medium" {...field} />
                  </FormControl>
                  <FormMessage className="ml-4" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-4">Country</FormLabel>
                  <FormControl>
                    <Input placeholder="France" className="h-12 rounded-full px-6 border-2 border-primary/10 bg-background/50 focus:border-primary transition-all font-medium" {...field} />
                  </FormControl>
                  <FormMessage className="ml-4" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-4">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="h-12 rounded-full px-6 border-2 border-primary/10 bg-background/50 focus:border-primary transition-all font-medium"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-4 top-1/2 -translate-y-1/2 hover:bg-transparent text-muted-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage className="ml-4" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="additionalInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-4">Additional Information</FormLabel>
                <FormControl>
                  <textarea
                    className="flex min-h-[100px] w-full rounded-[1.5rem] border-2 border-primary/10 bg-background/50 px-6 py-4 text-sm font-medium focus-visible:outline-none focus-visible:border-primary transition-all resize-none"
                    placeholder="Tell us about your travel style..."
                    {...field}
                  />
                </FormControl>
                <FormMessage className="ml-4" />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full h-14 rounded-full text-lg font-black shadow-xl hover:shadow-primary/20 transition-all group" disabled={isRegisterLoading}>
            {isRegisterLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Register Now"}
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </form>
      </Form>

      <div className="text-center font-bold text-muted-foreground text-sm">
        Already have an account?{" "}
        <a href="/login" className="text-primary hover:underline underline-offset-4 decoration-primary/30">
          Sign in
        </a>
      </div>
    </div>
  );
}

