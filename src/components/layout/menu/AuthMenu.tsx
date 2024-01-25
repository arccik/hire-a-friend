import {
  NavbarContent,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
  NavbarItem,
  DropdownSection,
  Button,
} from "@nextui-org/react";
import { type Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { menuItems } from "./menu-items";
import { AiFillSetting } from "react-icons/ai";
import { VscSignOut } from "react-icons/vsc";
import NotificationCenter from "../NotificationCenter/NotificationCenter";

type PropType = {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMenuOpen: boolean;
  session: Session;
};

export default function AuthMenu({
  session,
  isMenuOpen,
  setIsMenuOpen,
}: PropType) {
  const menuToDisplay = menuItems.slice(0, -1);
  return (
    <>
      <NavbarContent justify="end" className="hidden sm:flex">
        <NavbarContent className="sm:hidden" justify="end">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </NavbarContent>
        <NavbarItem>
          <NotificationCenter />
        </NavbarItem>
        <NavbarItem>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                radius="lg"
                as="button"
                color="warning"
                className="bg-orange-500 transition-transform"
                name={session.user.name ?? ""}
                size="sm"
                src={session.user.image ?? ""}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Dropdown Menu" variant="flat">
              <DropdownItem
                key="signed-in-us"
                className="h-14 gap-2"
                textValue="signed in as"
                as={Link}
                href={`/profile/${session.user.id}`}
              >
                <p className="text-xs text-slate-500">Signed in as</p>
                <p className="font-semibold">{session.user.email}</p>
              </DropdownItem>
              <DropdownItem
                as={Link}
                startContent={<AiFillSetting />}
                href={`/auth/update-profile`}
                textValue="Update profile"
              >
                Update Profile
              </DropdownItem>
              <DropdownSection>
                {menuToDisplay.map((entry) => (
                  <DropdownItem
                    startContent={entry.icon}
                    textValue={entry.title}
                    key={entry.href}
                    as={Link}
                    href={entry.href}
                  >
                    {entry.title}
                  </DropdownItem>
                ))}
              </DropdownSection>
              <DropdownItem
                key="signOut"
                textValue="signOut"
                className="-mt-3"
                onClick={() => void signOut()}
                color="danger"
                startContent={<VscSignOut color="red" />}
              >
                Sign Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end" className="flex sm:hidden">
        <NavbarContent className="sm:hidden" justify="end">
          <NavbarItem>
            <NotificationCenter />
          </NavbarItem>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </NavbarContent>
        <NavbarMenu>
          <NavbarMenuItem
            className="flex items-center justify-between"
            onClick={() => setIsMenuOpen(false)}
          >
            <User
              as={Link}
              href={`/profile/${session.user.id}`}
              className="transition-transform"
              name={session.user.name ?? ""}
              description={session.user.email ?? ""}
              avatarProps={{ src: session.user.image ?? "" }}
            />
            <Button
              isIconOnly
              aria-label="Like"
              radius="lg"
              variant="light"
              color="warning"
              as={Link}
              onPress={() => setIsMenuOpen(false)}
              href="/auth/update-profile"
            >
              <AiFillSetting />
            </Button>
          </NavbarMenuItem>

          {menuToDisplay.map((item, index) => (
            <NavbarMenuItem
              key={`${item.href}-${index}`}
              onClick={() => setIsMenuOpen(false)}
              className="my-2 flex items-center gap-3 transition-transform hover:scale-105 hover:text-orange-500"
            >
              <span>{item.icon}</span>
              <Link className="w-full" href={item.href ?? ""}>
                {item.title}
              </Link>
            </NavbarMenuItem>
          ))}
          <NavbarMenuItem
            key="LogOut"
            onClick={() => {
              void signOut();
            }}
            className="my-2 flex items-center gap-3 transition-transform hover:scale-105 hover:text-orange-500"
          >
            <VscSignOut />
            <p
              className="cursor-pointer text-red-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign Out
            </p>
          </NavbarMenuItem>
        </NavbarMenu>
      </NavbarContent>
    </>
  );
}
