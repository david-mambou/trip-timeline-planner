import { Button, Card, Heading, Stack } from "@chakra-ui/react";
import { TripCardProps } from "./TripCard";
import { useNavigate } from "react-router-dom";

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
    <Card bg="white" direction="row" overflow="hidden">
      <Stack p="4">
        <Heading>{trip.name}</Heading>
      </Stack>
      <Button onClick={() => navigate(`/trips/${trip.id}/edit`)}>Edit trip</Button>
      <Button colorScheme="red" onClick={() => deleteTrip(trip.id)}>
        Delete trip
      </Button>
    </Card>
  );
}
