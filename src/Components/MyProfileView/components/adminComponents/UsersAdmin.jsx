import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAxios } from "../../../Hooks/useAxios";
import apiServices from "../../../../api/apiServices";
import Loading from "../../../Loading";
import { Bounce, toast } from "react-toastify";

const UsersAdmin = () => {
  const api = useAxios();
  const requestApi = apiServices(api);

  const [showPasswordConfirmed, setShowPasswordConfirmed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formRegister, setFormRegister] = useState(false);
  const [loading, setLoading] = useState({
    login: false,
    register: false,
  });

  const {
    register: registerRegister,
    handleSubmit: handleSubmitRegister,
    formState: { errors: errorsRegister },
    reset: resetRegister,
    setValue,
    watch,
  } = useForm();

  const password = watch("password", "");

  const registerUser = async (data) => {
    try {
      setLoading({ ...loading, register: true });
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
    } finally {
      setLoading({ ...loading, register: false });
    }
  };

  const validations = {
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[$#%&@.]/.test(password),
    hasMinLength: password.length >= 8,
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row lg:justify-between w-full my-10">
      <form onSubmit={handleSubmitRegister(registerUser)} className="lg:w-[50%]">
        <div className="mb-8">
          <input
            {...registerRegister("username", {
              required: {
                value: true,
                message: "Error: Por favor complete este campo",
              },
              minLength: {
                value: 2,
                message: "Error: Usuario demasiado corto (2 caracteres mínimo)",
              },
              maxLength: {
                value: 20,
                message:
                  "Error: Usuario demasiado largo (20 caracteres máximo)",
              },
            })}
            type="text"
            placeholder="Nombre de usuario"
            className="bg-transparent placeholder:text-sm text-white placeholder:text-white/65 border-b border-white/25 focus:outline-none focus:border-[#fce803] py-2 w-full"
          />
          <p className="mt-1 text-xs font-extralight text-[#ec5050e0]">
            {errorsRegister.username?.message}
          </p>
        </div>

        <div className="relative flex flex-col justify-center items-center mb-8">
          <input
            {...registerRegister("password", {
              required: "La contraseña es obligatoria",
            })}
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            className="text-white bg-transparent placeholder:text-sm placeholder:text-white/65 border-b border-white/25 focus:outline-none focus:border-[#fce803] py-2 w-full"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-2 right-2 text-white/65"
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
            className="bg-transparent placeholder:text-sm text-white placeholder:text-white/65 border-b border-white/25 focus:outline-none focus:border-[#fce803] py-2 w-full"
          />
          <button
            type="button"
            onClick={() => setShowPasswordConfirmed(!showPasswordConfirmed)}
            className="absolute top-2 right-2 text-white/65"
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
          className="w-full text-xs font-semibold rounded-lg border p-4 mt-5 bg-[#fce803] text-black border-black/25 lg:bg-black/30 lg:text-white lg:border-white/25 lg:hover:bg-[#fce803] lg:hover:text-black lg:hover:border-black/25"
        >
          {loading.register ? (
            <Loading />
          ) : (
            <p className="text-xs font-semibold uppercase">registrar</p>
          )}
        </button>
      </form>

      <div className="w-full lg:w-[40%] mb-10 lg:mb-0">
        <p className="font-medium text-sm mb-3 first-letter:uppercase text-[#fce803]">
          La contraseña debe contener:
        </p>
        <ul className="flex flex-col gap-3 text-white/65 text-sm">
          <li className="flex items-center gap-2 font-medium">
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
  );
};

export default UsersAdmin;
