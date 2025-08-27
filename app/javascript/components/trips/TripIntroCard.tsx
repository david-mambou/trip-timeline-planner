import { Button, Card, Heading, Stack } from "@chakra-ui/react";
import { TripCardProps } from "./TripCard";
import { useNavigate } from "react-router-dom";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";

export default function TripIntroCard({ trip }: TripCardProps) {
  const navigate = useNavigate();

  const deleteTrip = async (id: number) => {
    try {
      await window.fetch(`/api/trips/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      window.alert("Trip deleted");
      navigate("/trips");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card align="center" bg="white" direction="row" overflow="hidden">
      <Stack p="4">
        <Heading>{trip.name}</Heading>
      </Stack>
      <Button colorScheme="blackAlpha" flexShrink={0} mx={2} onClick={() => navigate(`/trips/${trip.id}/edit`)}>
        <PencilAltIcon height={18} width={18} />
      </Button>
      <Button colorScheme="red" flexShrink={0} mx={2} onClick={() => deleteTrip(trip.id)}>
        <TrashIcon height={18} width={18} />
      </Button>
    </Card>
  );
}
