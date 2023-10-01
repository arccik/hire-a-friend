import React from "react";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuItem,
  NavbarMenu,
  NavbarMenuToggle,
} from "@nextui-org/react";
import Link from "next/link";
import AuthNavigation from "./AuthNavigation";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Header() {
  const { data: sessionData } = useSession();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    {
      title: "Friends",
      href: `/friends`,
    },
    {
      title: "Dashboard",
      href: "/dashboard",
    },
    {
      title: "Activity",
      href: "/activity",
    },
    {
      title: "logout",
      href: "/logout",
    },
    {
      title: "Help & Feedback",
      href: "/help",
    },
    {
      title: "Logout",
      href: "/logout",
      color: "red",
    },
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        {!sessionData?.user && (
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
        )}
        <NavbarBrand>
          <Link href="/">
            <Image
              src="/assets/images/logo.png"
              alt="Brand logo"
              width={200}
              height={60}
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/friends">
            Find a Friends
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="/about-us" aria-current="page">
            About Us
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <AuthNavigation />
      {!sessionData?.user && (
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem
              key={`${item.title}-${index}`}
              onChange={() => setIsMenuOpen(false)}
            >
              <Link className="w-full" href={item.href}>
                <span
                  className={item.color ? "text-red-500" : ""}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.title}
                </span>
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      )}
    </Navbar>
  );
}
