import { createContext, useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
const sessionUser = useSelector(state => state.session.user);

useEffect(() => {
  if (sessionUser) {
    fetch("/api/favorites")
      .then(res => res.json())
      .then(data => setFavorites(data));
  } else {
    setFavorites([]);
  }
}, [sessionUser]);

  const toggleFavorite = async (product) => {
    const isAlready = favorites.find(item => item.id === product.id);
  
    if (isAlready) {
      await fetch(`/api/favorites/${product.id}`, { method: "DELETE" });
      setFavorites(prev => prev.filter(p => p.id !== product.id));
    } else {
      await fetch(`/api/favorites/${product.id}`, { method: "POST" });
      setFavorites(prev => [...prev, product]);
    }
  };
  

  const isFavorited = (productId) => favorites.some((item) => item.id === productId);

  // New: clear all favorites (used on logout)
  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem("favorites"); // 🧼 also clear persistent storage
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorited, clearFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
