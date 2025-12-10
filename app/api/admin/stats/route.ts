/**
 * Admin Stats API Endpoint
 *
 * Returns system statistics for the admin dashboard.
 *
 * @route GET /api/admin/stats
 */

import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';
import { safeErrorMessage } from '@/lib/utils/security';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const db = getDb();
    
    // Get active cohorts count
    const activeCohorts = (db.prepare(`
      SELECT COUNT(*) as count FROM cohorts WHERE status = 'active'
    `).get() as { count: number }).count;
    
    // Get total agents count
    const totalAgents = (db.prepare(`
      SELECT COUNT(*) as count FROM agents
    `).get() as { count: number }).count;
    
    // Get markets tracked count
    const marketsTracked = (db.prepare(`
      SELECT COUNT(*) as count FROM markets
    `).get() as { count: number }).count;
    
    // Get total API costs from decisions table
    const totalCost = (db.prepare(`
      SELECT COALESCE(SUM(api_cost_usd), 0) as total FROM decisions
    `).get() as { total: number }).total;
    
    const response = NextResponse.json({
      active_cohorts: activeCohorts,
      total_agents: totalAgents,
      markets_tracked: marketsTracked,
      total_api_cost: totalCost,
      updated_at: new Date().toISOString()
    });
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    return response;

  } catch (error) {
    console.error('Admin stats API error:', error);
    return NextResponse.json({ error: safeErrorMessage(error) }, { status: 500 });
  }
}


