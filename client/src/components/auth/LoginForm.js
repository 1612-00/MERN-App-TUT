import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useHistory } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const LoginForm = () => {
  // Context
  const { loginUser } = useContext(AuthContext);

  // Router
  const history = useHistory();

  // Local state
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const { username, password } = loginForm;

  const onChangeLoginForm = (e) =>
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });

  const login = async (e) => {
    e.preventDefault();

    try {
      const loginData = await loginUser(loginForm);
      if (loginData.success) {
        history.push("/dashboard");
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form className="my-3" onSubmit={login}>
        <Form.Group className="my-3">
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            require
            value={username}
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <Form.Group className="my-3">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            require
            value={password}
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <Button variant="success" type="submit" className="mt-2">
          Login
        </Button>
      </Form>
      <p>
        Don't have an account?
        <Link to="register">
          <Button variant="info" size="sm" className="ml-2">
            Register
          </Button>
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
