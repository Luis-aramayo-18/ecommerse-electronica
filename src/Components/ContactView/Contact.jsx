import React from "react";

const Contact = () => {
  return (
    <section className="flex justify-center">
      <div className="glass-box overflow-hidden relative flex flex-col sm:flex-row w-[90%] sm:w-[75%] md:w-[70%] lg:w-[55%] xl:w-[50%] my-20">
        <div className="w-full sm:w-[60%] px-4 py-8">
          <form action="">
            <div className="flex flex-col">
              <input
                className="bg-transparent placeholder:text-xs text-white placeholder:text-white/65 border-b border-white/25 focus:outline-none focus:border-[#fce803] px-2 py-2 w-full"
                placeholder="Nombre completo"
                type="text"
              />
            </div>

            <div className="flex flex-col mt-5">
              <input
                className="bg-transparent placeholder:text-xs text-white placeholder:text-white/65 border-b border-white/25 focus:outline-none focus:border-[#fce803] px-2 py-2 w-full"
                placeholder="Correo electrónico"
                type="email"
              />
            </div>

            <div className="flex flex-col mt-5">
              <textarea
                className="bg-transparent resize-none h-44 placeholder:text-xs text-white placeholder:text-white/65 border-b border-white/25 focus:outline-none focus:border-[#fce803] px-2 py-2 w-full"
                placeholder="Mensaje"
              />
            </div>

            <button
              className="mt-6 p-4 rounded-lg border uppercase text-sm font-semibold w-[100%] bg-[#fce803] text-black border-black/25 lg:bg-black/30 lg:text-white lg:border-white/25 lg:transition-all lg:duration-100 lg:hover:bg-[#fce803] lg:hover:text-black lg:hover:border-black/25"
              type="submit"
            >
              Enviar
            </button>
          </form>
        </div>

        <div className="w-full sm:w-[40%] bg-[#fce803] h-full px-4 py-8">
          <h2 className="text-black text-sm font-bold uppercase ms-1">
            digital world
          </h2>

          <ul className="mt-4">
            <li className="flex items-start gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                  clipRule="evenodd"
                />
              </svg>

              <p className="text-xs text-black/65">
                Tech Innovation Hub – Suite 804 <br /> 88 Silicon Avenue <br />
                San Francisco, CA 94107 United States
              </p>
            </li>

            <li className="flex items-center gap-2 mt-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-5"
              >
                <path d="M8 16.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z" />
                <path
                  fillRule="evenodd"
                  d="M4 4a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4Zm4-1.5v.75c0 .414.336.75.75.75h2.5a.75.75 0 0 0 .75-.75V2.5h1A1.5 1.5 0 0 1 14.5 4v12a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 16V4A1.5 1.5 0 0 1 7 2.5h1Z"
                  clipRule="evenodd"
                />
              </svg>

              <p className="text-xs text-black/65">
                +1 (415) 555-9284
              </p>
            </li>

            <li className="flex items-center gap-2 mt-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-5"
              >
                <path
                  fillRule="evenodd"
                  d="M5.404 14.596A6.5 6.5 0 1 1 16.5 10a1.25 1.25 0 0 1-2.5 0 4 4 0 1 0-.571 2.06A2.75 2.75 0 0 0 18 10a8 8 0 1 0-2.343 5.657.75.75 0 0 0-1.06-1.06 6.5 6.5 0 0 1-9.193 0ZM10 7.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z"
                  clipRule="evenodd"
                />
              </svg>

              <p className="text-xs text-black/65">
                contact@digitalworld.tech
              </p>
            </li>
          </ul>
        </div>

        <div className="yellow-glow absolute top-0 right-0 h-full w-[40%]"></div>
      </div>
    </section>
  );
};

export default Contact;
