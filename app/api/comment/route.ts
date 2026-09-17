import { createClient } from "next-sanity";
import { NextResponse } from "next/server";
import { apiVersion, dataset, projectId, useCdn } from "@/sanity/env";

const writeClient = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn: false,
  token: process.env.SANITY_TOKEN,
});

export async function POST(req: Request) {
  let data: {
    name?: unknown;
    email?: unknown;
    comment?: unknown;
    postId?: unknown;
  };
  try {
    data = await req.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid request body" },
      { status: 400 }
    );
  }

  const name = typeof data.name === "string" ? data.name.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const comment = typeof data.comment === "string" ? data.comment.trim() : "";
  const postId = typeof data.postId === "string" ? data.postId.trim() : "";

  if (!name || !email || !comment || !postId) {
    return NextResponse.json(
      {
        message: "All fields are required",
      },
      { status: 400 }
    );
  }

  if (name.length > 80) {
    return NextResponse.json(
      { message: "Name must be 80 characters or fewer" },
      { status: 400 }
    );
  }

  if (comment.length > 2000) {
    return NextResponse.json(
      { message: "Comment must be 2000 characters or fewer" },
      { status: 400 }
    );
  }

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailRegex.test(email) || email.length > 320) {
    return NextResponse.json(
      { message: "Invalid email address" },
      { status: 400 }
    );
  }

  if (comment.length < 2) {
    return NextResponse.json(
      { message: "Comment must be at least 2 characters" },
      { status: 400 }
    );
  }

  try {
    const newComment = await writeClient.create({
      _type: "comment",
      name,
      email,
      comment,
      post: {
        _type: "reference",
        _ref: postId,
      },
    });
    return NextResponse.json(
      { message: "Comment added successfully", comment: newComment },
      { status: 201 }
    );
  } catch (error) {
    console.error("Comment create failed:", error);
    return NextResponse.json(
      { message: "Failed to create a comment" },
      { status: 500 }
    );
  }
}
