import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// Get (read)

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) return new Response("Prompt Not Found", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Faild to fetch propmpts", { status: 500 });
  }
};

// patch (update)
export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();

  try {
    await connectToDB();

    const existingprompt = await Prompt.findById(params.id);

    if (!existingprompt)
      return new Response("Prompt not found", { status: 404 });

    existingprompt.prompt = prompt;
    existingprompt.tag = tag;
    await existingprompt.save();

    return new Response("Successfully updated the Prompts", { status: 200 });
  } catch (error) {
    return new Respone("Faild to upoload a promot", { status: 500 });
  }
};
// dete (dete prompt)

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findByIdAndDelete(params.id);

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting prompt", { status: 500 });
  }
};
