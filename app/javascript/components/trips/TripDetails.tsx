import { Button, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import StopCard from "../stops/StopCard";
import { Activity, Stay, Stop, Transfer } from "./TripPage";

type TripDetailsProps = {
  stops: Stop[];
  stays: Stay[];
  activities: { [index: number]: Activity[] };
  transfers: Transfer[];
  onDelete: () => Promise<void>;
};

export default function TripDetails({ stops, stays, activities, transfers, onDelete }: TripDetailsProps) {
  const navigate = useNavigate();

  return (
    <>
      <Button onClick={() => navigate("./stops/new")}>Add stop</Button>
      <VStack>
        {stops?.map(
          (stop, idx) =>
            stop.id && (
              <StopCard
                activities={activities[stop.id]}
                key={stop.id}
                nextStopId={stops[idx + 1] && stops[idx + 1].id}
                onDelete={onDelete}
                stay={stays?.find((s) => s.id === stop.stayId)}
                stop={stop}
                transfer={transfers?.find((t) => t.id === stop.outboundId)}
              />
            ),
        )}
      </VStack>
    </>
  );
}
