import { createContext, useReducer, useEffect } from "react";
import axios from "axios";
import { authReducer } from "../reducers/authReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constants";
import setAuthToken from "../utils/setAuthToken";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  // State mặc định của Auth context
  const [authState, dispatch] = useReducer(authReducer, {
    // Kiểm tra xem FE có đang tương tác với BE hay không
    // Kiểm tra xem đã đăng nhập thành công chưa
    // Thông tin người đăng nhập
    authLoading: true,
    isAuthenticated: false,
    user: null,
  });

  // Authenticate user
  const loadUser = async () => {
    // Nếu tồn tại auth token trong local storage
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      // Tạo header cho mọi req bằng token này
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    }

    try {
      // Gửi req đến server lấy về thông tin người dùng có auth token trên
      const response = await axios.get(`${apiUrl}/auth`);
      
      if (response.data.success) {       // Nếu lấy thành công, set các giá trị trong reduce
        dispatch({
          type: "SET_AUTH",
          // Đã xác thực đăng nhập và gán thông tin user
          payload: { isAuthenticated: true, user: response.data.user },
        });
      }
    } catch (error) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME); // Nếu lỗi, xóa token khỏi local storage

      setAuthToken(null); // Xóa header chứa token trên

      dispatch({
        // Gán lại các biến trong reduce như ban đầu
        type: "SET_AUTH",
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  };

  // Xác thực người dùng khi load lần đầu
  useEffect(() => loadUser(), []);

  // Login
  const loginUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, userForm);
      if (response.data.success)
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        );

      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // context data
  const authContextData = { loginUser, authState };

  // return provider
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
