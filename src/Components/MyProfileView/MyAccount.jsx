import React, { useState } from "react";

import { useAxios } from "../Hooks/useAxios";

import InformationProfile from "./components/InformationProfile";
import OrdersProfile from "./components/OrdersProfile";
import AuthProfile from "./components/AuthProfile";
import Menu from "./components/Menu";
import Header from "./components/Header";
import AdminProfile from "./components/AdminProfile";
import { useAuth } from "../Hooks/useAuth";

const MyAccount = () => {
  const api = useAxios();

  const [section, setSection] = useState("");
  const { logoutUsername } = useAuth();

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
        <section className="w-[20%] fixed hidden lg:block">
          <div>
            <Header api={api} />
          </div>

          <div className="mt-10">
            <Menu
              section={section}
              setSection={setSection}
              logoutUsername={logoutUsername}
            />
          </div>
        </section>

        <section className="w-full ms-[18%] hidden lg:block">
          {openSection(section)}
        </section>

        {/* ------MOBILE----- */}

        <section className="w-full lg:hidden">
          <div className="w-full flex justify-center p-3 shadow-md shadow-slate-400 rounded-xl">
            <Header />
          </div>

          <div className="mt-20 mb-10">
            <section className="shadow-sm shadow-slate-400 p-5 rounded-xl">
              <div
                className="flex items-center gap-2 text-[#deecfb]"
                onClick={() =>
                  setSection(section === "information" ? "" : "information")
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
                  />
                </svg>

                <p className="text-lg">Información</p>
              </div>

              {section === "information" && <div>{openSection(section)}</div>}
            </section>

            <section className="shadow-sm shadow-slate-400 p-5 rounded-xl mt-10">
              <div
                className="flex items-center gap-2 text-[#deecfb]"
                onClick={() => setSection(section === "orders" ? "" : "orders")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>

                <p className="text-lg">Compras</p>
              </div>

              {section === "orders" && (
                <div className="mt-5">{openSection(section)}</div>
              )}
            </section>

            <section className="shadow-sm shadow-slate-400 p-5 rounded-xl mt-10">
              <div
                className="flex items-center gap-2 text-[#deecfb]"
                onClick={() =>
                  setSection(
                    section === "authentication" ? "" : "authentication"
                  )
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>

                <p className="text-lg">Autenticación</p>
              </div>

              {section === "authentication" && (
                <div className="mt-5">{openSection(section)}</div>
              )}
            </section>

            <section className="shadow-sm shadow-slate-400 p-5 rounded-xl mt-10">
              <div
                className="flex items-center gap-2 text-[#deecfb]"
                onClick={() => setSection(section === "admin" ? "" : "admin")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21.75 17.25v-.228a4.5 4.5 0 0 0-.12-1.03l-2.268-9.64a3.375 3.375 0 0 0-3.285-2.602H7.923a3.375 3.375 0 0 0-3.285 2.602l-2.268 9.64a4.5 4.5 0 0 0-.12 1.03v.228m19.5 0a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3m19.5 0a3 3 0 0 0-3-3H5.25a3 3 0 0 0-3 3m16.5 0h.008v.008h-.008v-.008Zm-3 0h.008v.008h-.008v-.008Z"
                  />
                </svg>

                <p className="text-lg">Admin</p>
              </div>

              {section === "admin" && (
                <div className="mt-5">{openSection(section)}</div>
              )}
            </section>

            <section className="shadow-sm shadow-[#FF3131] p-5 rounded-xl mt-10">
              <div
                className="flex items-center gap-2 text-[#deecfb]"
                onClick={logoutUsername}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                  />
                </svg>

                <p className="text-lg">Salir</p>
              </div>
            </section>
          </div>
        </section>
      </div>
    </>
  );
};

export default MyAccount;
