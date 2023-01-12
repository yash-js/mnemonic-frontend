import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RequireAuth from "./helper/RequireAuth";

const LoginComponent = React.lazy(() => import("./pages/login"));
const SignUpComponent = React.lazy(() => import("./pages/signup"));
const HomepageComponent = React.lazy(() => import("./pages/home"));
const ErrorComponent = React.lazy(() => import("./layouts/errorPage.jsx"));

const LoginComp = () => {
  return (
    <Suspense>
      <LoginComponent />
    </Suspense>
  );
};

const SignUpComp = () => {
  return (
    <Suspense>
      <SignUpComponent />
    </Suspense>
  );
};

const HomepageComp = () => {
  return (
    <Suspense>
      <RequireAuth>
        <HomepageComponent />
      </RequireAuth>
    </Suspense>
  );
};

const ErrorComp = () => {
  return (
    <Suspense>
      <ErrorComponent />
    </Suspense>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomepageComp />,
    errorElement: <ErrorComp />,
  },
  {
    path: "/signin",
    element: <LoginComp />,
    errorElement: <ErrorComp />,
  },
  {
    path: "/signup",
    element: <SignUpComp />,
    errorElement: <ErrorComp />,
  },
]);

function App() {
  return (
    <React.StrictMode>
      <RouterProvider
        router={router}
        key={router.routes.map((route) => route)}
      />
    </React.StrictMode>
  );
}

export default App;
