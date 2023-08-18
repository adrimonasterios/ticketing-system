"use client";

import { validateEmail } from "@/_utils/helpers";
import Button from "@@/common/Button";
import Container from "@@/common/Container";
import Input from "@@/common/Form/Input";
import TextArea from "@@/common/Form/TextArea";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

type Form = {
  name: string;
  email: string;
  description: string;
};

const TicketCreation = () => {
  const router = useRouter();
  const [form, setForm] = useState<Form>({
    name: "",
    email: "",
    description: "",
  });
  const [error, setError] = useState<{ [key: string]: string } | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    const missingValue = Object.keys(form).find((k) => !form[k as keyof Form]);
    if (!validateEmail(form.email)) {
      setError({ email: "Please enter a valid email" });
      return false;
    } else if (missingValue) {
      setError({ [missingValue]: `This is a required field` });
      return false;
    }
    if (error) setError(null);
    return true;
  };

  const handleTicketCreate = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    await fetch("/api/tickets/", {
      method: "POST",
      body: JSON.stringify(form),
    });
    router.push("/");
  };

  return (
    <div className="flex justify-center items-start">
      <div className="w-1/3 px-12 py-8">
        <h3 className="mb-4">Create Ticket</h3>
        <p>
          Please fill out the Ticket form by adding your name, email and a
          description of the problem you are experiencing. When writing the
          description please take the following factors into accout:
        </p>
        <ul className="my-4">
          <li>When was the last time that this happened?</li>
          <li>Where did this happen?</li>
          <li>
            Is there a set of clear steps to follow in order to encounter that
            problem?
          </li>
        </ul>
        <p>
          Once submitted you are going to get an email when we have an update on
          your ticket.
        </p>
      </div>
      <Container className="w-1/2 px-12 py-8">
        <form onSubmit={handleTicketCreate}>
          <h3 className="mb-4">New Ticket</h3>
          <Input
            label="Name"
            value={form.name}
            name="name"
            onChange={handleChange}
            errorMessage={error?.name || ""}
          />
          <Input
            label="Email"
            value={form.email}
            name="email"
            onChange={handleChange}
            errorMessage={error?.email || ""}
          />
          <TextArea
            label="Description"
            value={form.description}
            name="description"
            rows={4}
            onChange={handleChange}
            errorMessage={error?.description || ""}
          />
          <div className="flex justify-end mt-4">
            <Button text="Submit" type="submit" />
          </div>
        </form>
      </Container>
    </div>
  );
};

export default TicketCreation;
