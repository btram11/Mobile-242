import { buildHeaders } from ".";

const BaseUrl = process.env.EXPO_PUBLIC_API_URL + "/books";

export const getBooks = async (
  page: number = 1,
  pageSize: number = 10,
  keyword: string = "",
  sortby: string = "",
  isSold?: boolean,
  isRented?: boolean
) => {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    isSold: isSold?.toString() ?? "",
    isLeased: isRented?.toString() ?? "",
    keyword: keyword ?? "",
    sortby: sortby ?? "",
  });
  const response = await fetch(`${BaseUrl}?${params.toString()}`, {
    method: "GET",
    headers: await buildHeaders(),
  });

  if (!response.ok)
    throw new Error(`Error fetching books: ${response.statusText}`);

  const result = await response.json();
  return result.books;
};

export const getBookById = async (bookId: string) => {
  const response = await fetch(`${BaseUrl}/${bookId}`, {
    method: "GET",
    headers: await buildHeaders(),
  });

  if (!response.ok)
    throw new Error(`Error fetching book: ${response.statusText}`);

  const result = await response.json();
  // await delay(30000);

  return result.book;
};

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
