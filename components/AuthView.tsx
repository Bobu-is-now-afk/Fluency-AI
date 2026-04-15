
import React, { useState } from 'react';
import { Mail, Lock, LogIn, UserPlus, ArrowRight, BrainCircuit } from 'lucide-react';
import { UserSession } from '../types';

interface AuthViewProps {
  onAuthSuccess: (session: UserSession) => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        // Mocking login for the sake of demo environment if backend is not reachable
        // In real use: const res = await fetch('/token', { method: 'POST', ... });
        await new Promise(r => setTimeout(r, 800));
        onAuthSuccess({ email, token: 'mock-jwt-token' });
      } else {
        await new Promise(r => setTimeout(r, 800));
        setIsLogin(true);
        alert("Account created! Please log in.");
      }
    } catch {
      setError("Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="mb-12 flex flex-col items-center">
        <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mb-4 shadow-2xl shadow-indigo-500/20">
          <BrainCircuit size={32} className="text-white" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">IELTS<span className="text-indigo-500">Audit</span></h1>
      </div>

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold mb-2">{isLogin ? 'Welcome back' : 'Join the lab'}</h2>
          <p className="text-slate-400 text-sm">Elevate your communication skills with AI</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {error && <p className="text-rose-400 text-sm text-center font-medium">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-3 mt-4 active:scale-[0.98]"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                {isLogin ? <LogIn size={20} /> : <UserPlus size={20} />}
                {isLogin ? 'Sign In' : 'Create Account'}
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-slate-800">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center gap-2 mx-auto transition-colors"
          >
            {isLogin ? "New here? Create an account" : "Already have an account? Sign in"}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
