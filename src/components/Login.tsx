import React, { useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({ mobile: '', password: '' });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login Data:', formData);
    // Add login logic
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-800 text-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-300">Mobile Number :</label>
          <input
            type="tel"
            placeholder='Enter your mobile number'
            value={formData.mobile}
            onChange={(e) => handleChange('mobile', e.target.value)}
            className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-300">Password :</label>
          <input
            type="password"
            placeholder='Enter your password'
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
            className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 transition p-3 rounded-md font-semibold"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
