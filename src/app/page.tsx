'use client';

export const dynamic = 'force-dynamic';

import { useState, useRef, useCallback, useEffect } from 'react';
import ScenarioSelector from '@/components/ScenarioSelector';
import RecordButton from '@/components/RecordButton';
import CoachingReport from '@/components/CoachingReport';
import AvatarCanvas from '@/components/avatar/AvatarCanvas';
import AnamAvatar from '@/components/avatar/AnamAvatar';
import PracticeHistory from '@/components/PracticeHistory';
import StatsDashboard from '@/components/StatsDashboard';
import ErrorBoundary from '@/components/ErrorBoundary';

import { speakText, stopSpeaking, setOnEnded } from '@/lib/voice/tts-player';
import { analyzeTurn, generateCoachingReport } from '@/lib/coaching-engine';
import { useVoiceAgent, type AgentState } from '@/lib/voice/useVoiceAgent';
import { saveSession } from '@/lib/session-history';
import {
  Mic,
  Bot,
  CircleDot,
  Hand,
  FileText,
  AlertTriangle,
  RotateCcw,
  Square,
  ArrowLeft,
  Radio,
  Phone,
  PhoneOff,
  Volume2,
  Loader2,
  History,
  BarChart3,
} from 'lucide-react';
import type { Emotion, Turn, CoachingReportData, ViewMode } from '@/types';

const SCENARIO_TITLES: Record<string, string> = {
  'salary-entry': 'Entry-Level Salary',
  'salary-senior': 'Senior Counter-Offer',
  'salary-equity': 'Equity vs Cash',
  'salary-counteroffer': 'Employer Counteroffer',
  'fundraising-cofounder': 'Co-Founder Equity Split',
  'fundraising-preseed': 'Pre-Seed SAFE',
  'fundraising-series-a': 'Series A Term Sheet',
  'freelance-rate': 'Freelance Rate',
  'scope-creep': 'Scope Creep',
  'vendor-pricing': 'B2B SaaS Pricing',
  'car-buying': 'Car Dealership',
  'rent-negotiation': 'Rent Negotiation',
};

const OPENING_LINES: Record<string, string> = {
  'salary-entry':
    "Thanks for coming in! We're excited about your application. We're offering $75K to start — it's competitive for entry-level around here.",
  'salary-senior':
    'Great to have you here. We really liked your profile. The offer is $155K base, plus the standard equity package.',
  'salary-equity':
    "Welcome aboard! We're thrilled to have you join us pre-IPO. The offer is $120K and 0.5% equity.",
  'salary-counteroffer':
    'Hey, thanks for sitting down with me. I heard you got an offer — I really hope we can figure something out.',
  'fundraising-cofounder':
    "So I've been grinding on this idea for 6 months. I'm thinking 60/40 split to start, given the sweat equity.",
  'fundraising-preseed':
    "I like your space. For a pre-revenue company, I'm thinking a $3M cap on a SAFE.",
  'fundraising-series-a':
    "Great deck. Let's talk valuation. Given your $500K ARR, I'm thinking $15M post-money.",
  'freelance-rate':
    "Love your portfolio! We've budgetized $100/hr for this 3-month redesign project.",
  'scope-creep':
    'Hey, the homepage looks great! Just one more thing — could we add a testimonials carousel?',
  'vendor-pricing':
    'Thanks for your time. Our platform starts at $120K annually for the enterprise tier.',
  'car-buying': 'Welcome! This is a beauty — $48K MSRP, plus delivery and documentation fees.',
  'rent-negotiation':
    "Great unit, isn't it? $3,200 a month, available next month. It won't last long.",
};

