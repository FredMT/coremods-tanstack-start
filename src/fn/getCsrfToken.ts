import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";
import axios from "axios";

export const getCsrfToken = createServerFn({
  method: "GET",
}).handler(async () => {
  const cookie = getCookie("X-XSRF-Token");

  try {
    if (cookie) return;

    const response = await axios.get("http://localhost:8080/csrf");

    if (response.status !== 200) return null;

    const data = response.data;

    setCookie(data.headerName, data.token);
  } catch (error) {
        console.error('Error getting CSRF token from getCsrfToken.ts', error)
    }
})
