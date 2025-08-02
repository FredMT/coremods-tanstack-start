import { LoginFormSchema } from "@/routes/login/-types/LoginFormSchema";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { setCookie } from "@tanstack/react-start/server";

export const loginServerFn = createServerFn({ method: "POST" })
  .validator((data) => {
    if (!(data instanceof FormData)) {
      throw new Error("Invalid form data");
    }

    const usernameOrEmail = data.get("usernameOrEmail");
    const password = data.get("password");
    const rememberMe = data.get("rememberMe");

    const validatedData = LoginFormSchema.parse({
      usernameOrEmail: usernameOrEmail?.toString(),
      password: password?.toString(),
      rememberMe: Boolean(rememberMe),
    });

    return validatedData;
  })
  .handler(async ({ data: { usernameOrEmail, password, rememberMe } }) => {
    const res = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        usernameOrEmail,
        password,
        rememberMe,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to login");
    }

    const headers = res.headers;
    const setCookieHeaders = headers.getSetCookie();

    const sessionCookie = setCookieHeaders.find((header) =>
      header.startsWith("SESSION=")
    );

    if (sessionCookie) {
      const [nameValue, ...attributeParts] = sessionCookie.split(";");
      const [, value] = nameValue.split("=");
      const options: Record<string, any> = {};
      attributeParts.forEach((part) => {
        const trimmed = part.trim();

        switch (true) {
          case trimmed.startsWith("Path="):
            options.path = trimmed.slice(5);
            break;
          case trimmed.startsWith("Domain="):
            options.domain = trimmed.slice(7);
            break;
          case trimmed.startsWith("Max-Age="):
            options.maxAge = parseInt(trimmed.slice(8), 10);
            break;
          case trimmed.startsWith("Expires="):
            options.expires = new Date(trimmed.slice(8));
            break;
          case trimmed === "HttpOnly":
            options.httpOnly = true;
            break;
          case trimmed === "Secure":
            options.secure = true;
            break;
          case trimmed.startsWith("SameSite="):
            options.sameSite = trimmed.slice(9).toLowerCase();
            break;
        }
      });

      setCookie("SESSION", value, options);
    }

    throw redirect({
      to: "/",
    });
  });
