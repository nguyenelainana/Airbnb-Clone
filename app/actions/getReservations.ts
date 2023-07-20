import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

//allow us to query listing through these 3 places on our website

export default async function getReservations(params: IParams) {
  try {
    const { listingId, userId, authorId } = params; //extract parameters

    const query: any = {}; //query with type any and open and empty object. Creating a diff query

    if (listingId) {
      query.listingId = listingId; //find all reservation for a listing
    }

    if (userId) {
      query.userId = userId; //all trips a user have
    }

    if (authorId) {
      query.listing = { userId: authorId }; //reservation other users made with our listing
    }

    //reservation fetch function. Fetch reservation under those query
    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    //made dateobject safe to traverse between client/server components
    const SafeReservations = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
    }));

    return SafeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
