import { usePathname } from "expo-router";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { clearDates } from "@/features/rental/rentalSlice";

const RouteWatcher = () => {
  const pathname = usePathname();
  const prevPath = useRef(pathname);
  const dispatch = useDispatch();

  const routeWatchers = [
    {
      matcher: (path: string, prev: string) => {
        const bookInfoRegex = /^\/book-info\/[^/]+/;

        const currentMatch = path.match(bookInfoRegex)?.[0];
        const prevMatch = prev.match(bookInfoRegex)?.[0];

        // Khi khác book_id → reset
        return (
          (currentMatch !== prevMatch ||
            /^\/book-info\/[^/]+\/providers$/.test(path)) &&
          path != "/payment/confirm"
        );
      },
      action: () => dispatch(clearDates()),
    },
  ];

  useEffect(() => {
    routeWatchers.forEach(({ matcher, action }) => {
      if (matcher(pathname, prevPath.current)) {
        action();
      }
      prevPath.current = pathname;
    });
  }, [pathname, dispatch]);

  return null;
};

export default RouteWatcher;
