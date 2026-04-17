"use client";

import { getAllCategoriesAction } from "@/action/category.action";
import { getEventByIdAction, updateEventAction } from "@/action/event.action";
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
import { Category, UpdateEventDto } from "@/interfaces";
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  Clock,
  Loader2,
  MapPin,
  Save,
  Tag,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function EditEventPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const [formData, setFormData] = useState<UpdateEventDto>({
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    venue: "",
    maxAttendees: 0,
    visibility: "PUBLIC",
    categoryId: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventRes, catRes] = await Promise.all([
          getEventByIdAction(id),
          getAllCategoriesAction(),
        ]);

        if (eventRes.error) {
          toast.error(eventRes.error.message);
          router.push("/organizer-dashboard/events");
          return;
        }

        if (catRes.data) setCategories(catRes.data);

        const event = eventRes.data;
        if (event) {
          setFormData({
            title: event.title,
            description: event.description || "",
            date: event.date
              ? new Date(event.date).toISOString().split("T")[0]
              : "",
            startTime: event.startTime || "",
            endTime: event.endTime || "",
            venue: event.venue || "",
            maxAttendees: event.maxAttendees || 0,
            visibility: event.visibility,
            categoryId: event.categoryId || "",
          });
        }
      } catch (err) {
        toast.error("Failed to load environment");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Ensure we don't send an empty categoryId if the backend doesn't like it
      const payload = { ...formData };
      if (!payload.categoryId) delete payload.categoryId;

      const res = await updateEventAction(id, payload);
      if (res.error) {
        toast.error(res.error.message);
      } else {
        toast.success("Event intelligence updated successfully");
        router.push("/organizer-dashboard/events");
      }
    } catch {
      toast.error("Process interrupted by network error");
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
            Restructuring Data Assets...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-10 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
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
              Back to Portfolio
            </Link>
          </Button>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100">
            Edit Event
          </h1>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 ring-1 ring-zinc-200 dark:ring-zinc-800 rounded-[2.5rem] p-8 md:p-12 bg-white/50 dark:bg-gray-950/40 backdrop-blur-3xl shadow-2xl"
      >
        {/* Title */}
        <div className="md:col-span-2 space-y-3">
          <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 px-1">
            Primary Descriptor
          </Label>
          <Input
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="h-14 rounded-2xl bg-zinc-100/50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-teal-500/20 text-lg font-bold"
            placeholder="Executive Title"
            required
          />
        </div>

        {/* Date */}
        <div className="space-y-3">
          <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 px-1 flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-teal-600" />
            Execution Date
          </Label>
          <Input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="h-14 rounded-2xl bg-zinc-100/50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800"
            required
          />
        </div>

        {/* Start Time */}
        <div className="space-y-3">
          <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 px-1 flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-teal-600" />
            Commencement
          </Label>
          <Input
            type="time"
            value={formData.startTime}
            onChange={(e) =>
              setFormData({ ...formData, startTime: e.target.value })
            }
            className="h-14 rounded-2xl bg-zinc-100/50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800"
          />
        </div>

        {/* Venue */}
        <div className="md:col-span-2 space-y-3">
          <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 px-1 flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-teal-600" />
            Strategic Location
          </Label>
          <Input
            value={formData.venue}
            onChange={(e) =>
              setFormData({ ...formData, venue: e.target.value })
            }
            className="h-14 rounded-2xl bg-zinc-100/50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800"
            placeholder="Operational Facility Name"
          />
        </div>

        {/* Capacity & Category */}
        <div className="space-y-3">
          <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 px-1 flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-teal-600" />
            Presence Limit
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
            className="h-14 rounded-2xl bg-zinc-100/50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 font-bold"
            min="0"
          />
        </div>

        <div className="space-y-3">
          <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 px-1 flex items-center gap-2">
            <Tag className="w-3.5 h-3.5 text-teal-600" />
            Classification{" "}
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
            <SelectTrigger className="h-14 rounded-2xl bg-zinc-100/50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800">
              <SelectValue placeholder="Select Tier" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-gray-950">
              <SelectItem
                value="none"
                className="rounded-xl py-3 opacity-50 font-bold"
              >
                None / Uncategorized
              </SelectItem>
              {categories.map((cat) => (
                <SelectItem
                  key={cat.id}
                  value={cat.id}
                  className="rounded-xl py-3 focus:bg-teal-50 dark:focus:bg-teal-900/20"
                >
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Description */}
        <div className="md:col-span-2 space-y-3">
          <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 px-1 flex items-center gap-2">
            Detailed Briefing
          </Label>
          <Textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="min-h-45 rounded-[1.5rem] bg-zinc-100/50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 p-6 resize-none focus:ring-2 focus:ring-teal-500/20 text-sm leading-relaxed"
            placeholder="Outline the operational objectives and event program..."
          />
        </div>

        {/* Action Bar */}
        <div className="md:col-span-2 pt-6 flex items-center gap-4">
          <Button
            type="submit"
            disabled={submitting}
            className="flex-1 h-12 rounded-2xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-black uppercase tracking-[0.2em] text-xs shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            {submitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Save className="w-h-5 mr-3" />
                Commit Changes
              </>
            )}
          </Button>
          <Button
            asChild
            type="button"
            variant="outline"
            className="h-12 w-20 md:w-auto md:px-10 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 font-black uppercase tracking-[0.2em] text-xs hover:bg-zinc-50 dark:hover:bg-zinc-900"
          >
            <Link href="/organizer-dashboard/events">Cancel</Link>
          </Button>
        </div>
      </form>

      {/* Footer hint */}
      <div className="flex items-center justify-center gap-2 text-zinc-400 text-[10px] font-bold uppercase tracking-widest opacity-60">
        <AlertCircle className="w-3 h-3" />
        Modifications are audited and synchronized instantly across the global
        network.
      </div>
    </div>
  );
}
