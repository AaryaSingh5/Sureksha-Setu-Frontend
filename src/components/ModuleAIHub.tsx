import React, { useState } from 'react';
import {
  BrainCircuit,
  Flame,
  AlertTriangle,
  Activity,
  MapPin,
  TrendingUp,
  Cpu,
  Eye,
  ShieldAlert,
  ArrowRight,
  Filter,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { Language, AnomalyCluster, AILog } from '../types';
import { i18n } from '../data/i18n';

interface ModuleAIHubProps {
  language: Language;
  clusters: AnomalyCluster[];
  aiLogs: AILog[];
  onInvestigateCluster: (cluster: AnomalyCluster) => void;
  onNavigateToMap: () => void;
}

export const ModuleAIHub: React.FC<ModuleAIHubProps> = ({
  language,
  clusters,
  aiLogs,
  onInvestigateCluster,
  onNavigateToMap
}) => {
  const t = i18n[language];
  const [selectedClusterId, setSelectedClusterId] = useState<string>(clusters[0]?.id || '');
  const [activeTab, setActiveTab] = useState<'heatmaps' | 'clusters' | 'logs'>('heatmaps');

  const selectedCluster = clusters.find((c) => c.id === selectedClusterId) || clusters[0];

  return (
    <div className="space-y-6">
      
      {/* Top Banner Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* Stat 1 */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between shadow-sm">
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t.riskScore}</div>
            <div className="text-2xl font-black text-[#0B2447] mt-1">88 / 100</div>
            <div className="text-[11px] text-amber-700 font-bold mt-0.5">High Risk in Kullu Sector</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#FF9933]">
            <Flame className="w-6 h-6 text-[#FF9933] animate-pulse" />
          </div>
        </div>

        {/* Stat 2 */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between shadow-sm">
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Threat Clusters</div>
            <div className="text-2xl font-black text-red-600 mt-1">{clusters.length} Zones</div>
            <div className="text-[11px] text-slate-500 mt-0.5">3 Critical AI Flags</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
        </div>

        {/* Stat 3 */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between shadow-sm">
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t.confidenceLevel}</div>
            <div className="text-2xl font-black text-[#138808] mt-1">94.2%</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Model Anomaly-v4.2</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#138808]">
            <Cpu className="w-6 h-6 text-[#138808]" />
          </div>
        </div>

      </div>

      {/* Main Grid: Interactive Map Heatmap & Cluster Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: High-Risk Map Heatmap Visualization Mockup */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          
          <div className="flex items-center justify-between mb-4 border-b border-slate-200 pb-3">
            <div className="flex items-center space-x-2">
              <BrainCircuit className="w-5 h-5 text-[#FF9933]" />
              <h3 className="text-base font-bold text-slate-900">
                {t.highRiskHeatmap}
              </h3>
            </div>
            
            <button
              onClick={onNavigateToMap}
              className="text-xs font-extrabold text-[#0B2447] hover:underline flex items-center gap-1"
            >
              <span>{t.viewInMap}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#FF9933]" />
            </button>
          </div>

          {/* SIMULATED HIGH-RISK HEATMAP VECTOR CANVAS */}
          <div className="relative w-full h-80 bg-slate-100 rounded-xl border border-slate-200 overflow-hidden flex items-center justify-center">
            
            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-40"></div>

            {/* Radar Sweep Effect */}
            <div className="absolute inset-0 rounded-full border border-amber-500/20 animate-ping pointer-events-none"></div>

            {/* Heatmap Pulsing Rings for Clusters */}
            {clusters.map((cluster) => {
              const isSelected = cluster.id === selectedCluster.id;
              
              // Position mapping for mock map
              const leftPos = cluster.id === 'AC-101' ? '30%' : cluster.id === 'AC-102' ? '65%' : '48%';
              const topPos = cluster.id === 'AC-101' ? '25%' : cluster.id === 'AC-102' ? '55%' : '75%';

              return (
                <div
                  key={cluster.id}
                  onClick={() => setSelectedClusterId(cluster.id)}
                  style={{ left: leftPos, top: topPos }}
                  className="absolute cursor-pointer -translate-x-1/2 -translate-y-1/2 group"
                >
                  {/* Heat gradient aura */}
                  <div className={`w-24 h-24 rounded-full blur-xl animate-pulse transition-all ${
                    cluster.riskScore > 80 ? 'bg-red-500/30' : 'bg-amber-500/30'
                  }`}></div>

                  {/* Marker Pin */}
                  <div className={`relative w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-xs shadow-md transition-transform ${
                    isSelected
                      ? 'bg-red-600 border-white text-white scale-125 z-20'
                      : 'bg-[#0B2447] border-[#FF9933] text-white group-hover:scale-110'
                  }`}>
                    {cluster.riskScore}
                  </div>

                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-900 border border-slate-700 text-slate-100 text-[11px] px-2.5 py-1 rounded shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-30 pointer-events-none">
                    <div className="font-bold">{cluster.regionName}</div>
                    <div className="text-[10px] text-amber-400">Risk: {cluster.riskScore}/100 • {cluster.anomalyType}</div>
                  </div>
                </div>
              );
            })}

            {/* Legend & Controls */}
            <div className="absolute bottom-3 left-3 bg-white/95 border border-slate-200 rounded-lg p-2.5 text-[10px] space-y-1 shadow-md text-slate-800">
              <div className="font-extrabold text-[#0B2447]">HEATMAP INTENSITY</div>
              <div className="flex items-center gap-1 font-semibold">
                <span className="w-3 h-3 rounded bg-red-600"></span> 80-100 Critical Hazard
              </div>
              <div className="flex items-center gap-1 font-semibold">
                <span className="w-3 h-3 rounded bg-amber-500"></span> 60-79 Moderate Anomaly
              </div>
            </div>

          </div>

          {/* Selected Cluster Details Card below map */}
          {selectedCluster && (
            <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-600" />
                  <span>{selectedCluster.regionName}</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-red-100 text-red-800 border border-red-200 font-extrabold">
                  {selectedCluster.anomalyType}
                </span>
              </div>

              <p className="mt-2 text-slate-700 leading-relaxed font-medium">
                {language === 'hi' ? selectedCluster.descriptionHi : selectedCluster.descriptionEn}
              </p>

              <div className="mt-3 p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 font-medium">
                <strong>Recommended Action:</strong> {language === 'hi' ? selectedCluster.recommendedActionHi : selectedCluster.recommendedActionEn}
              </div>
            </div>
          )}

        </div>

        {/* Right Col: Incident Clusters List Cards */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-slate-200 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Flame className="w-5 h-5 text-red-600" />
                <span>{t.incidentClusters}</span>
              </h3>
              <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700 font-mono text-[10px] font-bold">
                {clusters.length} Active
              </span>
            </div>

            <div className="space-y-3">
              {clusters.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setSelectedClusterId(c.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition ${
                    selectedClusterId === c.id
                      ? 'bg-amber-50/80 border-[#FF9933] shadow-sm'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-extrabold text-slate-900">{c.regionName}</span>
                    <span className="font-mono font-bold text-red-700 bg-red-100 px-1.5 py-0.5 rounded border border-red-200">
                      {c.riskScore}% Risk
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-600 line-clamp-2 font-medium">
                    {language === 'hi' ? c.descriptionHi : c.descriptionEn}
                  </div>

                  <div className="mt-2.5 flex items-center justify-between text-[10px] text-slate-500">
                    <span>Density: {c.touristDensity} travelers</span>
                    <span className="text-[#138808] font-extrabold">Confidence: {c.confidenceScore}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-center">
            <span className="text-[11px] text-slate-500 font-medium">Continuous AI Anomaly Model: Active Stream</span>
          </div>
        </div>

      </div>

      {/* AI Contextual Stream Logs */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-[#138808] animate-pulse" />
            <h3 className="text-base font-bold text-slate-900">
              {t.contextualAnalysis}
            </h3>
          </div>
          <span className="text-xs font-mono text-[#138808] flex items-center gap-1 font-bold">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Live Telemetry
          </span>
        </div>

        <div className="space-y-2 font-mono text-xs">
          {aiLogs.map((log) => (
            <div
              key={log.id}
              className={`p-3 rounded-lg border flex items-start space-x-3 ${
                log.severity === 'critical'
                  ? 'bg-red-50 border-red-200 text-red-950'
                  : log.severity === 'warning'
                  ? 'bg-amber-50 border-amber-200 text-amber-950'
                  : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            >
              <span className="text-slate-500 flex-shrink-0 text-[10px] pt-0.5">[{log.timestamp}]</span>
              <div className="flex-1">
                <div className="font-bold">{language === 'hi' ? log.messageHi : log.messageEn}</div>
                <div className="text-[10px] opacity-80 mt-0.5">Region: {log.region} • Confidence Index: {log.modelConfidence}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
