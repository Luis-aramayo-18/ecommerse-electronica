import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useAxios } from "../../Hooks/useAxios";
import Loading from "../../Loading";
import { Bounce, toast } from "react-toastify";

const DirectionsProfiles = () => {
  const api = useAxios();

  const [formActive, setFormActive] = useState(false);
  const [directions, setDirections] = useState([]);
  const [directionData, setDirectionData] = useState({
    street: "",
    number: "",
    cp: "",
    address_type: "",
    reference: "",
  });
  const [loading, setLoading] = useState({
    get_direction: false,
    post_direction: false,
    delete_direction: false,
  });
  const [errorMessage, setErrorMessage] = useState({
    get_direction: "",
    post_direction: "",
    delete_direction: "",
  });

  useEffect(() => {
    fetchDirections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "transparent",
      boxShadow: "none",
      borderTop: "none",
      borderLeft: "none",
      borderRight: "none",
      borderColor: state.isFocused ? "#fce803" : "#ffffff40",
      color: "white",
      padding: "8px 0",
      cursor: "pointer",
      "&:hover": {
        boxShadow: "none",
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "rgba(0, 0, 0, 0.9)",
      backdropFilter: "blur(20px)",
      borderColor: "rgba(255, 255, 255, 0.25)",
      borderWidth: "1px",
      color: "white",
    }),
    menuList: (provided) => ({
      ...provided,
      maxHeight: "15rem",
      overflowY: "auto",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "white",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: "transparent",
      fontWeight: "600",
      fontSize: "0.9rem",
      margin: "0, 1rem",
      color: state.isSelected ? "[#fce803]" : "",
      cursor: "pointer",
      "&:hover": {
        color: "#fce803",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: "13px",
      color: "rgba(255, 255, 255, 0.65)",
    }),
  };

  const options = [
    { value: "home", label: "Casa" },
    { value: "job", label: "Trabajo" },
    { value: "other", label: "Otro" },
  ];

  const handleStreetChange = (e) => {
    const value = e.target.value;

    setDirectionData((prevState) => ({
      ...prevState,
      street: value,
    }));
  };

  const handleNumberChange = (e) => {
    const value = e.target.value;

    setDirectionData((prevState) => ({
      ...prevState,
      number: value,
    }));
  };

  const handleCPChange = (e) => {
    const value = e.target.value;

    setDirectionData((prevState) => ({
      ...prevState,
      cp: value,
    }));
  };

  const handleDirectionChange = (selectedOption) => {
    setDirectionData((prevState) => ({
      ...prevState,
      address_type: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleReferenceChange = (e) => {
    const value = e.target.value;

    setDirectionData((prevState) => ({
      ...prevState,
      reference: value,
    }));
  };

  const fetchDirections = async () => {
    try {
      setLoading((prevState) => ({
        ...prevState,
        get_direction: true,
      }));

      const response = await api.get("/directions/");

      if (response.status === 200) {
        setDirections(response.data);
      }
    } catch (error) {
      const value = error.response.data.message;

      setErrorMessage((prevState) => ({
        ...prevState,
        get_direction: value,
      }));
    } finally {
      setLoading((prevState) => ({
        ...prevState,
        get_direction: false,
      }));
    }
  };

  const addDirection = async (e) => {
    try {
      e.preventDefault();
      setLoading((prevState) => ({
        ...prevState,
        post_direction: true,
      }));

      if (directionData) {
        const response = await api.post("/directions/", directionData);
        console.log(response);

        const newDirection = response.data.data;
        if (response.status === 201) {
          setFormActive(false);
          setDirections((prevDirections) => [...prevDirections, newDirection]);

          toast.success(`${response.data.message}`, {
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
      }
    } catch (error) {
      toast.error(`${error.response.data.message}`, {
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
    } finally {
      setLoading((prevState) => ({
        ...prevState,
        post_direction: false,
      }));
    }
  };

  const deleteDirection = async (directionId) => {
    try {
      setLoading((prevState) => ({
        ...prevState,
        delete_direction: true,
      }));

      const response = await api.delete(`/directions/${directionId}`);
      if (response.status === 200) {
        toast.success(`${response.data.message}`, {
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
      setDirections((prevDirections) =>
        prevDirections.filter((d) => d.id !== directionId)
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading((prevState) => ({
        ...prevState,
        delete_direction: false,
      }));
    }
  };

  return (
    <div className="w-full flex flex-col justify-between mt-5 lg:mt-0 lg:px-4 lg:py-10 lg:glass-box relative">
      <section
        className={`relative ${formActive ? "min-h-[430px]" : "min-h-[250px]"}`}
      >
        <div
          className={`
                 w-full h-full
                transition-all duration-500 ease-in-out mx-2
                ${
                  formActive
                    ? "-translate-x-full opacity-0"
                    : "translate-x-0 opacity-100"
                }
              `}
        >
          <div className="relative w-full flex justify-start">
            {loading.get_direction ||
            loading.post_direction ||
            loading.delete_direction ? (
              <Loading />
            ) : errorMessage.get_direction ? (
              <p className="text-white first-letter:uppercase font-semibold text-sm text-center">
                {errorMessage.get_direction}
              </p>
            ) : (
              directions.length > 0 && (
                <div className="w-full">
                  {directions.map((direction, idx) => (
                    <div
                      key={direction.id || idx}
                      className="relative flex flex-col justify-between min-h-64"
                    >
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <p className="text-gray-400 text-lg font-light first-letter:uppercase mx-2">
                            {direction.address_type}
                          </p>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="size-5 text-green-400"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4 16.5v-13h-.25a.75.75 0 0 1 0-1.5h12.5a.75.75 0 0 1 0 1.5H16v13h.25a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75v-2.5a.75.75 0 0 0-.75-.75h-2.5a.75.75 0 0 0-.75.75v2.5a.75.75 0 0 1-.75.75h-3.5a.75.75 0 0 1 0-1.5H4Zm3-11a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM7.5 9a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1ZM11 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm.5 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>

                        <div className="text-white first-letter:uppercase mx-2 mt-2 font-semibold text-sm w-full">
                          <div className="flex items-center gap-2">
                            <p className="text-[#fce803]">Calle:</p>
                            <p>{direction.street}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="text-[#fce803]">Numero:</p>
                            <p>{direction.number}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="text-[#fce803]">Codigo postal:</p>
                            <p>{direction.cp}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {direction.reference !== "" && (
                              <div>
                                <p className="text-[#fce803]">Referencia:</p>
                                <p>{direction.reference}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="w-full">
                        <button
                          onClick={() => deleteDirection(direction.id)}
                          type="button"
                          className="btn-glass p-2 w-[50%] lg:w-[20%]"
                        >
                          {loading.delete_direction ? (
                            <Loading />
                          ) : (
                            <p>Eliminar</p>
                          )}
                        </button>

                        <hr className="w-full my-5 m-0 bg-white/10 border-0 h-px" />
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}

            {/*  BTN ADD DIRECTION */}
            <div className={`absolute top-0 right-2`}>
              <button
                className="bg-[#fce803] p-1 rounded-full"
                onClick={() => setFormActive(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* FORM ADD DIRECTIONS */}
        <div
          className={`
                absolute top-0 left-0 w-full h-full flex flex-col items-center justify-between
                transition-all duration-500 ease-in-out
                ${
                  formActive
                    ? "translate-x-0 opacity-100"
                    : "translate-x-full opacity-0"
                }
              `}
        >
          <form
            onSubmit={addDirection}
            className="w-[90%] h-full flex flex-col"
          >
            <div className="flex items-center gap-2 text-xs font-semibold mt-6 text-[#fce803]/90">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-4"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                  clipRule="evenodd"
                />
              </svg>
              <p>Recuerda, solo puedes agregar hasta 3 direcciones.</p>
            </div>

            <div className="flex items-center gap-10 mt-5">
              <div className="w-[30%]">
                <Select
                  required
                  placeholder="Direccion"
                  onChange={handleDirectionChange}
                  value={options.find(
                    (option) => option.value === directionData.direction
                  )}
                  options={options}
                  styles={customStyles}
                />
              </div>

              <div className="w-[60%] lg:w-[30%] h-full">
                <input
                  required
                  onChange={handleCPChange}
                  value={directionData.cp}
                  placeholder="Codigo postal"
                  type="number"
                  className="bg-transparent h-full placeholder:text-xs text-white placeholder:text-white/65 border-b border-white/25 focus:outline-none focus:border-[#fce803] py-2"
                />
              </div>
            </div>

            <div className="flex items-center gap-10 mt-5">
              <input
                required
                onChange={handleStreetChange}
                value={directionData.street}
                placeholder="Calle"
                type="text"
                className="bg-transparent placeholder:text-xs text-white placeholder:text-white/65 border-b border-white/25 focus:outline-none focus:border-[#fce803] w-[60%] lg:w-[40%] py-2"
              />

              <input
                required
                onChange={handleNumberChange}
                value={directionData.number}
                placeholder="Numero"
                type="number"
                className="bg-transparent placeholder:text-xs text-white placeholder:text-white/65 border-b border-white/25 focus:outline-none focus:border-[#fce803] w-[60%] lg:w-[25%] py-2"
              />
            </div>

            <div className="flex items-end mt-5">
              <textarea
                onChange={handleReferenceChange}
                value={directionData.reference}
                className="bg-transparent resize-none h-36 placeholder:text-sm text-white placeholder:text-white/65 border-b border-white/25 focus:outline-none focus:border-[#fce803] py-2 w-[80%]"
                placeholder="Referencia:  barrio, dpto, piso, manzana, etc."
              />
            </div>

            <button
              type="submit"
              className="btn-glass p-2 mt-10 w-[50%] lg:w-[20%]"
            >
              {loading.post_direction ? <Loading /> : <p>ACtualizar</p>}
            </button>
          </form>
        </div>
      </section>
      <section className="yellow-glow absolute w-[40%] h-[30%] right-[55%] bottom-0"></section>
    </div>
  );
};

export default DirectionsProfiles;
