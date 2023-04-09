import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import axiosJWT from "../../contants/axiosJWT";
import { AuthContext } from "../../context/AuthContext";

const ChangeName = ({ children }) => {
  const [newName, setNewName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const { currentUser, refreshAccessToken, setCurrentUser } =
    useContext(AuthContext);

  const newAxiosJWT = axiosJWT(currentUser, refreshAccessToken);

  const handleAvatarChange = (avatar) => {
    setLoading(true);
    if (!avatar) {
      toast({
        title: "Please selected an image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (avatar.type === "image/jpeg" || avatar.type === "image/png") {
      const data = new FormData();
      data.append("file", avatar);
      data.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);
      console.log(process.env.REACT_APP_CLOUD_NAME);
      data.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);
      fetch(process.env.REACT_APP_URL_API_CLOUDINARY, {
        method: "POST",
        body: data,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setAvatar(data.url.toString());
          setLoading(false);
        });
    }
  };

  const handleSubmit = async () => {
    console.log("new name" + newName);
    if (!newName && !avatar) {
      toast({
        title: "Name or avatar is not null",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
    try {
      const result = await newAxiosJWT.post(
        "/api/user/changeinfo",
        {
          newName,
          avatar,
        },
        {
          headers: {
            authorization: `Bearer ${currentUser.accessToken}`,
          },
        }
      );

      setCurrentUser({ ...currentUser, name: result.data.name, avatar: result.data.avatar });
      onClose();
    } catch (err) {
      toast({
        title: "Error Occured!",
        description: err.response.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="35px" d="flex" justifyContent="center">
            Change Info
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody d="flex" flexDir="column" alignItems="center">
            <FormControl>
              <Input
                placeholder="Your name"
                mb={3}
                onChange={(e) => setNewName(e.target.value)}
              />
            </FormControl>
            <FormControl id="avatar">
              <FormLabel>Your avatar</FormLabel>
              <InputGroup>
                <Input
                  accept="img/*"
                  onChange={(e) => handleAvatarChange(e.target.files[0])}
                  type="file"
                ></Input>
              </InputGroup>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={handleSubmit}
              colorScheme="blue"
              isLoading={loading}
            >
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChangeName;
