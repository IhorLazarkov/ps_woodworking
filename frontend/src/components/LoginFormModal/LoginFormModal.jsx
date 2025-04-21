import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  const handleDemoLogin = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email: "demo@aa.io",
        password: "password",
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <>
      <div className="modal-content">
        <div className="modal-header">
          <h1>Log In</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-form">
            <div className="input-fields">
              <label className="email">
                Email:
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="email-input"
                />
              </label>
              {errors.email && <p>{errors.email}</p>}
              <label className="password">
                Password:
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="password-input"
                />
              </label>
            </div>
            {errors.password && <p>{errors.password}</p>}
            <div className="login-buttons">
              <button className="log-in-button" type="submit">Log In</button>
              <button className="log-in-demo-button" type="button" onClick={handleDemoLogin}>
                Demo Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginFormModal;
