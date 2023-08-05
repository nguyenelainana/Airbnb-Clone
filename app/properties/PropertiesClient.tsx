"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";
import Modal from "../components/modals/Modal";

import axios from "axios";
import { SafeListing, SafeUser } from "../types";

interface PropertiesClientProps {
  listings: SafeListing[];
  currentUser: SafeUser | null;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
  listings,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");
  const [show, setShow] = useState(false);

  const handleAction = useCallback((id: string) => {
    setShow(true);
    setDeletingId(id);
  }, []);

  const handleSubmit = useCallback(() => {
    axios
      .delete(`/api/listings/${deletingId}`)
      .then(() => {
        toast.success("Property removed");
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
      <p> Are you sure you want to delete this property? </p>
    </div>
  );

  return (
    <Container>
      <Heading title="Properties " subtitle="List of your properties" />
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
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={handleAction}
            disabled={deletingId === listing.id}
            actionLabel="Delete property"
            currentUser={currentUser}
          />
        ))}
        <Modal
          isOpen={show}
          onClose={handleCancel}
          onSubmit={handleSubmit}
          title="Delete confirmation"
          body={bodyContent}
          actionLabel="Delete"
          secondaryActionLabel="No"
          secondaryAction={handleCancel}
        />
      </div>
    </Container>
  );
};

export default PropertiesClient;
