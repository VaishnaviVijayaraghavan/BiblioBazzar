import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export let loginuser = createAsyncThunk(
  "userlogin",
  async (usercredobj, thunkApi) => {
    let res = await axios.post("http://localhost:5000/user/login", usercredobj);
    let serverdata = res.data;
    if (serverdata.message == "login successfully") {
      localStorage.setItem("token", serverdata.token);
      return serverdata.user;
    } else {
      return thunkApi.rejectWithValue(serverdata.message);
    }
  }
);

export let userSlice = createSlice({
  name: "user",
  initialState: {
    obj: null,
    isuserlogin: false,
    ispending: false,
    iserror: false,
    errmsg: "",
  },
  reducers: {
    userlogout(state, action) {
      //remove the token in storage
      localStorage.removeItem("token");
      state.obj = null;
      state.iserror = false;
      state.errmsg = "";
      state.isuserlogin = false;
    },
  },
  extraReducers: {
    [loginuser.pending]: (state, action) => {
      state.ispending = true;
    },
    [loginuser.fulfilled]: (state, action) => {
      state.obj = action.payload;
      state.ispending = false;
      state.isuserlogin = true;
      state.iserror = false;
      state.errmsg = "";
    },
    [loginuser.rejected]: (state, action) => {
      state.ispending = false;
      state.iserror = true;
      state.errmsg = action.payload;
      state.obj = null;
    },
  },
});

//export action creator function
export const { userlogout } = userSlice.actions;
// export reducer of todoslice
export default userSlice.reducer;
