import { Button, Heading, HStack, Spinner } from "@chakra-ui/react";
import { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { isEmptyObject } from "~/javascript/helpers/helpers";
import { Transfer, TransferMode } from "../trips/TripPage";
import { Trip } from "../trips/Trips";
import snakecaseKeys from "snakecase-keys";
import camelcaseKeys from "camelcase-keys";
import { format } from "date-fns";
import CustomInput from "../ui/CustomInput";
import CustomSelect from "../ui/CustomSelect";

type TransferFormProps = {
  trip: Trip;
};

type CreateTransferRequest = Omit<Transfer, "id"> & { isOutboundOf?: number; isInboundOf?: number };

const modes: { value: TransferMode; label: string }[] = [
  { value: "flight", label: "✈️ Flight" },
  { value: "train", label: "🚄 Train" },
  { value: "bus", label: "🚍 Bus" },
  { value: "taxi", label: "🚕 Taxi" },
  { value: "rentalcar", label: "🚙 Rental car" },
  { value: "rentalbike", label: "🏍️ Rental bike" },
  { value: "boat", label: "⛴️ Boat" },
];

export default function TransferForm({ trip }: TransferFormProps) {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState(modes[0] && modes[0].value);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const isOutboundOfStr = searchParams.get("isOutboundOf");
  const isInboundOfStr = searchParams.get("isInboundOf");
  let isOutboundOf: number | undefined, isInboundOf: number | undefined;
  if (isOutboundOfStr) {
    isOutboundOf = parseInt(isOutboundOfStr);
  }
  if (isInboundOfStr) {
    isInboundOf = parseInt(isInboundOfStr);
  }

  const [transfer, setTransfer] = useState<Transfer>();
  const { transferId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    if (!transferId) {
      setIsLoading(false);
      return;
    }
    const fetchData = async () => {
      try {
        const response = await window.fetch(`/api/transfers/${transferId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (!response.ok) throw Error(response.statusText);
        const data = await response.json();
        const camelcasedData = camelcaseKeys(data);
        setTransfer(camelcasedData);
      } catch (error) {
        setIsError(true);
        console.error(error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [transferId]);

  const createTransfer = async (transfer: CreateTransferRequest) => {
    const snakecasedTransfer = snakecaseKeys(transfer);
    try {
      const response = await window.fetch("/api/transfers", {
        method: "POST",
        body: JSON.stringify(snakecasedTransfer),
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw Error(response.statusText);

      window.alert("Transfer added!");
      navigate(`/trips/${trip.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const updateTransfer = async (transfer: CreateTransferRequest) => {
    const snakecasedTransfer = snakecaseKeys(transfer);
    try {
      const response = await window.fetch(`/api/transfers/${transferId}`, {
        method: "PUT",
        body: JSON.stringify(snakecasedTransfer),
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw Error(response.statusText);

      window.alert("Transfer updated!");
      navigate(`/trips/${trip.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      mode: { value: TransferMode };
      departureTime: { value: string };
      arrivalTime: { value: string };
      pickupPoint: { value: string };
      price: { value: number };
    };
    const errors = validateTransfer({
      isOutboundOf,
      isInboundOf,
      mode: target.mode.value,
      departureTime: new Date(target.departureTime.value),
      arrivalTime: new Date(target.arrivalTime.value),
      pickupPoint: target.pickupPoint.value,
      price: target.price.value,
    });

    if (isEmptyObject(errors)) {
      transferId
        ? await updateTransfer({
            mode: target.mode.value,
            departureTime: new Date(target.departureTime.value),
            arrivalTime: new Date(target.arrivalTime.value),
            pickupPoint: target.pickupPoint.value,
            price: target.price.value,
          })
        : await createTransfer({
            isOutboundOf,
            isInboundOf,
            mode: target.mode.value,
            departureTime: new Date(target.departureTime.value),
            arrivalTime: new Date(target.arrivalTime.value),
            pickupPoint: target.pickupPoint.value,
            price: target.price.value,
          });
    }
  };

  const validateTransfer = (transfer: CreateTransferRequest) => {
    const errors: Record<string, string> = {};
    if (!modes.map((mode) => mode.value).includes(transfer.mode)) {
      errors.mode = "Mode must be one of the modes in the list";
    }
    // TODO: manage different time zones better
    if (transfer.arrivalTime.getTime() - transfer.departureTime.getTime() < 0) {
      errors.arrivalDate = "Arrival date must be later than departure date";
    }
    return errors;
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <>
      <Heading my={4} size="md">
        {transferId ? "Edit transfer" : "Add transfer"}
      </Heading>
      <form onSubmit={handleSubmit}>
        <label htmlFor="mode">Transportation mode</label>
        <CustomSelect
          name="mode"
          value={selectedMode}
          onChange={(e) => setSelectedMode(e.target.value as TransferMode)}
        >
          {modes.map((mode, i) => (
            <option key={i} value={mode.value}>
              {mode.label}
            </option>
          ))}
        </CustomSelect>
        <label htmlFor="pickupPoint">Pickup point</label>
        <CustomInput defaultValue={transfer?.pickupPoint} name="pickupPoint" />
        <label htmlFor="departureTime">Departure time</label>
        <CustomInput
          defaultValue={transfer && format(transfer?.departureTime, "yyyy-MM-dd'T'HH:mm")}
          name="departureTime"
          type="datetime-local"
        />
        <label htmlFor="arrivalTime">Arrival time</label>
        <CustomInput
          defaultValue={transfer && format(transfer?.arrivalTime, "yyyy-MM-dd'T'HH:mm")}
          name="arrivalTime"
          type="datetime-local"
        />
        <label htmlFor="price">Price</label>
        <CustomInput defaultValue={transfer?.price} name="price" />
        <HStack justify="space-between" mt={4} mb={4}>
          <Button colorScheme="blackAlpha" onClick={() => navigate(`/trips/${trip.id}`)}>
            Back to trip
          </Button>
          <Button colorScheme="blue" type="submit">
            {transferId ? "Edit transfer" : "Add transfer"}
          </Button>
        </HStack>
      </form>
    </>
  );
}
