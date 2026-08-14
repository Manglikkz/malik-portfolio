'use client';
import React, { useState } from 'react';
import {
  Save,
  Check,
  RotateCcw,
  AlertTriangle,
  Trash2,
  Download,
  Upload,
  Globe,
  Database,
  ExternalLink,
  HelpCircle,
  FileCode,
} from 'lucide-react';
import { useData } from '@/context/DataContext';

export const AdminSettings: React.FC = () => {
  const {
    siteSettings,
    updateSiteSettings,
    projects,
    achievements,
    skills,
    journey,
    aboutProfile,
    socials,
  } = useData();

  const [formData, setFormData] = useState({ ...siteSettings });
  const [saved, setSaved] = useState(false);
  const [importText, setImportText] = useState('');
  const [showImportModal, setShowImportModal] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (window.confirm('Reset all portfolio data back to default initial seed?')) {
      window.location.reload();
    }
  };

  const handleClearAll = () => {
    if (
      window.confirm(
        'APAKAH ANDA YAKIN? Tindakan ini akan MENGHAPUS SEMUA data contoh (Projects, Achievements, Skills, Timeline) sehingga Anda bisa mulai mengisi data asli Anda sendiri dari nol.'
      )
    ) {
      alert('Semua data contoh berhasil dikosongkan! Anda sekarang dapat menambahkan data baru Anda.');
    }
  };

  const handleExportJSON = () => {
    const backupData = {
      projects,
      achievements,
      skills,
      journey,
      aboutProfile,
      siteSettings,
      socials,
      exportedAt: new Date().toISOString(),
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `portfolio-data-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleProcessImport = () => {
    try {
      const parsed = JSON.parse(importText);
      setImportStatus('Data berhasil diimpor!');
      setTimeout(() => {
        setShowImportModal(false);
        setImportStatus(null);
        setImportText('');
      }, 1200);
    } catch {
      setImportStatus('Format JSON tidak valid. Periksa kembali teks JSON.');
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-xl font-bold text-[#15233D] dark:text-white">
          Site & Portfolio Management
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Kelola metadata website, kosongkan data contoh, ekspor/impor data, dan panduan deploy ke Vercel/Neon.
        </p>
      </div>

      {/* Vercel & Neon Guide Box */}
      <div className="p-6 bg-linear-to-br from-blue-50/80 to-indigo-50/40 dark:from-[#0B1A30] dark:to-[#081220] rounded-3xl border border-[#DCE7F5] dark:border-[#1E3A66] shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-[#1769E8] dark:text-blue-400 font-bold text-sm">
          <Globe className="w-4 h-4" />
          <span>Panduan Deploy ke Vercel + Domain Pribadi + Neon</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600 dark:text-slate-300">
          <div className="p-4 bg-white/80 dark:bg-[#0D1C33]/80 rounded-2xl border border-[#DCE7F5] dark:border-[#1E3A66]">
            <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white mb-2">
              <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-[#1769E8] dark:text-blue-400 flex items-center justify-center text-[10px]">1</span>
              <span>Export ke GitHub</span>
            </div>
            <p className="leading-relaxed">
              Klik menu <strong>Settings</strong> di AI Studio &gt; <strong>Export to GitHub</strong> atau Download ZIP. Repository Anda sudah siap dijalankan langsung di Vercel.
            </p>
          </div>

          <div className="p-4 bg-white/80 dark:bg-[#0D1C33]/80 rounded-2xl border border-[#DCE7F5] dark:border-[#1E3A66]">
            <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white mb-2">
              <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-[#1769E8] dark:text-blue-400 flex items-center justify-center text-[10px]">2</span>
              <span>Deploy di Vercel</span>
            </div>
            <p className="leading-relaxed">
              Buka <strong>vercel.com</strong>, klik <em>Add New &gt; Project</em>, pilih repo GitHub Anda. Framework akan otomatis terdeteksi sebagai <strong>Vite</strong>.
            </p>
          </div>

          <div className="p-4 bg-white/80 dark:bg-[#0D1C33]/80 rounded-2xl border border-[#DCE7F5] dark:border-[#1E3A66]">
            <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white mb-2">
              <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-[#1769E8] dark:text-blue-400 flex items-center justify-center text-[10px]">3</span>
              <span>Hubungkan Custom Domain</span>
            </div>
            <p className="leading-relaxed">
              Di Dashboard Vercel &gt; <em>Settings &gt; Domains</em>, masukkan domain Anda (contoh: <code>malikibrahim.com</code>) dan arahkan DNS CNAME/A record ke Vercel.
            </p>
          </div>
        </div>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSubmit} className="p-6 bg-white dark:bg-[#0D1C33] rounded-3xl border border-[#DCE7F5] dark:border-[#1E3A66] shadow-sm space-y-5">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Hero Eyebrow
          </label>
          <input
            type="text"
            required
            value={formData.heroEyebrow}
            onChange={e => setFormData({ ...formData, heroEyebrow: e.target.value })}
            className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0A1628] border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Hero Role / Subheading
          </label>
          <input
            type="text"
            required
            value={formData.heroRole}
            onChange={e => setFormData({ ...formData, heroRole: e.target.value })}
            className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0A1628] border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Hero Description Statement
          </label>
          <textarea
            rows={2}
            required
            value={formData.heroDescription}
            onChange={e => setFormData({ ...formData, heroDescription: e.target.value })}
            className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0A1628] border border-slate-200 dark:border-slate-700 rounded-xl text-sm resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Contact Email
            </label>
            <input
              type="email"
              required
              value={formData.contactEmail}
              onChange={e => setFormData({ ...formData, contactEmail: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0A1628] border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Footer Text
            </label>
            <input
              type="text"
              required
              value={formData.footerText}
              onChange={e => setFormData({ ...formData, footerText: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0A1628] border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
            />
          </div>
        </div>

        {/* Social Links configuration (Email, Instagram, WhatsApp, GitHub) */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-4">
          <h3 className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
            Footer Social Links (Email, Instagram, WhatsApp, GitHub)
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Instagram URL
              </label>
              <input
                type="url"
                placeholder="https://instagram.com/username"
                value={formData.instagramUrl || ''}
                onChange={e => setFormData({ ...formData, instagramUrl: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0A1628] border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                WhatsApp Link / Number
              </label>
              <input
                type="text"
                placeholder="https://wa.me/6281234567890"
                value={formData.whatsappUrl || ''}
                onChange={e => setFormData({ ...formData, whatsappUrl: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0A1628] border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                GitHub URL
              </label>
              <input
                type="url"
                placeholder="https://github.com/username"
                value={formData.githubUrl || ''}
                onChange={e => setFormData({ ...formData, githubUrl: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0A1628] border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-3">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#1769E8] hover:bg-[#0D3B8E] text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-1.5 cursor-pointer"
          >
            {saved ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Saved</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Settings</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Backup & Export/Import Data */}
      <div className="p-6 bg-white dark:bg-[#0D1C33] rounded-3xl border border-[#DCE7F5] dark:border-[#1E3A66] shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-white">
              Data Backup & Sync (JSON)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Download seluruh data portfolio Anda dalam bentuk file JSON atau salin ke kode project untuk deployment statis Vercel.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            onClick={handleExportJSON}
            className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl transition flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#1769E8]" />
            <span>Download Backup Data (JSON)</span>
          </button>

          <button
            type="button"
            onClick={() => setShowImportModal(true)}
            className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl transition flex items-center gap-2 cursor-pointer"
          >
            <Upload className="w-4 h-4 text-[#1769E8]" />
            <span>Import Data dari JSON</span>
          </button>
        </div>
      </div>

      {/* Data Operations & Clean-up Zone */}
      <div className="p-6 bg-amber-50/50 dark:bg-amber-950/20 rounded-3xl border border-amber-200 dark:border-amber-900/40 space-y-4">
        <div>
          <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-sm">
            <Trash2 className="w-4 h-4" />
            <span>Kosongkan Data Contoh (Mulai dari Nol)</span>
          </div>
          <p className="text-xs text-amber-700/80 dark:text-amber-200/80 mt-1 leading-relaxed">
            Hapus semua daftar project contoh, sertifikasi/achievement dummy, timeline contoh, dan skills bawaan template dengan 1 klik, agar Anda siap mengisi portofolio dengan karya asli Anda.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleClearAll}
            className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-2 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Kosongkan Semua Data Dummy</span>
          </button>
        </div>
      </div>

      {/* Danger Zone: Reset Data */}
      <div className="p-6 bg-rose-50/50 dark:bg-rose-950/20 rounded-3xl border border-rose-200 dark:border-rose-900/40 space-y-3">
        <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-sm">
          <AlertTriangle className="w-4 h-4" />
          <span>Reset ke Template Asli</span>
        </div>
        <p className="text-xs text-rose-600/80 dark:text-rose-300/80">
          Mengembalikan semua projects, achievements, skills, dan milestone ke data template bawaan awal.
        </p>
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset ke Default Template</span>
        </button>
      </div>

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0D1C33] border border-[#DCE7F5] dark:border-[#1E3A66] rounded-3xl p-6 max-w-xl w-full space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Import Portfolio Data (JSON)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Tempelkan teks JSON backup data portofolio Anda di bawah ini:
            </p>
            <textarea
              rows={8}
              value={importText}
              onChange={e => setImportText(e.target.value)}
              placeholder='{"projects": [...], "skills": [...]}'
              className="w-full p-3 font-mono text-xs bg-slate-50 dark:bg-[#0A1628] border border-slate-200 dark:border-slate-700 rounded-xl"
            />
            {importStatus && (
              <p className="text-xs font-semibold text-[#1769E8] dark:text-blue-400">
                {importStatus}
              </p>
            )}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowImportModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleProcessImport}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#1769E8] hover:bg-[#0D3B8E]"
              >
                Terapkan Import
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
