/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  // AI
  readonly OPENAI_API_KEY: string;
  readonly GEMINI_API_KEY: string;
  readonly ANTHROPIC_API_KEY: string;
  readonly AI_PROVIDER: 'openai' | 'gemini' | 'anthropic';
  readonly AI_MODEL: string;

  // Razorpay (server-side only — never expose KEY_SECRET to browser)
  readonly RAZORPAY_KEY_ID: string;
  readonly RAZORPAY_KEY_SECRET: string;
  readonly RAZORPAY_AMOUNT: string;
  readonly RAZORPAY_CURRENCY: string;

  // Public (safe to expose — prefixed with PUBLIC_)
  readonly PUBLIC_APP_URL: string;
  readonly PUBLIC_RAZORPAY_KEY_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
