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
  Input,
} from "@nextui-org/react";

import Link from "next/link";
import { GiTimeTrap } from "react-icons/gi";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { IoIosArrowRoundBack } from "react-icons/io";
import { RiSearchLine } from "react-icons/ri";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { data: userSession } = useSession();
  const router = useRouter();

  const userMenuItems = [
    {
      id: 1,
      title: "Explore",
      href: "/friends",
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
      title: "Browse",
      href: "/friends",
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
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarBrand as={Link} href="/">
          <GiTimeTrap
            size="2rem"
            className="mr-2 rounded-md bg-gradient-to-tr from-pink-500 to-yellow-500 p-1 text-white shadow-lg"
          />
          <p className="font-bold text-inherit">Rent My Time</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden gap-4 sm:flex" justify="end">
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
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
            e.key === "Enter" &&
            void router.push(`/friends?search=${e.currentTarget.value}`)
          }
          placeholder="Type to search..."
          size="sm"
          startContent={<RiSearchLine size={18} />}
          type="search"
        />
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
                variant="flat"
              >
                Sign Up
              </Button>
            </>
          )}
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="md:hidden" justify="end">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<RiSearchLine size={18} />}
          type="search"
        />
        {router.pathname.includes("/profile") && (
          <NavbarItem>
            <IoIosArrowRoundBack size="2rem" onClick={() => router.back()} />
          </NavbarItem>
        )}

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
