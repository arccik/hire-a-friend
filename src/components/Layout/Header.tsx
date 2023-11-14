import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Avatar,
} from "@nextui-org/react";

import Link from "next/link";
import { GiTimeTrap } from "react-icons/gi";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import SeachBar from "./SeachBar";
import SearchBar from "./SeachBar";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { data: userSession } = useSession();
  const router = useRouter();

  const userMenuItems = [
    {
      id: 1,
      title: "Find People",
      href: "/profiles",
    },
    {
      id: 2,
      title: "Dashboard",
      href: "/dashboard",
    },
    {
      id: 3,
      title: "Profile",
      href: `/profile/${userSession?.user.id}`,
    },
    {
      id: 4,
      title: "Edit Profile",
      href: "/auth/update-profile",
    },
  ];

  const guestMenuItems = [
    {
      id: 2,
      title: "Find People",
      href: "/profiles",
    },

    {
      id: 4,
      title: "Contact Us",
      href: "/contact-us",
    },
    // {
    //   id: 6,
    //   title: "Sign Up",
    //   href: "/auth/sign-up",
    // },
    // {
    //   id: 5,
    //   title: "Login",
    //   href: "/auth/sign-in",
    // },
  ];

  const menu = userSession?.user.id ? userMenuItems : guestMenuItems;

  return (
    <Navbar
      shouldHideOnScroll
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="md:hidden" justify="end">
        <NavbarBrand as={Link} href="/">
          <GiTimeTrap
            size="2rem"
            className="mr-2 rounded-md bg-gradient-to-tr from-pink-500 to-yellow-500 p-1 text-white shadow-lg"
          />
          <p className="font-bold text-inherit">Rent My Time</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden md:flex md:gap-4" justify="end">
        <NavbarBrand as={Link} href="/">
          <GiTimeTrap
            size="2rem"
            className="rounded-md bg-gradient-to-tr from-pink-500 to-yellow-500 p-1 text-white shadow-lg"
          />
          <p className="ml-2 font-bold text-inherit">Rent My Time</p>
        </NavbarBrand>

        {/* Larg Screen Menu */}
        {menu.map((item) => (
          <NavbarItem key={item.id}>
            <Link color="foreground" href={item.href}>
              {item.title}
            </Link>
          </NavbarItem>
        ))}
        {userSession?.user.id && (
          <NavbarItem
            key="Logout button"
            className="cursor-pointer text-red-600 decoration-red-600 decoration-2  underline-offset-4 transition-colors duration-300 ease-in-out hover:text-red-600 hover:underline hover:decoration-red-600"
          >
            <button onClick={() => void signOut()}>Logout</button>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarContent justify="end" className="hidden md:flex">
        <SeachBar router={router} />
        <NavbarItem>
          {userSession?.user.id ? (
            <Avatar
              isBordered
              className="transition-transform"
              size="sm"
              as={Link}
              href={`/profile/${userSession.user.id}`}
              src={
                userSession?.user.image ??
                "/assets/images/avatar-placeholder.jpeg"
              }
            />
          ) : (
            <>
              <Button
                as={Link}
                // color="success"
                href="/auth/sign-in"
                variant="light"
                className="mr-2"
              >
                Login
              </Button>
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
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="md:hidden" justify="end">
        <SearchBar router={router} />
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu>
        {menu.map((item) => (
          <NavbarMenuItem key={item.id} className="mt-5 text-2xl">
            <Link
              className="w-full"
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.title}
            </Link>
          </NavbarMenuItem>
        ))}

        {userSession?.user.id && (
          <NavbarMenuItem key="Sign Out" className="mt-5 text-2xl">
            <button onClick={() => void signOut()} className="text-red-500">
              Logout
            </button>
          </NavbarMenuItem>
        )}
      </NavbarMenu>
    </Navbar>
  );
}
