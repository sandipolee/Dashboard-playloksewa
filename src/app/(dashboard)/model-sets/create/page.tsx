"use client";

import { useRouter } from 'next/navigation';

export default function CreateModelSet() {
  const router = useRouter();

  return (
    <div className="flex-1 max-w-[1040px] w-full mx-auto px-8 py-10 flex flex-col gap-10 pb-20">
      {/* Minimal Header for Focused View */}
      <header className="flex items-center justify-between py-6 bg-background sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.push('/model-sets')}
            aria-label="Go back" 
            className="flex items-center justify-center size-10 rounded-full hover:bg-surface-variant transition-colors text-on-surface"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="font-headline text-2xl font-bold tracking-tight text-on-surface">Create Model Set</h1>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => router.push('/model-sets')}
            className="px-5 py-2.5 rounded-lg font-label text-sm font-semibold tracking-wide bg-transparent text-primary hover:bg-surface-container-high transition-colors"
          >
            Cancel
          </button>
          <button className="px-5 py-2.5 rounded-lg font-label text-sm font-semibold tracking-wide bg-surface-container-highest text-on-surface hover:bg-surface-variant transition-colors ghost-border">
            Save as Draft
          </button>
          <button className="px-6 py-2.5 rounded-lg font-label text-sm font-semibold tracking-wide btn-primary-gradient transition-opacity hover:opacity-90">
            Publish Set
          </button>
        </div>
      </header>

      {/* Section A: Metadata Form */}
      <section className="flex flex-col gap-6 mt-4">
        <div className="flex flex-col gap-1">
          <h2 className="font-headline text-xl font-bold text-on-surface">Metadata Information</h2>
          <p className="text-on-surface-variant text-sm font-body">Define the core parameters of your exam set.</p>
        </div>
        <div className="bg-surface-container-lowest p-8 rounded-xl ghost-border flex flex-col gap-8 shadow-[0_8px_24px_rgba(13,28,46,0.06)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Set Title */}
            <label className="flex flex-col gap-2">
              <span className="font-label text-xs font-semibold tracking-widest uppercase text-on-surface-variant">Set Title</span>
              <input className="input-editorial w-full px-4 py-3 text-on-surface placeholder:text-outline" placeholder="e.g. Section Officer Comprehensive Mock Test 1" type="text" />
            </label>
            {/* Category Dropdown */}
            <label className="flex flex-col gap-2 relative">
              <span className="font-label text-xs font-semibold tracking-widest uppercase text-on-surface-variant">Category</span>
              <select className="input-editorial w-full px-4 py-3 text-on-surface appearance-none bg-transparent">
                <option className="bg-surface-container-highest" value="">Select exam category...</option>
                <option className="bg-surface-container-highest" value="section_officer">Section Officer</option>
                <option className="bg-surface-container-highest" value="nayab_subba">Nayab Subba</option>
                <option className="bg-surface-container-highest" value="kharidar">Kharidar</option>
                <option className="bg-surface-container-highest" value="banking">Banking Services</option>
              </select>
              <span className="material-symbols-outlined absolute right-4 bottom-3 text-outline pointer-events-none">expand_more</span>
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Duration */}
            <label className="flex flex-col gap-2">
              <span className="font-label text-xs font-semibold tracking-widest uppercase text-on-surface-variant">Duration (Min)</span>
              <input className="input-editorial w-full px-4 py-3 text-on-surface placeholder:text-outline" placeholder="90" type="number" />
            </label>
            {/* Positive Mark */}
            <label className="flex flex-col gap-2">
              <span className="font-label text-xs font-semibold tracking-widest uppercase text-on-surface-variant">Positive Mark</span>
              <input className="input-editorial w-full px-4 py-3 text-on-surface placeholder:text-outline" placeholder="1.0" step="0.5" type="number" />
            </label>
            {/* Negative Mark */}
            <label className="flex flex-col gap-2">
              <span className="font-label text-xs font-semibold tracking-widest uppercase text-on-surface-variant">Negative Mark</span>
              <input className="input-editorial w-full px-4 py-3 text-on-surface placeholder:text-outline" placeholder="0.2" step="0.1" type="number" />
            </label>
          </div>
          {/* Premium Access Toggle */}
          <div className="flex items-center justify-between pt-4 border-t border-outline-variant/15">
            <div className="flex flex-col gap-1">
              <span className="font-label text-sm font-semibold text-on-surface">Premium Access</span>
              <span className="text-xs text-on-surface-variant font-body">Restrict this model set to subscribed users only.</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input className="sr-only peer" type="checkbox" value="" />
              <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-on-surface after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
            </label>
          </div>
        </div>
      </section>

      {/* Section B: Question Uploader */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="font-headline text-xl font-bold text-on-surface">Question Bank</h2>
          <p className="text-on-surface-variant text-sm font-body">Upload your questions using the standard CSV/Excel template.</p>
        </div>
        {/* Drag and Drop Zone */}
        <div className="border-2 border-dashed border-outline-variant rounded-xl bg-surface-container-low hover:bg-surface-container-highest transition-colors flex flex-col items-center justify-center py-16 px-6 text-center cursor-pointer group">
          <div className="size-16 rounded-full bg-surface-variant flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-primary text-3xl">cloud_upload</span>
          </div>
          <h3 className="font-headline text-lg font-bold text-on-surface mb-2">Drag & Drop file here</h3>
          <p className="text-sm text-on-surface-variant mb-6 font-body">Supported formats: .csv, .xlsx (Max size: 10MB)</p>
          <button className="px-5 py-2.5 rounded-lg font-label text-sm font-semibold tracking-wide bg-surface-container-highest text-on-surface border border-outline-variant hover:bg-surface-variant transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">folder_open</span>
            Browse Files
          </button>
        </div>
        {/* Download Template Link */}
        <div className="flex justify-end">
          <a className="flex items-center gap-1.5 text-primary hover:text-primary-container transition-colors text-sm font-label font-semibold" href="#">
            <span className="material-symbols-outlined text-[18px]">download</span>
            Download CSV Template
          </a>
        </div>
        {/* Upload Preview */}
        <div className="mt-4 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="font-headline text-base font-bold text-on-surface">Upload Preview (First 3 Questions)</h3>
            <span className="px-3 py-1 rounded-full bg-surface-container-highest text-xs font-label font-medium text-on-surface-variant">Parsed successfully</span>
          </div>
          <div className="bg-surface-container-lowest rounded-xl ghost-border overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low border-b border-outline-variant/15">
                  <th className="p-4 font-label text-xs font-semibold tracking-widest uppercase text-on-surface-variant w-16">#</th>
                  <th className="p-4 font-label text-xs font-semibold tracking-widest uppercase text-on-surface-variant">Question Text</th>
                  <th className="p-4 font-label text-xs font-semibold tracking-widest uppercase text-on-surface-variant w-48">Options</th>
                  <th className="p-4 font-label text-xs font-semibold tracking-widest uppercase text-on-surface-variant w-32">Correct Ans</th>
                </tr>
              </thead>
              <tbody className="font-body text-sm divide-y divide-outline-variant/10">
                <tr className="hover:bg-surface-container-low transition-colors">
                  <td className="p-4 text-on-surface-variant">1</td>
                  <td className="p-4 text-on-surface">Which of the following fundamental rights is guaranteed by Article 16 of the Constitution of Nepal?</td>
                  <td className="p-4 text-on-surface-variant text-xs">A) Right to Equality<br />B) Right with regard to Employment<br />C) Right to Live with Dignity<br />D) Right to Justice</td>
                  <td className="p-4 font-medium text-primary">C</td>
                </tr>
                <tr className="hover:bg-surface-container-low transition-colors">
                  <td className="p-4 text-on-surface-variant">2</td>
                  <td className="p-4 text-on-surface">In the context of the history of Nepal, who was the first elected Prime Minister?</td>
                  <td className="p-4 text-on-surface-variant text-xs">A) B.P. Koirala<br />B) Matrika Prasad Koirala<br />C) Tanka Prasad Acharya<br />D) Subarna Shamsher</td>
                  <td className="p-4 font-medium text-primary">A</td>
                </tr>
                <tr className="hover:bg-surface-container-low transition-colors">
                  <td className="p-4 text-on-surface-variant">3</td>
                  <td className="p-4 text-on-surface">What is the main objective of monetary policy formulated by Nepal Rastra Bank?</td>
                  <td className="p-4 text-on-surface-variant text-xs">A) Price Stability<br />B) Fiscal Discipline<br />C) Revenue Generation<br />D) Infrastructure Dev</td>
                  <td className="p-4 font-medium text-primary">A</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
