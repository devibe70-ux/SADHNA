"use client";

import React, { useState } from "react";
import { SupporterTier, UserProfile } from "@/types";
import { X, Sparkles, ShieldCheck, Heart, Check, CreditCard, Lock } from "lucide-react";
import { recordPaymentTransaction } from "@/lib/firebase/dbService";

export const SUPPORTER_TIERS: SupporterTier[] = [
  {
    id: "sadhaka_108",
    name: "Sādhaka Supporter",
    sanskritName: "साधक संघ",
    amountINR: 108,
    badge: "🌸 Sādhaka Patron",
    description: "Support continuous distraction-free sound synthesis and Brahma Muhurta solar tools.",
    features: [
      "Unlock '🌸 Sādhaka Patron' Header Badge",
      "Unlimited Solfeggio Sine Synthesis",
      "Sādhanā Telemetry Cloud Backup"
    ]
  },
  {
    id: "seva_501",
    name: "Sevā Patron",
    sanskritName: "सेवा संरक्षक",
    amountINR: 501,
    badge: "🪔 Sevā Patron",
    description: "Contribute to expanding authentic Vedic research, Sanskrit audio guides, and open tools.",
    features: [
      "Unlock '🪔 Sevā Patron' Header Badge",
      "Priority Prakriti Consultation Reports",
      "Tanpura & Binaural Multi-Channel Mixing"
    ]
  },
  {
    id: "sanctuary_1008",
    name: "Vedic Sanctuary Founder",
    sanskritName: "वैदिक संस्थापक",
    amountINR: 1008,
    badge: "🔱 Vedic Founder",
    description: "Establish eternal sanctuary support for authentic Vedic wellness sciences.",
    features: [
      "Unlock '🔱 Vedic Founder' Lifetime Gold Badge",
      "Full Sanctuary Access & All Future Modules",
      "Direct Lineage & Sankalpa Wall Distinction"
    ]
  },
  {
    id: "mahatma_2100",
    name: "Mahātmā Benefactor",
    sanskritName: "महात्मा संरक्षक",
    amountINR: 2100,
    badge: "🏺 Mahātmā Benefactor",
    description: "Sponsor high-performance Web Audio servers, solar ephemeris calculations, and infrastructure costs.",
    features: [
      "Unlock '🏺 Mahātmā Benefactor' Glowing Badge",
      "Sponsor 100 Mindful Practitioners' Audio Streams",
      "Priority Feature Roadmap Voting"
    ]
  },
  {
    id: "rishi_5000",
    name: "Rishi Guardian",
    sanskritName: "ऋषि पालक",
    amountINR: 5000,
    badge: "🪷 Rishi Guardian",
    description: "Sponsor 1 full month of server infrastructure, cloud databases, and new Vedic audio recordings.",
    features: [
      "Unlock '🪷 Rishi Guardian' Radiant Crown Badge",
      "Sponsor Month-Long Server Cloud Costs",
      "Custom Sādhanā Routine & Direct Dev Q&A"
    ]
  },
  {
    id: "parampara_11000",
    name: "Paramparā Legacy Trustee",
    sanskritName: "परंपरा विश्वस्त",
    amountINR: 11000,
    badge: "☸️ Paramparā Trustee",
    description: "Eternal Trustee of the Sanatan Healing Platform, guaranteeing ad-free access for future generations.",
    features: [
      "Unlock '☸️ Paramparā Trustee' Eternal Distinction",
      "Named Sponsor Distinction on Wall of Sanctity",
      "Lifetime Full Sanctuary Access for 5 Family Members"
    ]
  }
];

interface DakshinaModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile | null;
  onPaymentSuccess: (profile: UserProfile) => void;
}

