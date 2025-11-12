import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import StudentsPage from '@/components/pages/StudentsPage';
import StudentDetailPage from '@/components/pages/StudentDetailPage';
import StudentFormPage from '@/components/pages/StudentFormPage';
import PlacementsPage from '@/components/pages/PlacementsPage';
import PlacementDetailPage from '@/components/pages/PlacementDetailPage';
import PlacementFormPage from '@/components/pages/PlacementFormPage';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "students",
        element: <StudentsPage />,
      },
      {
        path: "students/new",
        element: <StudentFormPage />,
      },
      {
        path: "students/:id",
        element: <StudentDetailPage />,
      },
      {
        path: "students/:id/edit",
        element: <StudentFormPage />,
      },
      {
        path: "placements",
        element: <PlacementsPage />,
      },
      {
        path: "placements/new",
        element: <PlacementFormPage />,
      },
      {
        path: "placements/:id",
        element: <PlacementDetailPage />,
      },
      {
        path: "placements/:id/edit",
        element: <PlacementFormPage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
