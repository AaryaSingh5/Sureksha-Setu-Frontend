import React, { useState, useEffect } from 'react';
import {
  Language,
  UserRole,
  ActiveModule,
  TouristProfile,
  SOSIncident,
  PatrollingUnit,
  PoliceStation,
  AnomalyCluster,
  BroadcastAlert,
  AuditLog,
  AILog
} from './types';
import {
  INITIAL_TOURISTS,
  INITIAL_INCIDENTS,
  INITIAL_PATROL_UNITS,
  POLICE_STATIONS,
  ANOMALY_CLUSTERS,
  INITIAL_BROADCASTS,
  INITIAL_AUDIT_LOGS,
  INITIAL_AI_LOGS
} from './data/mockData';
import { Header } from './components/Header';
import { Gateway } from './components/Gateway';
import { TouristPortal } from './components/TouristPortal';
import { ModuleAIHub } from './components/ModuleAIHub';
import { ModuleTouristTracking } from './components/ModuleTouristTracking';
import { ModuleSOSMap } from './components/ModuleSOSMap';
import { ModuleBroadcast } from './components/ModuleBroadcast';
import { ModuleAnalyticsAudit } from './components/ModuleAnalyticsAudit';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRole>('gateway');
  const [activeModule, setActiveModule] = useState<ActiveModule>('ai_hub');

  // Master Data State
  const [tourists, setTourists] = useState<TouristProfile[]>(INITIAL_TOURISTS);
  const [incidents, setIncidents] = useState<SOSIncident[]>(INITIAL_INCIDENTS);
  const [units, setUnits] = useState<PatrollingUnit[]>(INITIAL_PATROL_UNITS);
  const [stations] = useState<PoliceStation[]>(POLICE_STATIONS);
  const [clusters] = useState<AnomalyCluster[]>(ANOMALY_CLUSTERS);
  const [broadcasts, setBroadcasts] = useState<BroadcastAlert[]>(INITIAL_BROADCASTS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  const [aiLogs] = useState<AILog[]>(INITIAL_AI_LOGS);

  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [prefilledTouristId, setPrefilledTouristId] = useState('');

  // Register service worker for offline PWA compliance
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch((err) => {
          console.warn('Service worker registration failed:', err);
        });
      });
    }
  }, []);

  // Audit Logging helper
  const handleLogAudit = (
    actionType: 'TOURIST_LOOKUP' | 'DISPATCH_UNIT' | 'BROADCAST_SENT' | 'TICKET_STATUS_CHANGE' | 'AUTHORITY_LOGIN',
    targetId: string,
    reason: string,
    details: string
  ) => {
    const newLog: AuditLog = {
      id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      officerName: 'Rajesh Kumar, IPS',
      officerBadge: 'IPS-7742',
      actionType,
      targetId,
      reason,
      details,
      ipAddress: '10.142.0.88 (NIC Secure Gateway)'
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // Authority MFA Authenticate
  const handleAuthenticateAuthority = (badgeId: string, otp: string) => {
    // Accepts demo credentials or badge input
    setUserRole('authority');
    setActiveModule('ai_hub');
    handleLogAudit(
      'AUTHORITY_LOGIN',
      `Officer ${badgeId}`,
      'MFA Verification',
      'Successful 2FA login to National Command Center'
    );
    return true;
  };

  // Global search trigger
  const handleExecuteGlobalSearch = () => {
    if (!globalSearchQuery.trim()) return;
    setPrefilledTouristId(globalSearchQuery.trim());
    setActiveModule('tourist_tracking');
  };

  // Trigger SOS from Tourist Portal
  const handleTouristTriggerSos = (touristName: string, locationStr: string) => {
    const newIncident: SOSIncident = {
      id: `SOS-${Math.floor(9000 + Math.random() * 999)}`,
      touristId: 'TR-88219',
      touristName,
      touristPhone: '+34 612 884 902',
      location: {
        lat: 32.2432,
        lng: 77.1892,
        address: locationStr
      },
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      status: 'New',
      severity: 'Critical',
      hazardType: '1-Tap Emergency Panic Button Press',
      notes: 'Direct panic beacon press from tourist mobile safety portal.'
    };

    setIncidents((prev) => [newIncident, ...prev]);
    
    // Update tourist safety status
    setTourists((prev) =>
      prev.map((t) =>
        t.id === 'TR-88219' ? { ...t, safetyStatus: 'SOS Active' } : t
      )
    );

    handleLogAudit(
      'TICKET_STATUS_CHANGE',
      newIncident.id,
      'Active SOS Response',
      `New panic signal received from ${touristName} at ${locationStr}`
    );
  };

  // Dispatch Responder Unit
  const handleDispatchUnit = (incidentId: string, unitId: string) => {
    const targetUnit = units.find((u) => u.id === unitId);
    const targetIncident = incidents.find((i) => i.id === incidentId);

    if (!targetIncident) return;

    // Update incident status
    setIncidents((prev) =>
      prev.map((i) =>
        i.id === incidentId
          ? { ...i, status: 'Units Dispatched', unitAssigned: targetUnit?.unitName || unitId }
          : i
      )
    );

    // Update unit status
    if (targetUnit) {
      setUnits((prev) =>
        prev.map((u) =>
          u.id === unitId ? { ...u, status: 'Dispatched', assignedIncidentId: incidentId } : u
        )
      );
    }

    handleLogAudit(
      'DISPATCH_UNIT',
      unitId,
      'Active SOS Response',
      `Dispatched unit ${targetUnit?.unitName || unitId} to SOS Incident ${incidentId}`
    );
  };

  // Resolve Incident
  const handleResolveIncident = (incidentId: string) => {
    const targetIncident = incidents.find((i) => i.id === incidentId);

    setIncidents((prev) =>
      prev.map((i) => (i.id === incidentId ? { ...i, status: 'Resolved' } : i))
    );

    if (targetIncident) {
      setTourists((prev) =>
        prev.map((t) =>
          t.id === targetIncident.touristId ? { ...t, safetyStatus: 'Safe' } : t
        )
      );
    }

    handleLogAudit(
      'TICKET_STATUS_CHANGE',
      incidentId,
      'Incident Resolution',
      `Marked SOS Incident ${incidentId} as Resolved. Tourist confirmed safe.`
    );
  };

  // Send Broadcast Alert
  const handleSendBroadcast = (
    newAlert: Omit<BroadcastAlert, 'id' | 'timestamp' | 'deliveredCount' | 'status'>
  ) => {
    const createdAlert: BroadcastAlert = {
      ...newAlert,
      id: `BC-${Math.floor(500 + Math.random() * 500)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      deliveredCount: Math.round(newAlert.recipientCount * 0.98),
      status: 'Completed'
    };

    setBroadcasts((prev) => [createdAlert, ...prev]);

    handleLogAudit(
      'BROADCAST_SENT',
      `Geofence ${newAlert.region}`,
      'Emergency Hazard Alert',
      `Pushed ${newAlert.severity} alert to ~${newAlert.recipientCount} active tourist devices.`
    );
  };

  // Add mock SOS trigger for testing
  const handleAddMockSos = () => {
    const randomTourist = tourists[Math.floor(Math.random() * tourists.length)];
    const newInc: SOSIncident = {
      id: `SOS-${Math.floor(9100 + Math.random() * 899)}`,
      touristId: randomTourist.id,
      touristName: randomTourist.name,
      touristPhone: randomTourist.phone,
      location: randomTourist.currentLocation,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      status: 'New',
      severity: 'Critical',
      hazardType: 'Simulated High Altitude Signal Anomaly',
      notes: 'Continuous panic signal generated via test control console.'
    };

    setIncidents((prev) => [newInc, ...prev]);
    setTourists((prev) =>
      prev.map((t) => (t.id === randomTourist.id ? { ...t, safetyStatus: 'SOS Active' } : t))
    );

    handleLogAudit(
      'TICKET_STATUS_CHANGE',
      newInc.id,
      'Active SOS Response',
      `Simulated SOS incident created for ${randomTourist.name}`
    );
  };

  const activeSosCount = incidents.filter((i) => i.status !== 'Resolved').length;

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-[#F4F6F9] text-slate-900'} flex flex-col font-sans transition-colors duration-200`}>
      
      {/* Command Header */}
      <Header
        language={language}
        onLanguageChange={setLanguage}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        userRole={userRole}
        onLogout={() => setUserRole('gateway')}
        activeModule={activeModule}
        onSelectModule={setActiveModule}
        globalSearchQuery={globalSearchQuery}
        onGlobalSearchChange={setGlobalSearchQuery}
        onExecuteGlobalSearch={handleExecuteGlobalSearch}
        activeSosCount={activeSosCount}
      />

      {/* Main Content Area */}
      {userRole === 'gateway' ? (
        <Gateway
          language={language}
          onSelectRole={(role) => setUserRole(role)}
          onAuthenticateAuthority={handleAuthenticateAuthority}
        />
      ) : userRole === 'tourist' ? (
        <TouristPortal
          language={language}
          onLanguageChange={(lang) => setLanguage(lang)}
          onTriggerSos={handleTouristTriggerSos}
          onReturnToGateway={() => setUserRole('gateway')}
          onRegisterTourist={(newTourist) => setTourists((prev) => [newTourist, ...prev.filter(t => t.id !== newTourist.id)])}
          existingTourists={tourists}
        />
      ) : (
        <div className="flex-1 flex flex-col max-w-[1700px] w-full mx-auto">
          
          {/* Module Screen Content */}
          <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
            {activeModule === 'ai_hub' && (
              <ModuleAIHub
                language={language}
                clusters={clusters}
                aiLogs={aiLogs}
                onInvestigateCluster={(cluster) => {
                  setPrefilledTouristId('TR-88219');
                  setActiveModule('tourist_tracking');
                }}
                onNavigateToMap={() => setActiveModule('sos_map')}
              />
            )}

            {activeModule === 'tourist_tracking' && (
              <ModuleTouristTracking
                language={language}
                tourists={tourists}
                onLogAudit={handleLogAudit}
                onDispatchToTourist={(tourist) => {
                  setActiveModule('sos_map');
                }}
                onSendSmsToTourist={(tourist) => {
                  setActiveModule('broadcast');
                }}
                onMarkSafe={(touristId) => {
                  setTourists((prev) =>
                    prev.map((t) => (t.id === touristId ? { ...t, safetyStatus: 'Safe' } : t))
                  );
                }}
                prefilledTouristId={prefilledTouristId}
              />
            )}

            {activeModule === 'sos_map' && (
              <ModuleSOSMap
                language={language}
                incidents={incidents}
                units={units}
                stations={stations}
                onDispatchUnit={handleDispatchUnit}
                onResolveIncident={handleResolveIncident}
                onAddMockSos={handleAddMockSos}
              />
            )}

            {activeModule === 'broadcast' && (
              <ModuleBroadcast
                language={language}
                broadcasts={broadcasts}
                onSendBroadcast={handleSendBroadcast}
              />
            )}

            {activeModule === 'analytics_audit' && (
              <ModuleAnalyticsAudit
                language={language}
                auditLogs={auditLogs}
              />
            )}
          </main>

        </div>
      )}

    </div>
  );
}
