"use server";
import { chatBot } from "@/entities/twitch/chatBot";

export const connectTwitch = async (formData: FormData) => {
  try {
    const data = await chatBot.client.connect()
    return data

  } catch (error) {
    console.error('er', error)
  }
};
export const disconnectTwitch = async (formData: FormData) => {
  try {
    const data = await chatBot.client.disconnect()
    return data

  } catch (error) {
    console.error(error)
  }
};