export default function Home() {
  const [view, setView] = useState<ViewMode>('select');
  const [scenarioId, setScenarioId] = useState<string | null>(null);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [currentEmotion, setCurrentEmotion] = useState<Emotion>('neutral');
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<CoachingReportData | null>(null);
  const [useAnamAvatar, setUseAnamAvatar] = useState(true);

  const [streamingText, setStreamingText] = useState('');
  const [voiceMode, setVoiceMode] = useState<'push' | 'auto'>('auto');

  // New state for history
  const [showHistory, setShowHistory] = useState(false);
  const [sessionStartedAt, setSessionStartedAt] = useState<Date | null>(null);

  const transcriptRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);

  // Scroll transcript to bottom
  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [turns]);

  // Init TTS end callback + preload speech synthesis voices
  useEffect(() => {
    setOnEnded(() => setIsAiSpeaking(false));

    // Preload browser speech voices so they're ready for fallback
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }, []);

  // Voice agent (auto mode)
  const { agentState, isListening, isRecording, volume, isEnabled, toggle } = useVoiceAgent({
    scenarioId: scenarioId || 'salary-entry',
    turns,
    onTurnComplete: (turn) => {
      setTurns((prev) => [...prev, turn]);
      setAiResponse(turn.aiText);
      setStreamingText('');
    },
    onEmotionChange: setCurrentEmotion,
    onAgentStateChange: () => {},
    onTextChunk: (chunk) => setStreamingText((prev) => prev + chunk),
  });

  // Animation class on view change
  useEffect(() => {
    if (viewRef.current) {
      viewRef.current.classList.remove('fade-in');
      void viewRef.current.offsetWidth;
      viewRef.current.classList.add('fade-in');
    }
  }, [view]);

  const handleSelectScenario = useCallback((id: string) => {
    setScenarioId(id);
    setTurns([]);
    setReport(null);
    setAiResponse('');
    setError(null);
    setSessionStartedAt(new Date());
    setView('negotiate');

    setTimeout(() => {
      const text = OPENING_LINES[id] || "Let's start the negotiation. What are you thinking?";
      setAiResponse(text);
      setCurrentEmotion('neutral');
      setIsAiSpeaking(true);
      speakText(text)
        .catch((e) => console.warn('Opening TTS failed:', e))
        .finally(() => setIsAiSpeaking(false));
    }, 800);
  }, []);

  const handleTranscript = useCallback(
    async (text: string) => {
      if (!scenarioId || !text) return;
      if (text.startsWith('(Audio') || text.startsWith('(No speech')) return;

      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch('/api/negotiate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            transcript: text,
            scenarioId: scenarioId,
            history: turns
              .map((t) => [
                { role: 'user' as const, content: t.userText },
                { role: 'assistant' as const, content: t.aiText },
              ])
              .flat(),
            turnNumber: turns.length,
          }),
        });

        if (!res.ok) {
          throw new Error(`API responded with ${res.status}`);
        }

        const data = await res.json();
        const emotion: Emotion = (data.emotion || 'neutral') as Emotion;

        const newTurn: Turn = {
          userText: text,
          aiText: data.aiText || 'I need to think about that.',
          emotion,
        };

        setTurns((prev) => [...prev, newTurn]);
        setCurrentEmotion(emotion);
        setAiResponse(newTurn.aiText);
        setIsAiSpeaking(true);
        await speakText(newTurn.aiText).catch((e) => console.warn('Response TTS failed:', e));
        setIsAiSpeaking(false);
      } catch (err) {
        console.error('Negotiation error:', err);
        setError('Could not reach the AI. Using offline mode.');

        const fallbackText =
          "Interesting point. I'll need to think about that. Can you elaborate on what you're proposing?";
        const newTurn: Turn = {
          userText: text,
          aiText: fallbackText,
          emotion: 'neutral',
        };
        setTurns((prev) => [...prev, newTurn]);
        setAiResponse(fallbackText);
        setCurrentEmotion('neutral');
        setIsAiSpeaking(true);
        await speakText(fallbackText).catch((e) => console.warn('Fallback TTS failed:', e));
        setIsAiSpeaking(false);
      }

      setIsLoading(false);
    },
    [scenarioId, turns],
  );

  const handleEndNegotiation = useCallback(() => {
    stopSpeaking();

    if (turns.length === 0) {
      setReport({
        overallScore: 5,
        breakdown: { outcome: 2, tactics: 1, delivery: 1, adaptability: 1 },
        whatYouDidWell: [],
        missedOpportunities: ['No negotiation was conducted. Try a scenario and practice!'],
        phrasesYouCouldHaveSaid: ['"Let me start with a counter-offer based on market research."'],
        tacticsYouUsed: [],
        totalFillerWords: 0,
        advice: 'Start a negotiation and practice! Every session builds your skills.',
      });
      setView('coaching');
      return;
    }

    const analyzed = turns.map((t, i) => analyzeTurn(t.userText, t.aiText, t.emotion, i + 1));
    const coachingReport = generateCoachingReport(analyzed);

    const finalReport: CoachingReportData = {
      overallScore: coachingReport.overallScore,
      breakdown: coachingReport.breakdown,
      whatYouDidWell:
        coachingReport.whatYouDidWell.length > 0
          ? coachingReport.whatYouDidWell
          : ['You engaged in the negotiation and practiced your skills.'],
      missedOpportunities:
        coachingReport.missedOpportunities.length > 0
          ? coachingReport.missedOpportunities
          : ['Try using data-backed anchors and specific numbers.'],
      phrasesYouCouldHaveSaid:
        coachingReport.phrasesYouCouldHaveSaid.length > 0
          ? coachingReport.phrasesYouCouldHaveSaid
          : [
              '"Based on my research, the market range is X-Y."',
              '"I have another offer that\'s hard to ignore."',
            ],
      tacticsYouUsed:
        coachingReport.tacticsYouUsed.length > 0
          ? coachingReport.tacticsYouUsed
          : ['Anchoring', 'Counter-offer'],
      totalFillerWords: coachingReport.totalFillerWords,
      advice: coachingReport.advice,
    };

    setReport(finalReport);

    // Save session to history
    if (scenarioId && sessionStartedAt) {
      saveSession(
        scenarioId,
        SCENARIO_TITLES[scenarioId] || scenarioId,
        turns,
        finalReport,
        sessionStartedAt,
      );
    }

    setView('coaching');
  }, [turns, scenarioId, sessionStartedAt]);

  const handleRestart = useCallback(() => {
    stopSpeaking();
    setView('select');
    setScenarioId(null);
    setTurns([]);
    setReport(null);
    setAiResponse('');
    setError(null);
    setSessionStartedAt(null);
  }, []);

  // Show history modal
  if (showHistory) {
    return (
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '1rem', minHeight: '100vh' }}>
        <ErrorBoundary>
          <PracticeHistory onClose={() => setShowHistory(false)} />
        </ErrorBoundary>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <h1 className="header-title">
            <Mic size={24} />
            Negotia8
          </h1>
          <p className="header-subtitle">
            Practice negotiations against AI with emotional intelligence
          </p>
        </div>
        <button
          onClick={() => setShowHistory(true)}
          className="header-history-btn"
          aria-label="View practice history"
        >
          <History size={18} />
          <span className="history-btn-text">History</span>
        </button>
      </header>

      {/* View container */}
      <div ref={viewRef} className="fade-in">
        {/* SCENARIO SELECTOR */}
        {view === 'select' && (
          <>
            <StatsDashboard onViewHistory={() => setShowHistory(true)} />
            <ScenarioSelector onSelect={handleSelectScenario} selectedId={scenarioId} />
          </>
        )}

        {/* NEGOTIATION VIEW */}
        {view === 'negotiate' && (
          <div className="negotiate-container">
            {/* Counterpart avatar with emotion */}
            <ErrorBoundary
              fallback={<AvatarCanvas emotion={currentEmotion} isSpeaking={isAiSpeaking} />}
            >
              {useAnamAvatar ? (
                <AnamAvatar
                  isSpeaking={isAiSpeaking}
                  speakText={aiResponse}
                  emotion={currentEmotion}
                />
              ) : (
                <AvatarCanvas emotion={currentEmotion} isSpeaking={isAiSpeaking} />
              )}
            </ErrorBoundary>

            {/* Avatar toggle */}
            <div className="avatar-toggle">
              <button
                onClick={() => setUseAnamAvatar(!useAnamAvatar)}
                className="avatar-toggle-btn"
                aria-label={useAnamAvatar ? 'Switch to SVG avatar' : 'Switch to Anam avatar'}
              >
                {useAnamAvatar ? '✨ Anam Avatar' : '🎨 SVG Avatar'}
              </button>
            </div>

            {/* AI Speech Bubble */}
            {(aiResponse || streamingText) && (
              <div className="ai-speech-bubble" role="log" aria-live="polite">
                <div className="ai-speech-header">
                  {isAiSpeaking ? (
                    <>
                      <CircleDot size={12} /> Speaking...
                    </>
                  ) : (
                    <>
                      <Bot size={14} /> AI
                    </>
                  )}
                  {isLoading && (
                    <span className="processing-indicator">Processing your turn...</span>
                  )}
                </div>
                {streamingText || aiResponse}
                {streamingText && <span className="cursor-blink">|</span>}
              </div>
            )}

            {/* Error banner */}
            {error && (
              <div className="error-banner" role="alert">
                <AlertTriangle size={14} />
                {error}
              </div>
            )}

            {/* Transcript */}
            {turns.length > 0 && (
              <div
                ref={transcriptRef}
                className="transcript-container"
                role="log"
                aria-label="Conversation transcript"
              >
                <div className="transcript-header">
                  <FileText size={12} /> Transcript ({turns.length} turn
                  {turns.length !== 1 ? 's' : ''})
                </div>
                {turns.map((t, i) => (
                  <div key={i} className="transcript-turn">
                    <div className="transcript-user">
                      <strong>You:</strong> {t.userText}
                    </div>
                    <div className="transcript-ai">
                      <strong>AI</strong> <EmotionBadge emotion={t.emotion} />
                      {t.aiText}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty state when no turns yet */}
            {turns.length === 0 && !aiResponse && (
              <div className="empty-state">
                <div className="empty-state-icon">
                  <Hand size={40} />
                </div>
                <p>The AI is ready. Hold the mic and start negotiating!</p>
              </div>
            )}

            {/* Agent state indicator */}
            {voiceMode === 'auto' && (
              <AgentStateIndicator
                state={agentState}
                volume={volume}
                isListening={isListening}
                isRecording={isRecording}
              />
            )}

            {/* Controls */}
            <div className="controls-container">
              {/* Mode toggle */}
              <div className="mode-toggle" role="radiogroup" aria-label="Voice mode">
                <button
                  onClick={() => setVoiceMode('auto')}
                  className={`mode-btn ${voiceMode === 'auto' ? 'active' : ''}`}
                  role="radio"
                  aria-checked={voiceMode === 'auto'}
                >
                  <Radio size={12} /> Auto Listen
                </button>
                <button
                  onClick={() => setVoiceMode('push')}
                  className={`mode-btn ${voiceMode === 'push' ? 'active' : ''}`}
                  role="radio"
                  aria-checked={voiceMode === 'push'}
                >
                  <Mic size={12} /> Push to Talk
                </button>
              </div>

              {voiceMode === 'auto' ? (
                <button
                  onClick={toggle}
                  className={`mic-btn ${isEnabled ? 'active' : ''}`}
                  aria-label={isEnabled ? 'Stop listening' : 'Start listening'}
                >
                  {isEnabled ? <PhoneOff size={28} /> : <Phone size={28} />}
                </button>
              ) : (
                <RecordButton onTranscript={handleTranscript} disabled={isLoading} />
              )}

              <div className="action-buttons">
                <button
                  onClick={handleEndNegotiation}
                  disabled={turns.length === 0}
                  className="action-btn end-btn"
                  aria-label="End negotiation and get coaching report"
                >
                  <Square size={12} />
                  End Negotiation
                </button>
                <button
                  onClick={handleRestart}
                  className="action-btn back-btn"
                  aria-label="Back to scenario selection"
                >
                  <ArrowLeft size={14} />
                  Back to Scenarios
                </button>
              </div>
            </div>
          </div>
        )}

        {/* COACHING VIEW */}
        {view === 'coaching' && (
          <ErrorBoundary>
            <CoachingReport report={report} onRestart={handleRestart} />
          </ErrorBoundary>
        )}
      </div>
    </div>
  );
}

/** Emotion badge with color */
function EmotionBadge({ emotion }: { emotion: string }) {
  const colors: Record<string, string> = {
    happy: 'var(--green)',
    skeptical: 'var(--yellow)',
    frustrated: 'var(--red)',
    neutral: 'var(--text-muted)',
  };
  return (
    <span
      className="emotion-badge"
      style={{
        background: `${colors[emotion] || '#888'}20`,
        color: colors[emotion] || '#888',
      }}
      aria-label={`Emotion: ${emotion}`}
    >
      {emotion}
    </span>
  );
}

/** Agent state indicator — shows what the voice agent is doing */
function AgentStateIndicator({
  state,
  volume,
  isListening,
  isRecording,
}: {
  state: AgentState;
  volume: number;
  isListening: boolean;
  isRecording: boolean;
}) {
  const config: Record<AgentState, { label: string; color: string; icon: React.ReactNode }> = {
    idle: { label: 'Ready', color: 'var(--text-muted)', icon: <Radio size={14} /> },
    listening: {
      label: 'Listening...',
      color: 'var(--green)',
      icon: <Volume2 size={14} />,
    },
    thinking: {
      label: 'Thinking...',
      color: 'var(--yellow)',
      icon: <Loader2 size={14} className="animate-spin" />,
    },
    speaking: {
      label: 'Speaking...',
      color: 'var(--accent)',
      icon: <Bot size={14} />,
    },
  };

  const c = config[state];

  // Volume bars for listening state
  const bars = Math.min(12, Math.floor(volume * 150));

  return (
    <div
      className="agent-state-indicator"
      style={{
        background: `${c.color}10`,
        border: `1px solid ${c.color}25`,
        color: c.color,
      }}
      role="status"
      aria-live="polite"
      aria-label={`Agent status: ${c.label}`}
    >
      {c.icon}
      <span>{c.label}</span>

      {/* Volume bars when listening */}
      {state === 'listening' && (
        <span className="volume-bars" aria-hidden="true">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="volume-bar"
              style={{
                height: Math.max(3, Math.min(14, bars * (i < 4 ? i + 1 : 8 - i) * 0.3)),
                background: c.color,
              }}
            />
          ))}
        </span>
      )}
    </div>
  );
}
