"use client";
import { useRouter } from "next/navigation";

import Button from "./Button";
import Heading from "./Heading";
import SearchModal from "./modals/SearchModal";
import { useCallback, useState } from "react";

interface EmptyState {
  title?: string;
  subtitle?: string;
  // resetLabel?: string;
  content?: React.ReactNode;
}
const EmptyState: React.FC<EmptyState> = ({
  title = "No exact matches",
  subtitle = "Try changing or removing some of your filters",
  // resetLabel = "Remove all filters",
  content,
}) => {
  const router = useRouter();

  // const handleClick = useCallback(() => {
  //   setShow(true);
  // }, []);

  return (
    <div
      className="
        h-[60vh]
        flex
        flex-col
        gap-2
        justify-center
        items-center
        "
    >
      <Heading center title={title} subtitle={subtitle} />
      <div className="w-48 mt-4">
        {!content && (
          <Button
            outline
            label="Remove all filters"
            onClick={() => router.push("/")}
          />
        )}
        {content !== undefined && content}
      </div>
    </div>
  );
};

export default EmptyState;
