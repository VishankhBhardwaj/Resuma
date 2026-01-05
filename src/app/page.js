"use client";
import 'animate.css';
import { Sparkles } from "lucide-react";
import GlowLine from "../components/ui/GlowLine";
import OrbitCarousel from "../components/ui/OrbitingSkills";
import Button from "@/components/ui/FancyButton";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import TextView from "../components/ui/Text"
import { useRouter } from "next/navigation";
export default async function Home() {
  const router = useRouter();
  return (
    <>
      <div className="parent flex flex-col ">
        {/* 1st section */}
        <div className="h-screen inset-0 bg-[linear-gradient(rgba(0,240,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.03)_1px,transparent_1px)] bg-size-[25px_25px] px-2 py-2 flex flex-col items-center glow-wrapper">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-cyan-500/30 backdrop-blur-sm mb-8 animate__animated animate__fadeInUp lg:ml-[40%] ml-[10%]">
            <div className="flex flex-row ">
              <Sparkles className="h-4 w-4 text-lg relative top-1.5 right-2 text-[#43919b]" />
              <h3 className="text-lg text-cyan-300 text-center">Powered by Advanced AI</h3>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center animate__animated animate__fadeInUp animate__delay-0.4s">
            {/* <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight text-center">
              Transform Your
              <br />
              Career Story
            </h1> */}
            <TextView />
          </div>
          <div className="flex items-center animate__animated animate__fadeInUp animate__delay-0.7s">
            <p className="text-xl text-center md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">AI-powered resume analysis and portfolio generation that makes you stand out. Get hired faster with intelligent insights and stunning presentations.</p>
          </div>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center animate__animated animate__fadeInUp"
            data-id="element-46"
            style={{ opacity: 1, transform: "none" }}
          >
            {/* Button 1 */}
            <SignedOut>
              <SignInButton mode="modal" afterSignInUrl="/dashboard" afterSignUpUrl="/dashboard">
                <button
                  className="font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-105 px-8 py-4 text-lg animate-pulse-glow group"
                  data-id="element-1"
                >
                  Analyze My Resume
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-zap inline-block ml-2 w-5 h-5 group-hover:rotate-12 transition-transform"
                    aria-hidden="true"
                  >
                    <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
                  </svg>
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <button
                onClick={() => router.push('/dashboard')}
                className="font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-105 px-8 py-4 text-lg animate-pulse-glow group"
                data-id="element-1"
              >
                Analyze My Resume
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-zap inline-block ml-2 w-5 h-5 group-hover:rotate-12 transition-transform"
                  aria-hidden="true"
                >
                  <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
                </svg>
              </button>
            </SignedIn>
            {/* Button 2 */}
            <div className="relative inline-flex items-center justify-center gap-4 group">
              <div
                className="absolute inset-0 duration-1000 opacity-60 transitiona-all bg-linear-to-r from-indigo-500 via-pink-500 to-yellow-400 rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200"
              ></div>
              <a
                role="button"
                className="group relative inline-flex items-center justify-center text-base rounded-xl bg-gray-900 px-8 py-3 font-semibold text-white transition-all duration-200 hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 hover:shadow-gray-600/30"
                title="payment"
                href="#"
              >See Examples<svg
                aria-hidden="true"
                viewBox="0 0 10 10"
                height="10"
                width="10"
                fill="none"
                className="mt-0.5 ml-2 -mr-1 stroke-white stroke-2"
              >
                  <path
                    d="M0 5h7"
                    className="transition opacity-0 group-hover:opacity-100"
                  ></path>
                  <path
                    d="M1 1l4 4-4 4"
                    className="transition group-hover:translate-x-[3px]"
                  ></path>
                </svg>
              </a>
            </div>

          </div>
          <p className='text-gray-300 text-center mt-7 animate__animated animate__fadeInUp animate__delay-0.9s'>Trusted by 10,000+ professionals worldwide</p>
        </div>
        {/* 2nd section */}
        <div className=" flex flex-col bg-black min-h-screen lg:min-h-screen w-screen items-center py-2 lg:gap-7 px-2">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-purple-500/30 backdrop-blur-sm mb-6 text-center justify-center lg:w-[10%] mt-3">
            <div className="flex flex-row ">
              <Sparkles className="h-4 w-4 text-lg relative top-1.5 right-2 text-purple-300" />
              <h3 className="text-lg text-purple-300">Features</h3>
            </div>
          </div>
          <h2 className="text-6xl md:text-7xl font-bold mb-6 bg-linear-to-r text-center from-white to-gray-400 bg-clip-text text-transparent" style={{ fontFamily: "Orbitron, sans-serif" }}>Powered by Intelligence</h2>
          <p className="text-center text-gray-300 text-2xl">Everything you need to elevate your professional presence</p>
          <div className="flex flex-col md:flex-row md:px-0 items-center w-full px-2  gap-6  py-6">
            <div
              className="group relative"
              style={{ opacity: 1, transform: "none" }}
              data-id="element-25"
            >
              {/* Glow Blur Layer */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"
                data-id="element-26"
              ></div>

              {/* Main Card */}
              <div
                className="relative h-full p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm group-hover:border-white/20 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all duration-300"
                data-id="element-27"
              >
                {/* Icon Container */}
                <div
                  className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 p-0.5 mb-6 group-hover:scale-110 transition-transform duration-300"
                  data-id="element-28"
                >
                  <div
                    className="w-full h-full rounded-xl bg-black/80 flex items-center justify-center"
                    data-id="element-29"
                  >
                    {/* SVG Icon (Brain) */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-brain w-8 h-8 text-white"
                      aria-hidden="true"
                    >
                      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"></path>
                      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"></path>
                      <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"></path>
                      <path d="M17.599 6.5a3 3 0 0 0 .399-1.375"></path>
                      <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"></path>
                      <path d="M3.477 10.896a4 4 0 0 1 .585-.396"></path>
                      <path d="M19.938 10.5a4 4 0 0 1 .585.396"></path>
                      <path d="M6 18a4 4 0 0 1-1.967-.516"></path>
                      <path d="M19.967 17.484A4 4 0 0 1 18 18"></path>
                    </svg>
                  </div>
                </div>

                {/* Title */}
                <h3
                  className="text-2xl font-bold mb-4 text-white"
                  style={{ fontFamily: "Orbitron, sans-serif" }}
                  data-id="element-31"
                >
                  AI Resume Analysis
                </h3>

                {/* Content Text */}
                <p className="text-gray-400 leading-relaxed" data-id="element-32">
                  Advanced algorithms scan your resume for optimization opportunities,
                  keyword gaps, and formatting improvements.
                </p>
              </div>
            </div>
            <div
              className="group relative"
              style={{ opacity: 1, transform: "none" }}
              data-id="element-25"
            >
              {/* Glow Blur Layer */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"
                data-id="element-26"
              ></div>

              {/* Main Card */}
              <div
                className="relative h-full p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm group-hover:border-white/20 group-hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all duration-300"
                data-id="element-27"
              >
                {/* Icon Container */}
                <div
                  className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 p-0.5 mb-6 group-hover:scale-110 transition-transform duration-300"
                  data-id="element-28"
                >
                  <div
                    className="w-full h-full rounded-xl bg-black/80 flex items-center justify-center"
                    data-id="element-29"
                  >
                    {/* Palette Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-palette w-8 h-8 text-white"
                      aria-hidden="true"
                    >
                      <path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"></path>
                      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle>
                      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle>
                      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle>
                      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle>
                    </svg>
                  </div>
                </div>

                {/* Title */}
                <h3
                  className="text-2xl font-bold mb-4 text-white"
                  style={{ fontFamily: "Orbitron, sans-serif" }}
                  data-id="element-31"
                >
                  Portfolio Generation
                </h3>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed" data-id="element-32">
                  Automatically create stunning portfolio websites from your resume data
                  with customizable themes and layouts.
                </p>
              </div>
            </div>
            <div
              className="group relative"
              style={{ opacity: 1, transform: "none" }}
              data-id="element-25"
            >
              {/* Glow Blur Layer */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"
                data-id="element-26"
              ></div>

              {/* Main Card */}
              <div
                className="relative h-full p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm group-hover:border-white/20 group-hover:shadow-[0_0_30px_rgba(236,72,153,0.3)] transition-all duration-300"
                data-id="element-27"
              >
                {/* Icon Container */}
                <div
                  className="w-16 h-16 rounded-xl bg-gradient-to-br from-pink-500 to-orange-500 p-0.5 mb-6 group-hover:scale-110 transition-transform duration-300"
                  data-id="element-28"
                >
                  <div
                    className="w-full h-full rounded-xl bg-black/80 flex items-center justify-center"
                    data-id="element-29"
                  >
                    {/* Rocket Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-rocket w-8 h-8 text-white"
                      aria-hidden="true"
                    >
                      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
                      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
                    </svg>
                  </div>
                </div>

                {/* Title */}
                <h3
                  className="text-2xl font-bold mb-4 text-white"
                  style={{ fontFamily: "Orbitron, sans-serif" }}
                  data-id="element-31"
                >
                  Career Insights
                </h3>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed" data-id="element-32">
                  Get personalized recommendations on skills to develop, roles to target, and
                  how to position yourself.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* third section */}
        <div className="flex flex-col w-full ">
          <div className="relative w-full bg-gray-900">
            <GlowLine
              orientation="horizontal"
              position="40%"
              color="blue"
            />
          </div>
          <div className="flex flex-col gap-3 items-center px-3">
            <h1 className="text-5xl mt-2.5 font-bold">How It <br /> Works</h1>
            <p className="text-center text-gray-300 text-2xl">Three simple steps to transform your career materials</p>
            <div className="relative">
              {/* Horizontal glow line for desktop */}
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 -translate-y-1/2"></div>

              <div className="grid md:grid-cols-3 gap-8 md:gap-4">
                {/* STEP 1 */}
                <div className="relative opacity-100">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-6">
                      {/* Glow background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full blur-xl opacity-50 animate-pulse-slow"></div>

                      {/* Circle icon */}
                      <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 p-0.5">
                        <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                          {/* Upload Icon */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-upload w-10 h-10 text-white"
                          >
                            <path d="M12 3v12"></path>
                            <path d="m17 8-5-5-5 5"></path>
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          </svg>
                        </div>
                      </div>

                      {/* Step Badge */}
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center text-white font-bold text-sm">
                        1
                      </div>
                    </div>

                    <h3
                      className="text-2xl font-bold mb-3 text-white"
                      style={{ fontFamily: "Orbitron, sans-serif" }}
                    >
                      Upload Resume
                    </h3>

                    <p className="text-gray-400 max-w-xs">
                      Drop your resume in any format - PDF, DOCX, or plain text
                    </p>
                  </div>
                </div>

                {/* STEP 2 */}
                <div className="relative opacity-100">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-6">
                      {/* Glow background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full blur-xl opacity-50 animate-pulse-slow"></div>

                      {/* Circle icon */}
                      <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 p-0.5">
                        <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                          {/* CPU Icon */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-cpu w-10 h-10 text-white"
                          >
                            <path d="M12 20v2"></path>
                            <path d="M12 2v2"></path>
                            <path d="M17 20v2"></path>
                            <path d="M17 2v2"></path>
                            <path d="M2 12h2"></path>
                            <path d="M2 17h2"></path>
                            <path d="M2 7h2"></path>
                            <path d="M20 12h2"></path>
                            <path d="M20 17h2"></path>
                            <path d="M20 7h2"></path>
                            <path d="M7 20v2"></path>
                            <path d="M7 2v2"></path>
                            <rect x="4" y="4" width="16" height="16" rx="2"></rect>
                            <rect x="8" y="8" width="8" height="8" rx="1"></rect>
                          </svg>
                        </div>
                      </div>

                      {/* Step Badge */}
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center text-white font-bold text-sm">
                        2
                      </div>
                    </div>

                    <h3
                      className="text-2xl font-bold mb-3 text-white"
                      style={{ fontFamily: "Orbitron, sans-serif" }}
                    >
                      AI Processing
                    </h3>

                    <p className="text-gray-400 max-w-xs">
                      Our AI analyzes content, structure, and optimization opportunities
                    </p>
                  </div>
                </div>

                {/* STEP 3 */}
                <div className="relative opacity-100">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-6">
                      {/* Glow background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full blur-xl opacity-50 animate-pulse-slow"></div>

                      {/* Circle icon */}
                      <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 p-0.5">
                        <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                          {/* Download Icon */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-download w-10 h-10 text-white"
                          >
                            <path d="M12 15V3"></path>
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <path d="m7 10 5 5 5-5"></path>
                          </svg>
                        </div>
                      </div>

                      {/* Step Badge */}
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center text-white font-bold text-sm">
                        3
                      </div>
                    </div>

                    <h3
                      className="text-2xl font-bold mb-3 text-white"
                      style={{ fontFamily: "Orbitron, sans-serif" }}
                    >
                      Get Results
                    </h3>

                    <p className="text-gray-400 max-w-xs">
                      Receive insights, improved resume, and generated portfolio
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        {/* Fourth Section  */}
        <div className="flex flex-col md:items-center md:justify-center w-full min-h-screen py-3 px-2 ">
          <div className="flex flex-col w-full md:w-[70%] md:h-[10%] bg-white/20 h-full py-3 px-2 md:py-1 items-center gap-2 relative   mx-auto  rounded-3xl bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 border-1 border-gray-500 ">
            <div className="inline-flex items-center gap-4 px-4 py-2 rounded-full bg-white/5 border border-cyan-500/30 backdrop-blur-sm mb-6 text-center justify-center w-[50%]"><div class="flex flex-row"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-sparkles h-4 w-4 text-lg relative top-1.5 right-2 text-purple-300" aria-hidden="true"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"></path><path d="M20 2v4"></path><path d="M22 4h-4"></path><circle cx="4" cy="20" r="2"></circle></svg><h3 className="text-lg text-cyan-300">Features</h3></div></div>
            <h1 className="text-center font bold text-6xl bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent font-bold">Ready To <br /> Stand Out?</h1>
            <p className="text-center text-3xl mt-3 text-gray-200">Join thousands of professionals who've transformed their careers with AI-powered insights</p>
            <div className="flex flex-col gap-4 mt-[20%] md:mt-0 md:flex-row">
              <SignInButton mode="modal">
                <Button />
              </SignInButton>
              <button className="cursor-pointer font-semibold rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-cyan-500/50 px-8 py-2 text-lg  " data-id="element-1">View Pricing</button>
            </div>
            <p className="mt-6 text-sm text-gray-500 mt-auto pt-6">No credit card required • Free forever plan available</p>
          </div>
        </div>
      </div>
    </>
  );
}
