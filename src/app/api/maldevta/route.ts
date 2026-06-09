import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt, context } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { success: false, error: 'Prompt diperlukan' },
        { status: 400 }
      );
    }

    const response = await fetch('https://maldevta.com/api/llm/completion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, context: context || '' }),
      signal: AbortSignal.timeout(15000), // 15 second timeout
    });

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: `Maldevta API error: ${message}` },
      { status: 500 }
    );
  }
}
