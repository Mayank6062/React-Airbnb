//action it is a server com not an api call...
import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations(
  params: IParams
) {
  try {
    const { listingId, userId, authorId } = params; //depending on send lid uid aid
 
    const query: any = {}; //any type 
        
    if (listingId) { //if we send lid we can get all the reservation of that single listing 
      query.listingId = listingId;
    };

    if (userId) { //if serch userid we find all of the trips user have
      query.userId = userId;
    }

    if (authorId) { //if we serch authorid we can serch all of the reservation that other user made our listing..
      query.listing = { userId: authorId };
    }

    const reservations = await prisma.reservation.findMany({ //we find all of the res depending on query
      where: query,
      include: {
        listing: true //include bz we need one of the cases
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    //return listing by this we get error bz listing: true we send the listing;TRUE with date obj
    const safeReservations = reservations.map(
      (reservation) => ({
      ...reservation, //curr reservation
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
    }));

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}

/////////////////////////////////////////////////