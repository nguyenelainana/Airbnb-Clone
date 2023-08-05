"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";

import axios from "axios";
import { SafeReservation, SafeUser } from "../types";
import Modal from "../components/modals/Modal";

interface TripsClientProps {
  reservations: SafeReservation[];
  currentUser: SafeUser | null;
}

const TripsClient: React.FC<TripsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [deletingId, setDeletingId] = useState("");

  const handleAction = useCallback((id: string) => {
    setShow(true);
    setDeletingId(id);
  }, []);

  const handleSubmit = useCallback(() => {
    axios
      .delete(`/api/reservations/${deletingId}`)
      .then(() => {
        toast.success("Reservation cancelled");
        setShow(false);
        setDeletingId("");
        router.refresh();
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error);
      });
  }, [router, deletingId]);

  const handleCancel = useCallback(() => {
    setShow(false);
    setDeletingId("");
  }, []);

  const bodyContent = (
    <div className="justify-left">
      <p> Are you sure you want to cancel this reservation?</p>
    </div>
  );

  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />
      <div
        className="
            mt-10
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            ld:grid-cols-4
            xl:grid-cols-5
            2xl:grid=cols-6
            gap-8"
      >
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={handleAction}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel reservation"
            currentUser={currentUser}
          />
        ))}
        <Modal
          isOpen={show}
          title="Confirm delete"
          body={bodyContent}
          actionLabel="Delete"
          onSubmit={handleSubmit}
          onClose={handleCancel}
          secondaryAction={handleCancel}
          secondaryActionLabel="No"
        />
      </div>
    </Container>
  );
};

export default TripsClient;
