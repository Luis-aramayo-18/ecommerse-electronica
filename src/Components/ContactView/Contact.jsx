import React from "react";

const Contact = () => {
  return (
    <section className="flex flex-col justify-center items-center h-screen">
      <h2 className="mb-8">DEJANOS TU CONSULTA !</h2>
      <div className="mx-40 flex justify-center">
        <div className="flex justify-center items-center border w-3/4"> 
          <div className="w-3/5 p-4">
            <form action="">
              <div className="flex flex-col">
                <label htmlFor="name">Full Name</label>
                <input
                  className="bg-transparent border-b border-red-500 focus:outline-none focus:border-blue-500 px-2 py-2 w-full"
                  type="text"
                  id="name"
                  name="name"
                />
              </div>
              <div className="flex flex-col mt-5">
                <label htmlFor="email">Email</label>
                <input
                  className="bg-transparent border-b border-red-500 focus:outline-none focus:border-blue-500 px-2 py-2 w-full"
                  type="email"
                  id="email"
                  name="email"
                />
              </div>
              <div className="flex flex-col mt-5">
                <label htmlFor="message">Message:</label>
                <textarea
                  className="bg-transparent border-b border-red-500 focus:outline-none focus:border-blue-500 px-2 py-2 w-full"
                  id="message"
                  name="message"
                />
              </div>
              <button className="mt-4 p-3 w-full border" type="submit">Submit</button>
            </form>
          </div>

          <div className="w-3/5 bg-stone-950 h-full p-4">
            <h2>INFO</h2>
            <ul className="mt-4">
              <li className="flex items-center gap-2">
                <i className="bx bxs-map"></i>
                <p>Calle de mentira</p>
              </li>
              <li className="flex items-center gap-2">
                <i className="bx bxl-whatsapp"></i>
                <p>3815735255</p>
              </li>
              <li className="flex items-center gap-2">
                <i className="bx bx-envelope"></i>
                <p>lalalasd@gmail.com</p>
              </li>
            </ul>
            <p className="mt-3">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam
              quibusdam quod reprehenderit at obcaecati?
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
