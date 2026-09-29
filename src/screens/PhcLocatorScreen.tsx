import React, { useState } from 'react';
import { ASSETS, ScreenId } from '../data/mockData';

interface PhcLocatorScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

const PHC_CENTERS = [
  {
    id: 'phc-4082',
    name: 'Alangulam Primary Health Center (Node 4082)',
    cluster: 'Tirunelveli District Cluster • 2.4 km away',
    dutyDoctor: 'Dr. Kavitha M. & Dr. Priya R. (On-Premises)',
    status: '24/7 Emergency & OPD Open',
    waitEstimate: '~12 mins priority queue',
    bedsAvailable: '3 Observation Beds Available',
    phone: '04633-271408',
    slots: ['11:00 AM Today', '11:30 AM Today', '02:00 PM Today'],
  },
  {
    id: 'phc-4089',
    name: 'Kovilpatti Rural Health Sub-Center',
    cluster: 'Thoothukudi / Tirunelveli Border • 6.8 km away',
    dutyDoctor: 'Staff Nurse Anitha V. (MO Tele-consult Active)',
    status: 'Daytime OPD & Maternal Care',
    waitEstimate: '~5 mins walk-in',
    bedsAvailable: '2 Day-care Beds Available',
    phone: '04632-220914',
    slots: ['11:15 AM Today', '12:00 PM Today', '03:30 PM Today'],
  },
  {
    id: 'tmc-hub',
    name: 'Tirunelveli Medical College Hospital (Secondary Referral Hub)',
    cluster: 'Highground, Tirunelveli • 32.0 km away',
    dutyDoctor: '24/7 Cardiology Cath Lab & Trauma Team',
    status: '108 ALS Hot Route Active (~38 mins transit)',
    waitEstimate: 'Direct Emergency Bay Intake',
    bedsAvailable: 'ICU & STEMI Protocol Ready',
    phone: '108',
    slots: ['Direct 108 Referral', 'Priority OPD Tomorrow 09:00 AM'],
  },
];

export const PhcLocatorScreen: React.FC<PhcLocatorScreenProps> = ({ onNavigate }) => {
  const [selectedCenter, setSelectedCenter] = useState(PHC_CENTERS[0].id);
  const [bookedSlot, setBookedSlot] = useState<{ centerName: string; slot: string } | null>(null);

  return (
    <div className="max-w-[1280px] mx-auto px-gutter py-space-lg sm:py-space-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md mb-space-xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm mb-2">
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
            <span>National Rural Health Mission • PHC Directory</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
            Nearby Primary Health Centers (PHC)
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Verified government health stations synced with your NALAM AI Triage Record #TN-4082-89.
          </p>
        </div>
        <div className="flex items-center gap-space-sm">
          <button
            type="button"
            onClick={() => onNavigate('triage-result')}
            className="px-4 py-2.5 rounded-xl bg-surface-container-lowest text-on-surface hover:bg-surface-container font-label-lg text-label-lg shadow-sm cursor-pointer"
          >
            ← Back to Triage Record
          </button>
          <button
            type="button"
            onClick={() => onNavigate('symptom-check')}
            className="px-4 py-2.5 rounded-xl bg-primary text-on-primary hover:bg-primary-container font-label-lg text-label-lg shadow-sm cursor-pointer"
          >
            New Symptom Check
          </button>
        </div>
      </div>

      {bookedSlot && (
        <div className="mb-space-lg p-space-md rounded-2xl bg-secondary-container/70 text-on-secondary-container flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm shadow-sm">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[24px] text-primary">check_circle</span>
            <div>
              <p className="font-headline-sm text-headline-sm text-on-surface">
                Priority OPD Token Reserved: #OPD-4082-19
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                {bookedSlot.centerName} • Scheduled for <strong>{bookedSlot.slot}</strong>. Your
                triage summary has been forwarded to the duty nurse desk.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('staff-dashboard')}
            className="px-4 py-2 rounded-xl bg-primary text-on-primary font-label-md text-label-md shrink-0 cursor-pointer"
          >
            View on PHC Staff Queue →
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        <div className="lg:col-span-7 flex flex-col gap-space-md">
          {PHC_CENTERS.map((center) => {
            const isSelected = selectedCenter === center.id;
            return (
              <div
                key={center.id}
                onClick={() => setSelectedCenter(center.id)}
                className={`p-space-lg rounded-2xl bg-surface-container-lowest transition-all cursor-pointer ${
                  isSelected
                    ? 'ring-2 ring-primary shadow-md'
                    : 'shadow-sm hover:shadow-md'
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <div>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface">
                      {center.name}
                    </h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      {center.cluster}
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
                    {center.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-3 p-3 rounded-xl bg-surface-container-low font-body-sm text-body-sm">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-primary">
                      stethoscope
                    </span>
                    <span>{center.dutyDoctor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-tertiary">
                      schedule
                    </span>
                    <span>{center.waitEstimate}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-label-sm text-label-sm text-outline">
                      Book Fast-Track Slot:
                    </span>
                    {center.slots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setBookedSlot({ centerName: center.name, slot });
                        }}
                        className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-primary hover:text-on-primary font-label-md text-label-md transition-colors cursor-pointer"
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                  <a
                    href={`tel:${center.phone}`}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 text-primary font-label-md text-label-md font-semibold hover:underline"
                  >
                    <span className="material-symbols-outlined text-[16px]">call</span>
                    <span>{center.phone}</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <div className="lg:col-span-5 flex flex-col gap-space-md">
          <div className="rounded-2xl bg-surface-container-lowest p-space-lg shadow-sm flex flex-col gap-space-md">
            <div className="relative h-56 rounded-xl overflow-hidden">
              <img
                src={ASSETS.miniMap}
                alt="Tirunelveli & Alangulam PHC Cluster Map"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/75 via-transparent to-transparent flex flex-col justify-end p-4 text-inverse-on-surface">
                <span className="font-label-sm text-label-sm text-secondary-fixed uppercase">
                  Active Telemetry Corridor
                </span>
                <span className="font-headline-sm text-headline-sm">
                  Alangulam PHC ↔ Tirunelveli Medical College
                </span>
              </div>
            </div>

            <div className="p-space-md rounded-xl bg-surface-container-low space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-label-md text-label-md text-on-surface font-semibold">
                  ASHA Field Assistance
                </span>
                <span className="font-label-sm text-label-sm text-primary font-semibold">
                  Active in Block 4
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Need help reaching the clinic? Your local ASHA worker (Lakshmi S.) can arrange
                village health transport or doorstep vital monitoring.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
