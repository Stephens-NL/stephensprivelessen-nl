import { about } from "../../../data";
import { NextResponse } from 'next/server';

export async function GET() {
  // Convert the about object to a JSON string
  const jsonString = JSON.stringify(about);
  
  // Create a new response with the JSON data
  return new NextResponse(jsonString, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}