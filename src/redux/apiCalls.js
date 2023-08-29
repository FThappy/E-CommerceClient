import { publicRequest, userRequest } from "../requestMethods";
import { updateUserFailure, updateUserStart, updateUserSuccess } from "./userRedux";
import { loginStart, loginFailure, loginSuccess } from "./userRedux";

export const login = async (dispatch,user)=>{
    dispatch(loginStart());
    try{
        const res = await publicRequest.post("/auth/loginUser",user)
        dispatch(loginSuccess(res.data))
    }catch(err){
        if (err.response && err.response.status === 401) {
          // Xử lý lỗi 401 ở đây
          dispatch(loginFailure("Wrong credentials!"));
        } else {
          // Xử lý các lỗi khác ở đây
          console.log(err);
          dispatch(loginFailure("An error occurred."));
        }
    }
    
}
export const updateUser = async (id, user, dispatch) => {
  dispatch(updateUserStart());
  try {
    console.log(user)
    const res = await userRequest.put(`/users/${id}`, user);
    dispatch(updateUserSuccess({ id, user }));
  } catch (err) {
    dispatch(updateUserFailure());
  }
};