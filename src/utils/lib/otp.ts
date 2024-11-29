import { client } from "@/sanity/client";

export async function saveOtp(email: string, otp: string, expiresAt: string | number | Date) {
  return await client.create({
    _type: "otp",
    email: email.toLowerCase(),
    otp,
    expiresAt: new Date(expiresAt).toISOString(),
  });
}


export async function getOtpByEmail(email: string) {
  const query = `*[_type == "otp" && email == $email][0]`;
  const params = { email: email.toLowerCase() };
  return await client.fetch(query, params);
}


export async function deleteOtp(id: string) {
  return await client.delete(id);
}
