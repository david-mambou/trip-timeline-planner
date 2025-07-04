import { Button, Input, Select } from "@chakra-ui/react";
import { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { isEmptyObject } from "~/javascript/helpers/helpers";
import { Activity } from "../trips/TripPage";
import { Trip } from "../trips/Trips";

type ActivityFormProps = {
  trip: Trip;
};

type CreateActivityRequest = Omit<Activity, "id">;

export default function ActivityForm({ trip }: ActivityFormProps) {
  const navigate = useNavigate();
  const [activities, setActivities] = useState<Activity[]>();
  const [selectedActivity, setSelectedActivity] = useState(0);
  const [isError, setIsError] = useState(false);

  const { stopId } = useParams();

  const createActivityAndAddToStop = async (activity: CreateActivityRequest) => {
    try {
      const response = await window.fetch("/api/activities", {
        method: "POST",
        body: JSON.stringify(activity),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw Error(response.statusText);
      const newActivity = await response.json();
      await addActivityToStop(newActivity.id);
    } catch (error) {
      console.error(error);
    }
  };

  const addActivityToStop = async (activityId: number) => {
    try {
      const response = await window.fetch(`/api/stops/${stopId}/activities/add`, {
        method: "PUT",
        body: JSON.stringify({
          activity_id: activityId,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw Error(response.statusText);

      window.alert("Activity added!");
      navigate(`/trips/${trip.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (selectedActivity === 0) {
      const target = e.target as typeof e.target & {
        name: { value: string };
        price: { value: number };
      };
      const errors = validateActivity({
        name: target.name.value,
        price: target.price.value,
      });

      if (isEmptyObject(errors)) {
        await createActivityAndAddToStop({
          name: target.name.value,
          price: target.price.value,
        });
      }
    } else {
      addActivityToStop(selectedActivity);
    }
  };

  const validateActivity = (activity: CreateActivityRequest) => {
    const errors: Record<string, string> = {};
    if (activity.name.length < 1) {
      errors.name = "Name must be at least one character";
    }
    return errors;
  };

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await window.fetch(`/api/activities`);
        if (!response.ok) throw Error(response.statusText);
        const data = await response.json();
        setActivities(data);
      } catch (error) {
        setIsError(true);
        console.error(error);
      }
    };

    fetchActivities();
  }, []);

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Select value={selectedActivity} onChange={(e) => setSelectedActivity(parseInt(e.target.value))}>
          {activities &&
            activities.map((activity, i) => (
              <option key={i} value={activity.id}>
                {activity.name}
              </option>
            ))}
          <option value={0}>Add activity...</option>
        </Select>
        {selectedActivity === 0 && (
          <>
            <label htmlFor="name">Name</label>
            <Input name="name"></Input>
            <label htmlFor="price">Price</label>
            <Input name="price"></Input>
          </>
        )}
        <Button type="submit">Add activity</Button>
      </form>
      <Button onClick={() => navigate(`/trips/${trip.id}`)}>Back to Trip</Button>
    </>
  );
}
