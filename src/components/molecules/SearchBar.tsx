"use client";

import { cn, dataDisabledProps } from "@/lib/utils";
import { Input } from "@/components/atoms/Input";
import { FiSearch } from "react-icons/fi";

interface SearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function SearchBar({
  value,
  onChange,
  onSearch,
  placeholder = "Search...",
  className,
  disabled,
}: SearchBarProps) {
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      onSearch?.(e.currentTarget.value);
    }
  }

  return (
    <div
      {...dataDisabledProps(disabled)}
      className={cn("relative flex items-center", className)}
    >
      <span
        className="pointer-events-none absolute left-3 text-zinc-400"
        aria-hidden
      >
        <FiSearch className="size-4" />
      </span>
      <Input
        type="search"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="pl-9"
        fullWidth
        disabled={disabled}
      />
    </div>
  );
}
