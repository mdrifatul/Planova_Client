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
  Loader2,
  MapPin,
  Sparkles,
  Tag,
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
    <div className="p-4 md:p-10 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-4">
          <Button
            asChild
            variant="ghost"
            className="pl-0 hover:bg-transparent text-zinc-500 hover:text-teal-500 transition-colors group"
          >
            <Link
              href="/organizer-dashboard/events"
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Management Console
            </Link>
          </Button>
          <div className="flex items-center gap-4">
            <div className="w-2 h-12 bg-teal-500 rounded-full" />
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100">
              Initiate Event
            </h1>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 border border-zinc-200 dark:border-zinc-800 rounded-[3rem] p-8 md:p-12 bg-white/50 dark:bg-gray-950/40 backdrop-blur-3xl shadow-3xl overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 blur-[100px] -mr-32 -mt-32 rounded-full" />

        {/* Title */}
        <div className="md:col-span-2 space-y-3 relative z-10">
          <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500 px-1">
            Concept Designation
          </Label>
          <Input
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="h-16 rounded-2xl bg-zinc-100/50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-teal-500/20 text-xl font-black placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
            placeholder="Exclusive Event Title"
            required
          />
        </div>

        {/* Date */}
        <div className="space-y-3 relative z-10">
          <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500 px-1 flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-teal-600" />
            Strategic Date
          </Label>
          <Input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="h-16 rounded-2xl bg-zinc-100/50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 font-bold"
            required
          />
        </div>

        {/* Start Time */}
        <div className="space-y-3 relative z-10">
          <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500 px-1 flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-teal-600" />
            Launch Time
          </Label>
          <Input
            type="time"
            value={formData.startTime}
            onChange={(e) =>
              setFormData({ ...formData, startTime: e.target.value })
            }
            className="h-16 rounded-2xl bg-zinc-100/50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 font-bold"
            required
          />
        </div>

        {/* Venue */}
        <div className="md:col-span-2 space-y-3 relative z-10">
          <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500 px-1 flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-teal-600" />
            Operational Venue
          </Label>
          <Input
            value={formData.venue}
            onChange={(e) =>
              setFormData({ ...formData, venue: e.target.value })
            }
            className="h-16 rounded-2xl bg-zinc-100/50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 placeholder:text-zinc-300 dark:placeholder:text-zinc-700 font-bold"
            placeholder="Global HQ / Virtual Auditorium"
            required
          />
        </div>

        {/* Capacity */}
        <div className="space-y-3 relative z-10">
          <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500 px-1 flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-teal-600" />
            Attendee Capacity
          </Label>
          <Input
            type="number"
            value={formData.maxAttendees}
            onChange={(e) =>
              setFormData({
                ...formData,
                maxAttendees: parseInt(e.target.value) || 0,
              })
            }
            className="h-16 rounded-2xl bg-zinc-100/50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 font-black text-lg"
            min="1"
            required
          />
        </div>

        {/* Category (Optional) */}
        <div className="space-y-3 relative z-10">
          <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500 px-1 flex items-center gap-2">
            <Tag className="w-3.5 h-3.5 text-teal-600" />
            Category{" "}
            <span className="text-[9px] lowercase opacity-50">(Optional)</span>
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
            <SelectTrigger className="h-16 rounded-2xl bg-zinc-100/50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 font-bold">
              <SelectValue placeholder="Select Designation" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-gray-950">
              <SelectItem
                value="none"
                className="rounded-xl py-3 font-bold opacity-50"
              >
                None / Uncategorized
              </SelectItem>
              {categories.map((cat) => (
                <SelectItem
                  key={cat.id}
                  value={cat.id}
                  className="rounded-xl py-3 focus:bg-teal-50 dark:focus:bg-teal-900/20 font-bold"
                >
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Description */}
        <div className="md:col-span-2 space-y-3 relative z-10">
          <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500 px-1">
            Executive Summary
          </Label>
          <Textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="min-h-50 rounded-[2rem] bg-zinc-100/50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 p-8 resize-none focus:ring-2 focus:ring-teal-500/20 text-base leading-relaxed placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
            placeholder="Describe the mission, objectives and unique value proposition of this experience..."
            required
          />
        </div>

        {/* Action Bar */}
        <div className="md:col-span-2 pt-8 flex items-center gap-5 relative z-10">
          <Button
            type="submit"
            disabled={submitting}
            className="flex-1 h-18 rounded-2xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-black uppercase tracking-[0.3em] text-sm shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_rgba(255,255,255,0.05)] hover:scale-[1.03] active:scale-[0.98] transition-all"
          >
            {submitting ? (
              <Loader2 className="w-6 h-6 animate-spin text-teal-400" />
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-3 text-teal-400 animate-pulse" />
                Initiate Global Event
              </>
            )}
          </Button>
          <Button
            asChild
            type="button"
            variant="outline"
            className="h-18 px-10 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 font-black uppercase tracking-[0.3em] text-xs hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
          >
            <Link href="/organizer-dashboard/events">Cancel</Link>
          </Button>
        </div>
      </form>

      {/* Trust Footer */}
      <p className="text-center text-[10px] font-black uppercase tracking-[0.5em] text-zinc-300 dark:text-zinc-800">
        Verified Institutional Product • Secured by Planova
      </p>
    </div>
  );
}
