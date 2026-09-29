import React, { useState } from 'react';
import { ASSETS, ScreenId } from '../data/mockData';
import { useTranslation } from '../context/LanguageContext';

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
  const { t } = useTranslation();

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
                <span>{t('login.badge')}</span>
              </div>
            </div>

            {/* Center/Bottom Editorial Brand Storytelling */}
            <div className="relative z-10 flex flex-col gap-space-md mt-auto pt-space-xl">
              <div className="flex items-center gap-space-sm">
                <span className="px-space-sm py-1 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm uppercase tracking-wider">
                  {t('login.mission')}
                </span>
                <span className="font-label-sm text-label-sm text-surface-container-high/80">
                  {t('login.authorizedTerminal')}
                </span>
              </div>
              <div className="space-y-1">
                <h1 className="font-headline-xl text-headline-xl text-on-primary tracking-tight font-bold">
                  {t('brand.name')}
                </h1>
                <p className="font-headline-md text-headline-md text-secondary-fixed font-semibold tracking-tight">
                  {t('brand.subtitle')}
                </p>
              </div>
              <p className="font-body-lg text-body-lg text-surface-container-lowest/90 max-w-lg leading-relaxed">
                {t('login.subtitle')}
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
                    {t('login.title')}
                  </h2>
                  <p className="font-label-lg text-label-lg text-primary font-semibold">
                    {t('login.authorizedTerminal')}
                  </p>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  {t('login.subtitle')}
                </p>
              </div>

              {/* Login Form */}
              <form className="space-y-space-md" onSubmit={handleStaffLogin}>
                <div className="space-y-1.5">
                  <label
                    className="flex items-center justify-between font-label-md text-label-md text-on-surface font-semibold"
                    htmlFor="staff-id"
                  >
                    <span>{t('login.staffIdLabel')}</span>
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
                      type="text"
                      required
                      value={staffId}
                      onChange={(e) => setStaffId(e.target.value)}
                      placeholder="e.g. PHC-TN-4082"
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-surface-container-lowest border border-outline-variant/60 text-on-surface placeholder:text-outline font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label
                      className="font-label-md text-label-md text-on-surface font-semibold"
                      htmlFor="staff-password"
                    >
                      {t('login.passwordLabel')}
                    </label>
                  </div>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3.5 text-[20px] text-primary select-none pointer-events-none">
                      lock
                    </span>
                    <input
                      id="staff-password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter access credentials"
                      className="w-full pl-11 pr-11 py-3 rounded-xl bg-surface-container-lowest border border-outline-variant/60 text-on-surface placeholder:text-outline font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-xs"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 text-outline hover:text-on-surface p-0.5 rounded cursor-pointer"
                      title={showPassword ? 'Hide password' : 'Show password'}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer select-none text-on-surface-variant font-medium">
                    <input
                      type="checkbox"
                      checked={rememberTerminal}
                      onChange={(e) => setRememberTerminal(e.target.checked)}
                      className="w-4 h-4 rounded text-primary focus:ring-primary accent-[#087F78]"
                    />
                    <span>{t('login.rememberTerminal')}</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={authStatus !== 'idle'}
                  className="w-full py-3.5 px-4 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-semibold text-sm shadow-md transition-all active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
                >
                  {authStatus === 'authenticating' ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      <span>{t('login.signingIn')}</span>
                    </>
                  ) : (
                    <span>{t('login.signInBtn')}</span>
                  )}
                </button>
              </form>

              {/* Demo Hint */}
              <div className="p-3 rounded-xl bg-secondary-container/40 text-on-secondary-container text-xs flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-primary">info</span>
                <span>{t('login.demoHint')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

