const apiServices = (api) => {
  // -----------POST-----------

  const login = async (data) => {
    try {
      const response = await api.post("/login/", data);
      return response;
    } catch (error) {
      console.error("Error en login:", error);
      throw error;
    }
  };

  const createUser = async (data) => {
    try {
      const response = await api.post("/register/", data);
      return response;
    } catch (error) {
      console.error("Error en el registro:", error);
      throw error;
    }
  };

  const createComments = async (data) => {
    try {
      const response = await api.post("/comments/", data);
      return response;
    } catch (error) {
      console.error("Error al crear comentario:", error);
      throw error;
    }
  };

  const createProduct = async (data) => {
    try {
      const response = await api.post("/products/", data);
      return response;
    } catch (error) {
      console.error("Error al crear producto:", error);
      throw error;
    }
  };

  const createBrand = async (data) => {
    try {
      const response = await api.post("/brands/", data);
      return response.data;
    } catch (error) {
      console.error("Error al crear producto:", error);
      throw error;
    }
  };

  const createCategory = async (data) => {
    try {
      const response = await api.post("/categories/", data);
      return response.data;
    } catch (error) {
      console.error("Error al crear producto:", error);
      throw error;
    }
  };

  const createOrder = async (data) => {
    try {
      const response = await api.post("/orders/", data);
      return response;
    } catch (error) {
      console.error("Error al crear orden:", error);
      throw error;
    }
  };

  const createOrderItems = async (data) => {
    try {
      const response = await api.post("/order-item/", data);
      return response;
    } catch (error) {
      console.error("Error al crear orden:", error);
      throw error;
    }
  };

  // -----------GET-----------

  const getUser = async () => {
    try {
      const response = await api.get("/user-info/");
      return response.data;
    } catch (error) {
      console.error(
        "Error obteniendo la información del usuario:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  const getProduct = async () => {
    try {
      const response = await api.get("/products/");
      return response.data;
    } catch (error) {
      console.error("Error al traer los productos:", error);
      throw error;
    }
  };

  const getComments = async (productId) => {
    try {
      const response = await api.get(
        `/comments/get_comments?product=${productId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error al traer los comentarios:", error);
      throw error;
    }
  };

  const getOrders = async () => {
    try {
      const response = await api.get("/orders");
      return response.data;
    } catch (error) {
      console.error("Error al traer las compras:", error);
      throw error;
    }
  };

  const getBrands = async () => {
    try {
      const response = await api.get("/brands/");
      return response.data;
    } catch (error) {
      console.error("Error al obtener categorías:", error);
      throw error;
    }
  };

  const getCategories = async () => {
    try {
      const response = await api.get("/categories/");
      return response.data;
    } catch (error) {
      console.error("Error al obtener categorías:", error);
      throw error;
    }
  };

  // -----------PUT-----------

  const updateUser = async (data) => {
    try {
      const response = await api.put("/user-update/", data);
      return response;
    } catch (error) {
      console.error("no se puedo ejecutar la acción:", error);
      throw error;
    }
  };

  const updateProduct = async (productID, updateData) => {
    try {
      const response = await api.put(`/products/${productID}/`, updateData);
      return response;
    } catch (error) {
      console.error("no se puedo ejecutar la acción:", error);
      throw error;
    }
  };

  const updateComments = async (commentID, updateData) => {
    try {
      const response = await api.put(`/comments/${commentID}/`, updateData);
      return response;
    } catch (error) {
      console.error("no se puedo ejecutar la acción:", error);
      throw error;
    }
  };

  const updateOrderDetails = async (data) => {
    try {
      const response = await api.put("/orderdetails", data);
      return response;
    } catch (error) {
      console.error("no se puedo ejecutar la acción:", error);
      throw error;
    }
  };

  // -----------DELETE-----------

  const deleteUser = async (data) => {
    try {
      const response = await api.delete("/users", data);
      return response;
    } catch (error) {
      console.error("no se puedo ejecutar la acción:", error);
      throw error;
    }
  };

  const deleteProduct = async (productID) => {
    try {
      const response = await api.delete(`/products/${productID}/`);
      return response;
    } catch (error) {
      console.error("no se puedo ejecutar la acción:", error);
      throw error;
    }
  };

  const deleteComments = async (commentID) => {
    try {
      const response = await api.delete(`/comments/${commentID}/`);
      return response;
    } catch (error) {
      console.error("no se puedo ejecutar la acción:", error);
      throw error;
    }
  };

  const deleteOrders = async (data) => {
    try {
      const response = await api.delete("/orders", data);
      return response;
    } catch (error) {
      console.error("no se puedo ejecutar la acción:", error);
      throw error;
    }
  };

  return {
    login,
    createUser,
    createComments,
    createProduct,
    createBrand,
    createCategory,
    createOrder,
    createOrderItems,
    getUser,
    getProduct,
    getComments,
    getOrders,
    getBrands,
    getCategories,
    updateUser,
    updateProduct,
    updateComments,
    updateOrderDetails,
    deleteUser,
    deleteProduct,
    deleteComments,
    deleteOrders,
  };
};

export default apiServices;
