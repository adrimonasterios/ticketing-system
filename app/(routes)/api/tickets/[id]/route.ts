import dbConnect from "@/_utils/mongodb";
import { NextRequest, NextResponse } from "next/server";
import ticket from "../../_models/ticket";
import { ObjectId } from "mongodb";

export const GET = dbConnect(
  async (request: NextRequest, { params }: { params: { id: string } }) => {
    try {
      const foundTicket = await ticket.findOne({
        _id: params.id,
      });

      return NextResponse.json(foundTicket);
    } catch (error) {
      console.log(error);
    }
  }
);

export const PUT = dbConnect(async function (
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const ticketBody = await request.json();
    const updatedTicket = await ticket.updateOne(
      { _id: params.id },
      { ...ticketBody }
    );

    return NextResponse.json(updatedTicket);
  } catch (error) {
    console.log({ error });
  }
});
