import { useRoutes } from "react-router-dom";
import LoginPage from "./components/auth/LoginPage.tsx";
import UserList from "./components/profile/UserList.tsx";
import UserEdit from "./components/profile/UserEdit.tsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.tsx";
import AuthRoute from "./components/auth/AuthRoute.tsx";
import NotFoundPage from "./components/UI/NotFoundPage.tsx";
import ProfilePage from "./components/profile/Profile.tsx";

function App() {
  const elements = useRoutes([
    {
      path: "/",
      element: (
        <AuthRoute>
          <LoginPage />
        </AuthRoute>
      ),
    },
    {
      path: "/users",
      element: (
        <ProtectedRoute>
          <UserList />
        </ProtectedRoute>
      ),
    },
    {
      path: "/users/create",
      element: (
        <ProtectedRoute>
          <UserEdit />
        </ProtectedRoute>
      ),
    },
    {
      path: "/users/edit/:id",
      element: (
        <ProtectedRoute>
          <UserEdit />
        </ProtectedRoute>
      ),
    },
    {
      path: "/profile",
      element: (
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      ),
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);
  return elements;
}

export default App;
