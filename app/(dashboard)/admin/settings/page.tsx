"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Settings,
  Shield,
  Bell,
  Database,
  Globe,
  Palette,
  Save,
} from "lucide-react";
import { Header } from "@/components/admin";

export default function SystemSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [autoBackup, setAutoBackup] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  return (
    <>
      <Header
        title="System Settings"
        subtitle="Configure system preferences, security, and operational settings"
      />

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* General Settings */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2 text-red-600" />
                General Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="system-name">System Name</Label>
                <Input
                  id="system-name"
                  defaultValue="HIV Care Management System"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="organization">Organization</Label>
                <Input
                  id="organization"
                  defaultValue="Regional HIV Treatment Center"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="utc+7">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc+7">UTC+7 (Vietnam)</SelectItem>
                    <SelectItem value="utc+0">UTC+0 (GMT)</SelectItem>
                    <SelectItem value="utc-5">UTC-5 (EST)</SelectItem>
                    <SelectItem value="utc-8">UTC-8 (PST)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Default Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="vi">Tiếng Việt</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Maintenance Mode</Label>
                  <p className="text-sm text-gray-500">
                    Enable system maintenance mode
                  </p>
                </div>
                <Switch
                  checked={maintenanceMode}
                  onCheckedChange={setMaintenanceMode}
                />
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-orange-600" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="session-timeout">
                  Session Timeout (minutes)
                </Label>
                <Input id="session-timeout" type="number" defaultValue="30" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password-policy">Password Policy</Label>
                <Select defaultValue="strong">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic (8 characters)</SelectItem>
                    <SelectItem value="medium">
                      Medium (8+ chars, mixed case)
                    </SelectItem>
                    <SelectItem value="strong">
                      Strong (12+ chars, symbols)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="max-login-attempts">Max Login Attempts</Label>
                <Input id="max-login-attempts" type="number" defaultValue="5" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lockout-duration">
                  Account Lockout Duration (minutes)
                </Label>
                <Input id="lockout-duration" type="number" defaultValue="15" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-500">
                    Require 2FA for admin accounts
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2 text-blue-600" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-gray-500">
                    Send system alerts via email
                  </p>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>SMS Notifications</Label>
                  <p className="text-sm text-gray-500">
                    Send urgent alerts via SMS
                  </p>
                </div>
                <Switch
                  checked={smsNotifications}
                  onCheckedChange={setSmsNotifications}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="admin-email">Admin Email</Label>
                <Input
                  id="admin-email"
                  type="email"
                  defaultValue="admin@hivcenter.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="smtp-server">SMTP Server</Label>
                <Input id="smtp-server" defaultValue="smtp.gmail.com" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtp-port">SMTP Port</Label>
                  <Input id="smtp-port" defaultValue="587" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-security">Security</Label>
                  <Select defaultValue="tls">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="tls">TLS</SelectItem>
                      <SelectItem value="ssl">SSL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Database Settings */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2 text-green-600" />
                Database Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto Backup</Label>
                  <p className="text-sm text-gray-500">
                    Automatic daily database backup
                  </p>
                </div>
                <Switch checked={autoBackup} onCheckedChange={setAutoBackup} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="backup-time">Backup Time</Label>
                <Input id="backup-time" type="time" defaultValue="02:00" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="backup-retention">
                  Backup Retention (days)
                </Label>
                <Input id="backup-retention" type="number" defaultValue="30" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="connection-pool">Max Connection Pool</Label>
                <Input id="connection-pool" type="number" defaultValue="20" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="query-timeout">Query Timeout (seconds)</Label>
                <Input id="query-timeout" type="number" defaultValue="30" />
              </div>
            </CardContent>
          </Card>

          {/* System Appearance */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="h-5 w-5 mr-2 text-purple-600" />
                System Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select defaultValue="light">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="auto">Auto</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="primary-color">Primary Color</Label>
                <Select defaultValue="red">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="red">Red (Admin)</SelectItem>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="purple">Purple</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo-url">Logo URL</Label>
                <Input
                  id="logo-url"
                  placeholder="https://example.com/logo.png"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="favicon-url">Favicon URL</Label>
                <Input
                  id="favicon-url"
                  placeholder="https://example.com/favicon.ico"
                />
              </div>
            </CardContent>
          </Card>

          {/* System Information */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2 text-indigo-600" />
                System Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Label className="text-gray-600">Version</Label>
                  <p className="font-medium">v2.1.0</p>
                </div>
                <div>
                  <Label className="text-gray-600">Build</Label>
                  <p className="font-medium">#2024.01.15</p>
                </div>
                <div>
                  <Label className="text-gray-600">Database</Label>
                  <p className="font-medium">PostgreSQL 14.2</p>
                </div>
                <div>
                  <Label className="text-gray-600">Server</Label>
                  <p className="font-medium">Ubuntu 22.04 LTS</p>
                </div>
                <div>
                  <Label className="text-gray-600">Uptime</Label>
                  <p className="font-medium">15 days, 8 hours</p>
                </div>
                <div>
                  <Label className="text-gray-600">Last Update</Label>
                  <p className="font-medium">2024-01-10</p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button variant="outline" className="w-full bg-transparent">
                  Check for Updates
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Save Settings */}
        <div className="mt-8 flex justify-end space-x-4">
          <Button variant="outline" className="bg-transparent">
            Reset to Defaults
          </Button>
          <Button className="bg-red-600 hover:bg-red-700">
            <Save className="h-4 w-4 mr-2" />
            Save All Settings
          </Button>
        </div>
      </div>
    </>
  );
}
