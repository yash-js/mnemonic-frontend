import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const LoginComponent = React.lazy(() => import('./pages/login/index'));
const SignUpComponent = React.lazy(() => import('./pages/signup/index'));
const ErrorComponent = React.lazy(() => import('./layouts/errorPage.jsx'));

const LoginComp = () => {
  return (
    (<Suspense>
      <LoginComponent />
    </Suspense>)
  );
};

const SignUpComp = () => {
  return (
    <Suspense>
      <SignUpComponent />
    </Suspense>);
};

const ErrorComp = () => {
  return (
    <Suspense>
      <ErrorComponent />
    </Suspense>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignUpComp />,
    errorElement: <ErrorComp />,
  },
  {
    path: "/login",
    element: <LoginComp />,
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
