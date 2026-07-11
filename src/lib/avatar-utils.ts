/**
 * 🎭 Negoti8 — Avatar System
 *
 * Realistic AI-generated human faces via UI Faces.
 * Same seed → same face every time (deterministic).
 *
 * Provider: i.pravatar.cc (UI Faces-compatible, no key needed)
 *   • 70+ unique realistic AI faces
 *   • Deterministic via ?img=N
 *   • Free, fast, no attribution
 */

// ─── Types ──────────────────────────────────────────────────────────

export type AvatarProvider = 'uifaces' | 'dicebear';

export type CounterpartVariant = 'corporate' | 'vc' | 'creative' | 'vendor' | 'trades' | 'property';

export type UserStyle = 'professional' | 'fun' | 'minimal' | 'initials';

export interface AvatarConfig {
  url: string;
  provider: AvatarProvider;
  variant: CounterpartVariant | 'user';
  color: string;
  label: string;
  seed: string;
}

// ─── Deterministic Seed → Face Index ────────────────────────────────

const FACE_POOL_SIZE = 70;

/**
 * Hash a seed string to a stable integer index (1-70).
 * Same seed always produces the same index → same face.
 */
function seedToFaceIndex(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash + seed.charCodeAt(i)) | 0;
  }
  return (Math.abs(hash) % FACE_POOL_SIZE) + 1;
}

/**
 * Get a realistic human avatar URL from UI Faces pool.
 * Deterministic: same seed → same face.
 */
export function getUIFacesUrl(seed: string, size: number = 200): string {
  const idx = seedToFaceIndex(seed);
  return `https://i.pravatar.cc/${size}?img=${idx}`;
}

/**
 * Get a DiceBear illustrated avatar URL.
 */
export function getDiceBearUrl(style: string, seed: string, size: number = 128): string {
  return `https://api.dicebear.com/9.x/${style}/svg?seed=${encodeURIComponent(seed)}&size=${size * 2}`;
}

// ─── Variant Config ─────────────────────────────────────────────────

const VARIANT_COLORS: Record<CounterpartVariant, string> = {
  corporate: '#6366f1',
  vc: '#8b5cf6',
  creative: '#ec4899',
  vendor: '#06b6d4',
  trades: '#f59e0b',
  property: '#10b981',
};

const VARIANT_LABELS: Record<CounterpartVariant, string> = {
  corporate: 'Recruiter',
  vc: 'Investor',
  creative: 'Client',
  vendor: 'Vendor',
  trades: 'Salesperson',
  property: 'Landlord',
};

const SCENARIO_VARIANT: Record<string, CounterpartVariant> = {
  'salary-entry': 'corporate',
  'salary-senior': 'corporate',
  'salary-equity': 'corporate',
  'salary-counteroffer': 'corporate',
  'fundraising-cofounder': 'vc',
  'fundraising-preseed': 'vc',
  'fundraising-series-a': 'vc',
  'freelance-rate': 'creative',
  'scope-creep': 'creative',
  'vendor-pricing': 'vendor',
  'car-buying': 'trades',
  'rent-negotiation': 'property',
};

// ─── Public API ─────────────────────────────────────────────────────

/**
 * Get counterpart avatar for a scenario.
 * Returns a realistic AI-generated human face.
 *
 * @param scenarioId - e.g. 'salary-entry'
 * @param provider   - 'uifaces' for realistic photos (default)
 * @param size       - pixel size (default 128)
 */
export function getCounterpartAvatar(
  scenarioId: string,
  provider: AvatarProvider = 'uifaces',
  size = 128,
): AvatarConfig {
  const variant = SCENARIO_VARIANT[scenarioId] || 'corporate';

  return {
    url:
      provider === 'uifaces'
        ? getUIFacesUrl(scenarioId, size * 2)
        : getDiceBearUrl('lorelei', scenarioId, size),
    provider,
    variant,
    color: VARIANT_COLORS[variant],
    label: VARIANT_LABELS[variant],
    seed: scenarioId,
  };
}

/**
 * Get user profile avatar.
 * Realistic face based on user ID.
 */
export function getUserAvatar(
  userId: string,
  provider: AvatarProvider = 'uifaces',
  size = 128,
): AvatarConfig {
  return {
    url:
      provider === 'uifaces'
        ? getUIFacesUrl(`user-${userId}`, size * 2)
        : getDiceBearUrl('big-smile', userId, size),
    provider,
    variant: 'user',
    color: '#8b5cf6',
    label: 'You',
    seed: userId,
  };
}

/**
 * Get all counterpart variant info (for settings/customization UI).
 */
export function getAllCounterpartVariants() {
  return (Object.keys(VARIANT_COLORS) as CounterpartVariant[]).map((variant) => ({
    variant,
    color: VARIANT_COLORS[variant],
    label: VARIANT_LABELS[variant],
    // Preview: deterministic face per variant
    previewUrl: getUIFacesUrl(`preview-${variant}`, 128),
  }));
}

/**
 * Preload avatar images for smoother UX.
 */
export function preloadAvatars(scenarioIds: string[]) {
  if (typeof window === 'undefined') return;
  scenarioIds.forEach((id) => {
    const img = new Image();
    img.src = getUIFacesUrl(id, 64);
  });
}
