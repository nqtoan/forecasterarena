/**
 * Recent Decisions API Endpoint
 * 
 * Returns the most recent LLM decisions across all cohorts.
 * 
 * @route GET /api/decisions/recent
 */

import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { parseIntParam, safeErrorMessage } from '@/lib/utils/security';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseIntParam(searchParams.get('limit'), 10, 50);
    
    const db = getDb();
    
    const decisions = db.prepare(`
      SELECT 
        d.id,
        d.agent_id,
        d.cohort_id,
        d.decision_week,
        d.decision_timestamp,
        d.action,
        d.reasoning,
        m.display_name as model_display_name,
        m.color as model_color,
        c.cohort_number
      FROM decisions d
      JOIN agents a ON d.agent_id = a.id
      JOIN models m ON a.model_id = m.id
      JOIN cohorts c ON d.cohort_id = c.id
      WHERE d.action != 'ERROR'
      ORDER BY d.decision_timestamp DESC
      LIMIT ?
    `).all(limit);
    
    const response = NextResponse.json({
      decisions,
      updated_at: new Date().toISOString()
    });

    // Cache for 2 minutes - decisions are more time-sensitive
    response.headers.set('Cache-Control', 'public, max-age=120, stale-while-revalidate=30');
    return response;
    
  } catch (error) {
    return NextResponse.json({ error: safeErrorMessage(error) }, { status: 500 });
  }
}



