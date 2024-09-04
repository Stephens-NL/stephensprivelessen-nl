import { faqInfo, faqItems } from "../../../data";
import { NextResponse } from 'next/server';

export async function GET() {
  // Convert the about object to a JSON string
  const faqData = {
    info: faqInfo,
    items: faqItems
  };

  const jsonString = JSON.stringify(faqData);

  // Create a new response with the JSON data
  return new NextResponse(jsonString, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },


  });
}