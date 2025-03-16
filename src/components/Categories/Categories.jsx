import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Shared/Loader/Loader";

const CategoryNavigation = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const API_URL = "https://ecommerce.routemisr.com/api/v1/categories";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(API_URL);
        const categoryData = response.data.data;

        if (Array.isArray(categoryData) && categoryData.length > 0) {
          setCategories(categoryData);
        } else if (Array.isArray(categoryData) && categoryData.length === 0) {
          setError("No categories found.");
        } else {
          setError("Invalid data format from API.");
        }

        setLoading(false);
      } catch (err) {
        setError("Error fetching categories: " + err.message);
        setLoading(false);
        console.error("API Error:", err);
      }
    };

    fetchCategories();
  }, []);

  const handleCardClick = (category) => {
    setSelectedCategory(category);
  };

  const closeModal = () => {
    setSelectedCategory(null);
  };

  if (loading) {
    return (
      <div className="middle-loader">
        <Loader />
      </div>
    );
  } else if (error) {
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  }

  return (
    <>
      <div className="mx-auto my-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div
              key={category._id}
              className="border py-4 rounded shadow hover:shadow-main duration-300 cursor-pointer"
              onClick={() => handleCardClick(category)}
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full object-cover h-40 mb-2"
              />
              <h2 className="text-center text-2xl font-bold text-main">
                {category.name}
              </h2>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedCategory && (
        <div className="fixed inset-0 flex items-start pt-4 justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-bold text-main">
              {selectedCategory.name}
            </h2>
            <img
              src={selectedCategory.image}
              alt={selectedCategory.name}
              className="w-full h-40 object-contain my-4"
            />
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded-md"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryNavigation;
