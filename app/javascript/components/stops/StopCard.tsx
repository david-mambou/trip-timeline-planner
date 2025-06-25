import { Box, Button, Card, CardBody, Flex, Heading, Image } from "@chakra-ui/react";
import type { Activity, Stay, Stop, Transfer } from "../trips/TripPage";
import { useNavigate } from "react-router-dom";

export type StopCardProps = {
  stop: Stop;
  stay?: Stay;
  activities: Activity[];
  transfer?: Transfer;
};

export default function StopCard({ stop, stay, activities, transfer }: StopCardProps) {
  const navigate = useNavigate();

  const deleteStop = async (id: number) => {
    try {
      await window.fetch(`/api/stops/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      navigate(0);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
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
              <Button onClick={() => navigate(`./stops/${stop.id}/activities/add`)}>Add activity</Button>
              <Button onClick={() => deleteStop(stop.id)}>Delete stop</Button>
            </Box>
          </Flex>
        </CardBody>
      </Card>
      {transfer && (
        <div>
          {transfer.mode} at {new Date(transfer.departure_time).toLocaleTimeString()} from {transfer.pickup_point}
        </div>
      )}
    </>
  );
}
