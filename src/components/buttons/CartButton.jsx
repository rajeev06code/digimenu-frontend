import { memo } from "react";
import { FaShoppingCart } from "react-icons/fa";

const CartButton = memo(({ recipe, quantity, onAdd, onUpdate }) => {
  // Add a CSS transition class
  const buttonClasses = "transform transition-all duration-200 ease-in-out";

  if (!recipe.available) {
    return (
      <span
        className={`${buttonClasses} mt-1.5 sm:mt-2 px-3 sm:px-4 py-1.5 sm:py-1.5 text-xs sm:text-sm bg-gray-100 text-gray-500 rounded-lg inline-block`}
      >
        Not Available
      </span>
    );
  }

  if (quantity > 0) {
    return (
      <div
        className={`${buttonClasses} mt-1.5 sm:mt-2 flex items-center justify-end gap-2`}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onUpdate(recipe._id, -1);
          }}
          className="w-7 h-7 flex items-center justify-center bg-[#FF9D23]/10 text-[#FF9D23] rounded-lg hover:bg-[#FF9D23]/20 active:bg-[#FF9D23]/30 transition-all"
        >
          <span className="text-lg font-semibold">-</span>
        </button>
        <span className="w-5 text-center text-sm font-medium text-[#422006]">
          {quantity}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onUpdate(recipe._id, 1);
          }}
          className="w-7 h-7 flex items-center justify-center bg-[#FF9D23]/10 text-[#FF9D23] rounded-lg hover:bg-[#FF9D23]/20 active:bg-[#FF9D23]/30 transition-all"
        >
          <span className="text-lg font-semibold">+</span>
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onAdd(recipe);
      }}
      className={`${buttonClasses} mt-1.5 sm:mt-2 px-3 sm:px-4 py-1.5 sm:py-1.5 text-xs sm:text-sm bg-[#FF9D23] text-white rounded-lg hover:bg-[#FF9D23]/90 active:bg-[#FF9D23] transition-all flex items-center gap-1.5 sm:gap-2`}
    >
      <FaShoppingCart size={12} />
      Add
    </button>
  );
});

CartButton.displayName = "CartButton";

export default CartButton;
