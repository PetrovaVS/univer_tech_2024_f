import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Result, Button } from "antd";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "./store/reducer/userSlice/userSlice";
import { AccountPage } from "./pages/AccountPage/AccountPage";
import { PageLayout } from "./components/Layout/Layout";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";
import { Home } from "./components/Home/Home";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUserState] = useState({});
  const [token, setTokenState] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    const storedToken = localStorage.getItem("token") || "";
    setUserState(storedUser);
    setTokenState(storedToken);
    dispatch(setUser({ user: storedUser }));
    dispatch(setToken({ token: storedToken }));
  }, [dispatch]);

  const isAuth = (element) => {
    return user.id && token ? element : (
      <Result
        status="403"
        title="403"
        subTitle="Вы не авторизованы!"
        extra={
          <Button type="primary" onClick={() => navigate("/auth/login")}>
            Авторизоваться
          </Button>
        }
      />
    );
  };

  return (
    <Routes>
      <Route path="/dashboard/*" element={isAuth(<PageLayout />)}>
        <Route index element={<Home />} />
        <Route path="user" element={<AccountPage user={user} />} />
        <Route path="account/" element={<AccountPage user={user} />} />
      </Route>

      <Route path="/auth/">
        <Route path="login" element={<LoginPage />} />
        <Route path="reg" element={<RegisterPage />} />
      </Route>

      <Route path="*" element={
        <Result
          status="404"
          title="404"
          subTitle="Такой страницы не существует!"
        />
      } />

      <Route path="/error/" element={
        <PageLayout>
          <Result
            status="403"
            title="403"
            subTitle="У вас нет роли администратора"
          />
        </PageLayout>
      } />
    </Routes>
  );
}

export default App;
