import React from "react";

const Footer = () => {
  return (
    <footer className="bg-grey-80 bg-base-300 text-center p-4">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by ACME
          Industries Ltd
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
