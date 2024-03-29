
import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";

import ReservationsClient from "./ReservationsClient";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly> 
        <EmptyState title="Unauthorized" subtitle="Please login"/>
      </ClientOnly>
    )
  }

  // this is author of the listing side 
     //where load all of the rservation for our listing not our trips
     //all reservation that other people have made on our listing
  const reservations = await getReservations({ authorId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState title="No reservations found" subtitle="Looks like you have no reservations on your properties."/>
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
    <ReservationsClient reservations={reservations} currentUser={currentUser}/>
  </ClientOnly>
);
}
 
export default ReservationsPage;
