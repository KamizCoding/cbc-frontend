import axios from "axios";
import { useEffect, useState } from "react";
import { deleteProductFromCart, updateCartQuantity } from "../utils/cartfunction";

export default function CartCard(props) {
  const { productId, quantity, onQuantityChange } = props;

  const [product, setProduct] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [itemQuantity, setItemQuantity] = useState(quantity);

  useEffect(() => {
    if (!loaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId)
        .then((response) => {
          if (response.data != null) {
            setProduct(response.data);
            setLoaded(true);
          } else {
            deleteProductFromCart(productId);
            window.location.reload();
          }
        })
        .catch((error) => console.log(error));
    }
  }, []);

  const handleIncrease = () => {
    setItemQuantity((prev) => prev + 1);
    onQuantityChange(productId, itemQuantity + 1);
  };

  const handleDecrease = () => {
    if (itemQuantity > 1) {
      setItemQuantity((prev) => prev - 1);
      onQuantityChange(productId, itemQuantity - 1);
    } else {
      deleteProductFromCart(productId);
      window.location.reload();
    }
  };

  return (
    <>
      {!loaded ? (
        <h1>Loading</h1>
      ) : (
        <div
          className="w-full max-w-[600px] flex items-center gap-4 bg-muted p-4 rounded-lg shadow-md border border-muted 
          transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:border-accent"
        >
          {/* Product Image */}
          <img
            src={product?.images[0]}
            className="w-24 h-24 object-cover rounded-lg border border-secondary 
                    transition-transform duration-300 hover:scale-105"
            alt="Product"
          />

          {/* Product Details */}
          <div className="flex flex-col flex-grow">
            <h2 className="text-lg font-bold text-accent transition-all duration-300 hover:text-dark">
              {product?.productName}
            </h2>
            <p className="text-sm text-dark">Product ID: {productId}</p>

            {/* Quantity Controls */}
            <div className="flex items-center space-x-2 mt-1">
              <button
                className="px-2 py-1 bg-secondary text-white rounded-md shadow-md hover:bg-dark transition-all duration-300"
                onClick={handleDecrease}
              >
                -
              </button>
              <p className="text-md font-semibold text-dark">{itemQuantity}</p>
              <button
                className="px-2 py-1 bg-accent text-white rounded-md shadow-md hover:bg-dark transition-all duration-300"
                onClick={handleIncrease}
              >
                +
              </button>
            </div>

            <p className="text-md font-semibold text-dark">
              LKR. {product?.lastPrice.toFixed(2)}
            </p>
          </div>

          {/* Total Price */}
          <div className="flex flex-col items-end">
            <p className="text-md font-bold text-accent transition-all duration-300 hover:text-dark">
              Total: LKR. {(product?.lastPrice * itemQuantity).toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
