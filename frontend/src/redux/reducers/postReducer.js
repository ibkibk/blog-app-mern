// import { FETCH_ALL, CREATE, DELETE } from "../types/types";
// const initState = {
//   posts: [],
// };
// const postReducer = (state = initState, action) => {
//   switch (action.type) {
//     case FETCH_ALL:
//       return {
//         ...state,
//         posts: action.payload,
//       };
//     case CREATE:
//       return {
//         ...state,
//         posts: [...state.posts.data, action.payload],
//       };
//     case DELETE:
//       console.log(state.posts.data);
//       return {
//         ...state,
//         posts: [
//           ...state.posts.data,
//           state.posts.data.filter((post) => post._id !== action.payload),
//         ],
//       };
//     default:
//       return state;
//   }
// };

// export default postReducer;

import { FETCH_ALL, CREATE, DELETE, UPDATE, LIKE } from "../types/types";

const postReducer = (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...posts, action.payload];
    case UPDATE:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case LIKE:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case DELETE:
      return posts.filter((post) => post._id !== action.payload);
    default:
      return posts;
  }
};

export default postReducer;
