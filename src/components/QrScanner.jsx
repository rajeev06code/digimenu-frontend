import { QRCodeSVG } from "qrcode.react";

const QrScanner = () => {
  return (
    <QRCodeSVG
      value="https://b3t2jpmt-5173.inc1.devtunnels.ms/menu"
      size={300}
      fgColor="#000000"
      bgColor="#ffffff"
    />
  );
};

export default QrScanner;
