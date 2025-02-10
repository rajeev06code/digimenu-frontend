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
      <AlertDialog
        title="Use Google's location service?"
        description="Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running."
        open={open}
        onClose={handleClose}
        onAgree={handleAgree}
      />
      <div className="bg-[#FFFAF4] min-h-screen">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigate(-1)}
              className="text-[#422006] hover:text-[#FF9D23] transition-colors"
            >
              <IoMdArrowBack className="text-2xl" />
            </button>
            <h2 className="text-xl sm:text-2xl font-bold text-[#422006]">
              Your Cart
            </h2>
            <div className="w-8" /> {/* For balance */}
          </div>

          {/* Cart Items */}
          <div className="space-y-2 mb-32">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-2.5 border border-[#FF9D23]/10"
              >
                <div className="flex gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-[#422006] text-sm">
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className="text-[#FF9D23] text-xs">⭐</span>
                          <span className="text-[#422006]/60 text-xs">
                            {item.rating}
                          </span>
                        </div>
                        <p className="font-semibold text-[#FF9D23] text-sm mt-0.5">
                          ₹{item.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-6 h-6 flex items-center justify-center bg-[#FF9D23]/10 text-[#FF9D23] rounded-lg hover:bg-[#FF9D23]/20 active:bg-[#FF9D23]/30 transition-all"
                        >
                          <span className="text-base font-semibold">-</span>
                        </button>
                        <span className="w-4 text-center text-sm font-medium text-[#422006]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-6 h-6 flex items-center justify-center bg-[#FF9D23]/10 text-[#FF9D23] rounded-lg hover:bg-[#FF9D23]/20 active:bg-[#FF9D23]/30 transition-all"
                        >
                          <span className="text-base font-semibold">+</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#FF9D23]/10">
            <div className="max-w-2xl mx-auto p-4 space-y-2.5">
              {/* Price Details */}
              <div className="flex justify-between text-[#422006] font-semibold text-xl sm:text-base pb-2.5 border-b border-[#FF9D23]/10">
                <span>Total Amount</span>
                <span className="text-[#FF9D23] text-bold">
                  ₹{totalPrice.toFixed(2)}
                </span>
              </div>

              {/* Delivery Time */}
              <div className="flex justify-between items-center py-2 px-3 bg-[#FF9D23]/5 rounded-lg">
                <div className="flex items-center gap-1.5 text-[#422006]">
                  <span className="text-base">⏳</span>
                  <span className="text-xs sm:text-sm">
                    Estimated Delivery Time
                  </span>
                </div>
                <span className="font-semibold text-[#FF9D23] text-sm sm:text-base">
                  45 mins
                </span>
              </div>

              {/* Payment Buttons */}
              <div className="flex gap-3 mt-2.5">
                <button
                  onClick={handleClickOpen}
                  className="flex-1 py-4 rounded-lg text-[#422006] border border-[#FF9D23]/20 hover:bg-[#FF9D23]/5 transition-colors text-sm sm:text-base font-semibold"
                >
                  Pay at Counter
                </button>
                <button className="flex-1 py-4 rounded-lg bg-[#FF9D23] text-white hover:bg-[#FF9D23] transition-colors text-sm sm:text-base font-semibold">
                  Pay Online
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartItems;
