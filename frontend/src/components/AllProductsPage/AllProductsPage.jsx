import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from "../../redux/products";
import ProductCard from "../ProductCard";
import './AllProductsPage.css';


function ProductsPage() {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products); // Adjust according to your state shape
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
      dispatch(fetchProducts()).then(() => setLoaded(true));
    }, [dispatch]);

    return (
      <div className="products-page">
        <div className="product-container">
          {loaded && products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    );
  }

  export default ProductsPage;
