import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; 2025 Your Company Name. All rights reserved.</p>
        <ul className="flex justify-center mt-4">
          <li className="mx-4"><a href="#" className="hover:text-gray-300">About</a></li>
          <li className="mx-4"><a href="#" className="hover:text-gray-300">Contact</a></li>
          <li className="mx-4"><a href="#" className="hover:text-gray-300">Privacy Policy</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;