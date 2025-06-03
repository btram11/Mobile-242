import { buildHeaders } from ".";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BaseUrl = process.env.EXPO_PUBLIC_API_URL + "/books";

export const getBooks = async ({
  page = 1,
  pageSize = 10,
  keyword = "",
  sortby = "",
  category = "",
  issold,
  isleased,
}: {
  page?: number;
  pageSize?: number;
  keyword?: string;
  sortby?: string;
  category?: string;
  issold?: boolean;
  isleased?: boolean;
}) => {
  const params = new URLSearchParams({
    page: String(page),
    pagesize: String(pageSize),
    issold: issold?.toString() ?? "",
    isleased: isleased?.toString() ?? "",
    keyword: keyword ?? "",
    sortby: sortby ?? "",
    category: category ?? "",
  });
  const response = await fetch(`${BaseUrl}?${params.toString()}`, {
    method: "GET",
    headers: await buildHeaders(),
  });

  if (!response.ok)
    throw new Error(`Error fetching books: ${response.statusText}`);

  const result = await response.json();
  return {
    data: result.books,
    nextPage: result.books.length < pageSize ? undefined : page + 1,
  };
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
  const response = await fetch(`${BaseUrl}/${bookId}/listings/${listingId}`, {
    method: "GET",
    headers: await buildHeaders(),
  });

  if (!response.ok)
    throw new Error(`Error fetching books: ${response.statusText}`);

  const result = await response.json();
  return result.book;
};

export const deleteListingByBookIdandListingId = async (
  bookId: string,
  listingId: string
) => {
  const response = await fetch(`${BaseUrl}/${bookId}/listings/${listingId}`, {
    method: "DELETE",
    headers: await buildHeaders(),
  });
  if (!response.ok)
    throw new Error(`Error deleting listing: ${response.statusText}`);
  const result = await response.json();
  return result;
};

export const getBuyerInfo = async (bookId: string, listingId: string) => {
  const response = await fetch(
    `${BaseUrl}/${bookId}/listings/${listingId}/buyer`,
    {
      method: "GET",
      headers: await buildHeaders(),
    }
  );
  if (!response.ok)
    throw new Error(`Error fetching buyer info: ${response.statusText}`);
  const result = await response.json();

  return result.book.user;
};

export const getSimilarBooks = async (
  bookId: string,
  page: number = 1,
  pageSize: number = 10
) => {
  const params = new URLSearchParams({
    page: String(page),
    pagesize: String(pageSize),
  });

  const response = await fetch(
    `${BaseUrl}/${bookId}/similar-books?${params.toString()}`,
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
    `${BaseUrl}/${bookId}/listings/${listingId}/buying`,
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

export const confirmBuyBook = async (bookId: string, listingId: string) => {
  const response = await fetch(
    `${BaseUrl}/${bookId}/listings/${listingId}/buying`,
    {
      method: "PATCH",
      headers: await buildHeaders(),
    }
  );

  const result = await response.json();
  if (!response.ok) throw new Error(`Error renting book: ${result.code}`);
  return result;
};

export const cancelBuyBook = async (bookId: string, listingId: string) => {
  const response = await fetch(
    `${BaseUrl}/${bookId}/listings/${listingId}/buying`,
    {
      method: "DELETE",
      headers: await buildHeaders(),
    }
  );

  if (!response.ok)
    throw new Error(`Error renting book: ${response.statusText}`);

  const result = await response.json();
  return result;
};

export const rentBook = async (
  bookId: string,
  listingId: string,
  startDate: string,
  endDate: string
) => {
  const response = await fetch(
    `${BaseUrl}/${bookId}/listings/${listingId}/renting`,
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

export const confirmRentBook = async (bookId: string, listingId: string) => {
  const response = await fetch(
    `${BaseUrl}/${bookId}/listings/${listingId}/renting`,
    {
      method: "PATCH",
      headers: await buildHeaders(),
    }
  );

  if (!response.ok)
    throw new Error(`Error confirming rent book: ${response.statusText}`);

  const result = await response.json();
  return result;
};

export const cancelRentBook = async (bookId: string, listingId: string) => {
  const response = await fetch(
    `${BaseUrl}/${bookId}/listings/${listingId}/renting`,
    {
      method: "DELETE",
      headers: await buildHeaders(),
    }
  );
  if (!response.ok)
    throw new Error(`Error cancelling rent book: ${response.statusText}`);
  const result = await response.json();
  return result;
};

export const addListingForBook = async (
  bookId: string,
  listingData: {
    is_sold: boolean;
    is_leased: boolean;
    sold_price: number;
    leased_price: number;
    leased_period: number;
    condition: string;
  }
) => {
  const response = await fetch(`${BaseUrl}/${bookId}/listings`, {
    method: "POST",
    headers: await buildHeaders(),
    body: JSON.stringify(listingData),
  });

  if (!response.ok)
    throw new Error(`Error adding listing for book: ${response.statusText}`);

  const result = await response.json();
  return result;
};

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
