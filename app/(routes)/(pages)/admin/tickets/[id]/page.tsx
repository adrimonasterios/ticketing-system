"use client";

import { ITicket } from "@/(routes)/api/_models/ticket";
import { titleCase } from "@/_utils/helpers";
import Button from "@@/common/Button";
import Container from "@@/common/Container";
import Input from "@@/common/Form/Input";
import Select from "@@/common/Form/Select";
import TextArea from "@@/common/Form/TextArea";
import moment from "moment";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

type ResolveForm = {
  status: string;
  response: string;
};

const DataSummary = ({
  title,
  dateField,
  fields,
  ticket,
}: {
  title: string;
  dateField: string;
  fields: string[];
  ticket: ITicket;
}) => {
  return (
    <div className="w-1/2 px-12 py-8">
      <h3 className="mb-2">{title}</h3>
      <div className="flex mb-6">
        <span className="text-sm">
          {moment(ticket?.[dateField as keyof ITicket] as string).format(
            "MMM Do, YYYY"
          ) || ""}
        </span>
      </div>
      {fields.map((field, index) => (
        <div className="flex flex-col mb-2" key={`field-${index}`}>
          <span className="mr-4 text-gray-500 text-sm">{titleCase(field)}</span>
          <span className="text-sm">
            {ticket[field as keyof ITicket] as string}
          </span>
        </div>
      ))}
    </div>
  );
};

const Ticket = () => {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState<ResolveForm>({
    status: "",
    response: "",
  });
  const [error, setError] = useState<{ [key: string]: string } | null>(null);
  const [ticket, setTicket] = useState<ITicket | null>(null);

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/tickets/${id}`);
      const res = await response.json();
      setTicket(res);
      setForm({ response: res.response, status: titleCase(res.status) });
    })();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const validateForm = () => {
    if (!form.response) {
      setError({ response: `This is a required field` });
      return false;
    }
    if (error) setError(null);
    return true;
  };

  const handleTicketResolve = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    await fetch(`/api/tickets/${id}`, {
      method: "PUT",
      body: JSON.stringify({ ...form, status: form.status.toLowerCase() }),
    });
    if (form.status === "resolved")
      console.log(
        "Would normally send email here to the user with body: Dear {ClientName}, The ticket you submitted on {CreatedDate} is now {Status}. Details about your ticket: {TicketResponse}. Thank you for your patience, Best Regards, Zealthy Team "
      );
    router.push("/admin");
  };

  if (!ticket) return <div>Loading..</div>;
  return (
    <div className="flex justify-center items-start w-full">
      <DataSummary
        title={`Ticket ID: ${id}`}
        dateField="createdAt"
        fields={["name", "email", "description"]}
        ticket={ticket}
      />
      {ticket.status === "resolved" ? (
        <DataSummary
          title={`Resolution`}
          dateField="updatedAt"
          fields={["status", "response"]}
          ticket={ticket}
        />
      ) : (
        <Container className="w-1/2 px-12 py-8">
          <form onSubmit={handleTicketResolve}>
            <h3 className="mb-4">Resolution</h3>
            <div className="my-4">
              <Select
                items={["New", "In Progress", "Resolved"]}
                label="Status"
                name="status"
                value={form.status}
                onChange={handleSelectChange}
              />
            </div>
            <TextArea
              label="Response"
              value={form.response}
              name="response"
              rows={4}
              onChange={handleChange}
              errorMessage={error?.description || ""}
            />
            <div className="flex justify-end mt-4">
              <Button text="Submit" type="submit" />
            </div>
          </form>
        </Container>
      )}
    </div>
  );
};

export default Ticket;
