

export default function GlobalSettings() {
  return (
    <div className="max-w-6xl mx-auto space-y-10 p-8 pb-12 w-full">
      {/* Section: App Configuration */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold font-manrope text-on-surface">App Configuration</h3>
            <p className="text-on-surface-variant text-sm mt-1">Manage global display settings and public-facing notices.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Global Notice Card */}
          <div className="lg:col-span-2 bg-surface-container-low rounded-xl p-6 shadow-sm border border-outline-variant/5">
            <label className="block text-[11px] font-bold uppercase tracking-widest text-on-surface-variant mb-3">Global App Notice</label>
            <textarea
              className="w-full bg-surface-container border-b-2 border-outline-variant focus:border-primary focus:ring-0 text-on-surface text-sm p-4 rounded-t-lg transition-all"
              placeholder="Enter the text for the global announcement banner visible to all students..."
              rows={4}
            ></textarea>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-on-surface-variant italic">Banner appears at the top of the mobile app home screen.</span>
              <button className="px-6 py-2 bg-gradient-to-r from-primary to-primary-container text-on-primary text-sm font-bold rounded-lg shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                Update Banner
              </button>
            </div>
          </div>
          {/* Status Toggle Card */}
          <div className="bg-surface-container-low rounded-xl p-6 shadow-sm border border-outline-variant/5 flex flex-col justify-between">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-on-surface-variant mb-6">Service Availability</label>
              <div className="flex items-center justify-between p-4 bg-surface-container rounded-lg">
                <div className="flex flex-col">
                  <span className="text-on-surface font-semibold text-sm">System Maintenance</span>
                  <span className="text-[10px] text-error font-medium">Currently Inactive</span>
                </div>
                <div className="relative inline-flex items-center cursor-pointer">
                  <input className="sr-only peer" type="checkbox" />
                  <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-outline-variant after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </div>
              </div>
            </div>
            <p className="text-[11px] text-on-surface-variant leading-relaxed mt-4">
              Toggling maintenance mode will restrict student access to exams while allowing admin operations to continue.
            </p>
          </div>
        </div>
      </section>

      {/* Section: Admin Management */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold font-manrope text-on-surface">Admin Management</h3>
            <p className="text-on-surface-variant text-sm mt-1">Control access levels and permissions for your editorial team.</p>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-surface-container-highest text-primary hover:bg-primary/10 border border-primary/20 text-sm font-bold rounded-lg transition-all">
            <span className="material-symbols-outlined text-lg">person_add</span>
            Invite Team Member
          </button>
        </div>
        {/* Admin Table */}
        <div className="bg-surface-container-low rounded-xl shadow-sm border border-outline-variant/5 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-outline-variant/10">
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-on-surface-variant">Name & Email</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-on-surface-variant">Access Level</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-on-surface-variant text-center">Question Bank</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-on-surface-variant text-center">Revenue</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-on-surface-variant text-center">Settings</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-on-surface-variant text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {/* User 1 */}
              <tr className="hover:bg-surface-container transition-colors">
                <td className="px-6 py-5 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 min-w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">SK</div>
                    <div>
                      <p className="text-sm font-bold text-on-surface">Sushant Karki</p>
                      <p className="text-xs text-on-surface-variant">sushant@loksewa.edu</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 whitespace-nowrap">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">Super Admin</span>
                </td>
                <td className="px-6 py-5 text-center whitespace-nowrap">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </td>
                <td className="px-6 py-5 text-center whitespace-nowrap">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </td>
                <td className="px-6 py-5 text-center whitespace-nowrap">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </td>
                <td className="px-6 py-5 text-right whitespace-nowrap">
                  <button className="p-2 text-on-surface-variant hover:text-on-surface transition-colors">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </td>
              </tr>
              {/* User 2 */}
              <tr className="hover:bg-surface-container transition-colors">
                <td className="px-6 py-5 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 min-w-9 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold text-xs">AP</div>
                    <div>
                      <p className="text-sm font-bold text-on-surface">Anjali Poudel</p>
                      <p className="text-xs text-on-surface-variant">anjali.p@loksewa.edu</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 whitespace-nowrap">
                  <span className="px-3 py-1 rounded-full bg-surface-variant text-on-surface-variant text-[10px] font-bold uppercase tracking-wider">Editor</span>
                </td>
                <td className="px-6 py-5 text-center whitespace-nowrap">
                  <div className="relative inline-flex items-center cursor-pointer scale-75">
                    <input defaultChecked className="sr-only peer" type="checkbox" />
                    <div className="w-11 h-6 bg-surface-variant rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </div>
                </td>
                <td className="px-6 py-5 text-center whitespace-nowrap">
                  <div className="relative inline-flex items-center cursor-pointer scale-75">
                    <input className="sr-only peer" type="checkbox" />
                    <div className="w-11 h-6 bg-surface-variant rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </div>
                </td>
                <td className="px-6 py-5 text-center whitespace-nowrap">
                  <div className="relative inline-flex items-center cursor-pointer scale-75">
                    <input className="sr-only peer" type="checkbox" />
                    <div className="w-11 h-6 bg-surface-variant rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </div>
                </td>
                <td className="px-6 py-5 text-right whitespace-nowrap">
                  <button className="p-2 text-on-surface-variant hover:text-on-surface transition-colors">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </td>
              </tr>
              {/* User 3 */}
              <tr className="hover:bg-surface-container transition-colors">
                <td className="px-6 py-5 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 min-w-9 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary font-bold text-xs">BT</div>
                    <div>
                      <p className="text-sm font-bold text-on-surface">Bishal Thapa</p>
                      <p className="text-xs text-on-surface-variant">bishal.t@loksewa.edu</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 whitespace-nowrap">
                  <span className="px-3 py-1 rounded-full bg-surface-variant text-on-surface-variant text-[10px] font-bold uppercase tracking-wider">Content Writer</span>
                </td>
                <td className="px-6 py-5 text-center whitespace-nowrap">
                  <div className="relative inline-flex items-center cursor-pointer scale-75">
                    <input defaultChecked className="sr-only peer" type="checkbox" />
                    <div className="w-11 h-6 bg-surface-variant rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </div>
                </td>
                <td className="px-6 py-5 text-center whitespace-nowrap">
                  <div className="relative inline-flex items-center cursor-pointer scale-75">
                    <input className="sr-only peer" type="checkbox" />
                    <div className="w-11 h-6 bg-surface-variant rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </div>
                </td>
                <td className="px-6 py-5 text-center whitespace-nowrap">
                  <div className="relative inline-flex items-center cursor-pointer scale-75">
                    <input className="sr-only peer" type="checkbox" />
                    <div className="w-11 h-6 bg-surface-variant rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </div>
                </td>
                <td className="px-6 py-5 text-right whitespace-nowrap">
                  <button className="p-2 text-on-surface-variant hover:text-on-surface transition-colors">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="px-6 py-4 bg-surface-container/30 border-t border-outline-variant/10 flex items-center justify-between">
            <span className="text-xs text-on-surface-variant font-medium">Showing 3 active administrators</span>
            <div className="flex items-center gap-2">
              <button className="p-1 rounded hover:bg-surface-container-highest transition-colors disabled:opacity-30" disabled>
                <span className="material-symbols-outlined text-sm">chevron_left</span>
              </button>
              <span className="text-xs font-bold text-on-surface">1</span>
              <button className="p-1 rounded hover:bg-surface-container-highest transition-colors">
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Save Feedback */}
      <div className="fixed bottom-8 right-8 flex items-center gap-3 bg-surface-container-highest border border-outline-variant/20 px-4 py-3 rounded-xl shadow-2xl backdrop-blur-md">
        <span className="material-symbols-outlined text-primary">cloud_done</span>
        <span className="text-sm font-medium text-on-surface">All changes autosaved</span>
      </div>
    </div>
  );
}
