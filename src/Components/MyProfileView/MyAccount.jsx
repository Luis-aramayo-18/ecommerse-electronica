import React, { useState } from "react";

import { useAxios } from "../Hooks/useAxios";

import InformationProfile from "./components/InformationProfile";
import OrdersProfile from "./components/OrdersProfile";
import AuthProfile from "./components/AuthProfile";
import Menu from "./components/Menu";
import Header from "./components/Header";
import AdminProfile from "./components/AdminProfile";

import { useAuth } from "../Hooks/useAuth";
import DirectionsProfiles from "./components/DirectionsProfiles";

const MyAccount = () => {
  const api = useAxios();

  const [section, setSection] = useState("information");
  const { logoutUsername } = useAuth();
  const [admin, setAdmin] = useState(false);

  const openSection = (section) => {
    switch (section) {
      case "information":
        return <InformationProfile setSection={setSection} api={api} />;

      case "orders":
        return <OrdersProfile />;

      case "directions":
        return <DirectionsProfiles />;

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
      <div className="mt-10 w-full h-auto px-4 md:px-14 lg:px-24 flex">
        <section className="w-[30%] lg:h-[50%] px-4 py-10 bg-[#fce803] backdrop-blur border border-black/25 rounded-[32px] hidden lg:block">
          <div>
            <Header api={api} />
          </div>

          <div className="mt-10">
            <Menu
              section={section}
              setSection={setSection}
              logoutUsername={logoutUsername}
              admin={admin}
              setAdmin={setAdmin}
            />
          </div>
        </section>

        <section className="w-full ms-[2%] hidden lg:block">
          {openSection(section)}
        </section>

        {/* ------MOBILE----- */}

        <section className="w-full lg:hidden">
          <div className="bg-[#fce803] border border-black/25 text-black rounded-[32px] relative overflow-hidden">
            <div className="w-full flex justify-center p-4">
              <Header />
            </div>

            {/* <div className="yellow-glow absolute top-[10%] left-[5%] h-[80%] w-[40%]"></div> */}
          </div>

          <div className="mt-20 mb-10">
            <section className="cursor-pointer px-4 py-6 glass-box">
              <div
                className="flex items-center gap-3 text-white"
                onClick={() =>
                  setSection(section === "information" ? "" : "information")
                }
              >
                {section === "information" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6 text-white"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.5 3.75a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V6.75a3 3 0 0 0-3-3h-15Zm4.125 3a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Zm-3.873 8.703a4.126 4.126 0 0 1 7.746 0 .75.75 0 0 1-.351.92 7.47 7.47 0 0 1-3.522.877 7.47 7.47 0 0 1-3.522-.877.75.75 0 0 1-.351-.92ZM15 8.25a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H15ZM14.25 12a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H15a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H15Z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
                    />
                  </svg>
                )}

                <h2 className="text-sm font-bold uppercase">Información</h2>
              </div>

              {section === "information" && <div>{openSection(section)}</div>}
            </section>

            <section className="cursor-pointer px-4 py-6 glass-box mt-10">
              <div
                className="flex items-center gap-3 text-white"
                onClick={() =>
                  setSection(
                    section === "authentication" ? "" : "authentication"
                  )
                }
              >
                {section === "authentication" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6 text-white"
                  >
                    <path d="M18 1.5c2.9 0 5.25 2.35 5.25 5.25v3.75a.75.75 0 0 1-1.5 0V6.75a3.75 3.75 0 1 0-7.5 0v3a3 3 0 0 1 3 3v6.75a3 3 0 0 1-3 3H3.75a3 3 0 0 1-3-3v-6.75a3 3 0 0 1 3-3h9v-3c0-2.9 2.35-5.25 5.25-5.25Z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                  </svg>
                )}

                <p className="text-sm font-bold uppercase">Autenticación</p>
              </div>

              {section === "authentication" && (
                <div className="mt-5">{openSection(section)}</div>
              )}
            </section>

            {admin === true ? (
              <section className="cursor-pointer px-4 py-6 glass-box mt-10">
                <div
                  className="flex items-center gap-2 text-white"
                  onClick={() => setSection(section === "admin" ? "" : "admin")}
                >
                  {section === "admin" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6 text-white"
                    >
                      <path d="M4.08 5.227A3 3 0 0 1 6.979 3H17.02a3 3 0 0 1 2.9 2.227l2.113 7.926A5.228 5.228 0 0 0 18.75 12H5.25a5.228 5.228 0 0 0-3.284 1.153L4.08 5.227Z" />
                      <path
                        fillRule="evenodd"
                        d="M5.25 13.5a3.75 3.75 0 1 0 0 7.5h13.5a3.75 3.75 0 1 0 0-7.5H5.25Zm10.5 4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm3.75-.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 17.25v-.228a4.5 4.5 0 0 0-.12-1.03l-2.268-9.64a3.375 3.375 0 0 0-3.285-2.602H7.923a3.375 3.375 0 0 0-3.285 2.602l-2.268 9.64a4.5 4.5 0 0 0-.12 1.03v.228m19.5 0a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3m19.5 0a3 3 0 0 0-3-3H5.25a3 3 0 0 0-3 3m16.5 0h.008v.008h-.008v-.008Zm-3 0h.008v.008h-.008v-.008Z"
                      />
                    </svg>
                  )}

                  <p className="text-sm font-bold uppercase">Admin</p>
                </div>

                {section === "admin" && (
                  <div className="mt-5">{openSection(section)}</div>
                )}
              </section>
            ) : (
              <section className="cursor-pointer px-4 py-6 glass-box mt-10">
                <div
                  className="flex items-center gap-2 text-[#deecfb]"
                  onClick={() =>
                    setSection(section === "orders" ? "" : "orders")
                  }
                >
                  {section === "orders" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6 text-white"
                    >
                      <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                      />
                    </svg>
                  )}

                  <p className="text-lg">Compras</p>
                </div>

                {section === "orders" && (
                  <div className="mt-5">{openSection(section)}</div>
                )}
              </section>
            )}

            <section className="cursor-pointer px-4 py-6 glass-box mt-10">
              <div
                className="flex items-center gap-2 text-white"
                onClick={logoutUsername}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
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
