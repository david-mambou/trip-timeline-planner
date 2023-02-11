import { Button, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
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
          (stop, idx) =>
            stop.id && (
              <>
                <h3 key={idx}>{stop.name}</h3>
                <div>{`Start: ${stop.start_day}`}</div>
                <div>{`End: ${stop.end_day}`}</div>
                <div>Staying at: {stays?.find((s) => s.id === stop.stay_id)?.name}</div>
                {activities[stop.id] && (
                  <div>Activities: {activities[stop.id].map((activity) => activity.name).join(", ")}</div>
                )}
                {stop.outbound_id && <div>Leaving by: {transfers?.find((t) => t.id === stop.outbound_id)?.mode}</div>}
                <Button onClick={() => navigate(`./stops/${stop.id}/activities/add`)}>Add activity</Button>
              </>
            ),
        )}
      </VStack>
    </>
  );
}
