import React, { useEffect, useState } from "react";
import { useAxios } from "../../Hooks/useAxios";
import { Bounce, toast } from "react-toastify";

const AuthProfile = () => {
  const api = useAxios();

  const [hasPassword, setHasPassword] = useState(false);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [currentPasswordForPasswordForm, setCurrentPasswordForPasswordForm] =
    useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewPassword2, setShowNewPassword2] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");

  const [formRegisterPassword, setFormRegisterPassword] = useState(false);
  const [passwordRegister, setPasswordRegister] = useState("");
  const [passwordRegister2, setPasswordRegister2] = useState("");
  const [showPasswordRegister, setShowPasswordRegister] = useState(false);
  const [showPasswordRegister2, setShowPasswordRegister2] = useState(false);

  const [validations, setValidations] = useState({
    hasUppercase: false,
    hasNumber: false,
    hasSpecialChar: false,
    hasMinLength: false,
  });

  const [activeForm, setActiveForm] = useState(false);

  useEffect(() => {
    const password = localStorage.getItem("hasPassword");

    if (password) {
      setHasPassword(true);
    }
  }, []);

  const handlePasswordChange = (e) => {
    const password = e.target.value;

    setPasswordRegister(password);
    setValidations({
      hasUppercaseAndLowercase:
        /[a-z]/.test(password) && /[A-Z]/.test(password) ? true : false,
      hasNumber: /\d/.test(password) ? true : false,
      hasSpecialChar: /[$#%&@.]/.test(password) ? true : false,
      hasMinLength: password.length >= 8 ? true : false,
    });
  };

  const handleRegisterPassword = async (e) => {
    e.preventDefault();

    if (
      validations.hasMinLength === true &&
      validations.hasNumber === true &&
      validations.hasSpecialChar === true &&
      validations.hasUppercase === true
    ) {
      const userId = localStorage.getItem("userId");
      try {
        const passwordData = {
          user_id: userId,
          password: passwordRegister,
          passwordRepeat: passwordRegister2,
        };

        const response = await api.post("/password-register/", passwordData);

        if (response.status === 201) {
          const hasPassword = response.data;

          if (hasPassword) {
            localStorage.setItem("hasPassword", hasPassword);
          }

          const message = response.data.message;
          toast.success(message, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
        }
      } catch (error) {
        const errorMessage =
          error.response.data.error || "Error al registrar contraseña";

        toast.error(errorMessage, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    } else {
      toast.error("Por favor ingrese una contraseña valida", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="w-full h-full">
      <section className="hidden lg:blocktext-5xl font-semibold">
        <h2>Autenticación</h2>
      </section>

      <section className="h-full relative"> 
        <div className="flex flex-col">
          {hasPassword === true ? (
            <div>
              <button
                className="mt-10 border p-4"
                onClick={() => setActiveForm(!activeForm)}
              >
                {activeForm === true ? "Atras" : "Actualizar contraseña"}
              </button>

              {activeForm === true && (
                <div className="flex flex-col-reverse lg:flex-row mt-5">
                  <form className="flex flex-col gap-3 mt-10 w-full lg:w-[50%] text-[#acb1b6]">
                    <div className="flex items-center gap-2">
                      <label className="flex gap-2 items-center w-full">
                        Actual Contraseña
                        <input
                          type={`${showCurrentPassword ? "text" : "password"}`}
                          onChange={(e) =>
                            setCurrentPasswordForPasswordForm(e.target.value)
                          }
                          value={currentPasswordForPasswordForm}
                          className="p-2 rounded-md w-full"
                          required
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                      >
                        {showCurrentPassword ? (
                          <i className="bx bx-hide"></i>
                        ) : (
                          <i className="bx bx-show"></i>
                        )}
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="flex gap-2 items-center w-full">
                        Nueva Contraseña
                        <input
                          type={`${showNewPassword ? "text" : "password"}`}
                          onChange={(e) => setNewPassword(e.target.value)}
                          value={newPassword}
                          className="p-2 rounded-md w-full"
                          required
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? (
                          <i className="bx bx-hide"></i>
                        ) : (
                          <i className="bx bx-show"></i>
                        )}
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="flex gap-2 items-center w-full">
                        Repetir Nueva Contraseña
                        <input
                          type={`${showNewPassword2 ? "text" : "password"}`}
                          onChange={(e) => setNewPassword2(e.target.value)}
                          value={newPassword2}
                          className="p-2 rounded-md w-full"
                          required
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowNewPassword2(!showNewPassword2)}
                      >
                        {showNewPassword2 ? (
                          <i className="bx bx-hide"></i>
                        ) : (
                          <i className="bx bx-show"></i>
                        )}
                      </button>
                    </div>
                    <div className="flex justify-center gap-2 cursor-pointer p-4 border uppercase mt-5">
                      <button type="submit">Actualizar Contraseña</button>
                    </div>
                  </form>

                  <div className="lg:px-5 lg:ms-10">
                    <p className="font-medium text-sm mb-3 first-letter:uppercase text-[#acb1b6]">
                      La contraseña debe contener:
                    </p>
                    <ul className="flex flex-col gap-3 text-[#acb1b6] text-xs">
                      <li className="flex items-center gap-2 font-light">
                        <p>Una letra mayúscula y minúscula</p>
                        {validations.hasUppercase ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-4 text-[#16fe01]"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m4.5 12.75 6 6 9-13.5"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-4 text-[#fea401]"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                            />
                          </svg>
                        )}
                      </li>
                      <li className="flex items-center gap-2 font-light">
                        <p>Un numero</p>
                        {validations.hasNumber ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-4 text-[#16fe01]"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m4.5 12.75 6 6 9-13.5"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-4 text-[#fea401]"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                            />
                          </svg>
                        )}
                      </li>
                      <li className="flex items-center gap- font-light">
                        <p>Un carácter especial: $,#,%,&,@,.</p>
                        {validations.hasSpecialChar ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-4 text-[#16fe01]"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m4.5 12.75 6 6 9-13.5"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-4 text-[#fea401]"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                            />
                          </svg>
                        )}
                      </li>
                      <li className="flex items-center gap-2 font-light">
                        <p>8 caracteres como mínimo</p>
                        {validations.hasMinLength ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-4 text-[#16fe01]"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m4.5 12.75 6 6 9-13.5"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-4 text-[#fea401]"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                            />
                          </svg>
                        )}
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="absolute w-full">
              <div
                className={`${
                  formRegisterPassword
                    ? "flex items-end gap-5"
                    : "flex flex-col justify-center gap-5"
                } mt-5`}
              >
                <p className="text-3xl text-gray-500 font-medium font-stretch-extra-expanded">
                  {formRegisterPassword
                    ? "Registrar Contraseña"
                    : "Aun no has registrado una contraseña"}
                </p>

                <div>
                  {formRegisterPassword ? (
                    <button
                      className="text-red-600 font-semibold"
                      onClick={() =>
                        setFormRegisterPassword(!formRegisterPassword)
                      }
                    >
                      Volver
                    </button>
                  ) : (
                    <button
                      className="p-4 border font-semibold rounded-lg uppercase mt-5"
                      onClick={() =>
                        setFormRegisterPassword(!formRegisterPassword)
                      }
                    >
                      Registrar Contraseña
                    </button>
                  )}
                </div>
              </div>

              {formRegisterPassword && (
                <div className="flex gap-10">
                  <form onSubmit={handleRegisterPassword} className="w-[50%]">
                    <div className="flex flex-col gap-2 mt-5">
                      <label className="text-lg font-medium" htmlFor="password">
                        Contraseña
                      </label>

                      <div className="relative mt-2">
                        <input
                          id="password"
                          type={`${showPasswordRegister ? "text" : "password"}`}
                          className="p-2 rounded-md w-full text-lg"
                          onChange={handlePasswordChange}
                          value={passwordRegister}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-3"
                          onClick={() =>
                            setShowPasswordRegister(!showPasswordRegister)
                          }
                        >
                          {showPasswordRegister ? (
                            <i className="bx bx-hide text-lg"></i>
                          ) : (
                            <i className="bx bx-show text-lg"></i>
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 mt-5">
                      <label
                        className="text-lg font-medium"
                        htmlFor="password2"
                      >
                        Repetir Contraseña
                      </label>

                      <div className="relative mt-2">
                        <input
                          id="password2"
                          type={`${
                            showPasswordRegister2 ? "text" : "password"
                          }`}
                          className="p-2 rounded-md w-full text-lg"
                          onChange={(e) => setPasswordRegister2(e.target.value)}
                          value={passwordRegister2}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-3"
                          onClick={() =>
                            setShowPasswordRegister2(!showPasswordRegister2)
                          }
                        >
                          {showPasswordRegister2 ? (
                            <i className="bx bx-hide text-lg"></i>
                          ) : (
                            <i className="bx bx-show text-lg"></i>
                          )}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="p-4 border uppercase font-bold text-lg mt-10"
                    >
                      Actualizar
                    </button>
                  </form>

                  <div className="p-5 w-[50%]">
                    <ul className="flex flex-col gap-3">
                      <h3 className="font-medium mb-3 uppercase">
                        La contraseña debe contener:
                      </h3>
                      <li className="flex items-center gap-2 font-light">
                        <p>Al menos una letra mayúscula y minúscula</p>
                        {validations.hasUppercase ? (
                          <i className="bx bx-check text-xl text-green-500"></i>
                        ) : (
                          <i className="bx bxs-error-circle text-xl text-red-600"></i>
                        )}
                      </li>
                      <li className="flex items-center gap-2 font-light">
                        <p>Al menos un numero</p>
                        {validations.hasNumber ? (
                          <i className="bx bx-check text-xl text-green-500"></i>
                        ) : (
                          <i className="bx bxs-error-circle text-xl text-red-600"></i>
                        )}
                      </li>
                      <li className="flex items-center gap- font-light">
                        <p>Un carácter especial: $,#,%,&,@,.</p>
                        {validations.hasSpecialChar ? (
                          <i className="bx bx-check text-xl text-green-500"></i>
                        ) : (
                          <i className="bx bxs-error-circle text-xl text-red-600"></i>
                        )}
                      </li>
                      <li className="flex items-center gap-2 font-light">
                        <p>8 caracteres como mínimo</p>
                        {validations.hasMinLength ? (
                          <i className="bx bx-check text-xl text-green-500"></i>
                        ) : (
                          <i className="bx bxs-error-circle text-xl text-red-600"></i>
                        )}
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AuthProfile;
