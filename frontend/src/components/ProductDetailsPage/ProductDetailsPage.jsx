import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductDetails } from '../../redux/products'
import './ProductDetailsPage.css';


export const ProductDetails = () => {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const product = useSelector((state) => state.products.productDetails);

    // fetch
    useEffect(() => {
        dispatch(fetchProductDetails(productId));
    }, [dispatch, productId]);

    return (
        <div className='product-details'>
			<div className='product-main-titles'>
				<h1 className='product-details-title'>{product.name}</h1>
			</div>
			<div className='product-details-info'>
				<div className='product-seller-description'>
					<p className='product-seller'>
						{`Sold by ${product.Seller?.firstName}`}
					</p>
					<p className='product-description'>{product.description}</p>
				</div>
				<div className='purchase-product-div'>
					<div className='price-review-title'>
						<p className='purchase-price'>{`$${product.price}`}</p>
						<p className='product-review'>
							<faStar />
							{product.avgStarRating}
							{product.numReviews
								? ` · ${product.numReviews} ${product.numReviews}`
								: 'New'}
						</p>
					</div>
					<button
						className='purchase-btn'
					>
						Purchase
					</button>
				</div>
			</div>
			<div className='line-break'></div>
			<div className='review-content'>
				<div className='review-heading'>
					<p className='review-title'>
						<faStar />
						{product.avgRating}{' '}
						{product.numReviews
							? `· ${product.numReviews} ${product.numReviews}`
							: 'New'}
					</p>
				</div>
			</div>
		</div>
    )
}


export default ProductDetails;
