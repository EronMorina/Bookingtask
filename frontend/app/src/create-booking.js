import { useState } from "react";
import { useRouter } from "next/router";

export default function CreateBooking() {
  const [formData, setFormData] = useState({
    service: "",
    doctor_name: "",
    start_time: "",
    end_time: "",
    date: "",
  });
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset errors

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Redirect to the bookings page on success
        router.push("/");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to create booking.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <h1>Create Booking</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Service</label>
          <input
            type="text"
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Doctor Name</label>
          <input
            type="text"
            name="doctor_name"
            value={formData.doctor_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Start Time</label>
          <input
            type="time"
            name="start_time"
            value={formData.start_time}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>End Time</label>
          <input
            type="time"
            name="end_time"
            value={formData.end_time}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
