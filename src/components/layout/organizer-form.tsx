"use client";

import {
  getSessionAction,
  updateUserProfileAction,
  updateUserRoleAction,
} from "@/action/user.action";
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
import { Roles } from "@/contants/roles";
import { User } from "@/interfaces";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import z from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string(),
  address: z.string(),
  image: z.string(),
});

export function OrganizerForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const form = useForm({
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      image: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      if (!user) {
        toast.error("User not found");
        return;
      }

      const toastId = toast.loading("Updating organizer profile...");
      try {
        // Update user profile
        const profileResponse = await updateUserProfileAction(user.id, {
          name: value.name,
          phone: value.phone || undefined,
          address: value.address || undefined,
          image: value.image || undefined,
        });

        if (profileResponse.error) {
          toast.error(profileResponse.error.message, { id: toastId });
          return;
        }

        // Update user role to ORGANIZER
        const roleResponse = await updateUserRoleAction(
          user.id,
          Roles.organizer,
        );

        if (roleResponse.error) {
          toast.error(roleResponse.error.message, { id: toastId });
          return;
        }

        toast.success("Organizer account created successfully!", {
          id: toastId,
        });
        router.push("/organizer-dashboard");
        router.refresh();
      } catch (err) {
        toast.error("Something went wrong, please try again.", { id: toastId });
        console.error("Error:", err);
      }
    },
  });

  useEffect(() => {
    const fetchUserSession = async () => {
      try {
        const { data: session } = await getSessionAction();
        if (session?.user) {
          setUser(session.user);
          form.setFieldValue("name", session.user.name || "");
          form.setFieldValue("phone", session.user.phone || "");
          form.setFieldValue("address", session.user.address || "");
          form.setFieldValue("image", session.user.image || "");
        }
      } catch (error) {
        console.error("Failed to fetch user session:", error);
        toast.error("Failed to load user information");
      } finally {
        setLoading(false);
      }
    };

    fetchUserSession();
  }, [form]);

  if (loading) {
    return (
      <Card
        {...props}
        className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-white/20 dark:border-gray-800 rounded-2xl shadow-lg"
      >
        <CardHeader>
          <CardTitle className="text-foreground">Loading...</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card
      {...props}
      className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-white/20 dark:border-gray-800 rounded-2xl shadow-lg"
    >
      <CardHeader>
        <CardTitle className="text-foreground">
          Create Organizer Account
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Update your profile information to become an event organizer
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="organizer-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            {/* Current Role Display */}
            {/* <Field>
              <FieldLabel>Current Role</FieldLabel>
              <div className="mt-2 p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  {user?.role || "USER"}
                </p>
              </div>
              <FieldDescription>
                Your role will be changed to ORGANIZER upon submission
              </FieldDescription>
            </Field> */}

            {/* Email Display */}
            <Field>
              <FieldLabel>Email</FieldLabel>
              <div className="mt-2 p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                <p className="text-sm text-zinc-700 dark:text-zinc-300">
                  {user?.email || "N/A"}
                </p>
              </div>
            </Field>

            {/* Name Field */}
            <form.Field name="name">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      placeholder="Enter your full name"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      className="bg-white/50 dark:bg-gray-800/50 border-zinc-200 dark:border-gray-700 rounded-lg"
                    />
                    <FieldError>
                      {field.state.meta.errors?.join(", ")}
                    </FieldError>
                  </Field>
                );
              }}
            </form.Field>

            {/* Phone Field */}
            <form.Field name="phone">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Phone Number</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="tel"
                    placeholder="Enter your phone number"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    required
                    className="bg-white/50 dark:bg-gray-800/50 border-zinc-200 dark:border-gray-700 rounded-lg"
                  />
                </Field>
              )}
            </form.Field>

            {/* Address Field */}
            <form.Field name="address">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Address</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    placeholder="Enter your address"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="bg-white/50 dark:bg-gray-800/50 border-zinc-200 dark:border-gray-700 rounded-lg"
                  />
                </Field>
              )}
            </form.Field>

            {/* Image URL Field */}
            <form.Field name="image">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>
                    Profile Image URL
                  </FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="url"
                    placeholder="Enter image URL"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="bg-white/50 dark:bg-gray-800/50 border-zinc-200 dark:border-gray-700 rounded-lg"
                  />
                  <FieldDescription>
                    Provide a URL to your profile image (optional)
                  </FieldDescription>
                </Field>
              )}
            </form.Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex gap-2 justify-end">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="rounded-lg"
        >
          Cancel
        </Button>
        <Button
          form="organizer-form"
          type="submit"
          className="rounded-lg bg-teal-600 hover:bg-teal-700 text-white"
        >
          Create Organizer Account
        </Button>
      </CardFooter>
    </Card>
  );
}
