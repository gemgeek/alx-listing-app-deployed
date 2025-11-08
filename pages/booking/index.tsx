import axios from 'axios';
import { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  billingAddress: string;
}

export default function BookingForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    billingAddress: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!formData.firstName || !formData.lastName || !formData.email) {
      setError('First Name, Last Name, and Email are required.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/bookings', formData);
      setSuccess(`Booking confirmed! Your booking ID is: ${response.data.bookingId}`);
      setFormData({
        firstName: '', lastName: '', email: '', phoneNumber: '',
        cardNumber: '', expirationDate: '', cvv: '', billingAddress: '',
      });
    } catch (err: any) {
      console.error('Booking failed:', err);
      setError(err.response?.data?.message || 'Failed to submit booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyles = "w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

  if (success) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="max-w-md w-full text-center bg-white p-8 rounded-lg shadow-xl">
          <h2 className="text-3xl font-bold text-green-600 mb-4">Thank You!</h2>
          <p className="text-lg text-gray-700">{success}</p>
          <button
            onClick={() => setSuccess(null)} 
            className="mt-6 w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Make Another Booking
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <form 
        onSubmit={handleSubmit} 
        className="max-w-lg w-full bg-white p-8 rounded-lg shadow-xl space-y-6"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800">Confirm Your Booking</h1>
        
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleChange} className={inputStyles} required />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleChange} className={inputStyles} required />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className={inputStyles} required />
        </div>
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input type="tel" name="phoneNumber" id="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className={inputStyles} />
        </div>

        {/* Payment Details */}
        <hr className="my-4"/>
        <h2 className="text-2xl font-semibold text-gray-800">Payment Details</h2>
        <div>
          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
          <input type="text" name="cardNumber" id="cardNumber" value={formData.cardNumber} onChange={handleChange} className={inputStyles} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700 mb-1">Expiration (MM/YY)</label>
            <input type="text" name="expirationDate" id="expirationDate" value={formData.expirationDate} onChange={handleChange} className={inputStyles} />
          </div>
          <div>
            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
            <input type="text" name="cvv" id="cvv" value={formData.cvv} onChange={handleChange} className={inputStyles} />
          </div>
        </div>
        <div>
          <label htmlFor="billingAddress" className="block text-sm font-medium text-gray-700 mb-1">Billing Address</label>
          <input type="text" name="billingAddress" id="billingAddress" value={formData.billingAddress} onChange={handleChange} className={inputStyles} />
        </div>

        {/* Submit Button & Error Message */}
        <div>
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-xl hover:bg-blue-700 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : "Confirm & Pay"}
          </button>
        </div>
        
        {/* Error Message Display */}
        {error && (
          <div className="text-red-600 bg-red-100 border border-red-400 p-3 rounded-lg text-center">
            {error}
          </div>
        )}
      </form>
    </div>
  );
}