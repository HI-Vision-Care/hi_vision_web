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
  Phone,
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
import { useLogin, useRegister } from "@/services/auth/hooks";
import { setAuth } from "@/utils/Auth";
import Cookies from "js-cookie";

export type FormType = "sign-in" | "sign-up";

const authFormSchema = (type: FormType) =>
  z.object({
    username:
      type === "sign-up"
        ? z.string().min(8, "Username must be at least 8 characters")
        : z.string().optional(),
    email: type === "sign-up" ? z.string().email("Invalid email") : z.string(),
    password: z.string().min(5, "Password must be at least 5 characters"),
    phone:
      type === "sign-up"
        ? z
            .string()
            .min(9, "Phone number must be at least 9 digits")
            .max(15, "Phone number must be no more than 15 digits")
        : z.string().optional(),
  });

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const isSignIn = type === "sign-in";
  const [showPassword, setShowPassword] = useState(false);

  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const isSubmitting = isSignIn
    ? loginMutation.status === "pending"
    : registerMutation.status === "pending";

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { username: "", email: "", password: "", phone: "" },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Dữ liệu gửi login/register:", data);

    if (isSignIn) {
      loginMutation.mutate(
        { email: data.email ?? "", password: data.password },
        {
          onSuccess: (res: any) => {
            console.log("Đăng nhập thành công:", res);
            const token = res.token;
            const user = res.username;
            const role = res.role;

            if (token && user && role) {
              // ✅ Lưu token vào cookie để middleware có thể đọc được
              Cookies.set("token", token, { expires: 7 }); // lưu trong 7 ngày
              Cookies.set("role", role, { expires: 7 });
              Cookies.set("user", JSON.stringify(user), { expires: 7 });
              toast.success("Signed in successfully.");

              // ✅ Điều hướng theo role
              switch (role) {
                case "ADMIN":
                  router.push("/admin");
                  break;
                case "DOCTOR":
                  router.push("/doctor/patients");
                  break;
                default:
                  router.push("/");
              }
            } else {
              toast.error("Login succeeded but missing required fields.");
            }
          },
          onError: (err: any) =>
            toast.error(
              err.response?.data?.message || err.message || "Sign in failed."
            ),
        }
      );
    } else {
      registerMutation.mutate(
        {
          username: data.username ?? "",
          email: data.email ?? "",
          password: data.password,
          phone: data.phone ?? "",
        },
        {
          onSuccess: () => {
            toast.success("Account created. Please sign in.");
            router.push("/sign-in");
          },
          onError: (err: any) => toast.error(err.message || "Sign up failed."),
        }
      );
    }
  };

  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center py-12">
      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side */}
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
            <StatCard icon={<Users />} label="Active Users" value="10K+" />
            <StatCard
              icon={<TrendingUp />}
              label="Meals Tracked"
              value="50M+"
            />
            <StatCard icon={<Star />} label="User Rating" value="4.9★" />
          </div>

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
                  <FormInput
                    name="username"
                    icon={<User />}
                    label="Username"
                    placeholder={
                      isSignIn ? "Enter your username" : "Choose a username"
                    }
                    form={form}
                  />
                )}
                <FormInput
                  name="email"
                  icon={<Mail />}
                  label="Email Address"
                  placeholder="Enter your email"
                  form={form}
                  type="email"
                />
                {!isSignIn && (
                  <FormInput
                    name="phone"
                    icon={<Phone />}
                    label="Phone"
                    placeholder="Enter your phone number"
                    form={form}
                  />
                )}
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
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
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
                      className="text-sm text-blue-600 hover:text-blue-700 underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-500 cursor-pointer to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
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

            <div className="mt-6 text-center text-xs text-slate-500">
              By continuing, you agree to our{" "}
              <Link
                href="/terms"
                className="text-blue-600 hover:text-blue-700 underline"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-blue-600 hover:text-blue-700 underline"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="text-center bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-slate-200/50 shadow-sm">
    <div className="flex items-center justify-center mb-2">{icon}</div>
    <div className="text-2xl font-bold text-slate-800">{value}</div>
    <div className="text-sm text-slate-600">{label}</div>
  </div>
);

const FormInput = ({
  name,
  label,
  placeholder,
  icon,
  type = "text",
  form,
}: {
  name: keyof z.infer<ReturnType<typeof authFormSchema>>;
  label: string;
  placeholder: string;
  icon: React.ReactNode;
  type?: string;
  form: any;
}) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }: any) => (
      <FormItem>
        <FormLabel className="text-slate-700 font-medium">{label}</FormLabel>
        <FormControl>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5">
              {icon}
            </div>
            <Input
              type={type}
              placeholder={placeholder}
              className="pl-10 bg-white/80 border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20 shadow-sm"
              {...field}
            />
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default AuthForm;
