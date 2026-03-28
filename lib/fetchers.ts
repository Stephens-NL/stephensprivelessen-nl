export const jsonFetcher = (url: string) =>
  fetch(url).then((res) => res.json());

export const safeFetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error(`Failed to fetch ${url}`);
    return res.json();
  });
