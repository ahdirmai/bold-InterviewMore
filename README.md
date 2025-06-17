# AI-Powered Tech Interview Simulator 🎙️🤖

Latihan interview teknikal berbasis AI — dengan interaksi suara seperti interview sungguhan!

## 🎯 Tujuan Aplikasi

Membantu developer meningkatkan skill interview teknikal dengan pengalaman yang realistis:  
✅ AI bertanya  
✅ User menjawab lewat mic  
✅ AI memberikan feedback

---

## 🛠️ Tech Stack

- **Next.js** (App Router, TypeScript)
- **Tailwind CSS** (UI Styling)
- **Gemini Pro API** (Google AI Studio / Vertex AI) — AI Interviewer
- **Clerk** — Auth (Google Sign-In / Magic Link)
- **Web Speech API**  
  - `SpeechRecognition` → Speech to Text (STT)  
  - `SpeechSynthesis` → Text to Speech (TTS)
- **React Hooks / Context** → State management (frontend only)
- **Deployment:** Vercel  
- **Database:** ❌ No database — state only on frontend

---

## 🚀 Fitur MVP

✅ Login via Clerk  
✅ Pilih Role & Level (ex: Backend Junior, Frontend Mid, Fullstack Senior)  
✅ AI Interview Chat:  
  - AI memberikan pertanyaan satu per satu  
  - AI membacakan pertanyaan (TTS)  
  - User menjawab lewat mic (STT)  
  - AI memberikan feedback & lanjut ke pertanyaan berikutnya  
✅ Toggle "Voice Mode On/Off"  
✅ Reset session kapan saja (tanpa persist data)

---

## 🧭 Flow Penggunaan

1️⃣ User login  
2️⃣ Pilih role & level → start interview  
3️⃣ AI bacakan pertanyaan → aktifkan STT  
4️⃣ User jawab lewat mic → transkrip dikirim ke Gemini  
5️⃣ AI kasih feedback + pertanyaan berikutnya  
6️⃣ Bisa reset sesi kapan saja

---

## 🎤 Prompt Template (Gemini)

```text
You are an experienced technical interviewer for a {role} engineer applying for a {level} position.

Your task is to conduct a mock interview.

Rules:
- Ask one question at a time.
- Wait for the user to answer.
- Provide 1-2 sentences of constructive feedback.
- Then ask the next question.
- Keep a friendly and professional tone.

First, introduce yourself:
"Hi, I’m your AI interviewer for the {role} {level} interview practice. Let’s begin!"
````

---

## 📄 Halaman MVP

| Route        | Deskripsi                   |
| ------------ | --------------------------- |
| `/`          | Landing Page + Login        |
| `/dashboard` | Pilih role & level          |
| `/interview` | Chat + Voice interaction    |
| `/about`     | (Opsional) Tentang aplikasi |

---

## 🗂️ Deployment

* Platform: [Vercel](https://vercel.com/)
* No backend server — murni Next.js + Gemini API + Clerk.

---

## 💡 Catatan Pengembangan

* MVP tanpa database (stateless)
* Speech recognition menggunakan **Web Speech API** — browser support: Chrome & Edge
* Fokus mobile-friendly (responsive design)
* Untuk pengembangan & testing: gunakan mic yang jelas untuk input suara

---

## 🚧 TODO Next

* Tambah pilihan role / level yang lebih beragam
* Tambahkan fitur simpan sesi (pakai localStorage atau backend di versi berikut)
* Improve feedback AI (prompt engineering)
* Export transcript hasil interview
* Dark mode toggle

---

**Made with ❤️ by \ahdirmai**

---

```
