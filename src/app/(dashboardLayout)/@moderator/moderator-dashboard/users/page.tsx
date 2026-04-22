"use client";

import {
  deleteUserAction,
  getAllUsersAction,
  getSessionAction,
  updateUserStatusAction,
} from "@/action/user.action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/interfaces";
import {
  Loader2,
  Mail,
  ShieldCheck,
  Trash2,
  Activity,
  Lock,
  Unlock,
  Users,
  Search,
  Settings2,
  X,
} from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ModeratorUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Unified Manage Dialog State
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [manageDialogOpen, setManageDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const [usersRes, sessionRes] = await Promise.all([
          getAllUsersAction(),
          getSessionAction(),
        ]);

        if (usersRes.data) setUsers(usersRes.data);
        if (sessionRes.data?.user) setCurrentUser(sessionRes.data.user);

        if (usersRes.error) toast.error(usersRes.error.message);
      } catch {
        toast.error("Critical system synchronization failure");
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const filteredUsers = useMemo(() => {
    if (!searchTerm) return users;
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [users, searchTerm]);

  const handleDelete = async (userId: string) => {
    if (
      !confirm(
        "Are you sure you want to permanently terminate this account? This action is irreversible.",
      )
    )
      return;

    try {
      const res = await deleteUserAction(userId);
      if (res.error) {
        toast.error(res.error?.message || "Permanent termination failed");
      } else {
        toast.success("User account terminated successfully");
        setUsers(users.filter((u) => u.id !== userId));
      }
    } catch {
      toast.error("Network communication failure");
    }
  };

  const handleUpdatePersonnel = async () => {
    if (!selectedUser) return;
    setSubmitting(true);
    try {
      // Check if status changed
      if (newStatus !== selectedUser.status) {
        const statusRes = await updateUserStatusAction(selectedUser.id, newStatus);
        if (statusRes.error) throw new Error(statusRes.error.message);
      }

      toast.success("Personnel configuration updated successfully");
      setUsers(
        users.map((u) =>
          u.id === selectedUser.id ? { ...u, status: newStatus } : u,
        ),
      );
      setManageDialogOpen(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to update personnel configuration");
    } finally {
      setSubmitting(false);
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/10 dark:text-rose-400 dark:border-rose-800";
      case "MODERATOR":
        return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/10 dark:text-blue-400 dark:border-blue-800";
      case "ORGANIZER":
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/10 dark:text-amber-400 dark:border-amber-800";
      default:
        return "bg-zinc-50 text-zinc-700 border-zinc-200 dark:bg-zinc-900/10 dark:text-zinc-400 dark:border-zinc-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toUpperCase()) {
      case "ACTIVE":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/10 dark:text-emerald-400 dark:border-emerald-800";
      case "BLOCKED":
        return "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/10 dark:text-rose-400 dark:border-rose-800";
      default:
        return "bg-zinc-50 text-zinc-700 border-zinc-200 dark:bg-zinc-900/10 dark:text-zinc-400 dark:border-zinc-800";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-zinc-400" />
          <p className="text-zinc-400 font-serif italic text-sm tracking-widest">
            Synchronizing Records...
          </p>
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-[#fafafa] dark:bg-gray-950 p-6 md:p-12 transition-colors duration-500">
        <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-1000">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-400">
                  Moderator Oversight
                </span>
              </div>
              <div className="space-y-2">
                <h1 className="text-4xl md:text-6xl font-serif font-medium tracking-tight text-zinc-900 dark:text-zinc-100">
                  Personnel Universe
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
                  Monitor accounts and system permissions with precision.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-8 md:gap-12">
              <div className="space-y-1 text-right">
                <p className="text-3xl md:text-4xl font-serif text-zinc-900 dark:text-zinc-100">
                  {users.length}
                </p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  Total Personnel
                </p>
              </div>
              <div className="space-y-1 text-right">
                <p className="text-3xl md:text-4xl font-serif text-teal-600">
                  {users.filter((u) => u.status === "ACTIVE").length}
                </p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  Active Assets
                </p>
              </div>
            </div>
          </div>

          {/* Search & Actions Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full max-w-md group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-zinc-900 dark:group-focus-within:text-zinc-100 transition-colors" />
              <Input
                placeholder="Search by name or email..."
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
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="h-10 px-4 rounded-xl border-zinc-200 bg-white dark:bg-zinc-900 font-serif italic text-zinc-500">
                {filteredUsers.length} Records Identified
              </Badge>
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="font-serif italic text-zinc-500 py-6 px-8">
                    Personnel Identity
                  </TableHead>
                  <TableHead className="font-serif italic text-zinc-500 py-6">
                    Designation
                  </TableHead>
                  <TableHead className="font-serif italic text-zinc-500 py-6">
                    Status
                  </TableHead>
                  <TableHead className="font-serif italic text-zinc-500 py-6 text-right px-8">
                    Operational Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.isArray(filteredUsers) && filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow
                      key={user.id}
                      className="border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50/30 dark:hover:bg-zinc-800/30 transition-colors"
                    >
                      <TableCell className="py-6 px-8">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12 rounded-full border border-zinc-200 dark:border-zinc-700">
                            <AvatarImage src={user.image} alt={user.name} />
                            <AvatarFallback className="bg-zinc-100 dark:bg-zinc-800 text-zinc-400 font-serif italic">
                              {user.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col min-w-0">
                            <span className="font-medium text-zinc-900 dark:text-zinc-100 text-base">
                              {user.name}
                            </span>
                            <span className="text-xs text-zinc-500 flex items-center gap-1.5 opacity-80">
                              <Mail className="w-3 h-3" />
                              {user.email}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-6">
                        <Badge
                          variant="outline"
                          className={`font-medium tracking-wider rounded-full py-0.5 px-3 text-[10px] uppercase border shadow-none ${getRoleColor(user.role)}`}
                        >
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-6">
                        <Badge
                          variant="outline"
                          className={`font-medium tracking-wider rounded-full py-0.5 px-3 text-[10px] uppercase border shadow-none ${getStatusColor(user.status)}`}
                        >
                          {user.status || "ACTIVE"}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-6 text-right px-8">
                        <div className="flex items-center justify-end gap-2">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                disabled={user.id === currentUser?.id}
                                onClick={() => {
                                  setSelectedUser(user);
                                  setNewStatus(user.status || "ACTIVE");
                                  setManageDialogOpen(true);
                                }}
                                className="h-9 w-9 rounded-xl border-zinc-200 text-zinc-500 hover:text-teal-600 hover:border-teal-200 transition-all"
                              >
                                <Settings2 className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="font-serif italic text-xs">Configure Status</p>
                            </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                disabled={user.id === currentUser?.id}
                                onClick={() => handleDelete(user.id)}
                                className="h-9 w-9 rounded-xl border-zinc-200 text-zinc-400 hover:text-rose-600 hover:border-rose-200 transition-all"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="font-serif italic text-xs">Terminate Access</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="py-24 text-center">
                      <div className="flex flex-col items-center gap-3 opacity-20">
                        <Users className="w-12 h-12 text-zinc-400" />
                        <p className="text-sm font-serif italic">No matching records identified.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Personnel Configuration Dialog */}
          <Dialog open={manageDialogOpen} onOpenChange={setManageDialogOpen}>
            <DialogContent className="sm:max-w-md border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-2xl">
              <DialogHeader className="gap-2">
                <DialogTitle className="text-2xl font-serif font-medium">Status Control</DialogTitle>
                <DialogDescription className="text-zinc-500 font-light">
                  Adjust the operational state for <span className="font-medium text-zinc-900 dark:text-zinc-100 italic">{selectedUser?.name}</span>.
                </DialogDescription>
              </DialogHeader>

              <div className="py-8 space-y-8">
                {/* Status Section */}
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                    <Activity className="w-3 h-3" /> Operational State
                  </label>
                  <Select value={newStatus} onValueChange={setNewStatus}>
                    <SelectTrigger className="h-12 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-800 focus:ring-1 focus:ring-zinc-400">
                      <SelectValue placeholder="Operational State" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-zinc-200 dark:border-zinc-800">
                      <SelectItem value="ACTIVE" className="rounded-lg">
                        <div className="flex items-center gap-2">
                          <Unlock className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Active / Authorized</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="BLOCKED" className="rounded-lg">
                        <div className="flex items-center gap-2">
                          <Lock className="w-3.5 h-3.5 text-rose-600" />
                          <span>Blocked / Restricted</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <DialogFooter className="flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  onClick={() => setManageDialogOpen(false)}
                  className="h-12 rounded-xl border-zinc-200 dark:border-zinc-800 font-medium"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleUpdatePersonnel}
                  disabled={submitting}
                  className="h-12 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-medium px-8"
                >
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Authorize Changes"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </TooltipProvider>
  );
}
