import React from "react";
import ShoppingExperienceForm from "./ShoppingExperienceForm";
import HelpForm from "./HelpForm";

const HelpPurchaseDetails = ({ formActive, setFormActive }) => {
  const handlePageFormActive = () => {
    setFormActive((prev) => ({
      ...prev,
      formPage: true,
    }));
  };

  const handleContactFormActive = () => {
    setFormActive((prev) => ({
      ...prev,
      formContact: true,
    }));
  };
  return (
    <>
      <div className="">
        <div className="mb-5 text-sm font-medium text-[#fce803]">
          <h2>Ayuda Con La Compra.</h2>
        </div>

        <div
          className={`relative ${
            formActive.formContact || formActive.formPage
              ? "h-[200px]"
              : "h-[100px]"
          }`}
        >
          <div
            className={`flex flex-col w-full absolute items-start gap-2 transition-all duration-500 ease-in-out ${
              formActive.formPage || formActive.formContact
                ? "-translate-x-full opacity-0"
                : "translate-x-0 opacity-100"
            }`}
          >
            <button
              onClick={() => handlePageFormActive()}
              className="text-sm w-full text-start font-light text-white lg:text-white/75 lg:transition-all lg:duration-100 lg:hover:text-white"
            >
              Quiero opinar sobre mi experiencia de compra.
            </button>

            <button
              onClick={() => handleContactFormActive()}
              className="text-sm w-full text-start font-light text-white lg:text-white/75 lg:transition-all lg:duration-100 lg:hover:text-white"
            >
              Tengo un problema con mi compra.
            </button>
          </div>

          <div
            className={`w-full h-full absolute transition-all duration-500 ease-in-out ${
              formActive.formPage
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0"
            }`}
          >
            <ShoppingExperienceForm setFormActive={setFormActive} />
          </div>

          <div
            className={`w-full h-full absolute transition-all duration-500 ease-in-out ${
              formActive.formContact
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0"
            }`}
          >
            <HelpForm setFormActive={setFormActive} />
          </div>
        </div>
      </div>
    </>
  );
};

export default HelpPurchaseDetails;
