import React from "react";
import "./footer.css"; // Import CSS file
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Footer Navigation */}

        {/* Social Media Links */}
        <div className="footer-social">
          <a
            href="https://github.com/Aousulaprashant"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="footer-icon" />
          </a>
          <a
            href="https://www.linkedin.com/in/prashanth-aousula-161b19224/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="footer-icon" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="footer-icon" />
          </a>
        </div>

        {/* Copyright Section */}
        <p className="footer-text">
          © {new Date().getFullYear()} MoodSync. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
