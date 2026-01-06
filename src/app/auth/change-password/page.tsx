"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useEffect } from "react";
import authService from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import useToast from "@/components/app-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
  confirmPassword: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

export default function Page() {
  const router = useRouter();
  const showToast = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const watchPassword = form.watch("password");
  const watchConfirmPassword = form.watch("confirmPassword");

  const { isPending: isResetPasswordPending, mutateAsync: resetPassword } =
    useMutation({
      mutationKey: ["reset-password"],
      mutationFn: async (payload: { password: string; token: string }) => {
        const response = await authService.resetPassword(payload);

        return response;
      },
      onSuccess: (data) => {
        showToast("Your password has been reset successfully.", "success");
        router.push("/auth/login");
      },
      onError: (error: any) => {
        showToast(error.response.data.message, "error");
      },
    });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const payload = {
      password: values.password,
      token: values.confirmPassword,
    };
    await resetPassword(payload);
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
              Reset your password
            </CardTitle>
            <CardDescription>Set your new password</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your password"
                          type="password"
                          className="bg-input border-border"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="confirmPassword"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Confirm your password"
                          type="password"
                          className="bg-input border-border"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  disabled={
                    !watchPassword ||
                    !watchConfirmPassword ||
                    isResetPasswordPending
                  }
                  type="submit"
                  className="w-full"
                >
                  {isResetPasswordPending && <Spinner />}
                  Reset Password
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
