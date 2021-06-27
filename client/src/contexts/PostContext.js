import axios from "axios";
import { createContext, useReducer } from "react";
import { postReducer } from "../reducers/postReducer";
import { apiUrl, POSTS_LOADED_FAIL, POSTS_LOADED_SUCCESS } from "./constants";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
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

  const postContextData = { postsState, getPosts };

  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
