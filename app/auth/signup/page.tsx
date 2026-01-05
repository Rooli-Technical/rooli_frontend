"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Eye, EyeClosed } from "lucide-react";

import { RegisterPayload, UserType } from "@/types";
import { Spinner } from "@/components/ui/spinner";
import authService from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useAppStore } from "@/store/app-store";
import useToast from "@/components/app-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name is required",
  }),
  lastName: z.string().min(2, {
    message: "Last name is required",
  }),
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
  confirmPassword: z.string().min(8, {
    message: "Confirm password must be at least 8 characters long",
  }),
});

export default function SignupPage() {
  const router = useRouter();
  const showToast = useToast();
  const { setAccessToken, setRefreshToken, setUser, setOrganizationId } =
    useAppStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const { isPending: isRegisterPending, mutateAsync: registerUser } =
    useMutation({
      mutationKey: ["register-user"],
      mutationFn: async (payload: RegisterPayload) => {
        const response = await authService.registerUser(payload);

        return response?.data;
      },
      onSuccess: (data: {
        accessToken: string;
        refreshToken: string;
        user: UserType;
        organizationId: string;
      }) => {
        const { accessToken, refreshToken, user, organizationId } = data;

        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setUser(user);
        setOrganizationId(organizationId);
        showToast(
          "Registered successfully, please check your email for verification",
          "success"
        );
        router.push("/auth/onboarding");
      },
      onError: (error: any) => {
        const errorResponse =
          error.response.data?.message || "Something went wrong";
        showToast(errorResponse, "error");
      },
    });

  const {
    isPending: isGoogleRegisterPending,
    mutateAsync: googleRegisterUser,
  } = useMutation({
    mutationKey: ["google-register-user"],
    mutationFn: async () => {
      const response = await authService.googleAuthUser();
      console.log("🚀 ~ file: page.tsx:121 ~ response:", response);

      return response;
    },
    onSuccess: (data) => {
      console.log("🚀 ~ file: page.tsx:122 ~ data:", data);
    },
    onError: (error: any) => {
      const errorResponse =
        error.response.data?.message || "Something went wrong";
      showToast(errorResponse, "error");
    },
  });

  const watchFirstname = form.watch("firstName");
  const watchLastName = form.watch("lastName");
  const watchEmail = form.watch("email");
  const watchPassword = form.watch("password");
  const watchConfirmPassword = form.watch("confirmPassword");

  const isFormEmpty =
    !watchFirstname &&
    !watchLastName &&
    !watchEmail &&
    !watchPassword &&
    !watchConfirmPassword;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const payload: RegisterPayload = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
    };

    registerUser(payload);
  }

  function passwordValidation() {
    if (watchPassword) {
      if (watchPassword.length < 8) {
        form.setError("password", {
          message: "Password must be at least 8 characters long",
        });
      } else if (!/[a-z]/.test(watchPassword)) {
        form.setError("password", {
          message: "Password must contain at least one lowercase letter",
        });
      } else if (!/[A-Z]/.test(watchPassword)) {
        form.setError("password", {
          message: "Password must contain at least one uppercase letter",
        });
      } else if (!/[0-9]/.test(watchPassword)) {
        form.setError("password", {
          message: "Password must contain at least one number",
        });
      } else if (!/[!@#$%^&.,*()]/.test(watchPassword)) {
        form.setError("password", {
          message: "Password must contain at least one special character",
        });
      } else {
        form.clearErrors("password");
      }
    }
  }

  useEffect(() => {
    passwordValidation();
  }, [watchPassword]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center space-x-2 mb-8">
          <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xl">R</span>
          </div>
          <span className="font-serif font-bold text-2xl text-foreground">
            Rooli
          </span>
        </div>

        <Card className="border-border">
          <CardHeader className="text-center">
            <CardTitle className="font-serif text-2xl">
              Create your account
            </CardTitle>
            <CardDescription>
              Start your 14-day free trial and transform your social media
              strategy
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    name="firstName"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John"
                            className="bg-input border-border"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="lastName"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Doe"
                            className="bg-input border-border"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="john@company.com"
                          type="email"
                          className="bg-input border-border"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel className="font-semibold text-trustbasket-tertiary text-sm">
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Enter your password"
                            className="bg-input border-border"
                            type={showPassword ? "text" : "password"}
                            {...field}
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <Eye size={16} color="#2B1518" />
                            ) : (
                              <EyeClosed size={16} color="#2B1518" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="confirmPassword"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel className="font-semibold text-trustbasket-tertiary text-sm">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Confirm your password"
                            className="bg-input border-border"
                            type={showConfirmPassword ? "text" : "password"}
                            {...field}
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          >
                            {showConfirmPassword ? (
                              <Eye size={16} color="#2B1518" />
                            ) : (
                              <EyeClosed size={16} color="#2B1518" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-start space-x-2">
                  <Checkbox id="terms" />
                  <Label
                    htmlFor="terms"
                    className="text-sm text-muted-foreground flex-wrap"
                  >
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="text-primary hover:underline"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="text-primary hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full disabled:opacity-50"
                  disabled={isRegisterPending || isFormEmpty}
                >
                  {isRegisterPending && <Spinner />}
                  Create Account
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="w-full">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full bg-transparent cursor-pointer"
                    onClick={() => {
                      googleRegisterUser();
                    }}
                    disabled={isGoogleRegisterPending}
                  >
                    {isGoogleRegisterPending ? (
                      <Spinner />
                    ) : (
                      <>
                        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                          <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                          />
                          <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                          />
                          <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                          />
                        </svg>
                        Google
                      </>
                    )}
                  </Button>
                  {/* <Button
                    type="button"
                    variant="outline"
                    className="w-full bg-transparent"
                  >
                    <svg
                      className="mr-2 h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </Button> */}
                </div>

                <div className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link
                    href="/auth/login"
                    className="text-primary hover:underline"
                  >
                    Sign in
                  </Link>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
