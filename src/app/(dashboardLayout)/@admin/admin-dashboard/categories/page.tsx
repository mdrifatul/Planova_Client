"use client";

import {
  createCategoryAction,
  deleteCategoryAction,
  getAllCategoriesAction,
} from "@/action/category.action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Category } from "@/interfaces";
import {
  FolderPlus,
  Inbox,
  Loader2,
  ShieldCheck,
  Tag,
  Trash2,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const { data, error } = await getAllCategoriesAction();
      if (error) {
        toast.error(error?.message || "Critical taxonomy sync failure");
      } else if (data) {
        setCategories(data);
      }
    } catch {
      toast.error("Failed to synchronize category domain");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newCategoryName.trim()) return;
    setSubmitting(true);
    try {
      const res = await createCategoryAction({ name: newCategoryName });
      if (res.error) {
        toast.error(res.error?.message || "Creation protocol rejected");
      } else if (res.data) {
        toast.success(`'${res.data.name}' successfully integrated`);
        setCategories([...categories, res.data]);
        setCreateDialogOpen(false);
        setNewCategoryName("");
      }
    } catch {
      toast.error("Process interrupted by network error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (
      !confirm(
        `Are you sure you want to decommission the '${name}' category? This action is permanent.`,
      )
    )
      return;

    try {
      const res = await deleteCategoryAction(id);
      if (res.error) {
        toast.error(res.error?.message || "Decommission failure");
      } else {
        toast.success(`Category '${name}' scrubbed from architecture`);
        setCategories(categories.filter((c) => c.id !== id));
      }
    } catch {
      toast.error("System communication interrupted");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] px-4">
        <div className="flex flex-col items-center gap-3 sm:gap-4">
          <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 animate-spin text-teal-600" />
          <p className="text-zinc-500 font-medium animate-pulse uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[8px] sm:text-[9px] md:text-[10px] text-center">
            Accessing Taxonomy Core...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-10 space-y-6 sm:space-y-8 md:space-y-10 animate-in fade-in duration-1000 max-w-7xl mx-auto w-full">
      {/* Header section with Stats */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
        <div className="space-y-3 sm:space-y-4 flex-1">
          <div className="flex items-center gap-2">
            <div className="h-1 w-8 sm:w-12 bg-teal-500 rounded-full" />
            <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-teal-600 dark:text-teal-400">
              Taxonomy Control
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100 leading-tight">
            Category Domain
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-zinc-500 dark:text-zinc-400 font-medium max-w-2xl leading-relaxed">
            Govern the classification architecture. Create new thematic domains
            or decommission legacy categories to maintain platform structure.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mt-4 md:mt-0">
          <div className="flex flex-col items-start sm:items-end px-4 sm:px-6 border-b sm:border-b-0 sm:border-r border-zinc-200 dark:border-zinc-800 pb-4 sm:pb-0">
            <span className="text-2xl sm:text-3xl md:text-4xl font-black text-zinc-900 dark:text-zinc-100">
              {categories.length}
            </span>
            <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-zinc-500 mt-1">
              Active Domains
            </span>
          </div>
          <Button
            onClick={() => setCreateDialogOpen(true)}
            className="w-full sm:w-auto h-11 sm:h-12 md:h-14 px-4 sm:px-6 md:px-8 rounded-xl sm:rounded-2xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[9px] sm:text-[10px] shadow-2xl hover:scale-105 transition-transform"
          >
            <FolderPlus className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 sm:mr-3" />
            <span className="sm:inline">Add Category</span>
          </Button>
        </div>
      </div>

      <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-[2.5rem] bg-white/50 dark:bg-gray-950/40 backdrop-blur-3xl shadow-lg sm:shadow-xl md:shadow-3xl overflow-x-auto">
        <Table>
          <TableHeader className="bg-zinc-100/50 dark:bg-gray-900/70">
            <TableRow className="border-zinc-200 dark:border-zinc-800 hover:bg-transparent">
              <TableHead className="text-[8px] sm:text-[9px] md:text-[10px] font-black uppercase tracking-widest py-3 sm:py-4 md:py-6 px-3 sm:px-4 md:px-8 whitespace-nowrap min-w-max sm:w-auto">
                Domain Identity
              </TableHead>
              <TableHead className="hidden sm:table-cell text-[8px] sm:text-[9px] md:text-[10px] font-black uppercase tracking-widest py-3 sm:py-4 md:py-6 whitespace-nowrap">
                Unique ID
              </TableHead>
              <TableHead className="hidden md:table-cell text-[8px] sm:text-[9px] md:text-[10px] font-black uppercase tracking-widest py-3 sm:py-4 md:py-6 whitespace-nowrap">
                Status
              </TableHead>
              <TableHead className="text-[8px] sm:text-[9px] md:text-[10px] font-black uppercase tracking-widest py-3 sm:py-4 md:py-6 px-3 sm:px-4 md:px-8 text-right whitespace-nowrap">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(categories) && categories.length > 0 ? (
              categories.map((category) => (
                <TableRow
                  key={category.id}
                  className="border-zinc-200 dark:border-zinc-800 group hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-colors"
                >
                  <TableCell className="py-3 sm:py-4 md:py-6 px-3 sm:px-4 md:px-8">
                    <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0">
                      <div className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-lg sm:rounded-xl md:rounded-2xl bg-zinc-100 dark:bg-zinc-900 shrink-0 flex items-center justify-center border-2 border-zinc-200 dark:border-zinc-800 shadow-lg group-hover:bg-teal-500 group-hover:border-teal-400 group-hover:text-white transition-all">
                        <Tag className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 opacity-60 group-hover:opacity-100" />
                      </div>
                      <div className="flex flex-col min-w-0 flex-1">
                        <span className="font-black text-zinc-900 dark:text-zinc-100 text-sm sm:text-base md:text-lg tracking-tight truncate leading-none mb-0.5 sm:mb-1">
                          {category.name}
                        </span>
                        <span className="text-[8px] sm:text-[9px] font-bold text-zinc-400 uppercase tracking-widest truncate">
                          Classification
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell py-3 sm:py-4 md:py-6">
                    <code className="bg-zinc-100 dark:bg-zinc-900 px-2 sm:px-3 py-1 rounded-lg text-[8px] sm:text-xs font-mono text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 whitespace-nowrap">
                      {category.id.substring(0, 12)}...
                    </code>
                  </TableCell>
                  <TableCell className="hidden md:table-cell py-3 sm:py-4 md:py-6">
                    <div className="flex items-center gap-1.5 text-[8px] sm:text-[9px] font-black text-teal-600 uppercase tracking-widest whitespace-nowrap">
                      <Zap className="w-3 h-3 animate-pulse shrink-0" />
                      Operational
                    </div>
                  </TableCell>
                  <TableCell className="py-3 sm:py-4 md:py-6 text-right px-3 sm:px-4 md:px-8">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(category.id, category.name)}
                      className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-lg sm:rounded-xl border-zinc-200 dark:border-zinc-800 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all p-0"
                    >
                      <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4 md:h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="py-12 sm:py-16 md:py-20 text-center"
                >
                  <div className="flex flex-col items-center gap-2 opacity-50">
                    <Inbox className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-zinc-400" />
                    <p className="text-[8px] sm:text-[9px] md:text-[10px] font-black uppercase tracking-widest">
                      Architecture Void: No Categories Detected
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Category Creation Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="w-[95vw] sm:w-full sm:max-w-md border-zinc-200 dark:border-zinc-800 bg-white dark:bg-gray-950 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-[2.5rem] p-4 sm:p-6 md:p-8 shadow-lg sm:shadow-xl md:shadow-3xl">
          <DialogHeader className="gap-2 sm:gap-3">
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg sm:rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-600 mb-1 sm:mb-2">
              <FolderPlus className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <DialogTitle className="text-2xl sm:text-3xl font-black tracking-tighter">
              Initialize Domain
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-base text-zinc-500 font-medium">
              Inject a new thematic classification into the platform
              architecture.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 sm:py-6">
            <div className="space-y-3 sm:space-y-4">
              <label className="text-[7px] sm:text-[8px] md:text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] text-zinc-500 px-1 block">
                Classification Identity
              </label>
              <Input
                placeholder="Enter category name..."
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="h-10 sm:h-12 md:h-14 w-full rounded-lg sm:rounded-xl md:rounded-2xl bg-zinc-100/50 dark:bg-gray-900/70 border border-zinc-200 dark:border-zinc-800 font-bold px-3 sm:px-4 md:px-6 focus-visible:ring-2 focus-visible:ring-teal-500/30 text-xs sm:text-sm md:text-base placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
              />
            </div>
          </div>

          <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 pt-4 sm:pt-6">
            <Button
              variant="outline"
              onClick={() => setCreateDialogOpen(false)}
              className="h-10 sm:h-11 md:h-14 flex-1 rounded-lg sm:rounded-xl md:rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 font-black uppercase tracking-[0.12em] sm:tracking-[0.15em] md:tracking-[0.2em] text-[8px] sm:text-[9px] md:text-[10px] hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
            >
              Abort
            </Button>
            <Button
              onClick={handleCreate}
              disabled={submitting || !newCategoryName.trim()}
              className="h-10 sm:h-11 md:h-14 flex-1 rounded-lg sm:rounded-xl md:rounded-2xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-black uppercase tracking-[0.12em] sm:tracking-[0.15em] md:tracking-[0.2em] text-[8px] sm:text-[9px] md:text-[10px] shadow-lg sm:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl transition-all"
            >
              {submitting ? (
                <Loader2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 animate-spin mr-1 sm:mr-2" />
              ) : null}
              <span className="hidden sm:inline">Authorize</span>
              <span className="sm:hidden">Deploy</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Footer hint */}
      <div className="flex items-center justify-center gap-2 text-zinc-400 text-[8px] sm:text-[10px] font-bold uppercase tracking-widest opacity-60 text-center px-2">
        <ShieldCheck className="w-3 h-3 shrink-0" />
        <span>Classification structure governed by administrative core</span>
      </div>
    </div>
  );
}
