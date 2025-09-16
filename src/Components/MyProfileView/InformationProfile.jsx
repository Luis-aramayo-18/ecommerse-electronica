import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import { useAxios } from "../Hooks/useAxios";

const InformationProfile = ({ userData, setUserData }) => {
  const api = useAxios();

  const [dni, setDni] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [banner, setBanner] = useState({
    phone: false,
    dni: false,
  });
  const [loading, setLoading] = useState({
    dni: false,
    phone_number: false,
    username: false,
    email: false,
    user_data: false,
  });

  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserInfo = async () => {
    try {
      setLoading((prevState) => ({
        ...prevState,
        user_data: true,
      }));

      const response = await api.get("/my-user-info/");

      if (response.status === 200) {
        const { username, dni, email, phone_number } = response.data;

        setUserData((prevState) => ({
          ...prevState,
          user: username,
          dni: dni,
          email: email,
          phoneNumber: phone_number,
        }));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading((prevState) => ({
        ...prevState,
        user_data: false,
      }));
    }
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;

    setPhoneNumber(value);
  };

  const handleDniChange = (e) => {
    const value = e.target.value;

    setDni(value);
  };

  const updatePhoneNumber = async () => {
    try {
      setLoading((prevState) => ({
        ...prevState,
        phone_number: true,
      }));

      if (phoneNumber) {
        const userData = {
          phone_number: phoneNumber,
        };

        const response = await api.patch("/user-update/", userData);

        if (response.status === 200) {
          setUserData((prevState) => ({
            ...prevState,
            phoneNumber: response.data.phone_number,
          }));

          setBanner((prevState) => ({
            ...prevState,
            phone: false,
          }));
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading((prevState) => ({
        ...prevState,
        phone_number: false,
      }));
    }
  };

  const updateDni = async () => {
    try {
      setLoading((prevState) => ({
        ...prevState,
        dni: true,
      }));

      if (dni) {
        const userData = {
          dni: dni,
        };

        const response = await api.patch("/user-update/", userData);

        if (response.status === 200) {
          setUserData((prevState) => ({
            ...prevState,
            dni: response.data.dni,
          }));

          setBanner((prevState) => ({
            ...prevState,
            dni: false,
          }));
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading((prevState) => ({
        ...prevState,
        dni: false,
      }));
    }
  };

  return (
    <div className="w-full flex flex-col justify-between mt-5 lg:mt-0 lg:px-4 lg:py-10 lg:glass-box relative">
      <section className="flex flex-col w-full relative">
        <div className="flex flex-col">
          {loading.user_data ? (
            <Loading />
          ) : (
            <>
              {/* --------EMAIL------- */}
              <div className="flex flex-col w-full min-h-32 max-h-36 lg:min-h-28 lg:max-h-32">
                <div className="flex items-center">
                  <p className="text-gray-400 text-lg font-light first-letter:uppercase mx-2">
                    Email
                  </p>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-5 text-green-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.403 12.652a3 3 0 0 0 0-5.304 3 3 0 0 0-3.75-3.751 3 3 0 0 0-5.305 0 3 3 0 0 0-3.751 3.75 3 3 0 0 0 0 5.305 3 3 0 0 0 3.75 3.751 3 3 0 0 0 5.305 0 3 3 0 0 0 3.751-3.75Zm-2.546-4.46a.75.75 0 0 0-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                <div>
                  <p className="text-white first-letter:uppercase mx-2 mb-2 font-semibold text-sm">
                    {userData.email}
                  </p>
                </div>
              </div>

              <hr className="w-full my-5 m-0 bg-white/10 border-0 h-px" />

              {/* --------USER------- */}
              <div className="flex flex-col w-full mt-2 min-h-32 max-h-36 lg:min-h-28 lg:max-h-32">
                <div className="flex items-center">
                  <p className="text-gray-400 text-lg font-light first-letter:uppercase mx-2">
                    usuario
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-5 text-green-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.403 12.652a3 3 0 0 0 0-5.304 3 3 0 0 0-3.75-3.751 3 3 0 0 0-5.305 0 3 3 0 0 0-3.751 3.75 3 3 0 0 0 0 5.305 3 3 0 0 0 3.75 3.751 3 3 0 0 0 5.305 0 3 3 0 0 0 3.751-3.75Zm-2.546-4.46a.75.75 0 0 0-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-white first-letter:uppercase mx-2 mb-2 font-semibold text-sm">
                  {userData.user}
                </p>
                {/* <button className="mb-2 mt-2 btn-glass p-2">Actualizar</button> */}
              </div>

              <hr className="w-full my-5 m-0 bg-white/10 border-0 h-px" />

              {/* --------PHONE------- */}
              <div className="flex flex-col w-full">
                {loading.phone_number ? (
                  <Loading />
                ) : (
                  <>
                    <div className="flex items-center">
                      <p className="text-gray-400 text-lg font-light first-letter:uppercase mx-2">
                        Numero de telefono
                      </p>

                      {userData.phoneNumber === null ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="size-5 text-yellow-500"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="size-5 text-green-400"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.403 12.652a3 3 0 0 0 0-5.304 3 3 0 0 0-3.75-3.751 3 3 0 0 0-5.305 0 3 3 0 0 0-3.751 3.75 3 3 0 0 0 0 5.305 3 3 0 0 0 3.75 3.751 3 3 0 0 0 5.305 0 3 3 0 0 0 3.751-3.75Zm-2.546-4.46a.75.75 0 0 0-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>

                    <div className="relative w-full min-h-32 max-h-36 lg:min-h-28 lg:max-h-32 overflow-hidden">
                      <div
                        className={`
                absolute top-0 left-0 w-full h-full flex flex-col items-start justify-between
                transition-all duration-500 ease-in-out mx-2
                ${
                  banner.phone
                    ? "-translate-x-full opacity-0"
                    : "translate-x-0 opacity-100"
                }
              `}
                      >
                        {userData.phoneNumber ? (
                          <p className="text-white first-letter:uppercase font-semibold text-sm">
                            {userData.phoneNumber}
                          </p>
                        ) : (
                          <p className="text-white first-letter:uppercase font-semibold text-sm text-center">
                            No tienes ningún número de teléfono asignado.
                          </p>
                        )}
                        <button
                          onClick={() =>
                            setBanner((prevState) => ({
                              ...prevState,
                              phone: true,
                            }))
                          }
                          type="button"
                          className="btn-glass p-2 w-[50%] lg:w-[20%]"
                        >
                          Agregar
                        </button>
                      </div>

                      <div
                        className={`
                absolute top-0 left-0 w-full h-full flex flex-col items-center justify-between
                transition-all duration-500 ease-in-out
                ${
                  banner.phone
                    ? "translate-x-0 opacity-100"
                    : "translate-x-full opacity-0"
                }
              `}
                      >
                        <input
                          placeholder="Ingresar número de teléfono"
                          type="number"
                          value={phoneNumber}
                          onChange={handlePhoneNumberChange}
                          className="bg-transparent placeholder:text-xs text-white placeholder:text-white/65 border-b border-white/25 focus:outline-none focus:border-[#fce803] w-[60%] lg:w-[40%] py-2 text-center"
                        />

                        <button
                          type="button"
                          className="btn-glass p-2 w-[50%] lg:w-[20%]"
                          onClick={updatePhoneNumber}
                        >
                          Actualizar
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <hr className="w-full m-0 my-5 bg-white/10 border-0 h-px" />

              {/* --------DNI------- */}
              <div className="flex flex-col w-full">
                {loading.dni ? (
                  <Loading />
                ) : (
                  <>
                    <div className="flex items-center">
                      <p className="text-gray-400 text-lg font-light first-letter:uppercase mx-2">
                        DNI
                      </p>

                      {userData.dni === null ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="size-5 text-yellow-500"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="size-5 text-green-400"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.403 12.652a3 3 0 0 0 0-5.304 3 3 0 0 0-3.75-3.751 3 3 0 0 0-5.305 0 3 3 0 0 0-3.751 3.75 3 3 0 0 0 0 5.305 3 3 0 0 0 3.75 3.751 3 3 0 0 0 5.305 0 3 3 0 0 0 3.751-3.75Zm-2.546-4.46a.75.75 0 0 0-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>

                    <div className="relative w-full min-h-32 max-h-36 lg:min-h-28 lg:max-h-32 overflow-hidden">
                      <div
                        className={`
                absolute top-0 left-0 w-full h-full flex flex-col items-start justify-between
                transition-all duration-500 ease-in-out mx-2
                ${
                  banner.dni
                    ? "-translate-x-full opacity-0"
                    : "translate-x-0 opacity-100"
                }
              `}
                      >
                        {userData.dni ? (
                          <p className="text-white first-letter:uppercase font-semibold text-sm">
                            {userData.dni}
                          </p>
                        ) : (
                          <p className="text-white first-letter:uppercase font-semibold text-sm text-center">
                            No tienes un DNI asignado.
                          </p>
                        )}
                        <button
                          onClick={() =>
                            setBanner((prevState) => ({
                              ...prevState,
                              dni: true,
                            }))
                          }
                          type="button"
                          className="btn-glass p-2 w-[50%] lg:w-[20%]"
                        >
                          Agregar
                        </button>
                      </div>

                      <div
                        className={`
                absolute top-0 left-0 w-full h-full flex flex-col items-center justify-between
                transition-all duration-500 ease-in-out
                ${
                  banner.dni
                    ? "translate-x-0 opacity-100"
                    : "translate-x-full opacity-0"
                }
              `}
                      >
                        <input
                          required
                          placeholder="Ingresar DNI"
                          type="number"
                          value={dni}
                          onChange={handleDniChange}
                          className="bg-transparent placeholder:text-xs text-white placeholder:text-white/65 border-b border-white/25 focus:outline-none focus:border-[#fce803] w-[60%] lg:w-[40%] py-2 text-center"
                        />

                        <button
                          type="button"
                          className="btn-glass p-2 w-[50%] lg:w-[20%]"
                          onClick={updateDni}
                        >
                          Actualizar
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="yellow-glow absolute w-[40%] h-[30%] right-[5%] bottom-0"></section>
    </div>
  );
};

export default InformationProfile;
