import React, { useEffect, useState } from "react";

const InformationProfile = ({ setSection, api }) => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [provider, setProvider] = useState(false);

  const [inputNumberDisabled, setInputNumberDisabled] = useState(true);
  const [inputDniDisabled, setInputDniDisabled] = useState(true);
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

  const handleUsernameUpdate = async () => {
    const updateUsername = {
      new_username: user,
      current_password: currentPassword,
    };

    try {
      const response = await api.put("/user-update/", updateUsername);
      if (response.status === 200) {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleEmailUpdate = async () => {
    const updateEmail = {
      new_email: email,
      current_password: currentPassword,
    };
    try {
      const response = await api.put("/user-update/", updateEmail);
      if (response.status === 200) {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const updateUser = (e) => {
    e.preventDefault();
  };

  return (
    <div className="w-full flex flex-col justify-between">
      <section className="hidden lg:block text-5xl font-semibold">
        <h2>Información</h2>
      </section>

      <section className="mt-5 lg:mt-10 flex flex-col w-full relative">
        <form onSubmit={updateUser}>
          <div className="flex flex-col gap-3 lg:flex-row lg:gap-10">
            <div className="flex flex-col gap-2 w-full lg:w-[35%]">
              <label className="text-lg font-medium text-[#a8acb0]" htmlFor="Name">
                Usuario
              </label>

              <div className="relative">
                <input
                  id="Name"
                  type="text"
                  className="p-2 mt-2 rounded-md w-full text-lg"
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  disabled={inputUserDisabled}
                />
                {provider === true && (
                  <button
                    onClick={() => setInputUserDisabled(!inputUserDisabled)}
                    className={`bg-white text-gray-800 border border-gray-600 flex justify-center items-center rounded-full w-2 h-2 p-3 absolute -top-[30%] -right-[5%]  hover:opacity-100 ${
                      inputUserDisabled === false ? "opacity-100" : "opacity-50"
                    }`}
                  >
                    <i className="bx bx-pencil text-base"></i>
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full lg:w-[50%]">
              <label className="text-lg font-medium text-[#a8acb0]" htmlFor="Email">
                Email
              </label>

              <div className="relative">
                <input
                  type="text"
                  className="p-2 mt-2 rounded-md w-full text-lg"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  disabled={inputEmailDisabled}
                  id="Email"
                />
                {provider === true && (
                  <button
                    onClick={() => setInputEmailDisabled(!inputEmailDisabled)}
                    className={`bg-white text-gray-800 border border-gray-600 flex justify-center items-center rounded-full w-2 h-2 p-3 absolute -top-[30%] -right-[5%]  hover:opacity-100 ${
                      inputEmailDisabled === false
                        ? "opacity-100"
                        : "opacity-50"
                    }`}
                  >
                    <i className="bx bx-pencil text-base"></i>
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:flex-row lg:gap-10">
            <div className="flex flex-col gap-2 mt-7 w-full lg:w-[35%]">
              <label className="text-lg font-medium text-[#a8acb0]" htmlFor="Teléfono">
                Teléfono
              </label>

              <div className="relative">
                <input
                  type="text"
                  className="p-2 mt-2 rounded-md w-full text-lg"
                  disabled={inputNumberDisabled}
                  id="Teléfono"
                />

                <button
                  onClick={() => setInputNumberDisabled(!inputNumberDisabled)}
                  className={`bg-white text-gray-800 border border-gray-600 flex justify-center items-center rounded-full w-2 h-2 p-3 absolute -top-[30%] -right-[5%]  hover:opacity-100 ${
                    inputNumberDisabled === false ? "opacity-100" : "opacity-50"
                  }`}
                >
                  <i className="bx bx-pencil text-base"></i>
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-7 w-full lg:w-[35%]">
              <label className="text-lg font-medium text-[#a8acb0]" htmlFor="DNI">
                DNI
              </label>

              <div className="relative">
                <input
                  type="text"
                  className="p-2 mt-2 rounded-md w-full text-lg"
                  disabled={inputDniDisabled}
                  id="DNI"
                />

                <button
                  onClick={() => setInputDniDisabled(!inputDniDisabled)}
                  className={`bg-white text-gray-800 border border-gray-600 flex justify-center items-center rounded-full w-2 h-2 p-3 absolute -top-[30%] -right-[5%]  hover:opacity-100 ${
                    inputDniDisabled === false ? "opacity-100" : "opacity-50"
                  }`}
                >
                  <i className="bx bx-pencil text-base"></i>
                </button>
              </div>
            </div>
          </div>

          {(inputNumberDisabled === false ||
            inputUserDisabled === false ||
            inputEmailDisabled === false ||
            inputDniDisabled === false) && (
            <button
              type="button"
              className="mt-10 border-2 rounded-lg p-4 uppercase font-bold"
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
    </div>
  );
};

export default InformationProfile;
