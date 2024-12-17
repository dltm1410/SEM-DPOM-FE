import { useState, useEffect } from "react";
import { axiosInstance } from "../api/axios";
import { toast } from "react-toastify";

const ManageVariant = ({ productId, onClose, onUpdate }) => {
  const [variants, setVariants] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(false);

  const sizes = ["S", "M", "L", "XL"];
  const colors = ["White", "Black", "Blue", "Green", "Red"];

  useEffect(() => {
    const fetchVariants = async () => {
      try {
        const response = await axiosInstance.get(`/products/variants/${productId}`);
        setVariants(response.data.variants || []);
      } catch (error) {
        console.error("Error fetching variants:", error);
        toast.error("Failed to load variants");
      }
    };

    if (productId) {
      fetchVariants();
    }
  }, [productId]);

  const handleUpdateStock = async (e) => {
    e.preventDefault();
    
    if (!selectedSize || !selectedColor || quantity <= 0) {
      toast.error("Please fill in all fields correctly");
      return;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.post('/products/variants/restock', {
        productId,
        size: selectedSize,
        color: selectedColor,
        quantity: Number(quantity)
      });

      if (response.status === 200 || response.status === 201) {
        toast.success("Stock updated successfully");
        if (onUpdate) {
          await onUpdate();
        }
        if (onClose) {
          onClose();
        }
      }
    } catch (error) {
      console.error("Error restocking variant:", error);
      toast.error(error.response?.data?.message || "Failed to restock variant");
    } finally {
      setLoading(false);
    }
  };

  const getCurrentStock = () => {
    const variant = variants.find(
      v => v.size === selectedSize && v.color === selectedColor
    );
    return variant ? variant.quantity : 0;
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
      <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
        Restock Variant
      </h3>
      <form onSubmit={handleUpdateStock}>
        {/* Size Selection */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Size
          </label>
          <div className="flex gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 text-sm font-medium rounded-lg border 
                  ${selectedSize === size 
                    ? "bg-blue-600 text-white border-blue-600" 
                    : "text-gray-900 bg-white border-gray-200 hover:bg-gray-100"}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Color Selection */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Color
          </label>
          <div className="flex gap-2">
            {colors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setSelectedColor(color)}
                className={`w-8 h-8 rounded-full border ${
                  selectedColor === color ? "ring-2 ring-blue-600" : ""
                }`}
                style={{ 
                  backgroundColor: color.toLowerCase(),
                  border: color.toLowerCase() === 'white' ? '1px solid #e5e7eb' : 'none'
                }}
                title={color}
              />
            ))}
          </div>
        </div>

        {/* Current Stock Display */}
        {selectedSize && selectedColor && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Current Stock: {getCurrentStock()}
            </p>
          </div>
        )}

        {/* Quantity Input */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Quantity to Add
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(0, parseInt(e.target.value) || 0))}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            min="1"
            required
            placeholder="Enter quantity to add"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || !selectedSize || !selectedColor || quantity <= 0}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? "Restocking..." : "Restock"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManageVariant; 