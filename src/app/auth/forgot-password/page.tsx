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
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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

import { Spinner } from "@/components/ui/spinner";
import authService from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import useToast from "@/components/app-toast";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});

export default function ForgotPasswordPage() {
  const showToast = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  const watchEmail = form.watch("email");

  const { isPending: isForgotPasswordPending, mutateAsync: forgotPassword } =
    useMutation({
      mutationKey: ["forgot-password"],
      mutationFn: async (payload: { email: string }) => {
        const response = await authService.requestPasswordReset(payload);

        return response?.data;
      },
      onSuccess: (data) => {
        console.log("🚀 ~ file: page.tsx:56 ~ data:", data);
        showToast("Password reset request sent successfully", "success");
      },
      onError: (error: any) => {
        showToast(error?.response?.data?.message, "error");
      },
    });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await forgotPassword(values);
  }

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
            <CardDescription>
              Enter your email address and we'll send you a link to reset your
              password
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          type="email"
                          className="bg-input border-border"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  disabled={!watchEmail || isForgotPasswordPending}
                  type="submit"
                  className="w-full"
                >
                  {isForgotPasswordPending && <Spinner />}
                  Send Reset Link
                </Button>

                <div className="text-center">
                  <Link
                    href="/auth/login"
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to sign in
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
