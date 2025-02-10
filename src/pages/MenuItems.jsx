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
      console.log("Fetched data:", data.foodItems);
      if (data && data.foodItems && data.foodItems.length > 0) {
        setFoodItems(data.foodItems);
        console.log("Updated foodItems state:", data.foodItems);
      }
    } catch (error) {
      console.error("Failed to load food items:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchFoodItems();
  }, []);

  const getItemQuantity = (recipeId) => {
    const item = cartItems.find((item) => item._id === recipeId);
    return item ? item.quantity : 0;
  };

  const handleUpdateQuantity = (recipe, action) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === recipe._id);

      if (action === "decrease") {
        if (existingItem.quantity === 1) {
          // Remove item if quantity becomes 0
          return prevItems.filter((item) => item._id !== recipe._id);
        }
        // Decrease quantity
        return prevItems.map((item) =>
          item._id === recipe._id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }

      if (existingItem) {
        // Increase quantity
        return prevItems.map((item) =>
          item._id === recipe._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      // Add new item
      return [...prevItems, { ...recipe, quantity: 1 }];
    });
  };

  const handleAddToCart = (recipe) => {
    handleUpdateQuantity(recipe, "increase");
  };

  const handleViewCart = () => {
    navigate("/cart"); // Navigate to the cart page
  };
  const handleOpen = (recipeDetails) => {
    setOpen(true);
    setRecipeDetails(recipeDetails);
  };
  return (
    <div className="bg-[#FFFAF4] min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4">
        {/* Header */}

        {/* Search Bar */}
        <div className="relative mb-4 sm:mb-6">
          <input
            type="text"
            placeholder="Search for dishes..."
            className="w-full p-3 sm:p-4 pl-10 sm:pl-12 text-sm rounded-xl bg-white shadow-sm border border-[#FF9D23]/20 text-[#422006] focus:outline-none focus:ring-2 focus:ring-[#FF9D23]/30 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaSearch className="absolute top-1/2 left-3 sm:left-4 transform -translate-y-1/2 text-[#FF9D23] text-sm sm:text-base" />
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 sm:gap-3 mb-4 sm:mb-6 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          {[
            { name: "All", icon: "🍽️" },
            { name: "Veg", icon: "🥬" },
            { name: "Non-Veg", icon: "🍗" },
            { name: "Beverage", icon: "🥤" },
            { name: "Best Seller", icon: "⭐" },
          ].map((filter, index) => (
            <button
              key={index}
              className="px-3 sm:px-4 py-1.5 sm:py-2 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm bg-white border border-[#FF9D23]/20 rounded-full hover:bg-[#FF9D23] hover:text-white hover:border-transparent transition-all whitespace-nowrap flex-shrink-0"
            >
              <span className="text-base">{filter.icon}</span>
              {filter.name}
            </button>
          ))}
        </div>

        {/* Recipe List */}
        <div className="space-y-3 sm:space-y-4">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-[#FF9D23]"></div>
            </div>
          ) : filteredRecipes?.length === 0 ? (
            <div className="text-center py-8 sm:py-10">
              <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">🍽️</div>
              <p className="text-[#FF9D23]/70 text-sm sm:text-base">
                No dishes found
              </p>
            </div>
          ) : (
            filteredRecipes?.map((recipe) => (
              <div
                key={recipe._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-3 sm:p-4 border border-[#FF9D23]/10 group hover:bg-white"
              >
                <div className="flex gap-3 sm:gap-4">
                  {/* Image */}
                  <div className="relative group flex-shrink-0">
                    <img
                      src={recipe.image}
                      alt={recipe.name}
                      onClick={() => handleOpen(recipe)}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover cursor-pointer group-hover:opacity-90 transition-opacity"
                    />
                    <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2">
                      <BiFoodTag
                        className={`${
                          recipe.category === "veg" ||
                          recipe.category === "beverage"
                            ? "text-green-500"
                            : recipe.category === "non-veg"
                            ? "text-red-500"
                            : ""
                        } bg-white rounded-full p-0.5 sm:p-1 shadow-sm`}
                        size={16}
                      />
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <div className="min-w-0">
                        <h3 className="font-semibold text-[#422006] text-sm sm:text-base truncate">
                          {recipe.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#422006]/60 mt-0.5 sm:mt-1 line-clamp-2">
                          {recipe.description}
                        </p>
                        <p className="font-semibold text-[#FF9D23] text-sm sm:text-base mt-1">
                          ₹{recipe.price}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        {getItemQuantity(recipe._id) > 0 ? (
                          <div className="mt-1.5 sm:mt-2 flex items-center justify-end gap-2">
                            <button
                              onClick={() =>
                                handleUpdateQuantity(recipe, "decrease")
                              }
                              className="w-7 h-7 flex items-center justify-center bg-[#FF9D23]/10 text-[#FF9D23] rounded-lg hover:bg-[#FF9D23]/20 active:bg-[#FF9D23]/30 transition-all"
                            >
                              <span className="text-lg font-semibold">-</span>
                            </button>
                            <span className="w-5 text-center text-sm font-medium text-[#422006]">
                              {getItemQuantity(recipe._id)}
                            </span>
                            <button
                              onClick={() =>
                                handleUpdateQuantity(recipe, "increase")
                              }
                              className="w-7 h-7 flex items-center justify-center bg-[#FF9D23]/10 text-[#FF9D23] rounded-lg hover:bg-[#FF9D23]/20 active:bg-[#FF9D23]/30 transition-all"
                            >
                              <span className="text-lg font-semibold">+</span>
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleAddToCart(recipe)}
                            className="mt-1.5 sm:mt-2 px-3 sm:px-4 py-1.5 sm:py-1.5 text-xs sm:text-sm bg-[#FF9D23] text-white rounded-lg hover:bg-[#FF9D23] active:bg-[#FF9D23] transition-all flex items-center gap-1.5 sm:gap-2"
                          >
                            <FaShoppingCart size={12} />
                            Add
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Footer */}
        {cartItems.length > 0 && (
          <div className="fixed bottom-4 left-4 right-4 max-w-2xl mx-auto z-10">
            <div className="bg-white rounded-xl shadow-lg p-3 sm:p-4 flex justify-between items-center border border-[#FF9D23]/20">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#FF9D23] rounded-full flex items-center justify-center">
                  <FaShoppingCart className="text-white text-sm sm:text-base" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-[#422006]/60">
                    Your Order
                  </p>
                  <p className="font-semibold text-[#422006] text-sm sm:text-base">
                    {cartItems.length} item(s)
                  </p>
                </div>
              </div>
              <button
                onClick={handleViewCart}
                className="bg-[#FF9D23] text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg hover:bg-[#FF9D23] active:bg-[#FF9D23] transition-all flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base"
              >
                View Cart
                <span className="text-lg sm:text-xl">→</span>
              </button>
            </div>
          </div>
        )}
      </div>
      <BottomDrawer
        open={open}
        onClose={handleClose}
        recipeDetails={recipeDetails}
      />
    </div>
  );
}

export default MenuItems;
