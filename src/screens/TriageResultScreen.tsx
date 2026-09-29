import React, { useState } from 'react';
import { ScreenId } from '../data/mockData';

interface TriageResultScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const TriageResultScreen: React.FC<TriageResultScreenProps> = ({ onNavigate }) => {
  const [showShareToast, setShowShareToast] = useState(false);

  const handleShare = () => {
    const textToShare =
      'NALAM AI Triage #TN-4082-89: Priority 2 - Medical Attention Recommended within 24 hours at nearest PHC.';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToShare).catch(() => {});
    }
    setShowShareToast(true);
    setTimeout(() => {
      setShowShareToast(false);
    }, 3500);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="relative w-full max-w-[1040px] mx-auto px-gutter py-space-lg sm:py-space-xl">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[540px] h-[320px] bg-secondary-container/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute top-48 right-4 w-[280px] h-[280px] bg-surface-container-high/40 rounded-full blur-2xl pointer-events-none -z-10"></div>

        {/* Record Header Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mb-space-lg">
          <div className="flex items-center gap-space-sm">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-surface-container font-label-sm text-label-sm font-semibold text-on-surface-variant uppercase tracking-wider">
              Official Triage Record
            </span>
            <span className="font-label-md text-label-md text-outline">TN-4082-89</span>
          </div>
          <div className="flex items-center gap-space-sm text-outline font-label-md text-label-md">
            <span className="inline-block w-2 h-2 rounded-full bg-secondary"></span>
            <span>Evaluated Today • 10:42 AM IST</span>
          </div>
        </div>

        {/* Main Triage Card */}
        <div className="relative bg-surface-container-lowest rounded-xl shadow-xl overflow-hidden">
          <div className="h-2 w-full bg-gradient-to-r from-amber-400 via-amber-500 to-primary"></div>

          <div className="p-space-lg sm:p-space-xl flex flex-col items-center text-center">
            <div className="relative mb-space-md">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-amber-50 flex items-center justify-center shadow-inner">
                <span
                  className="material-symbols-outlined text-amber-600 text-[42px] sm:text-[50px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  medical_services
                </span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-amber-500 text-surface-container-lowest flex items-center justify-center shadow-md">
                <span className="material-symbols-outlined text-[16px]">schedule</span>
              </div>
            </div>

            <div className="inline-flex items-center gap-space-sm px-5 py-2.5 rounded-full bg-[#FEF3C7] text-amber-950 shadow-sm mb-space-md">
              <span className="inline-block w-3 h-3 rounded-full bg-amber-500 shadow-sm"></span>
              <span className="font-headline-sm text-headline-sm uppercase tracking-wide">
                Medical Attention Recommended
              </span>
            </div>

            <h1 className="font-headline-lg text-headline-lg text-on-surface max-w-2xl tracking-tight mb-space-sm">
              Visit Your Primary Health Center
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mb-space-xl">
              Your symptoms should be evaluated by a healthcare professional at your local Primary
              Health Center within 24 hours.
            </p>

            {/* 3 Summary Sub-Cards */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-space-md mb-space-xl text-left">
              <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col justify-between">
                <div className="flex items-center gap-space-xs text-outline mb-space-sm">
                  <span className="material-symbols-outlined text-[18px]">emergency_home</span>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                    Triage Code
                  </span>
                </div>
                <div>
                  <p className="font-headline-sm text-headline-sm text-on-surface">Priority 2</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                    Sub-acute • Timely PHC Care
                  </p>
                </div>
              </div>

              <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col justify-between">
                <div className="flex items-center gap-space-xs text-outline mb-space-sm">
                  <span className="material-symbols-outlined text-[18px]">diagnosis</span>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                    Observation
                  </span>
                </div>
                <div>
                  <p className="font-headline-sm text-headline-sm text-on-surface line-clamp-1">
                    Persistent Cough
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                    Mild febrile state noted
                  </p>
                </div>
              </div>

              <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col justify-between">
                <div className="flex items-center gap-space-xs text-outline mb-space-sm">
                  <span className="material-symbols-outlined text-[18px]">self_care</span>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                    Home Care
                  </span>
                </div>
                <div>
                  <p className="font-headline-sm text-headline-sm text-on-surface">
                    Hydrate &amp; Rest
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                    Avoid heavy exertion
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="w-full max-w-xl flex flex-col sm:flex-row items-center gap-space-md">
              <button
                type="button"
                onClick={() => onNavigate('phc-locator')}
                className="w-full sm:flex-1 h-14 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-headline-sm text-headline-sm flex items-center justify-center gap-space-sm shadow-lg transition-transform active:scale-[0.98] cursor-pointer"
              >
                <span>Find Nearby PHC &amp; Schedule</span>
                <span className="material-symbols-outlined text-[22px]">arrow_forward</span>
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="w-full sm:w-auto h-14 px-space-lg rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-lg text-label-lg flex items-center justify-center gap-space-sm transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px] text-primary">share</span>
                <span>Share via WhatsApp / SMS</span>
              </button>
            </div>

            {showShareToast && (
              <div className="mt-space-md px-space-md py-2 rounded-lg bg-inverse-surface text-inverse-on-surface font-label-sm text-label-sm transition-opacity">
                Triage summary link copied to clipboard for field sharing
              </div>
            )}
          </div>

          <div className="bg-surface-container-low/70 px-space-lg sm:px-space-xl py-space-md flex flex-col sm:flex-row items-center justify-between gap-space-sm">
            <div className="flex items-center gap-space-sm text-outline font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[18px] text-primary">verified</span>
              <span>Validated against National Rural Health Clinical Protocol 2024</span>
            </div>
            <div className="flex items-center gap-space-sm font-label-sm text-label-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-[16px]">location_on</span>
              <span>District Health Sub-center: Kovilpatti Rural</span>
            </div>
          </div>
        </div>

        {/* Emergency Advisory Banner */}
        <div className="mt-space-lg rounded-xl bg-error-container/40 p-space-md sm:p-space-lg flex items-start gap-space-md">
          <div className="w-10 h-10 rounded-full bg-error text-on-error flex items-center justify-center shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-[22px]">emergency</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm w-full">
            <div>
              <p className="font-headline-sm text-headline-sm text-on-error-container">
                Emergency Advisory
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 max-w-2xl">
                AI-assisted triage only. Not a medical diagnosis. If symptoms worsen suddenly or
                breathing becomes difficult, immediately dial 108.
              </p>
            </div>
            <a
              className="inline-flex items-center justify-center gap-1.5 px-space-md py-2 rounded-xl bg-error text-on-error hover:bg-on-error-container font-label-md text-label-md font-semibold shrink-0 shadow-sm transition-colors"
              href="tel:108"
            >
              <span className="material-symbols-outlined text-[18px]">call</span>
              <span>Call 108</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
