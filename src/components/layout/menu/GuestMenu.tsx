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
import { VscSignIn } from "react-icons/vsc";
import { GiTimeTrap } from "react-icons/gi";
import { usePathname } from "next/navigation";

type PropType = {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMenuOpen: boolean;
};

export default function GuestMenu({ isMenuOpen, setIsMenuOpen }: PropType) {
  const desktopMenu = menuItems.slice(0, 4);
  const restDesktopMenu = menuItems.slice(4);
  const searchParams = usePathname();
  return (
    <>
      <NavbarContent justify="end" className="hidden sm:flex">
        <NavbarContent justify="end" className="hidden sm:flex">
          {desktopMenu.map((item) => (
            <NavbarItem
              key={item.title}
              isActive={searchParams?.includes(item.href)}
            >
              <Link color="foreground" href={item.href}>
                {item.title}
              </Link>
            </NavbarItem>
          ))}

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
              <DropdownMenu aria-label="Dropdown menu" variant="bordered">
                <DropdownSection>
                  {restDesktopMenu.map((entry) => (
                    <DropdownItem
                      key={entry.href}
                      as={Link}
                      startContent={entry.icon}
                      href={entry.href}
                    >
                      {entry.title}
                    </DropdownItem>
                  ))}
                </DropdownSection>
                <DropdownSection>
                  <DropdownItem
                    key="signUp"
                    startContent={<GiTimeTrap />}
                    as={Link}
                    href="/auth/sign-up"
                  >
                    Sign Up
                  </DropdownItem>
                  <DropdownItem
                    color="warning"
                    startContent={<VscSignIn />}
                    key="signIn"
                    as={Link}
                    href="/auth/sign-in"
                  >
                    Login
                  </DropdownItem>
                </DropdownSection>
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
        <NavbarMenu className="gap-6 pt-5">
          {menuItems.map((item, index) => (
            <NavbarMenuItem
              key={`${item.title}-${index}`}
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 transition-transform hover:scale-105 hover:text-orange-500"
            >
              <span>{item.icon}</span>
              <Link className="w-full" href={item.href}>
                {item.title}
              </Link>
            </NavbarMenuItem>
          ))}
          <NavbarMenuItem
            onClick={() => setIsMenuOpen(false)}
            key="SignUp"
            className="flex items-center gap-3 transition-transform hover:scale-105 hover:text-orange-500"
          >
            <VscSignIn color="green" />
            <Link className="w-full" href="/auth/sign-up">
              Sign Up
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem
            onClick={() => setIsMenuOpen(false)}
            key="login-btn"
            className="flex items-center gap-3 transition-transform hover:scale-105 hover:text-orange-500"
          >
            <VscSignIn color="green" />
            <Link className="w-full" href="/auth/sign-in">
              Login
            </Link>
          </NavbarMenuItem>
        </NavbarMenu>
      </NavbarContent>
    </>
  );
}
