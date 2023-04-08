import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email) {
        toast({
          title: "Warning",
          description: "Email is not null",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
      const reponse = await axios.post("/api/auth/passwordrequired", { email });

      toast({
        title: "Success",
        description: reponse.data,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Faild send mail reset password",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  return (
    <Container maxW="xl" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl">Forgot Password</Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <VStack spacing="10px">
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                value={email}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              ></Input>
            </FormControl>

            <Button
              type="submit"
              colorScheme="purple"
              size="sm"
              style={{ marginTop: "20px" }}
              width="100%"
            >
              Send mail
            </Button>
          </form>
        </VStack>
      </Box>
    </Container>
  );
};

export default ForgetPassword;
