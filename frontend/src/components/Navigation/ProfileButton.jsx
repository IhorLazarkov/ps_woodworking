import { useState, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from 'react-icons/fa';
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import ProductForm from "../ProductForm/ProductFrom";



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

function ProfileButton() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.session.user);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);
  const closeModal = () => setShowModal(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeModal();
  };

  return (
    <>
      <button onClick={toggleModal} className="profile-button">
        <FaUserCircle className="profile-icon" />
      </button>

      <Modal isOpen={showModal} onClose={closeModal}>
        {user ? (
          <ul style={styles.menu}>
            <li>{user.username}</li>
            <li>{user.email}</li>
            <OpenModalMenuItem
              itemText="Add Product"
              onItemClick={closeModal}
              modalComponent={<SignupFormModal />}
            />
            <OpenModalMenuItem
              itemText="My Products"
              onItemClick={closeModal}
              modalComponent={<ProductForm />}
            />
            <li>
              <button onClick={logout}>Log Out</button>
            </li>
          </ul>
        ) : (
          <ul style={styles.menu}>
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeModal}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeModal}
              modalComponent={<SignupFormModal />}
            />
          </ul>
        )}
      </Modal>
    </>
  );
}

const styles = {
  backdrop: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
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
    top: '89px', right: '80px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '15px',
    background: 'transparent',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer'
  },
  menu: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  }
};

export default ProfileButton;
