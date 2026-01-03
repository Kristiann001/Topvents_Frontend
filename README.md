# Topvents

Topvents is a modern, full-stack application designed for managing events, getaways, and stays. It features a premium glassmorphic UI, robust user authentication, and integrated Mpesa payment processing via the Daraja API.

## 🚀 Features

- **User Authentication**: Secure Signup, Login, Profile management, and Password Reset functionality.
- **Event Management**: Browse and manage various events with a seamless search interface.
- **Getaways & Stays**: Dedicated sections for booking getaways and staying at premium locations.
- **Mpesa Integration**: Secure payment processing using Safaricom's Daraja API.
- **Admin Dashboard**: Comprehensive CRUD operations for managing users, events, and properties.
- **Modern UI**: Built with a "wow" factor using glassmorphism, smooth animations, and responsive design.

## 🛠️ Technical Stack

### Frontend
- **React 19**: Latest React features for a dynamic user experience.
- **Vite**: Fast build tool and dev server.
- **Tailwind CSS 4**: Utility-first CSS for modern styling.
- **Flowbite React**: Premium component library based on Tailwind CSS.
- **Lucide & React Icons**: Sleek iconography.
- **React Router Dom**: Client-side routing.

### Backend
- **Node.js & Express**: Scalable backend architecture.
- **MongoDB & Mongoose**: NoSQL database for flexible data management.
- **JWT (JSON Web Tokens)**: Secure stateless authentication.
- **Nodemailer**: Email services for password resets.
- **Daraja API**: Mpesa payment gateway integration.

## 📂 Project Structure

```text
Topvents/
├── Topvents_Frontend/   # React/Vite application
│   └── topvents/        # Frontend source code
└── Topvents_Backend/    # Node.js/Express API server
```

## 🚥 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB account/instance

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd Topvents_Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables in a `.env` file (refer to `.env.example`):
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_secret
   MPESA_CONSUMER_KEY=...
   MPESA_CONSUMER_SECRET=...
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd Topvents_Frontend/topvents
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 📄 License
This project is licensed under the ISC License.
