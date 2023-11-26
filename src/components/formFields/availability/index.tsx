// // pages/index.tsx
// import React from "react";
// import {
//   useForm,
//   Controller,
//   SubmitHandler,
//   useFieldArray,
// } from "react-hook-form";
// import DayPicker from "./DayPicker";
// import TimePicker from "./TimePicker";
// import AllDayCheckbox from "./AllDayCheckbox";

// interface Availability {
//   startTime: string;
//   endTime: string;
//   allDay: boolean;
// }

// interface FormValues {
//   day: string;
//   availability: Availability[];
// }

// const MyForm: React.FC = () => {
//   const { control, handleSubmit, watch } = useForm<FormValues>();
//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "availability",
//   });

//   const onSubmit: SubmitHandler<FormValues> = (data) => {
//   };

//   const selectedDay = watch("day");

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <Controller
//         control={control}
//         name="day"
//         defaultValue=""
//         render={({ field }) => (
//           <DayPicker
//             day={field.value}
//             onChange={(e) => field.onChange(e.target.value)}
//           />
//         )}
//       />

//       {selectedDay && (
//         <>
//           {fields.map((field, index) => (
//             <div key={field.id}>
//               <Controller
//                 control={control}
//                 name={`availability[${index}].startTime`}
//                 defaultValue=""
//                 render={({ field }) => (
//                   <TimePicker
//                     label={`Start Time for ${selectedDay}`}
//                     value={field.value}
//                     onChange={(e) => field.onChange(e.target.value)}
//                   />
//                 )}
//               />

//               <Controller
//                 control={control}
//                 name={`availability[${index}].endTime`}
//                 defaultValue=""
//                 render={({ field }) => (
//                   <TimePicker
//                     label={`End Time for ${selectedDay}`}
//                     value={field.value}
//                     onChange={(e) => field.onChange(e.target.value)}
//                   />
//                 )}
//               />

//               <Controller
//                 control={control}
//                 name={`availability[${index}].allDay`}
//                 defaultValue={false}
//                 render={({ field }) => (
//                   <AllDayCheckbox
//                     checked={field.value}
//                     onChange={(e) => field.onChange(e.target.checked)}
//                   />
//                 )}
//               />

//               <button type="button" onClick={() => remove(index)}>
//                 Remove
//               </button>
//             </div>
//           ))}

//           <button
//             type="button"
//             onClick={() =>
//               append({ startTime: "", endTime: "", allDay: false })
//             }
//           >
//             Add Availability
//           </button>
//         </>
//       )}

//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default MyForm;

export default function TOBEDELETED() {
  return null;
}
