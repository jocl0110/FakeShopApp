import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaTiktok,
} from "react-icons/fa";
import "./Footer.css";
import { FaXTwitter } from "react-icons/fa6";
import { TiSocialYoutube } from "react-icons/ti";

const Footer = () => {
  return (
    <footer>
      <ul id="social-media">
        <li>
          <FaFacebookF />
        </li>
        <li>
          <FaPinterestP />
        </li>
        <li>
          <FaInstagram />
        </li>
        <li>
          <FaXTwitter />
        </li>
        <li>
          <TiSocialYoutube />
        </li>
        <li>
          <FaTiktok />
        </li>
      </ul>
      <p>© 2024 FakeStoreApp Brands, Inc.</p>
    </footer>
  );
};

export default Footer;
