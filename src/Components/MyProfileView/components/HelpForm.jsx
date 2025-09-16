import React from "react";

const HelpForm = ({ setFormActive }) => {
  return (
    <>
      <div>
        <div className="flex items-center gap-1">
          <h4 className="text-sm text-white/75 font-light">
            Por favor, cuentanos el problema que estas teniendo, estaremos
            contactandonos a la brevedad por Email.
          </h4>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5 text-[#fce803]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
            />
          </svg>
        </div>

        <div className="flex items-end gap-2 mt-5">
          <textarea
            name=""
            id=""
            required
            placeholder=""
            className="text-white placeholder:text-sm rounded-2xl w-[82%] px-4 pb-24 pt-4 resize-none bg-black/30 backdrop-blur-sm"
          ></textarea>

          <div className="flex flex-col h-full w-[20%]">
            <button
              type="button"
              className="btn-glass p-2 h-[10%] mt-3"
              onClick={() =>
                setFormActive((prev) => ({
                  ...prev,
                  formContact: false,
                }))
              }
            >
              volver
            </button>

            <button className="btn-glass p-2 h-[10%] mt-3">Enviar</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HelpForm;
