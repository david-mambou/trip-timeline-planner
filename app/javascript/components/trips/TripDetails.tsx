import { Button, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import StopCard from "../stops/StopCard";
import { Activity, Stay, Stop, Transfer } from "./TripPage";

type TripDetailsProps = {
  stops: Stop[];
  stays: Stay[];
  activities: { [index: number]: Activity[] };
  transfers: Transfer[];
};

export default function TripDetails({ stops, stays, activities, transfers }: TripDetailsProps) {
  const navigate = useNavigate();

  return (
    <>
      <Button onClick={() => navigate("./stops/new")}>Add stop</Button>
      <VStack>
        {stops?.map(
          (stop) =>
            stop.id && (
              <StopCard
                activities={activities[stop.id]}
                key={stop.id}
                stay={stays?.find((s) => s.id === stop.stay_id)}
                stop={stop}
                transfer={transfers?.find((t) => t.id === stop.outbound_id)}
              />
            ),
        )}
      </VStack>
    </>
  );
}
