import { HttpError } from "@/lib/Errors";
import { buildHeaders } from ".";

const BaseUrl = process.env.EXPO_PUBLIC_API_URL + "/access";

export const login = async (email: string, password: string) => {
  const response = await fetch(`${BaseUrl}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
  if (!response.ok) throw new HttpError(response.statusText, response.status);

  const result = await response.json();

  if (result.status !== 200) throw new HttpError(result.message, result.status);

  return result;

  // return { access_token: "token", userId: "userId" }; // Mocked response
};

export const logout = async () => {
  const response = await fetch(`${BaseUrl}/user/logout`, {
    method: "POST",
    headers: await buildHeaders(),
  });

  if (!response.ok) throw new HttpError(response.statusText, response.status);

  const result = await response.json();
  if (result.status !== 200) throw new HttpError(result.message, result.status);

  return result;
};
