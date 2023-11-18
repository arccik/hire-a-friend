import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
} from "@nextui-org/react";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { useRouter } from "next/router";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { GiTimeTrap } from "react-icons/gi";
import { menuItems } from "./menu-items";

export default function Header2() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: userSession } = useSession();
  const router = useRouter();
  return (
    <Navbar
      shouldHideOnScroll
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="" justify="end">
        <NavbarBrand as={Link} href="/">
          <GiTimeTrap
            size="2rem"
            className="mr-2 rounded-md bg-gradient-to-tr from-pink-500 to-yellow-500 p-1 text-white shadow-lg"
          />
          <p className="font-bold text-inherit">Rent My Time</p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="end">
        <SearchBar router={router} />
        {/* <NavbarItem> */}
        {userSession?.user.id ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src={userSession.user.image ?? ""}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              {menuItems?.map((item) => {
                if (item.title === "Sign Out") {
                  return (
                    <DropdownItem
                      className="text-red-500"
                      key={item.title}
                      onClick={() => void signOut()}
                    >
                      {item.title}
                    </DropdownItem>
                  );
                }
                if (item.title === "Profile") {
                  return (
                    <DropdownSection key={item.title} title={item.title}>
                      <DropdownItem
                        key={item.title}
                        as={Link}
                        href={`/profile/${userSession.user.id}`}
                      >
                        {item.title}
                      </DropdownItem>
                    </DropdownSection>
                  );
                }

                return (
                  <DropdownItem key={item.title} as={Link} href={item.href}>
                    {item.title}
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </Dropdown>
        ) : (
          <>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <NavbarMenuToggle
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                {menuItems.map((item) => (
                  <DropdownItem key={item.href} as={Link} href={item.href}>
                    {item.title}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button
              as={Link}
              color="warning"
              href="/auth/sign-up"
              variant="bordered"
            >
              Sign Up
            </Button>
          </>
        )}
        {/* </NavbarItem> */}
      </NavbarContent>
    </Navbar>
  );
}