export const DakshinaModal: React.FC<DakshinaModalProps> = ({
  isOpen,
  onClose,
  user,
  onPaymentSuccess,
}) => {
  const [selectedTier, setSelectedTier] = useState<SupporterTier>(SUPPORTER_TIERS[2]); // Default ₹1008 Founder
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [paymentSuccessMsg, setPaymentSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if ((window as any).Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const activeAmountINR = customAmount ? Math.max(10, Number(customAmount)) : selectedTier.amountINR;

  const handleCheckout = async () => {
    setIsLoading(true);
    setPaymentSuccessMsg(null);

    try {
      // 1. Create order on backend API
      const res = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amountINR: activeAmountINR,
          tierName: customAmount ? `Custom Patron (₹${activeAmountINR})` : selectedTier.name,
          userId: user ? user.uid : "guest",
        }),
      });

      const orderData = await res.json();
      if (!orderData.success) {
        alert(`Order creation error: ${orderData.error}`);
        setIsLoading(false);
        return;
      }

      const isScriptLoaded = await loadRazorpayScript();

      if (isScriptLoaded && (window as any).Razorpay && !orderData.isSandbox) {
        // Live / Test Checkout Window
        const options = {
          key: orderData.keyId,
          amount: orderData.amount,
          currency: orderData.currency,
          name: "Sādhana Sanatan Web Platform",
          description: selectedTier.name,
          image: "https://cdn-icons-png.flaticon.com/512/3062/3062634.png",
          order_id: orderData.orderId,
          handler: async function (response: any) {
            const verifyRes = await fetch("/api/razorpay/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                userId: user ? user.uid : "guest",
                tierName: selectedTier.name,
                amountINR: activeAmountINR,
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              const updatedProfile = await recordPaymentTransaction(
                user ? user.uid : "guest",
                verifyData.transaction
              );
              onPaymentSuccess(updatedProfile);
              setPaymentSuccessMsg(`Success! You have unlocked ${selectedTier.badge}`);
              setIsLoading(false);
            }
          },
          prefill: {
            name: user ? user.displayName || "" : "Sādhaka",
            email: user ? user.email || "" : "",
          },
          theme: { color: "#ea580c" },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
        setIsLoading(false);
      } else {
        // Simulated Checkout Modal for Sandbox / Demo
        setTimeout(async () => {
          const verifyRes = await fetch("/api/razorpay/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: orderData.orderId,
              razorpay_payment_id: `pay_simulated_${Date.now()}`,
              razorpay_signature: "simulated_sig",
              userId: user ? user.uid : "guest",
              tierName: customAmount ? `Custom Patron (₹${activeAmountINR})` : selectedTier.name,
              amountINR: activeAmountINR,
            }),
          });

          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            const updatedProfile = await recordPaymentTransaction(
              user ? user.uid : "guest",
              verifyData.transaction
            );
            onPaymentSuccess(updatedProfile);
            setPaymentSuccessMsg(`Success! You have unlocked ${selectedTier.badge}`);
          }
          setIsLoading(false);
        }, 1200);
      }
    } catch (err: any) {
      console.error("Checkout error:", err);
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full text-stone-100 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto no-scrollbar">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-stone-400 hover:text-stone-200 p-1.5 rounded-full hover:bg-stone-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-1.5 bg-amber-950/70 border border-amber-800/60 px-3.5 py-1 rounded-full text-xs text-amber-300 font-semibold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            <span>Support Sādhana — Sanctuary Infrastructure Fund</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif text-amber-200 font-bold">
            Fund Sādhana Server & Audio Infrastructure
          </h3>
          <p className="text-xs text-stone-300 max-w-lg mx-auto leading-relaxed">
            Sādhana is 100% ad-free and distraction-free. Your patronage directly covers high-performance audio servers, astronomical ephemeris calculations, and open-source Vedic research.
          </p>
        </div>

        {/* Tiers Grid (6 Tiers) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SUPPORTER_TIERS.map((tier) => {
            const isSelected = selectedTier.id === tier.id && !customAmount;
            return (
              <div
                key={tier.id}
                onClick={() => {
                  setSelectedTier(tier);
                  setCustomAmount("");
                }}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? "bg-stone-950 border-amber-500 shadow-xl ring-1 ring-amber-500/40"
                    : "bg-stone-950/50 border-stone-800 hover:border-stone-700"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-serif font-bold text-sm text-amber-200">{tier.name}</h4>
                      <span className="text-[11px] font-serif text-amber-400/90">{tier.sanskritName}</span>
                    </div>
                    <span className="text-base font-mono font-extrabold text-amber-300">₹{tier.amountINR}</span>
                  </div>
                  <p className="text-[11px] text-stone-400 mt-2 leading-relaxed">{tier.description}</p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-stone-800/80 space-y-1">
                  {tier.features.slice(0, 2).map((f, idx) => (
                    <div key={idx} className="flex items-center space-x-1.5 text-amber-200/90 text-[10px]">
                      <Check className="w-3 h-3 text-amber-400 shrink-0" />
                      <span className="truncate">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Amount Input Option */}
        <div className="bg-stone-950/70 p-4 rounded-2xl border border-stone-800/80 space-y-2">
          <label className="text-xs font-mono uppercase text-amber-300 font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Custom Contribution Amount (₹)
          </label>
          <div className="flex items-center space-x-3">
            <span className="font-mono text-lg font-bold text-amber-400">₹</span>
            <input
              type="number"
              min="10"
              placeholder="Enter custom amount e.g. 2500"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="flex-1 bg-stone-900 border border-stone-800 text-amber-200 text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-amber-500 font-mono"
            />
          </div>
        </div>

        {/* Success Alert Banner */}
        {paymentSuccessMsg && (
          <div className="bg-emerald-950/80 border border-emerald-700/80 p-4 rounded-2xl text-center space-y-1">
            <span className="text-xs font-bold text-emerald-300 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              {paymentSuccessMsg}
            </span>
            <p className="text-[11px] text-stone-300">Your supporter status has been saved to your profile!</p>
          </div>
        )}

        {/* Checkout Button & Security Badges */}
        <div className="space-y-3 pt-2">
          <button
            onClick={handleCheckout}
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-extrabold py-3.5 px-6 rounded-full text-xs uppercase tracking-widest transition-all shadow-xl shadow-amber-950/50 disabled:opacity-50 active:scale-95"
          >
            {isLoading ? (
              <Sparkles className="w-4 h-4 animate-spin text-stone-950" />
            ) : (
              <CreditCard className="w-4 h-4 text-stone-950" />
            )}
            <span>
              {isLoading ? "Processing Razorpay..." : `Support Sādhana (₹${activeAmountINR})`}
            </span>
          </button>

          <div className="flex items-center justify-between text-[10px] text-stone-400 font-mono pt-1">
            <span className="flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-emerald-400" /> 256-Bit SSL Razorpay Encrypted
            </span>
            <span>UPI, Credit Card, Netbanking, Wallets</span>
          </div>
        </div>
      </div>
    </div>
  );
};
