import { loginUserActionCreator } from "../../store/features/userSlice/userSlice";
import decodeToken from "jwt-decode";
import { useAppDispatch } from "../../store/hooks";
import { CustomTokenPayload, LoginResponse, UserCredentials } from "./types";

interface UseUserStructure {
  loginUser: (userCredentials: UserCredentials) => Promise<void>;
}

const useUser = (): UseUserStructure => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const dispatch = useAppDispatch();

  const loginUser = async (userCredentials: UserCredentials) => {
    const response = await fetch(`${apiUrl}/users/login`, {
      method: "POST",
      body: JSON.stringify(userCredentials),
      headers: {
        "Content-type": "application/json",
      },
    });

    const { token } = (await response.json()) as LoginResponse;

    const tokenPayload: CustomTokenPayload = decodeToken(token);

    const { username, id } = tokenPayload;

    dispatch(loginUserActionCreator({ username, id, token }));
    localStorage.setItem("token", token);
  };

  return { loginUser };
};

export default useUser;
