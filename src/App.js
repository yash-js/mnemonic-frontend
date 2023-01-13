import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RequireAuth from "./helper/RequireAuth";

const LoginComponent = React.lazy(() => import("./pages/login"));
const SignUpComponent = React.lazy(() => import("./pages/signup"));
const HomepageComponent = React.lazy(() => import("./pages/home"));
const ErrorComponent = React.lazy(() => import("./layouts/ErrorPage"));
const DashboardComponent = React.lazy(() => import("./pages/dashboard"));
const FriendsComponent = React.lazy(() => import("./pages/friend"));
const MentionComponent = React.lazy(() => import("./pages/mention"));
const ReminderComponent = React.lazy(() => import("./pages/reminder"));
const ShareComponent = React.lazy(() => import("./pages/share"));

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

const DashboardComp = () => {
  return (
    <Suspense>
      <DashboardComponent />
    </Suspense>
  );
}

const FriendComp = () => {
  return (
    <Suspense>
      <FriendsComponent />
    </Suspense>
  );
}

const MentionComp = () => {
  return (
    <Suspense>
      <MentionComponent />
    </Suspense>
  );
}

const ReminderComp = () => {
  return (
    <Suspense>
      <ReminderComponent />
    </Suspense>
  );
}

const ShareComp = () => {
  return (
    <Suspense>
      <ShareComponent />
    </Suspense>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomepageComp />,
    errorElement: <ErrorComp />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardComp />,
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
        path: "/reminder",
        element: <ReminderComp />,
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
      <RouterProvider
        router={router}
      />
    </React.StrictMode>
  );
}

export default App;
