import React, { useState } from 'react';
import { ASSETS, ScreenId } from '../data/mockData';

interface HomeScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);

  return (
    <div className="relative w-full min-h-[calc(100vh-64px)] bg-[#F7FAFA] flex flex-col justify-between overflow-hidden">
      {/* Faint Healthcare Background Visual on the Right Side (occupying ~40-45% of hero area) */}
      <div
        className="absolute right-0 top-0 bottom-0 w-full md:w-[48%] lg:w-[44%] pointer-events-none select-none overflow-hidden z-0"
        aria-hidden="true"
      >
        <img
          src="/healthcare_bg.jpg"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = ASSETS.phcHero;
          }}
          alt=""
          className="w-full h-full object-cover object-[center_30%] opacity-[0.20] filter contrast-[0.90] brightness-[1.05] saturate-[0.85] blur-[0.2px]"
          referrerPolicy="no-referrer"
        />
        {/* Soft fading overlays so it smoothly blends into the background without harsh borders */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F7FAFA] via-[#F7FAFA]/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#F7FAFA]/85 via-transparent to-[#F7FAFA]/90"></div>
        <div className="absolute inset-0 bg-white/20"></div>
      </div>

      {/* Main Foreground Content (z-10 ensures text and cards sit clearly above the faint background) */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 pt-8 sm:pt-12 pb-8 flex flex-col justify-between flex-1">
        {/* UPPER MAIN CONTENT AREA */}
        <div className="flex flex-col max-w-2xl mb-8 sm:mb-12">
          {/* Tag Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E7F5F3] text-[#087F78] font-bold text-xs tracking-wider uppercase mb-4 shadow-2xs w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#087F78]"></span>
            <span>NALAM AI</span>
          </div>

          {/* Main Hero Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-extrabold text-[#102a27] tracking-tight leading-[1.15] mb-3">
            Your AI Health <br className="hidden sm:inline" />
            <span className="text-[#087F78]">Assistant</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#546e6b] font-normal leading-relaxed mb-8 sm:mb-10 max-w-xl">
            Describe your symptoms. Get guidance on what to do next.
          </p>

          {/* MAIN ASSESSMENT CARD (Slightly wider for reference proportions) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,104,95,0.06)] border border-[#e5e9eb] flex flex-col gap-6 relative w-full max-w-2xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#E7F5F3] text-[#087F78] flex items-center justify-center shrink-0 shadow-2xs">
                <span
                  className="material-symbols-outlined text-[26px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  assignment_turned_in
                </span>
              </div>
              <div className="flex flex-col">
                <h2 className="text-xl sm:text-2xl font-bold text-[#102a27] tracking-tight">
                  Immediate Clinical Assessment
                </h2>
                <span className="text-xs sm:text-sm text-[#546e6b] font-medium mt-0.5">
                  No account needed • Private &amp; Secure
                </span>
              </div>
            </div>

            {/* Assessment Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              {/* PRIMARY ACTION */}
              <button
                type="button"
                onClick={() => onNavigate('symptom-check')}
                className="flex-1 inline-flex items-center justify-between gap-3 px-6 py-4 rounded-2xl bg-[#087F78] hover:bg-[#00685f] text-white font-semibold text-sm sm:text-base shadow-[0_4px_16px_rgba(8,127,120,0.22)] hover:shadow-[0_6px_20px_rgba(8,127,120,0.3)] transition-all active:scale-[0.99] cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[20px]">stethoscope</span>
                  <span>Start Health Check</span>
                </div>
                <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>

              {/* SECONDARY ACTION */}
              <button
                type="button"
                onClick={() => setVoiceModalOpen((prev) => !prev)}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-[#E7F5F3] hover:bg-[#d8ece9] text-[#087F78] font-semibold text-sm sm:text-base transition-all active:scale-[0.99] cursor-pointer shadow-2xs"
              >
                <span className="material-symbols-outlined text-[20px]">mic</span>
                <span>Speak in Your Language</span>
              </button>
            </div>

            {/* Embedded Voice Listening State */}
            {voiceModalOpen && (
              <div className="flex flex-col items-center justify-center py-5 px-4 bg-[#F7FAFA] border border-[#e5e9eb] rounded-2xl animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center gap-1.5 mb-3">
                  <span className="w-1.5 h-5 bg-[#087F78] rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-8 bg-[#087F78] rounded-full animate-bounce [animation-delay:0.15s]"></span>
                  <span className="w-1.5 h-11 bg-[#087F78] rounded-full animate-bounce [animation-delay:0.3s]"></span>
                  <span className="w-1.5 h-7 bg-[#087F78] rounded-full animate-bounce [animation-delay:0.1s]"></span>
                  <span className="w-1.5 h-4 bg-[#087F78] rounded-full animate-bounce [animation-delay:0.25s]"></span>
                </div>
                <span className="text-sm font-semibold text-[#102a27]">
                  Listening to your voice...
                </span>
                <span className="text-xs text-[#546e6b] text-center mt-0.5">
                  பேசலாம்... அல்லது बोलिए (Speak in Tamil, Hindi, or English)
                </span>
                <button
                  type="button"
                  onClick={() => onNavigate('symptom-check')}
                  className="mt-3.5 px-4 py-2 rounded-xl bg-[#087F78] text-white text-xs font-semibold hover:bg-[#00685f] shadow-2xs transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Continue to Voice Triage</span>
                  <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM FEATURE STRIP (Single White Rounded Container with 4 Items) */}
        <div
          id="features-strip"
          className="w-full bg-white rounded-2xl p-4 sm:p-5 border border-[#e5e9eb] shadow-[0_2px_14px_rgba(0,0,0,0.03)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-center mb-4"
        >
          {/* 1. Quick Assessment */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#E7F5F3] text-[#087F78] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">schedule</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs sm:text-sm font-bold text-[#102a27]">Quick Assessment</span>
              <span className="text-[11px] sm:text-xs text-[#546e6b] truncate">
                Get guidance in minutes
              </span>
            </div>
          </div>

          {/* 2. For Rural Communities */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">health_and_safety</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs sm:text-sm font-bold text-[#102a27]">
                For Rural Communities
              </span>
              <span className="text-[11px] sm:text-xs text-[#546e6b] truncate">
                Designed for local needs
              </span>
            </div>
          </div>

          {/* 3. Safe & Private */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#E3F2FD] text-[#1565C0] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">verified_user</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs sm:text-sm font-bold text-[#102a27]">Safe &amp; Private</span>
              <span className="text-[11px] sm:text-xs text-[#546e6b] truncate">
                Your data is protected
              </span>
            </div>
          </div>

          {/* 4. Accessible Care */}
          <div
            onClick={() => onNavigate('phc-locator')}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-[#FFF3E0] text-[#E65100] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[20px]">local_hospital</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs sm:text-sm font-bold text-[#102a27] group-hover:text-[#087F78] transition-colors">
                Accessible Care
              </span>
              <span className="text-[11px] sm:text-xs text-[#546e6b] truncate">
                Connect to nearby PHCs
              </span>
            </div>
          </div>
        </div>

        {/* Minimal Clinical Advisory Disclaimer */}
        <div className="text-center">
          <p className="text-[11px] text-[#889d9a] leading-relaxed">
            Not a medical diagnosis. In medical emergencies, immediately call{' '}
            <a href="tel:108" className="font-semibold text-[#9b1c1c] hover:underline">
              108
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

