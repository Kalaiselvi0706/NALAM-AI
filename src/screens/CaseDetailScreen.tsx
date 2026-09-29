import React, { useState } from 'react';
import { ASSETS, PriorityCase } from '../data/mockData';

interface CaseDetailScreenProps {
  caseData: PriorityCase;
  onBack: () => void;
  onUpdateCase: (updated: PriorityCase) => void;
}

export const CaseDetailScreen: React.FC<CaseDetailScreenProps> = ({
  caseData,
  onBack,
  onUpdateCase,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [isAmbulanceModalOpen, setIsAmbulanceModalOpen] = useState(false);
  const [noteInput, setNoteInput] = useState('');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg(null);
    }, 3500);
  };

  const handleToggleChecklist = (itemId: string) => {
    const updatedChecklist = caseData.checklist.map((item) =>
      item.id === itemId ? { ...item, checked: !item.checked } : item
    );
    onUpdateCase({ ...caseData, checklist: updatedChecklist });
  };

  const handleSaveNote = () => {
    if (!noteInput.trim()) return;
    const updatedNotes = [...(caseData.clinicalNotes || []), noteInput.trim()];
    onUpdateCase({ ...caseData, clinicalNotes: updatedNotes });
    setNoteInput('');
    setIsNoteModalOpen(false);
    triggerToast('Clinical note added and synced with medical record.');
  };

  const handleMarkReviewed = () => {
    onUpdateCase({ ...caseData, reviewed: true });
    triggerToast(
      `Success: Case #${caseData.id} routed to ${caseData.assignedDoctor} for stat consult.`
    );
  };

  const handleConfirmAmbulance = () => {
    onUpdateCase({ ...caseData, ambulanceDispatched: true });
    setIsAmbulanceModalOpen(false);
    triggerToast('108 ALS Ambulance alert transmitted. ETA tracking enabled.');
  };

  return (
    <div className="flex flex-col w-full">
      <div className="relative w-full overflow-hidden">
        <div className="absolute -top-32 right-12 w-96 h-96 rounded-full bg-error-container/20 blur-3xl pointer-events-none"></div>
        <div className="absolute top-48 left-16 w-80 h-80 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-margin py-space-lg flex flex-col gap-space-lg">
          {/* Breadcrumb & Top Utility Row */}
          <div className="flex flex-wrap items-center justify-between gap-space-md">
            <div className="flex items-center gap-space-sm text-on-surface-variant font-label-md text-label-md">
              <button
                type="button"
                onClick={onBack}
                className="flex items-center gap-1.5 hover:text-primary transition-colors group cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-0.5 transition-transform">
                  arrow_back
                </span>
                <span className="font-semibold text-on-surface">Back to Priority Cases</span>
              </button>
              <span className="text-outline-variant font-body-sm text-body-sm">/</span>
              <span className="px-2 py-0.5 rounded bg-surface-container-high font-mono font-label-sm text-label-sm text-on-surface tracking-wider">
                CASE #{caseData.id}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-error animate-ping ml-1"></span>
            </div>

            {/* Top Direct Actions Bar */}
            <div className="flex flex-wrap items-center gap-space-sm">
              <button
                type="button"
                onClick={() => setIsNoteModalOpen(true)}
                className="px-space-md py-2.5 rounded-xl bg-surface-container-lowest text-on-surface-variant hover:text-primary hover:bg-surface-container-low shadow-sm font-label-lg text-label-lg flex items-center gap-2 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">edit_note</span>
                <span>Add Clinical Note</span>
              </button>

              <button
                type="button"
                onClick={() => setIsAmbulanceModalOpen(true)}
                className="px-space-md py-2.5 rounded-xl bg-error text-on-error shadow-sm hover:opacity-90 font-label-lg text-label-lg flex items-center gap-2 transition-all cursor-pointer"
              >
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  emergency_home
                </span>
                <span>
                  {caseData.ambulanceDispatched
                    ? '108 ALS En Route (ETA 8m)'
                    : 'Dispatch 108 ALS Transfer'}
                </span>
              </button>

              <button
                type="button"
                onClick={handleMarkReviewed}
                className={`px-space-lg py-2.5 rounded-xl text-on-primary shadow-md font-label-lg text-label-lg flex items-center gap-2 transition-all cursor-pointer ${
                  caseData.reviewed
                    ? 'bg-secondary'
                    : 'bg-primary hover:bg-primary-container'
                }`}
              >
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {caseData.reviewed ? 'done_all' : 'verified_user'}
                </span>
                <span>
                  {caseData.reviewed
                    ? `Routed to ${caseData.assignedDoctor} ✓`
                    : 'Mark as Reviewed & Route to Doctor'}
                </span>
              </button>
            </div>
          </div>

          {/* Hero Header & Critical Triage Banner */}
          <div className="rounded-xl bg-surface-container-lowest shadow-sm p-space-lg flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-error"></div>
            <div className="flex flex-col gap-space-xs pl-space-xs">
              <div className="flex items-center gap-space-sm flex-wrap">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-error font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
                  High Clinical Acuity Notice
                </span>
                <span className="text-on-surface-variant font-label-sm text-label-sm">
                  • Triage Timestamp: {caseData.timestampAgo}
                </span>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                Patient Case #{caseData.id}{' '}
                <span className="text-on-surface-variant font-normal">— Immediate Review</span>
              </h1>
              {/* Quick Demographics Meta Strip */}
              <div className="flex flex-wrap items-center gap-2 pt-space-xs">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container font-label-md text-label-md text-on-surface">
                  <span className="material-symbols-outlined text-[16px] text-primary">person</span>
                  {caseData.demographic.replace('yrs', 'Years')}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container font-label-md text-label-md text-on-surface">
                  <span className="material-symbols-outlined text-[16px] text-tertiary">
                    location_on
                  </span>
                  {caseData.village}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container font-label-md text-label-md text-on-surface">
                  <span className="material-symbols-outlined text-[16px] text-secondary">
                    translate
                  </span>
                  {caseData.languages}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container font-label-md text-label-md text-on-surface">
                  <span className="material-symbols-outlined text-[16px] text-outline">
                    fingerprint
                  </span>
                  {caseData.abhaId}
                </span>
              </div>
            </div>

            {/* Prominent Status Pill & Heart Rhythm Indicator */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-space-md bg-error-container/40 p-space-md rounded-xl">
              <div className="w-12 h-12 rounded-xl bg-error text-on-error flex items-center justify-center shrink-0 shadow-sm">
                <span
                  className="material-symbols-outlined text-[28px] animate-pulse"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  e911_emergency
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-error animate-ping"></span>
                  <span className="font-headline-sm text-headline-sm text-on-error-container uppercase tracking-tight">
                    {caseData.triageBadgeLabel.toUpperCase()}
                  </span>
                </div>
                <span className="font-body-sm text-body-sm text-on-error-container font-medium">
                  Immediate Clinical Consultation Required
                </span>
                <span className="font-label-sm text-label-sm text-error mt-0.5">
                  {caseData.protocolTitle}
                </span>
              </div>
            </div>
          </div>

          {/* Main Clinical Content Grid (2 Columns Desktop) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
            {/* Left Column: Symptoms & Voice Recording (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col gap-space-lg">
              <div className="rounded-xl bg-surface-container-lowest shadow-sm p-space-lg flex flex-col gap-space-md">
                <div className="flex items-center justify-between pb-space-sm">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-9 h-9 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[22px]">vital_signs</span>
                    </div>
                    <div>
                      <h2 className="font-headline-sm text-headline-sm text-on-surface">
                        Clinical Symptom Summary
                      </h2>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        {caseData.ashaWorker}
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold">
                    {caseData.triageGrade}
                  </span>
                </div>

                {/* Key Metric Mini Bento */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                  <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-1">
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                      Onset &amp; Duration
                    </span>
                    <span className="font-headline-sm text-headline-sm text-on-surface">
                      {caseData.onsetDuration}
                    </span>
                    <span className="font-body-sm text-body-sm text-error font-medium flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">bolt</span>
                      {caseData.onsetNote}
                    </span>
                  </div>

                  <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-1">
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                      Pain Severity Scale
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-headline-sm text-headline-sm text-error">
                        {caseData.painScore} / 10
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        {caseData.painLabel}
                      </span>
                    </div>
                    {/* 10-Segment Visual Pain Gauge */}
                    <div className="flex gap-1 mt-1">
                      <div className="h-1.5 flex-1 rounded-full bg-secondary"></div>
                      <div className="h-1.5 flex-1 rounded-full bg-secondary"></div>
                      <div className="h-1.5 flex-1 rounded-full bg-secondary"></div>
                      <div className="h-1.5 flex-1 rounded-full bg-secondary"></div>
                      <div className="h-1.5 flex-1 rounded-full bg-tertiary"></div>
                      <div className="h-1.5 flex-1 rounded-full bg-tertiary"></div>
                      <div className="h-1.5 flex-1 rounded-full bg-error"></div>
                      <div className="h-1.5 flex-1 rounded-full bg-error"></div>
                      <div className="h-1.5 flex-1 rounded-full bg-error"></div>
                      <div className="h-1.5 flex-1 rounded-full bg-surface-container-high"></div>
                    </div>
                  </div>
                </div>

                {/* Primary Symptoms Detailed Description */}
                <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-2">
                  <span className="font-label-md text-label-md text-on-surface font-semibold flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px] text-error">
                      radiology
                    </span>
                    Primary Symptoms &amp; Radiation Path
                  </span>
                  <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                    {caseData.primarySymptomsDescription}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {caseData.symptomTags.map((tag) => (
                      <span
                        key={tag.label}
                        className="px-2.5 py-1 rounded-full bg-surface-container-lowest text-on-surface font-label-sm text-label-sm shadow-sm flex items-center gap-1"
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            tag.color === 'error'
                              ? 'bg-error'
                              : tag.color === 'tertiary'
                              ? 'bg-tertiary'
                              : 'bg-secondary'
                          }`}
                        ></span>{' '}
                        {tag.label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Patient Voice Transcript & Audio Component */}
                <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md text-on-surface font-semibold flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-primary">
                        record_voice_over
                      </span>
                      Patient Voice Transcript (Field Intake)
                    </span>
                    <span className="font-label-sm text-label-sm text-secondary font-medium">
                      Tamil ASR &amp; AI Translated
                    </span>
                  </div>
                  <div className="p-space-md rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md italic shadow-sm relative">
                    <span className="text-outline-variant font-serif text-2xl absolute top-1 left-2 select-none">
                      “
                    </span>
                    <p className="pl-4">
                      {caseData.voiceTranscriptEnglish}{' '}
                      <span className="not-italic text-on-surface-variant font-medium">
                        {caseData.voiceTranscriptNative}
                      </span>{' '}
                      {caseData.voiceTranscriptTranslation}
                    </p>
                  </div>

                  {/* Inline Audio Playback Bar */}
                  <div className="p-2.5 rounded-lg bg-surface-container-lowest flex items-center gap-3 shadow-sm">
                    <button
                      type="button"
                      onClick={() => setIsPlayingAudio((prev) => !prev)}
                      className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center hover:bg-primary-container transition-colors shrink-0 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {isPlayingAudio ? 'pause' : 'play_arrow'}
                      </span>
                    </button>
                    <div className="flex-1 flex flex-col gap-1">
                      <div className="flex justify-between items-center text-label-sm font-label-sm text-on-surface-variant">
                        <span>{caseData.audioFileName}</span>
                        <span>{isPlayingAudio ? '0:22 / 0:38 (Playing)' : '0:14 / 0:38'}</span>
                      </div>
                      <svg
                        className="w-full h-4 text-primary"
                        fill="currentColor"
                        viewBox="0 0 300 20"
                      >
                        <rect height="8" opacity="0.4" rx="1.5" width="3" x="0" y="6"></rect>
                        <rect height="12" opacity="0.6" rx="1.5" width="3" x="6" y="4"></rect>
                        <rect height="16" rx="1.5" width="3" x="12" y="2"></rect>
                        <rect height="6" rx="1.5" width="3" x="18" y="7"></rect>
                        <rect height="14" rx="1.5" width="3" x="24" y="3"></rect>
                        <rect height="10" rx="1.5" width="3" x="30" y="5"></rect>
                        <rect height="18" rx="1.5" width="3" x="36" y="1"></rect>
                        <rect height="12" rx="1.5" width="3" x="42" y="4"></rect>
                        <rect height="8" rx="1.5" width="3" x="48" y="6"></rect>
                        <rect height="16" rx="1.5" width="3" x="54" y="2"></rect>
                        <rect height="6" rx="1.5" width="3" x="60" y="7"></rect>
                        <rect height="14" rx="1.5" width="3" x="66" y="3"></rect>
                        <rect height="10" rx="1.5" width="3" x="72" y="5"></rect>
                        <rect height="16" rx="1.5" width="3" x="78" y="2"></rect>
                        <rect height="12" rx="1.5" width="3" x="84" y="4"></rect>
                        <rect height="8" rx="1.5" width="3" x="90" y="6"></rect>
                        <rect height="18" rx="1.5" width="3" x="96" y="1"></rect>
                        <rect height="10" rx="1.5" width="3" x="102" y="5"></rect>
                        <rect height="16" rx="1.5" width="3" x="108" y="2"></rect>
                        <rect height="4" opacity="0.3" rx="1.5" width="3" x="114" y="8"></rect>
                        <rect height="6" opacity="0.3" rx="1.5" width="3" x="120" y="7"></rect>
                        <rect height="12" opacity="0.3" rx="1.5" width="3" x="126" y="4"></rect>
                        <rect height="8" opacity="0.3" rx="1.5" width="3" x="132" y="6"></rect>
                        <rect height="14" opacity="0.3" rx="1.5" width="3" x="138" y="3"></rect>
                        <rect height="10" opacity="0.3" rx="1.5" width="3" x="144" y="5"></rect>
                        <rect height="6" opacity="0.3" rx="1.5" width="3" x="150" y="7"></rect>
                        <rect height="12" opacity="0.3" rx="1.5" width="3" x="156" y="4"></rect>
                        <rect height="8" opacity="0.3" rx="1.5" width="3" x="162" y="6"></rect>
                        <rect height="16" opacity="0.3" rx="1.5" width="3" x="168" y="2"></rect>
                        <rect height="10" opacity="0.3" rx="1.5" width="3" x="174" y="5"></rect>
                        <rect height="6" opacity="0.3" rx="1.5" width="3" x="180" y="7"></rect>
                        <rect height="14" opacity="0.3" rx="1.5" width="3" x="186" y="3"></rect>
                        <rect height="12" opacity="0.3" rx="1.5" width="3" x="192" y="4"></rect>
                        <rect height="8" opacity="0.3" rx="1.5" width="3" x="198" y="6"></rect>
                        <rect height="16" opacity="0.3" rx="1.5" width="3" x="204" y="2"></rect>
                        <rect height="10" opacity="0.3" rx="1.5" width="3" x="210" y="5"></rect>
                        <rect height="6" opacity="0.3" rx="1.5" width="3" x="216" y="7"></rect>
                        <rect height="14" opacity="0.3" rx="1.5" width="3" x="222" y="3"></rect>
                        <rect height="8" opacity="0.3" rx="1.5" width="3" x="228" y="6"></rect>
                        <rect height="12" opacity="0.3" rx="1.5" width="3" x="234" y="4"></rect>
                        <rect height="10" opacity="0.3" rx="1.5" width="3" x="240" y="5"></rect>
                        <rect height="6" opacity="0.3" rx="1.5" width="3" x="246" y="7"></rect>
                        <rect height="16" opacity="0.3" rx="1.5" width="3" x="252" y="2"></rect>
                        <rect height="8" opacity="0.3" rx="1.5" width="3" x="258" y="6"></rect>
                        <rect height="12" opacity="0.3" rx="1.5" width="3" x="264" y="4"></rect>
                        <rect height="4" opacity="0.3" rx="1.5" width="3" x="270" y="8"></rect>
                        <rect height="6" opacity="0.3" rx="1.5" width="3" x="276" y="7"></rect>
                        <rect height="10" opacity="0.3" rx="1.5" width="3" x="282" y="5"></rect>
                        <rect height="8" opacity="0.3" rx="1.5" width="3" x="288" y="6"></rect>
                        <rect height="4" opacity="0.3" rx="1.5" width="3" x="294" y="8"></rect>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Added Clinical Notes if any */}
                {caseData.clinicalNotes && caseData.clinicalNotes.length > 0 && (
                  <div className="p-space-md rounded-xl bg-secondary-container/30 flex flex-col gap-2">
                    <span className="font-label-md text-label-md text-on-secondary-container font-semibold flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px]">clinical_notes</span>
                      Attached PHC Clinical Notes ({caseData.clinicalNotes.length})
                    </span>
                    {caseData.clinicalNotes.map((note, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-lg bg-surface-container-lowest font-body-sm text-body-sm text-on-surface shadow-sm"
                      >
                        {note}
                      </div>
                    ))}
                  </div>
                )}

                {/* Field Photo Documentation Preview */}
                <div className="flex flex-col gap-2 pt-space-xs">
                  <span className="font-label-md text-label-md text-on-surface font-semibold flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px] text-outline">
                      photo_camera
                    </span>
                    Field Point Intake Capture
                  </span>
                  <div className="grid grid-cols-2 gap-space-sm">
                    <div className="relative rounded-xl overflow-hidden shadow-sm group">
                      <img
                        alt="Field Monitor: 164/102 mmHg"
                        className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                        src={ASSETS.fieldMonitor}
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-transparent flex items-end p-2.5">
                        <span className="text-inverse-on-surface font-label-sm text-label-sm">
                          Field Monitor: 164/102 mmHg
                        </span>
                      </div>
                    </div>
                    <div className="relative rounded-xl overflow-hidden shadow-sm group">
                      <img
                        alt="Field Lead-II Quick Strip"
                        className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                        src={ASSETS.fieldEcg}
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-transparent flex items-end p-2.5">
                        <span className="text-inverse-on-surface font-label-sm text-label-sm">
                          Field Lead-II Quick Strip
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: AI Triage Recommendations & PHC Action (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col gap-space-lg">
              {/* Card 2: AI Triage Recommendation & Protocols */}
              <div className="rounded-xl bg-surface-container-lowest shadow-sm p-space-lg flex flex-col gap-space-md relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none"></div>
                <div className="flex items-center gap-space-sm pb-space-xs">
                  <div className="w-9 h-9 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[22px]">neurology</span>
                  </div>
                  <div>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface">
                      AI Triage Protocols
                    </h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Validated via ICMR Rural Emergency Algorithm
                    </p>
                  </div>
                </div>

                {/* Priority Badge Display */}
                <div className="p-space-md rounded-xl bg-error-container/30 flex items-center justify-between gap-space-sm">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3.5 h-3.5 rounded-full bg-error animate-pulse"></span>
                    <div className="flex flex-col">
                      <span className="font-label-sm text-label-sm text-error uppercase font-semibold">
                        Classification
                      </span>
                      <span className="font-headline-sm text-headline-sm text-on-surface">
                        {caseData.classificationLabel}
                      </span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-error text-on-error font-label-sm text-label-sm font-semibold shadow-sm">
                    {caseData.classificationCode}
                  </span>
                </div>

                {/* Recommended Next Step */}
                <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-primary font-label-md text-label-md font-semibold">
                    <span className="material-symbols-outlined text-[18px]">checklist</span>
                    Recommended Clinical Directives
                  </div>
                  <p className="font-body-md text-body-md text-on-surface leading-relaxed font-medium">
                    {caseData.clinicalDirectivesQuote}
                  </p>
                  {/* Step-by-step Execution Checklist */}
                  <div className="flex flex-col gap-2 pt-2">
                    {caseData.checklist.map((item) => (
                      <label
                        key={item.id}
                        className="flex items-start gap-2.5 p-2 rounded-lg bg-surface-container-lowest hover:bg-surface-bright cursor-pointer transition-colors shadow-sm"
                      >
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => handleToggleChecklist(item.id)}
                          className="mt-0.5 w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
                        />
                        <span className="font-body-sm text-body-sm text-on-surface">
                          {item.text}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Risk Factors Block */}
                <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-2">
                  <span className="font-label-md text-label-md text-on-surface font-semibold flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px] text-tertiary">
                      warning
                    </span>
                    Co-Morbidities &amp; Risk Profile
                  </span>
                  <ul className="flex flex-col gap-1.5 font-body-sm text-body-sm text-on-surface-variant">
                    {caseData.riskProfile.map((risk, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span
                          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                            risk.color === 'error'
                              ? 'bg-error'
                              : risk.color === 'tertiary'
                              ? 'bg-tertiary'
                              : 'bg-secondary'
                          }`}
                        ></span>
                        <span>
                          <strong className="text-on-surface">{risk.title}</strong> {risk.detail}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card 3: PHC Action & Clinical Disposition */}
              <div className="rounded-xl bg-surface-container-lowest shadow-sm p-space-lg flex flex-col gap-space-md">
                <div className="flex items-center gap-space-sm pb-space-xs">
                  <div className="w-9 h-9 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[22px]">local_hospital</span>
                  </div>
                  <div>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface">
                      PHC Action &amp; Disposition
                    </h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Stationary Clinical Oversight Assignment
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm">
                        KM
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-lg text-label-lg font-semibold text-on-surface">
                          {caseData.assignedDoctor}
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          Medical Officer (Duty MO)
                        </span>
                      </div>
                    </div>
                    <span className="px-2 py-1 rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
                      On-Premises
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-surface-container-high text-primary flex items-center justify-center">
                        <span className="material-symbols-outlined text-[20px]">domain</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-lg text-label-lg font-semibold text-on-surface">
                          Alangulam PHC
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          {caseData.assignedBay}
                        </span>
                      </div>
                    </div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">
                      Tirunelveli Dist.
                    </span>
                  </div>
                </div>

                {/* District Hub Transfer Distance & Location Mini Map */}
                <div className="flex flex-col gap-2 pt-1">
                  <div className="flex items-center justify-between text-label-sm font-label-sm">
                    <span className="text-on-surface-variant">Nearest Secondary Cath Lab:</span>
                    <span className="font-semibold text-on-surface">
                      Tirunelveli Medical College (32 km)
                    </span>
                  </div>
                  <div
                    className="w-full h-24 bg-cover bg-center rounded-xl shadow-sm relative overflow-hidden"
                    style={{
                      backgroundImage: `url('${ASSETS.miniMap}')`,
                    }}
                  >
                    <div className="absolute inset-0 bg-inverse-surface/30 backdrop-blur-[1px] flex items-center justify-between px-3 text-inverse-on-surface">
                      <div className="flex items-center gap-1.5 font-label-sm text-label-sm">
                        <span className="material-symbols-outlined text-[18px] text-error">
                          navigation
                        </span>
                        <span>Transit Window: ~38 mins</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-surface-container-lowest/90 text-on-surface text-[11px] font-semibold">
                        108 Hot Route Active
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Floating Action Bar for Ergonomic Review Completion */}
          <div className="sticky bottom-4 z-30 rounded-xl bg-surface-container-lowest/95 backdrop-blur-md shadow-xl p-space-md flex flex-col sm:flex-row items-center justify-between gap-space-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">assignment_turned_in</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-lg text-label-lg font-semibold text-on-surface">
                  Ready to Finalize Case #{caseData.id} Review?
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Alert {caseData.assignedDoctor} directly on clinical workstation intercom.
                </span>
              </div>
            </div>

            <div className="flex items-center gap-space-sm w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={() => setIsNoteModalOpen(true)}
                className="px-space-md py-3 rounded-xl bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container font-label-lg text-label-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">add_notes</span>
                <span className="hidden md:inline">Add Note</span>
              </button>
              <button
                type="button"
                onClick={() => setIsAmbulanceModalOpen(true)}
                className="px-space-md py-3 rounded-xl bg-error text-on-error hover:opacity-90 font-label-lg text-label-lg transition-all flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">ambulance</span>
                <span>{caseData.ambulanceDispatched ? '108 Dispatched' : 'Dispatch 108'}</span>
              </button>
              <button
                type="button"
                onClick={handleMarkReviewed}
                className={`px-space-lg py-3 rounded-xl text-on-primary shadow-md font-label-lg text-label-lg flex items-center gap-2 transition-all cursor-pointer ${
                  caseData.reviewed
                    ? 'bg-secondary'
                    : 'bg-primary hover:bg-primary-container'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {caseData.reviewed ? 'done_all' : 'check_circle'}
                </span>
                <span>
                  {caseData.reviewed
                    ? `Routed to ${caseData.assignedDoctor} ✓`
                    : 'Mark as Reviewed & Route to Doctor'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Note Modal */}
      {isNoteModalOpen && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-xl max-w-lg w-full p-space-lg shadow-2xl flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-sm text-headline-sm text-on-surface">
                Add PHC Clinical Note
              </h3>
              <button
                type="button"
                onClick={() => setIsNoteModalOpen(false)}
                className="text-on-surface-variant hover:text-on-surface cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Attaching observation for Case #{caseData.id}. This will be transmitted immediately to{' '}
              {caseData.assignedDoctor}.
            </p>
            <textarea
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              placeholder="Enter observations, preliminary observations, or vitals verification..."
              rows={4}
              className="w-full p-3 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsNoteModalOpen(false)}
                className="px-space-md py-2 rounded-lg bg-surface-container text-on-surface-variant font-label-md text-label-md cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveNote}
                className="px-space-md py-2 rounded-lg bg-primary text-on-primary font-label-md text-label-md shadow-sm cursor-pointer"
              >
                Save &amp; Transmit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive 108 Ambulance Transfer Confirmation Modal */}
      {isAmbulanceModalOpen && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-xl max-w-lg w-full p-space-lg shadow-2xl flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-error">
                <span className="material-symbols-outlined">emergency_home</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">
                  Confirm 108 ALS Emergency Transfer
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAmbulanceModalOpen(false)}
                className="text-on-surface-variant hover:text-on-surface cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Initiate <strong>108 ALS Transfer Request</strong> for{' '}
              <strong>Case #{caseData.id}</strong> ({caseData.demographic}) to{' '}
              <strong>Tirunelveli Medical College Cath Lab</strong> (32 km • Hot Route ~38 mins)?
            </p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsAmbulanceModalOpen(false)}
                className="px-space-md py-2 rounded-lg bg-surface-container text-on-surface-variant font-label-md text-label-md cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmAmbulance}
                className="px-space-md py-2 rounded-lg bg-error text-on-error font-label-md text-label-md shadow-sm cursor-pointer"
              >
                Confirm &amp; Dispatch 108 ALS
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Toast */}
      {toastMsg && (
        <div className="fixed bottom-24 right-8 z-50 bg-primary text-on-primary px-5 py-3 rounded-xl shadow-xl flex items-center gap-3">
          <span className="material-symbols-outlined text-[20px]">task_alt</span>
          <span className="font-label-lg text-label-lg">{toastMsg}</span>
        </div>
      )}
    </div>
  );
};
