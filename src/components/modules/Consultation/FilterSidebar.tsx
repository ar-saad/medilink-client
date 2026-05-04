"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DataTableFilterConfig,
  DataTableFilterValues,
  DataTableRangeValue,
  RangeOperator,
} from "@/components/shared/table/DataTableFilters";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState, useEffect } from "react";

interface FilterSidebarProps {
  filters: DataTableFilterConfig[];
  values: DataTableFilterValues;
  onFilterChange: (filterId: string, value: any) => void;
  onClearAll: () => void;
  isLoading?: boolean;
}

const FilterSidebar = ({
  filters,
  values,
  onFilterChange,
  onClearAll,
  isLoading,
}: FilterSidebarProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="h-8 px-2 text-muted-foreground hover:text-primary"
          disabled={isLoading}
        >
          Reset All
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={filters.map((f) => f.id)} className="w-full">
        {filters.map((filter) => (
          <AccordionItem key={filter.id} value={filter.id} className="border-b-0">
            <AccordionTrigger className="py-3 hover:no-underline">
              <span className="text-sm font-medium">{filter.label}</span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="pt-1 pb-4">
                {filter.type === "single-select" && (
                  <SingleSelectControl
                    filter={filter}
                    value={(values[filter.id] as string) || "all"}
                    onFilterChange={onFilterChange}
                    isLoading={isLoading}
                  />
                )}
                {filter.type === "multi-select" && (
                  <MultiSelectControl
                    filter={filter}
                    value={(values[filter.id] as string[]) || []}
                    onFilterChange={onFilterChange}
                    isLoading={isLoading}
                  />
                )}
                {filter.type === "range" && (
                  <RangeControl
                    filter={filter}
                    value={(values[filter.id] as DataTableRangeValue) || {}}
                    onFilterChange={onFilterChange}
                    isLoading={isLoading}
                  />
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

const SingleSelectControl = ({
  filter,
  value,
  onFilterChange,
  isLoading,
}: {
  filter: any;
  value: string;
  onFilterChange: any;
  isLoading?: boolean;
}) => {
  const options = [{ label: "All", value: "all" }, ...filter.options];

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option: any) => {
        const isActive = value === option.value;
        return (
          <Button
            key={option.value}
            variant={isActive ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterChange(filter.id, option.value === "all" ? undefined : option.value)}
            disabled={isLoading}
            className="h-8 text-xs px-3"
          >
            {option.label}
          </Button>
        );
      })}
    </div>
  );
};

const MultiSelectControl = ({
  filter,
  value,
  onFilterChange,
  isLoading,
}: {
  filter: any;
  value: string[];
  onFilterChange: any;
  isLoading?: boolean;
}) => {
  const handleChange = (optionValue: string, checked: boolean) => {
    const nextValues = checked
      ? [...value, optionValue]
      : value.filter((v) => v !== optionValue);
    onFilterChange(filter.id, nextValues.length > 0 ? nextValues : undefined);
  };

  return (
    <div className="space-y-2">
      {filter.options.map((option: any) => (
        <div key={option.value} className="flex items-center space-x-2">
          <Checkbox
            id={`${filter.id}-${option.value}`}
            checked={value.includes(option.value)}
            onCheckedChange={(checked) => handleChange(option.value, !!checked)}
            disabled={isLoading}
          />
          <Label
            htmlFor={`${filter.id}-${option.value}`}
            className="text-sm font-normal cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {option.label}
          </Label>
        </div>
      ))}
    </div>
  );
};

const RangeControl = ({
  filter,
  value,
  onFilterChange,
  isLoading,
}: {
  filter: any;
  value: DataTableRangeValue;
  onFilterChange: any;
  isLoading?: boolean;
}) => {
  const [min, setMin] = useState(value.gte || "");
  const [max, setMax] = useState(value.lte || "");

  useEffect(() => {
    setMin(value.gte || "");
    setMax(value.lte || "");
  }, [value]);

  const handleApply = () => {
    const nextValue: DataTableRangeValue = {};
    if (min) nextValue.gte = min;
    if (max) nextValue.lte = max;
    onFilterChange(filter.id, Object.keys(nextValue).length > 0 ? nextValue : undefined);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="grid gap-1.5 flex-1">
          <Label htmlFor={`${filter.id}-min`} className="text-[10px] uppercase text-muted-foreground font-semibold">
            Min
          </Label>
          <Input
            id={`${filter.id}-min`}
            type="number"
            placeholder="0"
            value={min}
            onChange={(e) => setMin(e.target.value)}
            className="h-8 text-sm"
            disabled={isLoading}
          />
        </div>
        <div className="grid gap-1.5 flex-1">
          <Label htmlFor={`${filter.id}-max`} className="text-[10px] uppercase text-muted-foreground font-semibold">
            Max
          </Label>
          <Input
            id={`${filter.id}-max`}
            type="number"
            placeholder="No limit"
            value={max}
            onChange={(e) => setMax(e.target.value)}
            className="h-8 text-sm"
            disabled={isLoading}
          />
        </div>
      </div>
      <Button size="sm" className="w-full h-8" onClick={handleApply} disabled={isLoading}>
        Apply Range
      </Button>
    </div>
  );
};

export default FilterSidebar;
