import { GoFilter } from "react-icons/go";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Select,
  SelectItem,
} from "@nextui-org/react";
import {
  clearSearchParams,
  handleRouterNavigation,
} from "~/helpers/searchParams";
import { genders } from "~/data/gender-icons";
import { citiesList } from "~/data/cities-list";
import activitiesList from "~/data/activities.json";
import { useSearchParams } from "next/navigation";
import { cn } from "~/lib/utils";

export default function FilterButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const searchParams = useSearchParams();
  const selectedGender = searchParams.get("gender") ?? undefined;
  const selectedStatus = searchParams.get("status") ?? undefined;
  const selectedActivities = searchParams.get("activities") ?? undefined;
  const selectedCity = searchParams.get("city") ?? undefined;

  const isAnySelected = searchParams.size > 0;

  return (
    <>
      <div
        className="mb-5 flex cursor-pointer flex-row items-center justify-between"
        onClick={onOpen}
      >
        {/* <SearchBar /> */}
        <div className="flex items-center">
          {isAnySelected && (
            <Button
              size="sm"
              onClick={clearSearchParams}
              color="danger"
              variant="flat"
            >
              Clear filter
            </Button>
          )}
        </div>
        <div className="flex items-center">
          <p
            className={cn("text-xs font-semibold text-slate-500", {
              "text-orange-500 ": isAnySelected,
            })}
          >
            Filter
          </p>

          <GoFilter
            className={cn(
              "mb-2 ml-2 rounded-full bg-white p-2 text-2xl text-orange-500 shadow-md hover:bg-gray-100 hover:shadow-lg md:cursor-pointer",
              {
                "bg-orange-500 text-white": isAnySelected,
              },
            )}
          />
        </div>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Filter</ModalHeader>
              <ModalBody className="gap-8">
                <Select
                  label="Select a gender"
                  size="sm"
                  labelPlacement="outside"
                  selectedKeys={selectedGender}
                  name="gender"
                  onChange={(e) => {
                    handleRouterNavigation({ gender: e.target.value });
                  }}
                >
                  {genders.map((gender) => (
                    <SelectItem key={gender.id} value={gender.name}>
                      {gender.name}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  label="Online Status"
                  size="sm"
                  labelPlacement="outside"
                  selectedKeys={selectedStatus}
                  onChange={(e) => {
                    handleRouterNavigation({ status: e.target.value });
                  }}
                >
                  {["Online", "Offline"].map((status, index) => (
                    <SelectItem key={index} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </Select>

                <Select
                  label="Activities"
                  size="sm"
                  name="activities"
                  labelPlacement="outside"
                  selectedKeys={selectedActivities}
                  onChange={(e) => {
                    handleRouterNavigation({ activities: e.target.value });
                  }}
                >
                  {activitiesList.map((activity, index) => (
                    <SelectItem key={index}>{activity.label}</SelectItem>
                  ))}
                </Select>
                <Select
                  label="City"
                  labelPlacement="outside"
                  size="sm"
                  selectedKeys={selectedCity}
                  onChange={(e) => {
                    handleRouterNavigation({ city: e.target.value });
                  }}
                >
                  {citiesList.map((city) => (
                    <SelectItem key={city.id} value={city.label}>
                      {city.label}
                    </SelectItem>
                  ))}
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>

                <Button
                  className="mx-auto"
                  color="danger"
                  variant="light"
                  onClick={clearSearchParams}
                  onPress={onClose}
                >
                  Clear Filter
                </Button>
                <Button color="warning" onPress={onClose}>
                  Apply
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
