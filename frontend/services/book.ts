import { buildHeaders } from ".";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

export const getBookDetailByBookIdandListingId = async (
  bookId: string,
  listingId: string
) => {
  const response = await fetch(`${BaseUrl}/${bookId}/listing/${listingId}`, {
    method: "GET",
    headers: await buildHeaders(),
  });

  if (!response.ok)
    throw new Error(`Error fetching books: ${response.statusText}`);

  const result = await response.json();
  return result.book;
};

export const getSimilarBooks = async (
  bookId: string,
  page: number = 1,
  pageSize: number = 10
) => {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  });

  const response = await fetch(
    `${BaseUrl}/${bookId}/similarBooks?${params.toString()}`,
    {
      method: "GET",
      headers: await buildHeaders(),
    }
  );

  if (!response.ok)
    throw new Error(`Error fetching similar books: ${response.statusText}`);
  const result = await response.json();
  return result.books;
};

export const getBookListings = async (bookId: string) => {
  const params = new URLSearchParams({
    bookid: bookId,
  });
  const response = await fetch(`${BaseUrl}/listings?${params.toString()}`, {
    method: "GET",
    headers: await buildHeaders(),
  });

  if (!response.ok)
    throw new Error(`Error fetching book listings: ${response.statusText}`);

  const result = await response.json();
  return result.book;
};

export const buyBook = async (bookId: string, listingId: string) => {
  const response = await fetch(
    `${BaseUrl}/${bookId}/listing/${listingId}/buy`,
    {
      method: "POST",
      headers: await buildHeaders(),
      body: JSON.stringify({
        user_id: await AsyncStorage.getItem("userId"),
        modifiable: true,
      }),
    }
  );

  const result = await response.json();
  if (!response.ok) throw new Error(`Error renting book: ${result.code}`);
  return result;
};

export const rentBook = async (
  bookId: string,
  listingId: string,
  startDate: string,
  endDate: string
) => {
  const response = await fetch(
    `${BaseUrl}/${bookId}/listing/${listingId}/rent`,
    {
      method: "POST",
      headers: await buildHeaders(),
      body: JSON.stringify({
        user_id: await AsyncStorage.getItem("userId"),
        modifiable: true,
        pickup_date: new Date(startDate).toISOString(),
        end_date: new Date(endDate).toISOString(),
      }),
    }
  );

  if (!response.ok)
    throw new Error(`Error renting book: ${response.statusText}`);

  const result = await response.json();
  return result;
};

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
