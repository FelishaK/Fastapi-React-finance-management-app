import { useRouteError } from "react-router-dom";

function PageError() {
  const routeError = useRouteError();
  return (
    <div className="flex h-full w-full items-center justify-center ">
      <p className="text-4xl font-medium">
        Error: {routeError ? routeError.message : null} . . . Seems like the
        server didn&apos;t respond ❌ Try again later!
      </p>
    </div>
  );
}

export default PageError;
