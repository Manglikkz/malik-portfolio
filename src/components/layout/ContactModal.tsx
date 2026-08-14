'use client';
import React, { useState } from 'react';
import { X, Mail, Send, CheckCircle2, Copy, Check, MessageSquare, ExternalLink } from 'lucide-react';
import { useData } from '@/context/DataContext';

export const ContactModal: React.FC = () => {
  const { contactModalOpen, setContactModalOpen, siteSettings } = useData();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!contactModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
      setContactModalOpen(false);
    }, 2400);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteSettings.contactEmail || 'malik.ibrahim.dev@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white dark:bg-[#0D1C33] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#DCE7F5] dark:border-[#1E3A66] transition-all"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setContactModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-10 text-center space-y-3">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Message Sent!</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xs mx-auto">
              Thank you for reaching out. Malik will get back to you shortly!
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#15233D] dark:text-white">Let's Connect</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Open for questions, security audits, or project ideas.
                </p>
              </div>
            </div>

            {/* Quick Copy Email Banner */}
            <div className="my-4 p-3 bg-[#F2F7FF] dark:bg-[#132542] rounded-2xl flex items-center justify-between border border-[#DCE7F5] dark:border-[#1E3A66]">
              <div className="text-xs text-slate-700 dark:text-slate-200 font-mono truncate mr-2">
                {siteSettings.contactEmail || 'malik.ibrahim.dev@gmail.com'}
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="px-2.5 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-lg transition flex items-center gap-1 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5 mt-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Johnson"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#0A1628] border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#0A1628] border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Message
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Hi Malik, I would love to discuss a project..."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#0A1628] border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#1769E8] hover:bg-[#0D3B8E] text-white font-semibold rounded-xl text-sm transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
