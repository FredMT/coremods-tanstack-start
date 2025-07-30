import { createServerFn } from "@tanstack/react-start";
import { deleteCookie, getCookie } from "@tanstack/react-start/server";
import axios, { AxiosError } from "axios";

export const getUser = createServerFn({
  method: "GET",
}).handler(async () => {
  try {
    const cookie = getCookie("SESSION");

    if (!cookie) return null;

    const response = await axios.get("http://localhost:8080/api/user/me", {
      headers: {
        Cookie: `SESSION=${cookie}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        deleteCookie("SESSION");
        return null;
      }
    }
    console.error("Non 401 error getting user from getUser.ts", error);
  }
});
