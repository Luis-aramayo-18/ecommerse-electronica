import React from "react";

const Contact = () => {
  return (
    <section className="flex justify-center">
      <div className="flex border w-[45%] mt-20 text-white shadow-md shadow-slate-500">
        <div className="w-[80%] p-4">
          <form action="">
            <div className="flex flex-col">
              <input
                className="bg-transparent placeholder:text-xs text-white placeholder:text-[#deecfb] border-b border-[#FF3131] focus:outline-none focus:border-blue-500 px-2 py-2 w-full"
                placeholder="Nombre completo"
                type="text"
              />
            </div>
            <div className="flex flex-col mt-5">
              <input
                className="bg-transparent placeholder:text-xs text-white placeholder:text-[#deecfb] border-b border-[#FF3131] focus:outline-none focus:border-blue-500 px-2 py-2 w-full"
                placeholder="Correo electrónico"
                type="email"
              />
            </div>
            <div className="flex flex-col mt-5">
              <textarea
                className="bg-transparent resize-none h-36 placeholder:text-xs text-white placeholder:text-[#deecfb] border-b border-[#FF3131] focus:outline-none focus:border-blue-500 px-2 py-2 w-full"
                placeholder="mensaje"
              />
            </div>
            <button className="mt-4 p-3 w-full border" type="submit">
              Submit
            </button>
          </form>
        </div>

        <div className="w-3/5 bg-stone-950 h-full p-4">
          <ul className="mt-4">
            <li className="flex items-center gap-2">
              <i className="bx bxs-map"></i>
              <p className="text-xs text-gray-300">Calle de mentira</p>
            </li>
            <li className="flex items-center gap-2 mt-5">
              <i className="bx bxl-whatsapp"></i>
              <p className="text-xs text-gray-300">3815735255</p>
            </li>
            <li className="flex items-center gap-2 mt-5">
              <i className="bx bx-envelope"></i>
              <p className="text-xs text-gray-300">lalalasd@gmail.com</p>
            </li>
          </ul>
          <p className="mt-3 text-sm font-light text-gray-e00">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam
            quibusdam quod reprehenderit at obcaecati?
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
