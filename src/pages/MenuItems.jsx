import { useCallback, useEffect, useRef, useState, useMemo, memo } from "react";
import { FaHeart, FaSearch, FaShoppingCart } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { BiFoodTag } from "react-icons/bi";
import debounce from "lodash/debounce";
import { getFoodItems } from "../services/foodService";
import BottomDrawer from "../components/view/Drawer";
import { useCart } from "../context/CartContext";
import CartButton from "../components/buttons/CartButton";
import RecipeCard from "../components/cards/RecipeCard";

function MenuItems() {
  const { restaurantId, tableNo } = useParams();
  const navigate = useNavigate();
  const { initializeCart, addToCart, cartItems, updateQuantity } = useCart();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [recipeDetails, setRecipeDetails] = useState({});

  const handleClose = () => setOpen(false);

  const [foodItems, setFoodItems] = useState([]);
  // ================================================================
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  // Filter states
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    limit: 10,
  });

  const loadingRef = useRef(null);

  // Initialize cart once when component mounts
  useEffect(() => {
    if (restaurantId && tableNo) {
      const tableInfo = { restaurantId, tableNo };
      localStorage.setItem("tableInfo", JSON.stringify(tableInfo));
      initializeCart(restaurantId, tableNo);
    }
  }, [restaurantId, tableNo]); // Remove initializeCart from dependencies

  const getItemQuantity = (recipeId) => {
    const item = cartItems.find((item) => item._id === recipeId);
    return item ? item.quantity : 0;
  };

  const handleAddToCart = (recipe) => {
    addToCart({
      ...recipe,
      price: Number(recipe.price),
    });
  };

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((searchTerm) => {
      setFoodItems([]); // Clear existing items
      setPage(1); // Reset page
      setHasMore(true); // Reset hasMore
      setFilters((prev) => ({ ...prev, search: searchTerm }));
    }, 500),
    []
  );

  const fetchItems = async (pageNum) => {
    if (loading) return;

    try {
      setLoading(true);
      setError(null);

      const response = await getFoodItems(restaurantId, {
        page: pageNum,
        limit: filters.limit,
        search: filters.search,
        category: filters.category, // This will be empty string for "All"
      });

      setFoodItems((prevItems) => {
        if (pageNum === 1) {
          return response.foodItems;
        }
        return [...prevItems, ...response.foodItems];
      });

      setHasMore(response.foodItems.length >= filters.limit);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch food items. Please try again later.");
      console.error("Error fetching food items:", err);
      setLoading(false);
    }
  };

  // Effect to fetch next page when page changes
  useEffect(() => {
    if (page > 1) {
      fetchItems(page);
    }
  }, [page]);

  // Initial load and filter changes
  useEffect(() => {
    setFoodItems([]);
    setPage(1);
    setHasMore(true);
    fetchItems(1);
  }, [filters.category, filters.search]);

  // Set up intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasMore &&
          !loading &&
          foodItems.length > 0
        ) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading, foodItems.length]);

  // Handle category change
  const handleCategoryChange = (category) => {
    const normalizedCategory = category.toLowerCase();
    setFoodItems([]); // Clear existing items
    setPage(1); // Reset page
    setHasMore(true); // Reset hasMore
    setFilters((prev) => ({
      ...prev,
      category: normalizedCategory === "all" ? "" : normalizedCategory,
    }));
  };

  // Handle search input
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleViewCart = () => {
    navigate("/cart");
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
            onChange={handleSearchChange}
            // onChange={(e) => setSearch(e.target.value)}
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
              onClick={() => handleCategoryChange(filter.name)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm border rounded-full transition-all whitespace-nowrap flex-shrink-0 cursor-pointer ${
                (filters.category === "" &&
                  filter.name.toLowerCase() === "all") ||
                filters.category === filter.name.toLowerCase()
                  ? "bg-[#FF9D23] text-white border-transparent"
                  : "bg-white text-[#422006] border-[#FF9D23]/20 hover:bg-[#FF9D23]/10"
              }`}
            >
              <span className="text-base">{filter.icon}</span>
              {filter.name}
            </button>
          ))}
        </div>

        {/* Recipe List */}
        <div className="space-y-3 sm:space-y-4">
          {foodItems?.map((recipe) => (
            <RecipeCard
              key={recipe._id}
              recipe={recipe}
              quantity={getItemQuantity(recipe._id)}
              onAdd={handleAddToCart}
              onUpdate={updateQuantity}
              onOpen={handleOpen}
            />
          ))}

          {/* Loading indicator and intersection observer reference */}
          <div ref={loadingRef} className="flex justify-center py-4">
            {loading && (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF9D23]"></div>
            )}
          </div>

          {/* End of menu message */}
          {!loading && !hasMore && foodItems.length > 0 && (
            <div className="text-center py-8 px-4">
              <div className="flex justify-center items-center gap-2 text-3xl mb-3">
                <span>✨</span>
                <span>🍽️</span>
                <span>✨</span>
              </div>
              <h3 className="text-[#422006] font-medium text-sm">
                You've reached the end of the menu
              </h3>
            </div>
          )}

          {/* No items message */}
          {!loading && foodItems.length === 0 && (
            <div className="text-center py-12 px-4">
              <div className="flex justify-center items-center gap-2 text-4xl mb-4">
                <span className="transform -rotate-45">🍽️</span>
              </div>
              <h3 className="text-[#422006] font-semibold text-lg mb-2">
                No Items Found
              </h3>
              <p className="text-[#422006]/60 text-sm">
                Try adjusting your search or filter to find what you're looking
                for
              </p>
            </div>
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
