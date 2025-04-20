
import OpenModalButton from "../OpenModalButton"
import { useModal } from "../../context/Modal"
import { useDispatch } from "react-redux"
import { deleteProduct } from "../../redux/products"

function ProductCard({ id, name, department, description, previewImage }) {
    return (
        <div className="current_user_product_card">
            <img src={previewImage} alt="preview image" />
            <h3>{name}</h3>
            <div>{department}</div>
            <div>{description}</div>
            <div className="button_container">
                <OpenModalButton
                    className="primary"
                    buttonText="Update"
                    modalComponent={<UpdateButton />}
                />
                <OpenModalButton
                    className="critical"
                    buttonText="Delete"
                    modalComponent={<DeleteConfirmation id={id}/>}
                />
            </div>
        </div>
    )
}

function DeleteConfirmation({id}){
    const {closeModal} = useModal()
    const dispatch = useDispatch()
    const deleteHandler = () =>{
        if(dispatch){
            dispatch(deleteProduct(id)).then(()=>{
                closeModal();
            })
        }
    }
    return (
        <div id="delete_confirmation">
            <h3>Remove product?</h3>
            <div style={{display:"flex", justifyContent:"space-between"}}>
                <button className="critical" onClick={deleteHandler}>Yes</button>
                <button className="primary" onClick={closeModal}>No</button>
            </div>
        </div>
    )
}

function UpdateButton() {
    return (
        <div>Update</div>
    )
}

export default ProductCard