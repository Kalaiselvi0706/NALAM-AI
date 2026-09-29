import React, { useState } from 'react';
import { PriorityCase } from '../data/mockData';
import { StaffNavTab } from '../components/StaffShell';

interface StaffDashboardScreenProps {
  cases: PriorityCase[];
  onSelectCase: (caseId: string) => void;
  activeTab: StaffNavTab;
}

export const StaffDashboardScreen: React.FC<StaffDashboardScreenProps> = ({
  cases,
  onSelectCase,
  activeTab,
}) => {
  const [tierFilter, setTierFilter] = useState<'all' | 'emergency' | 'urgent' | 'routine'>('all');

  const filteredCases = cases.filter((c) => {
    if (activeTab === 'urgent-referrals') {
      return c.tier === 'emergency' || c.tier === 'urgent';
    }
    if (tierFilter === 'all') return true;
    return c.tier === tierFilter;
  });

  return (
    <div className="flex flex-col w-full px-space-xl py-space-lg max-w-7xl mx-auto space-y-space-xl">
      {/* Ambient Clinical Accent */}
      <div className="relative overflow-hidden rounded-2xl bg-surface-container-lowest p-space-lg shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
          <div className="flex flex-col space-y-space-xs">
            <div className="flex items-center gap-space-sm">
              <span className="font-headline-sm text-headline-sm text-primary tracking-tight">
                NALAM AI
              </span>
              <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
              <span className="font-label-lg text-label-lg text-on-surface">PHC Staff Portal</span>
            </div>
            <div className="flex items-center gap-space-sm text-on-surface-variant font-body-sm text-body-sm">
              <span className="material-symbols-outlined text-[18px] text-primary">
                location_on
              </span>
              <span>Alangulam Primary Health Center (Node 4082)</span>
              <span className="text-outline-variant">|</span>
              <span>Tirunelveli District Cluster</span>
            </div>
          </div>

          <div className="flex items-center self-start md:self-auto gap-space-md bg-surface-container-low px-space-md py-space-sm rounded-full">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
              </span>
              <span className="font-label-md text-label-md text-on-surface font-semibold">
                Live Triage Stream Active
              </span>
            </div>
            <span className="text-outline-variant">/</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              Sync Latency: 24ms
            </span>
          </div>
        </div>
      </div>

      {/* Metric Cards Row: Strictly 4 Clean Spacious Summaries */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg">
        {/* 1. Total Cases */}
        <div
          onClick={() => setTierFilter('all')}
          className="flex flex-col justify-between p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="font-label-lg text-label-lg text-on-surface-variant">Total Cases</span>
            <div className="w-9 h-9 rounded-xl bg-surface-container-low flex items-center justify-center text-on-surface-variant">
              <span className="material-symbols-outlined text-[20px]">folder_shared</span>
            </div>
          </div>
          <div className="mt-space-md">
            <div className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
              42
            </div>
            <div className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              Today&apos;s Intake
            </div>
          </div>
        </div>

        {/* 2. Emergency */}
        <div
          onClick={() => setTierFilter('emergency')}
          className="flex flex-col justify-between p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="font-label-lg text-label-lg text-on-surface-variant">Emergency</span>
            <div className="w-9 h-9 rounded-xl bg-error-container/40 flex items-center justify-center text-error">
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                warning
              </span>
            </div>
          </div>
          <div className="mt-space-md">
            <div className="flex items-baseline gap-2">
              <span className="font-headline-xl text-headline-xl text-error tracking-tight font-bold">
                3
              </span>
              <span className="px-2 py-0.5 rounded-full text-label-sm font-label-sm bg-error-container text-on-error-container font-semibold">
                Priority 1
              </span>
            </div>
            <div className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              Immediate doctor review
            </div>
          </div>
        </div>

        {/* 3. Urgent */}
        <div
          onClick={() => setTierFilter('urgent')}
          className="flex flex-col justify-between p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="font-label-lg text-label-lg text-on-surface-variant">Urgent</span>
            <div className="w-9 h-9 rounded-xl bg-tertiary-fixed/30 flex items-center justify-center text-tertiary">
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                pace
              </span>
            </div>
          </div>
          <div className="mt-space-md">
            <div className="flex items-baseline gap-2">
              <span className="font-headline-xl text-headline-xl text-tertiary tracking-tight font-bold">
                8
              </span>
              <span className="px-2 py-0.5 rounded-full text-label-sm font-label-sm bg-tertiary-fixed text-on-tertiary-fixed font-semibold">
                Priority 2
              </span>
            </div>
            <div className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              Within 2 hours
            </div>
          </div>
        </div>

        {/* 4. Routine */}
        <div
          onClick={() => setTierFilter('routine')}
          className="flex flex-col justify-between p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="font-label-lg text-label-lg text-on-surface-variant">Routine</span>
            <div className="w-9 h-9 rounded-xl bg-secondary-container/40 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[20px]">check_circle</span>
            </div>
          </div>
          <div className="mt-space-md">
            <div className="flex items-baseline gap-2">
              <span className="font-headline-xl text-headline-xl text-secondary tracking-tight font-bold">
                31
              </span>
              <span className="px-2 py-0.5 rounded-full text-label-sm font-label-sm bg-secondary-container text-on-secondary-container font-semibold">
                Standard
              </span>
            </div>
            <div className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              Standard queue
            </div>
          </div>
        </div>
      </div>

      {/* Optional Epidemic Pulse / Analytics Banner when Epidemic Pulse tab is clicked */}
      {activeTab === 'phc-analytics' && (
        <div className="rounded-2xl bg-surface-container-lowest p-space-lg shadow-sm grid grid-cols-1 md:grid-cols-3 gap-space-md">
          <div className="p-space-md rounded-xl bg-surface-container-low">
            <span className="font-label-sm text-label-sm text-outline uppercase">
              Block 4 Surveillance
            </span>
            <p className="font-headline-sm text-headline-sm text-on-surface mt-1">
              Seasonal Viral Febrile Cluster
            </p>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              14 cases reported in Kovilpatti Rural &amp; Veeranam in last 48h.
            </p>
          </div>
          <div className="p-space-md rounded-xl bg-surface-container-low">
            <span className="font-label-sm text-label-sm text-outline uppercase">
              108 Ambulance Fleet
            </span>
            <p className="font-headline-sm text-headline-sm text-primary mt-1">
              2 ALS Units Ready on Station
            </p>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              Mean transit to Tirunelveli Medical College Cath Lab: 38 mins.
            </p>
          </div>
          <div className="p-space-md rounded-xl bg-surface-container-low">
            <span className="font-label-sm text-label-sm text-outline uppercase">
              ASHA Voice Intake Sync
            </span>
            <p className="font-headline-sm text-headline-sm text-secondary mt-1">
              98.4% Tamil ASR Accuracy
            </p>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              18 village health sub-centers connected via low-bandwidth node.
            </p>
          </div>
        </div>
      )}

      {/* Priority Cases Section: Filtered Clean List */}
      <div className="flex flex-col bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden">
        {/* Header & Interactive Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-space-xl py-space-lg bg-surface-container-low/40 gap-space-md">
          <div className="flex items-center gap-space-md">
            <h2 className="font-headline-md text-headline-md text-on-surface">Priority Cases</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
              Updated Live
            </span>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center p-1 bg-surface-container-high rounded-xl overflow-x-auto">
            <button
              type="button"
              onClick={() => setTierFilter('all')}
              className={`px-4 py-1.5 rounded-lg font-label-md text-label-md transition-all whitespace-nowrap cursor-pointer ${
                tierFilter === 'all'
                  ? 'font-semibold bg-surface-container-lowest text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              All Cases (42)
            </button>
            <button
              type="button"
              onClick={() => setTierFilter('emergency')}
              className={`px-4 py-1.5 rounded-lg font-label-md text-label-md transition-all whitespace-nowrap cursor-pointer ${
                tierFilter === 'emergency'
                  ? 'font-semibold bg-surface-container-lowest text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Emergency (3)
            </button>
            <button
              type="button"
              onClick={() => setTierFilter('urgent')}
              className={`px-4 py-1.5 rounded-lg font-label-md text-label-md transition-all whitespace-nowrap cursor-pointer ${
                tierFilter === 'urgent'
                  ? 'font-semibold bg-surface-container-lowest text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Urgent (8)
            </button>
            <button
              type="button"
              onClick={() => setTierFilter('routine')}
              className={`px-4 py-1.5 rounded-lg font-label-md text-label-md transition-all whitespace-nowrap cursor-pointer ${
                tierFilter === 'routine'
                  ? 'font-semibold bg-surface-container-lowest text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Routine (31)
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
                <th className="py-space-md px-space-xl font-semibold">Case ID</th>
                <th className="py-space-md px-space-md font-semibold">Demographic</th>
                <th className="py-space-md px-space-md font-semibold">Chief Symptom</th>
                <th className="py-space-md px-space-md font-semibold">Triage Level</th>
                <th className="py-space-md px-space-md font-semibold">Time</th>
                <th className="py-space-md px-space-xl text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-none text-on-surface font-body-md text-body-md">
              {filteredCases.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => onSelectCase(item.id)}
                  className="hover:bg-surface-container-low/60 transition-colors cursor-pointer"
                >
                  <td className="py-space-md px-space-xl">
                    <span className="font-label-lg text-label-lg font-bold text-on-surface">
                      {item.id}
                    </span>
                  </td>
                  <td className="py-space-md px-space-md">
                    <div className="flex items-center gap-space-xs font-medium">
                      <span>{item.demographic}</span>
                    </div>
                  </td>
                  <td className="py-space-md px-space-md">
                    <span className="text-on-surface font-medium">{item.chiefSymptom}</span>
                  </td>
                  <td className="py-space-md px-space-md">
                    {item.triageBadgeLabel === 'Emergency' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold">
                        <span className="w-2 h-2 rounded-full bg-error"></span>
                        Emergency
                      </span>
                    )}
                    {item.triageBadgeLabel === 'Medical Attention' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm font-semibold">
                        <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                        Medical Attention
                      </span>
                    )}
                    {item.triageBadgeLabel === 'Routine' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
                        <span className="w-2 h-2 rounded-full bg-secondary"></span>
                        Routine
                      </span>
                    )}
                    {item.triageBadgeLabel === 'Urgent' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-semibold">
                        <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                        Urgent
                      </span>
                    )}
                  </td>
                  <td className="py-space-md px-space-md">
                    <span className="text-on-surface-variant font-label-md text-label-md">
                      {item.time}
                    </span>
                  </td>
                  <td className="py-space-md px-space-xl text-right">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCase(item.id);
                      }}
                      className="inline-flex items-center gap-1 text-primary hover:text-primary-container font-label-lg text-label-lg font-semibold transition-colors cursor-pointer"
                    >
                      <span>View Case</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Station Status summary */}
        <div className="px-space-xl py-space-md bg-surface-container-low/30 flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-primary">verified</span>
            <span>AI Auto-Triage confidence verified with ICMR primary health protocols</span>
          </div>
          <div>
            <span>Showing {filteredCases.length} of 42 active cases</span>
          </div>
        </div>
      </div>
    </div>
  );
};
