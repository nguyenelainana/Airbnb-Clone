"use client";

import EmptyState from "../components/EmptyState";
import Button from "../components/Button";
import useSearchModal from "../hooks/useSearchModal";

const TripEmptyState = () => {
  const search = useSearchModal();

  return (
    <EmptyState
      title="No trips found"
      subtitle="Looks like you haven't reserved any trips."
      // resetLabel="Start Searching"
      content={
        <Button
          label="Start Searching"
          onClick={search.onOpen}
          outline={false}
        />
      }
    />
  );
};

export default TripEmptyState;
