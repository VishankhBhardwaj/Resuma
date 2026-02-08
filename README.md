# Resuma 🚀

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Next.js](https://img.shields.io/badge/Next.js-15.2.8-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)

**Transform Your Career Story with AI-Powered Intelligence**

Resuma is a cutting-edge web application that leverages advanced AI to analyze resumes, generate stunning portfolios, and provide personalized career insights. Built with Next.js and powered by Google Gemini AI, Resuma helps professionals stand out in today's competitive job market.

![Resuma Banner](./public/img.jpg)

## ✨ Features

### 🧠 AI Resume Analysis
- **Smart Scanning**: Advanced algorithms analyze your resume for optimization opportunities
- **Keyword Gap Detection**: Identify missing keywords that could improve your visibility
- **Formatting Improvements**: Get suggestions for better resume structure and presentation
- **ATS Optimization**: Ensure your resume passes Applicant Tracking Systems

### 🎨 Portfolio Generation
- **Automated Creation**: Transform your resume data into stunning portfolio websites
- **Customizable Themes**: Multiple professional templates and layouts to choose from
- **Responsive Design**: Portfolios that look great on all devices
- **One-Click Deploy**: Share your portfolio instantly with a unique URL

### 🚀 Career Insights
- **Personalized Recommendations**: AI-driven suggestions on skills to develop
- **Role Targeting**: Discover the best career paths based on your experience
- **Market Positioning**: Learn how to position yourself effectively in the job market
- **Interview Preparation**: Get AI-powered interview prep tailored to your profile

### 📊 Dashboard Analytics
- Track your resumes and portfolios
- Monitor profile views and engagement
- View monthly statistics and trends
- Manage all your career materials in one place

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 15.2.8](https://nextjs.org/) - React framework with App Router
- **UI Library**: [React 18.2.0](https://reactjs.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) with custom configurations
- **Animations**: 
  - [Framer Motion](https://www.framer.com/motion/) - Advanced animations
  - [Animate.css](https://animate.style/) - CSS animations
- **Icons**: 
  - [Lucide React](https://lucide.dev/) - Modern icon library
  - [Tabler Icons](https://tabler-icons.io/) - Additional icon set
- **UI Components**: 
  - [Radix UI](https://www.radix-ui.com/) - Accessible component primitives
  - Custom components with glassmorphism and modern design patterns

### Backend & Services
- **Authentication**: [Clerk](https://clerk.com/) - Complete user management
- **Database**: [Supabase](https://supabase.com/) - PostgreSQL database with real-time capabilities
- **AI Engine**: [Google Gemini AI](https://ai.google.dev/) - Advanced AI for resume analysis and content generation
- **File Processing**: 
  - PDF.js for PDF parsing
  - React PDF for PDF rendering
  - React Dropzone for file uploads

### Development Tools
- **Language**: JavaScript/JSX with TypeScript support
- **Linting**: ESLint with Next.js configuration
- **Compiler**: Babel React Compiler for optimized builds
- **Styling Tools**: PostCSS with Tailwind CSS

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/VishankhBhardwaj/Resuma.git
cd resuma
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory and add the following environment variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Supabase Database
SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
DATABSE_PASSWORD=your_database_password

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key
```

#### Getting API Keys

**Clerk Authentication:**
1. Sign up at [clerk.com](https://clerk.com/)
2. Create a new application
3. Copy the publishable and secret keys from the dashboard

**Supabase:**
1. Create an account at [supabase.com](https://supabase.com/)
2. Create a new project
3. Get your URL and keys from Project Settings → API

**Google Gemini AI:**
1. Visit [Google AI Studio](https://ai.google.dev/)
2. Create an API key
3. Copy the key to your environment variables

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### 5. Build for Production

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## 📁 Project Structure

```
resuma/
├── public/              # Static assets (images, SVGs)
├── src/
│   ├── app/            # Next.js App Router pages
│   │   ├── api/        # API routes
│   │   │   ├── ai/     # AI-related endpoints
│   │   │   ├── portfolios/  # Portfolio management
│   │   │   ├── resume/      # Resume processing
│   │   │   └── user/        # User management
│   │   ├── dashboard/       # Dashboard pages
│   │   │   ├── createportfolio/  # Portfolio creation
│   │   │   ├── createresumes/    # Resume creation
│   │   │   ├── interviewprep/    # Interview preparation
│   │   │   ├── myportfolios/     # Portfolio management
│   │   │   └── settings/         # User settings
│   │   ├── p/          # Public portfolio pages
│   │   ├── layout.js   # Root layout with Clerk provider
│   │   ├── page.js     # Landing page
│   │   └── globals.css # Global styles
│   ├── components/     # React components
│   │   ├── template/   # Portfolio templates
│   │   └── ui/         # Reusable UI components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   └── middleware.ts   # Next.js middleware
├── .env.local          # Environment variables (create this)
├── package.json        # Dependencies and scripts
├── tailwind.config.js  # Tailwind CSS configuration
└── next.config.mjs     # Next.js configuration
```

## 🎯 How It Works

### 1. **Upload Resume**
- Drag and drop your resume in PDF, DOCX, or plain text format
- The system extracts and parses your information

### 2. **AI Processing**
- Google Gemini AI analyzes your resume content
- Identifies optimization opportunities and keyword gaps
- Generates personalized career insights

### 3. **Get Results**
- Receive detailed analysis and recommendations
- Generate an improved resume version
- Create a professional portfolio website
- Access interview preparation materials

## 🎨 Key Features in Detail

### Modern UI/UX
- **Glassmorphism Design**: Modern, translucent UI elements
- **Gradient Animations**: Dynamic color transitions and effects
- **Responsive Layout**: Optimized for desktop, tablet, and mobile
- **Dark Mode**: Built-in dark theme for better user experience
- **Micro-interactions**: Smooth hover effects and transitions

### Authentication & Security
- Secure authentication with Clerk
- Protected routes and API endpoints
- User session management
- Role-based access control

### Database Integration
- Real-time data synchronization with Supabase
- Efficient data storage and retrieval
- User data privacy and security
- Scalable database architecture

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Copyright (c) 2025 Vishankh

## 👨‍💻 Author

**Vishankh Bhardwaj**

- GitHub: [@VishankhBhardwaj](https://github.com/VishankhBhardwaj)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Clerk](https://clerk.com/) - Authentication and User Management
- [Supabase](https://supabase.com/) - Backend as a Service
- [Google Gemini AI](https://ai.google.dev/) - AI-Powered Analysis
- [Radix UI](https://www.radix-ui.com/) - Accessible UI Components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-First CSS Framework

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Contact the maintainer

## 🌟 Show Your Support

If you find this project helpful, please give it a ⭐️ on GitHub!

---

**Trusted by 10,000+ professionals worldwide** 🌍

*Transform your career story with AI-powered intelligence.*
