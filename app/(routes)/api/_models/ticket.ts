import { Schema, model, models } from "mongoose";

export interface ITicket {
  _id: string;
  name: string;
  email: string;
  description: string;
  response: string;
  status: "new" | "in progress" | "resolved";
  createdAt: Date;
  updatedAt: Date;
}

const TicketSchema = new Schema<ITicket>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    description: { type: String, required: true },
    response: { type: String },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

export default models.Ticket || model<ITicket>("Ticket", TicketSchema);
