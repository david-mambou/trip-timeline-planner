import { Box, Button, Card, CardBody, Flex, Heading, Image, Tag, TagCloseButton, TagLabel } from "@chakra-ui/react";
import type { Activity, Stay, Stop, Transfer } from "../trips/TripPage";
import { useNavigate } from "react-router-dom";
import TransferCard from "../trips/TransferCard";
import { QuestionMarkCircleIcon } from "@heroicons/react/outline";

export type StopCardProps = {
  stop: Stop;
  nextStopId?: number;
  stay?: Stay;
  activities: Activity[];
  transfer?: Transfer;
};

export default function StopCard({ stop, nextStopId, stay, activities, transfer }: StopCardProps) {
  const navigate = useNavigate();

  const deleteStop = async (id: number) => {
    try {
      await window.fetch(`/api/stops/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      navigate(0);
    } catch (error) {
      console.error(error);
    }
  };

  const removeActivity = async (stopId: number, activityId: number) => {
    try {
      await window.fetch(`/api/stops/${stopId}/activities/${activityId}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
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
      <Card bg="white" w="70%">
        <CardBody>
          <Flex>
            <Image borderRadius={5} w="15%" src={`https://loremflickr.com/320/240/${stop.name}`} alt={stop.name} />
            <Box p="4" w="100%" textAlign="right">
              <Heading mt={5} size="md">
                {stop.name}
              </Heading>
              <div>{`${stop.startDay} to ${stop.endDay}`}</div>
              <div>Staying at {stay?.name}</div>
              <div>Activities:</div>
              {activities?.map((activity) => (
                <Tag key={activity.id}>
                  <TagLabel>{activity.name}</TagLabel>
                  <TagCloseButton onClick={() => removeActivity(stop.id, activity.id)} />
                </Tag>
              ))}
              <Button onClick={() => navigate(`./stops/${stop.id}/activities/add`)}>Add activity</Button>
              <Button onClick={() => deleteStop(stop.id)}>Delete stop</Button>
            </Box>
          </Flex>
        </CardBody>
      </Card>
      {transfer ? (
        <TransferCard transfer={transfer} />
      ) : nextStopId ? (
        <Flex align="center" gap={4}>
          <QuestionMarkCircleIcon height={24} width={24} />
          How will you get to your next stop?
          <Button onClick={() => navigate(`./transfers/add?isOutboundOf=${stop.id}&isInboundOf=${nextStopId}`)}>
            Add transfer
          </Button>
        </Flex>
      ) : undefined}
    </>
  );
}
