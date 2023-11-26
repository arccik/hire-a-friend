import { Tooltip } from "@nextui-org/react";
import { menuItems } from "./Menu-items";

export default function VerticalMenu() {
  return (
    <nav className="fixed  min-h-screen w-12  bg-gradient-to-l from-gray-100 to-white">
      <ul className="ml-1 mt-10 cursor-pointer space-y-2 p-1">
        {menuItems.map((item) => (
          <Tooltip
            key={item.name}
            placement="right"
            content={item.name}
            color="warning"
            className="opacity-90"
          >
            <li className="flex items-center">
              <item.icon size="2rem" className="hover:drop-shadow-2xl" />
              {/* <a href="#" className="hover:text-gray-300">
              {item.name}
            </a> */}
            </li>
          </Tooltip>
        ))}
      </ul>
    </nav>
  );
}
