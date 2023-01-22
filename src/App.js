import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import IndexRoute from "./layouts/IndexRoute";
import LoginSkeleton from "./skeletons/LoginSkeleton";
import "./styles/index.css";

const LoginComponent = React.lazy(() => import("./pages/login"));
const SignUpComponent = React.lazy(() => import("./pages/signup"));
const HomepageComponent = React.lazy(() => import("./pages/home"));
const ErrorComponent = React.lazy(() => import("./layouts/ErrorPage"));
const FriendsComponent = React.lazy(() => import("./pages/friend"));
const MentionComponent = React.lazy(() => import("./pages/mention"));
const ShareComponent = React.lazy(() => import("./pages/share"));

const LoginComp = () => {
  return (
    <Suspense fallback={<LoginSkeleton />}>
      <LoginComponent />
    </Suspense>
  );
};

const SignUpComp = () => {
  return (
    <Suspense fallback={<LoginSkeleton />}>
      <SignUpComponent />
    </Suspense>
  );
};

const HomepageComp = () => {
  return (
    <Suspense>
      <HomepageComponent />
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

const FriendComp = () => {
  return (
    <Suspense>
      <FriendsComponent />
    </Suspense>
  );
};

const MentionComp = () => {
  return (
    <Suspense>
      <MentionComponent />
    </Suspense>
  );
};

const ShareComp = () => {
  return (
    <Suspense>
      <ShareComponent />
    </Suspense>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexRoute />,
    errorElement: <ErrorComp />,
    children: [
      {
        path: "/",
        element: <HomepageComp />,
      },
      {
        path: "/friend",
        element: <FriendComp />,
      },
      {
        path: "/mention",
        element: <MentionComp />,
      },
      {
        path: "/share",
        element: <ShareComp />,
      },
    ],
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
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
