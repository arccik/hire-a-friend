export default function NotifyBy() {
  return (
    <fieldset>
      <legend className="text-sm font-semibold leading-6 text-gray-900">
        Push Notifications
      </legend>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        These are delivered via SMS to your mobile phone.
      </p>
      <div className="mt-6 space-y-6">
        <div className="flex items-center gap-x-3">
          <input
            id="push-everything"
            name="push-notifications"
            type="radio"
            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
          />
          <label
            htmlFor="push-everything"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Everything
          </label>
        </div>
        <div className="flex items-center gap-x-3">
          <input
            id="push-email"
            name="push-notifications"
            type="radio"
            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
          />
          <label
            htmlFor="push-email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Same as email
          </label>
        </div>
        <div className="flex items-center gap-x-3">
          <input
            id="push-nothing"
            name="push-notifications"
            type="radio"
            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
          />
          <label
            htmlFor="push-nothing"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            No push notifications
          </label>
        </div>
      </div>
    </fieldset>
  );
}
