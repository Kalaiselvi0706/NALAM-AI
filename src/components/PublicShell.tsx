import React, { useState } from 'react';
import { ASSETS, LanguageCode, ScreenId } from '../data/mockData';

interface PublicShellProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  language: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  children: React.ReactNode;
}

const SIDEBAR_ITEMS: { id: ScreenId; label: string; icon: string }[] = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'symptom-check', label: 'Symptom Chat', icon: 'chat' },
  { id: 'triage-result', label: 'Triage Record', icon: 'assignment_turned_in' },
  { id: 'staff-login', label: 'Staff Login', icon: 'badge' },
  { id: 'staff-dashboard', label: 'PHC Triage Queue', icon: 'grid_view' },
  { id: 'case-detail', label: 'Case Review', icon: 'e911_emergency' },
  { id: 'phc-locator', label: 'Nearby PHC Center', icon: 'pin_drop' },
];

export const PublicShell: React.FC<PublicShellProps> = ({
  currentScreen,
  onNavigate,
  language,
  onLanguageChange,
  children,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [infoModal, setInfoModal] = useState<'privacy' | 'guidelines' | null>(null);

  const handleNavClick = (screen: ScreenId) => {
    onNavigate(screen);
    setMobileMenuOpen(false);
  };

  return (
    <div className="bg-[#F7FAFA] font-body-md text-[#191c1e] antialiased min-h-screen flex flex-col">
      {/* FULL-HEIGHT PERMANENT LEFT SIDEBAR */}
      <aside className="hidden lg:flex fixed top-0 bottom-0 left-0 w-64 bg-white border-r border-[#e5e9eb] shadow-[0_1px_8px_rgba(0,0,0,0.02)] z-40 flex-col">
        {/* NALAM AI Brand Header */}
        <div className="px-6 py-5 border-b border-[#f0f4f4] flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 text-left cursor-pointer group w-full"
          >
            <img
              alt="NALAM AI Logo"
              className="h-9 w-auto object-contain"
              src={ASSETS.logo}
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col">
              <span className="font-extrabold text-lg text-[#087F78] tracking-tight leading-tight">
                NALAM AI
              </span>
              <span className="text-[11px] text-[#546e6b] font-medium leading-tight mt-0.5">
                AI-Assisted<br />Symptom Triage
              </span>
            </div>
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
          {SIDEBAR_ITEMS.map((item) => {
            const active = currentScreen === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-label-md text-sm transition-all cursor-pointer text-left w-full ${
                  active
                    ? 'bg-[#E7F5F3] text-[#087F78] font-semibold shadow-2xs'
                    : 'text-[#4a5f5c] hover:bg-[#f2f7f6] hover:text-[#087F78] font-medium'
                }`}
              >
                {/* Left Active Indicator */}
                {active && (
                  <span className="absolute left-1 top-2 bottom-2 w-1 rounded-full bg-[#087F78]"></span>
                )}
                <span
                  className={`material-symbols-outlined text-[20px] shrink-0 ${
                    active ? 'text-[#087F78]' : 'text-[#546e6b]'
                  }`}
                >
                  {item.icon}
                </span>
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* MOBILE DRAWER SIDEBAR */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
          <div className="relative w-64 bg-white h-full shadow-2xl z-10 flex flex-col">
            <div className="px-5 py-4 border-b border-[#f0f4f4] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  alt="Logo"
                  className="h-7 w-auto object-contain"
                  src={ASSETS.logo}
                  referrerPolicy="no-referrer"
                />
                <div className="flex flex-col">
                  <span className="font-bold text-base text-[#087F78]">NALAM AI</span>
                  <span className="text-[10px] text-[#546e6b]">AI Symptom Triage</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-lg text-[#546e6b] hover:bg-gray-100 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
              {SIDEBAR_ITEMS.map((item) => {
                const active = currentScreen === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className={`relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm transition-all cursor-pointer text-left w-full ${
                      active
                        ? 'bg-[#E7F5F3] text-[#087F78] font-semibold'
                        : 'text-[#4a5f5c] hover:bg-[#f2f7f6] hover:text-[#087F78] font-medium'
                    }`}
                  >
                    {active && (
                      <span className="absolute left-1 top-2 bottom-2 w-1 rounded-full bg-[#087F78]"></span>
                    )}
                    <span
                      className={`material-symbols-outlined text-[20px] ${
                        active ? 'text-[#087F78]' : 'text-[#546e6b]'
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* TOP HEADER (Beside Sidebar on Desktop) */}
      <header className="fixed top-0 right-0 left-0 lg:left-64 h-16 bg-white/95 backdrop-blur-md border-b border-[#e5e9eb] shadow-[0_1px_6px_rgba(0,0,0,0.02)] z-30 px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 rounded-xl text-[#4a5f5c] hover:bg-[#f2f7f6] cursor-pointer"
            title="Open navigation menu"
          >
            <span className="material-symbols-outlined text-[22px]">menu</span>
          </button>

          {/* Left / Center Header Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => onNavigate('symptom-check')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer text-xs sm:text-sm font-medium whitespace-nowrap ${
                currentScreen === 'symptom-check'
                  ? 'text-[#087F78] bg-[#E7F5F3] font-semibold'
                  : 'text-[#546e6b] hover:text-[#087F78] hover:bg-[#f2f7f6]'
              }`}
            >
              Symptom Check
            </button>
            <button
              type="button"
              onClick={() => {
                if (currentScreen !== 'home') {
                  onNavigate('home');
                }
                const featureSection = document.getElementById('features-strip');
                if (featureSection) {
                  featureSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-3 py-1.5 rounded-xl transition-all cursor-pointer text-xs sm:text-sm font-medium whitespace-nowrap text-[#546e6b] hover:text-[#087F78] hover:bg-[#f2f7f6]"
            >
              How It Works
            </button>
            <button
              type="button"
              onClick={() => onNavigate('phc-locator')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer text-xs sm:text-sm font-medium whitespace-nowrap ${
                currentScreen === 'phc-locator'
                  ? 'text-[#087F78] bg-[#E7F5F3] font-semibold'
                  : 'text-[#546e6b] hover:text-[#087F78] hover:bg-[#f2f7f6]'
              }`}
            >
              Nearby PHC Center
            </button>
          </nav>
        </div>

        {/* Right Header Actions */}
        <div className="flex items-center gap-2 sm:gap-3.5">
          {/* Emergency: 108 / 104 Button */}
          <a
            href="tel:108"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fde8e8] text-[#9b1c1c] border border-[#fbd5d5] hover:bg-[#fbd5d5] text-xs font-semibold transition-colors whitespace-nowrap shadow-2xs"
          >
            <span className="material-symbols-outlined text-[15px] text-[#9b1c1c]">emergency</span>
            <span>Emergency: 108 / 104</span>
          </a>

          {/* Clean White Rounded Language Selector */}
          <div className="flex items-center rounded-full bg-white border border-[#e5e9eb] p-0.5 shadow-2xs">
            <button
              type="button"
              onClick={() => onLanguageChange('en')}
              className={`px-2.5 py-0.5 rounded-full text-xs transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-[#E7F5F3] font-bold text-[#087F78]'
                  : 'text-[#546e6b] hover:text-[#102a27]'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('ta')}
              className={`px-2.5 py-0.5 rounded-full text-xs transition-all cursor-pointer ${
                language === 'ta'
                  ? 'bg-[#E7F5F3] font-bold text-[#087F78]'
                  : 'text-[#546e6b] hover:text-[#102a27]'
              }`}
            >
              தமிழ்
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('hi')}
              className={`px-2.5 py-0.5 rounded-full text-xs transition-all cursor-pointer ${
                language === 'hi'
                  ? 'bg-[#E7F5F3] font-bold text-[#087F78]'
                  : 'text-[#546e6b] hover:text-[#102a27]'
              }`}
            >
              हिन्दी
            </button>
          </div>

          {/* Staff Login Button with very light teal background */}
          <button
            type="button"
            onClick={() => onNavigate('staff-login')}
            className="hidden sm:inline-flex items-center px-3.5 py-1.5 rounded-xl bg-[#E7F5F3] text-[#087F78] hover:bg-[#d8ece9] font-semibold text-xs transition-all cursor-pointer whitespace-nowrap shadow-2xs"
          >
            Staff Login
          </button>

          {/* Profile / Station Button */}
          <button
            type="button"
            onClick={() => onNavigate('staff-dashboard')}
            title="Open PHC Staff Station"
            className="w-8 h-8 rounded-full bg-[#087F78] text-white flex items-center justify-center hover:bg-[#00685f] transition-all cursor-pointer shadow-2xs shrink-0"
          >
            <span className="material-symbols-outlined text-[17px]">person</span>
          </button>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <div className="w-full pt-16 lg:pl-64 flex-1 flex flex-col justify-between">
        <main className="w-full flex-1">{children}</main>

        {/* MINIMAL HEALTHCARE FOOTER */}
        <footer className="w-full bg-white border-t border-[#e5e9eb] mt-12">
          <div className="max-w-[1200px] mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[#546e6b] text-xs">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#00685f] text-[18px]">
                health_and_safety
              </span>
              <span className="font-medium">
                NALAM AI • Primary Healthcare Triage Initiative
              </span>
            </div>
            <div className="flex items-center gap-6 font-medium">
              <button
                type="button"
                onClick={() => setInfoModal('privacy')}
                className="hover:text-[#00685f] cursor-pointer"
              >
                Clinical Privacy Notice
              </button>
              <button
                type="button"
                onClick={() => setInfoModal('guidelines')}
                className="hover:text-[#00685f] cursor-pointer"
              >
                Field Worker Guidelines
              </button>
            </div>
            <span className="text-[#889d9a]">
              © Rural Health Mission • National Health Portal
            </span>
          </div>
        </footer>
      </div>

      {/* CLINICAL GOVERNANCE MODAL */}
      {infoModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl flex flex-col gap-4 border border-[#e5e9eb]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00685f]">
                  {infoModal === 'privacy' ? 'verified_user' : 'clinical_notes'}
                </span>
                <h3 className="font-bold text-base text-[#191c1e]">
                  {infoModal === 'privacy'
                    ? 'Clinical Privacy & Data Governance Notice'
                    : 'ASHA & Field Worker Triage Guidelines'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setInfoModal(null)}
                className="text-[#546e6b] hover:text-[#191c1e] cursor-pointer p-1"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <p className="text-sm text-[#546e6b] leading-relaxed">
              {infoModal === 'privacy'
                ? 'All patient voice recordings, symptom transcripts, and ABHA health identifiers are encrypted end-to-end (256-bit AES) and transmitted exclusively to your designated Primary Health Center (PHC) clinical node under National Health Mission (NHM) digital standards.'
                : 'Field workers and ASHA personnel should record patient symptoms in the patient’s native phrasing, verify baseline vitals (SpO2, BP, temperature) when portable kits are available, and immediately trigger 108 ALS transport for Priority 1 (Code Red) chest pain or acute dyspnea.'}
            </p>
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setInfoModal(null)}
                className="px-4 py-2 rounded-xl bg-[#00685f] text-white text-xs font-semibold hover:bg-[#005049] cursor-pointer"
              >
                Acknowledge
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
