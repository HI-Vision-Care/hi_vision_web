"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart3,
  TrendingUp,
  Users,
  Calendar,
  Download,
  FileText,
  PieChart,
} from "lucide-react";
import Header from "@/components/admin/header";
import {
  arvRegimensUsage,
  chartData,
  reportData,
  treatmentOutcomes,
} from "@/constants";

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedReport, setSelectedReport] = useState("overview");

  return (
    <>
      <Header
        title="Reports & Analytics"
        subtitle="Treatment data analysis and program effectiveness monitoring"
      />

      <div className="p-6">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-48">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedReport} onValueChange={setSelectedReport}>
            <SelectTrigger className="w-48">
              <FileText className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Report type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="overview">Overview</SelectItem>
              <SelectItem value="treatment">Treatment</SelectItem>
              <SelectItem value="adherence">Adherence</SelectItem>
              <SelectItem value="outcomes">Outcomes</SelectItem>
            </SelectContent>
          </Select>

          <Button className="bg-blue-600 hover:bg-blue-700 ml-auto">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Patients
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {reportData.overview.totalPatients}
                  </p>
                  <p className="text-sm text-green-600">
                    +{reportData.overview.newPatients} new this month
                  </p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Adherence Rate
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {reportData.overview.adherenceRate}%
                  </p>
                  <p className="text-sm text-green-600">
                    +2.1% from last month
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Viral Suppression
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {reportData.overview.viralSuppressionRate}%
                  </p>
                  <p className="text-sm text-green-600">
                    +1.5% from last month
                  </p>
                </div>
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Treatment Outcomes Chart */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="h-5 w-5 mr-2 text-blue-600" />
                Treatment Outcomes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {treatmentOutcomes.map((outcome, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-4 h-4 rounded-full ${outcome.color}`}
                      ></div>
                      <span className="text-sm font-medium">
                        {outcome.category}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold">
                        {outcome.count} patients
                      </div>
                      <div className="text-xs text-gray-500">
                        {outcome.percentage}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">89.5%</div>
                  <div className="text-sm text-gray-600">
                    Successful viral suppression rate
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ARV Regimens Usage */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                ARV Regimen Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {arvRegimensUsage.map((regimen, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        {regimen.regimen}
                      </span>
                      <span className="text-sm text-gray-600">
                        {regimen.count} patients ({regimen.percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${regimen.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Monthly Trends */}
          <Card className="bg-white shadow-sm lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                6-Month Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-6 gap-4">
                  {chartData.map((data, index) => (
                    <div key={index} className="text-center">
                      <div className="text-xs text-gray-500 mb-2">
                        {data.month}
                      </div>
                      <div className="bg-blue-100 rounded-lg p-3 mb-2">
                        <div className="text-lg font-bold text-blue-600">
                          {data.patients}
                        </div>
                        <div className="text-xs text-blue-800">Patients</div>
                      </div>
                      <div className="bg-green-100 rounded-lg p-3">
                        <div className="text-lg font-bold text-green-600">
                          {data.adherence}%
                        </div>
                        <div className="text-xs text-green-800">Adherence</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary Statistics */}
        <Card className="bg-white shadow-sm mt-6">
          <CardHeader>
            <CardTitle>Monthly Activity Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {reportData.monthly.appointments}
                </div>
                <div className="text-sm text-blue-800">Appointments</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {reportData.monthly.completedTreatments}
                </div>
                <div className="text-sm text-green-800">
                  Completed Treatments
                </div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">
                  {reportData.monthly.missedAppointments}
                </div>
                <div className="text-sm text-yellow-800">
                  Missed Appointments
                </div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {reportData.monthly.newRegistrations}
                </div>
                <div className="text-sm text-purple-800">New Registrations</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">
                  {reportData.monthly.emergencyCases}
                </div>
                <div className="text-sm text-red-800">Emergency Cases</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
