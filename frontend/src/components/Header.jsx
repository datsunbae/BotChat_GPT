import {
  Avatar,
  Button,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import React, { useContext, useEffect } from "react";
import ProfileModel from "./ProfileModel";
import { AuthContext } from "../context/AuthContext";
const Header = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout();
  };

  useEffect(() => {}, [currentUser]);
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      w="100%"
      bg="white"
      p="10px 10px"
      mt="10px"
      borderRadius="10px"
    >
      <Flex alignItems="center">
        <Image
          objectFit="cover"
          boxSize="60px"
          src="https://res.cloudinary.com/dticr6d00/image/upload/v1680742798/istockphoto-1073043588-170667a-removebg-preview_xi76ls.png"
        ></Image>

        <Text as="b" fontSize="xl">
          BOT CHAT GPT
        </Text>
      </Flex>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          <Avatar size="sm" name="Dan Abrahmov" src={currentUser.avatar} />
        </MenuButton>
        <MenuList>
          <ProfileModel currentUser={currentUser}>
            <MenuItem>My Profile</MenuItem>
          </ProfileModel>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default Header;
