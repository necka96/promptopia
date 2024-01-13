import { connectToDb } from "@utils/database";
import Prompt from "@models/prompt";
export const revalidate = 0
export const GET = async (req, res) => {
  try {
    await connectToDb();
    const prompts = await Prompt.find({}).populate("creator");
    return new Response(JSON.stringify(prompts), { status: 201 });
  } catch (error) {
    return new Response("Faild to fetch propmpts", { status: 500 });
  }
};
