"use client";

import { useState } from "react";
import { Header } from "@/components/header";
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
import { Pill, Search, Plus, Edit, Copy, Eye } from "lucide-react";

export default function ARVRegimens() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const regimens = [
    {
      id: 1,
      name: "TDF + 3TC + DTG",
      category: "first_line",
      description: "First-line regimen for adults",
      drugs: ["Tenofovir (TDF)", "Lamivudine (3TC)", "Dolutegravir (DTG)"],
      dosage: "1 tablet daily",
      suitableFor: ["Adults", "Pregnant women (2nd, 3rd trimester)"],
      contraindications: ["Severe kidney disease", "Component allergy"],
      sideEffects: ["Mild nausea", "Headache", "Fatigue"],
      patientsCount: 45,
      effectiveness: 98,
    },
    {
      id: 2,
      name: "ABC + 3TC + DTG",
      category: "first_line",
      description: "Alternative to TDF for kidney issues",
      drugs: ["Abacavir (ABC)", "Lamivudine (3TC)", "Dolutegravir (DTG)"],
      dosage: "1 tablet daily",
      suitableFor: ["Adults", "Patients with kidney problems"],
      contraindications: ["HLA-B*5701 positive", "Severe liver disease"],
      sideEffects: ["Allergic reaction", "Nausea", "Fatigue"],
      patientsCount: 23,
      effectiveness: 97,
    },
    {
      id: 3,
      name: "TDF + FTC + EFV",
      category: "alternative",
      description: "Alternative regimen, less preferred",
      drugs: ["Tenofovir (TDF)", "Emtricitabine (FTC)", "Efavirenz (EFV)"],
      dosage: "1 tablet daily (evening)",
      suitableFor: ["Adults who cannot tolerate DTG"],
      contraindications: ["Pregnant women (1st trimester)", "Mental disorders"],
      sideEffects: ["Vivid dreams", "Dizziness", "Rash"],
      patientsCount: 12,
      effectiveness: 94,
    },
    {
      id: 4,
      name: "AZT + 3TC + LPV/r",
      category: "pediatric",
      description: "Pediatric regimen for children under 3",
      drugs: [
        "Zidovudine (AZT)",
        "Lamivudine (3TC)",
        "Lopinavir/ritonavir (LPV/r)",
      ],
      dosage: "Weight-based, twice daily",
      suitableFor: ["Children < 3 years", "Children who cannot tolerate DTG"],
      contraindications: ["Severe anemia", "Neutropenia"],
      sideEffects: ["Anemia", "Nausea", "Diarrhea"],
      patientsCount: 8,
      effectiveness: 92,
    },
  ];

  const filteredRegimens = regimens.filter((regimen) => {
    const matchesSearch =
      regimen.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      regimen.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || regimen.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "first_line":
        return (
          <Badge className="bg-green-100 text-green-800">First Line</Badge>
        );
      case "alternative":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">Alternative</Badge>
        );
      case "pediatric":
        return <Badge className="bg-blue-100 text-blue-800">Pediatric</Badge>;
      case "second_line":
        return <Badge className="bg-red-100 text-red-800">Second Line</Badge>;
      default:
        return <Badge variant="outline">Other</Badge>;
    }
  };

  return (
    <>
      <Header
        title="ARV Regimens"
        subtitle="Manage and customize HIV antiretroviral treatment protocols"
      />

      <div className="p-6">
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search regimens..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="first_line">First Line</SelectItem>
              <SelectItem value="alternative">Alternative</SelectItem>
              <SelectItem value="pediatric">Pediatric</SelectItem>
              <SelectItem value="second_line">Second Line</SelectItem>
            </SelectContent>
          </Select>

          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Regimen
          </Button>
        </div>

        {/* Regimen Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredRegimens.map((regimen) => (
            <Card key={regimen.id} className="bg-white shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Pill className="h-6 w-6 text-blue-600" />
                    <div>
                      <CardTitle className="text-lg">{regimen.name}</CardTitle>
                      <p className="text-sm text-gray-600">
                        {regimen.description}
                      </p>
                    </div>
                  </div>
                  {getCategoryBadge(regimen.category)}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Drug Components */}
                <div>
                  <h4 className="font-medium text-sm text-gray-700 mb-2">
                    Components:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {regimen.drugs.map((drug, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {drug}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Dosage */}
                <div>
                  <h4 className="font-medium text-sm text-gray-700">Dosage:</h4>
                  <p className="text-sm text-gray-600">{regimen.dosage}</p>
                </div>

                {/* Suitable For */}
                <div>
                  <h4 className="font-medium text-sm text-gray-700 mb-2">
                    Suitable for:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {regimen.suitableFor.map((item, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">
                      {regimen.patientsCount}
                    </div>
                    <div className="text-xs text-gray-500">Patients</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">
                      {regimen.effectiveness}%
                    </div>
                    <div className="text-xs text-gray-500">Effectiveness</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">A+</div>
                    <div className="text-xs text-gray-500">Rating</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2 pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Details
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <Card className="bg-white shadow-sm mt-6">
          <CardHeader>
            <CardTitle>Regimen Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">4</div>
                <div className="text-sm text-blue-800">Total Regimens</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">88</div>
                <div className="text-sm text-green-800">
                  Patients on Treatment
                </div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">96.5%</div>
                <div className="text-sm text-purple-800">
                  Average Effectiveness
                </div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">2</div>
                <div className="text-sm text-orange-800">New Regimens</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
