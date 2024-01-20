import type { UserValidationType, BigFormPropType } from "~/validation/member";

export default function getDefaultValues(
  props: Partial<BigFormPropType> = {},
): UserValidationType {
  return {
    id: props.id ?? "",
    about: props.about ?? "",
    activated: props.activated ?? false,
    photos: props.photos ?? [],
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
    activities: props.activities ?? [],
    experties: props.experties ?? undefined,
    age: props.age ?? 18,
    price: props.price ?? 0,
    hidePrice: !!props.hidePrice,
    phoneNumber: props.phoneNumber ?? "",
    zodiacSign: props.zodiacSign ?? "",
    preferedAgeRange: !!props.preferedAgeRange?.length
      ? props.preferedAgeRange
      : [18, 99],
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
