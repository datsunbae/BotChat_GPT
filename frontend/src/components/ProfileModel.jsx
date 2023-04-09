import React, { useEffect, useState } from "react";
import { EditIcon, ViewIcon } from "@chakra-ui/icons";
import ChangeName from "./User/ChangeName";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
  IconButton,
  Text,
  Image,
  Flex,
} from "@chakra-ui/react";

const ProfileModel = ({ currentUser, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {}, [currentUser])

  const handleChangeName = () => {};
  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
      )}
      <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent h="350px">
          <ModalCloseButton />
          <Flex
            mt="50px"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Image
              borderRadius="full"
              boxSize="150px"
              src={currentUser.avatar}
              alt={currentUser.name}
              mb="10px"
            />
            <Text fontSize="20px" display="flex" gap="5px" alignItems="center">
              <Text fontWeight="bold">Name:</Text> {currentUser.name}
              <ChangeName>
                <EditIcon cursor="pointer" onClick={handleChangeName} />
              </ChangeName>
            </Text>
            <Text display="flex" gap="5px" fontSize="20px">
              <Text fontWeight="bold">Email:</Text> {currentUser.email}
            </Text>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModel;
