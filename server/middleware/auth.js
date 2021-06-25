const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // Khi người dùng gửi req login, server sẽ trả về 1 đoạn token được tạo với tài khoản đó
  // Ta cắt và lấy phần token đó 
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  // Nếu không tồn tại token - người dùng gửi req lung tung or tài khoản không tồn tại
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Access token not found" });

  // Đã có token
  try {
    // Kiểm tra token chính xác không bằng SECRET KEY lúc tạo token khi register
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Gán cho req userId chính xác khi đã xác thực xong
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ success: false, message: "Invalid token" });
  }
};

module.exports = verifyToken
