import prisma from "@/app/libs/prismadb";

//server component
//use to fetch listng without API route
export default async function getListings() {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    const SafeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return SafeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
