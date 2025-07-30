import { createServerFn } from "@tanstack/react-start";
import axios from "axios";

export const getSearchGamesFn = createServerFn({ method: "GET" })
  .validator((d: { q: string }) => d)
  .handler(async ({ data: { q } }) => {
    console.info("Fetching posts...");
    const response = await axios.get(
      `http://localhost:8080/api/v1/games/search?q=${q}`
    );
    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const responseData: Array<PostType> = response.data;
    return responseData;
  });

type PostType = {
  id: string;
  title: string;
  body: string;
};
