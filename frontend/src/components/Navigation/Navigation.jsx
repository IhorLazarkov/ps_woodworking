import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ProfileButton from "./ProfileButton";
import { useCart } from "../../context/CartContext";
import CategoriesModal from "./Catagories";
import "./Navigation.css";

function ShoppingCartButton({ cartItemCount = 0 }) {
  return (
    <NavLink to="/cart" className="shopping-cart-button">
      <FontAwesomeIcon icon={faShoppingCart} />
      {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
    </NavLink>
  );
}

function Navigation() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { totalItems } = useCart();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };


  return (
    <nav className="navigation">
      <NavLink to="/" className="logo">PSW</NavLink>
      <CategoriesModal />

      {/* Search */}
      <div className="search-container">
        <form onSubmit={handleSearchSubmit} className="search-form">
          <div className="search-input">
            <input
              type="text"
              placeholder="Need some wood...?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input-field"
            />
          </div>
          <div>
            <button type="submit" className="search-button">
              <div>
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
              </div>
            </button>
          </div>
        </form>
      </div>
      {/* Profile & Cart */}
      <ProfileButton />
      <ShoppingCartButton cartItemCount={totalItems} className="shopping-cart-button" />
    </nav>
  );
}

export default Navigation;
