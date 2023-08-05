export const dynamic = "force-dynamic";

import Container from "./components/Container";
import ClientOnly from "./components/ClientOnly";
import EmptyState from "./components/EmptyState";
import getListings, { IListingsParams } from "./actions/getListings";
import ListingCard from "./components/listings/ListingCard";
import getCurrentUser from "./actions/getCurrentUser";

interface HomeProps {
  searchParams: IListingsParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();
  //page is available for log out user, so no error is thrown.

  //return emptystate if none of the listings match criteria
  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }
  console.log("reservation", listings);

  return (
    <ClientOnly>
      <Container>
        <div
          className="
          pt-24
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8"
        >
          {listings.map((listing) => {
            return (
              <ListingCard
                key={listing.id}
                currentUser={currentUser}
                data={listing} //passing data into a client component from a server component that has a date object. System warning that date object can't render on client. created safeListing returns on server component
              />
            );
          })}
        </div>
      </Container>
    </ClientOnly>
  );
};

export default Home;
