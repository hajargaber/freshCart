import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from "../Shared/Loader/Loader";

const CategoryNavigation = () => {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState(null);

    const API_URL = 'https://ecommerce.routemisr.com/api/v1/brands';

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await axios.get(API_URL);
                const categoryData = response.data.data;

                if (Array.isArray(categoryData) && categoryData.length > 0) {
                    setBrands(categoryData);
                } else if (Array.isArray(categoryData) && categoryData.length === 0) {
                    setError("No brands found.");
                } else {
                    setError("Invalid data format from API.");
                }

                setLoading(false);
            } catch (err) {
                setError("Error fetching brands: " + err.message);
                setLoading(false);
                console.error("API Error:", err);
            }
        };

        fetchBrands();
    }, []);

    const handleCardClick = (brand) => {
        setSelectedBrand(brand);
    };

    const closeModal = () => {
        setSelectedBrand(null);
    };

    if (loading) {
        return <div className="middle-loader"><Loader/></div>;
    } else if (error) {
        return <div className="text-center py-4 text-red-500">Error: {error}</div>;
    }

    return (
      <>
        <div className="font-bold text-4xl text-center text-main my-4">
            <h1>All Brands</h1>
        </div>
        <div className="mx-auto my-10">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {brands.map((brand) => (
                    <div key={brand._id} 
                        className="border rounded shadow hover:shadow-main duration-300 cursor-pointer"
                        onClick={() => handleCardClick(brand)}
                    >
                        <img
                            src={brand.image} 
                            alt={brand.name}
                            className="w-full object-cover h-40 mb-2"
                        />
                        <h2 className='text-center text-2xl'>{brand.name}</h2>  
                    </div>
                ))}
            </div>
        </div>

        {/* Modal */}
        {selectedBrand && (
            <div className="fixed inset-0 flex items-start pt-4 justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                    <h2 className="text-2xl font-bold text-main">{selectedBrand.name}</h2>
                    <img src={selectedBrand.image} alt={selectedBrand.name} className="w-full h-40 object-contain my-4"/>
                    <button className="bg-gray-500 text-white px-4 py-2 rounded-md " onClick={closeModal}>
                        Close
                    </button>
                </div>
            </div>
        )}
      </>
    );
};

export default CategoryNavigation;
