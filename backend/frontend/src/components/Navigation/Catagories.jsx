import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { fetchProducts } from "../../redux/products";


// Simple Modal Component
function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div style={styles.backdrop} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button style={styles.closeButton} onClick={onClose}>×</button>
                {children}
            </div>
        </div>
    );
}

function CategoriesModal() {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        if (products && products.length) {
            const uniqueDepartments = [...new Set(products.map(p => p.department))];
            setDepartments(uniqueDepartments);
        }
    }, [products]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="categories-modal">

            <button className="dropdown-toggle" onClick={openModal}>
                <FontAwesomeIcon icon={faBars} className="bars-icon" />
                Categories
            </button>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <ul style={styles.menu}>
                    {departments.map((dept) => (
                        <li key={dept}>
                            <NavLink style={styles.NavLink} to={`/products/c/${dept}`} onClick={closeModal}>
                                {dept}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </Modal>
        </div>
    );
}
// Basic styles for modal
const styles = {
    backdrop: {
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
    },
    modal: {
        background: 'white',
        padding: '20px',
        borderRadius: '8px',
        minWidth: '180px',
        position: 'fixed',
        top: '89px', left: '150px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
    },
    closeButton: {
        position: 'absolute',
        top: '10px',
        right: '15px',
        fontSize: '20px',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer'
    },
    menu: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
    },
    NavLink: {
        textDecoration: 'none',
        color: 'black',
        fontSize: '16px',
        padding: '10px 15px',
        borderRadius: '5px',
        transition: 'background-color 0.3s ease',
    }
};

export default CategoriesModal;
