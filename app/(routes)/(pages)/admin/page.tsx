"use client";
import Stats from "@@/Stats";
import List from "@@/common/List";
import { ITicket } from "../../api/_models/ticket";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import moment from "moment";
import Tag from "@@/common/Tag";
import Button from "@@/common/Button";
import { useRouter } from "next/navigation";
import { sortByString, titleCase } from "@/_utils/helpers";

const headers = [
  {
    label: "Name",
    field: "name",
    sortable: true,
  },
  {
    label: "Email",
    field: "email",
    sortable: true,
  },
  {
    label: "Status",
    field: "status",
    sortable: true,
  },
  {
    label: "Respond",
    field: "respond",
    srOnly: true,
  },
];

type StatusColorsType = { [key: string]: "gray" | "green" | "red" | "orange" };

const statusColors: StatusColorsType = {
  new: "gray",
  "in progress": "orange",
  resolved: "green",
};

const AdminView = () => {
  const router = useRouter();
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [sortingOrder, setSortingOrder] = useState<"asc" | "desc">("desc");
  const [sortingBy, setSortingBy] = useState<string>("status");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const displayData = useMemo(() => {
    return tickets
      .filter(
        (ticket: ITicket) =>
          ticket.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ticket.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map((ticket: ITicket) => ({
        ...ticket,
        createdAt: moment(new Date(ticket.createdAt)).format("MMM Do, YYYY"),
        status: (
          <Tag
            text={titleCase(ticket.status)}
            color={
              statusColors[
                ticket.status.toLowerCase() as keyof StatusColorsType
              ]
            }
          />
        ),
        respond: (
          <Button
            text={ticket.status === "resolved" ? "Details" : "Respond"}
            variant="primary"
            onClick={() => router.push(`/admin/tickets/${ticket._id}`)}
          />
        ),
      }));
  }, [tickets, searchTerm]);

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/tickets");
      const res = await response.json();
      setTickets(res);
    })();
  }, []);

  const handleSort = (header: string) => {
    const order = sortingOrder === "asc" ? "desc" : "asc";
    setSortingOrder(order);
    setSortingBy(header);

    const sortedTickets = tickets
      .slice()
      .sort((a, b) =>
        sortByString(
          a[header as keyof ITicket] as string,
          b[header as keyof ITicket] as string,
          order
        )
      );

    setTickets(sortedTickets);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <main className="flex flex-col items-center">
      <Stats tickets={tickets} />
      <div className="w-2/3 mt-12">
        <List
          headers={headers}
          items={displayData}
          title="Tickets"
          description="Search tickets by name or email"
          withSorting={{
            onSort: handleSort,
            sortingBy,
            sortingOrder,
          }}
          withSearch={{
            searchTerm,
            onSearch: handleSearch,
          }}
        />
      </div>
    </main>
  );
};

export default AdminView;
