"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Box, Lock, Mail, Loader2, ArrowRight, Github } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email address first.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login?type=recovery`,
    });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      alert("Password reset link sent to your email!");
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        alert("Check your email for the confirmation link!");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full glass p-8 rounded-3xl border border-white/10 relative overflow-hidden"
      >
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl" />
        
        <div className="text-center mb-8 relative">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 mb-4">
            <Lock className="text-primary-neon w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-white">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="text-gray-400 mt-2 text-sm">
            {isSignUp ? "Join the future of 3D printing" : "Log in to manage your 3D orders"}
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-xl text-sm mb-6 text-center">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 mb-6">
          <button
            onClick={signInWithGoogle}
            className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white py-3 rounded-xl transition-all font-medium"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12 5.04c1.94 0 3.51.68 4.75 1.83L20.1 3.52C17.61 1.2 14.31 0 12 0 7.46 0 3.69 2.57 1.96 6.36l3.98 3.13C6.93 6.91 9.28 5.04 12 5.04z" />
              <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58l3.86 3.01c2.26-2.09 3.56-5.17 3.56-8.83z" />
              <path fill="#FBBC05" d="M5.94 14.26c-.24-.72-.38-1.49-.38-2.26s.14-1.54.38-2.26L1.96 6.36C.71 8.83 0 11.58 0 14.5c0 2.92.71 5.67 1.96 8.14l3.98-3.13c-.24-.72-.38-1.49-.38-2.25z" />
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3.01c-1.08.72-2.45 1.16-4.07 1.16-3.11 0-5.74-2.11-6.68-4.96l-3.98 3.13C3.69 21.43 7.46 24 12 24z" />
            </svg>
            Continue with Google
          </button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-black px-2 text-gray-500">Or continue with email</span></div>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs text-gray-500 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-primary transition-all text-sm"
                placeholder="name@example.com"
              />
            </div>
          </div>

          {!isSignUp && (
            <div className="flex justify-end">
              <button 
                type="button"
                onClick={handleForgotPassword}
                className="text-xs text-primary-neon hover:underline"
              >
                Forgot Password?
              </button>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs text-gray-500 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-primary transition-all text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(14,165,233,0.3)] disabled:opacity-50 mt-6"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
              <>
                {isSignUp ? "Sign Up" : "Log In"}
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            {isSignUp ? "Already have an account? Log In" : "Don't have an account? Sign Up"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
