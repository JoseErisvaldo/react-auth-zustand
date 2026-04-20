import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "./button";

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
  className?: string;
};

const getVisiblePages = (page: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (page <= 4) {
    return [1, 2, 3, 4, 5, "ellipsis-right", totalPages] as const;
  }

  if (page >= totalPages - 3) {
    return [
      1,
      "ellipsis-left",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ] as const;
  }

  return [
    1,
    "ellipsis-left",
    page - 1,
    page,
    page + 1,
    "ellipsis-right",
    totalPages,
  ] as const;
};

export function Pagination({
  page,
  totalPages,
  onPageChange,
  disabled = false,
  className,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = getVisiblePages(page, totalPages);
  const isPreviousDisabled = disabled || page <= 1;
  const isNextDisabled = disabled || page >= totalPages;

  return (
    <nav
      aria-label="Paginacao"
      className={cn(
        "flex flex-wrap items-center justify-center gap-2 sm:justify-between",
        className,
      )}
    >
      <Button
        type="button"
        variant="outline"
        onClick={() => onPageChange(page - 1)}
        disabled={isPreviousDisabled}
      >
        <ChevronLeft />
        Anterior
      </Button>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {pages.map((item, index) => {
          if (typeof item !== "number") {
            return (
              <span
                key={`${item}-${index}`}
                className="flex size-8 items-center justify-center text-muted-foreground"
              >
                <MoreHorizontal className="size-4" />
              </span>
            );
          }

          const isCurrentPage = item === page;

          return (
            <Button
              key={item}
              type="button"
              size="icon-sm"
              variant={isCurrentPage ? "default" : "outline"}
              onClick={() => onPageChange(item)}
              disabled={disabled}
              aria-current={isCurrentPage ? "page" : undefined}
            >
              {item}
            </Button>
          );
        })}
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={() => onPageChange(page + 1)}
        disabled={isNextDisabled}
      >
        Proximo
        <ChevronRight />
      </Button>
    </nav>
  );
}
