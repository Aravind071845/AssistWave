import { useState } from "react";
import axios from "axios";

export default function Review({name}) {
  const [formData, setFormData] = useState({
    review: "",
    rating: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8081/auth/reviews", {
        ...formData,
        name
      });
      
      if (response.status === 200) {
        alert("Thank you for your feedback! You can submit more reviews.");
        setFormData({ review: "", rating: "" }); // Reset form
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center p-5">
      <h1 className="text-gray-700 text-2xl font-bold mb-4">Product Review</h1>
      <p className="text-gray-700 mb-4">Give your review and rating below:</p>

      {/* Review Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        {/* Review Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Your Review</label>
          <textarea
            name="review"
            value={formData.review}
            onChange={handleChange}
            rows="3"
            className="w-full p-2 border rounded"
            required
          ></textarea>
        </div>

        {/* Rating Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Your Rating (1-5)</label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            min="1"
            max="5"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
}
