export type ScreenId =
  | 'home'
  | 'symptom-check'
  | 'triage-result'
  | 'phc-locator'
  | 'staff-login'
  | 'staff-dashboard'
  | 'case-detail';

export type LanguageCode = 'en' | 'ta' | 'hi';

export const ASSETS = {
  logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAn-G3ijVpfxSndnWrvdxwxydHTu7ymOLZWc8IYH8xnlyHSGP1AS_dZ9_QCUle9hurHFVvqMETior4CZwSSr_DajgR789cYIyfZg1mflpXTJAWVQo7pZ0ckrMntW981XBpCSQ7DFr4Vf_Kpb4e3XeyWaE3QvRUxadPxfNDc8Jrwk3iEWqAE3TEuIjSIFzWrPSi_fMO1iqRsoNzMX0qR71jQ5vnIn79hS-5x5WnmJ9DM83y4WtqnlUN6dQ',
  phcHero: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJlBrDfoPl7HwJofjWfKbUNUFndRB1U-6XNgYfnp2t2Tg1duDhWbxNN97ynd3CCguyTG_BgNXDAzNHm20LjGAiEnY9BuRsSRf7gyXbvg52hqZM9JfhTyfj90CwphpuYRfpkfilzNRvI6-FvBVr0WZMWShb5Vl_IKM6h5k61HuYwGl_1AJ_ZiD_3fCMyuowaXUT7SgciM1VrUi_9UCqJbmxz03N5t7cxUrpZHbVoau9adOWi82gbDrCKg',
  fieldMonitor: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnxXvJb0K7wxDuJ0MvGwlmRmLmKsAMLGl_OSbiM4wYEBUaXZu5_vtX6vZP799lufMoUgPEAGzpTbnqZT-XzQ5WrVn7o0-xF0ykT0YDYc3o8Z40boqnhBw-F_6ZqEnNij2Q6dkua7tdOYWC-Ogar0G6zuGWpDWOMR-2jgsCstfJ9Sfvv-3KsmXsr50eXhptneZkNhTN_iyuPcpf7f-4f1vaTef4ZATHu_ATo1XAUroVYW-7qttdXq0Giw',
  fieldEcg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfca5ucQBbTmpncW1ST-MYaUjbpDXx6wkKMyYVvGHZsVfpeyc_rscdAA-NJaUsRCjtSc91GFLFHO4R66lYw_ml0c1pFZEIAnBnTJcy1oHNt5Pa1DppHfLU_CzifkZ6gFfs0G1bp9Tcg57y7GU91Zrwv9-zGzhM-Sit1xio7Ik3s19jP0zTkk2n194_vZR-b17G0Bpk-TH9nilmV9RRc6z2z4WvDFRb7dHvbpJ0KL-64Gc27764n5gyGw',
  miniMap: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBzxjCZH_4sAhaYILPucoaJWmzV6LKwbvrVhx9ZMcAoohj_jQSbaD11HOSRRbI7qB-NN6QUOiY6rhouL5GrqZAvJbXXgsB9eqnPoqvEmB2D0UJUvvwE5h67a8clnMua7v1U8NLN6zv9ymehXpRs8etOcVLgg2FO7GDiASKajquNk37H9oDPitq4fzuqYTLh5I1Ag5nQPjuns06AHhyvFyT5j9zCPgZG_4xReAl3lAYgM2tlAtxIA3Kgw',
};

