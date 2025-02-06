import Dialog from "@material-ui/core/Dialog";
import { TextField } from "@material-ui/core";
import { IoCloseOutline } from "react-icons/io5";
import { useState } from "react";

export default function AlertDialog({ open, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    otp: ["", "", "", ""], // Array to store 4-digit OTP
  });
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div className="flex justify-end items-center  h-12 px-6">
        <IoCloseOutline onClick={onClose} className="font-bold text-2xl" />
      </div>
      <h5 className="text-center pb-6 font-bold">Complete Your Order</h5>
      <div className="px-4 mb-2">
        <TextField
          autoFocus
          label="Please Enter Name"
          name="name"
          type="text"
          variant="outlined"
          fullWidth
          style={{ marginBottom: "20px" }}

          //   value={formData.name}
          //   onChange={handleChange}
        />
        <TextField
          label="Please Enter 10 digit Phone Number"
          name="phone"
          type="tel"
          variant="outlined"
          fullWidth

          //   value={formData.phone}
          //   onChange={handleChange}
        />
      </div>
      {/* <div className="flex flex-col p-10">
        <h5 className="text-center">
          Please Enter 4 digit OTP received on phone
        </h5>
        <div className="flex justify-center gap-2 mt-3">
          {formData.otp.map((digit, index) => (
            <TextField
              key={index}
              // inputRef={otpRefs[index]}
              value={digit}
              // onChange={(e) => handleOtpChange(index, e.target.value)}
              variant="outlined"
              size="small"
              inputProps={{
                maxLength: 1,
                style: { textAlign: "center", fontSize: "20px", width: "40px" },
              }}
            />
          ))}
        </div>
      </div> */}
      <div className="w-full pb-4 flex items-center justify-center ">
        {/* <Button onClick={onClose} color="secondary"> 
          Cancel
        </Button> */}
        <button className="w-1/2 bg-green-500 text-white py-2 mt-3 rounded-lg text-lg font-semibold">
          Submit
        </button>
      </div>
    </Dialog>
  );
}
