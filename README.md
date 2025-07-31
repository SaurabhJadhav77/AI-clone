# Gemini Clone – Conversational AI Chat Application

This is a frontend project built as a Gemini-style conversational chat app using React and Redux. It includes features like OTP-based login, chatroom management, simulated AI responses, image upload, form validation, pagination, infinite scroll, and throttling.

The app is responsive and styled using Material UI components and normal CSS. It is deployed using Vercel/Netlify.

## Live Link

https://ai-clone-zeta.vercel.app/

## Setup Instructions

1. Clone the repository:

```bash
git clone (https://github.com/SaurabhJadhav77/AI-clone.git)
cd AI-clone

npm install
npm run dev

Folder Str:
src/
├── actions/               # Redux action creators
│   ├── authActions.js
│   └── chatActions.js

├── components/            # Reusable UI components
│   ├── ChatroomItem.jsx
│   ├── ChatroomList.jsx
│   └── CreateChatroom.jsx

├── constants/             # Static values and action types
│   └── actionTypes.js

├── pages/                 # Page-level components (routed views)
│   ├── Chatroom.jsx
│   ├── Dashboard.jsx
│   ├── Login.jsx
│   └── MainLayout.jsx

├── redux/                 # Redux setup (slices, reducers, store)
│   ├── authReducer.js
│   ├── chatReducer.js
│   ├── chatroomSlice.js
│   └── store.js

├── styles/                # Component-specific CSS
│   ├── Chatroom.css
│   ├── Login.css
│   └── MainLayout.css

├── App.css                # Global styles
├── App.jsx                # Root component with routes
├── index.css              # Global reset/base styles
└── main.jsx               # Entry point (ReactDOM render)
