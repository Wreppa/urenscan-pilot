import { useState, useRef } from "react";

const mockOCRResult = {
  naam: "Mohamed El Amrani",
  datum: "2026-03-10",
  begintijd: "07:30",
  eindtijd: "16:00",
  project: "Verbouwing Kantoor Utrecht",
  uren: "8.5",
};

const initialRecords = [
  { id: 1, naam: "Joep van Dijk", datum: "2026-03-08", begintijd: "08:00", eindtijd: "17:00", uren: "9.0", project: "Renovatie Den Haag", status: "goedgekeurd" },
  { id: 2, naam: "Fatima Bouchrit", datum: "2026-03-09", begintijd: "07:00", eindtijd: "15:30", uren: "8.5", project: "Nieuwbouw Rotterdam", status: "in behandeling" },
  { id: 3, naam: "Lars Pietersen", datum: "2026-03-09", begintijd: "06:30", eindtijd: "14:00", uren: "7.5", project: "Verbouwing Kantoor Utrecht", status: "in behandeling" },
];

export default function App() {
  const [step, setStep] = useState("upload");
  const [imagePreview, setImagePreview] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [formData, setFormData] = useState(null);
  const [records, setRecords] = useState(initialRecords);
  const [activeTab, setActiveTab] = useState("upload");
  const fileRef = useRef();

  const handleFileUpload = (file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImagePreview(url);
    setStep("preview");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  const startScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    setStep("scanning");
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 18 + 5;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsScanning(false);
          setFormData(mockOCRResult);
          setStep("confirm");
        }, 400);
      }
      setScanProgress(Math.min(p, 100));
    }, 180);
  };

  const submitForm = () => {
    const newRecord = {
      id: records.length + 1,
      ...formData,
      status: "in behandeling",
    };
    setRecords([newRecord, ...records]);
    setStep("success");
    setTimeout(() => {
      setActiveTab("dashboard");
      setStep("upload");
      setImagePreview(null);
      setFormData(null);
    }, 2200);
  };

  const updateStatus = (id, status) => {
    setRecords(records.map(r => r.id === id ? { ...r, status } : r));
  };

  const statusColor = (s) => {
    if (s === "goedgekeurd") return "#22c55e";
    if (s === "afgekeurd") return "#ef4444";
    return "#f59e0b";
  };
  const statusBg = (s) => {
    if (s === "goedgekeurd") return "#dcfce7";
    if (s === "afgekeurd") return "#fee2e2";
    return "#fef3c7";
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0f2027 100%)",
      fontFamily: "'Sora', 'Segoe UI', sans-serif",
      color: "#f1f5f9"
    }}>
      {/* Header */}
      <div style={{
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        padding: "0 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 64
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18
          }}>⏱</div>
          <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: "-0.5px" }}>UrenScan<span style={{ color: "#60a5fa" }}>.ai</span></span>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {["upload", "dashboard"].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: "7px 18px", borderRadius: 8, border: "none", cursor: "pointer",
              fontWeight: 600, fontSize: 13, transition: "all 0.2s",
              background: activeTab === tab ? "rgba(59,130,246,0.25)" : "transparent",
              color: activeTab === tab ? "#60a5fa" : "#94a3b8",
              borderBottom: activeTab === tab ? "2px solid #3b82f6" : "2px solid transparent"
            }}>
              {tab === "upload" ? "📸 Foto Uploaden" : "📊 Dashboard"}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "40px 24px" }}>

        {/* UPLOAD TAB */}
        {activeTab === "upload" && (
          <div>
            {step === "upload" && (
              <div>
                <div style={{ textAlign: "center", marginBottom: 36 }}>
                  <h1 style={{ fontSize: 32, fontWeight: 800, margin: "0 0 10px", letterSpacing: "-1px" }}>
                    Uren registreren <span style={{ color: "#60a5fa" }}>in seconden</span>
                  </h1>
                  <p style={{ color: "#94a3b8", fontSize: 16, margin: 0 }}>
                    Maak een foto van de urenbon — de AI doet de rest.
                  </p>
                </div>
                <div
                  onDrop={handleDrop}
                  onDragOver={e => e.preventDefault()}
                  onClick={() => fileRef.current.click()}
                  style={{
                    border: "2px dashed rgba(99,102,241,0.5)",
                    borderRadius: 20,
                    padding: "64px 40px",
                    textAlign: "center",
                    cursor: "pointer",
                    background: "rgba(99,102,241,0.06)",
                    transition: "all 0.2s",
                  }}
                >
                  <div style={{ fontSize: 56, marginBottom: 16 }}>📷</div>
                  <p style={{ fontSize: 18, fontWeight: 700, margin: "0 0 8px" }}>Sleep een foto hier naartoe</p>
                  <p style={{ color: "#64748b", margin: "0 0 20px" }}>of klik om een bestand te kiezen</p>
                  <button style={{
                    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                    color: "white", border: "none", borderRadius: 10,
                    padding: "12px 28px", fontWeight: 700, fontSize: 15, cursor: "pointer"
                  }}>
                    Foto Kiezen
                  </button>
                  <p style={{ color: "#475569", fontSize: 12, marginTop: 16 }}>JPG, PNG, HEIC • Max 10MB</p>
                  <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }}
                    onChange={e => handleFileUpload(e.target.files[0])} />
                </div>

                {/* Demo knop */}
                <div style={{ textAlign: "center", marginTop: 20 }}>
                  <button onClick={() => { setImagePreview("/demo-bon.jpg"); setStep("preview"); }}
                    style={{
                      background: "transparent", color: "#60a5fa", border: "1px solid rgba(96,165,250,0.3)",
                      borderRadius: 8, padding: "8px 20px", cursor: "pointer", fontSize: 13, fontWeight: 600
                    }}>
                    ▶ Demo starten zonder foto
                  </button>
                </div>
              </div>
            )}

            {step === "preview" && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
                <h2 style={{ margin: 0, fontWeight: 800 }}>Foto klaar voor analyse</h2>
                <div style={{
                  width: "100%", maxWidth: 420, borderRadius: 16, overflow: "hidden",
                  border: "2px solid rgba(99,102,241,0.3)",
                  background: "rgba(30,41,59,0.8)"
                }}>
                  {imagePreview && imagePreview !== "/demo-bon.jpg" ? (
                    <img src={imagePreview} alt="bon" style={{ width: "100%", display: "block" }} />
                  ) : (
                    <div style={{
                      padding: 32, fontFamily: "monospace", fontSize: 14,
                      background: "#fff", color: "#1e293b", lineHeight: 1.8
                    }}>
                      <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 12 }}>🗒 URENBON</div>
                      <div>Naam: <strong>Mohamed El Amrani</strong></div>
                      <div>Datum: <strong>10-03-2026</strong></div>
                      <div>Begin: <strong>07:30</strong></div>
                      <div>Eind: <strong>16:00</strong></div>
                      <div>Project: <strong>Kantoor Utrecht</strong></div>
                      <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid #ddd" }}>
                        Totaal: <strong>8,5 uur</strong>
                      </div>
                    </div>
                  )}
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                  <button onClick={() => { setStep("upload"); setImagePreview(null); }} style={{
                    background: "rgba(255,255,255,0.08)", color: "#94a3b8",
                    border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10,
                    padding: "12px 24px", cursor: "pointer", fontWeight: 600
                  }}>← Opnieuw</button>
                  <button onClick={startScan} style={{
                    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                    color: "white", border: "none", borderRadius: 10,
                    padding: "12px 28px", fontWeight: 700, fontSize: 15, cursor: "pointer"
                  }}>🔍 AI Scannen →</button>
                </div>
              </div>
            )}

            {step === "scanning" && (
              <div style={{ textAlign: "center", padding: "60px 0" }}>
                <div style={{ fontSize: 52, marginBottom: 24 }}>🤖</div>
                <h2 style={{ margin: "0 0 8px", fontWeight: 800 }}>AI aan het werk...</h2>
                <p style={{ color: "#94a3b8", marginBottom: 36 }}>Gegevens worden uitgelezen en verwerkt</p>
                <div style={{
                  background: "rgba(255,255,255,0.06)", borderRadius: 12,
                  height: 12, overflow: "hidden", maxWidth: 400, margin: "0 auto 16px"
                }}>
                  <div style={{
                    height: "100%", borderRadius: 12, transition: "width 0.2s",
                    background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
                    width: `${scanProgress}%`
                  }} />
                </div>
                <p style={{ color: "#60a5fa", fontWeight: 700 }}>{Math.round(scanProgress)}%</p>
                {scanProgress > 30 && <p style={{ color: "#64748b", fontSize: 13 }}>✓ Naam & datum herkend</p>}
                {scanProgress > 60 && <p style={{ color: "#64748b", fontSize: 13 }}>✓ Tijden uitgelezen</p>}
                {scanProgress > 85 && <p style={{ color: "#64748b", fontSize: 13 }}>✓ Uren berekend</p>}
              </div>
            )}

            {step === "confirm" && formData && (
              <div>
                <div style={{ textAlign: "center", marginBottom: 28 }}>
                  <div style={{ fontSize: 40, marginBottom: 8 }}>✅</div>
                  <h2 style={{ margin: "0 0 6px", fontWeight: 800 }}>Gegevens herkend!</h2>
                  <p style={{ color: "#94a3b8", margin: 0 }}>Controleer en bevestig de gegevens hieronder</p>
                </div>
                <div style={{
                  background: "rgba(255,255,255,0.04)", borderRadius: 16,
                  border: "1px solid rgba(255,255,255,0.08)", padding: 28
                }}>
                  {Object.entries({
                    "👤 Naam": "naam", "📅 Datum": "datum",
                    "🕐 Begintijd": "begintijd", "🕐 Eindtijd": "eindtijd",
                    "🏗 Project": "project", "⏱ Totaal uren": "uren"
                  }).map(([label, key]) => (
                    <div key={key} style={{
                      display: "flex", alignItems: "center",
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                      padding: "12px 0", gap: 12
                    }}>
                      <span style={{ color: "#64748b", minWidth: 140, fontSize: 14 }}>{label}</span>
                      <input value={formData[key]}
                        onChange={e => setFormData({ ...formData, [key]: e.target.value })}
                        style={{
                          flex: 1, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: 8, padding: "8px 12px", color: "#f1f5f9",
                          fontSize: 15, fontWeight: 600, outline: "none"
                        }} />
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 12, marginTop: 24, justifyContent: "center" }}>
                  <button onClick={() => setStep("preview")} style={{
                    background: "rgba(255,255,255,0.08)", color: "#94a3b8",
                    border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10,
                    padding: "12px 24px", cursor: "pointer", fontWeight: 600
                  }}>← Aanpassen</button>
                  <button onClick={submitForm} style={{
                    background: "linear-gradient(135deg, #22c55e, #16a34a)",
                    color: "white", border: "none", borderRadius: 10,
                    padding: "12px 32px", fontWeight: 700, fontSize: 15, cursor: "pointer"
                  }}>✅ Indienen voor goedkeuring</button>
                </div>
              </div>
            )}

            {step === "success" && (
              <div style={{ textAlign: "center", padding: "80px 0" }}>
                <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
                <h2 style={{ fontWeight: 800, margin: "0 0 8px" }}>Uren ingediend!</h2>
                <p style={{ color: "#94a3b8" }}>Je leidinggevende krijgt direct een melding...</p>
              </div>
            )}
          </div>
        )}

        {/* DASHBOARD TAB */}
        {activeTab === "dashboard" && (
          <div>
            <div style={{ marginBottom: 28 }}>
              <h2 style={{ margin: "0 0 4px", fontWeight: 800, fontSize: 24 }}>📊 Uren Dashboard</h2>
              <p style={{ color: "#64748b", margin: 0 }}>Beheer en keur ingediende uren goed</p>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 28 }}>
              {[
                { label: "In behandeling", value: records.filter(r => r.status === "in behandeling").length, color: "#f59e0b", icon: "⏳" },
                { label: "Goedgekeurd", value: records.filter(r => r.status === "goedgekeurd").length, color: "#22c55e", icon: "✅" },
                { label: "Totaal uren (week)", value: records.reduce((a, r) => a + parseFloat(r.uren), 0).toFixed(1), color: "#60a5fa", icon: "⏱" },
              ].map(stat => (
                <div key={stat.label} style={{
                  background: "rgba(255,255,255,0.04)", borderRadius: 14,
                  border: "1px solid rgba(255,255,255,0.07)", padding: "20px 24px"
                }}>
                  <div style={{ fontSize: 28, marginBottom: 4 }}>{stat.icon}</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: stat.color }}>{stat.value}</div>
                  <div style={{ color: "#64748b", fontSize: 13 }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Records */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {records.map(record => (
                <div key={record.id} style={{
                  background: "rgba(255,255,255,0.04)", borderRadius: 14,
                  border: "1px solid rgba(255,255,255,0.07)", padding: "18px 24px",
                  display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap"
                }}>
                  <div style={{ flex: 1, minWidth: 160 }}>
                    <div style={{ fontWeight: 700, marginBottom: 3 }}>{record.naam}</div>
                    <div style={{ color: "#64748b", fontSize: 13 }}>{record.project}</div>
                  </div>
                  <div style={{ minWidth: 100, textAlign: "center" }}>
                    <div style={{ fontSize: 12, color: "#64748b" }}>Datum</div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{record.datum}</div>
                  </div>
                  <div style={{ minWidth: 100, textAlign: "center" }}>
                    <div style={{ fontSize: 12, color: "#64748b" }}>Tijden</div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{record.begintijd} – {record.eindtijd}</div>
                  </div>
                  <div style={{ minWidth: 60, textAlign: "center" }}>
                    <div style={{ fontSize: 12, color: "#64748b" }}>Uren</div>
                    <div style={{ fontWeight: 700, fontSize: 18, color: "#60a5fa" }}>{record.uren}</div>
                  </div>
                  <div style={{
                    padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700,
                    background: statusBg(record.status), color: statusColor(record.status),
                    minWidth: 110, textAlign: "center"
                  }}>
                    {record.status}
                  </div>
                  {record.status === "in behandeling" && (
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => updateStatus(record.id, "goedgekeurd")} style={{
                        background: "#22c55e", color: "white", border: "none",
                        borderRadius: 8, padding: "7px 14px", cursor: "pointer", fontWeight: 700, fontSize: 13
                      }}>✓ Keur goed</button>
                      <button onClick={() => updateStatus(record.id, "afgekeurd")} style={{
                        background: "#ef4444", color: "white", border: "none",
                        borderRadius: 8, padding: "7px 14px", cursor: "pointer", fontWeight: 700, fontSize: 13
                      }}>✗ Afkeur</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
