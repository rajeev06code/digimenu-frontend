// ✅ Get All Food Items
import axios from "axios";

export const getFoodItems = async (
  restaurantId,
  {
    page = 1,

    limit,

    search = "",

    category = "",
  }
) => {
  try {
    // Build query parameters

    const params = new URLSearchParams({
      page,

      limit,
    });

    // Add optional parameters if they exist

    if (search) params.append("search", search);

    if (category) params.append("category", category);

    const response = await axios.get(
      `${
        import.meta.env.VITE_BASE_URL
      }/api/food-items?restaurantId=${restaurantId}&${params}`
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

// ✅ Create a New Food Item (with Image Upload)
export const createFoodItem = async (formData) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/food-items`,
      {
        method: "POST",
        body: formData, // Sending FormData directly for file upload
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create food item");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating food item:", error);
    throw error;
  }
};
