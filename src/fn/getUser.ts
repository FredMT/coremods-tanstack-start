import { createServerFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";

export const getUser = createServerFn({
  method: "GET",
}).handler(async () => {
  try {
    const cookie = getCookie("SESSION");

    if (!cookie) return null;

    const response = await fetch("http://localhost:8080/api/user/me", {
      headers: {
        Cookie: `SESSION=${cookie}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    console.error("Error getting user from getUser.ts", error);
  }
});
