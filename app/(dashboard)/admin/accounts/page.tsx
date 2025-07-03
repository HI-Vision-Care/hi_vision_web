"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Users, Search, Filter, Eye, Edit, Trash2 } from "lucide-react";
import Header from "@/components/admin/header";
import { getAllAccounts, deleteAccount } from "@/services/account/api";
import AccountFormModal from "@/components/partials/AccountFormModal";
import ConfirmDeleteModal from "@/components/partials/ConfirmDeleteModal";
import { toast } from "sonner";

import { AccountUI } from "@/services/account/types";

export default function Accounts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [accounts, setAccounts] = useState<AccountUI[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingAccount, setEditingAccount] = useState<AccountUI | null>(null);
  const [deletingAccountId, setDeletingAccountId] = useState<string | null>(
    null
  );
  const [viewingAccount, setViewingAccount] = useState<AccountUI | null>(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const data = await getAllAccounts();
        setAccounts(data);
      } catch (err) {
        console.error("Failed to load accounts", err);
        toast.error("Failed to load accounts");
      }
    };
    fetchAccounts();
  }, []);

  const filteredAccounts = accounts.filter((account) => {
    const username = account.username || "";
    const email = account.email || "";
    const matchesSearch =
      username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === "all" || account.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "ADMIN":
        return <Badge className="bg-red-100 text-red-800">Admin</Badge>;
      case "DOCTOR":
        return <Badge className="bg-blue-100 text-blue-800">Doctor</Badge>;
      case "PATIENT":
        return <Badge className="bg-green-100 text-green-800">Patient</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <>
      <Header
        title="Account Management"
        subtitle="Manage system users and their roles"
      />

      <div className="p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by username or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="ADMIN">Admin</SelectItem>
              <SelectItem value="DOCTOR">Doctor</SelectItem>
              <SelectItem value="PATIENT">Patient</SelectItem>
            </SelectContent>
          </Select>

          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => {
              setEditingAccount(null);
              setShowModal(true);
            }}
          >
            <Users className="h-4 w-4 mr-2" />
            Add Account
          </Button>
        </div>

        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Accounts ({filteredAccounts.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredAccounts.map((account) => (
                <div
                  key={account.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img
                        src={account.avatar}
                        alt={account.username}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium text-lg">
                            {account.username}
                          </h3>
                          <span className="text-gray-500">
                            ({account.email})
                          </span>
                          {getRoleBadge(account.role)}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          Phone: {account.phone}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setViewingAccount(account)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingAccount(account);
                          setShowModal(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setDeletingAccountId(account.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <AccountFormModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSave={(data) => {
          setAccounts((prev) => {
            const exists = prev.find((a) => a.id === data.id);
            return exists
              ? prev.map((a) => (a.id === data.id ? data : a))
              : [...prev, data];
          });
          setShowModal(false);
        }}
        initialData={editingAccount}
      />

      {viewingAccount && (
        <AccountFormModal
          open={!!viewingAccount}
          onClose={() => setViewingAccount(null)}
          onSave={() => {}}
          initialData={viewingAccount}
          readOnly={true}
        />
      )}

      <ConfirmDeleteModal
        open={!!deletingAccountId}
        onClose={() => setDeletingAccountId(null)}
        onConfirm={async () => {
          if (!deletingAccountId) return;
          try {
            await deleteAccount(deletingAccountId);
            setAccounts((prev) =>
              prev.filter((a) => a.id !== deletingAccountId)
            );
            toast.success("Account deleted successfully");
          } catch (error) {
            console.error("Failed to delete account", error);
            toast.error("Failed to delete account");
          } finally {
            setDeletingAccountId(null);
          }
        }}
      />
    </>
  );
}
