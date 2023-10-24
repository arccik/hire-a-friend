import React from "react";
import {
  Pagination,
  PaginationItemType,
  PaginationItemRenderProps,
} from "@nextui-org/react";
import { BsChevronCompactLeft } from "react-icons/bs";
import { cn } from "~/lib/utils";

type PropsType = {
  total: number;
  onChange: (page: number) => void;
  currentPage: number;
};

export default function PaginationOrange({
  total,
  onChange,
  currentPage,
}: PropsType) {
  const renderItem = ({
    ref,
    value,
    isActive,
    onNext,
    onPrevious,
    setPage,
    className,
  }: PaginationItemRenderProps) => {
    if (value === PaginationItemType.NEXT) {
      return (
        <button
          className={cn(className, "min-w-8 h-8 w-8 bg-default-200/50")}
          onClick={onNext}
        >
          <BsChevronCompactLeft className="rotate-180" />
        </button>
      );
    }

    if (value === PaginationItemType.PREV) {
      return (
        <button
          className={cn(className, "min-w-8 h-8 w-8 bg-default-200/50")}
          onClick={onPrevious}
        >
          <BsChevronCompactLeft />
        </button>
      );
    }

    if (value === PaginationItemType.DOTS) {
      return <button className={className}>...</button>;
    }

    // cursor is the default item
    return (
      <button
        ref={ref}
        className={cn(
          className,
          isActive &&
            "bg-gradient-to-br from-orange-500 to-pink-500 font-bold text-white",
        )}
        onClick={() => setPage(value)}
      >
        {value}
      </button>
    );
  };

  return (
    <Pagination
      className="m-10 flex place-content-center "
      disableCursorAnimation
      showControls
      total={total}
      onChange={onChange}
      initialPage={1}
      radius="full"
      renderItem={renderItem}
      variant="light"
    />
  );
}
