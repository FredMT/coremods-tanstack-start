import { queryOptions } from "@tanstack/react-query";
import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import axios from "axios";
import { getSearchGamesFn } from "../-fn/getSearchGames";

export type PostType = {
  id: string;
  title: string;
  body: string;
};

export interface ApiResponseListGameSummaryResponse {
  message: string;
  data: GameSummaryResponse[] | [];
}

export interface GameSummaryResponse {
  id: number;
  name: string;
  cover?: Cover;
}

export interface Cover {
  image_id: string;
}

export const fetchGames = createServerFn({ method: "GET" })
  .validator((d: { q: string }) => d)
  .handler(async ({ data }) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const response = await axios.get(
      `http://localhost:8080/api/v1/games/search?q=${data.q}`
    );

    if (response.status === 404) {
      throw notFound();
    }

    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const gamesResponse: ApiResponseListGameSummaryResponse = response.data;
    return gamesResponse;
  });

export const gamesQueryOptions = (query: string) =>
  queryOptions({
    queryKey: ["searchGames", query],
    queryFn: () => fetchGames({ data: { q: query } }),
  });
