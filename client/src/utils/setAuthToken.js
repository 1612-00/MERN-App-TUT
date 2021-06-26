import axios from 'axios'

// Tạo header req bởi token nhận được
const setAuthToken = token => {
  if(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}

export default setAuthToken