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
      <div className="fixed bottom-0 z-30 flex w-full flex-row justify-between gap-4 rounded-lg border bg-slate-50 p-4 text-center md:bottom-5 md:left-5 md:w-auto">
        <p className="flex items-center text-sm">
          This website uses cookies to enhance your experience. If you prefer
          not to use cookies, you have the option to discontinue your use of
          this website.
        </p>
        <Button
          className="mt-2 rounded-full px-4 py-2 text-white"
          color="warning"
          onClick={handleConsent}
        >
          Accept
        </Button>
      </div>
    )
  );
};

export default CookiesConsentBanner;
