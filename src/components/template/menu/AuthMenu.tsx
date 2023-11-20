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
} from "@nextui-org/react";
import { type Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { menuItems } from "./menu-items";

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
  return (
    <>
      <NavbarContent justify="end" className="hidden sm:flex">
        <NavbarContent className="sm:hidden" justify="end">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </NavbarContent>
        <NavbarItem>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="bg-orange-500 transition-transform"
                name={session.user.name ?? ""}
                size="sm"
                src={session.user.image ?? ""}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem
                key="signed-in-us"
                className="h-14 gap-2"
                // textValue="signed in as"
                as={Link}
                href={`/profile/${session.user.id}`}
              >
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{session.user.email}</p>
              </DropdownItem>
              <DropdownSection>
                {menuItems.map((entry) => (
                  <DropdownItem key={entry.href} as={Link} href={entry.href}>
                    {entry.title}
                  </DropdownItem>
                ))}
                <DropdownItem
                  key="login"
                  onClick={() => void signOut()}
                  color="danger"
                >
                  Sign Out
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end" className="flex sm:hidden">
        <NavbarContent className="sm:hidden" justify="end">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </NavbarContent>
        <NavbarMenu>
          <NavbarMenuItem onClick={() => setIsMenuOpen(false)}>
            <User
              as={Link}
              href={`/profile/${session.user.id}`}
              className="transition-transform"
              name={session.user.name ?? ""}
              description={session.user.email ?? ""}
              avatarProps={{ src: session.user.image ?? "" }}
            />
          </NavbarMenuItem>
          {menuItems.map((item, index) => (
            <NavbarMenuItem
              key={`${item.href}-${index}`}
              className="my-2"
              onClick={() => setIsMenuOpen(false)}
            >
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
          >
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
