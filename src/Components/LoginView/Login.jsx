import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../Hooks/useAuth";
import { useAxios } from "../Hooks/useAxios";
import apiServices from "../../api/apiServices";
import GoogleLoginBtn from "./Components/GoogleLoginBtn";

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
  } = useForm();

  const showRegisterForm = () => {
    setFormRegister(!formRegister);
    resetLogin();
    resetRegister();
  };

  const registerUser = async (data) => {
    try {
      const response = await requestApi.createUser(data);
      if (response.status === 201) {
        console.log("Usuario creado");
        const user = data.username;
        localStorage.setItem("username", user);
        resetRegister();
        setFormRegister(!formRegister);
        const savedUsername = localStorage.getItem("username");
        if (savedUsername) {
          setValue("username_or_email", savedUsername);
        }
      } else {
        console.log("No se pudo crear el usuario");
      }
    } catch (error) {
      console.error(
        "Error al crear el usuario:",
        error.response?.data || error.message
      );
    }
  };

  const loginUser = async (data) => {
    await loginUsername(data);
  };

  return (
    <div className="mt-10 w-full h-auto px-6 md:px-14 lg:px-24">
      <section className="flex flex-col lg:flex lg:flex-row shadow-lg shadow-slate-200">
        <div className="p-8 lg:w-1/3 lg:px-16 lg:py-12  ">
          <div className="my-7 uppercase text-center text-xl font-medium">
            <h2>Ingresar</h2>
          </div>

          {formRegister ? (
            <div>
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
                    placeholder="Nombre De Usuario"
                    className="bg-transparent placeholder-gray-100 border-b border-red-500 focus:outline-none focus:border-blue-500 px-2 py-2 w-full"
                  />
                  <p className="mt-1 fs-8 text-danger">
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
                    placeholder="Correo Electrónico"
                    className="bg-transparent placeholder-gray-100 border-b border-red-500 focus:outline-none focus:border-blue-500 px-2 py-2 w-full"
                  />
                  <p className="mt-1 fs-8 text-danger">
                    {errorsRegister.email?.message}
                  </p>
                </div>

                <div className="relative flex items-center mb-8">
                  <input
                    {...registerRegister("password", {
                      required: {
                        value: true,
                        message: "Error: por favor complete este campo",
                      },

                      minLength: {
                        value: 8,
                        message:
                          "Error: Contraseña demasiada corta (8 caracteres mínimo)",
                      },

                      maxLength: {
                        value: 50,
                        message:
                          "Error: Contraseña demasiada larga (50 caracteres máximo)",
                      },

                      pattern: {
                        value:
                          /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message:
                          "Error: Debe contener al menos una mayúscula, un numero y un carácter especial",
                      },
                    })}
                    type={showPassword ? "text" : "password"}
                    placeholder="Contraseña"
                    className="bg-transparent placeholder-gray-100 border-b border-red-500 focus:outline-none focus:border-blue-500 px-2 py-2 w-full"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 text-gray-500"
                  >
                    {showPassword ? (
                      <i className="bx bx-hide"></i>
                    ) : (
                      <i className="bx bx-show"></i>
                    )}
                  </button>
                  <p className="mt-1 fs-8 text-danger">
                    {errorsRegister.password?.message}
                  </p>
                </div>

                <div className="relative flex items-center mb-8">
                  <input
                    {...registerRegister("confirm_password", {
                      required: {
                        value: true,
                        message: "Error: por favor complete este campo",
                      },

                      minLength: {
                        value: 8,
                        message:
                          "Error: contraseña demasiada corta (8 caracteres mínimo)",
                      },

                      maxLength: {
                        value: 50,
                        message:
                          "Error: contraseña demasiada larga (50 caracteres máximo)",
                      },

                      pattern: {
                        value:
                          /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message:
                          "Error: Debe contener al menos una mayúscula, un numero y un carácter especial",
                      },
                    })}
                    type={showPasswordConfirmed ? "text" : "password"}
                    placeholder="Repetir Contraseña"
                    className="bg-transparent placeholder-gray-100 border-b border-red-500 focus:outline-none focus:border-blue-500 px-2 py-2 w-full"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswordConfirmed(!showPasswordConfirmed)
                    }
                    className="absolute right-2 top-2 text-gray-500"
                  >
                    {showPasswordConfirmed ? (
                      <i className="bx bx-hide"></i>
                    ) : (
                      <i className="bx bx-show"></i>
                    )}
                  </button>
                  <p className="mt-1 fs-8 text-danger">
                    {errorsRegister.confirm_password?.message}
                  </p>
                </div>

                <button type="submit" className="w-full border p-4 mt-5">
                  CREAR CUENTA
                </button>
              </form>

              <p className="text-red-600 mt-5" onClick={showRegisterForm}>
                Volver
              </p>
            </div>
          ) : (
            <div>
              <form onSubmit={handleSubmitLogin(loginUser)} className="mt-6">
                <div className="mb-8">
                  <input
                    {...registerLogin("username_or_email", {
                      required: {
                        value: true,
                        message: "Error: Por favor complete este campo",
                      },
                      minLength: {
                        value: 4,
                        message:
                          "Error: Email o Usuario demasiado corto (4 caracteres mínimo)",
                      },
                      maxLength: {
                        value: 50,
                        message:
                          "Error: Email o Usuario demasiado largo (50 caracteres máximo)",
                      },
                    })}
                    className="bg-transparent placeholder-gray-100 border-b border-red-500 focus:outline-none focus:border-blue-500 px-2 py-2 w-full"
                    placeholder="Correo Electrónico o Usuario..."
                  />
                  <p className="mt-1 fs-8 text-danger">
                    {errorsLogin.username_or_email?.message}
                  </p>
                </div>

                <div className="relative flex items-center mb-8">
                  <input
                    {...registerLogin("password", {
                      required: {
                        value: true,
                        message: "Error: por favor complete este campo",
                      },

                      minLength: {
                        value: 2,
                        message:
                          "Error: Contraseña demasiada corta (8 caracteres mínimo)",
                      },

                      maxLength: {
                        value: 50,
                        message:
                          "Error: Contraseña demasiada larga (50 caracteres máximo)",
                      },

                      // pattern: {
                      //   value:
                      //     /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      //   message:
                      //     "Error: Debe contener al menos una mayúscula, un numero y un carácter especial",
                      // },
                    })}
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Contraseña..."
                    className="bg-transparent border-b placeholder-gray-100 border-red-500 focus:outline-none focus:border-blue-500 px-2 py-2 w-full"
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    className="absolute right-2 text-gray-500"
                  >
                    {passwordVisible ? (
                      <i className="bx bx-hide"></i>
                    ) : (
                      <i className="bx bx-show"></i>
                    )}
                  </button>
                  <p className="mt-1 fs-8 text-danger">
                    {errorsLogin.password?.message}
                  </p>
                </div>

                <button type="submit" className="w-full border p-4 mt-6">
                  INGRESAR
                </button>
                {authError && <p>{authError}</p>}
              </form>

              <div className="flex flex-col justify-center mt-6 gap-3">
                <GoogleLoginBtn />

                {/* <button className="border p-4 flex items-center justify-center gap-2 relative bg-blue-600">
                  <img
                    className="absolute left-0 h-full bg-white p-3"
                    src="./img/login/login-facebook.png"
                    alt="icono para iniciar sesión con facebook"
                  />
                  <p className="text-gray-200">Continuar con Facebook</p>
                </button> */}
              </div>

              <div className="flex items-center gap-2 flex-col mt-4 font-medium">
                <p className="cursor-pointer" onClick={showRegisterForm}>
                  ¿ Aun no tienes cuenta ?
                </p>
                <p>¿ Olvidaste tu contraseña ?</p>
              </div>
            </div>
          )}
        </div>

        <div className="w-2/3 lg:block hidden">
          <img
            className="object-cover w-full h-full"
            src="/img/contact/contact-image.png"
            alt=""
          />
        </div>
      </section>
    </div>
  );
};

export default Login;
