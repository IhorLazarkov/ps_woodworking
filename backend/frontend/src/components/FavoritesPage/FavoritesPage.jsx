import { useFavorites } from "../../context/FavoritesContext";
import { NavLink } from "react-router-dom";
import "./FavoritesPage.css";

function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();

  if (favorites.length === 0) {
    return <h2 className="favorites-empty">You have no favorites yet.</h2>;
  }

  return (
    <div className="favorites-page">
      <h2>Your Favorite Products</h2>
      <div className="favorites-grid">
        {favorites.map(product => (
          <div key={product.id} className="favorite-item">
            <NavLink to={`/products/${product.id}`}>
              <img src={
                product.previewImage ||
                product.productImages?.find(img => img.preview)?.url ||
                ""
              } 
              alt={product.name} 
            />
              <h3>{product.name}</h3>
            </NavLink>
            <p>${product.price}</p>
            <button onClick={() => toggleFavorite(product)}>Remove ❌</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoritesPage;
