"use client";

import { getAllCategoriesAction } from "@/action/category.action";
import { createEventAction } from "@/action/event.action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Category, CreateEventDto } from "@/interfaces";
import {
  ArrowLeft,
  Calendar,
  Clock,
  ImagePlus,
  Loader2,
  MapPin,
  Sparkles,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function CreateEventPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState<CreateEventDto>({
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    venue: "",
    maxAttendees: 100,
    fee: 0,
    currency: "USD",
    visibility: "PUBLIC",
    categoryId: "",
    imageUrl: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategoriesAction();
        if (res.data) {
          setCategories(res.data);
          // Auto-select first category if available
          if (res.data.length > 0) {
            setFormData((prev) => ({ ...prev, categoryId: res.data![0].id }));
          }
        }
      } catch (err) {
        toast.error("Failed to sync category ecosystem");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Ensure we don't send an empty categoryId
      const payload = { ...formData };
      if (!payload.categoryId) delete payload.categoryId;

      const res = await createEventAction(payload);
      if (res.error) {
        toast.error(res.error.message);
      } else {
        toast.success("Event intelligence initiated successfully");
        router.push("/organizer-dashboard/events");
      }
    } catch {
      toast.error("Process aborted by system error");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-teal-600" />
          <p className="text-zinc-500 font-medium animate-pulse tracking-widest uppercase text-[10px]">
            Initializing Creation Suite...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-12 min-h-screen bg-[#fafafa] dark:bg-gray-950 transition-colors duration-500">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="space-y-6">
          <Button
            asChild
            variant="ghost"
            className="pl-0 group text-zinc-500 hover:text-teal-600 transition-colors"
          >
            <Link
              href="/organizer-dashboard/events"
              className="flex items-center text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Dashboard
            </Link>
          </Button>

          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-serif font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              Create New Event
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg">
              Fill in the details below to launch your next experience.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Media Section - Senior Implementation */}
          <div className="bg-white dark:bg-gray-900/70 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 md:p-10 shadow-sm space-y-8">
            <div className="flex items-center gap-3 pb-4 border-b border-zinc-100 dark:border-zinc-800/50">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                <ImagePlus className="w-5 h-5 text-indigo-600" />
              </div>
              <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">
                Media & Branding
              </h2>
            </div>

            <div className="space-y-6">
              <div className="relative group">
                <div className="aspect-21/9 w-full rounded-2xl bg-zinc-100 dark:bg-gray-800 overflow-hidden border-2 border-dashed border-zinc-200 dark:border-zinc-800 flex items-center justify-center transition-all group-hover:border-indigo-500/50">
                  {formData.imageUrl ? (
                    <img
                      src={formData.imageUrl}
                      alt="Event Banner Preview"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) =>
                        (e.currentTarget.src =
                          "https://placehold.co/1200x500?text=Invalid+Image+URL")
                      }
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-3 text-zinc-400">
                      <div className="p-4 bg-white dark:bg-gray-800 rounded-full shadow-sm">
                        <ImagePlus className="w-8 h-8" />
                      </div>
                      <p className="text-sm font-medium">
                        Your event banner will appear here
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2.5">
                <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Cover Image URL
                </Label>
                <div className="relative">
                  <Input
                    value={formData.imageUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, imageUrl: e.target.value })
                    }
                    className="h-12 md:h-14 bg-zinc-50 dark:bg-gray-800 border-zinc-200 dark:border-zinc-800 focus:ring-indigo-500/20 text-base placeholder:text-zinc-400"
                    placeholder="Enter a direct image link (e.g., Unsplash, Cloudinary)"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase tracking-widest text-zinc-400 bg-white dark:bg-gray-800 px-2 py-1 rounded border border-zinc-100 dark:border-zinc-700">
                    JPG/PNG/WEBP
                  </div>
                </div>
                <p className="text-[11px] text-zinc-400">
                  Pro-tip: Use high-quality landscape images (minimum
                  1200x500px) for the best look.
                </p>
              </div>
            </div>
          </div>

          {/* Section 1: Basic Information */}
          <div className="bg-white dark:bg-gray-900/70 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 md:p-10 shadow-sm space-y-8">
            <div className="flex items-center gap-3 pb-4 border-b border-zinc-100 dark:border-zinc-800/50">
              <div className="p-2 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
                <Sparkles className="w-5 h-5 text-teal-600" />
              </div>
              <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">
                General Information
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="md:col-span-2 space-y-2.5">
                <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Event Title
                </Label>
                <Input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="h-12 md:h-14 bg-zinc-50 dark:bg-gray-800 border-zinc-200 dark:border-zinc-800 focus:ring-teal-500/20 text-lg placeholder:text-zinc-400"
                  placeholder="e.g. Annual Tech Symposium 2024"
                  required
                />
              </div>

              <div className="md:col-span-2 space-y-2.5">
                <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Description
                </Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="min-h-32 bg-zinc-50 dark:bg-gray-800 border-zinc-200 dark:border-zinc-800 p-4 resize-none focus:ring-teal-500/20 text-base leading-relaxed"
                  placeholder="Share what makes this event special..."
                  required
                />
              </div>

              <div className="space-y-2.5">
                <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Category
                </Label>
                <Select
                  value={formData.categoryId || "none"}
                  onValueChange={(val) =>
                    setFormData({
                      ...formData,
                      categoryId: val === "none" ? "" : val,
                    })
                  }
                >
                  <SelectTrigger className="h-12 md:h-14 bg-zinc-50 dark:bg-gray-800 border-zinc-200 dark:border-zinc-800">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent className="border-zinc-200 dark:border-zinc-800">
                    <SelectItem value="none">Uncategorized</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2.5">
                <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Visibility
                </Label>
                <Select
                  value={formData.visibility}
                  onValueChange={(val: any) =>
                    setFormData({ ...formData, visibility: val })
                  }
                >
                  <SelectTrigger className="h-12 md:h-14 bg-zinc-50 dark:bg-gray-800 border-zinc-200 dark:border-zinc-800">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PUBLIC">Public</SelectItem>
                    <SelectItem value="PRIVATE">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Section 2: Logistics & Capacity */}
          <div className="bg-white dark:bg-gray-900/70 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 md:p-10 shadow-sm space-y-8">
            <div className="flex items-center gap-3 pb-4 border-b border-zinc-100 dark:border-zinc-800/50">
              <div className="p-2 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
                <Calendar className="w-5 h-5 text-teal-600" />
              </div>
              <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">
                Logistics & Schedule
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="md:col-span-2 space-y-2.5">
                <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Venue Location
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <Input
                    value={formData.venue}
                    onChange={(e) =>
                      setFormData({ ...formData, venue: e.target.value })
                    }
                    className="h-12 md:h-14 pl-11 bg-zinc-50 dark:bg-gray-800 border-zinc-200 dark:border-zinc-800"
                    placeholder="Physical address or virtual link"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2.5">
                <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Date
                </Label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="h-12 md:h-14 bg-zinc-50 dark:bg-gray-800 border-zinc-200 dark:border-zinc-800"
                  required
                />
              </div>

              <div className="space-y-2.5">
                <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Start Time
                </Label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <Input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) =>
                      setFormData({ ...formData, startTime: e.target.value })
                    }
                    className="h-12 md:h-14 pl-11 bg-zinc-50 dark:bg-gray-800 border-zinc-200 dark:border-zinc-800"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2.5">
                <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  End Time
                </Label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <Input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) =>
                      setFormData({ ...formData, endTime: e.target.value })
                    }
                    className="h-12 md:h-14 pl-11 bg-zinc-50 dark:bg-gray-800 border-zinc-200 dark:border-zinc-800"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2.5">
                <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Maximum Attendees
                </Label>
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <Input
                    type="number"
                    value={formData.maxAttendees}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        maxAttendees: parseInt(e.target.value),
                      })
                    }
                    className="h-12 md:h-14 pl-11 bg-zinc-50 dark:bg-gray-800 border-zinc-200 dark:border-zinc-800"
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2.5">
                <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Entry Fee (USD)
                </Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-medium">
                    $
                  </span>
                  <Input
                    type="number"
                    value={formData.fee}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        fee: parseFloat(e.target.value),
                      })
                    }
                    className="h-12 md:h-14 pl-8 bg-zinc-50 dark:bg-gray-800 border-zinc-200 dark:border-zinc-800"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="pt-7 flex flex-col sm:flex-row justify-end gap-4">
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto h-13 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-lg shadow-lg shadow-teal-600/20 transition-all hover:scale-[1.01] active:scale-95"
                  >
                    {submitting ? (
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    ) : (
                      "Publish Event"
                    )}
                  </Button>
                  <Button
                    asChild
                    type="button"
                    variant="outline"
                    className="w-full sm:w-auto h-13 px-10 border-zinc-200 dark:border-zinc-800 font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900"
                  >
                    <Link href="/organizer-dashboard/events">Cancel</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>

        <footer className="text-center pt-8">
          <p className="text-zinc-400 dark:text-zinc-600 text-xs font-medium uppercase tracking-widest">
            Planova Event Management System
          </p>
        </footer>
      </div>
    </div>
  );
}
