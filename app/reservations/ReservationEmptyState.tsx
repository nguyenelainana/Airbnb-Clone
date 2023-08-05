"use client";

import EmptyState from "../components/EmptyState";
import Heading from "../components/Heading";

const ReservationEmptyState = () => {
  return (
    <EmptyState
      title="No reservations found"
      subtitle="Looks like you have no reservations"
      content
    />
  );
};
export default ReservationEmptyState;
