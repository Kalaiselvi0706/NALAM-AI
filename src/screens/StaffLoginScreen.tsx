import React, { useState } from 'react';
import { ASSETS, ScreenId } from '../data/mockData';

interface StaffLoginScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const StaffLoginScreen: React.FC<StaffLoginScreenProps> = ({ onNavigate }) => {
  const [staffId, setStaffId] = useState('PHC-TN-4082');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberTerminal, setRememberTerminal] = useState(true);
  const [authStatus, setAuthStatus] = useState<'idle' | 'authenticating' | 'authenticated'>('idle');
  const [showForgotNote, setShowForgotNote] = useState(false);

  const handleStaffLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthStatus('authenticating');
    setTimeout(() => {
      setAuthStatus('authenticated');
      setTimeout(() => {
        onNavigate('staff-dashboard');
      }, 600);
    }, 650);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="w-full max-w-[1280px] mx-auto px-margin-mobile sm:px-gutter py-space-md sm:py-space-xl min-h-[calc(100vh-160px)] flex items-center justify-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 rounded-[2rem] overflow-hidden bg-surface-container-lowest shadow-[0_20px_48px_-12px_rgba(0,104,95,0.08),0_1px_3px_0_rgba(0,0,0,0.03)]">
          {/* LEFT HERO COLUMN */}
          <div className="lg:col-span-7 relative min-h-[440px] lg:min-h-[660px] flex flex-col justify-between p-space-lg sm:p-space-xl overflow-hidden">
            {/* Rural PHC Clinical Photograph Background */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
              style={{
                backgroundImage: `url('${ASSETS.phcHero}')`,
              }}
            ></div>
            {/* Deep Clinical Emerald Atmospheric Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-on-primary-fixed via-primary/75 to-primary/40 backdrop-blur-[1px]"></div>
            {/* Soft Ambient Light Accents */}
            <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-secondary-fixed/20 blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-primary-fixed/15 blur-3xl pointer-events-none"></div>

            {/* Top Micro-Badge */}
            <div className="relative z-10 flex items-center gap-space-sm">
              <div className="inline-flex items-center gap-2 px-space-md py-1.5 rounded-full bg-surface-container-lowest/20 backdrop-blur-md text-on-primary font-label-md text-label-md">
                <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-pulse"></span>
                <span>PHC Clinical Node 4082 • Online</span>
              </div>
            </div>

            {/* Center/Bottom Editorial Brand Storytelling */}
            <div className="relative z-10 flex flex-col gap-space-md mt-auto pt-space-xl">
              <div className="flex items-center gap-space-sm">
                <span className="px-space-sm py-1 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm uppercase tracking-wider">
                  Rural Health Mission
                </span>
                <span className="font-label-sm text-label-sm text-surface-container-high/80">
                  Authorized Staff Terminal
                </span>
              </div>
              <div className="space-y-1">
                <h1 className="font-headline-xl text-headline-xl text-on-primary tracking-tight font-bold">
                  NALAM AI
                </h1>
                <p className="font-headline-md text-headline-md text-secondary-fixed font-semibold tracking-tight">
                  AI-Assisted Symptom Triage
                </p>
              </div>
              <p className="font-body-lg text-body-lg text-surface-container-lowest/90 max-w-lg leading-relaxed">
                Connecting patients with the right healthcare support. Assisting medical officers,
                staff nurses, and field workers with evidence-based rapid clinical prioritization.
              </p>

              {/* Trust Badges & Clinical Protocol Footer Strip */}
              <div className="pt-space-md flex flex-wrap items-center gap-y-2 gap-x-space-md text-surface-container-highest/80 font-label-md text-label-md">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-secondary-fixed text-[18px]">
                    verified_user
                  </span>
                  <span>National Rural Health Initiative</span>
                </div>
                <span className="text-surface-container-highest/40">•</span>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-secondary-fixed text-[18px]">
                    local_hospital
                  </span>
                  <span>Primary Health Center Network</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT LOGIN FORM COLUMN */}
          <div className="lg:col-span-5 p-space-lg sm:p-space-xl flex flex-col justify-between bg-surface-container-low/40 relative">
            <div className="w-full max-w-md mx-auto my-auto py-space-sm flex flex-col gap-space-lg">
              {/* Identity Header */}
              <div className="flex flex-col items-start gap-space-sm">
                <div className="p-2.5 rounded-2xl bg-surface-container-lowest shadow-sm flex items-center justify-center">
                  <img
                    alt="NALAM AI Brand Logo"
                    className="h-12 w-12 object-contain"
                    src={ASSETS.logo}
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-1">
                  <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
                    Welcome Back
                  </h2>
                  <p className="font-label-lg text-label-lg text-primary font-semibold">
                    PHC Staff Portal
                  </p>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Please enter your institutional credentials to access the rapid triage assessment
                  panel.
                </p>
              </div>

              {/* Login Form */}
              <form className="space-y-space-md" onSubmit={handleStaffLogin}>
                <div className="space-y-1.5">
                  <label
                    className="flex items-center justify-between font-label-md text-label-md text-on-surface font-semibold"
                    htmlFor="staff-id"
                  >
                    <span>Staff ID / Official Email</span>
                    <span className="font-label-sm text-label-sm text-outline">
                      NIC / NHM Domain
                    </span>
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3.5 text-[20px] text-primary select-none pointer-events-none">
                      badge
                    </span>
                    <input
                      id="staff-id"
                      name="staffId"
                      type="text"
                      required
                      value={staffId}
                      onChange={(e) => setStaffId(e.target.value)}
                      placeholder="e.g. PHC-TN-4082 or dr.kavitha@nhm.gov.in"
                      className="w-full h-12 pl-11 pr-4 rounded-xl bg-surface-container-lowest font-body-md text-body-md text-on-surface placeholder:text-outline/70 shadow-sm focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    className="font-label-md text-label-md text-on-surface font-semibold block"
                    htmlFor="staff-password"
                  >
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3.5 text-[20px] text-primary select-none pointer-events-none">
                      lock
                    </span>
                    <input
                      id="staff-password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full h-12 pl-11 pr-12 rounded-xl bg-surface-container-lowest font-body-md text-body-md text-on-surface placeholder:text-outline/70 shadow-sm focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary transition-all duration-200"
                    />
                    <button
                      type="button"
                      aria-label="Toggle password visibility"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2.5 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={rememberTerminal}
                      onChange={(e) => setRememberTerminal(e.target.checked)}
                      className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary cursor-pointer"
                    />
                    <span className="font-label-sm text-label-sm text-on-surface-variant group-hover:text-on-surface transition-colors select-none">
                      Remember this terminal
                    </span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowForgotNote((prev) => !prev)}
                    className="font-label-sm text-label-sm text-primary hover:text-primary-container font-semibold transition-colors focus:outline-none focus:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>

                {showForgotNote && (
                  <div className="p-3 rounded-xl bg-surface-container text-on-surface-variant font-body-sm text-body-sm">
                    Contact your District Medical Officer (DMO) IT Nodal Desk or dial NHM Helpline
                    104 for instant NIC token reset.
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={authStatus !== 'idle'}
                    className="w-full min-h-[48px] py-3.5 px-space-md rounded-xl bg-primary text-on-primary hover:bg-primary-container font-label-lg text-label-lg font-medium shadow-[0_4px_16px_-2px_rgba(0,104,95,0.35)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-80"
                  >
                    <span>Sign In to PHC Portal</span>
                    <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </button>
                </div>

                {authStatus !== 'idle' && (
                  <div className="p-space-sm rounded-xl bg-secondary-container text-on-secondary-container font-label-md text-label-md flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                    <span>
                      {authStatus === 'authenticating'
                        ? 'Authenticating PHC Medical Registry Credentials...'
                        : 'Authenticated. Launching PHC Triage Desk...'}
                    </span>
                  </div>
                )}
              </form>

              {/* Security Assurance Card */}
              <div className="p-space-md rounded-2xl bg-surface-container-lowest/80 shadow-sm flex items-start gap-space-sm">
                <div className="p-1.5 rounded-lg bg-secondary-container/50 text-on-secondary-container">
                  <span className="material-symbols-outlined text-[18px]">encrypted</span>
                </div>
                <div className="space-y-0.5">
                  <p className="font-label-md text-label-md text-on-surface font-semibold">
                    Protected Clinical Access
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-snug">
                    Secure access exclusively for authorized PHC staff, medical officers &amp; field
                    health personnel. Unauthorized access attempts are monitored and recorded under
                    Health Ministry regulations.
                  </p>
                </div>
              </div>
            </div>

            {/* Terminal System Metadata Footer */}
            <div className="w-full max-w-md mx-auto pt-space-md flex items-center justify-between font-label-sm text-label-sm text-outline">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                <span>Version 2.4.1 (Clinical Triage Build)</span>
              </div>
              <span>Ayushman Bharat Digital Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
