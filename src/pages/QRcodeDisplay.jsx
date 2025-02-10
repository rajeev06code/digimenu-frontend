import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaQrcode, FaCamera, FaUtensils, FaCheck } from "react-icons/fa";

function QRcodeDisplay() {
  const navigate = useNavigate();
  const [qrCodeImage, setQrCodeImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateQRCode = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://digimenu-backend-uuw2.onrender.com/api/qr-code/create",
        {
          restaurantName: "Kranti-hotel",
          tableNo: 4,
        }
      );
      setQrCodeImage(response.data.qrCodeImage);
    } catch (error) {
      console.error("Error generating QR code:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    { icon: <FaCamera className="text-xl" />, text: "Open Camera" },
    { icon: <FaQrcode className="text-xl" />, text: "Scan QR" },
    { icon: <FaUtensils className="text-xl" />, text: "Select Menu" },
    { icon: <FaCheck className="text-xl" />, text: "Place Order" },
  ];

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-[#FFFAF4] p-6">
      {/* Header Section */}
      <div className="text-center mb-8 mt-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#422006] mb-2">
          Welcome to <span className="text-[#FF9D23]">KRANTI HOTEL</span>
        </h1>
        <p className="text-[#422006]/60 text-sm sm:text-base">
          Scan QR code to explore our delicious menu
        </p>
      </div>

      {/* QR Code Box */}
      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-2 mb-8 w-full max-w-xs relative">
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#FF9D23] text-white px-4 py-1 rounded-full text-sm font-medium">
          Table 4
        </div>
        <div className="bg-gradient-to-br from-[#FFF8F0] to-white border-2 border-[#FF9D23]/10 rounded-xl p-2 flex justify-center items-center min-h-[200px]">
          {qrCodeImage ? (
            <img
              src={qrCodeImage}
              alt="QR Code"
              className="max-w-full rounded-lg shadow-sm"
            />
          ) : (
            <button
              onClick={handleGenerateQRCode}
              disabled={isLoading}
              className="px-6 py-3 bg-[#FF9D23] text-white rounded-lg hover:bg-[#FF9D23] active:bg-[#FF9D23] transition-all flex items-center gap-2 font-medium"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <FaQrcode className="text-lg" />
                  Generate QR
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Steps Section - Fixed */}
      <div className="w-full max-w-xl mx-auto">
        <div className="flex justify-between items-center">
          {steps.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center">
              {/* Icon Circle */}
              <div className="w-14 h-14 rounded-full bg-[#FF9D23]/10 flex items-center justify-center text-[#FF9D23]">
                {step.icon}
              </div>

              {/* Step Text */}
              <p className="text-[#422006] text-xs font-medium mt-2 text-center w-16">
                {step.text}
              </p>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-[50%] w-[calc(100%-1rem)] h-[2px] top-7 -z-10">
                  <div className="w-full h-full bg-[#FF9D23]/10">
                    <div className="h-full w-1/3 bg-[#FF9D23]/20"></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QRcodeDisplay;
