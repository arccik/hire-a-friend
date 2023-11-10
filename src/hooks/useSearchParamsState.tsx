import { useState, useEffect } from "react";
import { useRouter } from "next/router";

function useSearchParamsState<T>(
  initialState: T,
  key: string,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const router = useRouter();

  // Get initial state from URL search params or use provided initialState
  const initialSearchParamValue = new URLSearchParams(
    router.asPath.split("?")[1] || "",
  ).get("state");
  const [state, setState] = useState<T>(
    initialSearchParamValue
      ? JSON.parse(initialSearchParamValue)
      : initialState,
  );

  // Update URL search params whenever state changes
  useEffect(() => {
    const searchParams = new URLSearchParams(router.asPath.split("?")[1] || "");
    searchParams.set(key, JSON.stringify(state));

    // const newPath = `${router.pathname}?${searchParams.toString()}`;

    if (state === "") delete router.query[key];
    void router.replace({
      query: { ...router.query, [key]: JSON.stringify(state) },
    });
    // Use replace instead of push to avoid creating a new history entry
    // router.replace(newPath);
  }, [state, router]);

  return [state, setState];
}

export default useSearchParamsState;
