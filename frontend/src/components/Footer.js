import React from 'react';

const Footer = () => {
  return (
    <footer className="footer footer-center p-4 bg-base-300 text-base-content">
      <div>
        <p>Copyright © {new Date().getFullYear()} - All right reserved by TaskManager Industries Ltd</p>
      </div>
    </footer>
  );
};

export default Footer; 