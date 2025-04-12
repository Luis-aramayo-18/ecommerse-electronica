import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../Hooks/useAuth";
import { useAxios } from "../Hooks/useAxios";
import apiServices from "../../api/apiServices";
import GoogleLoginBtn from "./Components/GoogleLoginBtn";
import { Bounce, toast } from "react-toastify";

const Login = () => {
  const api = useAxios();
  const requestApi = apiServices(api);

  const [formRegister, setFormRegister] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmed, setShowPasswordConfirmed] = useState(false);
  const { authError, loginUsername } = useAuth();

  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: errorsLogin },
    reset: resetLogin,
    setValue,
  } = useForm();

  const {
    register: registerRegister,
    handleSubmit: handleSubmitRegister,
    formState: { errors: errorsRegister },
    reset: resetRegister,
    watch,
  } = useForm();

  const password = watch("password", "");

  const showRegisterForm = () => {
    setFormRegister(!formRegister);
    resetLogin();
    resetRegister();
  };

  const registerUser = async (data) => {
    try {
      const response = await requestApi.createUser(data);

      if (response.status === 201) {
        const user = data.username;
        localStorage.setItem("username", user);
        resetRegister();
        setFormRegister(!formRegister);
        const savedUsername = localStorage.getItem("username");
        if (savedUsername) {
          setValue("username_or_email", savedUsername);
        }

        toast.success("Inicia sesion por favor", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      }
    } catch (error) {
      const errors = error.response.data;
      const firstErrorKey = Object.keys(errors)[0];
      const errorMessage = errors[firstErrorKey][0];

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
  };

  const loginUser = async (data) => {
    await loginUsername(data);
  };

  const validations = {
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[$#%&@.]/.test(password),
    hasMinLength: password.length >= 8,
  };

  return (
    <div className="my-10 w-full h-auto px-2 md:px-14 lg:px-24">
      <section className="flex justify-center">
        <div className="w-[90%] sm:w-[70%] md:w-[65%] lg:w-[55%] xl:w-[35%] border rounded-2xl py-6 px-4 bg-black/70 backdrop-blur sm:p-6 mt-10 shadow-md shadow-slate-500">
          {formRegister ? (
            <div className="flex flex-col-reverse gap-6 w-full md:flex md:flex-row md:justify-center md:gap-10">
              <div className="w-full lg:w-[60%]">
                <form onSubmit={handleSubmitRegister(registerUser)}>
                  <div className="mb-8">
                    <input
                      {...registerRegister("username", {
                        required: {
                          value: true,
                          message: "Error: Por favor complete este campo",
                        },
                        minLength: {
                          value: 2,
                          message:
                            "Error: Usuario demasiado corto (2 caracteres mínimo)",
                        },
                        maxLength: {
                          value: 20,
                          message:
                            "Error: Usuario demasiado largo (20 caracteres máximo)",
                        },
                      })}
                      type="text"
                      placeholder="Nombre de usuario"
                      className="bg-transparent placeholder:text-xs text-white placeholder:text-[#deecfb] border-b border-[#9cccf4cb] focus:outline-none px-2 py-2 w-full"
                    />
                    <p className="mt-1 text-xs font-extralight text-[#ec5050e0]">
                      {errorsRegister.username?.message}
                    </p>
                  </div>

                  <div className="mb-8">
                    <input
                      {...registerRegister("email", {
                        required: {
                          value: true,
                          message: "Error: Por favor complete este campo",
                        },
                        minLength: {
                          value: 8,
                          message:
                            "Error: Email demasiado corto (8 caracteres mínimo)",
                        },
                        maxLength: {
                          value: 50,
                          message:
                            "Error: Email demasiado largo (50 caracteres máximo)",
                        },
                        pattern: {
                          value: /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/,
                          message: "Error: Ingrese un email valido",
                        },
                      })}
                      type="email"
                      placeholder="Correo electrónico"
                      className="bg-transparent placeholder:text-xs text-white placeholder:text-[#deecfb] border-b border-[#9cccf4cb] focus:outline-none px-2 py-2 w-full"
                    />
                    <p className="mt-1 text-xs font-extralight text-[#ec5050e0]">
                      {errorsRegister.email?.message}
                    </p>
                  </div>

                  <div className="relative flex flex-col justify-center items-center mb-8">
                    <input
                      {...registerRegister("password", {
                        required: "La contraseña es obligatoria",
                      })}
                      type={showPassword ? "text" : "password"}
                      placeholder="Contraseña"
                      className="text-white bg-transparent placeholder:text-xs placeholder:text-[#deecfb] border-b border-[#9cccf4cb] focus:outline-none px-2 py-2 w-full"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-2 right-2 text-gray-500"
                    >
                      {showPassword ? (
                        <i className="bx bx-hide"></i>
                      ) : (
                        <i className="bx bx-show"></i>
                      )}
                    </button>
                    <p className="mt-1 text-xs font-extralight text-[#ec5050e0]">
                      {errorsRegister.password?.message}
                    </p>
                  </div>

                  <div className="relative flex flex-col justify-center items-center mb-8">
                    <input
                      {...registerRegister("confirm_password", {
                        required: "Debes confirmar la contraseña",
                        validate: (value) =>
                          value === password || "Las contraseñas no coinciden",
                      })}
                      type={showPasswordConfirmed ? "text" : "password"}
                      placeholder="Repetir contraseña"
                      className="bg-transparent placeholder:text-xs text-white placeholder:text-[#deecfb] border-b border-[#9cccf4cb] focus:outline-none px-2 py-2 w-full"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPasswordConfirmed(!showPasswordConfirmed)
                      }
                      className="absolute top-2 right-2 text-gray-500"
                    >
                      {showPasswordConfirmed ? (
                        <i className="bx bx-hide"></i>
                      ) : (
                        <i className="bx bx-show"></i>
                      )}
                    </button>
                    <p className="mt-1 text-xs font-extralight text-[#ec5050e0]">
                      {errorsRegister.confirm_password?.message}
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full text-sm font-semibold rounded-2xl border p-3 mt-5 text-[#acb1b6] lg:hover:text-white lg:hover:border-white lg:hover:bg-[#fea401]"
                  >
                    CREAR CUENTA
                  </button>
                </form>

                <button
                  className="text-[#ec5050e0] mt-5"
                  onClick={showRegisterForm}
                >
                  Volver
                </button>
              </div>

              <div className="w-full lg:w-[40%] mt-5">
                <p className="font-medium text-sm mb-3 first-letter:uppercase text-[#acb1b6]">
                  La contraseña debe contener:
                </p>
                <ul className="flex flex-col gap-3 text-[#acb1b6] text-xs">
                  <li className="flex items-center gap-2 font-light">
                    <p>Una letra mayúscula y minúscula</p>
                    {validations.hasUppercase && validations.hasLowercase ? (
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
          ) : (
            <div>
              <form
                onSubmit={handleSubmitLogin(loginUser)}
                className="mt-6 p-4"
              >
                <div className="mb-8">
                  <input
                    {...registerLogin("username_or_email", {
                      required: {
                        value: true,
                        message: "Por favor complete este campo",
                      },
                    })}
                    className="bg-transparent placeholder:text-xs text-white placeholder:text-[#deecfb] border-b border-[#9cccf4cb] focus:outline-none px-2 py-2 w-full"
                    placeholder="Correo electrónico o usuario"
                  />
                  <p className="mt-1 text-xs font-extralight text-[#ec5050e0]">
                    {errorsLogin.username_or_email?.message}
                  </p>
                </div>

                <div className="relative flex flex-col items-start justify-center mb-8">
                  <input
                    {...registerLogin("password", {
                      required: {
                        value: true,
                        message: "por favor complete este campo",
                      },
                    })}
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Contraseña"
                    className="bg-transparent placeholder:text-xs text-white placeholder:text-[#deecfb] border-b border-[#9cccf4cb] focus:outline-none px-2 py-2 w-full"
                  />
                  <p className="mt-1 text-xs font-extralight text-[#ec5050e0]">
                    {errorsLogin.password?.message}
                  </p>
                  <button
                    type="button"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    className="absolute right-2 text-[#deecfb]"
                  >
                    {passwordVisible ? (
                      <i className="bx bx-hide"></i>
                    ) : (
                      <i className="bx bx-show"></i>
                    )}
                  </button>
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="w-[190px] text-xs font-semibold transition-all rounded-md duration-100 border p-3 mt-6 text-[#ffffff] lg:hover:text-white lg:hover:border-white lg:hover:bg-[#fea401]"
                  >
                    INGRESAR
                  </button>
                </div>
                {authError && <p>{authError}</p>}
              </form>

              <div className="w-full flex flex-col items-center justify-center gap-3">
                <GoogleLoginBtn className="w-full" />
              </div>

              <div className="flex items-center gap-2 flex-col mt-4 font-medium text-[#9fa3a7]">
                <p
                  className="cursor-pointer transition-all duration-100 lg:hover:text-white"
                  onClick={showRegisterForm}
                >
                  ¿ Aun no tienes cuenta ?
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Login;
