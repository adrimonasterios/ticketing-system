import { Schema, model, models } from "mongoose";

export interface ITicket {
  name: string;
  email: string;
  description: string;
  status: "new" | "in progress" | "resolved";
}

const TicketSchema = new Schema<ITicket>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
});

export default models.Ticket || model<ITicket>("Ticket", TicketSchema);
