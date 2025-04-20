
function ProductCard({ name, department, description, previewImage }) {
    return (
        <div className="current_user_product_card">
            <img src={previewImage} alt="preview image" />
            <h3>{name}</h3>
            <div>{department}</div>
            <div>{description}</div>
            <div className="button_container">
                <button className="primary">Update</button>
                <button className="critical">Delete</button>
            </div>
        </div>
    )
}
export default ProductCard