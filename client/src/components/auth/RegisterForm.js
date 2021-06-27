import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "./../layout/AlertMessage";

const RegisterForm = () => {
  // Local state
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [alert, setAlert] = useState(null);

  // Context
  const { registerUser } = useContext(AuthContext);

  const { username, password, confirmPassword } = registerForm;

  const onChangeRegisterForm = (e) =>
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });

  // Login
  const register = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setAlert({ type: "danger", message: "Password is not match" });
      setTimeout(() => setAlert(null), 4000);
    }

    try {
      const registerData = await registerUser(registerForm);
      if (!registerData.success) {
        setAlert({ type: "danger", message: registerData.message });
        setTimeout(() => setAlert(null), 4000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form className="my-3" onSubmit={register}>
        <AlertMessage info={alert} />
        <Form.Group className="my-3">
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            require
            value={username}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Form.Group className="my-3">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            require
            value={password}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Form.Group className="my-3">
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            require
            value={confirmPassword}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Button variant="success" type="submit" className="mt-2">
          Register
        </Button>
      </Form>
      <p>
        Already have an account?
        <Link to="login">
          <Button variant="info" size="sm" className="ml-2">
            Login
          </Button>
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
