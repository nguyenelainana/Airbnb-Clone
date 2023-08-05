"use client";

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { SafeReservation, SafeUser } from "../types";

import Heading from "../components/Heading";
import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";
import Modal from "../components/modals/Modal";

interface ReservationClientProps {
  reservations: SafeReservation[];
  currentUser: SafeUser | null;
}

const ReservationsClient: React.FC<ReservationClientProps> = ({
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
        toast.success("Guest reservation cancelled");
        setShow(false);
        setDeletingId("");
        router.refresh();
      })
      .catch(() => {
        toast.error("Something went wrong.");
      });
  }, [deletingId, router]);

  const handleCancel = useCallback(() => {
    setShow(false);
    setDeletingId("");
  }, []);

  const bodyContent = (
    <div className="justify-left">
      {/* <Heading
        title="Delete confirmation"
        subtitle="Are you sure you want to permanently delete this reservation?"
      /> */}
      <p> Are you sure you want to permanently delete this reservation?</p>
    </div>
  );

  return (
    <Container>
      <Heading title="Reservations" subtitle="Bookings on your properties" />
      <div
        className="
            mt-10
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-col-3
            ls:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
            "
      >
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id} //special props, key to keep truck of sibling components. Only when u map a bunch of the same components.
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={handleAction}
            disabled={deletingId === reservation.id}
            actionLabel={"Cancel guest reservation"}
            currentUser={currentUser}
          />
        ))}

        <Modal
          title="Confirm delete"
          body={bodyContent}
          actionLabel="Delete"
          isOpen={show}
          onSubmit={handleSubmit}
          secondaryActionLabel="No"
          secondaryAction={handleCancel}
          onClose={handleCancel}
        />
      </div>
    </Container>
  );
};
export default ReservationsClient;
