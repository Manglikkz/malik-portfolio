import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET() {
  try {
    const pool = getDb();
    const result = await pool.query('SELECT 1 as connected');
    return NextResponse.json({ 
      status: 'OK',
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    if (error.message?.includes('not configured')) {
      return NextResponse.json({ status: 'DB not configured' });
    }
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
