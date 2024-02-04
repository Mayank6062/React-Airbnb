//if we direct send the rq /favorite we see no favorite listing hese
//even those we have not loggdin here 
//by this even if you have logout but you can access 
//your trips, reservation, properties, favorotes...
export { default } from "next-auth/middleware";

export const config = {
    matcher: [
        "/trips",
        "/reservations",
        "/properties",
        "/favorites",
    ]
}

//npm run link  //for directally pushinto the github//////////////////////////////////////////////