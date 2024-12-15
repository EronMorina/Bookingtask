"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const CreateBooking: React.FC = () => {
  const [formData, setFormData] = useState({
    service: "",
    doctor_name: "",
    start_time: "",
    end_time: "",
    date: "",
  });

  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch("http://host.docker.internal:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorResponse = await res.json();
        throw new Error(errorResponse.message || "Failed to create booking");
      }

      // Redirect to the homepage if booking is successful
      router.push("/");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Booking</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="service" className="block text-sm font-medium">
            Service
          </label>
          <input
            type="text"
            id="service"
            name="service"
            value={formData.service}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="doctor_name" className="block text-sm font-medium">
            Doctor Name
          </label>
          <input
            type="text"
            id="doctor_name"
            name="doctor_name"
            value={formData.doctor_name}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="start_time" className="block text-sm font-medium">
            Start Time
          </label>
          <input
            type="text"
            id="start_time"
            name="start_time"
            value={formData.start_time}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="end_time" className="block text-sm font-medium">
            End Time
          </label>
          <input
            type="text"
            id="end_time"
            name="end_time"
            value={formData.end_time}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>

      {/* Back Button */}
      <button
        onClick={() => router.push("/")}
        className="mt-4 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
      >
        Back
      </button>
    </div>
  );
};

export default CreateBooking;
