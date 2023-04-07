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
import React from "react";

const Header = () => {
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
          <Avatar size="sm" name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
        </MenuButton>
        <MenuList>
          <MenuItem>My Profile</MenuItem>
          <MenuItem>Logout</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default Header;
