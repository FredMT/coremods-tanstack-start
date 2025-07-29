import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";

export const getCsrfToken = createServerFn({
  method: "GET",
}).handler(async () => {
  const cookie = getCookie("X-XSRF-Token");

  try {
    if (!cookie) return null;

    const response = await fetch("http://localhost:8080/csrf", {
      credentials: "include",
    });

    if (!response.ok) return null;

    const data = await response.json();

    setCookie(data.headerName, data.value);
  } catch (error) {
    console.error("Error getting CSRF token from getCsrfToken.ts", error);
  }
});
