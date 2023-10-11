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

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { data: userSession } = useSession();

  const userMenuItems = [
    {
      id: 1,
      title: "Find People",
      href: "/friends",
    },
    {
      id: 2,
      title: "Profile",
      href: `/profile/${userSession?.user.id}`,
    },
    {
      id: 3,
      title: "Dashboard",
      href: "/dashboard",
    },
    {
      id: 4,
      title: "My Settings",
      href: "/auth/update-profile",
    },
  ];

  const guestMenuItems = [
    {
      id: 2,
      title: "Browse",
      href: "/friends",
    },
    {
      id: 3,
      title: "About Us",
      href: "/about-us",
    },
    {
      id: 4,
      title: "Contact Us",
      href: "/contact-us",
    },
    {
      id: 6,
      title: "Sign Up",
      href: "/auth/sign-up",
    },
    {
      id: 5,
      title: "Login",
      href: "/auth/sign-in",
    },
  ];

  const menu = userSession?.user.id ? userMenuItems : guestMenuItems;
  return (
    <Navbar
      shouldHideOnScroll
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="pr-[20%] sm:hidden" justify="start">
        <NavbarBrand as={Link} href="/">
          <GiTimeTrap
            size="2rem"
            className="mr-2 rounded-md bg-gradient-to-tr from-pink-500 to-yellow-500 p-1 text-white shadow-lg"
          />
          <p className="font-bold text-inherit">Rent My Time</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <NavbarBrand as={Link} href="/">
          <GiTimeTrap
            size="2rem"
            className="rounded-md bg-gradient-to-tr from-pink-500 to-yellow-500 p-1 text-white shadow-lg"
          />
          <p className="ml-2 font-bold text-inherit">Rent My Time</p>
        </NavbarBrand>

        {/* Larg Screen Menu */}
        {menu.map((item, index) => (
          <NavbarItem key={item.id}>
            <Link color="foreground" href={item.href}>
              {item.title}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end" className="hidden md:flex">
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
            <Button as={Link} color="warning" href="#" variant="flat">
              Sign Up
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="md:hidden" justify="end">
        {userSession?.user.id && (
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
        )}
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
