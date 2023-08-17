"use client";
import Stats from "@@/Stats";
import Button, { ButtonProps } from "@@/common/Button";
import Container from "@@/common/Container";
import HeroIcon from "@@/common/HeroIcon";
import { useRouter } from "next/navigation";

type BoxType = {
  icon: string;
  text: string;
  button: ButtonProps;
};

const Box = ({ icon, text, button }: BoxType) => {
  return (
    <Container className="w-5/12 h-full flex flex-col items-center ">
      <div className="rounded-full bg-background-400 flex justify-center items-center p-4">
        <HeroIcon icon={icon} className="w-12 h-12 text-primary-400" />
      </div>
      <p className="text-gray-500 text-center my-4 text-sm">{text}</p>
      <Button text={button.text} onClick={button.onClick} />
    </Container>
  );
};

const Home = () => {
  const router = useRouter();
  const stats = [
    {
      name: "Your Tickets",
      value: "6",
    },
    {
      name: "Open Tickets",
      value: "4",
    },
    {
      name: "Resolved Tickets",
      value: "2",
    },
  ];

  const handleCreateTicket = () => {
    router.push("/tickets/ticket/create");
  };

  return (
    <main className="flex flex-col items-center">
      <Stats stats={stats} />
      <div className="flex justify-around w-3/5 mt-12">
        {[
          {
            icon: "QuestionMarkCircleIcon",
            text: "Look for answers to your questions in our FAQ page. Our community is very active and your question has probably been answered.",
            button: {
              text: "Go to FAQ page",
              onClick: () => {},
            },
          },
          {
            icon: "TicketIcon",
            text: "If you were not able to find the answer you were looking for in our FAQ page you can create a ticket and we will be back to you as soon as we can.",
            button: {
              text: "Create Ticket",
              onClick: handleCreateTicket,
            },
          },
        ].map((box, index) => (
          <Box
            icon={box.icon}
            text={box.text}
            button={box.button}
            key={`box-${index}`}
          />
        ))}
      </div>
    </main>
  );
};
export default Home;
