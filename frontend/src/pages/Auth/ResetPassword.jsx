import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");

  const toast = useToast();
  const search = useLocation().search;
  const navigate = useNavigate();

  useEffect(() => {
    setEmail(new URLSearchParams(search).get("email"));
    setToken(new URLSearchParams(search).get("token"));

    if (
      !new URLSearchParams(search).get("email") &&
      !new URLSearchParams(search).get("token")
    ) {
      navigate("/forgotpassword");
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Password do not match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    console.log(password);

    try {
      await axios.put("/api/auth/resetpassword", {
        email: email,
        newPassword: password,
        token: token,
      });
      navigate("/");
    } catch (err) {
      toast({
        title: "Error",
        description: err.response.data,
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
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  value={password}
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  type={show ? "text" : "password"}
                ></Input>
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <FormControl id="confirm-password" isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup>
                <Input
                  value={confirmPassword}
                  placeholder="Enter your confirm password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type={show ? "text" : "password"}
                ></Input>
              </InputGroup>
            </FormControl>

            <Button
              type="submit"
              colorScheme="purple"
              size="sm"
              style={{ marginTop: "20px" }}
              width="100%"
            >
              Submit
            </Button>
          </form>
        </VStack>
      </Box>
    </Container>
  );
};

export default ResetPassword;
