// ✅ Get All Food Items
import axios from "axios";

export const getFoodItems = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/food-items`
    );
    return response.data;
  } catch (error) {
    document.write(error.message);
    console.error("Error fetching food items:", error);
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
