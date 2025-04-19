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
    <div className="w-full h-full lg:px-4 lg:py-10 lg:glass-box relative">
      <section className="h-full relative">
        <div className="flex flex-col">
          {hasPassword === true ? (
            <div>
              <div className="flex flex-col-reverse lg:flex-row lg:mt-5">
                <form className="flex flex-col gap-3 w-full lg:w-[50%] mt-10 lg:mt-0 text-white">
                  <div className="flex items-center gap-2 relative">
                    <input
                      type={`${showCurrentPassword ? "text" : "password"}`}
                      onChange={(e) =>
                        setCurrentPasswordForPasswordForm(e.target.value)
                      }
                      value={currentPasswordForPasswordForm}
                      className="py-4 bg-transparent placeholder:text-sm border-b border-white/25 text-sm font-semibold w-full focus:border-[#fce803] focus:outline-none"
                      required
                      placeholder="Contraseña actual"
                    />

                    <button
                      type="button"
                      className="absolute right-4"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                    >
                      {showCurrentPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-4 text-white"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-4 text-white"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center gap-2 relative">
                    <input
                      type={`${showNewPassword ? "text" : "password"}`}
                      onChange={(e) => setNewPassword(e.target.value)}
                      value={newPassword}
                      className="py-4 bg-transparent placeholder:text-sm border-b border-white/25 text-sm font-semibold w-full focus:border-[#fce803] focus:outline-none"
                      required
                      placeholder="Nueva Contraseña"
                    />

                    <button
                      type="button"
                      className="absolute right-4"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center gap-2 relative">
                    <input
                      type={`${showNewPassword2 ? "text" : "password"}`}
                      onChange={(e) => setNewPassword2(e.target.value)}
                      value={newPassword2}
                      className="py-4 bg-transparent placeholder:text-sm border-b border-white/25 text-sm font-semibold w-full focus:border-[#fce803] focus:outline-none"
                      required
                      placeholder="Repetir Nueva Contraseña"
                    />
                    <button
                      type="button"
                      className="absolute right-4"
                      onClick={() => setShowNewPassword2(!showNewPassword2)}
                    >
                      {showNewPassword2 ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>

                  <button
                    className="uppercase border border-black/25 bg-[#fce803] text-black lg:border-white/25 lg:bg-black/30 lg:text-white lg:hover:bg-[#fce803] lg:hover:text-black lg:hover:border-black/25 rounded-2xl p-4 backdrop-blur mt-5 text-xs font-semibold"
                    type="submit"
                  >
                    Actualizar Contraseña
                  </button>
                </form>

                <div className="lg:px-5 lg:ms-10">
                  <p className="font-medium text-sm mb-3 first-letter:uppercase text-white/85">
                    La contraseña debe contener:
                  </p>
                  <ul className="flex flex-col gap-3 text-white/65 text-xs">
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
                          className="size-4 text-[#fce803]"
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
                          className="size-4 text-[#fce803]"
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
                          className="size-4 text-[#fce803]"
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
                          className="size-4 text-[#fce803]"
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

      <section className="yellow-glow absolute top-[10%] right-[15%] w-[40%] h-[30%]"></section>
    </div>
  );
};

export default AuthProfile;
