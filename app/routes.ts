import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  
  // Use the id in your logic
  const data = { message: `Path parameter id: ${id}` };
  
  return NextResponse.json(data, { status: 200 });
}