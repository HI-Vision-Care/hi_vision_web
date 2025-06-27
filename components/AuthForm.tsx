"use client";

import { z } from "zod";
import Link from "next/link";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Eye,
  EyeOff,
  Mail,
  User,
  Lock,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Users,
  Star,
} from "lucide-react";
import { useState } from "react";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export type FormType = "sign-in" | "sign-up";

const authFormSchema = (type: FormType) =>
  z.object({
    name:
      type === "sign-up"
        ? z.string().min(3, "Name must be at least 3 characters")
        : z.string().optional(),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const isSignIn = type === "sign-in";
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      if (!isSignIn) {
        const { name, email, password } = data;
        const res = await fetch("/api/auth/sign-up", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
        const result = await res.json();
        if (!result.success) {
          toast.error(result.message || "Sign up failed.");
          return;
        }
        toast.success("Account created successfully. Please sign in.");
        router.push("/sign-in");
      } else {
        const { email, password } = data;
        const res = await fetch("/api/auth/sign-in", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const result = await res.json();
        if (!result.success) {
          toast.error(result.message || "Sign in failed.");
          return;
        }
        toast.success("Signed in successfully.");
        router.push("/");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(`There was an error: ${err.message || err}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center py-12">
      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Marketing Content */}
        <div className="space-y-8 text-center lg:text-left">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 rounded-full px-4 py-2 shadow-sm">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-blue-700 font-medium">
                Track Your Nutrition Journey
              </span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-slate-800 leading-tight">
              {isSignIn ? (
                <>
                  Welcome{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Back
                  </span>
                </>
              ) : (
                <>
                  Start Your{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Healthy
                  </span>{" "}
                  Journey
                </>
              )}
            </h1>

            <p className="text-xl text-slate-600 max-w-lg leading-relaxed">
              {isSignIn
                ? "Continue tracking your nutrition and reach your health goals with personalized insights and expert guidance."
                : "Join thousands of users who have transformed their health with our intelligent nutrition tracking platform and personalized recommendations."}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0">
            <div className="text-center bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-slate-200/50 shadow-sm">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-5 h-5 text-blue-500" />
              </div>
              <div className="text-2xl font-bold text-slate-800">10K+</div>
              <div className="text-sm text-slate-600">Active Users</div>
            </div>
            <div className="text-center bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-slate-200/50 shadow-sm">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-5 h-5 text-indigo-500" />
              </div>
              <div className="text-2xl font-bold text-slate-800">50M+</div>
              <div className="text-sm text-slate-600">Meals Tracked</div>
            </div>
            <div className="text-center bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-slate-200/50 shadow-sm">
              <div className="flex items-center justify-center mb-2">
                <Star className="w-5 h-5 text-yellow-500" />
              </div>
              <div className="text-2xl font-bold text-slate-800">4.9★</div>
              <div className="text-sm text-slate-600">User Rating</div>
            </div>
          </div>

          <div className="text-center lg:text-left">
            <p className="text-slate-600">
              {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
              <Link
                href={isSignIn ? "/sign-up" : "/sign-in"}
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors underline decoration-blue-200 hover:decoration-blue-300"
              >
                {isSignIn ? "Sign up for free" : "Sign in here"}
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full max-w-md mx-auto">
          <div className="backdrop-blur-xl bg-white/70 border border-slate-200/50 rounded-2xl p-8 shadow-xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-800 mb-2">
                {isSignIn ? "Sign In" : "Create Account"}
              </h2>
              <p className="text-slate-600">
                {isSignIn
                  ? "Enter your credentials to continue"
                  : "Fill in your details to get started"}
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {!isSignIn && (
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-medium">
                          Full Name
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <Input
                              placeholder="Enter your full name"
                              className="pl-10 bg-white/80 border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20 shadow-sm"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                          <Input
                            type="email"
                            placeholder="Enter your email"
                            className="pl-10 bg-white/80 border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20 shadow-sm"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium">
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="pl-10 pr-10 bg-white/80 border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20 shadow-sm"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                          >
                            {showPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {isSignIn && (
                  <div className="text-right">
                    <Link
                      href="/forgot-password"
                      className="text-sm text-blue-600 hover:text-blue-700 transition-colors underline decoration-blue-200 hover:decoration-blue-300"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processing...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      {isSignIn ? "Sign In" : "Create Account"}
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center">
              <p className="text-xs text-slate-500">
                By continuing, you agree to our{" "}
                <Link
                  href="/terms"
                  className="text-blue-600 hover:text-blue-700 underline decoration-blue-200"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-blue-600 hover:text-blue-700 underline decoration-blue-200"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
