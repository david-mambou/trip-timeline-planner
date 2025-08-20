import { ReactNode } from "react";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
} from "@chakra-ui/react";
import { ChevronDownIcon, GlobeAltIcon, MenuIcon, UserCircleIcon } from "@heroicons/react/outline";
import { IconType } from "react-icons";
import { useNavigate } from "react-router-dom";
import { useAuthStatus } from "~/javascript/hooks/useAuthStatus";
import { useCurrentUser } from "~/javascript/hooks/useCurrentUser";

interface LinkItemProps {
  name: string;
  icon: IconType;
  href?: string;
}
const LinkItems: Array<LinkItemProps> = [{ name: "Trips", icon: GlobeAltIcon, href: "/trips" }];

export default function SidebarWithHeader({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent onClose={() => onClose} display={{ base: "none", md: "flex" }} />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent display="flex" onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const navigate = useNavigate();
  const isLoggedIn = useAuthStatus();
  const { user } = useCurrentUser();

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    try {
      await fetch(`/users/sign_out`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      flexDirection="column"
      justifyContent="space-between"
      {...rest}
    >
      <Box>
        <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
          <Text fontSize="2xl" fontWeight="bold">
            MyTrips
          </Text>
          <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
        </Flex>
        {LinkItems.map((link) => (
          <NavItem key={link.name} {...link}>
            {link.name}
          </NavItem>
        ))}
      </Box>
      <Box mb={4} mx={4} px={4}>
        <Menu>
          <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: "none" }} w="full">
            <HStack>
              <UserCircleIcon height={30} width={30} />
              <Text fontSize="sm">{user ? user.email : "Guest"}</Text>
              <Box>
                <ChevronDownIcon width={20} height={20} />
              </Box>
            </HStack>
          </MenuButton>
          <MenuList bg={useColorModeValue("white", "gray.900")} borderColor={useColorModeValue("gray.200", "gray.700")}>
            {isLoggedIn ? (
              <MenuItem as={Button} onClick={() => handleLogout()}>
                Logout
              </MenuItem>
            ) : (
              <>
                <MenuItem onClick={() => navigate("/login")}>Login</MenuItem>
                <MenuItem onClick={() => navigate("/register")}>Register</MenuItem>
              </>
            )}
          </MenuList>
        </Menu>
      </Box>
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: string;
  href?: string;
}
const NavItem = ({ href = "#", icon, children, ...rest }: NavItemProps) => {
  return (
    <Link href={href} style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Box display={{ base: "flex", md: "none" }} position="fixed" top={4} left={4} zIndex={1000} {...rest}>
      <IconButton variant="outline" aria-label="open menu" icon={<MenuIcon />} onClick={onOpen} />
    </Box>
  );
};
