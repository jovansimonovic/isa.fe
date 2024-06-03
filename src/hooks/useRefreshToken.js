import { post } from "@/core/httpClient";
import { signIn, useSession } from "next-auth/react";

export const useRefreshToken = () => {
  const { data: session } = useSession();

  console.log(session);

  const headers = {
    authorization: `Bearer ${session?.user?.refreshToken}`,
  };

  const refreshToken = async () => {
    const response = await post("/auth/refresh-token", {}, { headers });

    if (session && response && response.status === 200 && response.data) {
      await update({
        ...session,
        user: {
          ...session?.user,
          token: response.data.token,
          refreshToken: response.data.refreshToken,
        },
      });

      return { token: response.data.token };
    } else {
      await signIn();
    }
  };

  return refreshToken;
};
