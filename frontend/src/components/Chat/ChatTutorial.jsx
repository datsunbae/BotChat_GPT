
import { Skeleton } from "@chakra-ui/skeleton";

const ChatLoading = () => {
  return (
    <Stack>
      <Skeleton height="45px" />
      <Skeleton height="45px" />
      <Skeleton height="45px" />
      <Skeleton height="45px" />
      <Skeleton height="45px" />
      <Skeleton height="45px" />

    </Stack>
  );
};
const TutoralChat = () => {
    return (
      <Box flex="3" bg="black" borderRadius="10px">
        TutoralChat
      </Box>
    );
  };
export default ChatLoading;