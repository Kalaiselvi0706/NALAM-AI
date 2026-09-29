import { useState } from 'react';
import {
  INITIAL_CASES,
  LanguageCode,
  PriorityCase,
  ScreenId,
} from './data/mockData';
import { LanguageProvider } from './context/LanguageContext';
import { PublicShell } from './components/PublicShell';
import { StaffNavTab, StaffShell } from './components/StaffShell';
import { HomeScreen } from './screens/HomeScreen';
import { SymptomCheckScreen } from './screens/SymptomCheckScreen';
import { TriageResultScreen } from './screens/TriageResultScreen';
import { PhcLocatorScreen } from './screens/PhcLocatorScreen';
import { StaffLoginScreen } from './screens/StaffLoginScreen';
import { StaffDashboardScreen } from './screens/StaffDashboardScreen';
import { CaseDetailScreen } from './screens/CaseDetailScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [cases, setCases] = useState<PriorityCase[]>(INITIAL_CASES);
  const [selectedCaseId, setSelectedCaseId] = useState<string>('C1024');
  const [staffTab, setStaffTab] = useState<StaffNavTab>('triage-queue');
  const [prefilledVoiceText, setPrefilledVoiceText] = useState<string>('');

  const selectedCase =
    cases.find((c) => c.id === selectedCaseId) || cases[0];

  const handleSelectCase = (caseId: string) => {
    setSelectedCaseId(caseId);
    setCurrentScreen('case-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateCase = (updated: PriorityCase) => {
    setCases((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item))
    );
  };

  const handleNavigate = (screen: ScreenId, voiceText?: string) => {
    if (voiceText) {
      setPrefilledVoiceText(voiceText);
    }
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isStaffScreen =
    currentScreen === 'staff-dashboard' || currentScreen === 'case-detail';

  return (
    <LanguageProvider language={language} onLanguageChange={setLanguage}>
      <div className="relative min-h-screen">
        {isStaffScreen ? (
          <StaffShell
            activeTab={staffTab}
            onSelectTab={setStaffTab}
            onNavigate={handleNavigate}
          >
            {currentScreen === 'staff-dashboard' ? (
              <StaffDashboardScreen
                cases={cases}
                onSelectCase={handleSelectCase}
                activeTab={staffTab}
              />
            ) : (
              <CaseDetailScreen
                caseData={selectedCase}
                onBack={() => handleNavigate('staff-dashboard')}
                onUpdateCase={handleUpdateCase}
              />
            )}
          </StaffShell>
        ) : (
          <PublicShell
            currentScreen={currentScreen}
            onNavigate={handleNavigate}
            language={language}
            onLanguageChange={setLanguage}
          >
            {currentScreen === 'home' && (
              <HomeScreen onNavigate={handleNavigate} />
            )}
            {currentScreen === 'symptom-check' && (
              <SymptomCheckScreen
                onNavigate={handleNavigate}
                language={language}
                onLanguageChange={setLanguage}
                prefilledInput={prefilledVoiceText}
                onClearPrefilledInput={() => setPrefilledVoiceText('')}
              />
            )}
            {currentScreen === 'triage-result' && (
              <TriageResultScreen onNavigate={handleNavigate} />
            )}
            {currentScreen === 'phc-locator' && (
              <PhcLocatorScreen onNavigate={handleNavigate} />
            )}
            {currentScreen === 'staff-login' && (
              <StaffLoginScreen onNavigate={handleNavigate} />
            )}
          </PublicShell>
        )}
      </div>
    </LanguageProvider>
  );
}

