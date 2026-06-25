import React, { useState } from "react";
import { Lead } from "../types";
import { 
  Users, 
  MousePointerClick, 
  Mail, 
  Calendar, 
  MessageCircle, 
  Smartphone, 
  Monitor, 
  Search, 
  Globe, 
  ArrowUpRight, 
  Trash2,
  CheckCircle,
  Archive,
  RefreshCw,
  Sparkles,
  FileSpreadsheet
} from "lucide-react";

interface AnalyticsDashboardProps {
  leads: Lead[];
  onUpdateLeadStatus: (id: string, status: Lead["status"]) => void;
  onDeleteLead: (id: string) => void;
  onClearAllLeads: () => void;
  trackedActions: Record<string, number>;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ 
  leads, 
  onUpdateLeadStatus, 
  onDeleteLead, 
  onClearAllLeads,
  trackedActions 
}) => {
  const [filterType, setFilterType] = useState<Lead["type"] | "all">("all");
  const [filterStatus, setFilterStatus] = useState<Lead["status"] | "all">("all");

  // Mock visitor data (stable yet realistic)
  const baseVisitors = 1420;
  const directVisits = 320;
  const searchVisits = 640;
  const socialVisits = 460;

  const mobilePercentage = 73; // Highly responsive target as indicated by barbershop/real-estate metrics
  const desktopPercentage = 27;

  // Tracked actions from user sessions
  const whatsAppClicks = trackedActions["WhatsApp Widget Opened"] || 0;
  const whatsAppSends = trackedActions["WhatsApp Message Redirected"] || 0;
  const calendarClicks = trackedActions["Calendar Widget Clicked"] || 0;

  // Aggregate stats from real leads list
  const totalLeadsCount = leads.length;
  const contactFormCount = leads.filter(l => l.type === "contact").length;
  const newsletterCount = leads.filter(l => l.type === "newsletter").length;
  const scheduleCount = leads.filter(l => l.type === "schedule").length;

  const activeNewLeads = leads.filter(l => l.status === "new").length;

  // Conversion funnel calculations
  const totalSessions = baseVisitors + whatsAppClicks + calendarClicks * 2;
  const engagedSessions = Math.round(totalSessions * 0.62) + totalLeadsCount * 5;
  const clickedCtas = Math.round(totalSessions * 0.18) + whatsAppClicks + calendarClicks;
  const totalConversions = totalLeadsCount + whatsAppSends;

  const conversionRate = totalSessions > 0 ? ((totalConversions / totalSessions) * 100).toFixed(1) : "4.8";

  // Filter leads
  const filteredLeads = leads.filter(lead => {
    const matchesType = filterType === "all" ? true : lead.type === filterType;
    const matchesStatus = filterStatus === "all" ? true : lead.status === filterStatus;
    return matchesType && matchesStatus;
  });

  return (
    <div className="space-y-8 text-white">
      
      {/* Real-time stats header strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Total Unique Visitors</span>
            <h4 className="text-2xl font-black text-white mt-1">{totalSessions}</h4>
            <p className="text-[10px] text-emerald-400 font-medium flex items-center gap-1 mt-1">
              <ArrowUpRight className="w-3 h-3" /> +14.2% {filterType === "all" ? "this week" : ""}
            </p>
          </div>
          <div className="w-10 h-10 bg-cyan-950/50 border border-cyan-900 rounded-lg flex items-center justify-center text-cyan-400">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Total Actions Tracked</span>
            <h4 className="text-2xl font-black text-white mt-1">
              {whatsAppClicks + whatsAppSends + calendarClicks + totalLeadsCount}
            </h4>
            <p className="text-[10px] text-cyan-400 font-medium flex items-center gap-1 mt-1">
              Live Click Activity
            </p>
          </div>
          <div className="w-10 h-10 bg-indigo-950/50 border border-indigo-900 rounded-lg flex items-center justify-center text-indigo-400">
            <MousePointerClick className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Active Leads (CRM)</span>
            <h4 className="text-2xl font-black text-white mt-1">{totalLeadsCount}</h4>
            <p className="text-[10px] text-amber-400 font-semibold flex items-center gap-1 mt-1">
              ● {activeNewLeads} Unread
            </p>
          </div>
          <div className="w-10 h-10 bg-emerald-950/50 border border-emerald-900 rounded-lg flex items-center justify-center text-emerald-400">
            <Mail className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Conversion Ratio</span>
            <h4 className="text-2xl font-black text-white mt-1">{conversionRate}%</h4>
            <p className="text-[10px] text-emerald-400 font-medium flex items-center gap-1 mt-1">
              Industry Standard: 2.1%
            </p>
          </div>
          <div className="w-10 h-10 bg-emerald-950/50 border border-emerald-900 rounded-lg flex items-center justify-center text-emerald-400">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* Visual Analytics Grid: Funnels and Traffic */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Conversion Funnel Chart */}
        <div className="lg:col-span-7 p-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold tracking-wider uppercase text-slate-300 mb-1">Conversion Funnel Visualizer</h4>
            <p className="text-xs text-slate-400 mb-6">Tracing active visitor interest from raw landing page visits down to contact submissions</p>
          </div>

          <div className="space-y-4">
            {/* Stage 1 */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-slate-300">1. Unique Sessions (Total Reach)</span>
                <span className="font-bold">{totalSessions} (100%)</span>
              </div>
              <div className="h-7 bg-slate-950 rounded-lg overflow-hidden border border-slate-800 flex items-center">
                <div className="h-full bg-cyan-500 rounded-l flex items-center px-3" style={{ width: "100%" }}>
                  <span className="text-[10px] text-slate-950 font-black">REACH</span>
                </div>
              </div>
            </div>

            {/* Stage 2 */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-slate-300">2. Portfolio & Service Engagement</span>
                <span className="font-bold">{engagedSessions} ({totalSessions > 0 ? Math.round((engagedSessions / totalSessions) * 100) : 62}%)</span>
              </div>
              <div className="h-7 bg-slate-950 rounded-lg overflow-hidden border border-slate-800 flex items-center">
                <div className="h-full bg-blue-500 rounded-l flex items-center px-3" style={{ width: `${totalSessions > 0 ? (engagedSessions / totalSessions) * 100 : 62}%` }}>
                  <span className="text-[10px] text-slate-950 font-black">INTEREST</span>
                </div>
              </div>
            </div>

            {/* Stage 3 */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-slate-300">3. Widget Clicks (WhatsApp/Calendly)</span>
                <span className="font-bold">{clickedCtas} ({totalSessions > 0 ? Math.round((clickedCtas / totalSessions) * 100) : 18}%)</span>
              </div>
              <div className="h-7 bg-slate-950 rounded-lg overflow-hidden border border-slate-800 flex items-center">
                <div className="h-full bg-indigo-500 rounded-l flex items-center px-3" style={{ width: `${totalSessions > 0 ? (clickedCtas / totalSessions) * 100 : 18}%` }}>
                  <span className="text-[10px] text-white font-black">INTENT</span>
                </div>
              </div>
            </div>

            {/* Stage 4 */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-slate-300">4. Form & Booking Conversions</span>
                <span className="font-bold text-emerald-400">{totalConversions} ({conversionRate}%)</span>
              </div>
              <div className="h-7 bg-slate-950 rounded-lg overflow-hidden border border-slate-800 flex items-center">
                <div className="h-full bg-emerald-500 rounded-l flex items-center px-3" style={{ width: `${totalSessions > 0 ? Math.max((totalConversions / totalSessions) * 100, 4) : 4.8}%` }}>
                  <span className="text-[10px] text-slate-950 font-black">SALES LEAD</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Traffic Channels and Devices */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Channel distribution */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
            <h4 className="text-sm font-bold tracking-wider uppercase text-slate-300 mb-4">Traffic Channel Split</h4>
            <div className="space-y-3.5">
              
              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span className="flex items-center gap-1.5 font-medium"><Search className="w-3.5 h-3.5 text-cyan-400" /> Google Search (SEO)</span>
                  <span className="font-bold text-white">{searchVisits} (45%)</span>
                </div>
                <div className="h-2 bg-slate-950 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 rounded-full" style={{ width: "45%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span className="flex items-center gap-1.5 font-medium"><Globe className="w-3.5 h-3.5 text-indigo-400" /> Direct / Referral</span>
                  <span className="font-bold text-white">{directVisits} (22%)</span>
                </div>
                <div className="h-2 bg-slate-950 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: "22%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span className="flex items-center gap-1.5 font-medium"><Users className="w-3.5 h-3.5 text-emerald-400" /> Social Networks</span>
                  <span className="font-bold text-white">{socialVisits} (33%)</span>
                </div>
                <div className="h-2 bg-slate-950 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: "33%" }} />
                </div>
              </div>

            </div>
          </div>

          {/* Device Split */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold tracking-wider uppercase text-slate-300 mb-1">Mobile vs Desktop</h4>
              <p className="text-[11px] text-slate-400 max-w-[180px] leading-relaxed">73% of barbershop & local services clients visit on smartphone.</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <Smartphone className="w-8 h-8 text-cyan-400 animate-pulse" />
                <span className="text-xs font-bold mt-1 text-white">{mobilePercentage}%</span>
                <span className="text-[9px] text-slate-400 uppercase tracking-widest">Mobile</span>
              </div>
              <div className="h-8 w-[1px] bg-slate-800" />
              <div className="flex flex-col items-center">
                <Monitor className="w-8 h-8 text-slate-500" />
                <span className="text-xs font-semibold mt-1 text-slate-300">{desktopPercentage}%</span>
                <span className="text-[9px] text-slate-500 uppercase tracking-widest">Desktop</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Leads CRM Table Manager */}
      <div id="leads-crm-manager" className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-6">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
              Leads & Contact Inquiries Manager
            </h4>
            <p className="text-xs text-slate-400">Review schedule consultation requests, strategy inquiries, and newsletter logs captured in real-time</p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto shrink-0 overflow-x-auto pb-1 sm:pb-0">
            {/* Type selection */}
            <select
              id="crm-type-filter"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            >
              <option value="all">All Types</option>
              <option value="contact">Contact Forms</option>
              <option value="newsletter">Newsletters</option>
              <option value="schedule">Schedules</option>
            </select>

            {/* Status selection */}
            <select
              id="crm-status-filter"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            >
              <option value="all">All Status</option>
              <option value="new">New / Unread</option>
              <option value="contacted">Contacted</option>
              <option value="archived">Archived</option>
            </select>

            {/* Clear Leads */}
            {leads.length > 0 && (
              <button
                id="crm-clear-all"
                onClick={onClearAllLeads}
                className="p-1.5 text-slate-500 hover:text-red-400 bg-slate-950/40 border border-slate-800/80 rounded-lg transition-colors flex items-center gap-1 text-[10px] font-bold"
                title="Clear Database Logs"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear
              </button>
            )}
          </div>
        </div>

        {/* CRM Leads List container */}
        <div className="overflow-x-auto bg-slate-950 rounded-xl border border-slate-800">
          {filteredLeads.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              <Mail className="w-8 h-8 mx-auto text-slate-700 mb-2" />
              <p className="text-sm font-semibold">No leads found in database.</p>
              <p className="text-xs text-slate-600 mt-1">Submit the footer contact form or appointment scheduler to test real-time logging.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px] font-bold">
                  <th className="p-4">Contact Details</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Inquiry / Message Notes</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} id={`crm-lead-row-${lead.id}`} className="hover:bg-slate-900/40 transition-colors">
                    
                    <td className="p-4">
                      <div className="font-bold text-white text-sm">{lead.name}</div>
                      <div className="text-slate-400 font-semibold">{lead.email}</div>
                      {lead.phone && <div className="text-[10px] text-slate-500 mt-0.5">{lead.phone}</div>}
                      <div className="text-[9px] text-slate-600 mt-1">{lead.date}</div>
                    </td>

                    <td className="p-4">
                      {lead.type === "contact" && (
                        <span className="px-2.5 py-1 text-[9px] font-bold text-cyan-400 bg-cyan-950 border border-cyan-900 rounded-full uppercase">
                          Contact
                        </span>
                      )}
                      {lead.type === "newsletter" && (
                        <span className="px-2.5 py-1 text-[9px] font-bold text-indigo-400 bg-indigo-950 border border-indigo-900 rounded-full uppercase">
                          Newsletter
                        </span>
                      )}
                      {lead.type === "schedule" && (
                        <span className="px-2.5 py-1 text-[9px] font-bold text-emerald-400 bg-emerald-950 border border-emerald-900 rounded-full uppercase flex items-center gap-1 w-max">
                          <Calendar className="w-3 h-3" /> Calendar
                        </span>
                      )}
                    </td>

                    <td className="p-4 max-w-sm">
                      <p className="text-slate-200 font-medium leading-relaxed break-words">{lead.message}</p>
                      {lead.extraDetails && (
                        <div className="mt-1.5 p-1.5 bg-slate-900 rounded border border-slate-800/60 text-[10px] text-cyan-400 font-mono">
                          {lead.extraDetails}
                        </div>
                      )}
                    </td>

                    <td className="p-4">
                      {lead.status === "new" && (
                        <span className="text-amber-400 font-bold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-ping" />
                          New
                        </span>
                      )}
                      {lead.status === "contacted" && (
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5" /> Verified
                        </span>
                      )}
                      {lead.status === "archived" && (
                        <span className="text-slate-500 font-medium flex items-center gap-1">
                          <Archive className="w-3.5 h-3.5" /> Archived
                        </span>
                      )}
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        
                        {lead.status === "new" && (
                          <button
                            id={`crm-lead-action-contacted-${lead.id}`}
                            onClick={() => onUpdateLeadStatus(lead.id, "contacted")}
                            className="p-1 text-emerald-400 hover:bg-emerald-950 border border-emerald-900 rounded hover:text-white transition-colors text-[10px]"
                            title="Mark Contacted"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}

                        {lead.status !== "archived" && (
                          <button
                            id={`crm-lead-action-archive-${lead.id}`}
                            onClick={() => onUpdateLeadStatus(lead.id, "archived")}
                            className="p-1 text-slate-400 hover:bg-slate-800 rounded transition-colors text-[10px]"
                            title="Archive"
                          >
                            <Archive className="w-4 h-4" />
                          </button>
                        )}

                        {lead.status === "archived" && (
                          <button
                            id={`crm-lead-action-restore-${lead.id}`}
                            onClick={() => onUpdateLeadStatus(lead.id, "new")}
                            className="p-1 text-slate-400 hover:bg-slate-800 rounded transition-colors text-[10px]"
                            title="Restore"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </button>
                        )}

                        <button
                          id={`crm-lead-action-delete-${lead.id}`}
                          onClick={() => onDeleteLead(lead.id)}
                          className="p-1 text-slate-500 hover:bg-red-950 border border-transparent hover:border-red-900 rounded hover:text-red-400 transition-colors text-[10px]"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>

    </div>
  );
};
