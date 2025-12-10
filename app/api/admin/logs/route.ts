/**
 * Admin Logs API Endpoint
 *
 * Returns system logs with filtering.
 *
 * @route GET /api/admin/logs
 */

import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';
import { safeErrorMessage, parseIntParam } from '@/lib/utils/security';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const severity = searchParams.get('severity');
    const limit = parseIntParam(searchParams.get('limit'), 100, 500);
    
    const db = getDb();
    
    let query = 'SELECT * FROM system_logs';
    const params: (string | number)[] = [];
    
    if (severity && severity !== 'all') {
      query += ' WHERE severity = ?';
      params.push(severity);
    }
    
    query += ' ORDER BY created_at DESC LIMIT ?';
    params.push(limit);
    
    const logs = db.prepare(query).all(...params);
    
    const response = NextResponse.json({
      logs,
      updated_at: new Date().toISOString()
    });
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    return response;

  } catch (error) {
    console.error('Admin logs API error:', error);
    return NextResponse.json({ error: safeErrorMessage(error) }, { status: 500 });
  }
}



