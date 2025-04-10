"use server";
import { Client } from "yay.js";
export async function addAccount(prevState, formData: { email: string; password: string }) {
  try {
    const email: string = formData.email;
    const password: string = formData.password;

    const client = new Client({ saveCookie: false });

    const loginData = await client.login({
      email,
      password,
    });

    console.log("loginData", loginData);

    const post = await client.getPost({ postId: 502470733 });
    console.log("post", post);

    // console.log("loginData", loginData);
  } catch (error) {
    console.error("Error adding account:", error);
  }
}
