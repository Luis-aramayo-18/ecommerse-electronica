import React, { useEffect, useRef, useState } from "react";

import { useAxios } from "../../Hooks/useAxios";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Bounce, toast } from "react-toastify";
import Loading from "../../Loading";

const AdminProfile = () => {
  const api = useAxios();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [products, setProducts] = useState([""]);
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

  const [image, setImage] = useState([""]);

  const [price, setPrice] = useState("");
  const [isOnSale, setIsOnSale] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState("");

  const [formEdit, setFormEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  const [nextPage, setNextPage] = useState("/products/?limit=10");

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        loadProducts();
        const categoriesData = await api.get("/categories/");
        const brandsData = await api.get("/brands/");
        const productsData = await api.get("/products/");
        console.log(productsData);

        setCategories(categoriesData.data);
        setBrands(brandsData.data);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name?.toLowerCase().includes(searchProduct.toLowerCase())
    );
    setFilteredProducts(filtered);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchProduct]);

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
      console.log(response);

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
        fileInputRef.current.value = "";
      }
    } catch (err) {
      const error = err.response.data;
      console.log(error);

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
    }
  };

  const handleUpdate = async () => {
    try {
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
      const response = await api.delete(`/products/${productID}/`);
      if (response.status === 204) {
        console.log("Producto eliminado");
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
    }
  };

  const loadProducts = async () => {
    if (nextPage === null) {
      return;
    }

    try {
      setLoading(true);
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

          setNextPage(response.data.next);
        }
      }
    } catch (err) {
      console.error("Error al cargar productos:", err);
    } finally {
      setLoading(false);
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

  return (
    <div className="">
      <section>
        <ul className="flex gap-10 text-sm mt-5 font-semibold">
          <li className="cursor-pointer text-white">Cargar producto</li>
          <li className="cursor-pointer ">Cargar producto</li>
          <li className="cursor-pointer ">Cargar producto</li>
        </ul>
      </section>

      <section>
        <div className="flex flex-col-reverse lg:first-letter:flex-row lg:justify-between">
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
                  className="p-2 w-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <label>
                <input
                  required
                  placeholder="Precio"
                  type="number"
                  className="p-2 w-full"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </label>
              <textarea
                name=""
                id=""
                required
                placeholder="Descripción"
                className="p-2 w-full h-64 resize-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <div className="flex justify-center gap-4">
                <div className="w-full">
                  {Array.isArray(categories) && categories.length > 0 ? (
                    <select
                      required
                      className="p-2 overflow-y-auto w-full"
                      value={selectedCategory}
                      onChange={handleCategoryChange}
                    >
                      <option value="" disabled>
                        CATEGORÍA
                      </option>
                      <option value="new-category">NUEVA CATEGORÍA</option>
                      {categories.map((category, idx) => (
                        <option key={category.id || idx} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <Loading />
                  )}

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
                  {Array.isArray(brands) && brands.length > 0 ? (
                    <select
                      required
                      className="p-2 w-full"
                      value={selectedBrand}
                      onChange={handleBrandChange}
                    >
                      <option value="" disabled>
                        MARCA
                      </option>
                      <option value="new-brand">NUEVA MARCA</option>

                      {brands.map((brand, idx) => (
                        <option key={brand.id || idx} value={brand.id}>
                          {brand.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <Loading />
                  )}

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
              <div className="flex flex-col gap-2">
                <label className="flex gap-2 items-center text-white">
                  Producto en Oferta
                  <input
                    className="w-4 h-4"
                    type="checkbox"
                    checked={isOnSale}
                    onChange={(e) => setIsOnSale(!isOnSale)}
                  />
                </label>
                {isOnSale && (
                  <label htmlFor="">
                    <input
                      type="number"
                      placeholder="% Descuento"
                      className="p-2 w-1/4"
                      value={discountPercentage}
                      onChange={(e) => setDiscountPercentage(e.target.value)}
                    />
                  </label>
                )}
              </div>
              <label>
                <input
                  required
                  type="file"
                  className=""
                  multiple
                  ref={fileInputRef}
                  onChange={(e) => setImage(Array.from(e.target.files))}
                />
              </label>
              {formEdit ? (
                <button
                  type="button"
                  className="border p-2 text-gray-200"
                  onClick={() => {
                    handleUpdate();
                  }}
                >
                  Actualizar Producto
                </button>
              ) : (
                <button type="submit" className="border p-2 text-gray-200">
                  Cargar Producto
                </button>
              )}
            </form>
          </section>

          {formEdit && image.length > 0 && (
            <section className="mt-20 me-10 w-[450px]">
              <Slider {...settings}>
                {image.map((img, idx) => (
                  <img
                    src={img.image}
                    alt={name}
                    key={img.id || idx}
                    className="object-cover w-full"
                  />
                ))}
              </Slider>
            </section>
          )}
        </div>

        <div>
          <h2 className="mt-10 text-gray-100 text-sm font-medium">PRODUCTOS</h2>

          <div className="relative flex items-center w-full lg:w-[40%] mt-5">
            <input
              type="text"
              placeholder="Ingresar Nombre"
              className="p-2 w-full"
              value={searchProduct}
              onChange={(e) => {
                setSearchProduct(e.target.value);
              }}
            />
            <i className="bx bx-search text-2xl absolute right-2 top-2"></i>
          </div>

          <div className="flex flex-col mt-5">
            {Array.isArray(products) && products.length > 0 ? (
              <section className="overflow-x-auto">
                <table className="mt-4 min-w-full"> 
                  <thead>
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
                  {filteredProducts.length > 0 ? (
                    <tbody>
                      {filteredProducts.map((product, index) => (
                        <tr
                          key={product.id || index}
                          onClick={() => handleOpenModal(product)}
                          className=""
                        >
                          <td className="text-gray-100 text-center">
                            {product.id}
                          </td>
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
                          <td className="text-gray-100 text-sm font-medium text-center min-w-[180px] lg:w-auto lowercase first-letter:uppercase">
                            {product.name}
                          </td>
                          <td className="text-center">{product.price}</td>
                          <td className="text-center">
                            {product.category_detail?.name || "Sin categoría"}
                          </td>
                          <td className="text-center">
                            {product.brand_detail?.name || "Sin marca"}
                          </td>
                          <td className="text-center hidden lg:flex">
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
                  ) : (
                    <tbody>
                      <tr>
                        <td>
                          <Loading />
                        </td>
                      </tr>
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
                  {loading ? (
                    <Loading />
                  ) : nextPage === null ? (
                    <p className="text-gray-500">No hay más productos</p>
                  ) : (
                    <button
                      onClick={loadProducts}
                      className="p-4 border uppercase font-semibold"
                    >
                      Ver Más
                    </button>
                  )}
                </div>
              </section>
            ) : (
              <Loading />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminProfile;
