import {
  NavbarContent,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  NavbarItem,
  DropdownSection,
} from "@nextui-org/react";
import Link from "next/link";
import { HiMenuAlt3 } from "react-icons/hi";
import { menuItems } from "./menu-items";

type PropType = {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMenuOpen: boolean;
};

export default function GuestMenu({ isMenuOpen, setIsMenuOpen }: PropType) {
  return (
    <>
      <NavbarContent justify="end" className="hidden sm:flex">
        <NavbarContent justify="end" className="hidden sm:flex">
          <NavbarContent className="sm:hidden" justify="end">
            <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            />
          </NavbarContent>
          <NavbarItem>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <div>
                  <HiMenuAlt3
                    size="1.7rem"
                    className="cursor-pointer drop-shadow-lg hover:text-orange-500"
                  />
                </div>
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownSection>
                  {menuItems.map((entry) => (
                    <DropdownItem key={entry.href} as={Link} href={entry.href}>
                      {entry.title}
                    </DropdownItem>
                  ))}
                </DropdownSection>
                <DropdownItem key="login" as={Link} href="/auth/sign-up">
                  Sign Up
                </DropdownItem>
                <DropdownItem key="login" as={Link} href="/auth/sign-in">
                  Login
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>
      </NavbarContent>
      <NavbarContent justify="end" className="flex sm:hidden">
        <NavbarContent className="sm:hidden" justify="end">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </NavbarContent>
        <NavbarMenu className="mt-5 gap-6">
          {menuItems.map((item, index) => (
            <NavbarMenuItem
              key={`${item.title}-${index}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Link className="w-full" href={item.href}>
                {item.title}
              </Link>
            </NavbarMenuItem>
          ))}
          <NavbarMenuItem onClick={() => setIsMenuOpen(false)} key="SignUp">
            <Link className="w-full" href="/auth/sign-up">
              Sign Up
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem onClick={() => setIsMenuOpen(false)} key="login">
            <Link className="w-full" href="/auth/sign-in">
              Login
            </Link>
          </NavbarMenuItem>
        </NavbarMenu>
      </NavbarContent>
    </>
  );
}
