import { NextResponse } from 'next/server';
import { getDb, checkConnection } from '@/lib/db';

export async function GET() {
  try {
    const db = getDb();
    const result = await db`SELECT 1 as connected`;
    return NextResponse.json({ 
      status: 'Database connected',
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    if (error.message.includes('Database not configured')) {
      return NextResponse.json({ 
        status: 'Database not configured',
        message: 'Set DATABASE_URL environment variable',
        timestamp: new Date().toISOString()
      });
    }
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
