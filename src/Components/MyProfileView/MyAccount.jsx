import React, { useEffect, useState } from "react";

import InformationProfile from "./components/InformationProfile";
import OrdersProfile from "./components/OrdersProfile";
import AuthProfile from "./components/AuthProfile";
import Menu from "./components/Menu";
import Header from "./components/Header";
import AdminProfile from "./components/AdminProfile";

import { useAuth } from "../Hooks/useAuth";
import DirectionsProfiles from "./components/DirectionsProfiles";
import AdminMenu from "./components/adminComponents/AdminMenu";
import SoldsAdmin from "./components/adminComponents/SoldsAdmin";
import { useSearchParams } from "react-router-dom";

const MyAccount = () => {
  const { logoutUsername } = useAuth();

  const [openSectionMobile, setOpenSectionMobile] = useState(null);
  const [messageConfirmation, setMessageConfirmation] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [userData, setUserData] = useState({
    user: "",
    email: "",
    dni: "",
    phoneNumber: "",
  });
  const [section, setSection] = useState(
    searchParams.get("section") || "information"
  );
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const adm = localStorage.getItem("userAdmin");

    if (adm === "true") {
      setSection("solds");
      setAdmin(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openSection = (section) => {
    switch (section) {
      case "information":
        return (
          <InformationProfile
            userData={userData}
            setUserData={setUserData}
            setSection={setSection}
          />
        );

      case "orders":
        return (
          <OrdersProfile
            setShowConfirmation={setShowConfirmation}
            setMessageConfirmation={setMessageConfirmation}
            messageConfirmation={messageConfirmation}
          />
        );

      case "directions":
        return <DirectionsProfiles />;

      case "authentication":
        return <AuthProfile />;

      case "admin":
        return <AdminProfile />;

      case "solds":
        return <SoldsAdmin />;

      default:
        return null;
    }
  };

  useEffect(() => {
    if (showConfirmation) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showConfirmation]);

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  const toggleSection = (sectionName) => {
    setOpenSectionMobile(
      openSectionMobile === sectionName ? null : sectionName
    );
  };

  return (
    <>
      <div className="mt-10 w-full h-auto px-4 md:px-14 lg:px-24 flex">
        {/* ------HEADER----- */}
        <section className="w-[30%] lg:h-[50%] px-4 py-10 bg-[#fce803] backdrop-blur border border-black/25 rounded-[32px] hidden lg:block">
          <div>
            <Header userData={userData} />
          </div>

          <div className="mt-10">
            {admin ? (
              <AdminMenu
                section={section}
                setSection={setSection}
                logoutUsername={logoutUsername}
                setSearchParams={setSearchParams}
              />
            ) : (
              <Menu
                section={section}
                setSection={setSection}
                logoutUsername={logoutUsername}
                setSearchParams={setSearchParams}
              />
            )}
          </div>
        </section>
        {/* ------MAIN----- */}
        <section className="w-full ms-[2%] hidden lg:block">
          {openSection(section)}
        </section>
        {/* ------MOBILE----- */}
        <section className="w-full lg:hidden">
          <div className="bg-[#fce803] border border-black/25 text-black rounded-[32px] relative overflow-hidden">
            <div className="w-full flex justify-center p-4">
              <Header userData={userData} />
            </div>
          </div>

          <div className="mt-20 mb-10">
            <section className="cursor-pointer glass-box mt-10 px-4 py-8">
              <div
                className="flex items-center gap-3 text-white"
                onClick={() => toggleSection("information")}
              >
                {openSectionMobile === "information" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6 text-white transition-transform duration-300"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6 text-white/75 transition-transform duration-300 transform -rotate-90"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}

                <h2
                  className={`text-sm font-bold uppercase ${
                    openSectionMobile === "information"
                      ? "text-white"
                      : "text-white/75"
                  }`}
                >
                  Información del Perfil
                </h2>
              </div>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openSectionMobile === "information"
                    ? "max-h-[1000px]"
                    : "max-h-0"
                }`}
              >
                <InformationProfile
                  userData={userData}
                  setUserData={setUserData}
                  setSection={setSection}
                />
              </div>
            </section>

            <section className="cursor-pointer px-4 py-8 glass-box mt-10">
              <div
                className="flex items-center gap-3 text-white"
                onClick={() => toggleSection("orders")}
              >
                {openSectionMobile === "orders" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6 text-white transition-transform duration-300"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6 text-white/75 transition-transform duration-300 transform -rotate-90"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                <h2 className={`text-sm font-bold uppercase ${
                    openSectionMobile === "orders"
                      ? "text-white"
                      : "text-white/75"
                  }`}>Compras</h2>
              </div>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openSectionMobile === "orders" ? "max-h-[1000px]" : "max-h-0"
                }`}
              >
                <OrdersProfile
                  setShowConfirmation={setShowConfirmation}
                  setMessageConfirmation={setMessageConfirmation}
                  messageConfirmation={messageConfirmation}
                />
              </div>
            </section>

            <section className="cursor-pointer px-4 py-8 glass-box mt-10">
              <div
                className="flex items-center gap-2 text-white rounded-sm"
                onClick={() => toggleSection("directions")}
              >
                {openSectionMobile === "directions" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6 text-white transition-transform duration-300"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6 text-white/75 transition-transform duration-300 transform -rotate-90"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                <h2 className={`text-sm font-bold uppercase ${
                    openSectionMobile === "directions"
                      ? "text-white"
                      : "text-white/75"
                  }`}>Direcciones</h2>
              </div>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openSectionMobile === "directions"
                    ? "max-h-[1000px]"
                    : "max-h-0"
                }`}
              >
                <DirectionsProfiles />
              </div>
            </section>

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
        {/* ------CONFIRMATIONS MESSAGE----- */}
        {showConfirmation && (
          <section className="fixed z-50 top-0 left-0 w-full h-full bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center">
            {messageConfirmation === "paymentSuccess" ? (
              <div className="glass-box relative px-6 py-10 max-w-[35%]">
                <div className="flex flex-col items-center gap-5">
                  <h2 className="uppercase text-3xl font-bold text-green-600">
                    ¡pago exitoso!
                  </h2>
                  <p className="text-sm font-medium text-white/85">
                    Podras ver los detalles de tu compra en mis compras.
                  </p>
                  <img
                    src="/img/payment/pago-exitoso.png"
                    className="h-28 w-28"
                    alt=""
                  />
                </div>
                <div className="flex justify-center mt-5 w-full">
                  <button
                    className="btn-glass w-full"
                    onClick={handleCloseConfirmation}
                  >
                    Continuar
                  </button>
                </div>
              </div>
            ) : messageConfirmation === "paymentError" ? (
              <div className="glass-box relative px-6 py-10 max-w-[35%]">
                <div className="flex flex-col items-center gap-5">
                  <h2 className="uppercase text-3xl font-bold text-red-600">
                    ¡Hubo un problema con el pago!
                  </h2>
                  <p className="text-sm font-medium text-white/85">
                    Por favor, intente nuevamente o contacte al soporte si el
                    problema persiste.
                  </p>
                  <img
                    src="/img/payment/pago-rechazado.png"
                    className="h-28 w-28"
                    alt=""
                  />
                </div>
                <div className="flex justify-center mt-5 w-full">
                  <button
                    className="btn-glass w-full"
                    onClick={handleCloseConfirmation}
                  >
                    Continuar
                  </button>
                </div>
              </div>
            ) : (
              <div className="glass-box relative px-6 py-10 max-w-[35%]">
                <div className="flex flex-col items-center gap-5">
                  <h2 className="uppercase text-3xl font-bold text-[#fce803]">
                    ¡Esperando el pago!
                  </h2>
                  <p className="text-sm font-medium text-white/85">
                    Podras ver los detalles de tu compra en mis compras.
                  </p>
                  <img
                    src="/img/payment/pago-pendiente.png"
                    className="h-28 w-28"
                    alt=""
                  />
                </div>
                <div className="flex justify-center mt-5 w-full">
                  <button
                    className="btn-glass w-full"
                    onClick={handleCloseConfirmation}
                  >
                    Continuar
                  </button>
                </div>
              </div>
            )}
          </section>
        )}
      </div>
      z
    </>
  );
};

export default MyAccount;
