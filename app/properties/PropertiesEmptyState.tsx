"use client";

import EmptyState from "../components/EmptyState";
import Button from "../components/Button";
import useRentModal from "../hooks/useRentModal";

const PropertiesEmptyState = () => {
  const rentModal = useRentModal();

  return (
    <EmptyState
      title="No properties found"
      subtitle="Looks like you have no properties."
      content={
        <Button
          label="Airbnb your home"
          onClick={rentModal.onOpen}
          outline={false}
        />
      }
    />
  );
};

export default PropertiesEmptyState;
