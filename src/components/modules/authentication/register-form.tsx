"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { env } from "@/env";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import z from "zod";

const formschema = z.object({
  name: z.string().min(1, "This field is required"),
  email: z.email(),
  password: z.string().min(8, "Minumum length is 8"),
});

export function RegisterForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: env.NEXT_PUBLIC_APP_URL,
    });
  };

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formschema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating User");
      try {
        const { data, error } = await authClient.signUp.email(value);
        console.log(data);
        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }

        toast.success("User Created Successfully", { id: toastId });
        router.push("/login");
        router.refresh();
      } catch (err) {
        toast.error("Something went wrong, please try again.", { id: toastId });
      }
    },
  });

  return (
    <Card
      {...props}
      className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-white/20 dark:border-gray-800 rounded-2xl shadow-lg"
    >
      <CardHeader>
        <CardTitle className="text-foreground">Create an account</CardTitle>
        <CardDescription className="text-muted-foreground">
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="register-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>name</FieldLabel>
                    <Input
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="bg-white dark:bg-gray-800/50"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      type="email"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="bg-white dark:bg-gray-800/50"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      type="password"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="bg-white dark:bg-gray-800/50"
                    />

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-5">
        <Button
          form="register-form"
          type="submit"
          className="bg-primary hover:bg-teal-700 text-primary-foreground w-full"
        >
          Register
        </Button>
        <Button
          onClick={() => handleGoogleLogin()}
          variant="outline"
          type="button"
          className="w-full border-teal-600/30 text-teal-600 hover:bg-teal-50 dark:border-teal-500/30 dark:bg-white dark:text-teal-400 dark:hover:bg-teal-950/50"
        >
          Continue with Google
        </Button>
        <FieldDescription className="px-6 text-center text-muted-foreground">
          Already have an account?{" "}
          <a href="/login" className="text-teal-600 hover:underline">
            Log In
          </a>
        </FieldDescription>
      </CardFooter>
    </Card>
  );
}
