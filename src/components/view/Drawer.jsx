import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import { IoCloseOutline } from "react-icons/io5";

const useStyles = makeStyles({
  drawerPaper: {
    height: "50vh",
    borderRadius: "20px", // Adjust the height of the bottom drawer
  },
});

export default function BottomDrawer({ open, onClose, recipeDetails }) {
  const classes = useStyles();

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      classes={{ paper: classes.drawerPaper }}
    >
      <IoCloseOutline
        onClick={onClose}
        className="absolute right-0 mr-5 mt-4 bg-amber-100 rounded-4xl font-bold text-2xl"
      />
      <div className="w-full h-80">
        {" "}
        <img
          src={recipeDetails?.image}
          className="object-cover w-full h-full"
          alt=""
        />
      </div>
      <div className="p-2">
        {" "}
        <h5 className="font-bold">{recipeDetails.name}</h5>
        <p>{recipeDetails.description}</p>
        <h5 className="font-bold">{recipeDetails.price}</h5>
      </div>
    </Drawer>
  );
}
