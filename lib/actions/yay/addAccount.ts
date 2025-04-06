"use server";
export async function addAccount(prevState, formData: FormData) {
  try {
    console.log("addAccount", formData);
  } catch (error) {
    console.error("Error adding account:", error);
  }
}
