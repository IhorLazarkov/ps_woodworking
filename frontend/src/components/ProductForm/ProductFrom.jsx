import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createProduct, updateProduct, fetchProductDetails } from '../../redux/products';
import './ProductForm.css';
import Loading from '../Loading';
import ErrorMessage from '../ErrorMessage';

function ProductForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();
  const productDetails = useSelector(state => state.products.product);
  const loading = useSelector(state => state.products.loading);
  const error = useSelector(state => state.products.error);
  const [isEditMode, setIsEditMode] = useState(false);
  const [product_name, setProductName] = useState('');
  const [product_price, setProductPrice] = useState('');
  const [department, setDepartment] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [image4, setImage4] = useState('');
  const [image5, setImage5] = useState('');

  useEffect(() => {
    if (productId) {
      setIsEditMode(true);
      dispatch(fetchProductDetails(productId));
    }
  }, [dispatch, productId]);

  useEffect(() => {
    if (isEditMode && productDetails) {
      setProductName(productDetails.product_name || '');
      setProductPrice(productDetails.product_price || '');
      setDepartment(productDetails.department || '');
      setQuantity(productDetails.quantity || '');
      setDescription(productDetails.description || '');
      // You'll need to adjust how you fetch and populate existing images for editing
      // based on how your backend returns them.
      // For now, we'll leave these empty for the edit form.
      setPreviewImage('');
      setImage1('');
      setImage2('');
      setImage3('');
      setImage4('');
      setImage5('');
    } else if (!isEditMode) {
      setProductName('');
      setProductPrice('');
      setDepartment('');
      setQuantity('');
      setDescription('');
      setPreviewImage('');
      setImage1('');
      setImage2('');
      setImage3('');
      setImage4('');
      setImage5('');
    }
  }, [isEditMode, productDetails]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('product_name', product_name);
    formData.append('product_price', product_price);
    formData.append('department', department);
    formData.append('quantity', quantity);
    formData.append('description', description);
    formData.append('previewImage', previewImage);
    if (image1) formData.append('image1', image1);
    if (image2) formData.append('image2', image2);
    if (image3) formData.append('image3', image3);
    if (image4) formData.append('image4', image4);
    if (image5) formData.append('image5', image5);

    try {
      if (isEditMode && productId) {
        // For updating, you might need a different endpoint or way to handle images
        // This example assumes you can update product details. Image updates might be separate.
        await dispatch(updateProduct(productId, Object.fromEntries(formData)));
        navigate(`/product/${productId}`);
      } else {
        const newProduct = await dispatch(createProduct(formData));
        navigate(`/product/${newProduct.id}`);
      }
    } catch (err) {
      console.error('Error creating/updating product:', err);
      // Handle error
    }
  };

  const handleCancel = () => {
    navigate('/products');
  };

  if (loading) {
    return <Loading message={isEditMode ? "Loading Product Details..." : "Submitting Product..."} />;
  }

  if (error) {
    return <ErrorMessage message={`Error: ${error}`} />;
  }

  return (
    <div className="product-form-container">
      <h1>{isEditMode ? 'Edit Product' : 'Add New Product'}</h1>
      <form onSubmit={handleSubmit}>
        {/* Product Details Fields */}
        <div className="form-group">
          <label htmlFor="product_name">Name:</label>
          <input type="text" id="product_name" value={product_name} onChange={(e) => setProductName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="product_price">Price:</label>
          <input type="number" id="product_price" value={product_price} onChange={(e) => setProductPrice(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="department">Department:</label>
          <input type="text" id="department" value={department} onChange={(e) => setDepartment(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input type="number" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        {/* Image Handling */}
        <h2>Product Images</h2>
        <div className="form-group">
          <label htmlFor="previewImage">Preview Image URL:</label>
          <input type="url" id="previewImage" value={previewImage} onChange={(e) => setPreviewImage(e.target.value)} required />
          {previewImage.trim() && <img src={previewImage} alt="Preview" style={{ maxWidth: '100px', maxHeight: '100px' }} />}
        </div>
        <div className="form-group">
          <label htmlFor="image1">Image URL 1 (Optional):</label>
          <input type="url" id="image1" value={image1} onChange={(e) => setImage1(e.target.value)} />
          {image1.trim() && <img src={image1} alt="Image 1" style={{ maxWidth: '100px', maxHeight: '100px' }} />}
        </div>
        <div className="form-group">
          <label htmlFor="image2">Image URL 2 (Optional):</label>
          <input type="url" id="image2" value={image2} onChange={(e) => setImage2(e.target.value)} />
          {image2.trim() && <img src={image2} alt="Image 2" style={{ maxWidth: '100px', maxHeight: '100px' }} />}
        </div>
        <div className="form-group">
          <label htmlFor="image3">Image URL 3 (Optional):</label>
          <input type="url" id="image3" value={image3} onChange={(e) => setImage3(e.target.value)} />
          {image3.trim() && <img src={image3} alt="Image 3" style={{ maxWidth: '100px', maxHeight: '100px' }} />}
        </div>
        <div className="form-group">
          <label htmlFor="image4">Image URL 4 (Optional):</label>
          <input type="url" id="image4" value={image4} onChange={(e) => setImage4(e.target.value)} />
          {image4.trim() && <img src={image4} alt="Image 4" style={{ maxWidth: '100px', maxHeight: '100px' }} />}
        </div>
        <div className="form-group">
          <label htmlFor="image5">Image URL 5 (Optional):</label>
          <input type="url" id="image5" value={image5} onChange={(e) => setImage5(e.target.value)} />
          {image5.trim() && <img src={image5} alt="Image 5" style={{ maxWidth: '100px', maxHeight: '100px' }} />}
        </div>

        <div className="form-actions">
          <button type="submit">{isEditMode ? 'Update Product' : 'Add Product'}</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
