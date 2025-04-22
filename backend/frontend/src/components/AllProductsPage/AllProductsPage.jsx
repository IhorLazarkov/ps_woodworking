import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { fetchProducts } from "../../redux/products";
import ProductCard from "../ProductCard";
import { NavLink } from "react-router-dom";
import './AllProductsPage.css';


function ProductsPage() {
  const dispatch = useDispatch();
  const { department } = useParams();
  const products = useSelector(state => state.products.products); // Adjust according to your state shape
  const [loaded, setLoaded] = useState(false);
  const [displayedProducts, setDisplayedProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts()).then(() => setLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    if (products) {
      if (department) {
        const filterProducts = products.filter(
          product => product.department && product.department.toLowerCase() === department.toLowerCase()
        );
        setDisplayedProducts(filterProducts);
      } else {
        setDisplayedProducts(products)
      }
    }
  }, [products, department])

  return (
    <div className="products-page">
      <h1>{department ? `${department.charAt(0).toUpperCase() + department.slice(1)} Products` : `All Products`}</h1>
      <div className="product-container">
        {loaded && displayedProducts.map(product => (
          <NavLink key={product.id} to={`/products/${product.id}`} className="product-card-link">
            <ProductCard product={product} />
          </NavLink>
        ))}

      </div>
    </div>
  );
}

export default ProductsPage;
