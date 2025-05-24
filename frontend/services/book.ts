import { buildHeaders } from ".";

const BaseUrl = process.env.EXPO_PUBLIC_API_URL + "/books";

export const getBooks = async (
  page: number = 1,
  pageSize: number = 10,
  keyword?: string,
  sortby?: string,
  isSold?: boolean,
  isRented?: boolean
) => {
  const response = await fetch(
    `${BaseUrl}?page=${page}&pageSize=${pageSize}
                &isSold${isSold}=&isLeased=${isRented}
                &keyword=${keyword}&sortby=${sortby}`,
    {
      method: "GET",
      headers: await buildHeaders(),
    }
  );

  if (!response.ok)
    throw new Error(`Error fetching books: ${response.statusText}`);

  const result = await response.json();
  return result;
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
