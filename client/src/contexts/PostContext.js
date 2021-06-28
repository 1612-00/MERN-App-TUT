import axios from "axios";
import { createContext, useReducer, useState } from "react";
import { postReducer } from "../reducers/postReducer";
import {
  ADD_POST,
  apiUrl,
  POSTS_LOADED_FAIL,
  POSTS_LOADED_SUCCESS,
} from "./constants";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  // State
  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });

  // Reducer
  const [postsState, dispatch] = useReducer(postReducer, {
    posts: [],
    postsLoading: true,
  });

  // Get all posts
  const getPosts = async () => {
    try {
      const res = await axios.get(`${apiUrl}/posts`);
      if (res.data.success) {
        dispatch({ type: POSTS_LOADED_SUCCESS, payload: res.data.posts });
      }
    } catch (error) {
      dispatch({ type: POSTS_LOADED_FAIL });
    }
  };

  const addPost = async (newPost) => {
    try {
      const res = await axios.post(`${apiUrl}/posts`, newPost);
      if (res.data.success) {
        dispatch({ type: ADD_POST, payload: res.data.post });
        return res.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  const postContextData = {
    postsState,
    getPosts,
    showAddPostModal,
    setShowAddPostModal,
    addPost,
    showToast,
    setShowToast,
  };

  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
