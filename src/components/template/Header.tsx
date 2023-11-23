import { useState } from "react";
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";

import Link from "next/link";
import { GiTimeTrap } from "react-icons/gi";
import { useSession } from "next-auth/react";
import AuthMenu from "./menu/AuthMenu";
import GuestMenu from "./menu/GuestMenu";
import SearchBar from "./SearchBar";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: userSession } = useSession();

  return (
    <Navbar
      shouldHideOnScroll
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent justify="start">
        <NavbarBrand as={Link} href="/">
          <GiTimeTrap
            size="2rem"
            className="mr-2 rounded-md bg-gradient-to-tr from-pink-500 to-yellow-500 p-1 text-white shadow-lg"
          />
          <p className="font-bold text-inherit">Rent My Time</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <SearchBar />

        {userSession?.user ? (
          <AuthMenu
            session={userSession}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
          />
        ) : (
          <GuestMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        )}
      </NavbarContent>
    </Navbar>
  );
}
