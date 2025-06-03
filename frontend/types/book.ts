export type Book = {
  book_id: string;
  listing_id: string;
  title: string;
  img_url: string | null;
  author: string;
  publisher: string;
  publishing_year: number;
  subject: string;
  summary: string | null;
  sold_price: number;
  leased_price: number;
};

export type BookListing = Book & {
  leased_period: number;
  is_sold: boolean;
  is_leased: boolean;
};
