import React, { useState } from "react";

import { useAxios } from "../Hooks/useAxios";

import InformationProfile from "./components/InformationProfile";
import OrdersProfile from "./components/OrdersProfile";
import AuthProfile from "./components/AuthProfile";
import Menu from "./components/Menu";
import Header from "./components/Header";
import AdminProfile from "./components/AdminProfile";

const MyAccount = () => {
  const api = useAxios();

  const [section, setSection] = useState("information");

  const openSection = (section) => {
    switch (section) {
      case "information":
        return <InformationProfile setSection={setSection} api={api} />;

      case "orders":
        return <OrdersProfile />;

      case "authentication":
        return <AuthProfile />;

      case "admin":
        return <AdminProfile />;

      default:
        return <InformationProfile />;
    }
  };
  

  return (
    <>
      <div className="mt-10 w-full h-auto px-6 md:px-14 lg:px-24 flex">
        <section className="w-[20%] fixed">
          <div>
            <Header api={api} />
          </div>

          <div className="mt-10">
            <Menu section={section} setSection={setSection} />
          </div>
        </section>

        <section className="w-full ms-[18%]">{openSection(section)}</section>
      </div>
    </>
  );
};

export default MyAccount;
