import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";

export async function POST(
  request: Request,  //post provide req then open the fun.
) {
  const body = await request.json(); //get body
  const { //extract req field from the body
    email,
    name,
    password,
   } = body;

   const hashedPassword = await bcrypt.hash(password, 12);

   const user = await prisma.user.create({
    data: {  //store that data
      email,
      name,
      hashedPassword,
    }
  });

  return NextResponse.json(user);
}

//////////////////////////////////////////////////