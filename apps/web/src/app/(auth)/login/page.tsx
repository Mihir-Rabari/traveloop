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
import { Eye, EyeOff, Loader2, MapPin, ArrowRight } from "lucide-react";
import { useAuth } from "@/api/hooks/use-auth";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoginLoading } = useAuth();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      await login(values);
      toast.success("Welcome back! Loading your dashboard...");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed. Please check your credentials.");
    }
  }

  return (
    <div className="space-y-10">
      {/* Photo Placeholder - Screen 1 */}
      <div className="flex flex-col items-center gap-6">
        <div className="relative group">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-all" />
          <div className="relative w-32 h-32 rounded-full border-4 border-background overflow-hidden shadow-2xl bg-muted">
            <img 
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=400&auto=format&fit=crop" 
              alt="User Avatar" 
              className="w-full h-full object-cover"
            />

          </div>
          <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-secondary rounded-full border-4 border-card flex items-center justify-center shadow-lg">
            <MapPin className="text-white h-4 w-4" />
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-black text-foreground tracking-tight">Welcome Back</h1>
          <p className="text-muted-foreground font-medium mt-1">Sign in to your travel world</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-bold uppercase tracking-widest text-muted-foreground ml-4">Username / Email</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="traveler@world.com" 
                    className="h-14 rounded-full px-8 border-2 border-primary/10 bg-background/50 focus:border-primary transition-all text-lg font-medium"
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="ml-4" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between ml-4">
                  <FormLabel className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Password</FormLabel>
                </div>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="h-14 rounded-full px-8 border-2 border-primary/10 bg-background/50 focus:border-primary transition-all text-lg font-medium"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-4 top-1/2 -translate-y-1/2 hover:bg-transparent text-muted-foreground hover:text-primary"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage className="ml-4" />
              </FormItem>
            )}
          />
          <Button 
            type="submit" 
            className="w-full h-16 rounded-full text-xl font-black shadow-xl hover:shadow-primary/20 transition-all group" 
            disabled={isLoginLoading}
          >
            {isLoginLoading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : "Login Now"}
            <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
          </Button>
        </form>
      </Form>

      <div className="text-center font-bold text-muted-foreground">
        Don&apos;t have an account?{" "}
        <a href="/register" className="text-primary hover:underline underline-offset-4 decoration-primary/30">
          Join the community
        </a>
      </div>
    </div>
  );
}

