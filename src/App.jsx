import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Loader from "./components/Loader/Loader.jsx";
import { lazy, Suspense } from "react";
// import PrivateRoute from "./components/PrivateRoute.jsx";
// import RestrictedRoute from "./components/RestrictedRoute.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddPetPage = lazy(() => import("./pages/AddPetPage/AddPetPage.jsx"));
const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage.jsx"));
const MainPage = lazy(() => import("./pages/MainPage/MainPage.jsx"));
const NewsPage = lazy(() => import("./pages/NewsPage/NewsPage.jsx"));
const NotFoundPage = lazy(() =>
  import("./pages/NotFoundPage/NotFoundPage.jsx")
);
const NoticesPage = lazy(() => import("./pages/NoticesPage/NoticesPage.jsx"));
const OurFriendsPage = lazy(() =>
  import("./pages/OurFriendsPage/OurFriendsPage.jsx")
);
const ProfilePage = lazy(() => import("./pages/ProfilePage/ProfilePage.jsx"));
const RegistrationPage = lazy(() =>
  import("./pages/RegistrationPage/RegistrationPage.jsx")
);

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <ToastContainer position="top-center" autoClose={3000} />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<HomePage />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="notices" element={<NoticesPage />} />
          <Route path="friends" element={<OurFriendsPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegistrationPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="add-pet" element={<AddPetPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
