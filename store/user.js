// // src/store.js
// import { createStore, applyMiddleware } from 'redux';
// import thunkMiddleware from 'redux-thunk';
// import axios from 'axios';
// import jwt from 'jsonwebtoken';

// // Define initial state
// const initialState = {
//   user: [],
//   isLoading: false,
//   error: null,
// };

// // Define action types
// const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
// const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
// const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';

// // Define action creators
// const fetchDataRequest = () => ({
//   type: FETCH_DATA_REQUEST,
// });

// const fetchDataSuccess = (data) => ({
//   type: FETCH_DATA_SUCCESS,
//   payload: data,
// });

// const fetchDataFailure = (error) => ({
//   type: FETCH_DATA_FAILURE,
//   payload: error,
// });

// // Define thunk action creator
// export const fetchUser = (token) => {
//   console.log(token);
//   return async (dispatch) => {
//     dispatch(fetchDataRequest());
//     try {
//       const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_TOKEN_KEY);
//       console.log(decoded);
//       const response = await axios.get('/user', {
//         headers: {
//           Authorization: 'Bearer ' + token,
//         },
//       });
//       dispatch(fetchDataSuccess(response.data?.msg));
//     } catch (error) {
//       console.log(error.message);
//       dispatch(fetchDataFailure(error.message));
//     }
//   };
// };

// // Define reducer
// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case FETCH_DATA_REQUEST:
//       return {
//         ...state,
//         isLoading: true,
//         error: null,
//       };
//     case FETCH_DATA_SUCCESS:
//       return {
//         ...state,
//         isLoading: false,
//         data: action.payload,
//       };
//     case FETCH_DATA_FAILURE:
//       return {
//         ...state,
//         isLoading: false,
//         error: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// // Create and export store
// export const user = createStore(reducer, applyMiddleware(thunkMiddleware));

// userStore.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

// Define the initial state of the store
const initialState = {
  user: null,
  loading: false,
  error: null,
};

// Define an async thunk to fetch user data from an API
export const fetchUser = createAsyncThunk('user/fetchUser', async (token) => {
  //   const response = await axios.get(`user/`, {
  //     headers: {
  //       Authorization: 'Bearer ' + token,
  //     },
  //   });
  const decoded = jwtDecode(token);
  return decoded;
});

// Define a slice to handle actions and reducers for the user store
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default userSlice.reducer;

// // shopStore.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Define the initial state of the store
// const initialState = {
//   shop: null,
//   loading: false,
//   error: null
// };

// // Define an async thunk to fetch shop data from an API
// export const fetchShop = createAsyncThunk('shop/fetchShop', async () => {
//   const response = await axios.get('https://api.example.com/shop');
//   return response.data;
// });

// // Define a slice to handle actions and reducers for the shop store
// const shopSlice = createSlice({
//   name: 'shop',
//   initialState,
//   reducers: {},
//   extraReducers: builder => {
//     builder
//       .addCase(fetchShop.pending, state => {
//         state.loading = true;
//       })
//       .addCase(fetchShop.fulfilled, (state, action) => {
//         state.shop = action.payload;
//         state.loading = false;
//       })
//       .addCase(fetchShop.rejected, (state, action) => {
//         state.error = action.error.message;
//         state.loading = false;
//       });
//   }
// });

// export default shopSlice.reducer;
// export { fetchShop };
