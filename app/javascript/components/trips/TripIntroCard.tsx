import { Button, Card, Heading, Image, Stack } from "@chakra-ui/react";
import { TripCardProps } from "./TripCard";
import { useNavigate } from "react-router-dom";

export default function TripIntroCard({ trip }: TripCardProps) {
  const navigate = useNavigate();

  return (
    <Card bg="white" direction="row" overflow="hidden">
      <Image
        maxW={{ base: "100%", sm: "200px" }}
        src={`https://loremflickr.com/320/240/${trip.name}`}
        alt={trip.name}
      />
      <Stack p="4">
        <Heading>{trip.name}</Heading>
      </Stack>
      <Button onClick={() => navigate(`/trips/${trip.id}/edit`)}>Edit trip</Button>
    </Card>
  );
}
