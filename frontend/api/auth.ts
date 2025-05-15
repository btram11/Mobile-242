import { HttpError } from "@/lib/Errors";

const BaseUrl = process.env.EXPO_PUBLIC_API_URL + "/access";

export const login = async (email: string, password: string) => {
  console.log("here");
  const response = await fetch(`${BaseUrl}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // CLIENT_ID: "x-client-id",
      // AUTHORIZATION: "authorization",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
  console.log(response);
  if (!response.ok) throw new HttpError(response.statusText, response.status);

  const result = await response.json();
  console.log(result);
  if (result.status !== 200) throw new HttpError(result.message, result.status);

  return result;
};