export interface PriorityCase {
  id: string;
  demographic: string;
  chiefSymptom: string;
  tier: 'emergency' | 'urgent' | 'routine';
  triageBadgeLabel: string;
  time: string;
  village: string;
  languages: string;
  abhaId: string;
  timestampAgo: string;
  protocolTitle: string;
  ashaWorker: string;
  triageGrade: string;
  onsetDuration: string;
  onsetNote: string;
  painScore: number;
  painLabel: string;
  primarySymptomsDescription: string;
  symptomTags: { label: string; color: 'error' | 'tertiary' | 'secondary' }[];
  voiceTranscriptEnglish: string;
  voiceTranscriptNative: string;
  voiceTranscriptTranslation: string;
  audioFileName: string;
  classificationLabel: string;
  classificationCode: string;
  clinicalDirectivesQuote: string;
  checklist: { id: string; text: string; checked: boolean }[];
  riskProfile: { title: string; detail: string; color: 'error' | 'tertiary' | 'secondary' }[];
  assignedDoctor: string;
  assignedBay: string;
  clinicalNotes?: string[];
  reviewed?: boolean;
  ambulanceDispatched?: boolean;
}

export const INITIAL_CASES: PriorityCase[] = [
  {
    id: 'C1024',
    demographic: 'Male, 58 yrs',
    chiefSymptom: 'Severe Chest Pain & Sweating',
    tier: 'emergency',
    triageBadgeLabel: 'Emergency',
    time: '10:25 AM',
    village: 'Village: Veeranam (Block 4)',
    languages: 'Tamil / English (Bi-lingual)',
    abhaId: 'ABHA ID: 91-4029-8812-10',
    timestampAgo: 'Today, 07:18 AM (14m ago)',
    protocolTitle: 'Protocol 01: Suspected Acute Coronary Syndrome',
    ashaWorker: 'Recorded by ASHA worker Lakshmi S. at Field Point',
    triageGrade: 'Triage Grade: Red',
    onsetDuration: '45 Minutes',
    onsetNote: 'Sudden acute onset',
    painScore: 9,
    painLabel: 'Critical Unrelieved',
    primarySymptomsDescription:
      'Severe retrosternal chest pain radiating down the left arm and into the jaw angle. Associated with profuse cold diaphoresis, dyspnea at rest, and mild presyncope.',
    symptomTags: [
      { label: 'Retrosternal Pressure', color: 'error' },
      { label: 'Left Arm Radiation', color: 'error' },
      { label: 'Cold Diaphoresis', color: 'error' },
      { label: 'Lightheadedness', color: 'tertiary' },
    ],
    voiceTranscriptEnglish:
      'Patient reported acute crushing sensation in chest during morning walk, sweating and feeling lightheaded. Said:',
    voiceTranscriptNative: '"நெஞ்சுல பாராங்கல் வெச்ச மாதிரி வலிக்குது... கை மரத்துப்போகுது."',
    voiceTranscriptTranslation: '(Feels like a heavy boulder on the chest... left hand going numb).',
    audioFileName: 'VoiceNote_0718_Ta.wav',
    classificationLabel: 'Priority 1 Emergency',
    classificationCode: 'Code Red',
    clinicalDirectivesQuote:
      '“Immediate ECG, initiate STEMI protocol, notify Duty Medical Officer, prepare 108 ALS ambulance for secondary transfer if required.”',
    checklist: [
      { id: 'chk-1', text: '12-Lead ECG within 10 minutes of arrival', checked: true },
      {
        id: 'chk-2',
        text: 'Administer Aspirin 300mg chewable + Clopidogrel (pending MO confirmation)',
        checked: true,
      },
      { id: 'chk-3', text: 'Establish high-flow O₂ & IV saline lock (18G cannula)', checked: false },
    ],
    riskProfile: [
      {
        title: 'Known Hypertension:',
        detail: '6+ years (irregular medication compliance, per ASHA records)',
        color: 'error',
      },
      {
        title: 'Smoking History:',
        detail: 'Tobacco bidi use (30 pack-years)',
        color: 'tertiary',
      },
      {
        title: 'Allergies:',
        detail: 'No known pharmacological contraindications reported',
        color: 'secondary',
      },
    ],
    assignedDoctor: 'Dr. Kavitha M.',
    assignedBay: 'Emergency Bay #02 • Bed 3 Reserved',
    clinicalNotes: [],
    reviewed: false,
    ambulanceDispatched: false,
  },
  {
    id: 'C1025',
    demographic: 'Female, 46 yrs',
    chiefSymptom: 'High Fever & Productive Cough',
    tier: 'urgent',
    triageBadgeLabel: 'Medical Attention',
    time: '10:18 AM',
    village: 'Village: Kovilpatti Rural (Ward 2)',
    languages: 'Tamil (Voice Intake)',
    abhaId: 'ABHA ID: 91-3812-4490-22',
    timestampAgo: 'Today, 10:18 AM (22m ago)',
    protocolTitle: 'Protocol 04: Acute Lower Respiratory Tract Infection',
    ashaWorker: 'Recorded by ASHA worker Meena K. via NALAM Companion',
    triageGrade: 'Triage Grade: Amber',
    onsetDuration: '3 Days',
    onsetNote: 'Progressive febrile cough',
    painScore: 5,
    painLabel: 'Moderate Discomfort',
    primarySymptomsDescription:
      'Persistent productive cough for 3 days with evening temperature spikes up to 101.4°F, generalized myalgia, and mild chest heaviness without resting cyanosis.',
    symptomTags: [
      { label: 'Febrile (101.4°F)', color: 'tertiary' },
      { label: 'Productive Cough', color: 'tertiary' },
      { label: 'Mild Chest Heaviness', color: 'secondary' },
    ],
    voiceTranscriptEnglish:
      'Patient family reported 3-day history of fever and cough with fatigue. Said:',
    voiceTranscriptNative: '"மூணு நாளா காய்ச்சலும் இருமலும் இருக்கு, ரொம்ப சோர்வா இருக்காங்க."',
    voiceTranscriptTranslation: '(Fever and cough for three days, feeling very fatigued).',
    audioFileName: 'VoiceNote_1018_Ta.wav',
    classificationLabel: 'Priority 2 Urgent',
    classificationCode: 'Code Amber',
    clinicalDirectivesQuote:
      '“Auscultate bilateral lung fields, check pulse oximetry (SpO2), obtain CBC & sputum AFB if cough persists, initiate antipyretics and oral hydration.”',
    checklist: [
      { id: 'chk-25-1', text: 'Record SpO2 and respiratory rate at triage desk', checked: true },
      { id: 'chk-25-2', text: 'Complete blood count (CBC) & chest auscultation', checked: false },
      { id: 'chk-25-3', text: 'Dispense Paracetamol 500mg & ORS hydration packets', checked: false },
    ],
    riskProfile: [
      {
        title: 'Type 2 Diabetes:',
        detail: 'Diagnosed 3 years ago (on Metformin 500mg BD)',
        color: 'tertiary',
      },
      {
        title: 'Exposure History:',
        detail: 'Seasonal viral cluster noted in Ward 2',
        color: 'secondary',
      },
      {
        title: 'Allergies:',
        detail: 'No known drug allergies',
        color: 'secondary',
      },
    ],
    assignedDoctor: 'Dr. Priya R.',
    assignedBay: 'OPD Room #01 • Priority Queue',
    clinicalNotes: [],
    reviewed: false,
    ambulanceDispatched: false,
  },
  {
    id: 'C1026',
    demographic: 'Child, 7 yrs',
    chiefSymptom: 'Wheezing & Labored Breath',
    tier: 'emergency',
    triageBadgeLabel: 'Emergency',
    time: '10:04 AM',
    village: 'Village: Nallur (East Hamlet)',
    languages: 'Tamil / English',
    abhaId: 'ABHA ID: 91-7741-1209-84',
    timestampAgo: 'Today, 10:04 AM (36m ago)',
    protocolTitle: 'Protocol 02: Acute Pediatric Bronchospasm',
    ashaWorker: 'Recorded by Field Nurse Anitha V. at Sub-Center',
    triageGrade: 'Triage Grade: Red',
    onsetDuration: '2 Hours',
    onsetNote: 'Rapidly worsening wheeze',
    painScore: 8,
    painLabel: 'Severe Respiratory Distress',
    primarySymptomsDescription:
      'Audible expiratory wheezing with intercostal retractions and nasal flaring. SpO2 91% on room air at field intake.',
    symptomTags: [
      { label: 'Audible Wheeze', color: 'error' },
      { label: 'Intercostal Retractions', color: 'error' },
      { label: 'SpO2 91% Room Air', color: 'error' },
    ],
    voiceTranscriptEnglish:
      'Mother reported child struggling to breathe since early morning dust exposure. Said:',
    voiceTranscriptNative: '"குழந்தைக்கு மூச்சு விட சிரமமா இருக்கு, விசில் சத்தம் கேக்குது."',
    voiceTranscriptTranslation: '(Child is having difficulty breathing, making a whistling sound).',
    audioFileName: 'VoiceNote_1004_Ta.wav',
    classificationLabel: 'Priority 1 Emergency',
    classificationCode: 'Code Red',
    clinicalDirectivesQuote:
      '“Immediate Salbutamol + Ipratropium nebulization with oxygen drive, continuous pulse oximetry, pediatric MO assessment.”',
    checklist: [
      { id: 'chk-26-1', text: 'Administer Salbutamol nebulization (2.5mg) stat', checked: true },
      { id: 'chk-26-2', text: 'Supplemental humidified oxygen to maintain SpO2 > 95%', checked: true },
      { id: 'chk-26-3', text: 'Re-assess air entry after 20 minutes', checked: false },
    ],
    riskProfile: [
      {
        title: 'Childhood Asthma:',
        detail: '2 prior nebulization visits in past 12 months',
        color: 'error',
      },
      {
        title: 'Immunization:',
        detail: 'Up to date per UIP schedule',
        color: 'secondary',
      },
      {
        title: 'Allergies:',
        detail: 'Dust and pollen sensitivity',
        color: 'tertiary',
      },
    ],
    assignedDoctor: 'Dr. Kavitha M.',
    assignedBay: 'Emergency Bay #01 • Nebulization Station',
    clinicalNotes: [],
    reviewed: false,
    ambulanceDispatched: false,
  },
  {
    id: 'C1027',
    demographic: 'Female, 32 yrs',
    chiefSymptom: 'Persistent Headache & Fatigue',
    tier: 'routine',
    triageBadgeLabel: 'Routine',
    time: '09:48 AM',
    village: 'Village: Alangulam North',
    languages: 'Tamil',
    abhaId: 'ABHA ID: 91-5501-3389-15',
    timestampAgo: 'Today, 09:48 AM (52m ago)',
    protocolTitle: 'Protocol 11: Primary Tension Headache & Anemia Screen',
    ashaWorker: 'Self-reported via NALAM AI Companion Portal',
    triageGrade: 'Triage Grade: Green',
    onsetDuration: '4 Days',
    onsetNote: 'Gradual dull bilateral ache',
    painScore: 3,
    painLabel: 'Mild-Moderate',
    primarySymptomsDescription:
      'Bilateral frontal headache relieved partially by rest, accompanied by daytime tiredness. No photophobia, neck stiffness, or visual blurring.',
    symptomTags: [
      { label: 'Bilateral Headache', color: 'secondary' },
      { label: 'Daytime Fatigue', color: 'secondary' },
      { label: 'Stable Vitals', color: 'secondary' },
    ],
    voiceTranscriptEnglish:
      'Patient described mild recurring headache after agricultural work shifts. Said:',
    voiceTranscriptNative: '"வெயில்ல வேலை செஞ்சா தலை வலிக்குது, சோர்வா இருக்கு."',
    voiceTranscriptTranslation: '(Headache after working in the sun, feeling tired).',
    audioFileName: 'VoiceNote_0948_Ta.wav',
    classificationLabel: 'Priority 3 Routine',
    classificationCode: 'Standard',
    clinicalDirectivesQuote:
      '“Routine OPD consultation, point-of-care Hemoglobin check for nutritional anemia, hydration and iron-folic acid counseling.”',
    checklist: [
      { id: 'chk-27-1', text: 'Point-of-care digital Hemoglobin (Hb) test', checked: true },
      { id: 'chk-27-2', text: 'Blood pressure & visual acuity check', checked: false },
    ],
    riskProfile: [
      {
        title: 'Nutritional Status:',
        detail: 'Borderline Hb (10.4 g/dL) noted 6 months ago',
        color: 'tertiary',
      },
      {
        title: 'Allergies:',
        detail: 'None reported',
        color: 'secondary',
      },
    ],
    assignedDoctor: 'Dr. Priya R.',
    assignedBay: 'General OPD • Queue #14',
    clinicalNotes: [],
    reviewed: false,
    ambulanceDispatched: false,
  },
  {
    id: 'C1028',
    demographic: 'Male, 64 yrs',
    chiefSymptom: 'Elevated BP (160/100) & Dizziness',
    tier: 'urgent',
    triageBadgeLabel: 'Urgent',
    time: '09:30 AM',
    village: 'Village: Surandai Road',
    languages: 'Tamil / Hindi',
    abhaId: 'ABHA ID: 91-6190-7823-41',
    timestampAgo: 'Today, 09:30 AM (1h 10m ago)',
    protocolTitle: 'Protocol 06: Uncontrolled Stage-2 Hypertension',
    ashaWorker: 'Recorded by ASHA worker Lakshmi S. at Doorstep Camp',
    triageGrade: 'Triage Grade: Amber',
    onsetDuration: 'Since Morning',
    onsetNote: 'Positional vertiginous sensation',
    painScore: 6,
    painLabel: 'Moderate Vertigo',
    primarySymptomsDescription:
      'Blood pressure recorded at 160/100 mmHg during village NCD screening camp with postural dizziness and occipital heaviness. No focal neurological deficits.',
    symptomTags: [
      { label: 'BP 160/100 mmHg', color: 'tertiary' },
      { label: 'Occipital Heaviness', color: 'tertiary' },
      { label: 'Missed Amlodipine', color: 'error' },
    ],
    voiceTranscriptEnglish:
      'Patient reported running out of blood pressure tablets 5 days ago and feeling dizzy on standing. Said:',
    voiceTranscriptNative: '"அஞ்சு நாளா பிரஷர் மாத்திரை போடல, எழுந்தா தலை சுத்துது."',
    voiceTranscriptTranslation: '(Did not take BP tablets for 5 days, head spins when standing up).',
    audioFileName: 'VoiceNote_0930_Ta.wav',
    classificationLabel: 'Priority 2 Urgent',
    classificationCode: 'Code Amber',
    clinicalDirectivesQuote:
      '“Repeat seated & standing BP after 15 mins quiet rest, rule out papilledema or chest pain, resume antihypertensive regimen under MO supervision.”',
    checklist: [
      { id: 'chk-28-1', text: 'Repeat manual sphygmomanometer reading after rest', checked: true },
      { id: 'chk-28-2', text: '12-Lead baseline ECG to rule out LVH strain', checked: true },
      { id: 'chk-28-3', text: 'Dispense 30-day NCD refill (Amlodipine 5mg + Telmisartan 40mg)', checked: false },
    ],
    riskProfile: [
      {
        title: 'NCD Registry:',
        detail: 'Registered in Makkalai Thedi Maruthuvam hypertension cohort',
        color: 'tertiary',
      },
      {
        title: 'Renal Function:',
        detail: 'Serum Creatinine 1.0 mg/dL (Normal)',
        color: 'secondary',
      },
    ],
    assignedDoctor: 'Dr. Priya R.',
    assignedBay: 'NCD Clinic Desk #02',
    clinicalNotes: [],
    reviewed: false,
    ambulanceDispatched: false,
  },
];
