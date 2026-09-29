# 🏥 NALAM AI – AI-Assisted Symptom Triage Chatbot

## 📌 Project Overview

NALAM AI is an AI-assisted symptom triage chatbot designed to support patients and healthcare staff in rural Primary Health Centers (PHCs).

The system allows patients to describe their symptoms through text or voice in their preferred language. It understands the symptoms, checks for predefined emergency warning signs, and classifies the patient's urgency level.

NALAM AI does not diagnose diseases. Instead, it helps identify **how urgently a patient may need medical attention** and guides them toward the appropriate next step.

---

## 🚀 Features

- 🤖 AI-assisted symptom understanding
- 💬 Interactive symptom chatbot
- 🎤 Voice-based symptom input
- 🌐 Multilingual support – English, Tamil and Hindi
- 📝 Collects patient information and symptom details
- 🚨 Emergency warning-sign detection
- 🟢 Routine / 🟡 Medical Attention / 🟠 Urgent / 🔴 Emergency triage levels
- 🏥 PHC staff dashboard
- 📋 Triage record management
- 📍 Nearby PHC center information
- 🔐 Staff login
- 📊 Patient priority visualization

## 🔄 How It Works

The AI-Assisted Symptom Triage Chatbot follows a structured process to understand
user symptoms and provide appropriate urgency-based guidance.

**User Input**
↓
**Text / Voice Symptom Input**
↓
**Basic Information Collection**
↓
**NLP-Based Symptom Extraction**
↓
**Emergency Warning Sign Detection**
↓
**AI-Assisted Triage Classification**
↓
**Urgency Level Identification**
↓
**Next-Step Medical Guidance**

## 🩺 Triage Levels

### 🟢 Routine

Normal consultation is recommended.

### 🟡 Medical Attention

The patient should consult a healthcare professional.

### 🟠 Urgent

The patient may require medical attention sooner.

### 🔴 Emergency

Immediate medical attention is indicated based on detected warning signs.

---

## 🛠️ Technologies Used

- **React.js** – Frontend user interface
- **Python** – Backend and AI processing
- **FastAPI** – Backend API development
- **NLP** – Understanding patient symptom descriptions
- **LLM** – Natural-language interaction and symptom information extraction
- **Rule-Based Engine** – Detection of predefined emergency warning signs
- **Firebase / Database** – Storing triage records and patient information
- **Speech-to-Text** – Voice-based symptom input
- **HTML & CSS / Tailwind CSS** – UI design
- **Git & GitHub** – Version control and project collaboration

---

## 📋 Patient Parameters

The system collects important information such as:

- Age
- Gender
- Main symptoms
- Additional symptoms
- Duration of symptoms
- Severity
- Existing medical conditions
- Relevant medical history
- Emergency warning signs

---

## 🧠 AI Components

### 1. NLP / LLM

The system understands symptoms written in natural language.

Example:

> "I have fever and severe headache for two days."

The system can extract:

Symptom: Fever  
Symptom: Headache  
Duration: 2 Days  
Severity: Severe

### 2. Emergency Detection

The system checks predefined warning signs such as:

- Severe breathing difficulty
- Chest pain
- Loss of consciousness
- Severe bleeding
- Seizures
- Severe allergic reaction

### 3. Triage Classification

Based on the collected information and emergency checks, the system assigns an appropriate triage category.

---

## 🖥️ Main Screens

- 🏠 AI Assistant Home
- 💬 Symptom Chat
- 📋 Triage Record
- 🔐 Staff Login
- 🏥 PHC Triage Queue
- 👨‍⚕️ Case Review
- 📍 Nearby PHC Center

---

## 💡 Innovation

NALAM AI combines:

- AI-based symptom understanding
- Multilingual interaction
- Voice-based input
- Emergency warning-sign detection
- Explainable triage
- PHC patient prioritization

The main idea is:

> **"Don't diagnose the disease. Identify the urgency and guide the next step."**

---

## 🎯 Target Users

- 👨‍⚕️ PHC Healthcare Staff
- 🧑‍⚕️ Community Health Workers
- 👨‍👩‍👧 Rural Patients
- 🏥 Primary Health Centers

---

## 🔐 Privacy & Safety

- Patient information should be handled securely.
- The system is intended to assist healthcare workflows.
- It does not replace doctors or healthcare professionals.
- Triage results should be treated as decision-support information, not a medical diagnosis.

---

## 🔮 Future Enhancements

- 📱 Mobile application
- 🗣️ More regional languages
- 🎤 Improved multilingual voice interaction
- 📊 Advanced PHC analytics
- 🔔 Emergency notifications
- 🏥 Integration with PHC systems
- 📈 Improved triage models using validated clinical datasets
- 🔒 Enhanced healthcare data security


## 💻 Run Locally

**Prerequisites:** Node.js (v18+)

1. Install dependencies:
   ```bash
   npm install
   ```
2. Build for production:
   ```bash
   npm run build
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

---

## 🏥 NALAM AI

**Understand Symptoms. Identify Urgency. Guide the Next Step.**
