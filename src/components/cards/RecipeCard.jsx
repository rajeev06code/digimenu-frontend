import { memo } from "react";
import { BiFoodTag } from "react-icons/bi";
import CartButton from "../buttons/CartButton";

const RecipeCard = memo(({ recipe, quantity, onAdd, onUpdate, onOpen }) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-3 sm:p-4 border border-[#FF9D23]/10 group hover:bg-white relative ${
        !recipe.available ? "grayscale" : ""
      }`}
    >
      {!recipe.available && (
        <div className="absolute inset-0 bg-black/5 rounded-xl z-10" />
      )}

      <div className="flex gap-3 sm:gap-4">
        {/* Image */}
        <div className="relative group flex-shrink-0">
          <img
            src={recipe.image}
            alt={recipe.name}
            onClick={() => recipe.available && onOpen(recipe)}
            className={`w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover ${
              recipe.available
                ? "cursor-pointer group-hover:opacity-90"
                : "cursor-not-allowed"
            } transition-opacity`}
          />
          <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2">
            <BiFoodTag
              className={`${
                recipe.category === "veg" || recipe.category === "beverage"
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
              {recipe.available ? (
                <p className="text-xs sm:text-sm text-[#422006]/60 mt-0.5 sm:mt-1 line-clamp-2">
                  {recipe.description}
                </p>
              ) : (
                <p className="text-xs sm:text-sm text-red-500 mt-0.5 sm:mt-1">
                  Not available today, come tomorrow after 10 AM
                </p>
              )}
              <p className="font-semibold text-[#FF9D23] text-sm sm:text-base mt-1">
                ₹{recipe.price}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <CartButton
                recipe={recipe}
                quantity={quantity}
                onAdd={onAdd}
                onUpdate={onUpdate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

RecipeCard.displayName = "RecipeCard";

export default RecipeCard;
