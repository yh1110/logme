"use server";
export async function addAccount(prevState, formData: { email: string; password: string }) {
  try {
    console.log("addAccount", formData);
  } catch (error) {
    console.error("Error adding account:", error);
  }
}
