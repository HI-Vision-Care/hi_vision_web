"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Search,
  Pill,
  AlertTriangle,
  Info,
  Clock,
  DollarSign,
  Activity,
  Filter,
  Plus,
  Download,
} from "lucide-react";
import { getAllArvs } from "@/services/arv/api";
import { Header } from "@/components/admin";

interface ARV {
  arvId: string;
  genericName: string;
  drugClass: string;
  dosageStrength: string;
  admRoute: string;
  rcmDosage: string;
  fundingSource: string;
  shelfLife: string;
  regimenLevel: string;
  indication?: string[];
  contraindication?: string[];
  sideEffect?: string[];
}

export default function ARVRegimens() {
  const [searchTerm, setSearchTerm] = useState("");
  const [arvs, setArvs] = useState<ARV[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAllArvs();
        setArvs(data);
        setError(null);
      } catch (err) {
        console.error("Failed to load ARVs", err);
        setError("Failed to load ARV data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredArvs = arvs.filter(
    (arv) =>
      arv.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      arv.drugClass.toLowerCase().includes(searchTerm.toLowerCase()) ||
      arv.arvId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDrugClassColor = (drugClass: string) => {
    const colors: { [key: string]: string } = {
      NRTI: "bg-blue-100 text-blue-800 border-blue-200",
      NNRTI: "bg-green-100 text-green-800 border-green-200",
      PI: "bg-purple-100 text-purple-800 border-purple-200",
      INSTI: "bg-orange-100 text-orange-800 border-orange-200",
      "Entry Inhibitor": "bg-pink-100 text-pink-800 border-pink-200",
    };
    return colors[drugClass] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getRegimenLevelColor = (level: string) => {
    const colors: { [key: string]: string } = {
      "First-line": "bg-emerald-100 text-emerald-800 border-emerald-200",
      "Second-line": "bg-amber-100 text-amber-800 border-amber-200",
      "Third-line": "bg-red-100 text-red-800 border-red-200",
    };
    return colors[level] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  if (loading) {
    return (
      <>
        <Header
          title="ARV Regimens"
          subtitle="Manage and customize HIV antiretroviral treatment protocols"
        />
        <div className="p-6 space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="h-96">
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header
          title="ARV Regimens"
          subtitle="Manage and customize HIV antiretroviral treatment protocols"
        />
        <div className="p-6">
          <Card className="border-red-200 bg-red-50">
            <CardContent className="flex items-center justify-center py-12">
              <div className="text-center">
                <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-red-800 mb-2">
                  Error Loading Data
                </h3>
                <p className="text-red-600 mb-4">{error}</p>
                <Button
                  onClick={() => window.location.reload()}
                  variant="outline"
                >
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <Header
        title="ARV Regimens"
        subtitle="Manage and customize HIV antiretroviral treatment protocols"
      />

      <div className="p-6 space-y-6">
        {/* Search and Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by name, class, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-transparent"
            >
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-transparent"
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button size="sm" className="gap-2 bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4" />
              Add ARV
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">
                    Total ARVs
                  </p>
                  <p className="text-2xl font-bold text-blue-900">
                    {arvs.length}
                  </p>
                </div>
                <Pill className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">
                    First-line
                  </p>
                  <p className="text-2xl font-bold text-green-900">
                    {
                      arvs.filter((arv) => arv.regimenLevel === "First-line")
                        .length
                    }
                  </p>
                </div>
                <Activity className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-amber-600">
                    Second-line
                  </p>
                  <p className="text-2xl font-bold text-amber-900">
                    {
                      arvs.filter((arv) => arv.regimenLevel === "Second-line")
                        .length
                    }
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-amber-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600">
                    Drug Classes
                  </p>
                  <p className="text-2xl font-bold text-purple-900">
                    {new Set(arvs.map((arv) => arv.drugClass)).size}
                  </p>
                </div>
                <Info className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredArvs.length} of {arvs.length} ARV regimens
          </p>
        </div>

        {/* ARV Cards Grid */}
        {filteredArvs.length === 0 ? (
          <Card className="border-dashed border-2 border-gray-200">
            <CardContent className="flex items-center justify-center py-12">
              <div className="text-center">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  No ARVs Found
                </h3>
                <p className="text-gray-500">
                  {searchTerm
                    ? `No results for "${searchTerm}"`
                    : "No ARV regimens available"}
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredArvs.map((arv) => (
              <Card
                key={arv.arvId}
                className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 hover:border-blue-300"
              >
                <CardHeader className="pb-4 border-b border-gray-100">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-bold text-gray-900 mb-1">
                        {arv.genericName}
                      </CardTitle>
                      <p className="text-sm text-gray-500 font-mono">
                        ID: {arv.arvId}
                      </p>
                    </div>
                    <Pill className="h-5 w-5 text-blue-600 mt-1" />
                  </div>

                  <div className="flex flex-wrap gap-2 mt-3">
                    <Badge
                      className={`text-xs font-medium border ${getDrugClassColor(
                        arv.drugClass
                      )}`}
                    >
                      {arv.drugClass}
                    </Badge>
                    <Badge
                      className={`text-xs font-medium border ${getRegimenLevelColor(
                        arv.regimenLevel
                      )}`}
                    >
                      {arv.regimenLevel}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="pt-4 space-y-4">
                  {/* Key Information */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Pill className="h-3 w-3 text-gray-400" />
                        <span className="text-gray-600">Dosage:</span>
                      </div>
                      <p className="font-medium text-gray-900 ml-5">
                        {arv.dosageStrength}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Activity className="h-3 w-3 text-gray-400" />
                        <span className="text-gray-600">Route:</span>
                      </div>
                      <p className="font-medium text-gray-900 ml-5">
                        {arv.admRoute}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Info className="h-3 w-3 text-gray-400" />
                      <span className="text-gray-600">Recommended Dosage:</span>
                    </div>
                    <p className="font-medium text-gray-900 ml-5">
                      {arv.rcmDosage}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-3 w-3 text-gray-400" />
                        <span className="text-gray-600">Funding:</span>
                      </div>
                      <p className="font-medium text-gray-900 ml-5">
                        {arv.fundingSource}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3 text-gray-400" />
                        <span className="text-gray-600">Shelf Life:</span>
                      </div>
                      <p className="font-medium text-gray-900 ml-5">
                        {arv.shelfLife}
                      </p>
                    </div>
                  </div>

                  {/* Collapsible Sections */}
                  <div className="space-y-3 pt-2 border-t border-gray-100">
                    {arv.indication && arv.indication.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-green-700 text-sm mb-2 flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Indications ({arv.indication.length})
                        </h4>
                        <ul className="text-xs text-gray-600 space-y-1 ml-4">
                          {arv.indication
                            .slice(0, 2)
                            .map((item: string, idx: number) => (
                              <li key={idx} className="flex items-start gap-1">
                                <span className="text-green-500 mt-1">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          {arv.indication.length > 2 && (
                            <li className="text-green-600 font-medium">
                              +{arv.indication.length - 2} more...
                            </li>
                          )}
                        </ul>
                      </div>
                    )}

                    {arv.contraindication &&
                      arv.contraindication.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-red-700 text-sm mb-2 flex items-center gap-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            Contraindications ({arv.contraindication.length})
                          </h4>
                          <ul className="text-xs text-gray-600 space-y-1 ml-4">
                            {arv.contraindication
                              .slice(0, 2)
                              .map((item: string, idx: number) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-1"
                                >
                                  <span className="text-red-500 mt-1">•</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            {arv.contraindication.length > 2 && (
                              <li className="text-red-600 font-medium">
                                +{arv.contraindication.length - 2} more...
                              </li>
                            )}
                          </ul>
                        </div>
                      )}

                    {arv.sideEffect && arv.sideEffect.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-amber-700 text-sm mb-2 flex items-center gap-2">
                          <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                          Side Effects ({arv.sideEffect.length})
                        </h4>
                        <ul className="text-xs text-gray-600 space-y-1 ml-4">
                          {arv.sideEffect
                            .slice(0, 2)
                            .map((item: string, idx: number) => (
                              <li key={idx} className="flex items-start gap-1">
                                <span className="text-amber-500 mt-1">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          {arv.sideEffect.length > 2 && (
                            <li className="text-amber-600 font-medium">
                              +{arv.sideEffect.length - 2} more...
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-3 border-t border-gray-100">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-xs bg-transparent"
                    >
                      View Details
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-xs bg-transparent"
                    >
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
