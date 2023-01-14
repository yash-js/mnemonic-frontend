import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RequireAuth from "./helper/RequireAuth";
import LoginSkeleton from "./skeletons/LoginSkeleton";

const LoginComponent = React.lazy(() => import("./pages/login"));
const SignUpComponent = React.lazy(() => import("./pages/signup"));
const HomepageComponent = React.lazy(() => import("./pages/home"));
const ErrorComponent = React.lazy(() => import("./layouts/errorpage"));
// const DashboardComponent = React.lazy(() => import("./pages/dashboard"));
const FriendsComponent = React.lazy(() => import("./pages/friend"));
const MentionComponent = React.lazy(() => import("./pages/mention"));
const ReminderComponent = React.lazy(() => import("./pages/reminder"));
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

// const DashboardComp = () => {
//   return (
//     <Suspense>
//       <RequireAuth>
//         <DashboardComponent />
//       </RequireAuth>
//     </Suspense>
//   );
// };

const FriendComp = () => {
  return (
    <Suspense>
      <RequireAuth>
        <FriendsComponent />
      </RequireAuth>
    </Suspense>
  );
};

const MentionComp = () => {
  return (
    <Suspense>
      <RequireAuth>
        <MentionComponent />
      </RequireAuth>
    </Suspense>
  );
};

const ReminderComp = () => {
  return (
    <Suspense>
      <RequireAuth>
        <ReminderComponent />
      </RequireAuth>
    </Suspense>
  );
};

const ShareComp = () => {
  return (
    <Suspense>
      <RequireAuth>
        <ShareComponent />
      </RequireAuth>
    </Suspense>
  );
};

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <HomepageComp />,
//     errorElement: <ErrorComp />,
//     children: [
//       {
//         path: "/",
//         element: <HomepageComp />,
//       },
//       {
//         path: "/friend",
//         element: <FriendComp />,
//       },
//       {
//         path: "/mention",
//         element: <MentionComp />,
//       },
//       {
//         path: "/reminder",
//         element: <ReminderComp />,
//       },
//       {
//         path: "/share",
//         element: <ShareComp />,
//       },
//     ],
//   },
//   {
//     path: "/signin",
//     element: <LoginComp />,
//     errorElement: <ErrorComp />,
//   },
//   {
//     path: "/signup",
//     element: <SignUpComp />,
//     errorElement: <ErrorComp />,
//   },
// ]);

function App() {
  return (
    <React.StrictMode>
      {/* <RouterProvider router={router} /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomepageComp />}>
            <Route index element={<HomepageComp />} />
            <Route path="friend" element={<FriendComp />} />
            <Route path="mention" element={<MentionComp />} />
            <Route path="reminder" element={<ReminderComp />} />
            <Route path="share" element={<ShareComp />} />
          </Route>
          <Route path="signin" element={<LoginComp />} />
          <Route path="signup" element={<SignUpComp />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
