import React, { useState } from 'react';
import { ASSETS, ScreenId } from '../data/mockData';

export type StaffNavTab = 'triage-queue' | 'active-cases' | 'urgent-referrals' | 'phc-analytics';

interface StaffShellProps {
  activeTab: StaffNavTab;
  onSelectTab: (tab: StaffNavTab) => void;
  onNavigate: (screen: ScreenId) => void;
  children: React.ReactNode;
}

export const StaffShell: React.FC<StaffShellProps> = ({
  activeTab,
  onSelectTab,
  onNavigate,
  children,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased min-h-screen">
      <aside className="fixed left-0 top-0 h-full w-64 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col pt-space-lg pb-space-lg">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="px-space-lg pb-space-lg flex items-center gap-space-sm text-left cursor-pointer"
        >
          <img
            alt="Logo"
            className="h-7 w-auto object-contain"
            src={ASSETS.logo}
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-primary tracking-tight leading-none">
              NALAM AI
            </span>
            <span className="font-label-sm text-label-sm text-secondary font-semibold leading-tight">
              PHC Staff Portal
            </span>
          </div>
        </button>

        <div className="px-space-lg mb-space-md">
          <div className="px-space-md py-space-sm rounded-xl bg-surface-container-low flex items-center gap-space-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-primary-container animate-pulse"></span>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface font-semibold">
                Shift: Active
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                Rural Health Mission
              </span>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-space-md flex flex-col gap-1">
          <button
            type="button"
            onClick={() => {
              onSelectTab('triage-queue');
              onNavigate('staff-dashboard');
            }}
            className={`flex items-center gap-space-md px-space-md py-space-sm transition-all cursor-pointer text-left ${
              activeTab === 'triage-queue'
                ? 'bg-primary-container text-on-primary-container font-semibold rounded-xl'
                : 'rounded-xl text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">grid_view</span>
            <span className="font-label-lg text-label-lg">Triage Queue</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onSelectTab('active-cases');
              onNavigate('staff-dashboard');
            }}
            className={`flex items-center gap-space-md px-space-md py-space-sm transition-all cursor-pointer text-left ${
              activeTab === 'active-cases'
                ? 'bg-primary-container text-on-primary-container font-semibold rounded-xl'
                : 'rounded-xl text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">clinical_notes</span>
            <span className="font-label-lg text-label-lg">Active Cases</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onSelectTab('urgent-referrals');
              onNavigate('staff-dashboard');
            }}
            className={`flex items-center gap-space-md px-space-md py-space-sm transition-all cursor-pointer text-left ${
              activeTab === 'urgent-referrals'
                ? 'bg-primary-container text-on-primary-container font-semibold rounded-xl'
                : 'rounded-xl text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">emergency_home</span>
            <span className="font-label-lg text-label-lg">Referrals &amp; 108</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onSelectTab('phc-analytics');
              onNavigate('staff-dashboard');
            }}
            className={`flex items-center gap-space-md px-space-md py-space-sm transition-all cursor-pointer text-left ${
              activeTab === 'phc-analytics'
                ? 'bg-primary-container text-on-primary-container font-semibold rounded-xl'
                : 'rounded-xl text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">monitoring</span>
            <span className="font-label-lg text-label-lg">Epidemic Pulse</span>
          </button>
        </nav>

        <div className="px-space-md pt-space-md mt-auto">
          <div className="p-space-sm rounded-xl bg-surface-container-low flex items-center justify-between gap-space-sm">
            <div className="flex items-center gap-space-sm">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary text-[18px]">
                  person
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-md text-label-md font-semibold text-on-surface">
                  Dr. Priya R.
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Duty MO</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('staff-login')}
              className="p-1 rounded-lg text-on-surface-variant hover:text-error hover:bg-error-container/40 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <span className="material-symbols-outlined text-[20px]">logout</span>
            </button>
          </div>
        </div>
      </aside>

      <div className="pl-64">
        <header className="fixed top-0 left-64 right-0 h-16 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-space-lg">
          <div className="flex items-center gap-space-md">
            <span className="font-headline-sm text-headline-sm text-on-surface">
              PHC Staff Station
            </span>
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              <span>Live Triage Sync: Connected</span>
            </div>
          </div>

          <div className="flex items-center gap-space-md relative">
            <button
              type="button"
              onClick={() => setShowNotifications((prev) => !prev)}
              className="relative w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-1.5 right-2 w-2 h-2 rounded-full bg-error"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
            </div>

            {showNotifications && (
              <div className="absolute right-0 top-12 w-80 rounded-2xl bg-surface-container-lowest shadow-xl p-4 z-50 border border-surface-container">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-label-lg text-label-lg text-on-surface">
                    Station Alerts (2)
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowNotifications(false)}
                    className="text-outline hover:text-on-surface text-xs cursor-pointer"
                  >
                    Dismiss
                  </button>
                </div>
                <div className="space-y-2 text-left">
                  <div
                    onClick={() => {
                      setShowNotifications(false);
                      onNavigate('case-detail');
                    }}
                    className="p-2.5 rounded-xl bg-error-container/30 hover:bg-error-container/50 cursor-pointer transition-colors"
                  >
                    <p className="font-label-md text-label-md text-error font-semibold">
                      Code Red: Case #C1024
                    </p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Retrosternal chest pain • ASHA field intake 14m ago
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-surface-container-low">
                    <p className="font-label-md text-label-md text-on-surface font-semibold">
                      108 ALS Unit #TN-72-G-1084
                    </p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Stationed at Alangulam PHC Bay #02 • Ready
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>

        <main className="relative pt-16 bg-surface min-h-screen">{children}</main>
      </div>
    </div>
  );
};
