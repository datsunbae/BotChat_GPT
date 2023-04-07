import { Box } from "@chakra-ui/react";
import React from "react";
import SingleChat from "./SingleChat";

const BoxChat = () => {
  return (
      <Box
        flex="3"
        bg="white"
        borderRadius="10px"
        display="flex"
        alignItems="center"
        flexDir="column"
        p={3}
        w="100%"
        borderWidth="1px"
      >
        <SingleChat />
      </Box>
  );
};

export default BoxChat;
