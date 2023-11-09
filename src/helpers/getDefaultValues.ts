import type {
  UserValidationType,
  BigFormPropType,
} from "~/validation/user-validation";

export default function getDefaultValues(
  props: Partial<BigFormPropType> = {},
): UserValidationType {
  return {
    about: props.about ?? "",
    activated: props.activated ?? false,
    image: props.image ?? undefined,
    gender: props.gender ?? undefined,
    coverImage: props.coverImage ?? "",
    country: props.country ?? "",
    hobbies: props.hobbies ?? [],
    street: props.street ?? "",
    state: props.state ?? "",
    city: props.city ?? "",
    zipCode: props.zipCode ?? "",
    email: props.email ?? "",
    firstName: props.firstName ?? "",
    lastName: props.lastName ?? "",
    name: props.name ?? "",
    activities: props.activities ?? undefined,
    experties: props.experties ?? undefined,
    age: props.age ?? undefined,
    price: props.price ?? undefined,
    hidePrice: props.hidePrice ?? false,
    phoneNumber: props.phoneNumber ?? "",
    appearance: {
      height: props.appearance?.height ?? "",
      weight: props.appearance?.weight ?? "",
      eyeColor: props.appearance?.eyeColor ?? "",
      hairColor: props.appearance?.hairColor ?? "",
      bodyType: props.appearance?.bodyType ?? "",
      ethnicity: props.appearance?.ethnicity ?? "",
    },
  };
}
