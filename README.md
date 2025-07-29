# Gemini Chat UI

A frontend-only Gemini-style AI chat application built using React and Redux. It supports OTP login (simulated), chatroom creation/deletion, and a chat interface with AI-like responses, image uploads, dark mode, and localStorage-based data persistence.

---

## Features

- OTP Login (mocked using setTimeout)
- Country code picker using external API
- Create, delete, and view chatrooms
- AI-like chat with typing indicator and delayed responses
- Infinite scroll for older messages (dummy data)
- Pagination (20 messages per scroll)
- Image upload in chat (base64 preview)
- Copy-to-clipboard on hover
- Dark mode toggle
- Toast notifications using `alert()`
- Mobile responsive UI
- LocalStorage for login and chat data
- Keyboard accessible
- Skeleton loader for messages (optional fallback)

---

## Tech Stack

- React
- Redux Toolkit
- React Router
- React Hook Form + Zod (for form validation)
- Pure CSS (no Tailwind or UI libraries)
- UUID for unique IDs

