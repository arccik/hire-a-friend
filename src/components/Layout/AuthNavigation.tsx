import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function AuthNavigation() {
  const { data: userSession } = useSession();
  const router = useRouter();
  if (userSession?.user.id)
    return (
      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              size="sm"
              src={
                userSession.user.image ??
                "/assets/images/avatar-placeholder.jpeg"
              }
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{userSession?.user?.email}</p>
            </DropdownItem>
            <DropdownItem
              key="settings"
              onClick={() => void router.push("/auth/update-profile")}
            >
              My Settings
            </DropdownItem>
            <DropdownItem
              key="user_profile"
              onClick={() =>
                void router.push(`/profile/${userSession?.user?.id}`)
              }
            >
              Profile
            </DropdownItem>
            <DropdownItem
              key="user_dashboard"
              onClick={() => void router.push("/dashboard")}
            >
              Dashboard
            </DropdownItem>
            <DropdownItem
              key="help_and_feedback"
              onClick={() => void router.push("/auth/help-and-feedbacks")}
            >
              Help & Feedback
            </DropdownItem>
            <DropdownItem
              key="logout"
              color="danger"
              onClick={() => void signOut()}
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    );
  return (
    <NavbarContent justify="end">
      <NavbarItem className="hidden lg:flex">
        <Link href="/auth/sign-in">Login</Link>
      </NavbarItem>
      <NavbarItem>
        <Button as={Link} color="primary" href="/auth/sign-up" variant="flat">
          Sign Up
        </Button>
      </NavbarItem>
    </NavbarContent>
  );
}
