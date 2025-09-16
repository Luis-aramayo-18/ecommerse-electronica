import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAxios } from "../../Hooks/useAxios";

const Brands = () => {
  const categoriesToSearch = [
    "Hp",
    "sony",
    "samsung",
    "iphone",
    "dell",
    "xiaomi",
    "motorola",
    "xbox",
  ];
  const api = useAxios();
  const namesString = categoriesToSearch.join(",");

  const [brandsOptions, setbrandsOptions] = useState({});

  useEffect(() => {
    getCategoryLink();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCategoryLink = async () => {
    try {
      const response = await api.get(
        `/categories/search-by-brands/?brands=${namesString}`
      );

      if (response.status === 200) {
        const categoriesData = response.data;
        setbrandsOptions(categoriesData);
      }
    } catch (error) {
    } finally {
    }
  };

  return (
    <section className="glass-box mt-10 mx-3 sm:mx-6 md:mx-14 lg:mx-24 py-10 px-5">
      <div className="flex flex-col justify-center z-20">
        <div className="flex justify-start items-center gap-1 uppercase tracking-widest text-2xl font-semibold text-white sm:ms-5">
          <h2>Las mejores marcas</h2>
        </div>

        <div className="gap-8 grid grid-rows-3 lg:grid-rows-2 grid-cols-2 sm:grid-cols-6 md:grid-cols-6 lg:grid-cols-4 place-items-center mt-10 ">
          <div className="card-container relative w-36 h-36 sm:w-52 sm:h-52 sm:col-[1/3] sm:row-[1/2] lg:col-[1/2] lg:row-[1/2]">
            <div className="card-inner relative w-full h-full transition-transform duration-700 ease-in-out text-center">
              <div className="card-face card-front absolute w-full h-full rounded-full backdrop-blur-md bg-[#fce803] border-2 border-black flex justify-center items-center">
                <img
                  className="h-28 w-28 sm:w-36 sm:h-36 object-contain"
                  src="./img/home/dell.webp"
                  alt="Dell logo"
                />
              </div>

              <div className="card-face card-back absolute w-full h-full rounded-full backdrop-blur-md bg-black/80 border-2 border-white/25 flex justify-center items-center">
                {brandsOptions.Dell ? (
                  <ul className="list-none p-0 text-white max-h-36 overflow-y-auto">
                    {brandsOptions.Dell.map((option) => (
                      <li
                        key={option.id}
                        className="p-2 text-sm font-semibold transition-all duration-100 hover:text-[#fce803]"
                      >
                        <Link to={`/products/category/${option.id}?brand=Dell`}>
                          {option.name}
                        </Link>
                      </li>
                    ))}

                    {brandsOptions.Dell.length > 1 && (
                      <li className="p-2 text-sm font-semibold transition-all duration-100 hover:text-[#fce803]">
                        <Link to={`/products/category/null?brand=Dell`}>
                          Ver todos
                        </Link>
                      </li>
                    )}
                  </ul>
                ) : (
                  <div className="p-2 text-sm text-white font-semibold transition-all duration-100 hover:text-[#fce803]">
                    <p>No hay opciones disponibles</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="card-container relative w-36 h-36 sm:w-52 sm:h-52 sm:col-[3/5] sm:row-[1/2] lg:col-[2/3] lg:row-[1/2]">
            <div className="card-inner relative w-full h-full transition-transform duration-700 ease-in-out text-center">
              <div className="card-face card-front absolute w-full h-full rounded-full backdrop-blur-md bg-[#fce803] border-2 border-black flex justify-center items-center">
                <img
                  className="h-28 w-28 sm:w-36 sm:h-36 object-contain"
                  src="./img/home/sony.webp"
                  alt="Dell logo"
                />
              </div>

              <div className="card-face card-back absolute w-full h-full rounded-full backdrop-blur-md bg-black/40 border border-white/25 flex justify-center items-center">
                {brandsOptions.Sony ? (
                  <ul className="list-none p-0 text-white max-h-36 overflow-y-auto">
                    {brandsOptions.Sony.map((option) => (
                      <li
                        key={option.id}
                        className="p-2 text-sm font-semibold transition-all duration-100 hover:text-[#fce803]"
                      >
                        <Link to={`/products/category/${option.id}?brand=Sony`}>
                          {option.name}
                        </Link>
                      </li>
                    ))}

                    {brandsOptions.Sony.length > 1 && (
                      <li className="p-2 text-sm font-semibold transition-all duration-100 hover:text-[#fce803]">
                        <Link to={`/products/category/null?brand=Sony`}>
                          Ver todos
                        </Link>
                      </li>
                    )}
                  </ul>
                ) : (
                  <div className="p-2 text-sm text-white font-semibold transition-all duration-100 hover:text-[#fce803]">
                    <p>No hay opciones disponibles</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="card-container relative w-36 h-36 sm:w-52 sm:h-52 sm:col-[5/7] sm:row-[1/2] lg:col-[3/4] lg:row-[1/2]">
            <div className="card-inner relative w-full h-full transition-transform duration-700 ease-in-out text-center">
              <div className="card-face card-front absolute w-full h-full rounded-full backdrop-blur-md bg-[#fce803] border-2 border-black flex justify-center items-center">
                <img
                  className="h-28 w-28 sm:w-36 sm:h-36 object-contain"
                  src="./img/home/motorola.webp"
                  alt="Dell logo"
                />
              </div>

              <div className="card-face card-back absolute w-full h-full rounded-full backdrop-blur-md bg-black/40 border border-white/25 flex justify-center items-center">
                {brandsOptions.Motorola ? (
                  <ul className="list-none p-0 text-white max-h-36 overflow-y-auto">
                    {brandsOptions.Motorola.map((option) => (
                      <li
                        key={option.id}
                        className="p-2 text-sm font-semibold transition-all duration-100 hover:text-[#fce803]"
                      >
                        <Link
                          to={`/products/category/${option.id}?brand=Motorola`}
                        >
                          {option.name}
                        </Link>
                      </li>
                    ))}

                    {brandsOptions.Motorola.length > 1 && (
                      <li className="p-2 text-sm font-semibold transition-all duration-100 hover:text-[#fce803]">
                        <Link to={`/products/category/null?brand=Motorola`}>
                          Ver todos
                        </Link>
                      </li>
                    )}
                  </ul>
                ) : (
                  <div className="p-2 text-sm text-white font-semibold transition-all duration-100 hover:text-[#fce803]">
                    <p>No hay opciones disponibles</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="card-container relative w-36 h-36 sm:w-52 sm:h-52 sm:col-[2/4] sm:row-[2/3] lg:col-[4/5] lg:row-[1/2]">
            <div className="card-inner relative w-full h-full transition-transform duration-700 ease-in-out text-center">
              <div className="card-face card-front absolute w-full h-full rounded-full backdrop-blur-md bg-[#fce803] border-2 border-black flex justify-center items-center">
                <img
                  className="h-28 w-28 sm:w-36 sm:h-36 object-contain"
                  src="./img/home/hp.webp"
                  alt="Dell logo"
                />
              </div>

              <div className="card-face card-back absolute w-full h-full rounded-full backdrop-blur-md bg-black/40 border border-white/25 flex justify-center items-center">
                {brandsOptions.Hp ? (
                  <ul className="list-none p-0 text-white max-h-36 overflow-y-auto">
                    {brandsOptions.Hp.map((option) => (
                      <li
                        key={option.id}
                        className="p-2 text-sm font-semibold transition-all duration-100 hover:text-[#fce803]"
                      >
                        <Link to={`/products/category/${option.id}?brand=Hp`}>
                          {option.name}
                        </Link>
                      </li>
                    ))}

                    {brandsOptions.Hp.length > 1 && (
                      <li className="p-2 text-sm font-semibold transition-all duration-100 hover:text-[#fce803]">
                        <Link to={`/products/category/null?brand=Hp`}>
                          Ver todos
                        </Link>
                      </li>
                    )}
                  </ul>
                ) : (
                  <div className="p-2 text-sm text-white font-semibold transition-all duration-100 hover:text-[#fce803]">
                    <p>No hay opciones disponibles</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="card-container relative w-36 h-36 sm:w-52 sm:h-52 sm:col-[4/6] sm:row-[2/3] lg:col-[2/3] lg:row-[2/3]">
            <div className="card-inner relative w-full h-full transition-transform duration-700 ease-in-out text-center">
              <div className="card-face card-front absolute w-full h-full rounded-full backdrop-blur-md bg-[#fce803] border-2 border-black flex justify-center items-center">
                <img
                  className="h-28 w-28 sm:w-36 sm:h-36 object-contain"
                  src="./img/home/samsung.webp"
                  alt="Dell logo"
                />
              </div>

              <div className="card-face card-back absolute w-full h-full rounded-full backdrop-blur-md bg-black/40 border border-white/25 flex justify-center items-center">
                {brandsOptions.Samsung ? (
                  <ul className="list-none p-0 text-white max-h-36 overflow-y-auto">
                    {brandsOptions.Samsung.map((option) => (
                      <li
                        key={option.id}
                        className="p-2 text-sm font-semibold transition-all duration-100 hover:text-[#fce803]"
                      >
                        <Link
                          to={`/products/category/${option.id}?brand=Samsung`}
                        >
                          {option.name}
                        </Link>
                      </li>
                    ))}

                    {brandsOptions.Samsung.length > 1 && (
                      <li className="p-2 text-sm font-semibold transition-all duration-100 hover:text-[#fce803]">
                        <Link to={`/products/category/null?brand=Samsung`}>
                          Ver todos
                        </Link>
                      </li>
                    )}
                  </ul>
                ) : (
                  <div className="p-2 text-sm text-white font-semibold transition-all duration-100 hover:text-[#fce803]">
                    <p>No hay opciones disponibles</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="card-container relative w-36 h-36 sm:w-52 sm:h-52 sm:col-[3/5] sm:row-[3/4] lg:col-[3/4] lg:row-[2/3]">
            <div className="card-inner relative w-full h-full transition-transform duration-700 ease-in-out text-center">
              <div className="card-face card-front absolute w-full h-full rounded-full backdrop-blur-md bg-[#fce803] border-2 border-black flex justify-center items-center">
                <img
                  className="h-28 w-28 sm:w-36 sm:h-36 object-contain"
                  src="./img/home/iphone.webp"
                  alt="Dell logo"
                />
              </div>

              <div className="card-face card-back absolute w-full h-full rounded-full backdrop-blur-md bg-black/40 border border-white/25 flex justify-center items-center">
                {brandsOptions.Iphone ? (
                  <ul className="list-none p-0 text-white max-h-36 overflow-y-auto">
                    {brandsOptions.Iphone.map((option) => (
                      <li
                        key={option.id}
                        className="p-2 text-sm font-semibold transition-all duration-100 hover:text-[#fce803]"
                      >
                        <Link
                          to={`/products/category/${option.id}?brand=Iphone`}
                        >
                          {option.name}
                        </Link>
                      </li>
                    ))}

                    {brandsOptions.Iphone.length > 1 && (
                      <li className="p-2 text-sm font-semibold transition-all duration-100 hover:text-[#fce803]">
                        <Link to={`/products/category/null?brand=Iphone`}>
                          Ver todos
                        </Link>
                      </li>
                    )}
                  </ul>
                ) : (
                  <div className="p-2 text-sm text-white font-semibold transition-all duration-100 hover:text-[#fce803]">
                    <p>No hay opciones disponibles</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="card-container relative w-36 h-36 sm:w-52 sm:h-52 sm:col-[5/7] sm:row-[3/4] lg:col-[4/5] lg:row-[2/3]">
            <div className="card-inner relative w-full h-full transition-transform duration-700 ease-in-out text-center">
              <div className="card-face card-front absolute w-full h-full rounded-full backdrop-blur-md bg-[#fce803] border-2 border-black flex justify-center items-center">
                <img
                  className="h-28 w-28 sm:w-32 sm:h-32 object-contain"
                  src="./img/home/xiaomi.webp"
                  alt="Dell logo"
                />
              </div>

              <div className="card-face card-back absolute w-full h-full rounded-full backdrop-blur-md bg-black/40 border border-white/25 flex justify-center items-center">
                {brandsOptions.Xiaomi ? (
                  <ul className="list-none p-0 text-white max-h-36 overflow-y-auto">
                    {brandsOptions.Xiaomi.map((option) => (
                      <li
                        key={option.id}
                        className="p-2 text-sm font-semibold transition-all duration-100 hover:text-[#fce803]"
                      >
                        <Link
                          to={`/products/category/${option.id}?brand=Xiaomi`}
                        >
                          {option.name}
                        </Link>
                      </li>
                    ))}

                    {brandsOptions.Xiaomi.length > 1 && (
                      <li className="p-2 text-sm font-semibold transition-all duration-100 hover:text-[#fce803]">
                        <Link to={`/products/category/null?brand=Xiaomi`}>
                          Ver todos
                        </Link>
                      </li>
                    )}
                  </ul>
                ) : (
                  <div className="p-2 text-sm text-white font-semibold transition-all duration-100 hover:text-[#fce803]">
                    <p>No hay opciones disponibles</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="card-container relative w-36 h-36 sm:w-52 sm:h-52 sm:col-[5/7] sm:row-[3/4] lg:col-[1/2] lg:row-[2/3]">
            <div className="card-inner relative w-full h-full transition-transform duration-700 ease-in-out text-center">
              <div className="card-face card-front absolute w-full h-full rounded-full backdrop-blur-md bg-[#fce803] border-2 border-black flex justify-center items-center">
                <img
                  className="h-28 w-28 sm:w-36 sm:h-36 object-contain"
                  src="./img/home/xbox.webp"
                  alt="Dell logo"
                />
              </div>

              <div className="card-face card-back absolute w-full h-full rounded-full backdrop-blur-md bg-black/40 border border-white/25 flex justify-center items-center">
                {brandsOptions.Xbox ? (
                  <ul className="list-none p-0 text-white max-h-36 overflow-y-auto">
                    {brandsOptions.Xbox.map((option) => (
                      <li
                        key={option.id}
                        className="p-2 text-sm font-semibold transition-all duration-100 hover:text-[#fce803]"
                      >
                        <Link to={`/products/category/${option.id}?brand=Xbox`}>
                          {option.name}
                        </Link>
                      </li>
                    ))}

                    {brandsOptions.Xbox.length > 1 && (
                      <li className="p-2 text-sm font-semibold transition-all duration-100 hover:text-[#fce803]">
                        <Link to={`/products/category/null?brand=Xbox`}>
                          Ver todos
                        </Link>
                      </li>
                    )}
                  </ul>
                ) : (
                  <div className="p-2 text-sm text-white font-semibold transition-all duration-100 hover:text-[#fce803]">
                    <p>No hay opciones disponibles</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="yellow-glow absolute w-[50%] h-[50%] bottom-[-5%] left-[30%]"></div>
    </section>
  );
};

export default Brands;
