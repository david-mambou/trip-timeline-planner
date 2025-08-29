import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import type { Activity, Stay, Stop, Transfer } from "../trips/TripPage";
import { useNavigate } from "react-router-dom";
import TransferCard from "../trips/TransferCard";
import { PencilAltIcon, PlusCircleIcon, QuestionMarkCircleIcon, TrashIcon } from "@heroicons/react/outline";

export type StopCardProps = {
  stop: Stop;
  nextStopId?: number;
  stay?: Stay;
  activities: Activity[];
  transfer?: Transfer;
  onDelete: () => Promise<void>;
};

export default function StopCard({ stop, nextStopId, stay, activities, transfer, onDelete }: StopCardProps) {
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
      onDelete();
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
          <Box p="4" w="100%" textAlign="right">
            <Heading size="md">{stop.name}</Heading>
            <Text>{`${stop.startDay} to ${stop.endDay}`}</Text>
            <Text>Staying at {stay?.name}</Text>
            <Box mt={2}>
              <Heading size="sm">Activities</Heading>
              {activities?.map((activity) => (
                <Tag key={activity.id} ml={1}>
                  <TagLabel>{activity.name}</TagLabel>
                  <TagCloseButton onClick={() => removeActivity(stop.id, activity.id)} />
                </Tag>
              ))}
            </Box>
            <Stack
              align="center"
              direction={{ base: "column", md: "row" }}
              justify={{ base: "center", md: "flex-end" }}
              mt={4}
              spacing={2}
              w="100%"
            >
              <Button
                colorScheme="blue"
                leftIcon={<PlusCircleIcon height={18} width={18} />}
                whiteSpace="normal"
                onClick={() => navigate(`./stops/${stop.id}/activities/add`)}
              >
                Add activity
              </Button>
              <Button
                colorScheme="blackAlpha"
                leftIcon={<PencilAltIcon height={18} width={18} />}
                whiteSpace="normal"
                onClick={() => navigate(`./stops/${stop.id}/edit`)}
              >
                Edit stop
              </Button>
              <Button
                colorScheme="red"
                leftIcon={<TrashIcon height={18} width={18} />}
                whiteSpace="normal"
                onClick={() => deleteStop(stop.id)}
              >
                Delete stop
              </Button>
            </Stack>
          </Box>
        </CardBody>
      </Card>
      {transfer ? (
        <TransferCard onDelete={onDelete} transfer={transfer} />
      ) : nextStopId ? (
        <Flex align="center" gap={4}>
          <QuestionMarkCircleIcon height={24} width={24} />
          How will you get to your next stop?
          <Button
            colorScheme="blue"
            onClick={() => navigate(`./transfers/add?isOutboundOf=${stop.id}&isInboundOf=${nextStopId}`)}
          >
            Add transfer
          </Button>
        </Flex>
      ) : undefined}
    </>
  );
}
