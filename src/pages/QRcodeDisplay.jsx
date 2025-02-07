import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function QRcodeDisplay() {
  let a = 3;
  const navigate = useNavigate();
  const [qrCodeImage, setQrCodeImage] = useState(null);
  const handleGenerateQRCode = async () => {
    try {
      const response = await axios.post(
        "https://b3t2jpmt-3000.inc1.devtunnels.ms/api/qr-code/create",
        {
          restaurantName: "Kranti-hotel",
          tableNo: 4,
        }
      );

      setQrCodeImage(response.data.qrCodeImage); // Store the generated QR code image
    } catch (error) {
      let errorMessage = "Error fetching food items: ";
      if (error.response) {
        document.write(`${JSON.stringify(error.response.data)}`);
        console.error("Server responded with:", error.response.data);
      } else if (error.request) {
        errorMessage += "No response received from the server.";
        console.error("No response received:", error.request);
      } else {
        errorMessage += error.message;
        console.error("Error setting up request:", error.message);
      }
      document.write(`<h2 style="color:red;">${errorMessage}</h2>`);
      throw error;
    }
  };
  const handleRedirect = () => {
    navigate("/Kranti-hotel/menu");
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fef8f1] p-4">
      {/* Title */}

      {/* <button
        onClick={handleRedirect}
        style={{ padding: "8px 15px", cursor: "pointer" }}
      >
        Redirect
      </button> */}
      <h1 className="text-4xl font-extrabold text-[#E46039] text-center uppercase">
        Scan Here
      </h1>
      <h2 className="text-xl font-bold text-[#E46039] mt-1 uppercase">
        Food Menu
      </h2>

      {/* QR Code Box */}
      <div className="bg-white border-2 border-[#E46039] rounded-lg mt-6 p-3 flex justify-center items-center">
        {qrCodeImage ? (
          <img src={qrCodeImage} alt="" />
        ) : (
          <button
            onClick={handleGenerateQRCode}
            style={{ padding: "8px 15px", cursor: "pointer" }}
          >
            Generate QR
          </button>
        )}
      </div>

      {/* Steps */}
      <div className="flex items-center justify-center mt-6">
        {[
          "Open Your Camera",
          "Scan This QR Code",
          "Select Your Food",
          "Confirm The order",
        ].map((text, index) => (
          <div key={index} className="flex items-center">
            {/* Step Number Circle */}
            <div className="relative flex flex-col items-center text-center">
              <div className="w-8 h-8 flex items-center justify-center bg-[#E46039] text-white font-bold rounded-full">
                {index + 1}
              </div>
              <p className="text-[#E46039] font-medium text-sm mt-2 w-14">
                {text}
              </p>
            </div>

            {/* Connector Line (not for last item) */}
            {index < 3 && <div className="w-12 h-0.5 bg-[#E46039]"></div>}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-6 w-full text-center py-2 border border-[#E46039] rounded-full text-[#E46039] font-medium">
        KRANTI HOTEL welcomes you &nbsp;{" "}
        {/* <span className="font-bold">7461824651</span> */}
      </div>
    </div>
  );
}

export default QRcodeDisplay;
