import { Card, CardBody, Heading, LinkBox, LinkOverlay } from "@chakra-ui/react";
import type { Trip } from "./Trips";

export type TripCardProps = {
  trip: Trip;
};

export default function TripCard({ trip }: TripCardProps) {
  return (
    <LinkBox>
      <Card bg="white">
        <CardBody>
          <LinkOverlay href={`trips/${trip.id}`}>
            <Heading size="md">{trip.name}</Heading>
          </LinkOverlay>
        </CardBody>
      </Card>
    </LinkBox>
  );
}
