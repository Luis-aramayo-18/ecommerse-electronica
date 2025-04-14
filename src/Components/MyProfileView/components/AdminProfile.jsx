import React, { useEffect, useRef, useState } from "react";

import { useAxios } from "../../Hooks/useAxios";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Bounce, toast } from "react-toastify";
import Loading from "../../Loading";
import Select from "react-select";
import { debounce } from "lodash";
import axios from "axios";

const AdminProfile = () => {
  const api = useAxios();
  const productSection = useRef(null);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [productUpdate, setProductUpdate] = useState(null);
  const [searchProduct, setSearchProduct] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [categories, setCategories] = useState([""]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);

  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [newBrand, setNewBrand] = useState("");
  const [showNewBrandInput, setShowNewBrandInput] = useState(false);

  const [image, setImage] = useState([]);

  const [price, setPrice] = useState("");
  const [isOnSale, setIsOnSale] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState("");

  const [formEdit, setFormEdit] = useState(false);
  const [loading, setLoading] = useState({
    post: false,
    search: false,
    get: false,
    update: false,
    delete: false,
    seeMore: false,
  });

  const fileInputRef = useRef(null);

  const [nextPage, setNextPage] = useState(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchBrands();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (products.length < 10) {
      setFilteredProducts(products);
    }
  }, [products]);

  const fetchProducts = async () => {
    try {
      setLoading((prev) => ({ ...prev, get: true }));
      const response = await api.get("/products/");

      if (response.status === 200) {
        setProducts(response.data.results);
        setFilteredProducts(response.data.results);
      }

      if (response.data.next) {
        const nextUrl = response.data.next;

        if (nextUrl) {
          const urlObj = new URL(nextUrl);

          let relativeUrl = urlObj.pathname + urlObj.search;

          if (relativeUrl.startsWith("/api/")) {
            relativeUrl = relativeUrl.replace("/api", "");

            setNextPage(relativeUrl);
          }
        }
      } else {
        setNextPage(null);
      }
    } catch (error) {
      console.error("Error al cargar productos:", error);
    } finally {
      setLoading((prev) => ({ ...prev, get: false }));
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories/");
      if (response.status === 200) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error("Error al cargar categorías:", error);
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await api.get("/brands/");
      if (response.status === 200) {
        setBrands(response.data);
      }
    } catch (error) {
      console.error("Error al cargar marcas:", error);
    }
  };

  const handleCategoryChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedCategory(selectedValue);

    if (selectedValue === "new-category") {
      setShowNewCategoryInput(true);
    } else {
      setShowNewCategoryInput(false);
    }
  };

  const addNewCategory = async () => {
    setLoading(true);
    try {
      const newCategoryData = { name: newCategory };
      const response = await api.post("/categories/", newCategoryData);

      if (response.status === 201) {
        setShowNewCategoryInput(false);
        setNewCategory("");
        setSelectedCategory("");

        const updatedCategories = await api.get("/categories/");
        setCategories(updatedCategories.data);

        toast.success("Categoría agregada", {
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
      }
    } catch (error) {
      console.error("Error al agregar nueva categoría:", error);
    }
  };

  const handleBrandChange = (e) => {
    const value = e.target.value;
    if (value === "new-brand") {
      setShowNewBrandInput(true);
    } else {
      setShowNewBrandInput(false);
      setSelectedBrand(value);
    }
  };

  const addNewBrand = async () => {
    try {
      const newBrandData = { name: newBrand };
      const response = await api.post("/brands/", newBrandData);

      if (response.status === 201) {
        setShowNewBrandInput(false);
        setNewBrand("");
        setSelectedBrand("");

        const updateBrands = await api.get("/brands/");

        setBrands(updateBrands.data);

        toast.success("Marca agregada", {
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
      } else {
        toast.error("Ocurrió un problema, inténtelo de nuevo", {
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
      }
    } catch (error) {
      console.error("Error al agregar nueva marca:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading((prev) => ({ ...prev, post: true }));
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", selectedCategory);
    formData.append("brand", selectedBrand);
    formData.append("is_on_sale", isOnSale);
    if (isOnSale) {
      formData.append("discount_percentage", discountPercentage);
    }

    if (Array.isArray(image)) {
      image.forEach((img) => {
        formData.append("images", img);
      });
    }

    try {
      const response = await api.post("/products/", formData);

      if (response.status === 201) {
        toast.success("producto añadido a la lista", {
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

        setProducts((prevProducts) => [...prevProducts, response.data]);
        setName("");
        setDescription("");
        setPrice("");
        setSelectedCategory("");
        setSelectedBrand("");
        setImage([]);
        setDiscountPercentage("");
        setIsOnSale(false);
        fileInputRef.current.value = "";
        productSection.current?.scrollIntoView({ behavior: "smooth" });
      }
    } catch (err) {
      const error = err.response.data;
      console.log(err);

      toast.error(error, {
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
      setLoading((prev) => ({ ...prev, post: false }));
    }
  };

  const handleUpdate = async () => {
    try {
      setLoading((prev) => ({ ...prev, update: true }));
      const updateProductData = {
        name: name,
        description: description,
        price: price,
        category: selectedCategory,
        brand: selectedBrand,
        image: image,
      };
      const response = await api.put(
        `/products/${productUpdate.id}/`,
        updateProductData
      );
      if (response.status === 200) {
        toast.success("producto actualizado", {
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

        const productsUpdate = await api.get("/products/");
        setProducts(productsUpdate);
        setProductUpdate(null);
        setFormEdit(false);

        setName("");
        setDescription("");
        setPrice("");
        setSelectedCategory("");
        setSelectedBrand("");
        setImage([]);
        fileInputRef.current.value = "";
      } else {
        console.log("hubo un problema");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading((prev) => ({ ...prev, update: false }));
    }
  };

  const handleEdit = (product) => {
    setProductUpdate(product);
    setFormEdit(true);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setSelectedCategory(product.category);
    setSelectedBrand(product.brand);
    setImage(product.images);
    setIsOnSale(product.is_on_sale);
    setDiscountPercentage(product.discount_percentage);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (productID) => {
    try {
      setLoading((prev) => ({ ...prev, delete: true }));
      const response = await api.delete(`/products/${productID}/`);

      if (response.status === 204) {
        toast.success("producto eliminado", {
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

        setProducts(products.filter((product) => product.id !== productID));
        setName("");
        setDescription("");
        setPrice("");
        setSelectedCategory("");
        setSelectedBrand("");
        setImage([]);
        fileInputRef.current.value = "";
      } else {
        console.log("Ocurrió un problema al eliminar el producto");
      }
    } catch (error) {
      console.log("Error al eliminar el producto:", error);
    } finally {
      setLoading((prev) => ({ ...prev, delete: false }));
    }
  };

  const loadProducts = async () => {
    if (nextPage === null) {
      return;
    }

    try {
      setLoading((prev) => ({ ...prev, seeMore: true }));

      const response = await api.get(nextPage);

      if (response.status === 200) {
        const updatesProducts = response.data.results;

        if (updatesProducts.length > 0) {
          setProducts((prevProducts) => [
            ...prevProducts,
            ...updatesProducts.filter(
              (p) => !prevProducts.some((prev) => prev.id === p.id)
            ),
          ]);
          setFilteredProducts((prevProducts) => [
            ...prevProducts,
            ...updatesProducts.filter(
              (p) => !prevProducts.some((prev) => prev.id === p.id)
            ),
          ]);

          const nextUrl = response.data.next;

          if (nextUrl) {
            const urlObj = new URL(nextUrl);

            let relativeUrl = urlObj.pathname + urlObj.search;

            if (relativeUrl.startsWith("/api/")) {
              relativeUrl = relativeUrl.replace("/api", "");

              setNextPage(relativeUrl);
            }
          } else {
            setNextPage(null);
          }
        }
      }
    } catch (err) {
      console.error("Error al cargar productos:", err);
    } finally {
      setLoading((prev) => ({ ...prev, seeMore: false }));
    }
  };

  const handleOpenModal = (product) => {
    if (window.innerWidth < 1024) {
      setSelectedProduct(product);
    }
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleDeletePhoto = async (id) => {
    try {
      const response = await api.delete(`/products/images/${id}/`);
      console.log(response);

      if (response.status === 204) {
        const updatedImages = image.filter((img) => img.id !== id);
        setImage(updatedImages);

        toast.success("Imagen eliminada", {
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
      }
    } catch (error) {
      console.error("Error al eliminar la imagen:", error);
    }
  };

  const fetchSuggestions = async (searchProduct) => {
    try {
      setLoading((prev) => ({ ...prev, search: true }));
      const response = await api.get(
        `/products/search/?search=${searchProduct}`
      );

      if (response.status === 200) {
        const suggestions = response.data.products;
        setSuggestions(suggestions);

        if (response.data.next) {
          const nextUrl = response.data.next;

          if (nextUrl) {
            const urlObj = new URL(nextUrl);

            let relativeUrl = urlObj.pathname + urlObj.search;

            if (relativeUrl.startsWith("/api/")) {
              relativeUrl = relativeUrl.replace("/api", "");

              setNextPage(relativeUrl);
            }
          }
        } else {
          setNextPage(null);
        }
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Previous request canceled:", error.message);
      } else {
        console.error("Error fetching suggestions:", error);
      }
    } finally {
      setLoading((prev) => ({ ...prev, search: false }));
    }
  };

  const debouncedFetch = debounce(fetchSuggestions, 1000);

  useEffect(() => {
    if (suggestions.length > 0) {
      setFilteredProducts(suggestions);
    } else {
      setFilteredProducts(products);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [suggestions]);

  useEffect(() => {
    if (searchProduct.trim() !== "") {
      debouncedFetch(searchProduct);
    } else {
    }

    return () => {
      debouncedFetch.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchProduct]);

  const handleSearchProduct = (e) => {
    const query = e.target.value;
    setSearchProduct(query);
  };

  const deleteSuggestions = () => {
    setSearchProduct("");
    setSuggestions([]);
    fetchProducts();
  };

  return (
    <div>
      <section className="lg:bg-black/70 lg:backdrop-blur-md lg:rounded-2xl lg:px-4 lg:py-10 lg:shadow-[0_4px_10px_0_#6B7280]">
        {/* --------CARGAR PRODUCTO---------- */}
        <section>
          <ul className="flex gap-10 text-sm mt-5 font-semibold">
            <li className="cursor-pointer text-white">Cargar producto</li>
            <li className="cursor-pointer text-white transition-all duration-100 lg:text-gray-400 lg:hover:text-white">
              Cargar Usuario
            </li>
          </ul>
        </section>

        <section className="flex flex-col-reverse lg:flex-row">
          <section className="w-full lg:w-[48%] mt-10">
            <h2 className=" text-gray-100 text-sm font-medium">
              AGREGAR PRODUCTO
            </h2>

            <form className="flex flex-col gap-4 mt-5" onSubmit={handleSubmit}>
              <label>
                <input
                  required
                  placeholder="Nombre"
                  type="text"
                  className="px-4 py-3 w-full bg-black/70 backdrop-blur text-white rounded-2xl lg:focus:outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>

              <label>
                <input
                  required
                  placeholder="Precio"
                  type="number"
                  className="px-4 py-3 w-full lg:focus:outline-none bg-black/70 backdrop-blur text-white rounded-2xl"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </label>

              <textarea
                name=""
                id=""
                placeholder="Descripción"
                className="p-4 w-full lg:focus:outline-none h-64 resize-none bg-black/70 backdrop-blur text-white rounded-2xl"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>

              <div className="flex justify-center gap-4">
                <div className="w-full">
                  <select
                    required
                    className="p-4 text-sm lg:focus:outline-none font-semibold w-full rounded-2xl bg-black/70 backdrop-blur text-white"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                  >
                    <option value="" disabled>
                      categoria
                    </option>
                    <option value="new-category">NUEVA CATEGORÍA</option>
                    {categories.map((category, idx) => (
                      <option key={category.id || idx} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>

                  {showNewCategoryInput && (
                    <div className="flex flex-col mt-4">
                      <input
                        type="text"
                        className="p-2"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="Nueva categoría"
                      />

                      <button
                        type="button"
                        className="border mt-4 p-2"
                        onClick={addNewCategory}
                      >
                        Agregar Categoría
                      </button>
                    </div>
                  )}
                </div>

                <div className="w-full">
                  <Select
                    options={[
                      { value: "new-brand", label: "nueva marca" },
                      ...brands.map((brand) => ({
                        value: brand.id,
                        label: brand.name,
                      })),
                    ]}
                    onChange={(selectedOption) =>
                      handleBrandChange(selectedOption.value)
                    }
                    placeholder="marca"
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        padding: "1rem",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        width: "100%",
                        borderRadius: "1rem",
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        backdropFilter: "blur(10px)",
                        color: "white",
                      }),
                      menu: (provided) => ({
                        ...provided,
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        maxHeight: 200,
                        overflowY: "auto",
                        borderRadius: "1rem",
                      }),
                      option: (provided, state) => ({
                        ...provided,
                        padding: "0.75rem 1rem",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        borderRadius: "0.75rem",
                        backgroundColor: state.isSelected
                          ? "rgba(0, 0, 0, 0.8)"
                          : "transparent",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "transparent",
                          color: "orange",
                        },
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }),
                    }}
                  />

                  {showNewBrandInput && (
                    <div className="flex flex-col mt-4">
                      <input
                        type="text"
                        className="p-2"
                        value={newBrand}
                        onChange={(e) => setNewBrand(e.target.value)}
                        placeholder="Nueva Marca"
                      />

                      <button
                        type="button"
                        className="border mt-4 p-2"
                        onClick={addNewBrand}
                      >
                        Agregar Marca
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <label className="text-sm font-semibold p-4 bg-black/70 backdrop-blur text-white rounded-2xl flex items-center justify-center cursor-pointer gap-2">
                  imagenes
                  <input
                    required
                    type="file"
                    className="hidden"
                    multiple
                    ref={fileInputRef}
                    onChange={(e) => setImage(Array.from(e.target.files))}
                  />
                  <p className="text-sm font-semibold text-[#9cccf4cb]">
                    {image.length}
                  </p>
                </label>

                <div className="flex items-center relative">
                  <label className="flex text-sm font-semibold text-white">
                    En Oferta
                    <input
                      className="w"
                      type="checkbox"
                      checked={isOnSale}
                      onChange={(e) => setIsOnSale(!isOnSale)}
                    />
                  </label>

                  {isOnSale && (
                    <label className="ms-2 w-[30%]">
                      <input
                        type="number"
                        placeholder="Descuento %"
                        className="p-4 bg-black/70 backdrop-blur text-white rounded-2xl lg:focus:outline-none"
                        value={discountPercentage}
                        onChange={(e) => setDiscountPercentage(e.target.value)}
                      />
                    </label>
                  )}
                </div>
              </div>

              {formEdit ? (
                <button
                  type="button"
                  className="border rounded-2xl backdrop-blur bg-black/70 text-sm font-semibold p-4 text-gray-200"
                  onClick={() => {
                    handleUpdate();
                  }}
                >
                  {loading.update ? (
                    <Loading />
                  ) : (
                    <p className="text-xs font-semibold text-white uppercase">
                      actualizar
                    </p>
                  )}
                </button>
              ) : (
                <button
                  type="submit"
                  className="lg:transition-all lg:duration-100 hover:bg-[#fea401] border border-gray-400 p-4 rounded-2xl bg-black/70 backdrop-blur text-gray-200"
                >
                  {loading.post ? (
                    <Loading />
                  ) : (
                    <p className="text-xs font-semibold text-white uppercase">
                      cargar
                    </p>
                  )}
                </button>
              )}
            </form>
          </section>

          {formEdit && image.length > 0 && (
            <section className="mt-10 lg:mt-20 lg:w-[380px] ms-[4%]">
              <Slider {...settings}>
                {image.map((img, idx) => (
                  <div
                    className="relative lg:h-[380px] rounded-2xl overflow-hidden"
                    key={img.id || idx}
                  >
                    <div className="z-20 bg-white">
                      <img
                        src={img.image}
                        alt={name}
                        className="object-cover w-full"
                      />
                    </div>

                    <div className="flex flex-col items-end gap-3 absolute top-2 right-2 z-20 cursor-pointer">
                      <button
                        onClick={() => handleDeletePhoto(img.id)}
                        className="text-gray-500 transition-all duration-100 hover:text-gray-900"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </Slider>
            </section>
          )}
        </section>
      </section>

      <hr className="my-10" />

      {/* --------PRODUCTOS------- */}
      <section ref={productSection}>
        <div className="flex flex-col gap-5">
          <div className="relative flex items-center w-full lg:w-[40%]">
            <input
              type="text"
              placeholder="Ingresar nombre"
              className="p-3 w-full bg-black/70 border text-white border-gray-500 backdrop-blur rounded-2xl"
              value={searchProduct}
              onChange={handleSearchProduct}
            />
            {loading.search ? (
              <Loading className="absolute right-4" />
            ) : suggestions.length > 0 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-5 absolute right-4 cursor-pointer text-white"
                onClick={deleteSuggestions}
              >
                <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-5 absolute right-4 text-white"
              >
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
        </div>

        <div className="flex flex-col mt-5">
          <section className="overflow-x-auto lg:rounded-2xl lg:bg-black/70 lg:backdrop-blur lg:p-5 lg:shadow-[0_4px_10px_0_#6B7280]">
            <table className="mt-4 min-w-full">
              <thead className="text-white">
                <tr>
                  <th>Id</th>
                  <th>Imagen</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Categoría</th>
                  <th>Marca</th>
                  <th className="hidden lg:flex">Acciones</th>
                </tr>
              </thead>
              {loading.get ? (
                <tbody>
                  <tr>
                    <td>
                      <Loading />
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {filteredProducts.map((product, index) => (
                    <tr
                      key={product.id || index}
                      onClick={() => handleOpenModal(product)}
                      className="text-gray-300"
                    >
                      <td className="text-center">{product.id}</td>

                      <td className="text-center flex justify-center h-full min-w-[55px] lg:w-auto ms-3">
                        {product.images && product.images.length > 0 ? (
                          <img
                            src={product.images[0].image}
                            alt={product.name}
                            className="lg:h-full h-[55px] w-[55px] object-contain"
                          />
                        ) : (
                          <span>No Image</span>
                        )}
                      </td>

                      <td className="text-sm font-medium text-center min-w-[180px] lg:w-auto lowercase first-letter:uppercase">
                        {product.name}
                      </td>

                      <td className="text-center">{product.price}</td>

                      <td className="text-center">
                        {product.category_detail?.name || "Sin categoría"}
                      </td>

                      <td className="text-center">
                        {product.brand_detail?.name || "Sin marca"}
                      </td>

                      <td className="text-cente h-full hidden lg:flex">
                        <button
                          type="button"
                          className="mx-2"
                          onClick={() => {
                            handleEdit(product);
                          }}
                        >
                          <i className="bx bxs-edit text-lg"></i>
                        </button>

                        <button
                          type="button"
                          className="mx-2"
                          onClick={() => {
                            handleDelete(product.id);
                          }}
                        >
                          <i className="bx bxs-trash w-full h-full text-lg"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>

            {selectedProduct && (
              <div
                onClick={handleCloseModal}
                className="w-screen h-screen fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center lg:hidden"
              >
                <div className="p-5 bg-black/60 rounded-xl shadow-md shadow-slate-300 w-[80%]">
                  <p className="text-center text-sm font-medium mb-4 text-white">
                    {selectedProduct.name}
                  </p>
                  <div className="flex justify-center gap-5">
                    <button
                      className="border text-gray-500 px-4 py-2 rounded-lg w-[40%]"
                      onClick={() => {
                        handleEdit(selectedProduct);
                        handleCloseModal();
                      }}
                    >
                      Editar
                    </button>
                    <button
                      className="border text-gray-500 px-4 py-2 rounded-lg w-[40%]"
                      onClick={() => {
                        handleDelete(selectedProduct.id);
                        handleCloseModal();
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="my-10 flex justify-center">
              {nextPage === null ? (
                <p className="text-gray-500">No hay más productos</p>
              ) : (
                <button
                  onClick={loadProducts}
                  className="w-[110px] h-[40px] border rounded-2xl bg-black/70 backdrop-blur-sm relative"
                >
                  {loading.seeMore ? (
                    <Loading />
                  ) : (
                    <p className="uppercase font-semibold text-xs text-white">
                      Ver mas
                    </p>
                  )}
                </button>
              )}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default AdminProfile;
