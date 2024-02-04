import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  reservationId?: string;
}

export async function DELETE( //that function delete our reservetion that is reserved
  request: Request, 
  { params }: { params: IParams }
)
 {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { reservationId } = params;

  if (!reservationId || typeof reservationId !== 'string') {
    throw new Error('Invalid ID');
  }

  const reservation = await prisma.reservation.deleteMany({
    where: { //reservation only delete that particular person which is 
      id: reservationId,
      OR: [ 
        { userId: currentUser.id }, //creater of reservation 
        { listing: { userId: currentUser.id } } //creater of listing that the resrvation is own
      ] //means owner of houce can cancle any reservtion
    }
  });

  return NextResponse.json(reservation);
}
/////////////////////////////////