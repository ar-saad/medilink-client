"use client";

import DataTableFilters, {
  DataTableFilterConfig,
  DataTableFilterValues,
} from "@/components/shared/table/DataTableFilters";
import DataTableSearch from "@/components/shared/table/DataTableSearch";
import DoctorCard from "./DoctorCard";
import FilterSidebar from "./FilterSidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useServerManagedDataTable } from "@/hooks/useServerManagedDataTable";
import {
  serverManagedFilter,
  useServerManagedDataTableFilters,
} from "@/hooks/useServerManagedDataTableFilters";
import { useServerManagedDataTableSearch } from "@/hooks/useServerManagedDataTableSearch";
import { getAllSpecialties, getDoctors } from "@/services/doctor.services";
import { TDoctor } from "@/types/doctor.types";
import { TSpecialty } from "@/types/specialty.types";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 12;
const SPECIALTIES_FILTER_KEY = "specialties.specialty.title";
const APPOINTMENT_FEE_FILTER_KEY = "appointmentFee";
const CONSULTATION_ALLOWED_QUERY_KEYS = new Set([
  "page",
  "limit",
  "sortBy",
  "sortOrder",
  "searchTerm",
  "gender",
  SPECIALTIES_FILTER_KEY,
  `${APPOINTMENT_FEE_FILTER_KEY}[gte]`,
  `${APPOINTMENT_FEE_FILTER_KEY}[lte]`,
]);

const CONSULTATION_FILTER_DEFINITIONS = [
  serverManagedFilter.single("gender"),
  serverManagedFilter.multi(SPECIALTIES_FILTER_KEY),
  serverManagedFilter.range(APPOINTMENT_FEE_FILTER_KEY),
];

const getSanitizedConsultationQueryString = (queryString: string) => {
  const currentParams = new URLSearchParams(queryString);
  const sanitizedParams = new URLSearchParams();

  currentParams.forEach((value, key) => {
    if (!CONSULTATION_ALLOWED_QUERY_KEYS.has(key)) {
      return;
    }

    const normalizedValue = value.trim();
    if (!normalizedValue) {
      return;
    }

    if (key === SPECIALTIES_FILTER_KEY) {
      sanitizedParams.append(key, normalizedValue);
      return;
    }

    sanitizedParams.set(key, normalizedValue);
  });

  return sanitizedParams.toString();
};

const Pagination = ({
  currentPage,
  totalPages,
  isLoading,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
}) => {
  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button
        type="button"
        variant="outline"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isLoading || currentPage <= 1}
      >
        Prev
      </Button>

      {pageNumbers.map((page) => (
        <Button
          key={page}
          type="button"
          variant={page === currentPage ? "default" : "outline"}
          onClick={() => onPageChange(page)}
          disabled={isLoading}
        >
          {page}
        </Button>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isLoading || currentPage >= totalPages}
      >
        Next
      </Button>
    </div>
  );
};

