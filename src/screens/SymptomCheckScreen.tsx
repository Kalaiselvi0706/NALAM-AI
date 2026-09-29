import React, { useState, useRef, useEffect } from 'react';
import { LanguageCode, ScreenId } from '../data/mockData';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'patient';
  text: string;
  time: string;
  subtitle?: string;
  showQuickOptions?: boolean;
  showTriageCardCta?: boolean;
}

interface SymptomCheckScreenProps {
  onNavigate: (screen: ScreenId) => void;
  language: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
}

export const SymptomCheckScreen: React.FC<SymptomCheckScreenProps> = ({
  onNavigate,
  language,
  onLanguageChange,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'bot',
      text: 'Hello! I am NALAM, your rural health assistant. What symptoms are you or your family member experiencing right now?',
      time: '10:42 AM • Medical Assistant',
    },
    {
      id: 'msg-2',
      sender: 'patient',
      text: 'My mother has had a persistent dry cough and mild fever for 3 days. She also feels fatigued.',
      time: '10:43 AM',
    },
    {
      id: 'msg-3',
      sender: 'bot',
      text: 'I understand. Does she have any chest tightness, shortness of breath, or difficulty breathing when resting?',
      time: 'Just now • NALAM Diagnostic Flow',
      showQuickOptions: true,
    },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatStreamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatStreamRef.current) {
      chatStreamRef.current.scrollTop = chatStreamRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const addPatientMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'patient',
      text: trimmed,
      time: timeStr,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let responseMsg =
        'Thank you for the update. Since there is persistent fever accompanied by fatigue, we recommend visiting the nearest Primary Health Center (PHC) for a basic blood count and chest checkup. Ensure she drinks plenty of fluids and rests.';

      if (
        trimmed.toLowerCase().includes('difficulty') ||
        trimmed.toLowerCase().includes('chest')
      ) {
        responseMsg =
          'Please note: Breathing difficulty or chest heaviness warrants immediate clinical evaluation. We have notified the nearest on-duty ASHA health worker and generated Official Triage Record #TN-4082-89.';
      }

      const botReply: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: responseMsg,
        time: 'Just now • NALAM Care Guide',
        showTriageCardCta: true,
      };
      setMessages((prev) => [...prev, botReply]);
    }, 900);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    addPatientMessage(inputValue);
    setInputValue('');
  };

  const handleVoiceToggle = () => {
    if (!isRecording) {
      setIsRecording(true);
    } else {
      setIsRecording(false);
      addPatientMessage('Mother has mild chest heaviness during the evening hours.');
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="w-full max-w-4xl mx-auto px-margin-mobile sm:px-gutter py-space-sm sm:py-space-md flex flex-col min-h-[calc(100vh-160px)]">
        {/* Top Companion Session Bar */}
        <div className="w-full bg-surface-container-lowest/80 backdrop-blur-md rounded-xl p-space-sm sm:px-space-md sm:py-space-sm shadow-sm flex flex-wrap items-center justify-between gap-space-sm mb-space-md">
          <div className="flex items-center gap-space-sm">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-secondary-container text-on-secondary-container">
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                vital_signs
              </span>
              <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-primary ring-2 ring-surface-container-lowest animate-pulse"></span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-headline-sm text-headline-sm text-primary leading-none">
                  NALAM Companion
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm">
                  Active Session
                </span>
              </div>
              <span className="font-label-md text-label-md text-on-surface-variant">
                Confidential Clinical Assessment
              </span>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-space-sm">
            <div className="inline-flex items-center rounded-full bg-surface-container-low p-1 shadow-inner">
              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                className={`px-3 py-1 rounded-full font-label-md text-label-md transition-all flex items-center gap-1 cursor-pointer ${
                  language === 'en'
                    ? 'bg-surface-container-lowest font-semibold text-primary shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">language</span>
                <span>English</span>
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('ta')}
                className={`px-2.5 py-1 rounded-full font-label-md text-label-md transition-all cursor-pointer ${
                  language === 'ta'
                    ? 'bg-surface-container-lowest font-semibold text-primary shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                தமிழ்
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('hi')}
                className={`px-2.5 py-1 rounded-full font-label-md text-label-md transition-all cursor-pointer ${
                  language === 'hi'
                    ? 'bg-surface-container-lowest font-semibold text-primary shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                हिन्दी
              </button>
            </div>

            <a
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-error-container text-on-error-container font-label-md text-label-md font-semibold shadow-sm hover:opacity-90 active:scale-95 transition-all"
              href="tel:108"
            >
              <span className="material-symbols-outlined text-[18px] text-error animate-bounce">
                call
              </span>
              <span>Emergency? Dial 108</span>
            </a>
          </div>
        </div>

        {/* Main Chat Surface */}
        <div className="relative w-full flex-1 flex flex-col justify-between bg-surface-container-lowest rounded-2xl shadow-sm p-space-md sm:p-space-lg mb-space-sm">
          <div className="text-center py-space-sm sm:py-space-md flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-secondary-container via-surface-container-low to-primary-fixed flex items-center justify-center shadow-md mb-space-sm relative">
              <span
                className="material-symbols-outlined text-primary text-[32px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                health_and_safety
              </span>
              <span className="absolute -bottom-1 px-2 py-0.5 rounded-full bg-primary text-on-primary font-label-sm text-label-sm shadow-sm font-semibold">
                AI Nurse
              </span>
            </div>
            <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight mb-1">
              How are you feeling today?
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-lg">
              You can speak or type in your language. Everything shared is strictly private, safe,
              and vetted by clinical triage protocols.
            </p>
            <div className="mt-2 inline-flex items-center gap-1.5 font-label-sm text-label-sm text-outline">
              <span className="material-symbols-outlined text-[14px]">lock</span>
              <span>256-Bit Encrypted Rural Health Portal</span>
            </div>
          </div>

          {/* Chat Stream */}
          <div
            ref={chatStreamRef}
            className="flex flex-col space-y-space-md overflow-y-auto pr-1 my-space-sm max-h-[480px]"
          >
            {messages.map((msg) =>
              msg.sender === 'bot' ? (
                <div key={msg.id} className="flex items-start gap-space-sm max-w-2xl">
                  <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shrink-0 shadow-sm mt-1">
                    <span className="material-symbols-outlined text-[18px]">support_agent</span>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <div className="bg-surface-container-low text-on-surface p-space-md rounded-2xl rounded-tl-sm shadow-sm leading-relaxed font-body-md text-body-md">
                      {msg.text}
                    </div>

                    {msg.showQuickOptions && (
                      <div className="pt-1">
                        <p className="font-label-md text-label-md text-on-surface-variant mb-2">
                          Tap an answer to quickly update her chart:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => addPatientMessage('No breathing difficulty')}
                            className="px-3.5 py-2 rounded-xl bg-surface-container text-on-surface hover:bg-secondary-container hover:text-on-secondary-container font-label-lg text-label-lg transition-all active:scale-95 shadow-sm text-left flex items-center gap-1.5 cursor-pointer"
                          >
                            <span className="w-2 h-2 rounded-full bg-secondary"></span>
                            No breathing difficulty
                          </button>
                          <button
                            type="button"
                            onClick={() => addPatientMessage('Mild chest heaviness')}
                            className="px-3.5 py-2 rounded-xl bg-surface-container text-on-surface hover:bg-secondary-container hover:text-on-secondary-container font-label-lg text-label-lg transition-all active:scale-95 shadow-sm text-left flex items-center gap-1.5 cursor-pointer"
                          >
                            <span className="w-2 h-2 rounded-full bg-outline"></span>
                            Mild chest heaviness
                          </button>
                          <button
                            type="button"
                            onClick={() => addPatientMessage('Difficulty breathing')}
                            className="px-3.5 py-2 rounded-xl bg-surface-container text-on-surface hover:bg-error-container hover:text-on-error-container font-label-lg text-label-lg transition-all active:scale-95 shadow-sm text-left flex items-center gap-1.5 cursor-pointer"
                          >
                            <span className="w-2 h-2 rounded-full bg-error"></span>
                            Difficulty breathing
                          </button>
                          <button
                            type="button"
                            onClick={() => addPatientMessage('High fever > 102°F')}
                            className="px-3.5 py-2 rounded-xl bg-surface-container text-on-surface hover:bg-error-container hover:text-on-error-container font-label-lg text-label-lg transition-all active:scale-95 shadow-sm text-left flex items-center gap-1.5 cursor-pointer"
                          >
                            <span className="w-2 h-2 rounded-full bg-error"></span>
                            High fever &gt; 102°F
                          </button>
                        </div>
                      </div>
                    )}

                    {msg.showTriageCardCta && (
                      <div className="pt-1">
                        <button
                          type="button"
                          onClick={() => onNavigate('triage-result')}
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-on-primary hover:bg-primary-container font-label-lg text-label-lg shadow-sm transition-all cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            assignment_turned_in
                          </span>
                          <span>View Official Triage Record (#TN-4082-89)</span>
                          <span className="material-symbols-outlined text-[18px]">
                            arrow_forward
                          </span>
                        </button>
                      </div>
                    )}

                    <span className="font-label-sm text-label-sm text-outline px-1">
                      {msg.time}
                    </span>
                  </div>
                </div>
              ) : (
                <div
                  key={msg.id}
                  className="flex items-start justify-end gap-space-sm self-end max-w-2xl"
                >
                  <div className="flex flex-col items-end space-y-1">
                    <div className="bg-primary text-on-primary p-space-md rounded-2xl rounded-tr-sm shadow-sm leading-relaxed font-body-md text-body-md text-left">
                      {msg.text}
                    </div>
                    <div className="flex items-center gap-1 px-1">
                      <span className="font-label-sm text-label-sm text-outline">{msg.time}</span>
                      <span className="material-symbols-outlined text-primary text-[14px]">
                        done_all
                      </span>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center shrink-0 shadow-sm mt-1">
                    <span className="material-symbols-outlined text-[18px]">person</span>
                  </div>
                </div>
              )
            )}

            {isTyping && (
              <div className="flex items-start gap-space-sm max-w-2xl">
                <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shrink-0 shadow-sm mt-1">
                  <span className="material-symbols-outlined text-[18px]">support_agent</span>
                </div>
                <div className="bg-surface-container-low text-on-surface-variant p-space-sm rounded-2xl rounded-tl-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse delay-100"></span>
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse delay-200"></span>
                  <span className="font-label-sm text-label-sm ml-1 text-on-surface-variant">
                    Analyzing clinical symptoms...
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Voice Recording Indicator */}
          {isRecording && (
            <div className="flex my-2 p-space-sm bg-secondary-container/40 rounded-xl items-center justify-between">
              <div className="flex items-center gap-space-sm">
                <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-primary text-on-primary">
                  <span className="material-symbols-outlined text-[18px] animate-pulse">mic</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-lg text-label-lg text-on-secondary-container font-semibold">
                    Listening to speech (Tamil / English)...
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Speak clearly near phone or microphone (Tap mic again to finish)
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 h-6 px-3">
                <span className="w-1 bg-primary rounded-full animate-pulse h-3"></span>
                <span className="w-1 bg-primary rounded-full animate-pulse h-5 delay-75"></span>
                <span className="w-1 bg-primary rounded-full animate-pulse h-6 delay-150"></span>
                <span className="w-1 bg-primary rounded-full animate-pulse h-4 delay-200"></span>
                <span className="w-1 bg-primary rounded-full animate-pulse h-2 delay-100"></span>
              </div>
            </div>
          )}

          {/* Input Bar */}
          <div className="pt-space-sm mt-auto">
            <form
              onSubmit={handleFormSubmit}
              className="relative flex items-center gap-space-xs sm:gap-space-sm bg-surface-container-low rounded-2xl p-1.5 shadow-sm focus-within:shadow-md transition-shadow"
            >
              <button
                type="button"
                onClick={handleVoiceToggle}
                title="Tap to speak in any language"
                className={`relative w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-all cursor-pointer ${
                  isRecording
                    ? 'bg-error-container text-on-error-container'
                    : 'bg-surface-container-lowest text-primary hover:bg-secondary-container hover:text-on-secondary-container'
                }`}
              >
                <span className="material-symbols-outlined text-[24px]">mic</span>
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </span>
              </button>

              <input
                type="text"
                autoComplete="off"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={
                  isRecording
                    ? 'Listening... Speak your symptoms now...'
                    : 'Describe your symptoms in your own words...'
                }
                className="flex-1 min-w-0 bg-transparent py-3 px-space-sm text-on-surface placeholder:text-outline font-body-md text-body-md outline-none"
              />

              <button
                type="submit"
                title="Send assessment details"
                className="w-12 h-12 rounded-xl bg-primary text-on-primary hover:bg-primary-container active:scale-95 flex items-center justify-center shrink-0 shadow-md transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[22px]">send</span>
              </button>
            </form>

            <div className="flex items-center justify-between px-2 pt-2 text-outline font-label-sm text-label-sm">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px] text-secondary">
                  verified_user
                </span>
                Standardized WHO Clinical Triage Protocol
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('triage-result')}
                  className="text-primary hover:underline font-semibold cursor-pointer"
                >
                  Complete &amp; View Triage Record →
                </button>
                <span className="hidden sm:inline">Press Enter to send message</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom 3 Feature Pills */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-space-sm text-on-surface-variant font-label-md text-label-md">
          <div className="bg-surface-container-lowest p-space-sm rounded-xl shadow-sm flex items-center gap-space-sm">
            <span className="material-symbols-outlined text-primary text-[20px]">hearing</span>
            <span>Low-literacy voice support enabled</span>
          </div>
          <div className="bg-surface-container-lowest p-space-sm rounded-xl shadow-sm flex items-center gap-space-sm">
            <span className="material-symbols-outlined text-secondary text-[20px]">
              volunteer_activism
            </span>
            <span>Reassuring, compassionate advice</span>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('phc-locator')}
            className="bg-surface-container-lowest p-space-sm rounded-xl shadow-sm flex items-center gap-space-sm hover:bg-surface-container-low transition-colors text-left cursor-pointer"
          >
            <span className="material-symbols-outlined text-tertiary text-[20px]">pin_drop</span>
            <span>Direct referral to your local PHC center</span>
          </button>
        </div>
      </div>
    </div>
  );
};
