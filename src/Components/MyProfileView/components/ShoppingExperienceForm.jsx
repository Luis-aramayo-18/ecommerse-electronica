import React from "react";

const ShoppingExperienceForm = ({setFormActive}) => {
  return (
    <>
      <div>
        <div className="flex items-center gap-1">
          <h4 className="text-sm text-white/75 font-light">
            Cuentanos, como fue tu experiencia de compra desde la web !
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
              d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z"
            />
          </svg>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end gap-2 mt-5">
          <textarea
            name=""
            id=""
            required
            placeholder=""
            className="text-white placeholder:text-sm rounded-2xl sm:w-[82%] px-4 pb-44 sm:pb-24 pt-4 resize-none bg-black/30 backdrop-blur-sm"
          ></textarea>

          <div className="flex flex-col h-full w-[20%]">
            <button
              type="button"
              className="btn-glass p-2 h-[10%] mt-3"
              onClick={()=>setFormActive((prev)=>({
                ...prev,
                formPage:false
              }))}
            >
              volver
            </button>

            <button className="btn-glass p-2 h-[10%] mt-3">
              Enviar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingExperienceForm;
