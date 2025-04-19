import React, { useEffect, useState } from "react";

const InformationProfile = ({ setSection, api }) => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [provider, setProvider] = useState(false);

  const [inputUserDisabled, setInputUserDisabled] = useState(true);
  const [inputEmailDisabled, setInputEmailDisabled] = useState(true);

  const [passwordModal, setPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  useEffect(() => {
    const loadDataUser = async () => {
      const user = localStorage.getItem("username");
      const email = localStorage.getItem("userEmail");
      const provider = localStorage.getItem("userProvider");

      setUser(user);
      setEmail(email);

      if (provider === "email") {
        setProvider(true);
      }
    };
    loadDataUser();
  }, []);

  const updateUser = (e) => {
    e.preventDefault();
  };

  return (
    <div className="w-full flex flex-col justify-between mt-5 lg:mt-0 lg:px-4 lg:py-10 lg:glass-box relative">
      <section className="flex flex-col w-full relative">
        {/* <button className="text-sm font-semibold uppercase text-white text-start mx-2 mb-5 " disabled>editar</button> */}
        <form onSubmit={updateUser}>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2 w-full lg:w-[50%]">
              <div>
                <p className="text-gray-400 text-sm font-semibold first-letter:uppercase mx-2 mb-2">
                  usuario
                </p>
                <div className="relative flex items-center">
                  <input
                    id="Name"
                    type="text"
                    className="p-4 text-sm font-semibold bg-black/30 text-white mt-2 rounded-2xl w-full"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    disabled={inputUserDisabled}
                  />

                  {provider === true && (
                    <button
                      onClick={() => setInputUserDisabled(!inputUserDisabled)}
                      className={` text-gray-400 mt-1 absolute right-4 transition-all duration-100 lg:hover:text-white ${
                        inputUserDisabled === false
                          ? "text-white"
                          : "text-gray-400"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full lg:w-[50%] mt-5">
              <div className="relative">
                <p className="text-gray-400 text-sm font-semibold first-letter:uppercase mx-2 mb-2">
                  email
                </p>

                <div className="relative flex items-center">
                  <input
                    type="text"
                    className="p-4 text-sm font-semibold bg-black/30 text-white mt-2 rounded-2xl w-full"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    disabled={inputEmailDisabled}
                    id="Email"
                  />

                  {provider === true && (
                    <button
                      onClick={() => setInputEmailDisabled(!inputEmailDisabled)}
                      className={`text-gray-400 mt-1 absolute right-4 transition-all duration-100 lg:hover:text-white ${
                        inputEmailDisabled === false
                          ? "text-white"
                          : "text-gray-400"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {(inputUserDisabled === false || inputEmailDisabled === false) && (
            <button
              type="button"
              className="mt-10 border bg-black/70 backdrop-blur rounded-2xl p-4 uppercase text-white text-xs font-semibold"
              onClick={() => setPasswordModal(!passwordModal)}
            >
              Actualizar
            </button>
          )}

          {passwordModal && (
            <div className="fixed z-10 top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm	 flex justify-center items-center">
              <div className="border p-8 w-[400px] relative">
                {provider === true ? (
                  <div>
                    <div className="flex flex-col justify-center items-center gap-2 w-full">
                      <label
                        className="flex justify-start w-full uppercase font-semibold text-gray-400"
                        htmlFor="password"
                      >
                        Ingresar Actual Contraseña
                      </label>
                      <div className="flex items-center gap-2 relative w-full mt-3">
                        <input
                          type={`${showCurrentPassword ? "text" : "password"}`}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          value={currentPassword}
                          className="p-2 rounded-md w-full"
                          required
                          id="password"
                        />

                        <button
                          className="absolute right-2"
                          type="button"
                          onClick={() =>
                            setShowCurrentPassword(!showCurrentPassword)
                          }
                        >
                          {showCurrentPassword ? (
                            <i class="bx bx-hide"></i>
                          ) : (
                            <i class="bx bx-show"></i>
                          )}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="p-2 mt-5 border uppercase w-full font-medium"
                    >
                      Actualizar
                    </button>
                  </div>
                ) : (
                  <button onClick={() => setSection("authentication")}>
                    <p className="uppercase text-sm font-bold underline underline-offset-8 text-gray-400 hover:text-blue-400">
                      Ingrese una contraseña para continuar
                    </p>
                  </button>
                )}
                <button
                  className="text-white absolute top-2 right-2"
                  onClick={() => setPasswordModal(!passwordModal)}
                >
                  <i className="bx bx-x text-xl"></i>
                </button>
              </div>
            </div>
          )}
        </form>
      </section>

      <section className="yellow-glow absolute w-[40%] h-[30%] right-[5%] bottom-0"></section>
    </div>
  );
};

export default InformationProfile;
