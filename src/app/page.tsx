'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import ScenarioSelector from '@/components/ScenarioSelector';
import RecordButton from '@/components/RecordButton';
import CoachingReport from '@/components/CoachingReport';
import AvatarCanvas from '@/components/avatar/AvatarCanvas';

import { speakText, stopSpeaking, setOnEnded } from '@/lib/voice/tts-player';
import { analyzeTurn, generateCoachingReport } from '@/lib/coaching-engine';
import { useVoiceAgent, type AgentState } from '@/lib/voice/useVoiceAgent';
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
} from 'lucide-react';
import type { Emotion, Turn, CoachingReportData, ViewMode } from '@/types';

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
    "Love your portfolio! We've budgeted $100/hr for this 3-month redesign project.",
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

  const [streamingText, setStreamingText] = useState('');
  const [voiceMode, setVoiceMode] = useState<'push' | 'auto'>('auto');

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

    setReport({
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
    });

    setView('coaching');
  }, [turns]);

  const handleRestart = useCallback(() => {
    stopSpeaking();
    setView('select');
    setScenarioId(null);
    setTurns([]);
    setReport(null);
    setAiResponse('');
    setError(null);
  }, []);

  return (
    <div style={{ maxWidth: 820, margin: '0 auto', padding: '1rem', minHeight: '100vh' }}>
      {/* Header */}
      <header
        style={{
          textAlign: 'center',
          padding: '1.25rem 0',
          borderBottom: '1px solid var(--border)',
          marginBottom: '0.5rem',
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: '1.8rem',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
          }}
        >
          <Mic size={24} />
          Negotia8
        </h1>
        <p style={{ margin: '0.3rem 0 0', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
          Practice negotiations against AI with emotional intelligence
        </p>
      </header>

      {/* View container */}
      <div ref={viewRef} className="fade-in">
        {/* SCENARIO SELECTOR */}
        {view === 'select' && (
          <>

            <ScenarioSelector
              onSelect={handleSelectScenario}
              selectedId={scenarioId}
            />
          </>
        )}

        {/* NEGOTIATION VIEW */}
        {view === 'negotiate' && (
          <div style={{ padding: '0.5rem 0' }}>
            {/* Counterpart avatar with emotion */}
            <AvatarCanvas
              emotion={currentEmotion}
              isSpeaking={isAiSpeaking}
            />

            {/* AI Speech Bubble */}
            {aiResponse && (
              <div
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  padding: '1rem 1.25rem',
                  margin: '0.75rem 0',
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    fontSize: '0.75rem',
                    color: isAiSpeaking ? 'var(--green)' : 'var(--text-muted)',
                    marginBottom: '0.35rem',
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                >
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
                    <span style={{ color: 'var(--yellow)', fontSize: '0.7rem' }}>
                      Processing your turn...
                    </span>
                  )}
                </div>
                {aiResponse}
              </div>
            )}

            {/* Error banner */}
            {error && (
              <div
                style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '10px',
                  padding: '0.6rem 1rem',
                  margin: '0.5rem 0',
                  fontSize: '0.82rem',
                  color: 'var(--red)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                <AlertTriangle size={14} />
                {error}
              </div>
            )}

            {/* Transcript */}
            {turns.length > 0 && (
              <div
                ref={transcriptRef}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  padding: '1rem',
                  margin: '0.75rem 0',
                  maxHeight: 200,
                  overflowY: 'auto',
                }}
              >
                <div
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    marginBottom: '0.5rem',
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                >
                  <FileText size={12} /> Transcript ({turns.length} turn
                  {turns.length !== 1 ? 's' : ''})
                </div>
                {turns.map((t, i) => (
                  <div key={i} style={{ marginBottom: '0.75rem', fontSize: '0.85rem' }}>
                    <div style={{ color: 'var(--accent-hover)' }}>
                      <strong>You:</strong> {t.userText}
                    </div>
                    <div style={{ color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                      <strong>AI</strong> <EmotionBadge emotion={t.emotion} />
                      {t.aiText}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty state when no turns yet */}
            {turns.length === 0 && !aiResponse && (
              <div
                style={{
                  textAlign: 'center',
                  padding: '2rem',
                  color: 'var(--text-muted)',
                  fontSize: '0.9rem',
                }}
              >
                <div style={{ marginBottom: '0.5rem', color: 'var(--accent)' }}>
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
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.75rem',
                marginTop: '0.75rem',
              }}
            >
              {/* Mode toggle */}
              <div
                style={{
                  display: 'flex',
                  gap: '0.5rem',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '24px',
                  padding: '0.2rem',
                }}
              >
                <button
                  onClick={() => setVoiceMode('auto')}
                  style={{
                    padding: '0.35rem 0.9rem',
                    borderRadius: '20px',
                    border: 'none',
                    background: voiceMode === 'auto' ? 'var(--accent)' : 'transparent',
                    color: voiceMode === 'auto' ? '#fff' : 'var(--text-muted)',
                    fontSize: '0.78rem',
                    fontWeight: voiceMode === 'auto' ? 600 : 400,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    transition: 'all 0.15s',
                  }}
                >
                  <Radio size={12} /> Auto Listen
                </button>
                <button
                  onClick={() => setVoiceMode('push')}
                  style={{
                    padding: '0.35rem 0.9rem',
                    borderRadius: '20px',
                    border: 'none',
                    background: voiceMode === 'push' ? 'var(--accent)' : 'transparent',
                    color: voiceMode === 'push' ? '#fff' : 'var(--text-muted)',
                    fontSize: '0.78rem',
                    fontWeight: voiceMode === 'push' ? 600 : 400,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    transition: 'all 0.15s',
                  }}
                >
                  <Mic size={12} /> Push to Talk
                </button>
              </div>

              {voiceMode === 'auto' ? (
                <button
                  onClick={toggle}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    border: `3px solid ${isEnabled ? 'var(--green)' : 'var(--accent)'}`,
                    background: isEnabled ? 'var(--green)' : 'var(--bg-card)',
                    color: '#fff',
                    fontSize: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s',
                    boxShadow: isEnabled ? '0 0 20px rgba(34, 197, 94, 0.3)' : 'none',
                  }}
                >
                  {isEnabled ? <PhoneOff size={28} /> : <Phone size={28} />}
                </button>
              ) : (
                <RecordButton onTranscript={handleTranscript} disabled={isLoading} />
              )}

              <div
                style={{
                  display: 'flex',
                  gap: '0.75rem',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}
              >
                <button
                  onClick={handleEndNegotiation}
                  disabled={turns.length === 0}
                  style={{
                    padding: '0.6rem 1.5rem',
                    borderRadius: '10px',
                    border: '1px solid var(--border)',
                    background: 'transparent',
                    color: turns.length === 0 ? 'var(--text-muted)' : 'var(--text)',
                    fontSize: '0.88rem',
                    opacity: turns.length === 0 ? 0.5 : 1,
                    transition: 'all 0.15s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                >
                  <Square size={12} />
                  End Negotiation
                </button>
                <button
                  onClick={handleRestart}
                  style={{
                    padding: '0.6rem 1.5rem',
                    borderRadius: '10px',
                    border: '1px solid var(--border)',
                    background: 'transparent',
                    color: 'var(--text-muted)',
                    fontSize: '0.88rem',
                    transition: 'all 0.15s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                >
                  <ArrowLeft size={14} />
                  Back to Scenarios
                </button>
              </div>
            </div>
          </div>
        )}

        {/* COACHING VIEW */}
        {view === 'coaching' && <CoachingReport report={report} onRestart={handleRestart} />}
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
      style={{
        display: 'inline-block',
        fontSize: '0.65rem',
        padding: '0.1rem 0.4rem',
        borderRadius: '4px',
        background: `${colors[emotion] || '#888'}20`,
        color: colors[emotion] || '#888',
        marginRight: '0.3rem',
        textTransform: 'capitalize',
        fontWeight: 500,
      }}
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
  const config: Record<AgentState, { label: string; color: string; icon: React.ReactNode }>= {
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
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.6rem',
        padding: '0.5rem 1rem',
        borderRadius: '20px',
        background: `${c.color}10`,
        border: `1px solid ${c.color}25`,
        fontSize: '0.82rem',
        fontWeight: 500,
        color: c.color,
        transition: 'all 0.3s ease',
        marginTop: '0.5rem',
      }}
    >
      {c.icon}
      <span>{c.label}</span>

      {/* Volume bars when listening */}
      {state === 'listening' && (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '1px', height: 14 }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              style={{
                width: 2,
                height: Math.max(3, Math.min(14, bars * (i < 4 ? i + 1 : 8 - i) * 0.3)),
                borderRadius: 1,
                background: c.color,
                transition: 'height 0.1s ease',
              }}
            />
          ))}
        </span>
      )}
    </div>
  );
}