const DoctorsList = ({
  initialQueryString,
  isAuthenticated,
  viewerRole,
}: {
  initialQueryString: string;
  isAuthenticated: boolean;
  viewerRole?: string | null;
}) => {
  const searchParams = useSearchParams();

  const {
    queryStringFromUrl,
    optimisticSortingState,
    optimisticPaginationState,
    isRouteRefreshPending,
    updateParams,
    handleSortingChange,
    handlePaginationChange,
  } = useServerManagedDataTable({
    searchParams,
    defaultPage: DEFAULT_PAGE,
    defaultLimit: DEFAULT_LIMIT,
  });

  const queryString = useMemo(() => {
    return getSanitizedConsultationQueryString(
      queryStringFromUrl || initialQueryString,
    );
  }, [initialQueryString, queryStringFromUrl]);

  const { searchTermFromUrl, handleDebouncedSearchChange } =
    useServerManagedDataTableSearch({
      searchParams,
      updateParams,
    });

  const { filterValues, handleFilterChange, clearAllFilters } =
    useServerManagedDataTableFilters({
      searchParams,
      definitions: CONSULTATION_FILTER_DEFINITIONS,
      updateParams,
    });

  const {
    data: doctorsResponse,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["doctors", queryString],
    queryFn: () => getDoctors(queryString),
  });

  const { data: specialtiesResponse } = useQuery({
    queryKey: ["specialties"],
    queryFn: getAllSpecialties,
    staleTime: 1000 * 60 * 60 * 6,
    gcTime: 1000 * 60 * 60 * 24,
  });

  const doctors = doctorsResponse?.data ?? [];
  const meta = doctorsResponse?.meta;
  const specialties = useMemo(
    () => specialtiesResponse?.data ?? [],
    [specialtiesResponse?.data],
  );

  const filterConfigs = useMemo<DataTableFilterConfig[]>(() => {
    return [
      {
        id: "gender",
        label: "Gender",
        type: "single-select",
        options: [
          { label: "Male", value: "MALE" },
          { label: "Female", value: "FEMALE" },
          { label: "Other", value: "OTHER" },
        ],
      },
      {
        id: SPECIALTIES_FILTER_KEY,
        label: "Specialties",
        type: "multi-select",
        options: specialties.map((specialty: TSpecialty) => ({
          label: specialty.title,
          value: specialty.title,
        })),
      },
      {
        id: APPOINTMENT_FEE_FILTER_KEY,
        label: "Fee Range",
        type: "range",
      },
    ];
  }, [specialties]);

  const filterValuesForControls = useMemo<DataTableFilterValues>(() => {
    return {
      gender: filterValues.gender,
      [SPECIALTIES_FILTER_KEY]: filterValues[SPECIALTIES_FILTER_KEY],
      [APPOINTMENT_FEE_FILTER_KEY]: filterValues[APPOINTMENT_FEE_FILTER_KEY],
    };
  }, [filterValues]);

  const isBusy = isLoading || isFetching || isRouteRefreshPending;

  return (
    <section className="space-y-6 py-8 max-w-7xl mx-auto px-4">
      {/* Header Section */}
      <div className="relative overflow-hidden rounded-2xl border bg-linear-to-br from-cyan-50 via-white to-blue-50 p-6 md:p-8">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-200/30 blur-2xl" />
        <div className="absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-cyan-200/30 blur-2xl" />
        <div className="relative space-y-3">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl text-primary">
            Consult With Our Specialists
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
            Discover trusted doctors, compare experience and fees, and find the
            right specialist for your health needs.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar - Filters */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="sticky top-24 space-y-6">
            <FilterSidebar
              filters={filterConfigs}
              values={filterValuesForControls}
              onFilterChange={handleFilterChange}
              onClearAll={clearAllFilters}
              isLoading={isBusy}
            />
          </div>
        </aside>

        {/* Main Content - Search, Sort, and Grid */}
        <main className="flex-1 space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-full sm:flex-1">
              <DataTableSearch
                key={searchTermFromUrl}
                initialValue={searchTermFromUrl}
                placeholder="Search by name, qualification..."
                debounceMs={700}
                onDebouncedChange={handleDebouncedSearchChange}
                isLoading={isBusy}
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-sm font-medium whitespace-nowrap">
                Sort by:
              </span>
              <Select
                value={
                  optimisticSortingState[0]?.id
                    ? `${optimisticSortingState[0]?.id}:${optimisticSortingState[0]?.desc ? "desc" : "asc"}`
                    : "default"
                }
                onValueChange={(value) => {
                  if (value === "default") {
                    handleSortingChange([]);
                    return;
                  }
                  const [sortBy, sortOrder] = value.split(":");
                  handleSortingChange([
                    { id: sortBy, desc: sortOrder === "desc" },
                  ]);
                }}
              >
                <SelectTrigger
                  className="w-full sm:w-48 h-10"
                  disabled={isBusy}
                >
                  <SelectValue placeholder="Sort doctors" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="averageRating:desc">
                    Rating (High to Low)
                  </SelectItem>
                  <SelectItem value="appointmentFee:asc">
                    Fee (Low to High)
                  </SelectItem>
                  <SelectItem value="experience:desc">
                    Experience (High to Low)
                  </SelectItem>
                  <SelectItem value="createdAt:desc">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {isBusy && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="h-64 rounded-2xl border bg-muted animate-pulse"
                />
              ))}
            </div>
          )}

          {!isBusy && doctors.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 rounded-2xl border bg-card text-center space-y-4">
              <div className="size-16 rounded-full bg-muted flex items-center justify-center">
                <X className="size-8 text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <p className="text-lg font-medium">No doctors found</p>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your filters or search terms.
                </p>
              </div>
              <Button variant="outline" onClick={clearAllFilters}>
                Clear all filters
              </Button>
            </div>
          )}

          {!isBusy && doctors.length > 0 && (
            <>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {doctors.map((doctor: TDoctor) => (
                  <DoctorCard
                    key={String(doctor.id)}
                    doctor={doctor}
                    isAuthenticated={isAuthenticated}
                    viewerRole={viewerRole}
                  />
                ))}
              </div>

              <div className="space-y-4 pt-6 border-t">
                <Pagination
                  currentPage={optimisticPaginationState.pageIndex + 1}
                  totalPages={meta?.totalPages ?? 1}
                  isLoading={isBusy}
                  onPageChange={(page) => {
                    handlePaginationChange({
                      pageIndex: page - 1,
                      pageSize: optimisticPaginationState.pageSize,
                    });
                  }}
                />
                <p className="text-center text-sm text-muted-foreground">
                  Showing {doctors.length} of {meta?.total ?? doctors.length}{" "}
                  doctors
                </p>
              </div>
            </>
          )}
        </main>
      </div>
    </section>
  );
};

export default DoctorsList;
