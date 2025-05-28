import { buildHeaders } from ".";

const BaseUrl = process.env.EXPO_PUBLIC_API_URL + "/providers";

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
