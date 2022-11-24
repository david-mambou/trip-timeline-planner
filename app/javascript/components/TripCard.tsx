import { Card, CardBody, Heading, Image } from "@chakra-ui/react";
import type { Trip } from "./Trips";

export type TripCardProps = {
  trip: Trip;
};

export default function TripCard({ trip }: TripCardProps) {
  return (
    <Card bg="white">
      <CardBody>
        <Image borderRadius={5} src={`https://loremflickr.com/320/240/${trip.name}`} alt={trip.name} />
        <Heading mt={5} size="md">
          {trip.name}
        </Heading>
      </CardBody>
    </Card>
  );
}
