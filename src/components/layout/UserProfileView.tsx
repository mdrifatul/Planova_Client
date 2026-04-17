"use client";

import { updateUserProfileAction } from "@/action/user.action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { User } from "@/interfaces";
import {
  Briefcase,
  Calendar,
  Camera,
  Edit2,
  Globe,
  Loader2,
  Mail,
  MapPin,
  Shield,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function UserProfileView({ user }: { user: User }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: user.name || "",
    phone: user.phone || "",
    address: user.address || "",
    image: user.image || "",
  });

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await updateUserProfileAction(user.id, formData);
      if (res.error) {
        toast.error(res.error.message);
      } else {
        toast.success("Profile updated successfully");
        setIsOpen(false);
        router.refresh();
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Profile Header Card */}
      <Card className="overflow-hidden border-zinc-200 dark:border-zinc-800/50 bg-zinc-50 dark:bg-gray-900 shadow-2xl">
        <CardContent className="relative px-6 pb-8 flex flex-col md:flex-row items-end gap-6 pt-10">
          <div className="relative group">
            <Avatar className="w-32 h-32 border-4 border-zinc-50 dark:border-gray-950">
              <AvatarImage src={user.image} alt={user.name} />
              <AvatarFallback className="text-3xl font-bold bg-muted">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-2 -right-2">
              <label className="flex items-center justify-center rounded-full size-8 shadow-lg border border-border bg-secondary cursor-pointer hover:bg-secondary/80 transition-colors">
                <Camera className="size-4" />
                <input
                  type="text"
                  className="hidden"
                  placeholder="Image URL"
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                />
              </label>
            </div>
          </div>

          <div className="flex-1 space-y-2 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                {user.name}
              </h1>
              <Badge
                variant="secondary"
                className="w-fit mx-auto md:mx-0 px-3 py-0.5 rounded-full bg-primary/10 text-primary border-primary/20 font-semibold tracking-wide uppercase text-[10px]"
              >
                <Shield className="size-3 mr-1.5" />
                {user.role}
              </Badge>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-4 gap-y-2 text-sm text-muted-foreground font-medium">
              <div className="flex items-center gap-1.5">
                <Mail className="size-4" />
                {user.email}
              </div>
              {user.address && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="size-4" />
                  {user.address}
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <Calendar className="size-4" />
                Joined {formatDate(user.createdAt)}
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-6 md:pt-0">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button className="font-semibold shadow-sm">
                  <Edit2 className="size-4 mr-2" />
                  Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-106.25 border-zinc-800 bg-gray-950">
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                  <DialogDescription className="text-zinc-400">
                    Make changes to your profile here. Click save when
                    you&apos;re done.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleUpdate} className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="col-span-3 bg-zinc-900 border-zinc-800"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right text-zinc-500">
                      Email
                    </Label>
                    <Input
                      id="email"
                      value={user.email}
                      disabled
                      className="col-span-3 bg-zinc-900/50 border-zinc-800 text-zinc-500 cursor-not-allowed"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="role" className="text-right text-zinc-500">
                      Role
                    </Label>
                    <Input
                      id="role"
                      value={user.role}
                      disabled
                      className="col-span-3 bg-zinc-900/50 border-zinc-800 text-zinc-500 cursor-not-allowed uppercase"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="col-span-3 bg-zinc-900 border-zinc-800"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="address" className="text-right">
                      Address
                    </Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      className="col-span-3 bg-zinc-900 border-zinc-800"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="image" className="text-right">
                      Image URL
                    </Label>
                    <Input
                      id="image"
                      value={formData.image}
                      onChange={(e) =>
                        setFormData({ ...formData, image: e.target.value })
                      }
                      className="col-span-3 bg-zinc-900 border-zinc-800"
                    />
                  </div>
                  <DialogFooter className="mt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Profile Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Brief Info */}
        <div className="space-y-6">
          <Card className="border-zinc-200 dark:border-zinc-800/50 bg-zinc-50 dark:bg-gray-900">
            <CardContent className="pt-6 space-y-4">
              <h3 className="font-bold text-sm uppercase tracking-widest text-muted-foreground/70">
                About
              </h3>
              <p className="text-sm leading-relaxed text-foreground/80">
                A dedicated {user.role.toLowerCase()} on the Planova platform,
                contributing to shared successes and community growth.
              </p>
              <Separator className="bg-border/50" />
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Globe className="size-4 text-primary" />
                  <span className="text-muted-foreground">Location:</span>
                  <span className="font-semibold">
                    {user.address || "International"}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Briefcase className="size-4 text-primary" />
                  <span className="text-muted-foreground">Status:</span>
                  <Badge
                    variant="outline"
                    className="text-[10px] font-bold uppercase py-0 leading-none h-5 border-green-500/50 text-green-500 bg-green-500/5"
                  >
                    Active
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-zinc-200 dark:border-zinc-800/50 bg-zinc-50 dark:bg-gray-900">
            <CardContent className="p-0">
              <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800/50">
                <h3 className="font-bold text-lg">Contact Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-6 border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800/50 space-y-1">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Email Address
                  </p>
                  <p className="font-medium">{user.email}</p>
                </div>
                <div className="p-6 space-y-1">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Phone Number
                  </p>
                  <p className="font-medium text-foreground/90">
                    {user.phone || "Not provided"}
                  </p>
                </div>
                <div className="p-6 border-t border-zinc-200 dark:border-zinc-800/50 space-y-1 md:col-span-2">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Mailing Address
                  </p>
                  <p className="font-medium text-foreground/90">
                    {user.address || "No address currently on file."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
