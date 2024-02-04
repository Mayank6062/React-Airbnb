import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;  //accept the listingId 
}

export default async function getListingById(
  params: IParams  //perameter
) { //onen an obj hair
  try {
    const { listingId } = params; //extract lisitngId from params

    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true //name of the user which own that string.
      }
    });

    if (!listing) {
      return null;
    }

    //return listing by this we get warning date obj not pass
    //we senetizes the strng
    return {
      ...listing,
      createdAt: listing.createdAt.toString(), //createdAt replace to string fromst
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toString(),
        updatedAt: listing.user.updatedAt.toString(),
        emailVerified: 
          listing.user.emailVerified?.toString() || null,
      }
    };
  } catch (error: any) {
    throw new Error(error);
  }
}

///////////////////////////////////////////////////