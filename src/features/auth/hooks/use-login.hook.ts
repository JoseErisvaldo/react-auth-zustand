import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store/auth.store";
import { loginService } from "../services/auth.service";

export default function useLogin() {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: loginService,
    onSuccess: (data) => {
      setAuth({
        user: data.data.user,
        accessToken: data.data.accessToken,
        refreshToken: data.data.refreshToken,
      });
    },
  });
}
