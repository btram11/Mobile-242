import { buildHeaders } from ".";

const BaseUrl = process.env.EXPO_PUBLIC_API_URL + "/providers";

export const getProviders = async ({ page = 1, pageSize = 10 }) => {
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
  });

  const response = await fetch(`${BaseUrl}?${params.toString()}`, {
    method: "GET",
    headers: await buildHeaders(),
  });

  if (!response.ok)
    throw new Error(`Error fetching providers: ${response.statusText}`);

  const result = await response.json();
  return {
    data: result,
    nextPage: result.length < pageSize ? undefined : page + 1,
  };
};

export const getProviderById = async (providerId: string) => {
  const response = await fetch(`${BaseUrl}/${providerId}`, {
    method: "GET",
    headers: await buildHeaders(),
  });

  if (!response.ok)
    throw new Error(`Error fetching providers: ${response.statusText}`);

  const result = await response.json();
  return result;
};

export const getListingsOfProvider = async ({
  providerId,
  page = 1,
  pageSize = 10,
  inProgress,
  isComplete,
}: {
  providerId: string;
  page?: number;
  pageSize?: number;
  inProgress?: boolean;
  isComplete?: boolean;
}) => {
  const params = new URLSearchParams({
    page: page.toString(),
    pagesize: pageSize.toString(),
  });

  if (inProgress !== undefined) {
    params.append("inprogress", String(inProgress));
  }

  if (isComplete !== undefined) {
    params.append("iscomplete", String(isComplete));
  }
  const response = await fetch(
    `${BaseUrl}/${providerId}/listings?${params.toString()}`,
    {
      method: "GET",
      headers: await buildHeaders(),
    }
  );

  if (!response.ok)
    throw new Error(`Error fetching listings: ${response.statusText}`);

  const result = await response.json();
  return {
    data: result,
    nextPage: result.length < pageSize ? undefined : page + 1,
  };
};
