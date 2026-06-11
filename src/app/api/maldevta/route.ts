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
      signal: AbortSignal.timeout(15000),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: data.error || data.message || `HTTP ${response.status}` },
        { status: response.status }
      );
    }

    // Normalize: Maldevta may return { completion } directly or nested under data
    const completion: string | undefined =
      data.completion ?? data.data?.completion ?? data.response ?? data.text;

    if (completion) {
      return NextResponse.json({ success: true, data: { completion } });
    }

    // Unknown format — forward raw for debugging
    return NextResponse.json({ success: false, error: 'Format respons tidak dikenali', raw: data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: `Maldevta API error: ${message}` },
      { status: 500 }
    );
  }
}
