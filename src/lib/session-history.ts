/**
 * Session History Manager
 *
 * Saves practice sessions to localStorage for progress tracking.
 */

import type { Turn, CoachingReportData } from '@/types';

export interface PracticeSession {
  id: string;
  scenarioId: string;
  scenarioTitle: string;
  startedAt: string;
  completedAt: string;
  turns: Turn[];
  report: CoachingReportData;
  duration: number; // seconds
}

const STORAGE_KEY = 'negotia8_sessions';
const MAX_SESSIONS = 50; // Keep last 50 sessions

/**
 * Generate a unique session ID
 */
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Save a completed practice session
 */
export function saveSession(
  scenarioId: string,
  scenarioTitle: string,
  turns: Turn[],
  report: CoachingReportData,
  startedAt: Date,
): PracticeSession {
  const session: PracticeSession = {
    id: generateSessionId(),
    scenarioId,
    scenarioTitle,
    startedAt: startedAt.toISOString(),
    completedAt: new Date().toISOString(),
    turns,
    report,
    duration: Math.floor((Date.now() - startedAt.getTime()) / 1000),
  };

  const sessions = getSessions();
  sessions.unshift(session); // Add to front

  // Keep only the last MAX_SESSIONS
  const trimmed = sessions.slice(0, MAX_SESSIONS);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch (e) {
    console.warn('Failed to save session:', e);
  }

  return session;
}

/**
 * Get all saved sessions
 */
export function getSessions(): PracticeSession[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

/**
 * Get sessions for a specific scenario
 */
export function getSessionsByScenario(scenarioId: string): PracticeSession[] {
  return getSessions().filter((s) => s.scenarioId === scenarioId);
}

/**
 * Get practice statistics
 */
export function getStats(): {
  totalSessions: number;
  totalMinutes: number;
  averageScore: number;
  bestScore: number;
  scenariosPlayed: number;
  currentStreak: number;
} {
  const sessions = getSessions();

  if (sessions.length === 0) {
    return {
      totalSessions: 0,
      totalMinutes: 0,
      averageScore: 0,
      bestScore: 0,
      scenariosPlayed: 0,
      currentStreak: 0,
    };
  }

  const totalMinutes = Math.floor(sessions.reduce((sum, s) => sum + s.duration, 0) / 60);

  const scores = sessions.map((s) => s.report.overallScore);
  const averageScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  const bestScore = Math.max(...scores);

  const uniqueScenarios = new Set(sessions.map((s) => s.scenarioId));

  // Calculate streak (consecutive days with practice)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let streak = 0;
  let checkDate = new Date(today);

  while (true) {
    const dayStr = checkDate.toISOString().split('T')[0];
    const hasSession = sessions.some((s) => s.completedAt.startsWith(dayStr));

    if (hasSession) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  return {
    totalSessions: sessions.length,
    totalMinutes,
    averageScore,
    bestScore,
    scenariosPlayed: uniqueScenarios.size,
    currentStreak: streak,
  };
}

/**
 * Clear all saved sessions
 */
export function clearSessions(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn('Failed to clear sessions:', e);
  }
}

/**
 * Delete a specific session
 */
export function deleteSession(sessionId: string): void {
  const sessions = getSessions().filter((s) => s.id !== sessionId);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  } catch (e) {
    console.warn('Failed to delete session:', e);
  }
}

/**
 * Format duration in seconds to human readable
 */
export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
}

/**
 * Format date relative to now
 */
export function formatRelativeDate(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}
