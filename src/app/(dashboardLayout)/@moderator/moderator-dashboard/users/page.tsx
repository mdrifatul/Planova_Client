"use client";

import {
  deleteUserAction,
  getAllUsersAction,
  getSessionAction,
  updateUserRoleAction,
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
  ShieldAlert,
  ShieldCheck,
  Trash2,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);
  const [newRole, setNewRole] = useState<string>("");
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

  const handleUpdateRole = async () => {
    if (!selectedUser || !newRole) return;
    setSubmitting(true);
    try {
      const res = await updateUserRoleAction(selectedUser.id, newRole);
      if (res.error) {
        toast.error(res.error?.message || "Credential modification rejected");
      } else {
        toast.success(`User role upgraded to ${newRole}`);
        setUsers(
          users.map((u) =>
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            u.id === selectedUser.id ? { ...u, role: newRole as any } : u,
          ),
        );
        setRoleDialogOpen(false);
      }
    } catch {
      toast.error("Failed to synchronize role updates");
    } finally {
      setSubmitting(false);
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "bg-rose-500/10 text-rose-500 border-rose-500/20";
      case "MODERATOR":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "ORGANIZER":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      default:
        return "bg-zinc-500/10 text-zinc-500 border-zinc-500/20";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-teal-600" />
          <p className="text-zinc-500 font-medium animate-pulse uppercase tracking-[0.2em] text-[10px]">
            Accessing User Database...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-10 space-y-10 animate-in fade-in duration-1000 max-w-(--breakpoint-2xl) mx-auto">
      {/* Header section with Stats */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-1 w-12 bg-teal-500 rounded-full" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-600 dark:text-teal-400">
              Administration Protocol
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100">
            User Ecosystem
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
            Govern account roles and system permissions. Oversee the global user
            base and maintain operational integrity.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end px-6 border-r border-zinc-200 dark:border-zinc-800">
            <span className="text-4xl font-black text-zinc-900 dark:text-zinc-100">
              {users.length}
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
              Total Personnel
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-2xl font-black text-teal-600">
              {users.filter((u) => u.role === "ADMIN").length}
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
              Privileged
            </span>
          </div>
        </div>
      </div>

      <div className="border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] bg-white/50 dark:bg-gray-950/40 backdrop-blur-3xl shadow-3xl overflow-hidden">
        <Table>
          <TableHeader className="bg-zinc-100/50 dark:bg-zinc-900/50">
            <TableRow className="border-zinc-200 dark:border-zinc-800 hover:bg-transparent">
              <TableHead className="w-300px text-[10px] font-black uppercase tracking-widest py-6 px-8">
                User Identity
              </TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest py-6">
                Current Designation
              </TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest py-6 text-right px-8">
                Operational Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(users) && users.length > 0 ? (
              users.map((user) => (
                <TableRow
                  key={user.id}
                  className="border-zinc-200 dark:border-zinc-800 group hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-colors"
                >
                  <TableCell className="py-6 px-8">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 ring-1 ring-white dark:ring-zinc-900 shadow-lg group-hover:scale-110 transition-transform">
                        <AvatarImage src={user.image} alt={user.name} />
                        <AvatarFallback className="bg-linear-to-br from-zinc-100 to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 text-zinc-400 font-black">
                          {user.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col min-w-0">
                        <span className="font-black text-zinc-900 dark:text-zinc-100 text-lg tracking-tight truncate">
                          {user.name}
                        </span>
                        <span className="text-xs text-zinc-500 flex items-center gap-1.5 opacity-70">
                          <Mail className="w-3 h-3 text-teal-500" />
                          {user.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-6">
                    <Badge
                      variant="outline"
                      className={`font-black tracking-[0.15em] rounded-lg py-1 px-4 text-[9px] uppercase border-2 ${getRoleColor(user.role)}`}
                    >
                      <Zap className="w-3 h-3 mr-2" />
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-6 text-right px-8">
                    <div className="flex items-center justify-end gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={user.id === currentUser?.id}
                        className="h-10 rounded-xl border-zinc-200 dark:border-zinc-800 font-bold uppercase tracking-widest text-[9px] hover:bg-teal-50 dark:hover:bg-teal-900/20 hover:text-teal-600 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                        onClick={() => {
                          setSelectedUser(user);
                          setNewRole(user.role);
                          setRoleDialogOpen(true);
                        }}
                      >
                        {user.id === currentUser?.id
                          ? "Own Records Protected"
                          : "Configure Role"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={user.id === currentUser?.id}
                        onClick={() => handleDelete(user.id)}
                        className="h-10 w-10 rounded-xl border-zinc-200 dark:border-zinc-800 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 disabled:opacity-30 disabled:hover:bg-transparent transition-all p-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="py-20 text-center">
                  <div className="flex flex-col items-center gap-2 opacity-50">
                    <ShieldAlert className="w-8 h-8 text-zinc-400" />
                    <p className="text-[10px] font-black uppercase tracking-widest">
                      No Active Personnel Found
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Role Management Dialog */}
      <Dialog open={roleDialogOpen} onOpenChange={setRoleDialogOpen}>
        <DialogContent className="sm:max-w-md border-zinc-200 dark:border-zinc-800 bg-white dark:bg-gray-950 rounded-[2.5rem] p-8 shadow-3xl">
          <DialogHeader className="gap-2">
            <div className="h-12 w-12 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-600 mb-2">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <DialogTitle className="text-3xl font-black tracking-tighter">
              Modify Credentials
            </DialogTitle>
            <DialogDescription className="text-zinc-500 font-medium">
              Update the clearance level for{" "}
              <span className="font-black text-zinc-900 dark:text-zinc-100">
                {selectedUser?.name}
              </span>
              .
            </DialogDescription>
          </DialogHeader>

          <div className="py-6">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 px-1">
                Clearance Level
              </label>
              <Select value={newRole} onValueChange={setNewRole}>
                <SelectTrigger className="h-14 rounded-2xl bg-zinc-100/50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 font-bold">
                  <SelectValue placeholder="Access Tier" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-gray-950">
                  <SelectItem
                    value="USER"
                    className="rounded-xl py-3 focus:bg-zinc-50 dark:focus:bg-zinc-900/50 font-bold"
                  >
                    User Access
                  </SelectItem>
                  <SelectItem
                    value="ORGANIZER"
                    className="rounded-xl py-3 focus:bg-zinc-50 dark:focus:bg-zinc-900/50 font-bold"
                  >
                    Organizer Access
                  </SelectItem>
                  <SelectItem
                    value="MODERATOR"
                    className="rounded-xl py-3 focus:bg-zinc-50 dark:focus:bg-zinc-900/50 font-bold"
                  >
                    Moderator Access
                  </SelectItem>
                  <SelectItem
                    value="ADMIN"
                    className="rounded-xl py-3 focus:bg-zinc-50 dark:focus:bg-zinc-900/50 font-bold text-rose-500"
                  >
                    Root Administrator
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-3">
            <Button
              onClick={handleUpdateRole}
              disabled={submitting}
              className="flex-1 h-14 rounded-2xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl"
            >
              {submitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Authorize Changes"
              )}
            </Button>
            <Button
              variant="outline"
              onClick={() => setRoleDialogOpen(false)}
              className="h-14 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 font-black uppercase tracking-[0.2em] text-[10px]"
            >
              Abort
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
