// import type { FieldErrors, UseFormRegister } from "react-hook-form";
// import { type UserValidationType } from "~/validation/member";

// export type PersonalInformationProps = {
//   register: UseFormRegister<UserValidationType>;
//   errors: FieldErrors<UserValidationType>;
// };

// import InputField from "../features/InputField";

// export default function PersonalInformation({
//   register,
//   errors,
// }: PersonalInformationProps) {
//   return (
//     <div className="border-b border-gray-900/10 pb-12">
//       <h2 className="text-base font-semibold leading-7 text-gray-900">
//         Personal Information
//       </h2>
//       <p className="mt-1 text-sm leading-6 text-gray-600">
//         Use a permanent address where you can receive mail.
//       </p>

//       <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
//         <div className="sm:col-span-3">
//           <InputField
//             errors={errors}
//             title="First name"
//             register={register}
//             fieldName="firstName"
//           />
//         </div>
//         <div className="sm:col-span-3">
//           <InputField
//             errors={errors}
//             title="Last name"
//             register={register}
//             fieldName="lastName"
//           />
//         </div>
//         <div className="sm:col-span-3">
//           <InputField
//             errors={errors}
//             title="Email"
//             register={register}
//             fieldName="email"
//           />
//         </div>
//         <div className="sm:col-span-3">
//           <InputField
//             errors={errors}
//             title="Phone number"
//             register={register}
//             fieldName="phoneNumber"
//           />
//         </div>

//         <div className="col-span-full">
//           <InputField
//             errors={errors}
//             title="Street address"
//             register={register}
//             fieldName="street"
//           />
//         </div>

//         <div className="sm:col-span-2 sm:col-start-1">
//           <InputField
//             errors={errors}
//             title="City"
//             register={register}
//             fieldName="city"
//           />
//         </div>

//         <div className="sm:col-span-2">
//           <InputField
//             errors={errors}
//             title="County"
//             register={register}
//             fieldName="state"
//           />
//         </div>

//         <div className="sm:col-span-2">
//           <InputField
//             errors={errors}
//             title="Post Code"
//             register={register}
//             fieldName="zipCode"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

export default function PersonalInfo() {
  return null;
}
