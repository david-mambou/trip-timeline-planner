import { Box, Card, CardBody, Flex, Heading, Image } from "@chakra-ui/react";
import type { Activity, Stay, Stop, Transfer } from "../trips/TripPage";

export type StopCardProps = {
  stop: Stop;
  stay?: Stay;
  activities: Activity[];
  transfer?: Transfer;
};

export default function StopCard({ stop, stay, activities, transfer }: StopCardProps) {
  return (
    <Card bg="white" w="50%">
      <CardBody>
        <Flex>
          <Image borderRadius={5} w="15%" src={`https://loremflickr.com/320/240/${stop.name}`} alt={stop.name} />
          <Box p="4" w="100%" textAlign="right">
            <Heading mt={5} size="md">
              {stop.name}
            </Heading>
            <div>{`${stop.start_day} to ${stop.end_day}`}</div>
            <div>Staying at {stay?.name}</div>
            <div>Activities: {activities?.map((activity) => activity.name).join(", ")}</div>
          </Box>
        </Flex>
      </CardBody>
    </Card>
  );
}
