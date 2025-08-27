import { Box, Button, Divider, Flex, Text } from "@chakra-ui/react";
import { Transfer } from "./TripPage";
import { format } from "date-fns";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";

export type TransferCardProps = {
  transfer: Transfer;
  onDelete: () => Promise<void>;
};

const modeEmojis = {
  flight: "✈️",
  train: "🚄",
  bus: "🚍",
  taxi: "🚕",
  rentalcar: "🚙",
  rentalbike: "🏍️",
  boat: "⛴️",
};

export default function TransferCard({ transfer, onDelete }: TransferCardProps) {
  const navigate = useNavigate();

  const deleteTransfer = async (id: number) => {
    try {
      await window.fetch(`/api/transfers/${id}`, {
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

  return (
    <Flex align="center" h="140px" my="12px" width="70%">
      <Box flex={1}>
        <Text align="center" fontSize="44">
          {modeEmojis[transfer.mode]}
        </Text>
      </Box>
      <Divider bg="gray.500" borderRadius="full" orientation="vertical" height="100%" width="4px" mx={4} />
      <Box flex={1}>
        <Text>{format(transfer.departureTime, "HH:mm")}</Text>
        <Text>from {transfer.pickupPoint}</Text>
        <Text>Arrival: {format(transfer.arrivalTime, "HH:mm")}</Text>
        <Text>Price: {transfer.price}</Text>
        <Button colorScheme="blackAlpha" mr={3} onClick={() => navigate(`./transfers/${transfer.id}/edit`)}>
          <PencilAltIcon height={18} width={18} />
        </Button>
        <Button colorScheme="red" onClick={() => deleteTransfer(transfer.id)}>
          <TrashIcon height={18} width={18} />
        </Button>
      </Box>
    </Flex>
  );
}
