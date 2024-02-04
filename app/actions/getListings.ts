import prisma from "@/app/libs/prismadb";
//this is my server component that is load the listing their is  noo need to api call

//when we search the listing we want we get totally correct result base on
//loc info  date hence that props added with all of the listings...

export interface IListingsParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export default async function getListings(
  params: IListingsParams
) {
  try {
    const {
      userId,
      roomCount, 
      guestCount, 
      bathroomCount, 
      locationValue,
      startDate,
      endDate,
      category,
    } = params;

    let query: any = {}; //query is an obj.

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    if (roomCount) {
      query.roomCount = { //+ use bz we send roomCount initally type of  a str when we send it by + it convert in to the definet num
        gte: +roomCount //gte -> grater than or equal // all listing either we equal amout of uer send or more than that but
        //we filter out evry thig that has less rooms that we need we get the result that we need
      }
    }

    if (guestCount) {
      query.guestCount = {
        gte: +guestCount
      }
    }

    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount
      }
    }

    if (locationValue) {
      query.locationValue = locationValue;
    }

    
    if (startDate && endDate) { //filter for our date range
      query.NOT = { //filter out all listing which have a resrvation in our desired date range
        reservations: { //we are going to use reservase filtering on this so we working to wrte a filter 
           //that actully find all of this listing inside of that date range by using query.not we can reverse that logic
          some: {
            OR: [ //by these two combination we filter out all kinds of conflict in reservstion if their is single day in the reservation date range we
            //are going to filter out that lilsting bz we can not create a 
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate }
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate }
              }
            ]
          }
        }
      }
    }


    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      }
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}

////////////////////////////////////////////////////////////////