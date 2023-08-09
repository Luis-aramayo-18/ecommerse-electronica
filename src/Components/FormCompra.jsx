import FormWizard from "react-form-wizard-component";
import "react-form-wizard-component/dist/style.css";
import "./FormCompra.css";
import { useState } from "react";
import { useCart } from "./Hooks/useCart";
import { useNavigate } from "react-router-dom";

const FormCompra = () => {
  const [shipmentInfo, setShipmentInfo] = useState({
    name: "",
    numberPhone: "",
    address: "",
    numberAddress: "",
    textReference: ""
  });

  const navigate = useNavigate()
  const { cart } = useCart()

  const [paymentMethod, setPaymentMethod] = useState("");

  const handleClick = ()=>{
    navigate('/')
  }

  const getTotalPrice =()=>{
    return cart.reduce((total, product) => total + product.price * product.quantity, 0);
  }

  const handleComplete = () => {};

  return (
    <>
      <div className="container">
        <div className="row ">
          <div className="col-8">
            <h1 className="text-center mt-2">Datos del envio</h1>
            <hr />
            <FormWizard onComplete={handleComplete}>
              <FormWizard.TabContent title="Personal details" icon="ti-user">
                <h3>Complete los campos</h3>
                <hr />
                <p className="text-start m-0">Datos del destinatario</p>
                <div className="d-flex mt-1">
                  <input
                    placeholder="Nombre"
                    type="text"
                    className="form-control"
                    id="name"
                    value={shipmentInfo.name}
                    onChange={(e) =>
                      setShipmentInfo({ ...shipmentInfo, name: e.target.value })
                    }
                  />
                  <input
                    placeholder="Numero de telefono"
                    type="number"
                    className="form-control ms-3"
                    id="numberPhone"
                    value={shipmentInfo.numberPhone}
                    onChange={(e) =>
                      setShipmentInfo({
                        ...shipmentInfo,
                        numberPhone: e.target.value,
                      })
                    }
                  />
                </div>
                <p className="text-start m-0 mt-3">Datos de la entrega</p>
                <div className="d-flex mt-1">
                  <input
                    placeholder="Calle"
                    type="text"
                    className="form-control"
                    id="address"
                    value={shipmentInfo.address}
                    onChange={(e) =>
                      setShipmentInfo({
                        ...shipmentInfo,
                        address: e.target.value,
                      })
                    }
                  />
                  <input
                    placeholder="Altura"
                    type="number"
                    className="form-control ms-3"
                    id="numberAddress"
                    value={shipmentInfo.numberAddress}
                    onChange={(e) =>
                      setShipmentInfo({
                        ...shipmentInfo,
                        numberAddress: e.target.value,
                      })
                    }
                  />
                </div>
                <textarea
                  type="text"
                  className="form-control mt-4"
                  placeholder="Deja un comentario"
                  id="textReference"
                  value={shipmentInfo.textReference}
                  onChange={(e) =>
                    setShipmentInfo({
                      ...shipmentInfo,
                      textReference: e.target.value,
                    })
                  }
                ></textarea>
                <div className="form-check mt-4 text-start">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                    checked
                  />
                  <label className="form-check-label" for="flexCheckChecked">
                    Acordar costo del envio una vez finalize la compra
                  </label>
                </div>
                <hr className="mt-3" />
              </FormWizard.TabContent>


              <FormWizard.TabContent title="Additional Info" icon="ti-settings">
                <h3>Formas de pago</h3>
                <hr />
                <div className="payment-options">
                  <div
                    className="payment-option d-flex"
                    onClick={() => setPaymentMethod("cash")}
                  >
                    <input
                      type="radio"
                      id="cash"
                      name="paymentMethod"
                      value="cash"
                      checked={paymentMethod === "cash"}
                      onChange={() => {}}
                    />
                    <div className="border border-info w-100 p-3 ms-2 rounded">
                    <label htmlFor="cash">Cash</label>
                    </div>
                  </div>
                  <div
                    className="payment-option d-flex mt-3"
                    onClick={() => setPaymentMethod("transfers")}
                  >
                    <input
                      type="radio"
                      id="transfers"
                      name="paymentMethod"
                      value="transfers"
                      checked={paymentMethod === "transfers"}
                      onChange={() => {}}
                    />
                    <div className="border rounded border-info p-3 ms-1 w-100 ms-2">
                    <label htmlFor="transfers">Transfers</label>
                    </div>
                  </div>
                  <div
                    className="payment-option d-flex mt-3"
                    onClick={() => setPaymentMethod("creditcard")}
                  >
                    <input
                      type="radio"
                      id="creditcard"
                      name="paymentMethod"
                      value="creditcard"
                      checked={paymentMethod === "creditcard"}
                      onChange={() => {}}
                    />
                    <div className="border border-info rounded w-100 p-3 ms-2">
                    <label htmlFor="creditcard">Credit Card</label>
                    </div>
                  </div>
                </div>
                <hr />
              </FormWizard.TabContent>


              <FormWizard.TabContent title="Last step" icon="ti-check">
               <h3>Confirmar</h3>
               <hr />
               <h5>Nombre: {shipmentInfo.name}</h5>
               <h5>Celular: {shipmentInfo.numberPhone}</h5>
               <h5>Calle: {shipmentInfo.address}</h5>
               <h5>Altura: {shipmentInfo.numberAddress}</h5>
               {
               shipmentInfo.textReference
               ?<h5>Referencia: {shipmentInfo.textReference}</h5>
               :false
               }
               <h5>Pago: {paymentMethod}</h5>
              </FormWizard.TabContent>
            </FormWizard>
            {/* add style */}
            <style>{`
        @import url("https://cdn.jsdelivr.net/gh/lykmapipo/themify-icons@0.1.2/css/themify-icons.css");
      `}</style>
          </div>

          <div className="col-4">
          <h3 className="text-center mt-4">Mi compra {cart.length}</h3>
          <hr />
          <ul>
          {
          cart.map(product => (
            <li>
                <div className="d-flex mt-2">
                    <img className="w-50 h-50" src={product.image} alt={product.name} />
                    <div>
                        <p className="m-0">{product.name}</p>
                        <p>${product.price}</p>
                    </div>
                </div>
            </li>
          ))
          }
          </ul>
          <hr />
          <h3>Total: ${getTotalPrice()}</h3>
          <hr />
          <button 
          className="w-100 p-2 bg-warning rounded mt-3"
          onClick={handleClick}
          >
          Volver al inicio
          </button>
          </div>
          </div>
      </div>
    </>
  );
};

export default FormCompra;
