import { useEffect, useState } from "react";
import { FaHeart, FaSearch, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BiFoodTag } from "react-icons/bi";

import { getFoodItems } from "../services/foodService";
import BottomDrawer from "../components/view/Drawer";

function MenuItems() {
  const [search, setSearch] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [recipeDetails, setRecipeDetails] = useState({});

  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const filteredRecipes = foodItems?.filter((recipe) =>
    recipe.name.toLowerCase().includes(search.toLowerCase())
  );
  const fetchFoodItems = async () => {
    try {
      const data = await getFoodItems();
      // document.write(data);
      if (data.length > 0) {
        setFoodItems(data);
      }
    } catch (error) {
      // document.writeln("-----", error);
      console.error("Failed to load food items:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchFoodItems();
  }, []);

  const handleAddToCart = (recipe) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === recipe.id);
      if (existingItem) {
        // If item already exists, increase quantity
        return prevItems.map((item) =>
          item.id === recipe.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If item doesn't exist, add it to the cart
        return [...prevItems, { ...recipe, quantity: 1 }];
      }
    });
  };
  const handleViewCart = () => {
    navigate("/cart"); // Navigate to the cart page
  };
  const handleOpen = (recipeDetails) => {
    setOpen(true);
    setRecipeDetails(recipeDetails);
  };
  return (
    <>
      {" "}
      <BottomDrawer
        open={open}
        onClose={handleClose}
        recipeDetails={recipeDetails}
      />
      <div className="w-full max-w-md mx-auto p-4 bg-white min-h-screen">
        {/* Search Bar */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search for dishes..."
            className="w-full p-3 pl-10 rounded-full bg-gray-100 text-sm outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-4">
          {["Veg", "Non-Veg", "Beverage", "Best Seller"].map(
            (filter, index) => (
              <button
                key={index}
                className="px-3 py-1 text-sm text-white bg-green-500 rounded-full"
              >
                {filter}
              </button>
            )
          )}
        </div>

        {/* Recipe List */}
        <div className="space-y-4">
          {filteredRecipes?.length === 0 ? (
            <p className="text-center text-gray-500">No recipes found</p>
          ) : (
            filteredRecipes?.map((recipe) => (
              <div
                key={recipe._id}
                className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-md"
              >
                {/* Image */}
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  onClick={() => {
                    handleOpen(recipe);
                  }}
                  className="w-16 h-16 rounded-md object-cover"
                />

                {/* Details */}
                <div className="flex-1">
                  <h3 className="text-black font-semibold text-sm">
                    {recipe.name}
                  </h3>
                  {/* Highlighted Price */}
                  <p className="text-xs text-gray-500">{recipe.description}</p>
                  <p className="text-md font-semibold text-orange-600">
                    {recipe.price}
                  </p>{" "}
                </div>

                {/* Icons */}
                <div className="flex gap-4 flex-col items-center  text-gray-500">
                  <BiFoodTag
                    className={
                      recipe.category === "veg" ||
                      recipe.category === "beverage"
                        ? "text-green-400"
                        : recipe.category === "non-veg"
                        ? "text-red-500"
                        : null
                    }
                  />

                  <button
                    onClick={() => handleAddToCart(recipe)}
                    className="flex items-center text-sm bg-orange-500 text-white px-3 py-1 rounded-full hover:bg-orange-600 transition-colors"
                  >
                    <FaShoppingCart className="mr-1" /> Add
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="fixed bottom-0 left-2 right-2 bg-green-400 rounded-2xl shadow-lg p-4 flex justify-between items-center">
            <span className="text-md text-white font-bold">
              {cartItems.length} item(s) in cart
            </span>
            <button
              onClick={handleViewCart}
              className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-colors"
            >
              View Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default MenuItems;
