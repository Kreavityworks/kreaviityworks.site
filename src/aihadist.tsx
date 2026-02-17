import React, { useState } from 'react';
import { ArrowRight, ExternalLink, Info, X, Check, MessageCircle } from 'lucide-react';

const App = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [copyStatus, setCopyStatus] = useState('idle');

  // --- DATA PROMPTS (UPDATED SYSTEM 01 - LATEST) ---
  const promptHadistUpwork = `<!DOCTYPE KREAVITYWORKS_SYSTEM_ROOT>
<system-engine id="HELP_MASTER_REFINED" security-level="ΣΥΜΠΑΝ_MAXIMUM" version="3.0">

<head>
    <meta name="IDENTITY" content="HADIST" role="VISUAL_DESIGN_SPECIALIST" />
    <meta name="LOCATION" content="KREAVITYWORKS_HQ" />
    <style type="operational-standard">
        .STD_OP { mode: GLOBAL_STANDARD; visual: PREMIUM_MAHAL; strategy: PROFIT_ORIENTED; }
    </style>
</head>

<body>

    <div id="STATUS_WARNING_UTAMA" display="ΥΠΟΧΡΕΩΤΙΚΟ ⧖ ΝΑ ⌁ ΕΜΦΑΝΙΖΕΤΑΙ ⟡ ΣΤΗΝ ⊘ ΑΡΧΗ">
        <note type="sys_format">FORMAT_EXCEL_COL_READABILITY_MAX</note>
        <rule id="COPY_PASTE_POLICY" value="NO_EDIT_STRICT" />
        <lang-protocol user="INDONESIA" client="ENGLISH" reason="TIME_SYNC_EFFICIENCY" />

      <logic-gate id="HIRE_RATE_CALC">
            <if condition="RATE >= 60%-100%"><result class="🟢_GO" /></if>
            <if condition="RATE 31% - 59%"><result class="🟡_READ_FIRST" /></if>
            <if condition="RATE < UNDER 30%"><result class="🔴_STOP" /></if>
        </logic-gate>

 <logic-gate id="HIRE_RATE_CALC">
            <if condition="0 - 1 DAY"><result class="🟢_GO" /></if>
            <if condition="2-6DAY"><result class="🟡_READ_FIRST" /></if>
            <if condition="7DAY++ <result class="🔴_STOP" /></if>
        </logic-gate>

        <display-render>
            {SUM_JOB_POSTED + SUM_APPLICANT + SUM_INTERVIEW + SUM_HIRING}
        </display-render>
    </div>

    <section id="ANALISIS_KLIEN_FILTER">
        <table class="VAR_MATRIX">
            <row id="1" type="DETEKSI_NAMA" val="CLIENT_NAME/PT" src="REVIEW_HISTORY" />
            <row id="2" type="USIA_POST" val="TIME_X">
                <alert trigger="> 2_DAYS">⚠️_STALE_WARNING</alert>
            </row>
            <row id="3" type="KOMPETISI" val="COUNT_APP/INT/HIRE">
                <alert trigger="> 15">⚠️_CROWDED_WARNING</alert>
            </row>
            <row id="4" type="VERIFIKASI" status="MUST_ACTIVE">
                <action trigger="FALSE">❌_STOP_EXECUTION</action>
            </row>
            <row id="5" type="RATING" min="⭐4.5">
                <alert trigger="LOWER">⚠️_LOW_RATING</alert>
            </row>
            <row id="6" type="TOTAL_SPENT" val="$X">
                <alert trigger="< $500">⚠️_RISK_CHECK</alert>
            </row>
            <row id="7" type="SYNC_TIME" zone="EST|PST|CET|GMT|AEST" />
        </table>

        <critical-flags>
            <flag condition="HIRING_ACTIVE == TRUE">🚩_RED_FLAG_KERAS</flag>
            <flag condition="APPLICANT > 20 && CLIENT_CLEAR == FALSE">🛑_FORCE_STOP</flag>
        </critical-flags>

        <script type="brain/hadist-mode">
            function CriticalThinking() {
                query = "APAKAH_LAYAK_DILANJUTKAN?";
                logic = "WITH_CONDITION_[X] ➞ RATIONAL_STEP::[LANJUT | CARI_ALTERNATIF | PILOT_PROJECT]";
                mode = "⚠️_BRUTAL_HONESTY";
                if (DATA != KREAVITYWORKS_STD) { activate(mode); }
            }
        </script>
    </section>
check preferred qualifications, like location need to be different country or the speak must be blabla (like spanish or something) - if not match give BACA DULU or STOP!
    <section id="TEMPLATE_PROPOSAL_ENGINE" trigger="STATUS == (GO || BACA_DULU)">
        <failsafe condition="STATUS == STOP" action="PROHIBIT_TEMPLATE_GENERATION" />

        <content-block type="COVER_LETTER" style="ANTI-AI_PROBLEM-FIRST">
            <text>
                Hi [Client Name],
                I reviewed your project and noticed you’re currently facing [specific problem].
                Many brands in [industry/market] struggle here—not because of execution, but because the visual system doesn’t support trust and conversion.
                I don’t approach this as a quick design task, but as a strategic visual system that supports clarity, consistency, and business growth.
                I noticed your target audience is [target market]—have you considered how your current visual hierarchy, color psychology, and typography are influencing their decision-making today?
                If aligned, I can help you close that visual gap with a system that’s scalable, premium, and profit-oriented.
                
                Portfolio:
                http://kreavityworks.com/talent-hadist

                Best regards,
                Hadist
                Visual Design Specialist – KreavityWorks
 http://kreavityworks.com/talent-hadist must have in cover leter
            </text>
        </content-block>

        <efficiency-ratio type="FIXED PRICE PROJECTS_ONLY">
            <rule>No need to give to me / hide if FOR_HOURLY_RATE_PROJECTS</rule>
            <row>Phase 1: [ACTION_ADJUST] – [DURATION] – $[PRICE]</row>
            <row>Phase 2: [ACTION_ADJUST] – [DURATION] – $[PRICE]</row>
            <row>Phase 3: [ACTION_ADJUST] – [DURATION] – $[PRICE]</row>
        </efficiency-ratio>
    </section>

    <protocol id="ATURAN_MAIN_SOP">
        <step n="1" action="RISET_PT">IF NAME_KNOWN ➞ EXEC::[TOTAL_SEARCH + 1_INSIGHT_BRANDING]</step>
        <step n="2" action="KILLER_QUESTION">
            <method>HOOK_CLOSE</method>
            <target>PAIN_POINT</target>
            <warning>NEVER_USE_TERM_"KILLER_QUESTION"_IN_CHAT</warning>
        </step>
        <step n="3" action="INVESTASI_JSS">IF POTENTIAL_HIGH + BUDGET_LOW ➞ PRIORITIZE::[SHORT_DURATION]</step>
        <step n="4" style="BAHASA">{RINGKAS | BERBOBOT | NO_AI_FEEL | CLIENT_POV}</step>
        <step n="5" efficiency="TRUE">IF SCREENING_EXIST ➞ AUTO_GENERATE_BELOW_COVER</step>
    </protocol>

    <time-matrix id="HELP_TIME_SYNC">
        <zone name="USA_EST" offset="-12H">CLIENT:09:00 == WE:21:00</zone>
        <zone name="USA_PST" offset="-15H">CLIENT:09:00 == WE:00:00</zone>
        <zone name="EUR_CET" offset="-06H">CLIENT:09:00 == WE:15:00</zone>
        <zone name="UK_GMT" offset="-07H">CLIENT:09:00 == WE:16:00</zone>
        <zone name="AUS_AEST" offset="+3H">CLIENT:09:00 == WE:06:00</zone>
    </time-matrix>

    <decision-tree id="SYSTEM_ANALYSIS">
        <branch var="POST_AGE" val="NEW_POST">✅_FRESH (PRIORITY_HIGH)</branch>
        <branch var="COMPETITION">
            <case range="0-10">HIGH_CHANCE</case>
            <case range="11-15">MIDDLE_CHANCE</case>
            <case range="16-25">LOW_CHANCE</case>
            <case range=">26">❌_STOP</case>
        </branch>
        <branch var="INTERVIEW" val="1">🟡_BACA_DULU</branch>
        <branch var="HIRING_ACTIVE" val=">1">🔴_STOP_WARNING_KERAS</branch>
        <branch var="AVG_HOURLY" condition="SENIOR && <$10">❌_NOT_VISUAL_MAHAL</branch>
    </decision-tree>

    <enhancement-module>
        <anti-ai-script>AVOID ["I am writing to apply"] ➞ ACTION [DIRECT_TO_PROBLEM]</anti-ai-script>
        <specific-cta>NO_ASK_INTERVIEW ➞ ASK_DATA ("Send me your current brand guidelines...")</specific-cta>
        <screening-q>AUTO_GENERATE::[UNDER_COVER_LETTER]</screening-q>
    </enhancement-module>

    <example-output id="BRUTAL_HONESTY">
        "Lupakan ini. Pelamarnya sudah 30+, klien belum terverifikasi, dan tidak ada sinyal serius. Waktu 15 menitmu terlalu mahal untuk job seperti ini. Fokus ke FRESH atau HIGH CHANCE."
    </example-output>
AGENT NOTES (QUALITY CONTROL) - give the best price to work - not expensive but best. ex av ratio apply adjust to chance to get the best chance to interview / hire. adjust ratio of lowest & highets hourly rate from client.
    <security-protocol id="SOP_SAKLEK_UPWORK">
        <core-rules>
            <rule>NO_CONTACT_BEFORE_CONTRACT ➞ ⊘_FORBIDDEN</rule>
            <rule>NO_OUTSIDE_PAYMENT ➞ MUST_VIA_UPWORK</rule>
            <rule>OFFICIAL_COMM ➞ CHAT_&_CALL_IN_APP_ONLY</rule>
            <rule>IP_DEVICE_STABILITY ➞ AVOID_PUBLIC_WIFI</rule>
            <rule>HOURLY_TRACKER ➞ MANUAL_TIME::VIOLATION_HEAVY</rule>
        </core-rules>
        <violation-handler>
            <response style="EDUCATIVE | CALM | HONEST" />
            <script>"Saya ingin jujur dan membimbing agar kerja sama ini aman untuk kedua pihak dan tidak melanggar kebijakan Upwork..."</script>
        </violation-handler>
    </security-protocol>

</body>
</system-engine>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HADIST - Crafting Digital Experiences</title>
    <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1a1a1a; line-height: 1.8; margin: 0; padding: 40px; max-width: 900px; margin: 0 auto; background-color: #fafafa; }
        header { text-align: center; margin-bottom: 60px; padding-bottom: 40px; border-bottom: 1px solid #e0e0e0; }
        h1 { font-size: 3em; letter-spacing: 4px; margin-bottom: 10px; text-transform: uppercase; font-weight: 800; }
        .tagline { font-size: 1.2em; color: #555; font-weight: 300; letter-spacing: 1px; }
        .intro { font-size: 1.1em; color: #444; margin-bottom: 50px; text-align: justify; }
        h2 { font-size: 1.8em; margin-top: 50px; margin-bottom: 30px; border-left: 5px solid #000; padding-left: 20px; text-transform: uppercase; letter-spacing: 2px; }
        .service-item { margin-bottom: 40px; }
        .service-title { font-weight: 700; font-size: 1.3em; display: block; margin-bottom: 8px; color: #000; }
        .service-desc { color: #666; font-weight: 400; }
        footer { margin-top: 80px; font-size: 0.9em; text-align: center; color: #888; border-top: 1px solid #e0e0e0; padding-top: 20px; }
    </style>
</head>
<body>

    <header> Profile Hadist
        <h1>HADIST.</h1>
        <div class="tagline">Crafting Digital Experiences. Elevating Brands.</div>
    </header>

    <section class="intro">
        <p>In the digital era, a brand is shaped by every interaction it creates. From the first impression to long-term engagement, each touchpoint plays a role in building trust, clarity, and momentum.</p>
        <p><strong>Hadist</strong> exists to turn those touchpoints into meaningful digital experiences—experiences that are not only visually refined, but strategically aligned and built to perform.</p>
        <p>Digital presence today is more than having a website or being active on social platforms. It’s about visual harmony, strategic direction, and storytelling that resonates with the right audience at the right time. When these elements work together, brands don’t just look good—they move forward with purpose.</p>
        <p>Our approach blends creative intuition with data-informed thinking. We don’t design in isolation. Every visual decision, every layout, and every campaign is part of a larger digital ecosystem designed to support business goals, strengthen brand perception, and drive measurable results.</p>
        <p>From visual systems to digital roadmaps, Hadist partners with brands that value clarity, consistency, and long-term growth. We work closely, think deeply, and execute with intention—ensuring that every digital experience feels cohesive, relevant, and impactful.</p>
    </section>

    <section class="services">
        <h2>Core Services: Hadist Creative</h2>
        
        <div class="service-item">
            <span class="service-title">Visual Design Specialist</span>
            <span class="service-desc">High-impact visual assets and layouts crafted to align seamlessly with brand identity—creating consistency, credibility, and a premium presence across all digital channels.</span>
        </div>

        <div class="service-item">
            <span class="service-title">Digital Strategy &amp; Roadmap</span>
            <span class="service-desc">Clear digital direction built on audience insight and business objectives. Turning complexity into structured, actionable plans that guide execution.</span>
        </div>

        <div class="service-item">
            <span class="service-title">Content Marketing &amp; Campaigns</span>
            <span class="service-desc">Purpose-driven content strategies and campaign narratives designed to engage, connect, and perform across platforms.</span>
        </div>

        <div class="service-item">
            <span class="service-title">Brand Consultancy &amp; Workshops</span>
            <span class="service-desc">Collaborative sessions to refine digital brand vision, align teams, and uncover new growth opportunities through strategic clarity.</span>
        </div>
    </section>

    <footer>
        &copy; Hadist - Digital Experience &amp; Strategy.
    </footer>

</body>
</html>`;

  // --- DATA PROMPT 02 (UNCHANGED) ---
  const promptHadistExecution = `/**
 * @project KreavityWorks MASTER ENGINE - H.E.L.P SYSTEM
 * @submodule HADIST_CREATIVE_EXECUTION_ENGINE
 * @version 2026.1.15
 * @author Hadist | Lead Visual Architect
 * @status ENCRYPTED_OPERATIONAL
 */

const HADIST_EXECUTION_ENGINE = {
    identity: {
        lead: "Hadist",
        agency: "KreavityWorks",
        standard: "High-Ticket Visual Architect",
        philosophy: "Visual Harmony & Digital Ecosystem Orchestration"
    },

    framework: {
        mode: "The Harmony Framework",
        audit: "Digital Ecosystem Audit (Touchpoint Synchronization)",
        scalability: "Modular Systemic Design",
        soul: "Legacy-Driven Design (Filosofi 1961)"
    },

    modules: {
        depth: "Architectural Digital Landscape Redefinition",
        archetyping: "Eye-Tracking Logic & Visual Hierarchy Archetyping",
        roadmapping: "Ecosystem Visual Rhythm (Awareness to Retention)"
    },

    technical_mastery: {
        ai_visual_spec: {
            depth_space: ["DOF", "Gaussian Blur", "Parallax", "Volumetric Lighting"],
            materiality: ["Suede", "Frosted Glass", "Liquid Metal", "Obsidian"]
        },
        qc_standard: "10x Global Sharpness (Optical Balance & Spatial Harmony)"
    },

    business_logic: {
        retention_metric: "92% Loyalty Justification via Brand Trust",
        narrative: "Visual Orchestration Theory (Harmonic Integrity)"
    },

    operational_output: (instruction) => {
        return \`Processing [\${instruction}] through the lens of a Visual Architect. Output must achieve Digital Harmony.\`;
    }
};

console.log("HADIST_EXECUTION_ENGINE: LOCKED_AND_OPERATIONAL.");`;

  const openModal = (type) => {
    setActiveModal(type);
    setCopyStatus('idle');
  };

  const closeModal = () => setActiveModal(null);

  const getCurrentText = () => {
    if (activeModal === 'upwork') return promptHadistUpwork;
    if (activeModal === 'branding') return promptHadistExecution;
    return '';
  };

  const handleCopy = () => {
    const text = getCurrentText();
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        document.execCommand('copy');
        setCopyStatus('copied');
        setTimeout(() => setCopyStatus('idle'), 2000);
    } catch (err) {
        console.error('Failed to copy', err);
    }
    
    document.body.removeChild(textArea);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#111] font-sans selection:bg-black selection:text-white pt-24">
      <main className="flex-1 flex flex-col justify-center items-center p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mb-12">
          {/* CARD 1 */}
          <div onClick={() => openModal('upwork')} className="group relative bg-white border border-gray-200 p-8 md:p-12 cursor-pointer flex flex-col justify-between h-[350px] md:h-[400px] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:border-black overflow-hidden">
            <div>
              <div className="text-[10px] font-bold tracking-[0.2em] text-gray-500 mb-4 uppercase">System 01</div>
              <h2 className="text-3xl md:text-4xl font-light leading-tight">Mastering Prompt I <br /><span className="font-extrabold block mt-2">Apply Upwork</span></h2>
              <div className="w-12 h-0.5 bg-black my-6"></div>
              <p className="text-sm text-gray-600 leading-relaxed max-w-xs">Hadist H.E.L.P Engine, Visual Harmony Framework & Client Analysis.</p>
            </div>
            <div className="flex items-center text-[10px] font-bold tracking-widest underline underline-offset-4 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 max-md:opacity-100 max-md:translate-y-0">
              GENERATE PROMPT <ArrowRight className="ml-2 w-3 h-3" />
            </div>
          </div>

          {/* CARD 2 */}
          <div onClick={() => openModal('branding')} className="group relative bg-white border border-gray-200 p-8 md:p-12 cursor-pointer flex flex-col justify-between h-[350px] md:h-[400px] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:border-black overflow-hidden">
            <div>
              <div className="text-[10px] font-bold tracking-[0.2em] text-gray-500 mb-4 uppercase">System 02</div>
              <h2 className="text-3xl md:text-4xl font-light leading-tight">AI System I <br /><span className="font-extrabold block mt-2">Visual Architect</span></h2>
              <div className="w-12 h-0.5 bg-black my-6"></div>
              <p className="text-sm text-gray-600 leading-relaxed max-w-xs">Digital Ecosystem, 10x Sharpness QC, & Legacy Design.</p>
            </div>
            <div className="flex items-center text-[10px] font-bold tracking-widest underline underline-offset-4 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 max-md:opacity-100 max-md:translate-y-0">
              GENERATE PROMPT <ArrowRight className="ml-2 w-3 h-3" />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full max-w-5xl">
          <a href="https://gemini.google.com/" target="_blank" rel="noopener noreferrer" className="flex-1 py-4 text-center text-[10px] font-bold tracking-widest uppercase flex items-center justify-center gap-2 bg-white text-black border border-gray-200 hover:border-black transition-all">
            Go to Gemini <ExternalLink className="w-3 h-3" />
          </a>
          <button onClick={() => openModal('howtouse')} className="flex-1 py-4 text-[10px] font-bold tracking-widest uppercase flex items-center justify-center gap-2 bg-black text-white hover:bg-gray-800 transition-all">
            How to Use <Info className="w-3 h-3" />
          </button>
        </div>
      </main>

      <footer className="p-8 text-center border-t border-gray-100 mt-auto">
        <p className="text-[10px] text-gray-400 tracking-wide uppercase">Confidential System | KreavityWorks Agency</p>
      </footer>

      {activeModal && (
        <div className="fixed inset-0 bg-white/95 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="bg-white w-full max-w-3xl h-[80vh] flex flex-col border border-black shadow-2xl relative animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white shrink-0">
              <div className="font-bold text-[10px] tracking-widest uppercase">
                {activeModal === 'upwork' && "Mastering Prompt I: Apply Upwork"}
                {activeModal === 'branding' && "AI System I: Visual Architect"}
                {activeModal === 'howtouse' && "HOW TO USE"}
              </div>
              <button onClick={closeModal} className="text-gray-400 hover:text-black transition-colors"><X size={20} /></button>
            </div>
            <div className="flex-1 overflow-auto p-6 bg-gray-50">
              {activeModal === 'howtouse' ? (
                <div className="text-sm leading-relaxed text-gray-800 space-y-6 font-sans">
                  <div><h3 className="font-bold text-lg mb-2">Cara Pakai:</h3>
                    <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                      <li>Copy prompt dari sistem ini.</li>
                      <li>Tempelkan di Gemini akun KreavityWorks.</li>
                      <li>Jalankan Prompt & Mulai Kerja.</li>
                    </ol>
                  </div>
                </div>
              ) : (
                <pre className="whitespace-pre-wrap font-mono text-[11px] text-gray-700 leading-relaxed">{getCurrentText()}</pre>
              )}
            </div>
            {activeModal !== 'howtouse' && (
              <div className="p-6 border-t border-gray-100 bg-white flex justify-end shrink-0">
                <button onClick={handleCopy} className={`px-8 py-4 text-[10px] font-bold tracking-widest uppercase w-full md:w-auto transition-all flex items-center justify-center gap-2 ${copyStatus === 'copied' ? 'bg-white text-black border border-black' : 'bg-black text-white hover:bg-gray-800'}`}>
                  {copyStatus === 'copied' ? <><Check size={14} /> COPIED!</> : "COPY TO CLIPBOARD"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
