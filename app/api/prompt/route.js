import Prompt from "@models/prompt";
import { connectToDb  } from "@utils/database";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * @method GET
 * @returns NextResponse
 * @description Find All Prompts and return
 */
export const GET = async () => {
    await connectToDb();

    try {
        const result = await Prompt.find();
        return NextResponse.json(result.reverse(), { status: 200 });
    } catch (err) {
        return NextResponse.json("Failed to get Prompt Template.", {
            status: 500
        });
    }
};
