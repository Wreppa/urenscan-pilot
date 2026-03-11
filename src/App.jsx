    import { useState, useRef } from "react";

const WHATSAPP_NUMBER = "31612345678"; // vervang dit met jouw nummer

const initialRecords = [
  { id: 1, naam: "Joep van Dijk", datum: "2026-03-08", begintijd: "08:00", eindtijd: "17:00", uren: "9.0", project: "Renovatie Den Haag", status: "goedgekeurd" },
  { id: 2, naam: "Fatima Bouchrit", datum: "2026-03-09", begintijd: "07:00", eindtijd: "15:30", uren: "8.5", project: "Nieuwbouw Rotterdam", status: "in behandeling" },
  { id: 3, naam: "Lars Pietersen", datum: "2026-03-09", begintijd: "06:30", eindtijd: "14:00", uren: "7.5", project: "Verbouwing Kantoor Utrecht", status: "in behandeling" },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #F5F3EE;
    font-family: 'DM Sans', sans-serif;
    color: #1C1917;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
  @keyframes scanline {
    0% { top: 0%; }
    100% { top: 100%; }
  }

  .fade-up { animation: fadeUp 0.5s ease forwards; }
  .fade-up-1 { animation: fadeUp 0.5s 0.1s ease both; }
  .fade-up-2 { animation: fadeUp 0.5s 0.2s ease both; }
  .fade-up-3 { animation: fadeUp 0.5s 0.3s ease both; }

  .btn-primary {
    background: #1C1917;
    color: #F5F3EE;
    border: none;
    border-radius: 12px;
    padding: 14px 28px;
    font-weight: 700;
    font-size: 15px;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .btn-primary:hover { background: #2C2824; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(28,25,23,0.2); }

  .btn-secondary {
    background: white;
    color: #1C1917;
    border: 1.5px solid #E5E2DC;
    border-radius: 12px;
    padding: 13px 24px;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: all 0.2s;
  }
  .btn-secondary:hover { border-color: #1C1917; }

  .btn-green {
    background: #166534;
    color: white;
    border: none;
    border-radius: 10px;
    padding: 9px 18px;
    font-weight: 700;
    font-size: 13px;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: all 0.2s;
  }
  .btn-green:hover { background: #15803d; }

  .btn-red {
    background: #991b1b;
    color: white;
    border: none;
    border-radius: 10px;
    padding: 9px 18px;
    font-weight: 700;
    font-size: 13px;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: all 0.2s;
  }
  .btn-red:hover { background: #b91c1c; }

  .card {
    background: white;
    border-radius: 20px;
    border: 1.5px solid #E5E2DC;
    padding: 28px;
  }

  .input-field {
    width: 100%;
    background: #F5F3EE;
    border: 1.5px solid #E5E2DC;
    border-radius: 10px;
    padding: 10px 14px;
    font-size: 15px;
    font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    color: #1C1917;
    outline: none;
    transition: border-color 0.2s;
  }
  .input-field:focus { border-color: #1C1917; }

  .tab-btn {
    padding: 8px 20px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    font-weight: 600;
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    transition: all 0.2s;
  }

  .drop-zone {
    border: 2px dashed #D4CFC8;
    border-radius: 20px;
    padding: 60px 40px;
    text-align: center;
    cursor: pointer;
    transition: all 0.25s;
    background: white;
  }
  .drop-zone:hover { border-color: #1C1917; background: #FAFAF8; }

  .status-badge {
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 700;
    white-space: nowrap;
  }

  .progress-bar {
    background: #E5E2DC;
    border-radius: 99px;
    height: 8px;
    overflow: hidden;
  }
  .progress-fill {
    height: 100%;
    border-radius: 99px;
    background: #1C1917;
    transition: width 0.3s ease;
  }

  .whatsapp-btn {
    background: #25D366;
    color: white;
    border: none;
    border-radius: 14px;
    padding: 14px 24px;
    font-weight: 700;
    font-size: 15px;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
  }
  .whatsapp-btn:hover { background: #22c55e; transform: translateY(-1px); box-shadow: 0 8px 20px rgba(37,211,102,0.3); }

  .scan-overlay {
    position: absolute;
    left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, transparent, #1C1917, transparent);
    animation: scanline 1.8s ease-in-out infinite;
    opacity: 0.7;
  }

  .ai-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #1C1917;
    color: #F5F3EE;
    border-radius: 99px;
    padding: 4px 12px;
    font-size: 12px;
    font-weight: 600;
    font-family: 'DM Mono', monospace;
  }
  .ai-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #86efac;
    animation: pulse 1.5s infinite;
  }
`;

export default function App() {
  const [step, setStep] = useState("upload");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanPhase, setScanPhase] = useState("");
  const [formData, setFormData] = useState(null);
  const [records, setRecords] = useState(initialRecords);
  const [activeTab, setActiveTab] = useState("upload");
  const [aiError, setAiError] = useState(null);
  const fileRef = useRef();

  const resetAll = () => {
    setStep("upload");
    setImagePreview(null);
    setImageBase64(null);
    setFormData(null);
    setAiError(null);
    setScanProgress(0);
    setScanPhase("");
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleFileUpload = (file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImagePreview(url);
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target.result.split(",")[1];
      setImageBase64(base64);
    };
    reader.readAsDataURL(file);
    setStep("preview");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  const runAIScan = async () => {
    setIsScanning(true);
    setScanProgress(0);
    setAiError(null);
    setStep("scanning");

    const phases = [
      { pct: 20, label: "Afbeelding analyseren..." },
      { pct: 45, label: "Tekst herkennen..." },
      { pct: 70, label: "Gegevens uitfilteren..." },
      { pct: 90, label: "Resultaten verwerken..." },
      { pct: 100, label: "Klaar!" },
    ];

    let phaseIndex = 0;
    const progressInterval = setInterval(() => {
      if (phaseIndex < phases.length) {
        setScanProgress(phases[phaseIndex].pct);
        setScanPhase(phases[phaseIndex].label);
        phaseIndex++;
      }
    }, 600);

    try {
      const imageContent = imageBase64
        ? [
            { type: "image", source: { type: "base64", media_type: "image/jpeg", data: imageBase64 } },
            { type: "text", text: `Je bent een AI-assistent gespecialiseerd in het uitlezen van urenbonnen en tijdregistratieformulieren. 

Lees de gegevens uit deze afbeelding en geef ze terug als JSON object met exact deze velden:
- naam (volledige naam van de medewerker)
- datum (formaat: YYYY-MM-DD, als jaar ontbreekt gebruik 2026)
- begintijd (formaat: HH:MM, 24-uurs notatie)
- eindtijd (formaat: HH:MM, 24-uurs notatie)
- project (projectnaam of locatie, of "Onbekend" als niet vermeld)
- uren (decimaal getal, berekend uit begin en eindtijd)

Geef ALLEEN het JSON object terug, geen extra tekst of uitleg.
Als een veld niet leesbaar is, gebruik dan een lege string "".

Voorbeeld output:
{"naam":"Jan de Vries","datum":"2026-03-10","begintijd":"07:30","eindtijd":"16:00","project":"Renovatie Amsterdam","uren":"8.5"}` }
          ]
        : [{ type: "text", text: `Genereer een realistisch voorbeeld van uitgelezen urenbon data als JSON object met deze velden: naam, datum (2026-03-10), begintijd, eindtijd, project, uren. Geef ALLEEN het JSON object terug.` }];

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: imageContent }],
        }),
      });

      clearInterval(progressInterval);
      setScanProgress(100);
      setScanPhase("Klaar!");

      const data = await response.json();
      const text = data.content?.map(i => i.text || "").join("") || "";

      let parsed;
      try {
        const clean = text.replace(/```json|```/g, "").trim();
        parsed = JSON.parse(clean);
      } catch {
        parsed = {
          naam: "", datum: "2026-03-10",
          begintijd: "", eindtijd: "",
          project: "", uren: ""
        };
      }

      setTimeout(() => {
        setIsScanning(false);
        setFormData(parsed);
        setStep("confirm");
      }, 500);

    } catch (err) {
      clearInterval(progressInterval);
      setIsScanning(false);
      setAiError("Er ging iets mis met de AI. Probeer opnieuw.");
      setStep("preview");
    }
  };

  const submitForm = () => {
    const newRecord = { id: records.length + 1, ...formData, status: "in behandeling" };
    setRecords([newRecord, ...records]);
    setStep("success");
  };

  const updateStatus = (id, status) => {
    setRecords(records.map(r => r.id === id ? { ...r, status } : r));
  };

  const statusStyle = (s) => ({
    background: s === "goedgekeurd" ? "#dcfce7" : s === "afgekeurd" ? "#fee2e2" : "#fef3c7",
    color: s === "goedgekeurd" ? "#166534" : s === "afgekeurd" ? "#991b1b" : "#92400e",
  });

  const totalPending = records.filter(r => r.status === "in behandeling").length;
  const totalApproved = records.filter(r => r.status === "goedgekeurd").length;
  const totalHours = records.reduce((a, r) => a + parseFloat(r.uren || 0), 0).toFixed(1);

  return (
    <>
      <style>{styles}</style>

      {/* HEADER */}
      <div style={{
        background: "white",
        borderBottom: "1.5px solid #E5E2DC",
        padding: "0 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 64,
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "#1C1917",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18,
          }}>⏱</div>
          <div>
            <span style={{ fontWeight: 800, fontSize: 17, letterSpacing: "-0.5px" }}>BonScan</span>
            <span style={{
              fontSize: 10, fontWeight: 600, background: "#F5F3EE",
              border: "1px solid #E5E2DC", borderRadius: 4, padding: "1px 6px",
              marginLeft: 6, color: "#78716C", fontFamily: "'DM Mono', monospace"
            }}>PILOT</span>
          </div>
        </div>

        <div style={{ display: "flex", gap: 4 }}>
          {[
            { key: "upload", label: "📸 Bon Uploaden" },
            { key: "uitleg", label: "❓ Uitleg" },
            { key: "dashboard", label: "📊 Dashboard" },
          ].map(tab => (
            <button key={tab.key} className="tab-btn"
              onClick={() => setActiveTab(tab.key)}
              style={{
                background: activeTab === tab.key ? "#1C1917" : "transparent",
                color: activeTab === tab.key ? "#F5F3EE" : "#78716C",
              }}>
              {tab.label}
              {tab.key === "dashboard" && totalPending > 0 && (
                <span style={{
                  background: "#ef4444", color: "white", borderRadius: "99px",
                  padding: "1px 7px", fontSize: 11, marginLeft: 6, fontWeight: 700
                }}>{totalPending}</span>
              )}
            </button>
          ))}
        </div>

        <a className="whatsapp-btn" href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hallo!%20Ik%20wil%20meer%20weten%20over%20BonScan.`} target="_blank" rel="noreferrer" style={{ fontSize: 13, padding: "9px 16px", borderRadius: 10 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Contact
        </a>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>

        {/* ===== UPLOAD TAB ===== */}
        {activeTab === "upload" && (
          <div>
            {step === "upload" && (
              <div className="fade-up">
                <div style={{ marginBottom: 40 }}>
                  <div className="ai-tag" style={{ marginBottom: 16 }}>
                    <div className="ai-dot" />
                    AI-gestuurde urenregistratie
                  </div>
                  <h1 style={{ fontSize: 38, fontWeight: 800, letterSpacing: "-1.5px", lineHeight: 1.1, marginBottom: 12 }}>
                    Uren registreren<br />in 10 seconden.
                  </h1>
                  <p style={{ color: "#78716C", fontSize: 16, maxWidth: 480 }}>
                    Maak een foto van je urenbon of tijdschrijfformulier. De AI leest alles automatisch uit.
                  </p>
                </div>

                {aiError && (
                  <div style={{ background: "#fee2e2", border: "1px solid #fca5a5", borderRadius: 12, padding: "12px 16px", marginBottom: 20, color: "#991b1b", fontSize: 14 }}>
                    ⚠️ {aiError}
                  </div>
                )}

                <div
                  className="drop-zone"
                  onDrop={handleDrop}
                  onDragOver={e => e.preventDefault()}
                  onClick={() => fileRef.current.click()}
                >
                  <div style={{ fontSize: 52, marginBottom: 16 }}>📋</div>
                  <p style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Sleep je urenbon hier naartoe</p>
                  <p style={{ color: "#A8A29E", marginBottom: 24, fontSize: 14 }}>of klik om een foto te kiezen</p>
                  <button className="btn-primary">📷 Foto kiezen</button>
                  <p style={{ color: "#C4BFB8", fontSize: 12, marginTop: 16 }}>JPG, PNG, HEIC — max 10MB</p>
                  <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }}
                    onChange={e => handleFileUpload(e.target.files[0])} />
                </div>

                <div style={{ textAlign: "center", marginTop: 16 }}>
                  <button className="btn-secondary" onClick={() => { resetAll(); setImagePreview(null); setImageBase64(null); setStep("preview"); }}>
                    ▶ Demo starten zonder foto
                  </button>
                </div>
              </div>
            )}

            {step === "preview" && (
              <div className="fade-up" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
                <div style={{ textAlign: "center" }}>
                  <h2 style={{ fontWeight: 800, fontSize: 26, letterSpacing: "-0.5px", marginBottom: 6 }}>Foto gereed voor analyse</h2>
                  <p style={{ color: "#78716C" }}>Controleer de foto en start de AI-scan</p>
                </div>

                <div style={{
                  width: "100%", maxWidth: 420, borderRadius: 20,
                  overflow: "hidden", border: "1.5px solid #E5E2DC",
                  background: "white", position: "relative"
                }}>
                  {imagePreview ? (
                    <img src={imagePreview} alt="urenbon" style={{ width: "100%", display: "block", maxHeight: 380, objectFit: "contain" }} />
                  ) : (
                    <div style={{ padding: 32, fontFamily: "'DM Mono', monospace", fontSize: 13, background: "white", color: "#1C1917", lineHeight: 2 }}>
                      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 16, borderBottom: "1px solid #E5E2DC", paddingBottom: 12 }}>📋 URENBON — Demo</div>
                      <div>Naam: <strong>Mohamed El Amrani</strong></div>
                      <div>Datum: <strong>10-03-2026</strong></div>
                      <div>Begin: <strong>07:30</strong></div>
                      <div>Eind: <strong>16:00</strong></div>
                      <div>Project: <strong>Kantoor Utrecht</strong></div>
                      <div style={{ marginTop: 16, paddingTop: 12, borderTop: "1px solid #E5E2DC", fontWeight: 700 }}>Totaal: 8,5 uur</div>
                    </div>
                  )}
                </div>

                <div style={{ display: "flex", gap: 12 }}>
                  <button className="btn-secondary" onClick={resetAll}>← Opnieuw</button>
                  <button className="btn-primary" onClick={runAIScan}>🔍 AI-scan starten →</button>
                </div>
              </div>
            )}

            {step === "scanning" && (
              <div className="fade-up" style={{ textAlign: "center", padding: "60px 0" }}>
                <div style={{ fontSize: 56, marginBottom: 24 }}>🤖</div>
                <h2 style={{ fontWeight: 800, fontSize: 26, letterSpacing: "-0.5px", marginBottom: 8 }}>AI aan het werk...</h2>
                <p style={{ color: "#78716C", marginBottom: 40 }}>{scanPhase || "Afbeelding wordt geanalyseerd"}</p>

                <div className="progress-bar" style={{ maxWidth: 400, margin: "0 auto 16px" }}>
                  <div className="progress-fill" style={{ width: `${scanProgress}%` }} />
                </div>
                <p style={{ fontFamily: "'DM Mono', monospace", fontWeight: 600, fontSize: 14 }}>{Math.round(scanProgress)}%</p>

                <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
                  {scanProgress > 20 && <p className="fade-up" style={{ color: "#A8A29E", fontSize: 13 }}>✓ Afbeelding ontvangen</p>}
                  {scanProgress > 45 && <p className="fade-up" style={{ color: "#A8A29E", fontSize: 13 }}>✓ Tekst herkend</p>}
                  {scanProgress > 70 && <p className="fade-up" style={{ color: "#A8A29E", fontSize: 13 }}>✓ Naam & datum gevonden</p>}
                  {scanProgress > 90 && <p className="fade-up" style={{ color: "#A8A29E", fontSize: 13 }}>✓ Uren berekend</p>}
                </div>
              </div>
            )}

            {step === "confirm" && formData && (
              <div className="fade-up">
                <div style={{ textAlign: "center", marginBottom: 28 }}>
                  <div style={{ fontSize: 44, marginBottom: 12 }}>✅</div>
                  <h2 style={{ fontWeight: 800, fontSize: 26, letterSpacing: "-0.5px", marginBottom: 6 }}>Gegevens uitgelezen!</h2>
                  <p style={{ color: "#78716C" }}>Controleer de gegevens en dien in voor goedkeuring</p>
                </div>

                <div className="card" style={{ marginBottom: 20 }}>
                  {[
                    { label: "👤 Naam medewerker", key: "naam" },
                    { label: "📅 Datum", key: "datum" },
                    { label: "🕐 Begintijd", key: "begintijd" },
                    { label: "🕔 Eindtijd", key: "eindtijd" },
                    { label: "🏗 Project / Locatie", key: "project" },
                    { label: "⏱ Totaal uren", key: "uren" },
                  ].map(({ label, key }) => (
                    <div key={key} style={{
                      display: "flex", alignItems: "center", gap: 16,
                      borderBottom: "1px solid #F5F3EE", padding: "12px 0"
                    }}>
                      <span style={{ color: "#A8A29E", minWidth: 180, fontSize: 14 }}>{label}</span>
                      <input className="input-field" value={formData[key] || ""}
                        onChange={e => setFormData({ ...formData, [key]: e.target.value })} />
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                  <button className="btn-secondary" onClick={() => { setStep("preview"); if (fileRef.current) fileRef.current.value = ""; }}>← Aanpassen</button>
                  <button className="btn-primary" onClick={submitForm}>✅ Indienen voor goedkeuring →</button>
                </div>
              </div>
            )}

            {step === "success" && (
              <div className="fade-up" style={{ textAlign: "center", padding: "80px 0" }}>
                <div style={{ fontSize: 64, marginBottom: 20 }}>🎉</div>
                <h2 style={{ fontWeight: 800, fontSize: 28, letterSpacing: "-1px", marginBottom: 8 }}>Ingediend!</h2>
                <p style={{ color: "#78716C", fontSize: 16, marginBottom: 32 }}>Je leidinggevende ontvangt direct een melding.</p>
                <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                  <button className="btn-primary" onClick={resetAll}>📷 Nieuwe bon scannen</button>
                  <button className="btn-secondary" onClick={() => { resetAll(); setActiveTab("dashboard"); }}>📊 Naar dashboard</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ===== UITLEG TAB ===== */}
        {activeTab === "uitleg" && (
          <div className="fade-up">
            <div style={{ marginBottom: 36 }}>
              <h2 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-1px", marginBottom: 8 }}>Hoe werkt BonScan?</h2>
              <p style={{ color: "#78716C", fontSize: 16 }}>Alles wat je moet weten in 2 minuten.</p>
            </div>

            {/* Stappen */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
              {[
                { nr: "1", icon: "📷", titel: "Foto maken", uitleg: "Maak een foto van je ingevulde urenbon, tijdschrijfformulier of handgeschreven notitie. Elke bon werkt." },
                { nr: "2", icon: "🤖", titel: "AI leest uit", uitleg: "Onze AI herkent automatisch je naam, datum, begin- en eindtijd en het project. Geen tikfouten meer." },
                { nr: "3", icon: "✏️", titel: "Controleren", uitleg: "Je ziet de uitgelezen gegevens en kunt ze nog aanpassen als iets niet klopt. Jij hebt altijd de controle." },
                { nr: "4", icon: "✅", titel: "Goedkeuring", uitleg: "Je leidinggevende krijgt direct een melding en kan de uren met één klik goedkeuren of afkeuren." },
              ].map(s => (
                <div key={s.nr} className="card fade-up">
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 10, background: "#1C1917",
                      color: "#F5F3EE", display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: 800, fontSize: 15, fontFamily: "'DM Mono', monospace"
                    }}>{s.nr}</div>
                    <span style={{ fontSize: 24 }}>{s.icon}</span>
                    <span style={{ fontWeight: 700, fontSize: 16 }}>{s.titel}</span>
                  </div>
                  <p style={{ color: "#78716C", fontSize: 14, lineHeight: 1.6 }}>{s.uitleg}</p>
                </div>
              ))}
            </div>

            {/* Wat betekenen de termen */}
            <div className="card" style={{ marginBottom: 24 }}>
              <h3 style={{ fontWeight: 800, fontSize: 18, marginBottom: 20 }}>📖 Wat betekent wat?</h3>
              {[
                { term: "Urenbon", uitleg: "Het papieren of digitale formulier waarop een medewerker zijn gewerkte uren bijhoudt." },
                { term: "AI-scan", uitleg: "De kunstmatige intelligentie die de foto analyseert en de tekst automatisch herkent en uitleest." },
                { term: "In behandeling", uitleg: "De uren zijn ingediend maar nog niet goedgekeurd door de leidinggevende." },
                { term: "Goedgekeurd", uitleg: "De leidinggevende heeft de uren gecontroleerd en akkoord gegeven. Ze kunnen worden verwerkt in de salarisadministratie." },
                { term: "Afgekeurd", uitleg: "Er klopt iets niet met de uren. De medewerker wordt gevraagd opnieuw in te dienen." },
                { term: "Dashboard", uitleg: "Het overzichtscherm voor de leidinggevende waar alle ingediende uren van het team zichtbaar zijn." },
              ].map((item, i) => (
                <div key={i} style={{
                  display: "flex", gap: 16, padding: "12px 0",
                  borderBottom: i < 5 ? "1px solid #F5F3EE" : "none"
                }}>
                  <span style={{
                    fontFamily: "'DM Mono', monospace", fontWeight: 600, fontSize: 13,
                    background: "#F5F3EE", padding: "3px 10px", borderRadius: 6,
                    color: "#1C1917", whiteSpace: "nowrap", alignSelf: "flex-start", marginTop: 2
                  }}>{item.term}</span>
                  <p style={{ color: "#78716C", fontSize: 14, lineHeight: 1.6 }}>{item.uitleg}</p>
                </div>
              ))}
            </div>

            {/* Vragen? */}
            <div style={{
              background: "#1C1917", borderRadius: 20, padding: 28,
              display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16
            }}>
              <div>
                <p style={{ color: "#F5F3EE", fontWeight: 700, fontSize: 18, marginBottom: 4 }}>Nog vragen?</p>
                <p style={{ color: "#A8A29E", fontSize: 14 }}>Stuur ons een WhatsApp-bericht. We reageren snel.</p>
              </div>
              <a className="whatsapp-btn" href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hallo!%20Ik%20heb%20een%20vraag%20over%20BonScan.`} target="_blank" rel="noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp ons
              </a>
            </div>
          </div>
        )}

        {/* ===== DASHBOARD TAB ===== */}
        {activeTab === "dashboard" && (
          <div className="fade-up">
            <div style={{ marginBottom: 28 }}>
              <h2 style={{ fontWeight: 800, fontSize: 28, letterSpacing: "-1px", marginBottom: 4 }}>Dashboard</h2>
              <p style={{ color: "#78716C" }}>Bekijk en keur ingediende uren goed</p>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 28 }}>
              {[
                { label: "Wacht op goedkeuring", value: totalPending, icon: "⏳", accent: "#92400e", bg: "#fef3c7" },
                { label: "Goedgekeurd deze week", value: totalApproved, icon: "✅", accent: "#166534", bg: "#dcfce7" },
                { label: "Totaal uren ingediend", value: totalHours, icon: "⏱", accent: "#1e40af", bg: "#dbeafe" },
              ].map(stat => (
                <div key={stat.label} className="card" style={{ border: `1.5px solid ${stat.bg}` }}>
                  <div style={{ fontSize: 26, marginBottom: 8 }}>{stat.icon}</div>
                  <div style={{ fontSize: 30, fontWeight: 800, color: stat.accent, letterSpacing: "-1px" }}>{stat.value}</div>
                  <div style={{ color: "#A8A29E", fontSize: 13, marginTop: 2 }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Records */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {records.map((record, i) => (
                <div key={record.id} className="card fade-up" style={{
                  display: "flex", alignItems: "center", gap: 20,
                  flexWrap: "wrap", padding: "18px 24px",
                  animationDelay: `${i * 0.05}s`
                }}>
                  <div style={{ flex: 1, minWidth: 160 }}>
                    <div style={{ fontWeight: 700, marginBottom: 3 }}>{record.naam}</div>
                    <div style={{ color: "#A8A29E", fontSize: 13 }}>{record.project}</div>
                  </div>
                  <div style={{ minWidth: 90, textAlign: "center" }}>
                    <div style={{ fontSize: 11, color: "#A8A29E", marginBottom: 2 }}>DATUM</div>
                    <div style={{ fontWeight: 600, fontSize: 13, fontFamily: "'DM Mono', monospace" }}>{record.datum}</div>
                  </div>
                  <div style={{ minWidth: 110, textAlign: "center" }}>
                    <div style={{ fontSize: 11, color: "#A8A29E", marginBottom: 2 }}>TIJDEN</div>
                    <div style={{ fontWeight: 600, fontSize: 13, fontFamily: "'DM Mono', monospace" }}>{record.begintijd} – {record.eindtijd}</div>
                  </div>
                  <div style={{ minWidth: 60, textAlign: "center" }}>
                    <div style={{ fontSize: 11, color: "#A8A29E", marginBottom: 2 }}>UREN</div>
                    <div style={{ fontWeight: 800, fontSize: 20, letterSpacing: "-0.5px" }}>{record.uren}</div>
                  </div>
                  <span className="status-badge" style={statusStyle(record.status)}>{record.status}</span>
                  {record.status === "in behandeling" && (
                    <div style={{ display: "flex", gap: 8 }}>
                      <button className="btn-green" onClick={() => updateStatus(record.id, "goedgekeurd")}>✓ Keur goed</button>
                      <button className="btn-red" onClick={() => updateStatus(record.id, "afgekeurd")}>✗ Afkeur</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div style={{
        textAlign: "center", padding: "32px 24px",
        borderTop: "1.5px solid #E5E2DC", marginTop: 60,
        color: "#C4BFB8", fontSize: 13
      }}>
        BonScan — Pilot versie &nbsp;·&nbsp; Vragen? &nbsp;
        <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer"
          style={{ color: "#25D366", fontWeight: 600, textDecoration: "none" }}>WhatsApp ons</a>
      </div>
    </>
  );
}

    
