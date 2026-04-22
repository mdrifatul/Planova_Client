"use client";

import {
  createCategoryAction,
  deleteCategoryAction,
  getAllCategoriesAction,
} from "@/action/category.action";
import { Badge } from "@/components/ui/badge";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Category } from "@/interfaces";
import {
  Activity,
  FolderPlus,
  Inbox,
  Loader2,
  Plus,
  Search,
  ShieldCheck,
  Tag,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
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

  const filteredCategories = useMemo(() => {
    if (!searchTerm) return categories;
    return categories.filter((c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [categories, searchTerm]);

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
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-zinc-400" />
          <p className="text-zinc-400 font-serif italic text-sm tracking-widest">
            Accessing Taxonomy Core...
          </p>
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-[#fafafa] dark:bg-gray-950 p-6 md:p-12 transition-colors duration-500">
        <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-1000">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-400">
                  Taxonomy Control
                </span>
              </div>
              <div className="space-y-2">
                <h1 className="text-4xl md:text-6xl font-serif font-medium tracking-tight text-zinc-900 dark:text-zinc-100">
                  Category Domain
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
                  Govern the classification architecture of the platform.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-8 md:gap-12">
              <div className="space-y-1 text-right">
                <p className="text-3xl md:text-4xl font-serif text-zinc-900 dark:text-zinc-100">
                  {categories.length}
                </p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  Active Domains
                </p>
              </div>
              <Button
                onClick={() => setCreateDialogOpen(true)}
                className="h-14 px-8 rounded-2xl bg-teal-600 dark:bg-zinc-100 text-white dark:text-teal-600 font-medium shadow-xl hover:scale-105 transition-all"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Domain
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full max-w-md group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-zinc-900 dark:group-focus-within:text-zinc-100 transition-colors" />
              <Input
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-11 h-12 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-xl font-serif italic text-zinc-600 dark:text-zinc-400 focus:ring-1 focus:ring-zinc-300"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-900 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <Badge
              variant="outline"
              className="h-10 px-4 rounded-xl border-zinc-200 bg-white dark:bg-zinc-900 font-serif italic text-zinc-500"
            >
              {filteredCategories.length} Identifiers Managed
            </Badge>
          </div>

          {/* Table Section */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="font-serif italic text-zinc-500 py-6 px-8">
                    Domain Identity
                  </TableHead>
                  <TableHead className="font-serif italic text-zinc-500 py-6">
                    Reference Key
                  </TableHead>
                  <TableHead className="font-serif italic text-zinc-500 py-6">
                    Operational Status
                  </TableHead>
                  <TableHead className="font-serif italic text-zinc-500 py-6 text-right px-8">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.isArray(filteredCategories) &&
                filteredCategories.length > 0 ? (
                  filteredCategories.map((category) => (
                    <TableRow
                      key={category.id}
                      className="border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50/30 dark:hover:bg-zinc-800/30 transition-colors"
                    >
                      <TableCell className="py-6 px-8">
                        <div className="flex items-center gap-4">
                          <div className="h-11 w-11 rounded-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-400 group-hover:text-teal-600 transition-colors shadow-sm">
                            <Tag className="w-4 h-4 opacity-70" />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-medium text-zinc-900 dark:text-zinc-100 text-lg tracking-tight">
                              {category.name}
                            </span>
                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                              Thematic Domain
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-6">
                        <code className="text-[11px] font-mono text-zinc-400 bg-zinc-50 dark:bg-zinc-800 px-2 py-1 rounded-md border border-zinc-100 dark:border-zinc-700">
                          {category.id.substring(0, 12)}
                        </code>
                      </TableCell>
                      <TableCell className="py-6">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-teal-600 uppercase tracking-widest">
                          <Activity className="w-3 h-3" />
                          Integrated
                        </div>
                      </TableCell>
                      <TableCell className="py-6 text-right px-8">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                handleDelete(category.id, category.name)
                              }
                              className="h-9 w-9 rounded-xl border-zinc-200 text-zinc-400 hover:text-rose-600 hover:border-rose-200 transition-all"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="font-serif italic text-xs">
                              Decommission Domain
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="py-24 text-center">
                      <div className="flex flex-col items-center gap-3 opacity-20">
                        <Inbox className="w-12 h-12 text-zinc-400" />
                        <p className="text-sm font-serif italic">
                          Architecture Void: No categories identified.
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
            <DialogContent className="sm:max-w-md border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-2xl">
              <DialogHeader className="gap-2">
                <div className="h-12 w-12 rounded-2xl bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center text-teal-600 mb-2">
                  <FolderPlus className="w-6 h-6" />
                </div>
                <DialogTitle className="text-2xl font-serif font-medium">
                  Initialize Domain
                </DialogTitle>
                <DialogDescription className="text-zinc-500 font-light">
                  Inject a new thematic classification into the platform
                  architecture.
                </DialogDescription>
              </DialogHeader>

              <div className="py-8 space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                  Classification Identity
                </label>
                <Input
                  placeholder="Enter domain name..."
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="h-14 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-800 font-serif italic text-lg px-6 focus:ring-1 focus:ring-zinc-400"
                />
              </div>

              <DialogFooter className="flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  onClick={() => setCreateDialogOpen(false)}
                  className="h-12 rounded-xl border-zinc-200 dark:border-zinc-800 font-medium"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreate}
                  disabled={submitting || !newCategoryName.trim()}
                  className="h-12 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-medium px-8"
                >
                  {submitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Authorize Deployment"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Footer hint */}
          <div className="flex items-center justify-center gap-2 text-zinc-400 text-[10px] font-bold uppercase tracking-widest opacity-40 py-8">
            <ShieldCheck className="w-3 h-3" />
            Classification structure governed by administrative core
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
