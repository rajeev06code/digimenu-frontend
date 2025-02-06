import { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import AlertDialog from "../components/view/AlertDialog";
import { useNavigate } from "react-router-dom";

function CartItems() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      quantity: 1,
      name: "Handmade Bihari Samosa",
      price: 49.5,
      rating: 5.0,
      image:
        "https://res.cloudinary.com/dud1jwwji/image/upload/v1738835104/food-items/1738835102665-samosass.jpg.jpg",
    },
    {
      id: 2,
      quantity: 1,
      name: "Litti Chokha",
      price: 10.5,
      rating: 4.5,
      image:
        "https://res.cloudinary.com/dud1jwwji/image/upload/v1738855011/food-items/1738855005967-litti.webp.gif",
    },
    {
      id: 3,
      quantity: 1,
      name: "Chicken masala (250g)",
      price: 5.5,
      rating: 5.0,
      image:
        "https://res.cloudinary.com/dud1jwwji/image/upload/v1738855384/food-items/1738855381300-chicken.jpg.jpg",
    },
  ]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    // Handle the "Agree" action here
    setOpen(false);
  };
  const updateQuantity = (id, delta) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      {" "}
      <AlertDialog
        title="Use Google's location service?"
        description="Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running."
        open={open}
        onClose={handleClose}
        onAgree={handleAgree}
      />{" "}
      <div className="bg-white min-h-screen p-4 max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4">
          <button className="text-2xl">
            <IoMdArrowBack onClick={() => navigate(-1)} />
          </button>
          <h2 className="text-2xl font-bold">Cart</h2>
          <button className="text-2xl"></button>
        </div>

        {/* Cart Items */}
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center bg-white shadow-md rounded-lg p-3 border border-gray-200"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-18 rounded-lg object-cover"
              />
              <div className="ml-4 flex-1">
                <h5 className="text-sm font-semibold">{item.name}</h5>
                <p className="text-gray-500 text-sm">{item.rating} ⭐</p>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="bg-gray-200 px-2  rounded"
                  >
                    -
                  </button>
                  <span className="text-sm font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="bg-gray-200 px-2 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
              <p className="text-lg font-semibold text-green-500">
                Rs.{item.price.toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="fixed bottom-0 left-0 w-full bg-white shadow-md p-4 border-t">
          <div className="flex justify-between items-center text-lg font-semibold">
            <span>To Pay:</span>
            <span className="text-green-500 text-2xl">
              Rs.{totalPrice.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center text-gray-500 mt-2">
            <div className="flex items-center space-x-2">
              <span>⏳</span>
              <span>Waiting Time</span>
            </div>
            <span>45 Mins</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleClickOpen}
              className="flex-6  text-gray-600 border border-r-gray-600 py-2 mt-3 rounded-lg text-lg font-semibold"
            >
              Pay on Counter
            </button>
            <button className="flex-6 bg-green-500 text-white py-2 mt-3 rounded-lg text-lg font-semibold">
              Pay Online
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartItems;
