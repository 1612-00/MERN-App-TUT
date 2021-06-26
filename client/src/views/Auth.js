import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "./../components/auth/RegisterForm";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { Redirect } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const Auth = ({ authRoute }) => {
  // Load context
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  let body;

  // Đang xác thực người dùng, FE đang giao tiếp với BE -> Tạo Spinner chờ
  if (authLoading)
    body = (
      <div className="d-flex justify-content-center mt-2">
        <Spinner animation="border" variant="info" />
      </div>
    );
  // Người dùng hợp lệ -> đến trang dashboard
  else if (isAuthenticated) return <Redirect to="/dashboard" />;
  // Người dùng không hợp lệ -> quay lại form auth
  else
    body = (
      <>
        {authRoute === "login" && <LoginForm />}
        {authRoute === "register" && <RegisterForm />}
      </>
    );

  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1>LearnIt</h1>
          <h4>Keep track of what you are learning</h4>
          {body}
        </div>
      </div>
    </div>
  );
};

export default Auth;
