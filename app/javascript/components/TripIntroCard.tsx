import { Card, Heading, Image, Stack } from "@chakra-ui/react";
import { TripCardProps } from "./TripCard";

export default function TripIntroCard({ trip }: TripCardProps) {
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
    </Card>
  );
}
