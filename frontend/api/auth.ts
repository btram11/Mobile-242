import { HttpError } from "@/lib/Errors";

// const BaseUrl = import.meta.env.VITE_API_URL;
const BaseUrl = "http://localhost:8000/api/v1";

export const login = async (email: string, password: string) => {
  const response = await fetch(`${BaseUrl}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      CLIENT_ID: "x-client-id",
      AUTHORIZATION: "authorization",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
  if (!response.ok) throw new HttpError(response.statusText, response.status);

  const result = await response.json();
  console.log(result);
  if (result.status !== 200) throw new HttpError(result.message, result.status);

  localStorage.setItem("access-token", result.accessToken);
  localStorage.setItem("userID", result.userID);
  localStorage.setItem("name", result.name);
  // localStorage.setItem("x-api-key", result["x-api-key"]);
};
