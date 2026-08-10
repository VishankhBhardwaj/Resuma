"use client";

import { useState, useEffect } from "react";
import {
  Check,
  Sparkles,
  CreditCard,
  User,
  Bot,
  PhoneCall,
  Award,
  ShieldCheck,
  Zap,
  FileText,
  Compass,
  ChevronDown,
  HelpCircle,
  X,
} from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import "animate.css";

export default function UpgradePlanPage() {
  const [loading, setLoading] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [subscriptionId, setSubscriptionId] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/user");
        if (response.data) {
          setIsPremium(response.data.isPremium || false);
          setSubscriptionId(response.data.subscriptionId || null);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      } finally {
        setLoadingUser(false);
      }
    };
    fetchUserData();
  }, []);

  const handleCancelSubscription = async () => {
    if (!subscriptionId) {
      toast.error("No active subscription ID found to cancel.");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Cancelling your subscription...");
    try {
      const response = await axios.post("/api/payment/cancel", {
        subscription_id: subscriptionId,
      });

      if (response.data?.success) {
        toast.success("Subscription cancelled successfully!", { id: toastId });
        setIsPremium(false);
        setSubscriptionId(null);
      } else {
        toast.error(response.data?.error || "Failed to cancel subscription.", { id: toastId });
      }
    } catch (error) {
      console.error("Error cancelling subscription:", error);
      const errorMsg = error?.response?.data?.error || error?.message || "Something went wrong. Please try again.";
      toast.error(errorMsg, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = async () => {
    setLoading(true);
    const toastId = toast.loading("Initializing payment order...");
    try {
      const response = await axios.post("/api/payment/create-order");

      if (response.status === 200 && response.data?.subscription) {
        const { subscription } = response.data;
        toast.success("Order created successfully!", { id: toastId });
        const options = {
          key: "rzp_test_xxxxx",

          subscription_id: subscription.id,

          name: "Portfolio Builder",

          description: "Premium Monthly Subscription",

          handler: async function (response) {
            const res = await axios.post("/api/payment/verify", response);

            console.log(res.data);
          },
        };

        const razorpay = new window.Razorpay(options);

        // payment failed
        razorpay.on("payment.failed", function (response) {
          console.log("Payment failed", response);

          toast.error("Payment failed");
        });

        // user closed popup
        razorpay.on("payment.cancelled", async function () {
          console.log("User cancelled payment");

          await axios.post("/api/payment/cancel", {
            subscription_id: subscription.id,
          });

          toast.error("Payment cancelled");
        });

        razorpay.open();
      } else {
        toast.error("Failed to generate payment order details.", {
          id: toastId,
        });
      }
    } catch (error) {
      console.error("Error creating subscription:", error);
      const errorMsg =
        error?.response?.data?.error ||
        error?.message ||
        "Something went wrong. Please try again.";
      toast.error(errorMsg, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const freeFeatures = [
    "1 Resume Analysis / ATS Optimization",
    "1 Active Web Portfolio Page",
    "Access to Standard Layouts",
    "Standard Text-Based Interview Prep",
    "Community Support",
  ];

  const proFeatures = [
    "Unlimited Resume Analysis & ATS Scores",
    "Unlimited Portfolio Deployments",
    "Access to all 6 Premium Designer Templates",
    "Gemini Pro Content Auto-Refinement",
    "Interactive Real-Time Voice Coach (Vapi AI)",
    "Comprehensive Performance Scorecards & Reviews",
    "Priority AI Generation Queue",
    "24/7 Priority Support",
  ];

  const faqs = [
    {
      q: "How does the AI Voice Coach work?",
      a: "Our AI Voice Coach uses Vapi AI to simulate a real-time vocal technical/behavioral interview. It listens to your voice inputs, talks back instantly like a real human recruiter, and generates a detailed post-interview diagnostic scorecard.",
    },
    {
      q: "Can I cancel my subscription anytime?",
      a: "Yes! You can manage and cancel your monthly subscription at any time directly through your dashboard settings page.",
    },
    {
      q: "What payment methods are supported?",
      a: "We support credit cards, debit cards, UPI, and popular digital wallets processed securely via Razorpay.",
    },
  ];

  if (loadingUser) {
    return (
      <div className="min-h-screen bg-slate-50/50 flex flex-col items-center justify-center p-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent" />
        <p className="mt-4 text-xs text-slate-450 font-bold tracking-wider" style={{ fontFamily: "Orbitron, sans-serif" }}>
          LOADING BILLING PROFILE...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16 px-4 md:px-6 lg:px-8 pt-8">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-12 animate__animated animate__fadeInDown">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-200 bg-cyan-50/80 mb-4 backdrop-blur-sm">
          <Sparkles className="h-4 w-4 text-cyan-600 animate-pulse" />
          <span className="text-xs font-semibold text-cyan-850 tracking-wide uppercase">
            Upgrade Your Potential
          </span>
        </div>
        <h1
          className="text-3xl md:text-5xl font-black bg-gradient-to-r from-slate-900 via-cyan-800 to-purple-800 bg-clip-text text-transparent leading-tight mb-4"
          style={{ fontFamily: "Orbitron, sans-serif" }}
        >
          Supercharge Your Career Journey
        </h1>
        <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto">
          Get unlimited resume optimizations, premium portfolio designs, and
          real-time AI voice coach simulations.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch mb-16">
        {/* Free Starter Plan */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden transition-all duration-300 hover:shadow-md animate__animated animate__fadeInLeft">
          <div className="space-y-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                Starter Pack
              </span>
              <h2
                className="text-2xl font-bold text-slate-850 mt-3"
                style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                Starter Plan
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Perfect for getting a baseline overview of your resume.
              </p>
            </div>

            <div className="flex items-baseline gap-1.5 py-4 border-y border-slate-100">
              <span className="text-4xl font-extrabold text-slate-900">₹0</span>
              <span className="text-slate-400 text-xs font-semibold">
                / month
              </span>
            </div>

            <div className="space-y-3.5">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Features Included:
              </p>
              {freeFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 text-slate-600 text-xs"
                >
                  <div className="h-4.5 w-4.5 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-slate-500" />
                  </div>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>          <div className="mt-8">
            <button
              disabled
              className="w-full py-3.5 rounded-2xl bg-slate-100 text-slate-400 font-bold text-xs cursor-not-allowed text-center border border-slate-200"
            >
              {isPremium ? "Standard Access Only" : "Active Plan"}
            </button>
          </div>
        </div>

        {/* Pro Career Plan */}
        <div className="bg-white border-2 border-transparent rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-lg relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] animate__animated animate__fadeInRight bg-gradient-to-b from-white via-white to-white before:absolute before:inset-0 before:-z-10 before:rounded-3xl before:p-0.5 before:bg-gradient-to-br before:from-cyan-500 before:via-purple-500 before:to-pink-500 z-10">
          {/* Popular Tag */}
          <div className="absolute top-4 right-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white text-[10px] uppercase font-bold tracking-wider px-3.5 py-1 rounded-full shadow-sm flex items-center gap-1">
            <Zap size={10} className="fill-white" />
            Recommended
          </div>

          <div className="space-y-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 bg-purple-50 border border-purple-100 px-3 py-1 rounded-full">
                Professional
              </span>
              <h2
                className="text-2xl font-bold text-slate-850 mt-3"
                style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                Pro Career Plan
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Unlock all limits and gain full-scale placement coaching tools.
              </p>
            </div>

            <div className="flex items-baseline gap-1.5 py-4 border-y border-slate-100">
              <span className="text-4xl font-extrabold text-slate-900">
                ₹199
              </span>
              <span className="text-slate-400 text-xs font-semibold">
                / month
              </span>
            </div>

            <div className="space-y-3.5">
              <p className="text-xs font-bold text-purple-650 uppercase tracking-wider">
                All Starter features plus:
              </p>
              {proFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 text-slate-700 text-xs font-medium"
                >
                  <div className="h-4.5 w-4.5 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 p-0.5 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="h-full w-full bg-white rounded-full flex items-center justify-center">
                      <Check className="h-3 w-3 text-cyan-600" />
                    </div>
                  </div>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 space-y-3">
            {isPremium ? (
              <>
                <button
                  disabled
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-650 text-white font-extrabold text-xs shadow-md border border-emerald-500 cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Award size={14} className="fill-white" />
                  Your Active Plan
                </button>
                <button
                  onClick={handleCancelSubscription}
                  disabled={loading}
                  className="w-full py-3.5 rounded-2xl border border-red-200 hover:border-red-300 bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs shadow-sm transition-all duration-300 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <div className="h-4.5 w-4.5 animate-spin rounded-full border-2 border-red-700/80 border-t-transparent" />
                      Cancelling Subscription...
                    </>
                  ) : (
                    <>
                      <X size={14} />
                      Cancel Subscription
                    </>
                  )}
                </button>
              </>
            ) : (
              <button
                onClick={handleUpgrade}
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-600 via-purple-650 to-pink-550 hover:from-cyan-700 hover:via-purple-750 hover:to-pink-650 text-white font-extrabold text-xs shadow-md transition-all duration-300 hover:shadow-lg active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <div className="h-4.5 w-4.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Generating Order...
                  </>
                ) : (
                  <>
                    <CreditCard size={14} />
                    Upgrade to Pro Plan
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Plan Features Comparison Table */}
      <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm mb-16 animate__animated animate__fadeInUp">
        <h3
          className="text-lg font-bold text-slate-800 mb-6 text-center md:text-left"
          style={{ fontFamily: "Orbitron, sans-serif" }}
        >
          Compare Features
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
                <th className="pb-4 w-1/2">Benefit / Capability</th>
                <th className="pb-4 text-center">Starter</th>
                <th className="pb-4 text-center text-purple-600">Pro Career</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-600">
              <tr className="hover:bg-slate-50/50">
                <td className="py-4 font-semibold text-slate-700">
                  Resume uploads & scoring
                </td>
                <td className="py-4 text-center">1 upload</td>
                <td className="py-4 text-center font-bold text-slate-900">
                  Unlimited
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-4 font-semibold text-slate-700">
                  Live portfolio websites
                </td>
                <td className="py-4 text-center">1 site</td>
                <td className="py-4 text-center font-bold text-slate-900">
                  Unlimited
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-4 font-semibold text-slate-700">
                  Premium designer templates
                </td>
                <td className="py-4 text-center">Standard</td>
                <td className="py-4 text-center font-bold text-slate-900">
                  All 6 Available
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-4 font-semibold text-slate-700">
                  AI Voice Coach (Vapi Call)
                </td>
                <td className="py-4 text-center">—</td>
                <td className="py-4 text-center font-bold text-slate-900">
                  Full Access
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-4 font-semibold text-slate-700">
                  AI Content Elaboration (Gemini)
                </td>
                <td className="py-4 text-center">Standard</td>
                <td className="py-4 text-center font-bold text-slate-900">
                  Advanced Pro
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="max-w-2xl mx-auto animate__animated animate__fadeInUp">
        <h3
          className="text-xl font-bold text-center text-slate-800 mb-8"
          style={{ fontFamily: "Orbitron, sans-serif" }}
        >
          Frequently Asked Questions
        </h3>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm"
            >
              <h4 className="font-bold text-slate-850 text-sm flex items-center gap-2 mb-2">
                <HelpCircle size={16} className="text-cyan-500" />
                {faq.q}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
