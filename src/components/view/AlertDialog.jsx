import Dialog from "@material-ui/core/Dialog";
import { TextField } from "@material-ui/core";
import { IoCloseOutline } from "react-icons/io5";
import { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";

// Custom styles for Material-UI components
const useStyles = makeStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "rgba(255, 157, 35, 0.2)",
      },
      "&:hover fieldset": {
        borderColor: "rgba(255, 157, 35, 0.4)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#FF9D23",
      },
    },
    "& .MuiInputLabel-root": {
      color: "rgba(66, 32, 6, 0.6)",
      "&.Mui-focused": {
        color: "#FF9D23",
      },
    },
    "& .MuiInputBase-input": {
      color: "#422006",
    },
  },
  otpInput: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "rgba(255, 157, 35, 0.2)",
        borderRadius: "12px",
      },
      "&:hover fieldset": {
        borderColor: "rgba(255, 157, 35, 0.4)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#FF9D23",
      },
    },
    "& .MuiInputBase-input": {
      color: "#422006",
      padding: "12px",
      textAlign: "center",
      fontSize: "18px",
      fontWeight: "600",
    },
  },
});

export default function AlertDialog({ open, onClose }) {
  const navigate = useNavigate();
  const classes = useStyles();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    otp: ["", "", "", ""],
  });
  const [showOtp, setShowOtp] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
  });

  const otpRefs = [useRef(), useRef(), useRef(), useRef()];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter valid 10-digit number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirm = () => {
    if (validateForm()) {
      setShowOtp(true);
      // Focus first OTP input after a small delay to ensure the element is rendered
      setTimeout(() => {
        otpRefs[0].current?.focus();
      }, 100);
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...formData.otp];
      newOtp[index] = value;
      setFormData((prev) => ({ ...prev, otp: newOtp }));

      if (value !== "" && index < 3) {
        otpRefs[index + 1].current.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && formData.otp[index] === "" && index > 0) {
      otpRefs[index - 1].current.focus();
    }
  };

  const handleFinalSubmit = () => {
    const otp = formData.otp.join("");
    if (otp.length === 4) {
      // Handle final submission with OTP verification
      console.log("Final submission with:", formData);
      navigate("/success");
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        style: {
          borderRadius: "16px",
          backgroundColor: "#FFFAF4",
          maxWidth: "400px",
          width: "90%",
        },
      }}
    >
      <div className="relative bg-white rounded-t-xl border-b border-[#FF9D23]/10">
        <div className="flex justify-end items-center px-6 py-3">
          {/* <h5 className="text-lg font-bold text-[#422006]">
            {showOtp ? "Enter OTP" : "Complete Your Order"}
          </h5> */}
          <button
            onClick={onClose}
            className="text-[#422006]/60 hover:text-[#FF9D23] transition-colors"
          >
            <IoCloseOutline className="text-2xl" />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {!showOtp ? (
          <>
            <TextField
              autoFocus
              label="Full Name"
              name="name"
              type="text"
              variant="outlined"
              fullWidth
              className={classes.root}
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              label="Phone Number"
              name="phone"
              type="tel"
              variant="outlined"
              fullWidth
              className={classes.root}
              placeholder="Enter 10-digit number"
              value={formData.phone}
              onChange={handleChange}
              error={!!errors.phone}
              helperText={errors.phone}
            />
            <button
              onClick={handleConfirm}
              className="w-full py-3 bg-[#FF9D23] text-white rounded-lg hover:bg-[#FF9D23] active:bg-[#FF9D23] transition-colors text-sm font-semibold mt-4 flex items-center justify-center gap-2"
            >
              Confirm Order
              <span className="text-lg">→</span>
            </button>
          </>
        ) : (
          <>
            <p className="text-sm text-[#422006]/80">
              Enter the 4-digit code sent to {formData.phone}
            </p>
            <div className="flex gap-2 justify-between">
              {[0, 1, 2, 3].map((index) => (
                <TextField
                  key={index}
                  inputRef={otpRefs[index]}
                  value={formData.otp[index]}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  variant="outlined"
                  className={classes.otpInput}
                  inputProps={{
                    maxLength: 1,
                    style: { width: "48px" },
                  }}
                  autoComplete="off"
                />
              ))}
            </div>
            <button
              onClick={handleFinalSubmit}
              className="w-full py-3 bg-[#FF9D23] text-white rounded-lg hover:bg-[#FF9D23] active:bg-[#FF9D23] transition-colors text-sm font-semibold mt-4 flex items-center justify-center gap-2"
            >
              Verify & Place Order
              <span className="text-lg">→</span>
            </button>
          </>
        )}

        <p className="text-xs text-[#422006]/60 text-center mt-2">
          Your details are secure and will only be used for order processing
        </p>
      </div>
    </Dialog>
  );
}
