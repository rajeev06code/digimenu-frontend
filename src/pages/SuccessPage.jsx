import { useEffect, useState } from "react";
import { FaCheckCircle, FaClock, FaReceipt, FaUtensils } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { GiCookingPot } from "react-icons/gi";

function SuccessPage() {
  const navigate = useNavigate();

  // Simulating order details (replace with actual data passing)
  const orderDetails = {
    orderId: "KH1234567890",
    customerName: "Rahul",
    items: [
      { name: "Handmade Bihari Samosa", quantity: 2, price: 49.5 },
      { name: "Litti Chokha", quantity: 1, price: 10.5 },
      { name: "Chicken Masala", quantity: 1, price: 5.5 },
    ],
    totalAmount: 115,
    estimatedTime: 45,
    tableNo: 4,
  };

  return (
    <div className="min-h-screen bg-[#FFFAF4] p-4 sm:p-6">
      <div className="max-w-md mx-auto pt-8 sm:pt-12">
        {/* Success Icon - Static */}
        <div className="text-center mb-3">
          <div className="flex flex-col items-center justify-center">
            <div className="w-24 h-10 rounded-full bg-[#FF9D23]/10 flex items-center justify-center">
              <FaCheckCircle className="text-5xl text-[#FF9D23]" />
            </div>
            <h1 className="text-2xl font-bold text-[#422006] mt-6 mb-2">
              Thank you, {orderDetails.customerName}!
            </h1>
            <div className="space-y-1">
              <p className="text-[#422006] font-medium">
                Your order has been confirmed
              </p>
              <p className="text-[#422006]/60 text-sm">
                We'll notify you once your delicious food is ready
              </p>
            </div>
          </div>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-[#422006]/60">Order ID</p>
              <p className="font-semibold text-[#422006]">
                {orderDetails.orderId}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-[#422006]/60">Table No.</p>
              <p className="font-semibold text-[#422006]">
                {orderDetails.tableNo}
              </p>
            </div>
          </div>

          {/* Order Items */}
          <div className="border-t border-b border-[#FF9D23]/10 py-4 mb-4 space-y-3">
            {orderDetails.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#FF9D23]" />
                  <span className="text-sm text-[#422006]">
                    {item.name} × {item.quantity}
                  </span>
                </div>
                <span className="text-sm font-medium text-[#422006]">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Total Amount */}
          <div className="flex justify-between items-center mb-4">
            <span className="font-medium text-[#422006]">Total Amount</span>
            <span className="font-bold text-[#FF9D23]">
              ₹{orderDetails.totalAmount.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <FaClock className="text-[#FF9D23]" />
              <span className="text-sm font-medium text-[#422006]">
                Wait Time
              </span>
            </div>
            <p className="text-2xl font-bold text-[#422006]">
              {orderDetails.estimatedTime}
              <span className="text-sm font-normal text-[#422006]/60 ml-1">
                mins
              </span>
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <FaUtensils className="text-[#FF9D23]" />
              <span className="text-sm font-medium text-[#422006]">Status</span>
            </div>
            <div className="flex items-center gap-2">
              <GiCookingPot className="text-[#FF9D23] text-xl animate-bounce" />
              <p className="text-sm font-medium text-[#FF9D23] relative">
                Preparing your order
                <span className="absolute -right-4 animate-pulse">
                  <span className="inline-flex">
                    <span className="text-[#FF9D23]">.</span>
                    <span className="text-[#FF9D23] animation-delay-200">
                      .
                    </span>
                    <span className="text-[#FF9D23] animation-delay-400">
                      .
                    </span>
                  </span>
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate("/menu")}
          className="w-full bg-[#FF9D23]/10 text-[#FF9D23] rounded-xl py-3 font-medium hover:bg-[#FF9D23]/20 transition-colors"
        >
          Back to Menu
        </button>
      </div>
    </div>
  );
}

// Add these styles to your CSS or tailwind.config.js
const styles = {
  ".animation-delay-200": {
    "animation-delay": "200ms",
  },
  ".animation-delay-400": {
    "animation-delay": "400ms",
  },
};

export default SuccessPage;
