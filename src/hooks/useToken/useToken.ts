import decodeToken from "jwt-decode";
import { useCallback } from "react";
import { loginUserActionCreator } from "../../store/features/userSlice/userSlice";
import { useAppDispatch } from "../../store/hooks";
import { CustomTokenPayload } from "../useUser/types";

interface UseTokenStructure {
  getToken: () => void;
}

const useToken = (): UseTokenStructure => {
  const dispatch = useAppDispatch();

  const getToken = useCallback(() => {
    const token = localStorage.getItem("token"); // Cambiar magic string

    if (token) {
      const { id, username } = decodeToken<CustomTokenPayload>(token);

      dispatch(loginUserActionCreator({ token, id, username }));
    }
  }, [dispatch]);

  return { getToken };
};

export default useToken;
