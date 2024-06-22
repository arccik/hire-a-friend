import { Button } from "@nextui-org/react";
import { useState, useEffect } from "react";

const CookiesConsentBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const hasConsent = localStorage.getItem("cookiesConsent");
    if (!hasConsent) {
      setShowBanner(true);
    }
  }, []);

  const handleConsent = () => {
    localStorage.setItem("cookiesConsent", "true");
    setShowBanner(false);
  };

  return (
    showBanner && (
      <div className="fixed bottom-0 z-30 flex w-full max-w-3xl flex-row justify-between gap-4 rounded-lg border bg-slate-50 p-4 text-center md:bottom-5 md:left-5 md:w-auto">
        <p className="flex items-center text-sm">
          We use cookies to make your visit to our website smoother and more
          enjoyable. Don&apos;t worry - if you&apos;d rather not use cookies,
          you&apos;re welcome to browse without them. Your choice!
        </p>
        <div className="flex flex-col gap-1">
          <Button
            size="sm"
            className="rounded-full px-4 py-2 text-white"
            color="warning"
            onClick={handleConsent}
          >
            Accept
          </Button>
          <Button
            size="sm"
            className="rounded-full px-4 py-2 text-white"
            onClick={handleConsent}
          >
            Decline
          </Button>
        </div>
      </div>
    )
  );
};

export default CookiesConsentBanner;
