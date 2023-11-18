import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 lg:px-8 lg:pb-32">
      <h1 className="mb-6 text-3xl font-bold">Privacy Policy</h1>

      <div className="mb-6 text-gray-700">
        <p>
          Your privacy is important to us. This Privacy Policy explains how Rent
          My Time (the Website) collects, uses, and protects your personal
          information.
        </p>
      </div>

      <div className="mb-6 text-gray-700">
        <h2 className="mb-4 text-2xl font-bold">Information We Collect</h2>
        <p>We may collect the following types of information:</p>
        <ul className="list-inside list-disc">
          <li>
            Personal Information: Name, email, and other contact details
            provided during registration.
          </li>
          <li>
            Profile Information: Details you choose to share on your user
            profile.
          </li>
          <li>
            Communication Data: Information sent through our messaging system.
          </li>
          <li>Usage Data: Information about how you use the Website.</li>
        </ul>
      </div>

      <div className="mb-6 text-gray-700">
        <h2 className="mb-4 text-2xl font-bold">How We Use Your Information</h2>
        <p>We use the collected information for the following purposes:</p>
        <ul className="list-inside list-disc">
          <li>Provide and maintain the Website.</li>
          <li>Improve and personalize user experience.</li>
          <li>Facilitate communication and collaboration between users.</li>
          <li>Send important notifications and updates.</li>
        </ul>
      </div>

      <div className="mb-6 text-gray-700">
        <h2 className="mb-4 text-2xl font-bold">Data Security</h2>
        <p>
          We implement security measures to protect your personal information.
          However, no method of transmission over the internet or electronic
          storage is entirely secure, and we cannot guarantee absolute security.
        </p>
      </div>

      <div className="mb-6 text-gray-700">
        <h2 className="mb-4 text-2xl font-bold">Third-Party Links</h2>
        <p>
          The Website may contain links to third-party websites. We are not
          responsible for the privacy practices or content of these external
          sites. Please review the privacy policies of those websites.
        </p>
      </div>

      <div className="mb-6 text-gray-700">
        <h2 className="mb-4 text-2xl font-bold">
          Changes to this Privacy Policy
        </h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page, and the effective date will be indicated.
        </p>
      </div>

      <div className="mb-6 text-gray-700">
        <h2 className="mb-4 text-2xl font-bold">Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us
          though
          <Link href="/contact-us" className="mx-2 text-blue-500 underline">
            contact form{" "}
          </Link>
        </p>
      </div>

      <p className="mb-6 text-gray-700">
        By using Rent My Time, you agree to the terms outlined in this Privacy
        Policy.
      </p>
    </div>
  );
}
