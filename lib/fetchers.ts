/** Basic JSON fetcher for SWR — no error handling (SWR retries) */
export const jsonFetcher = (url: string) =>
  fetch(url).then((res) => res.json());

/** Safe fetcher that throws on non-OK responses */
export const safeFetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error(`Failed to fetch ${url}`);
    return res.json();
  });
