"use client";

import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDataTable } from "@/components/context/table-query";

export function SearchBar({ onSearch }: {
  onSearch: (query: string) => void;
}) {
  const [query, setQuery] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    debounced(event.target.value);
  };

  const debounced = useDebouncedCallback(
    (value) => {
      onSearch(value);
    },
    // delay in ms
    200
  );

  return (
    <div className="relative">
      <Input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Buscar..."
        className="pl-10"
      />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <SearchIcon className="h-5 w-5 text-gray-400" />
      </div>
    </div>
  );
}

export function SearchBarDatatable() {
  const { meta, setMeta, pagination, setPagination } = useDataTable();

  return (
    <SearchBar onSearch={(value) => {
      if (setMeta) {

        if (value == "") {
          const { search, ...metas } = meta;
          setMeta(metas);


        } else {
          setMeta({
            ...meta,
            search: value
          });
        }
        const { pageIndex, pageSize } = pagination;
        setPagination({
          pageIndex: 0,
          pageSize
        });

      }
    }} />
  );
}