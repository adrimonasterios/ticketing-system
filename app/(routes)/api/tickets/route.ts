import dbConnect from "@/_utils/mongodb";
import { NextResponse } from "next/server";
import ticket from "../_models/ticket";

export const GET = dbConnect(async function () {
  const tickets = await ticket.find({});

  return NextResponse.json(tickets);
});

export const POST = dbConnect(async function (request: Request) {
  try {
    const ticketBody = await request.json();
    const newTicket = await ticket.create({ ...ticketBody, status: "new" });

    return NextResponse.json(newTicket);
  } catch (error) {
    console.log({ error });
  }
});
