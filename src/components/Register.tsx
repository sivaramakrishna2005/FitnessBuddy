import React, { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    mobile: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    console.log('Register Data:', formData);
    // Add register logic
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-800 text-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-300">Mobile Number :</label>
          <input
            type="tel"
            value={formData.mobile}
            onChange={(e) => handleChange('mobile', e.target.value)}
            className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-300">Email ID :</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-300">Username :</label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => handleChange('username', e.target.value)}
            className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-300">New Password : </label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
            className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-300">Confirm Password :</label>
          <input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => handleChange('confirmPassword', e.target.value)}
            className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 transition p-3 rounded-md font-semibold"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
