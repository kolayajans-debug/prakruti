import{useState,useEffect,useCallback,useMemo,createContext,useContext}from"react";

/* ═══ CSS ═══ */
const CSS=`@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300;1,9..40,400&display=swap');
:root{--bg:#0C0B09;--bg2:#141310;--bg3:#1C1B17;--bg4:#252420;--bd:rgba(255,255,255,.06);--bd2:rgba(255,255,255,.1);--t:#EDE8DF;--t2:#9E978C;--t3:#635E56;--gl:#B8956A;--gld:rgba(184,149,106,.1);--glg:rgba(184,149,106,.3);--grn:#5A8F5E;--red:#C46A42;--fd:'Instrument Serif',serif;--fb:'DM Sans',sans-serif;--r:16px;--rs:10px;--tr:.25s cubic-bezier(.4,0,.2,1);--dc:var(--gl);--dd:var(--gld);--dg:var(--glg)}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}body{font-family:var(--fb);background:var(--bg);color:var(--t);-webkit-font-smoothing:antialiased;line-height:1.6;min-height:100vh;overflow-x:hidden}h1,h2,h3,h4{font-family:var(--fd);font-weight:400;line-height:1.1}button{font-family:var(--fb);cursor:pointer;background:none;border:none;color:inherit}ul,ol{list-style:none}input,textarea{font-family:var(--fb);background:none;border:none;color:var(--t);outline:none}.pg{min-height:100vh;background:var(--bg);display:flex;flex-direction:column}
@keyframes fu{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}@keyframes fi{from{opacity:0}to{opacity:1}}@keyframes od{0%{transform:scale(1) translate(0)}33%{transform:scale(1.08) translate(15px,-12px)}66%{transform:scale(.95) translate(-10px,10px)}100%{transform:scale(1) translate(0)}}@keyframes spin{to{transform:rotate(360deg)}}@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
.bsm{font-family:var(--fd);font-size:1.15rem;color:var(--t)}.bdt{color:var(--gl)}
.btn{background:var(--gl);color:var(--bg);font-weight:600;letter-spacing:.02em;border-radius:50px;transition:all var(--tr);display:inline-flex;align-items:center;justify-content:center;gap:.5rem;padding:.9rem 2rem;font-size:.88rem}.btn:hover{opacity:.88;transform:translateY(-1px);box-shadow:0 8px 30px var(--glg)}.bl{width:100%}
.bgst{color:var(--t2);border:1px solid var(--bd2);border-radius:50px;transition:all var(--tr)}.bgst:hover{background:var(--bg3);color:var(--t)}.bxs{padding:.3rem .75rem;font-size:.72rem}
.lsw{font-size:.7rem;font-weight:600;color:var(--t2);border:1px solid var(--bd2);padding:.25rem .6rem;border-radius:50px;transition:all var(--tr)}.lsw:hover{color:var(--t);border-color:var(--gl)}
.orb{position:absolute;border-radius:50%;filter:blur(90px);animation:od 14s ease-in-out infinite}.o1{width:350px;height:350px;background:var(--glg);top:-100px;left:-80px}.o2{width:280px;height:280px;background:rgba(90,143,94,.15);bottom:-80px;right:-60px;animation-delay:-6s}
/* ── Welcome (single screen) ── */
.wel{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:2rem 1.5rem;position:relative;overflow:hidden;text-align:center}.wel-c{position:relative;z-index:1;max-width:380px;width:100%}.wel-logo{font-family:var(--fd);font-size:2.4rem;color:var(--t);margin-bottom:.25rem;letter-spacing:-.03em}.wel-sub{font-size:.72rem;letter-spacing:.15em;text-transform:uppercase;color:var(--gl);margin-bottom:2rem}.wel-features{display:flex;flex-direction:column;gap:.85rem;margin-bottom:2.5rem;text-align:left}.wel-feat{display:flex;gap:.75rem;align-items:flex-start}.wel-feat-icon{font-size:1.3rem;flex-shrink:0;margin-top:.1rem}.wel-feat-txt{font-size:.86rem;color:var(--t2);line-height:1.5}.wel-feat-txt strong{color:var(--t);font-weight:500}.wel-note{font-size:.72rem;color:var(--t3);margin-top:1rem}
/* ── Quiz ── */
.qz{display:flex;flex-direction:column;min-height:100vh}.qn{position:sticky;top:0;z-index:100;display:flex;align-items:center;gap:1rem;padding:1rem 1.25rem;background:rgba(12,11,9,.92);backdrop-filter:blur(20px);border-bottom:1px solid var(--bd)}.qb{font-size:1.2rem;color:var(--t2);padding:.25rem .5rem}.qp{display:flex;align-items:center;gap:.75rem;flex:1}.qtr{flex:1;height:3px;background:var(--bg4);border-radius:2px;overflow:hidden}.qfl{height:100%;background:var(--gl);border-radius:2px;transition:width .4s ease}.qc{font-size:.72rem;color:var(--t3)}.qbd{flex:1;display:flex;align-items:center;justify-content:center;padding:2rem 1.5rem}.qcd{width:100%;max-width:520px;animation:fu .25s ease both}.qct{display:inline-flex;align-items:center;gap:.4rem;font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;color:var(--gl);background:var(--gld);border:1px solid var(--glg);padding:.3rem .8rem;border-radius:50px;margin-bottom:1.5rem}.qq{font-size:clamp(1.4rem,4vw,2rem);color:var(--t);margin-bottom:1.75rem;line-height:1.25}.qos{display:flex;flex-direction:column;gap:.6rem}.qo{display:flex;align-items:center;gap:.85rem;padding:1rem 1.1rem;background:var(--bg2);border:1px solid var(--bd);border-radius:var(--r);text-align:left;font-size:.86rem;color:var(--t2);line-height:1.5;transition:all var(--tr);width:100%}.qo:hover{border-color:var(--bd2);background:var(--bg3)}.qon{background:var(--gld);border-color:var(--gl);color:var(--t)}.qh{text-align:center;font-size:.72rem;color:var(--t3);margin-top:1.25rem;font-style:italic}
/* ── Result ── */
.rp{padding-bottom:80px}.rh{padding:4rem 1.5rem 2rem;text-align:center;background:radial-gradient(ellipse at center,var(--dd) 0%,transparent 70%);animation:fi .5s ease both}.rn{font-size:clamp(4.5rem,16vw,7.5rem);color:var(--dc);line-height:.88;margin:.4rem 0;text-shadow:0 0 50px var(--dg);letter-spacing:-.04em}.re{font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;color:var(--t3)}.rs{font-family:var(--fd);font-style:italic;color:var(--t2);font-size:.95rem;margin:.4rem 0 1rem}.rs em{color:var(--t)}.rd{font-size:.9rem;color:var(--t2);max-width:460px;margin:0 auto 2rem;line-height:1.7}.rbs{max-width:340px;margin:0 auto 2rem;display:flex;flex-direction:column;gap:.7rem}.rbr{display:flex;align-items:center;gap:.7rem}.rbl{font-family:var(--fd);font-size:.92rem;width:52px;text-align:right;flex-shrink:0}.rbt{flex:1;height:4px;background:var(--bg3);border-radius:2px;overflow:hidden}.rbf{height:100%;border-radius:2px;transition:width 1.2s ease;opacity:.85}.rbp{font-size:.68rem;color:var(--t3);width:30px}
/* Free result content */
.free-section{max-width:640px;margin:0 auto;padding:0 1.5rem 2rem}.free-grid{display:grid;grid-template-columns:1fr 1fr;gap:.75rem;margin-bottom:2rem}
/* Paywall */
.paywall{max-width:640px;margin:0 auto;padding:1.5rem;animation:fu .4s ease both}.pw-card{background:linear-gradient(135deg,var(--bg2),var(--bg3));border:1px solid var(--gl);border-radius:20px;padding:2rem 1.5rem;text-align:center;position:relative;overflow:hidden}.pw-glow{position:absolute;top:-60px;right:-60px;width:200px;height:200px;background:var(--glg);border-radius:50%;filter:blur(80px);pointer-events:none}.pw-badge{display:inline-block;font-size:.68rem;letter-spacing:.14em;text-transform:uppercase;color:var(--gl);background:var(--gld);border:1px solid var(--glg);padding:.3rem .8rem;border-radius:50px;margin-bottom:1rem;position:relative}.pw-title{font-family:var(--fd);font-size:1.6rem;color:var(--t);margin-bottom:.75rem;position:relative}.pw-features{display:flex;flex-direction:column;gap:.6rem;margin:1.25rem 0 1.5rem;text-align:left;position:relative}.pw-feat{display:flex;gap:.5rem;align-items:flex-start;font-size:.82rem;color:var(--t2);line-height:1.5}.pw-feat-icon{color:var(--gl);flex-shrink:0}.pw-price{font-family:var(--fd);font-size:2rem;color:var(--t);margin-bottom:.25rem;position:relative}.pw-price-sub{font-size:.72rem;color:var(--t3);margin-bottom:1.25rem;position:relative}
/* ── Dashboard ── */
.dsh{padding-bottom:68px}.dhd{padding:1.5rem 1.5rem 1.15rem;border-bottom:1px solid var(--bd)}.dht{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:.6rem}.dha{display:flex;gap:.4rem;align-items:center}.dbg{font-size:.7rem;font-weight:600;padding:.25rem .65rem;border-radius:50px;border:1px solid}.dgr{font-size:.76rem;color:var(--t3);display:block;margin-bottom:.1rem}.dti{font-size:clamp(1.5rem,5vw,2.2rem);margin-bottom:.4rem;letter-spacing:-.02em}.dtg{display:flex;gap:.4rem;flex-wrap:wrap}.dtgi{font-size:.7rem;color:var(--t2);background:var(--bg2);border:1px solid var(--bd);padding:.2rem .6rem;border-radius:50px}
/* AI input */
.aia{padding:1rem 1.5rem;border-bottom:1px solid var(--bd)}.ai-q{font-size:1rem;margin-bottom:.7rem}
.ai-iw{display:flex;gap:.5rem;align-items:flex-end}.ai-in{flex:1;background:var(--bg2);border:1px solid var(--bd);border-radius:var(--r);padding:.75rem .9rem;font-size:.85rem;resize:none;min-height:40px;max-height:100px;line-height:1.5;transition:border-color var(--tr)}.ai-in:focus{border-color:var(--gl)}.ai-in::placeholder{color:var(--t3)}.ai-sd{background:var(--gl);color:var(--bg);border-radius:50%;width:36px;height:36px;display:flex;align-items:center;justify-content:center;font-size:.95rem;flex-shrink:0}.ai-sd:disabled{opacity:.3;cursor:not-allowed}.ai-ld{display:flex;align-items:center;gap:.5rem;padding:.5rem 0;font-size:.76rem;color:var(--t3)}.ai-sp{width:14px;height:14px;border:2px solid var(--bd2);border-top-color:var(--gl);border-radius:50%;animation:spin .6s linear infinite}
.ai-done{display:flex;align-items:center;gap:.5rem;background:var(--bg2);border:1px solid var(--bd);border-radius:var(--rs);padding:.55rem .8rem}.ai-done-icon{font-size:.85rem;color:var(--dc)}.ai-done-txt{font-size:.74rem;color:var(--t3);flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
/* Cards */
.stk{display:flex;flex-direction:column;gap:.7rem}.cd{background:var(--bg2);border:1px solid var(--bd);border-radius:var(--r);padding:1.15rem;animation:fu .3s ease both}.ca{border-color:var(--dc);background:linear-gradient(135deg,var(--bg2),var(--bg3))}
.chd{display:flex;justify-content:space-between;align-items:center;margin-bottom:.65rem}.ct{display:block;font-size:.66rem;letter-spacing:.12em;text-transform:uppercase;color:var(--dc);margin-bottom:.65rem}.chd .ct{margin-bottom:0}.cm{font-size:.66rem;color:var(--t3)}
.cl{display:flex;flex-direction:column;gap:.35rem}.cl li{font-size:.8rem;color:var(--t2);line-height:1.45;padding-left:.9rem;position:relative}.cl li::before{content:'·';position:absolute;left:0;color:var(--dc);font-weight:700}
.hg{display:grid;grid-template-columns:1fr 1fr;gap:.35rem}.hi{font-size:.78rem;color:var(--t2);line-height:1.4}
.fc{display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;margin-top:.2rem}.fl{display:block;font-size:.66rem;letter-spacing:.1em;text-transform:uppercase;margin-bottom:.4rem}.fg{color:var(--grn)}.fr{color:var(--red)}
.rl{display:flex;flex-direction:column;gap:.5rem}.rl li{display:flex;gap:.6rem;align-items:flex-start;font-size:.8rem;color:var(--t2);line-height:1.45}.rln{width:18px;height:18px;border-radius:4px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:.58rem;font-weight:600;background:var(--dd);color:var(--dc)}
.eg{display:grid;grid-template-columns:1fr 1fr;gap:.45rem}.ei{background:var(--bg3);border-radius:var(--rs);padding:.65rem .8rem;font-size:.8rem;color:var(--t2)}
.sp{font-size:.82rem;color:var(--t2);line-height:1.6;margin-top:.15rem}
/* Daily tip card */
.dy-card{background:var(--bg2);border:1px solid var(--bd);border-radius:var(--r);padding:.95rem 1.05rem;animation:fu .3s ease both}.dy-hd{display:flex;align-items:center;gap:.5rem;margin-bottom:.5rem}.dy-icon{font-size:1.1rem}.dy-title{font-size:.78rem;font-weight:500;color:var(--t)}.dy-body{font-size:.8rem;color:var(--t2);line-height:1.55;white-space:pre-line}
/* Checklist */
.rit-check{display:flex;align-items:flex-start;gap:.55rem;padding:.45rem 0;font-size:.78rem;color:var(--t2);line-height:1.4;cursor:pointer;transition:opacity var(--tr)}.rit-check.done{opacity:.3;text-decoration:line-through}.rit-cb{width:17px;height:17px;border-radius:4px;border:1.5px solid var(--bd2);flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:.55rem;transition:all var(--tr)}.rit-cb.on{background:var(--dc);border-color:var(--dc);color:var(--bg)}.rit-prog{height:3px;background:var(--bg4);border-radius:2px;margin-bottom:.5rem;overflow:hidden}.rit-prog-fill{height:100%;background:var(--dc);transition:width .4s ease}
/* Wisdom */
.wisdom{font-family:var(--fd);font-style:italic;font-size:.88rem;color:var(--t);line-height:1.5;text-align:center;padding:.4rem 0}
/* Accordion */
.acc{border:1px solid var(--bd);border-radius:var(--r);overflow:hidden;background:var(--bg2)}.acc+.acc{margin-top:.45rem}.acc-hd{display:flex;align-items:center;justify-content:space-between;padding:.9rem 1.05rem;cursor:pointer;transition:background var(--tr)}.acc-hd:hover{background:var(--bg3)}.acc-hd-left{display:flex;align-items:center;gap:.5rem}.acc-icon{font-size:1rem}.acc-title{font-size:.82rem;font-weight:500;color:var(--t)}.acc-arrow{color:var(--t3);font-size:.7rem;transition:transform var(--tr)}.acc-arrow.open{transform:rotate(180deg)}.acc-body{padding:0 1.05rem 1.05rem;animation:fu .2s ease both}
/* Mood report */
.mood-week{display:flex;flex-direction:column;gap:.35rem;margin-top:.4rem}.mood-row{display:flex;align-items:center;gap:.5rem;font-size:.76rem}.mood-day{width:26px;color:var(--t3);font-weight:500;flex-shrink:0}.mood-text{color:var(--t2);flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mood-none{color:var(--t3);font-style:italic}
.wr-stat{display:flex;justify-content:space-between;margin-top:.6rem;padding-top:.6rem;border-top:1px solid var(--bd)}.wr-stat-item{text-align:center;flex:1}.wr-stat-val{font-family:var(--fd);font-size:1.15rem;color:var(--dc)}.wr-stat-label{font-size:.56rem;color:var(--t3);text-transform:uppercase;letter-spacing:.08em}
/* AI monthly report */
.ai-report{background:var(--bg2);border:1px solid var(--dc);border-radius:var(--r);padding:1.15rem;animation:fu .3s ease both}.ai-report-txt{font-size:.82rem;color:var(--t2);line-height:1.65;white-space:pre-line}
/* Notification */
.notif-bar{display:flex;align-items:center;justify-content:space-between;padding:.55rem 1.5rem;background:var(--bg2);border-bottom:1px solid var(--bd);font-size:.74rem;color:var(--t2)}.notif-btn{font-size:.66rem;font-weight:600;color:var(--gl);border:1px solid var(--gl);padding:.2rem .6rem;border-radius:50px}
/* Bottom nav — FIXED properly */
.bnv{position:fixed;bottom:0;left:0;right:0;z-index:200;background:rgba(12,11,9,.98);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-top:1px solid var(--bd);display:flex;padding:.45rem .8rem calc(.45rem + env(safe-area-inset-bottom, 0px));justify-content:space-around}.bnb{display:flex;flex-direction:column;align-items:center;gap:.12rem;padding:.3rem 1rem;border-radius:var(--rs);transition:all var(--tr)}.bnbn{background:var(--dd)}.bni{font-size:1rem;color:var(--t3)}.bnbn .bni{color:var(--dc)}.bnl{font-size:.58rem;font-weight:500;color:var(--t3)}.bnbn .bnl{color:var(--dc)}
.dcc{padding:1.15rem 1.5rem;max-width:640px;margin:0 auto;animation:fu .2s ease both}
@media(max-width:640px){.rg,.fc,.hg,.eg,.free-grid{grid-template-columns:1fr}.rn{font-size:clamp(3.5rem,18vw,6rem)}}`;

/* ═══ CORE ═══ */
const Lx=createContext();const useLang=()=>useContext(Lx);
function useLS(k,i){const[v,s]=useState(()=>{try{const x=localStorage.getItem(k);return x?JSON.parse(x):i}catch{return i}});useEffect(()=>{try{localStorage.setItem(k,JSON.stringify(v))}catch{}},[k,v]);return[v,s]}
function todayStr(){return new Date().toDateString()}
const cols={vata:"#B8956A",pitta:"#C46A42",kapha:"#5A8F5E"};const dims={vata:"rgba(184,149,106,.08)",pitta:"rgba(196,106,66,.08)",kapha:"rgba(90,143,94,.08)"};const glows={vata:"rgba(184,149,106,.25)",pitta:"rgba(196,106,66,.25)",kapha:"rgba(90,143,94,.25)"};
function getSeason(){const m=new Date().getMonth();if(m>=2&&m<=4)return"spring";if(m>=5&&m<=7)return"summer";if(m>=8&&m<=10)return"autumn";return"winter";}
const SI={spring:"🌸",summer:"☀️",autumn:"🍂",winter:"❄️"};const sKey={spring:"sSpr",summer:"sSum",autumn:"sAut",winter:"sWin"};
const catMap={body:"cBody",digestion:"cDig",sleep:"cSlp",mind:"cMind",emotion:"cEmo",lifestyle:"cLife"};

/* ═══ i18n ═══ */
const TX={en:{welTitle:"Prakruti",welSub:"Ayurvedic Wellness & Daily Dosha Guide",welF1:"🕉️",welF1t:"<strong>Discover your Dosha</strong> — 15 questions to reveal your Ayurvedic mind-body type",welF2:"🤖",welF2t:"<strong>AI Wellness Advisor</strong> — daily personalized food, ritual & skin care tips based on how you feel",welF3:"📊",welF3t:"<strong>Track & Improve</strong> — mood tracking, daily checklists, and monthly AI wellness reports",welBtn:"Start Free Quiz →",welNote:"Free · 3 min · No account needed",cBody:"Physical",cDig:"Digestion",cSlp:"Sleep",cMind:"Mind",cEmo:"Emotions",cLife:"Lifestyle",qhint:"Tap the answer that fits you most",qsee:"See My Results ✦",rYour:"Your constitution is",rWith:"with",rInf:"influence",rStr:"Strengths",rImb:"Imbalanced",rHerb:"Herbs",rFav:"✓ Favor",rAvd:"✕ Avoid",pwBadge:"PREMIUM",pwTitle:"Unlock Your Full Plan",pwF1:"✦ AI-powered daily food, ritual & skin tips",pwF2:"✦ Daily wellness checklist & tracking",pwF3:"✦ Monthly AI mood analysis & insights",pwF4:"✦ Seasonal Ayurvedic guidance",pwPrice:"$4.99",pwPriceSub:"/month · Cancel anytime",pwBtn:"Start 7-Day Free Trial",pwSkip:"Maybe later",dPlan:"Plan",dRtk:"Retake",dHow:"How are you feeling today?",dHowPh:"e.g. headache, tired, stressed...",dyH:"Describe how you feel for personalized daily tips.",gM:"Good morning",gA:"Good afternoon",gE:"Good evening",sSpr:"Spring",sSum:"Summer",sAut:"Autumn",sWin:"Winter",aiL:"✦ Prakruti AI",aiTh:"Analyzing...",today:"Today",discover:"Discover",report:"Report",ritT:"DAILY CHECKLIST",ritD:"done",wisT:"Daily Wisdom",aiFood:"🍽️ Eat Today",aiRitual:"🧘 Do Today",aiSkin:"🧴 Skin Today",aiMove:"🏃 Move Today",aiAvoid:"⛔ Avoid Today",accNut:"Nutrition Guide",accMorn:"Morning Ritual",accSlp:"Sleep Protocol",accHerb:"Herbs & Supplements",accSeason:"Seasonal Advice",accEx:"Exercise Guide",accSkin:"Skin Care Guide",profT:"Your Dosha Profile",noCI:"—",wrT:"This Week",wrC:"Check-ins",wrS:"Streak",wrMonth:"Monthly AI Insight",wrMonthBtn:"Generate Monthly Report ✦",wrMonthWait:"Analyzing your month...",notifQ:"Enable reminders?",notifY:"Enable",rNut:"Nutrition",rMorn:"Morning Ritual",rSlp:"Sleep Protocol",rEx:"Exercise"},
tr:{welTitle:"Prakruti",welSub:"Ayurvedik Sağlık & Günlük Dosha Rehberi",welF1:"🕉️",welF1t:"<strong>Dosha'nı Keşfet</strong> — 15 soru ile Ayurvedik yapını öğren",welF2:"🤖",welF2t:"<strong>AI Sağlık Danışmanı</strong> — ruh haline göre günlük beslenme, ritüel ve cilt bakım önerileri",welF3:"📊",welF3t:"<strong>Takip & Gelişim</strong> — ruh hali takibi, günlük checklist ve aylık AI sağlık raporu",welBtn:"Ücretsiz Teste Başla →",welNote:"Ücretsiz · 3 dk · Hesap gerekmez",cBody:"Fiziksel",cDig:"Sindirim",cSlp:"Uyku",cMind:"Zihin",cEmo:"Duygular",cLife:"Yaşam Tarzı",qhint:"Sizi en iyi tanımlayan seçeneğe dokunun",qsee:"Sonuçlarımı Gör ✦",rYour:"Senin anayasan",rWith:"ve",rInf:"etkisi",rStr:"Güçlü Yanlar",rImb:"Dengesizlikte",rHerb:"Bitkiler",rFav:"✓ Tüket",rAvd:"✕ Kaçın",pwBadge:"PREMİUM",pwTitle:"Tam Planını Aç",pwF1:"✦ AI destekli günlük beslenme, ritüel ve cilt önerileri",pwF2:"✦ Günlük checklist ve takip",pwF3:"✦ Aylık AI ruh hali analizi ve öneriler",pwF4:"✦ Mevsimsel Ayurvedik rehberlik",pwPrice:"₺149",pwPriceSub:"/ay · İstediğin zaman iptal",pwBtn:"7 Gün Ücretsiz Dene",pwSkip:"Şimdilik geç",dPlan:"Planın",dRtk:"Yeniden",dHow:"Bugün nasıl hissediyorsun?",dHowPh:"ör. Başım ağrıyor, yorgunum, stres...",dyH:"Nasıl hissettiğini yaz, günlük ipuçların oluşsun.",gM:"Günaydın",gA:"İyi günler",gE:"İyi akşamlar",sSpr:"İlkbahar",sSum:"Yaz",sAut:"Sonbahar",sWin:"Kış",aiL:"✦ Prakruti AI",aiTh:"Analiz ediliyor...",today:"Bugün",discover:"Keşfet",report:"Rapor",ritT:"GÜNLÜK CHECKLIST",ritD:"tamam",wisT:"Günün Bilgeliği",aiFood:"🍽️ Bugün Ye",aiRitual:"🧘 Bugün Yap",aiSkin:"🧴 Bugün Cilt",aiMove:"🏃 Bugün Hareket",aiAvoid:"⛔ Bugün Kaçın",accNut:"Beslenme Rehberi",accMorn:"Sabah Ritüeli",accSlp:"Uyku Protokolü",accHerb:"Bitkiler & Takviyeler",accSeason:"Mevsimsel Tavsiyeler",accEx:"Egzersiz Rehberi",accSkin:"Cilt Bakım Rehberi",profT:"Dosha Profilin",noCI:"—",wrT:"Bu Hafta",wrC:"Giriş",wrS:"Seri",wrMonth:"Aylık AI Değerlendirme",wrMonthBtn:"Aylık Rapor Oluştur ✦",wrMonthWait:"Ayın analiz ediliyor...",notifQ:"Hatırlatmaları aç?",notifY:"Aç",rNut:"Beslenme",rMorn:"Sabah Ritüeli",rSlp:"Uyku Protokolü",rEx:"Egzersiz"}};

/* ═══ DOSHA DATA (same structure both langs, compact) ═══ */
const DD={en:{vata:{name:"Vata",el:"Air & Space",sym:"🌬️",desc:"Creative and energetic. Imbalanced: anxiety, dryness.",str:["Creative","Quick learner","Enthusiastic","Adaptable"],ch:["Anxiety","Irregular sleep","Sensitive digestion","Cold extremities"],fav:["Warm, cooked, oily foods","Sweet, sour, salty","Root vegetables","Ghee & sesame oil","Warm teas","Rice, wheat, oats"],avd:["Raw & cold foods","Dry crackers","Carbonated drinks","Excess caffeine","Bitter foods"],morn:["Wake by 6 AM","Sesame oil massage","Warm ginger-lemon water","10 min gentle yoga","Warm breakfast"],ex:["Gentle yoga","Nature walks","Swimming","Tai chi","Dance"],slp:["Bed by 10 PM","Warm oil foot massage","No screens 1hr before","Warm dark room","Chamomile tea"],herb:["Ashwagandha — calms","Shatavari — nourishes","Triphala — digestion","Brahmi — quiets mind"],skin:["Apply sesame or almond oil daily","Use gentle oil-based cleansers","Warm water face wash only","Honey + milk hydrating mask weekly","Drink warm water all day"]},pitta:{name:"Pitta",el:"Fire & Water",sym:"🔥",desc:"Sharp-minded and driven. Imbalanced: anger, burnout.",str:["Natural leader","Sharp intellect","Decisive","Strong digestion"],ch:["Anger","Perfectionism","Overheating","Burnout"],fav:["Cool foods","Sweet, bitter, astringent","Cucumber, coconut, greens","Coconut oil & ghee","Mint teas","Barley, oats"],avd:["Spicy foods","Red meat","Alcohol & caffeine","Sour fruits","Fried foods"],morn:["Wake by 6 AM","Cool face wash","Sitali pranayama","Moderate yoga","Light breakfast"],ex:["Swimming","Cycling","Cooling yoga","Hiking","Team sports"],slp:["Sleep by 10-11 PM","Cool bedroom","No late work","Coconut oil massage","Rose tea"],herb:["Brahmi — cools","Amalaki — anti-inflammatory","Neem — purifies","Shatavari — balances"],skin:["Use coconut oil or aloe vera","Rose water toner daily","Avoid sun 11am-3pm","Sandalwood + rose water mask","Go natural — no harsh chemicals"]},kapha:{name:"Kapha",el:"Earth & Water",sym:"🌿",desc:"Loyal and patient. Imbalanced: lethargy, stagnation.",str:["Stable","Loyal","Patient","Enduring"],ch:["Lethargy","Weight gain","Comfort attachment","Slow metabolism"],fav:["Light, dry, warm foods","Pungent, bitter, astringent","Legumes & greens","Honey","Ginger & pepper teas","Millet, buckwheat"],avd:["Heavy, oily, cold foods","Excess dairy","Sweets","Wheat & bread","Fried foods"],morn:["Wake by 6 AM strictly","Dry brushing","Ginger-honey-pepper water","Vigorous exercise","Light breakfast"],ex:["Running","Vinyasa yoga","HIIT","Dancing","Uphill cycling"],slp:["Sleep 10 PM, wake 6 AM","No napping","Dry warm room","Evening walk","Tulsi tea"],herb:["Trikatu — metabolism","Guggulu — reduces Kapha","Tulsi — uplifts","Triphala — cleanses"],skin:["Dry brush before shower","Light oils — jojoba or sunflower","Chickpea flour exfoliation 2x/week","Steam face with eucalyptus","No heavy creams"]}},
tr:{vata:{name:"Vata",el:"Hava & Uzay",sym:"🌬️",desc:"Yaratıcı ve enerjik. Dengesizlikte kaygı, kuruluk.",str:["Yaratıcı","Hızlı öğrenen","Coşkulu","Değişime açık"],ch:["Kaygı","Düzensiz uyku","Hassas sindirim","Soğuk el-ayak"],fav:["Sıcak, pişmiş, yağlı","Tatlı, ekşi, tuzlu","Kök sebzeler","Ghee, susam yağı","Sıcak çaylar","Pirinç, buğday, yulaf"],avd:["Çiğ ve soğuk","Kuru kraker","Gazlı içecekler","Kafein","Acı ve buruk"],morn:["06:00'da uyan","Susam yağı masajı","Zencefilli limonlu su","10 dk hafif yoga","Sıcak kahvaltı"],ex:["Hafif yoga","Doğa yürüyüşü","Yüzme","Tai chi","Dans"],slp:["22:00'da yat","Sıcak yağ ayak masajı","Ekran yok","Sıcak karanlık oda","Papatya çayı"],herb:["Ashwagandha — sakinleştirir","Shatavari — besler","Triphala — sindirim","Brahmi — yatıştırır"],skin:["Günlük susam veya badem yağı","Yumuşak yağ bazlı temizleyici","Sadece ılık suyla yıka","Haftalık bal+süt maskesi","Gün boyu ılık su iç"]},pitta:{name:"Pitta",el:"Ateş & Su",sym:"🔥",desc:"Keskin zekalı. Dengesizlikte öfke, tükenmişlik.",str:["Lider","Keskin zeka","Kararlı","Güçlü sindirim"],ch:["Öfke","Mükemmeliyetçilik","Isınma","Tükenmişlik"],fav:["Serin yiyecekler","Tatlı, acı, buruk","Salatalık, hindistan cevizi","Hindistan cevizi yağı","Nane çayları","Arpa, yulaf"],avd:["Baharatlı","Kırmızı et","Alkol, kafein","Ekşi meyveler","Kızartma"],morn:["06:00'da uyan","Serin suyla yüz yıka","Sitali pranayama","Orta şiddetli yoga","Hafif kahvaltı"],ex:["Yüzme","Bisiklet","Serinletici yoga","Doğa yürüyüşü","Takım sporları"],slp:["22-23:00'da uyu","Serin oda","Geç çalışma yapma","Hindistan cevizi yağı masajı","Gül çayı"],herb:["Brahmi — serinletir","Amalaki — anti-inflamatuar","Neem — arındırır","Shatavari — dengeler"],skin:["Hindistan cevizi yağı veya aloe vera","Günlük gül suyu tonik","11-15 arası güneşten kaçın","Sandal ağacı+gül suyu maskesi","Doğal ürünler kullan"]},kapha:{name:"Kapha",el:"Toprak & Su",sym:"🌿",desc:"Sadık, sabırlı. Dengesizlikte letarji, durgunluk.",str:["İstikrarlı","Sadık","Sabırlı","Dayanıklı"],ch:["Halsizlik","Kilo alma","Bağımlılık","Yavaş metabolizma"],fav:["Hafif, kuru, sıcak","Acı, yakıcı, buruk","Baklagiller, yeşillikler","Bal","Zencefil, karabiber çayları","Darı, karabuğday"],avd:["Ağır, yağlı, soğuk","Süt ürünleri","Şeker","Buğday, ekmek","Tuzlu, kızartılmış"],morn:["06:00'da kesinlikle uyan","Kuru fırçalama","Zencefil-bal-karabiber su","Yoğun egzersiz","Hafif kahvaltı"],ex:["Koşu","Vinyasa yoga","HIIT","Dans","Yokuş bisikleti"],slp:["22:00-06:00","Gündüz uyuma","Kuru sıcak oda","Akşam yürüyüşü","Tulsi çayı"],herb:["Trikatu — metabolizma","Guggulu — azaltır","Tulsi — canlandırır","Triphala — temizler"],skin:["Duştan önce kuru fırçalama","Hafif yağlar — jojoba, ayçiçeği","Haftada 2x nohut unu peeling","Okaliptüslü buhar","Ağır krem kullanma"]}}};

const STIPS={en:{spring:{vata:"Spring moisture grounds Vata.",pitta:"Neutral. Bitter greens cleanse.",kapha:"Toughest season. More exercise."},summer:{vata:"Heat worsens Vata. Stay hydrated.",pitta:"Most critical. Cool foods.",kapha:"Balances Kapha. Be active."},autumn:{vata:"Aggravates Vata — stay warm.",pitta:"Cools Pitta. Focus season.",kapha:"Keep moving."},winter:{vata:"Cold amplifies anxiety. Warmth.",pitta:"Heals Pitta. Rest.",kapha:"Hardest time. Discipline."}},
tr:{spring:{vata:"Nem topraklar.",pitta:"Nötr. Yeşillikler arındırır.",kapha:"En zor mevsim."},summer:{vata:"Sıcak artırır. Bol su.",pitta:"En kritik. Serinletici gıdalar.",kapha:"Dengeler. Aktif ol."},autumn:{vata:"Tetikler — sıcak kal.",pitta:"Serinletir. Odaklan.",kapha:"Harekete devam."},winter:{vata:"Soğuk kaygıyı artırır.",pitta:"Şifa. Dinlen.",kapha:"Disiplin şart."}}};
const WISDOM={en:["When diet is wrong, medicine is of no use. When diet is correct, medicine is of no need.","The body is your temple. Keep it pure and clean for the soul to reside in.","Every human being is the author of their own health or disease.","He who has health has hope, and he who has hope has everything.","The natural healing force within each of us is the greatest force in getting well.","Balance is the perfect state of still water.","Sleep is the best meditation."],
tr:["Diyet yanlışsa ilaç faydasız, doğruysa ilaca gerek yok.","Beden tapınağındır. Ruhun için saf tut.","Her insan kendi sağlığının yazarıdır.","Sağlığı olan umut eder, umudu olan her şeye sahiptir.","İçimizdeki doğal iyileşme gücü en büyük güçtür.","Denge, durgun suyun mükemmel halidir.","Uyku en iyi meditasyondur."]};

/* ═══ AI ═══ */
async function callAI(body){try{const r=await fetch("/api/ai-advisor",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});const d=await r.json();if(d.error)throw 0;return d.content?.map(b=>b.type==="text"?b.text:"").join("")||null}catch{return null}}

function parseAITips(text){if(!text)return null;const s={food:"",ritual:"",skin:"",move:"",avoid:""};const lines=text.split("\n").filter(l=>l.trim());let cur=null;for(const l of lines){const x=l.trim();if(x.includes("🍽")||x.match(/food|ye|beslen/i))cur="food";else if(x.includes("🧘")||x.match(/ritual|yap|do today/i))cur="ritual";else if(x.includes("🧴")||x.match(/skin|cilt/i))cur="skin";else if(x.includes("🏃")||x.match(/move|hareket/i))cur="move";else if(x.includes("⛔")||x.match(/avoid|kaçın/i))cur="avoid";if(cur){let c=x.replace(/^[🍽️🧘🧴🏃⛔]+\s*/,"").replace(/^(FOOD|RITUAL|SKIN|MOVEMENT|AVOID|BESLENME|RİTÜEL|CİLT|HAREKET|KAÇIN|EAT TODAY|DO TODAY|SKIN TODAY|MOVE TODAY|AVOID TODAY|BUGÜN YE|BUGÜN YAP|BUGÜN CİLT|BUGÜN HAREKET|BUGÜN KAÇIN)\s*[:：]?\s*/i,"").trim();if(c)s[cur]+=(s[cur]?" ":"")+c;}}return(s.food||s.ritual)?s:null}

/* ═══ COMPONENTS ═══ */
function LS(){const{lang,setLang}=useLang();return<button className="lsw" onClick={()=>setLang(lang==="en"?"tr":"en")}>{lang==="en"?"TR":"EN"}</button>}
function Accordion({icon,title,children}){const[open,setOpen]=useState(false);return<div className="acc"><div className="acc-hd" onClick={()=>setOpen(!open)}><div className="acc-hd-left"><span className="acc-icon">{icon}</span><span className="acc-title">{title}</span></div><span className={`acc-arrow${open?" open":""}`}>▾</span></div>{open&&<div className="acc-body">{children}</div>}</div>}
function DayCard({icon,title,children}){return<div className="dy-card"><div className="dy-hd"><span className="dy-icon">{icon}</span><span className="dy-title">{title}</span></div><div className="dy-body">{children}</div></div>}

/* ── Welcome (single screen) ── */
function Welcome({onStart}){const{lang}=useLang();const t=TX[lang];
return<div className="pg wel"><div className="obg"><div className="orb o1"/><div className="orb o2"/></div>
<div className="wel-c">
<LS/>
<div style={{marginTop:"1.5rem"}}><div className="wel-logo">{t.welTitle}<span className="bdt">.</span></div><div className="wel-sub">{t.welSub}</div></div>
<div className="wel-features">
{[["welF1","welF1t"],["welF2","welF2t"],["welF3","welF3t"]].map(([ik,tk])=>(
<div key={ik} className="wel-feat"><span className="wel-feat-icon">{t[ik]}</span><span className="wel-feat-txt" dangerouslySetInnerHTML={{__html:t[tk]}}/></div>
))}
</div>
<button className="btn bl" onClick={onStart}>{t.welBtn}</button>
<div className="wel-note">{t.welNote}</div>
</div></div>}

/* ═══ QUIZ QUESTIONS ═══ */
const QS={en:[{id:1,cat:"body",ic:"🦴",q:"What is your natural body frame?",o:[{t:"Thin, light — hard to gain weight",d:"vata"},{t:"Medium, muscular",d:"pitta"},{t:"Broad, sturdy — gain easily",d:"kapha"}]},{id:2,cat:"body",ic:"✋",q:"How is your skin?",o:[{t:"Dry, rough, cool",d:"vata"},{t:"Warm, oily, rash-prone",d:"pitta"},{t:"Thick, smooth, moist",d:"kapha"}]},{id:3,cat:"body",ic:"💇",q:"How is your hair?",o:[{t:"Dry, frizzy, thin",d:"vata"},{t:"Fine, oily, early greying",d:"pitta"},{t:"Thick, wavy, lustrous",d:"kapha"}]},{id:4,cat:"digestion",ic:"🍽️",q:"How is your appetite?",o:[{t:"Irregular",d:"vata"},{t:"Strong — irritable if skipped",d:"pitta"},{t:"Slow — can skip meals",d:"kapha"}]},{id:5,cat:"digestion",ic:"😌",q:"After eating?",o:[{t:"Bloated or gassy",d:"vata"},{t:"Warm — sometimes heartburn",d:"pitta"},{t:"Heavy, want to nap",d:"kapha"}]},{id:6,cat:"sleep",ic:"🌙",q:"How do you sleep?",o:[{t:"Light, interrupted",d:"vata"},{t:"Fall asleep easy, wake sharp",d:"pitta"},{t:"Deep, long, hard to wake",d:"kapha"}]},{id:7,cat:"sleep",ic:"⏰",q:"Natural sleep duration?",o:[{t:"< 6 hours",d:"vata"},{t:"6–8 hours",d:"pitta"},{t:"> 8 hours",d:"kapha"}]},{id:8,cat:"mind",ic:"🧠",q:"Mind under pressure?",o:[{t:"Overthink, scattered",d:"vata"},{t:"Analyze, solve fast",d:"pitta"},{t:"Stay calm, slow",d:"kapha"}]},{id:9,cat:"mind",ic:"💭",q:"Your memory?",o:[{t:"Quick learn, quick forget",d:"vata"},{t:"Sharp, detailed",d:"pitta"},{t:"Slow learn, never forget",d:"kapha"}]},{id:10,cat:"mind",ic:"😤",q:"Stress response?",o:[{t:"Anxious, worried",d:"vata"},{t:"Angry, frustrated",d:"pitta"},{t:"Withdraw, quiet",d:"kapha"}]},{id:11,cat:"emotion",ic:"💔",q:"Biggest struggle?",o:[{t:"Fear & anxiety",d:"vata"},{t:"Anger & jealousy",d:"pitta"},{t:"Attachment",d:"kapha"}]},{id:12,cat:"emotion",ic:"⚖️",q:"Decision making?",o:[{t:"Impulsive",d:"vata"},{t:"Decisive",d:"pitta"},{t:"Slow",d:"kapha"}]},{id:13,cat:"lifestyle",ic:"🏃",q:"Exercise?",o:[{t:"Love it, tire fast",d:"vata"},{t:"Competitive",d:"pitta"},{t:"Prefer slow pace",d:"kapha"}]},{id:14,cat:"lifestyle",ic:"⚡",q:"Daily energy?",o:[{t:"Bursts then crash",d:"vata"},{t:"Strong, consistent",d:"pitta"},{t:"Steady but low",d:"kapha"}]},{id:15,cat:"lifestyle",ic:"🌡️",q:"Climate?",o:[{t:"Warm, humid",d:"vata"},{t:"Cool",d:"pitta"},{t:"Warm, dry",d:"kapha"}]}],
tr:[{id:1,cat:"body",ic:"🦴",q:"Vücut yapınız?",o:[{t:"İnce, hafif",d:"vata"},{t:"Orta, kaslı",d:"pitta"},{t:"Geniş, sağlam",d:"kapha"}]},{id:2,cat:"body",ic:"✋",q:"Cildiniz?",o:[{t:"Kuru, serin",d:"vata"},{t:"Sıcak, yağlı",d:"pitta"},{t:"Kalın, nemli",d:"kapha"}]},{id:3,cat:"body",ic:"💇",q:"Saçlarınız?",o:[{t:"Kuru, kırılgan",d:"vata"},{t:"İnce, yağlı",d:"pitta"},{t:"Kalın, parlak",d:"kapha"}]},{id:4,cat:"digestion",ic:"🍽️",q:"İştahınız?",o:[{t:"Düzensiz",d:"vata"},{t:"Güçlü",d:"pitta"},{t:"Yavaş",d:"kapha"}]},{id:5,cat:"digestion",ic:"😌",q:"Yemek sonrası?",o:[{t:"Şişkinlik",d:"vata"},{t:"Sıcaklık, reflü",d:"pitta"},{t:"Ağırlık",d:"kapha"}]},{id:6,cat:"sleep",ic:"🌙",q:"Uykunuz?",o:[{t:"Hafif, bölünür",d:"vata"},{t:"Kolay dalma",d:"pitta"},{t:"Derin, uzun",d:"kapha"}]},{id:7,cat:"sleep",ic:"⏰",q:"Uyku süresi?",o:[{t:"< 6 saat",d:"vata"},{t:"6–8 saat",d:"pitta"},{t:"> 8 saat",d:"kapha"}]},{id:8,cat:"mind",ic:"🧠",q:"Baskı altında?",o:[{t:"Aşırı düşünme",d:"vata"},{t:"Analiz, çözüm",d:"pitta"},{t:"Sakin, yavaş",d:"kapha"}]},{id:9,cat:"mind",ic:"💭",q:"Hafızanız?",o:[{t:"Çabuk öğren/unut",d:"vata"},{t:"Keskin",d:"pitta"},{t:"Yavaş/unutmaz",d:"kapha"}]},{id:10,cat:"mind",ic:"😤",q:"Stres?",o:[{t:"Kaygı",d:"vata"},{t:"Öfke",d:"pitta"},{t:"İçe kapanma",d:"kapha"}]},{id:11,cat:"emotion",ic:"💔",q:"En zor duygu?",o:[{t:"Korku",d:"vata"},{t:"Öfke",d:"pitta"},{t:"Bağımlılık",d:"kapha"}]},{id:12,cat:"emotion",ic:"⚖️",q:"Karar?",o:[{t:"Hızlı",d:"vata"},{t:"Kararlı",d:"pitta"},{t:"Yavaş",d:"kapha"}]},{id:13,cat:"lifestyle",ic:"🏃",q:"Egzersiz?",o:[{t:"Sever, yorulur",d:"vata"},{t:"Rekabetçi",d:"pitta"},{t:"Yavaş tempo",d:"kapha"}]},{id:14,cat:"lifestyle",ic:"⚡",q:"Enerji?",o:[{t:"Dalgalı",d:"vata"},{t:"Güçlü",d:"pitta"},{t:"Düşük",d:"kapha"}]},{id:15,cat:"lifestyle",ic:"🌡️",q:"İklim?",o:[{t:"Sıcak nemli",d:"vata"},{t:"Serin",d:"pitta"},{t:"Sıcak kuru",d:"kapha"}]}]};

/* ── Quiz (auto-advance) ── */
function Quiz({onFinish,onBack}){const{lang}=useLang();const t=TX[lang];const qs=QS[lang];const[step,setStep]=useState(0);const[sc,setSc]=useState({vata:0,pitta:0,kapha:0});const[ani,setAni]=useState(false);const q=qs[step];const pct=((step+1)/qs.length)*100;

const select=useCallback((dosha)=>{if(ani)return;setAni(true);const ns={...sc,[dosha]:sc[dosha]+3};setSc(ns);
setTimeout(()=>{if(step+1>=qs.length)onFinish(ns);else{setStep(step+1);setAni(false)}},400)},[ani,sc,step,onFinish,qs.length]);

return<div className="pg qz"><div className="qn"><button className="qb" onClick={onBack}>←</button><div className="qp"><div className="qtr"><div className="qfl" style={{width:`${pct}%`}}/></div><span className="qc">{step+1}/{qs.length}</span></div></div><div className="qbd"><div className="qcd" key={step}><div className="qct"><span>{q.ic}</span>{t[catMap[q.cat]]}</div><h2 className="qq">{q.q}</h2><div className="qos">{q.o.map((o,i)=><button key={i} className="qo" onClick={()=>select(o.d)}><span>{o.t}</span></button>)}</div><p className="qh">{t.qhint}</p></div></div></div>}

/* ── Result + Paywall ── */
function Result({scores,onDash}){const{lang}=useLang();const t=TX[lang];const D=DD[lang];const total=scores.vata+scores.pitta+scores.kapha;const sorted=Object.entries(scores).sort((a,b)=>b[1]-a[1]);const pri=sorted[0][0],sec=sorted[1][0],d=D[pri];
useEffect(()=>{localStorage.setItem("doshaScores",JSON.stringify(scores));localStorage.setItem("doshaType",pri);localStorage.setItem("doshaSecondary",sec)},[scores,pri,sec]);

return<div className="pg" style={{"--dc":cols[pri],"--dd":dims[pri],"--dg":glows[pri]}}>
<div className="rh"><span style={{fontSize:".68rem",letterSpacing:".18em",textTransform:"uppercase",color:"var(--t3)"}}>{t.rYour}</span><h1 className="rn">{d.name}</h1><span className="re">{d.el}</span><p className="rs">{t.rWith} <em>{D[sec].name}</em> {t.rInf}</p><p className="rd">{d.desc}</p>
<div className="rbs">{sorted.map(([k,v])=><div className="rbr" key={k}><span className="rbl" style={{color:cols[k]}}>{D[k].name}</span><div className="rbt"><div className="rbf" style={{width:`${(v/total)*100}%`,background:cols[k]}}/></div><span className="rbp">{Math.round((v/total)*100)}%</span></div>)}</div></div>

{/* Free preview — limited info */}
<div className="free-section">
<div className="free-grid"><div className="cd"><span className="ct">{t.rStr}</span><ul className="cl">{d.str.map(s=><li key={s}>{s}</li>)}</ul></div><div className="cd"><span className="ct">{t.rImb}</span><ul className="cl">{d.ch.map(c=><li key={c}>{c}</li>)}</ul></div></div>
</div>

{/* Paywall */}
<div className="paywall"><div className="pw-card"><div className="pw-glow"/>
<div className="pw-badge">{t.pwBadge}</div>
<div className="pw-title">{t.pwTitle}</div>
<div className="pw-features">
{["pwF1","pwF2","pwF3","pwF4"].map(k=><div key={k} className="pw-feat"><span className="pw-feat-icon">✦</span><span>{t[k]}</span></div>)}
</div>
<div className="pw-price">{t.pwPrice}</div>
<div className="pw-price-sub">{t.pwPriceSub}</div>
<button className="btn bl" onClick={onDash}>{t.pwBtn}</button>
<button style={{display:"block",margin:".75rem auto 0",fontSize:".78rem",color:"var(--t3)"}} onClick={onDash}>{t.pwSkip}</button>
</div></div>
</div>}

/* ── Weekly Report ── */
function WeeklyReport({lang}){const t=TX[lang];
const days=useMemo(()=>{const r=[];const dn=lang==="tr"?["Pzt","Sal","Çar","Per","Cum","Cmt","Paz"]:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];const td=new Date();const dow=td.getDay()||7;
for(let i=1;i<=7;i++){const d=new Date(td);d.setDate(td.getDate()-(dow-i));const k="ci_"+d.toDateString();let data=null;try{const raw=localStorage.getItem(k);if(raw)data=JSON.parse(raw)}catch{}r.push({day:dn[i-1],data,cur:i===dow})}return r},[lang]);
const cnt=days.filter(d=>d.data).length;let streak=0;for(let i=days.length-1;i>=0;i--){if(days[i].data)streak++;else if(i<days.length-1)break}
return<div className="cd"><span className="ct">{t.wrT}</span>
<div className="mood-week">{days.map((d,i)=><div key={i} className="mood-row"><span className="mood-day" style={{color:d.cur?"var(--dc)":undefined}}>{d.day}</span>{d.data?<span className="mood-text">{d.data.text?.slice(0,40)}{d.data.text?.length>40?"...":""}</span>:<span className="mood-none">{t.noCI}</span>}</div>)}</div>
<div className="wr-stat"><div className="wr-stat-item"><div className="wr-stat-val">{cnt}/7</div><div className="wr-stat-label">{t.wrC}</div></div><div className="wr-stat-item"><div className="wr-stat-val">{streak}</div><div className="wr-stat-label">{t.wrS}</div></div></div></div>}

/* ── Monthly AI Report ── */
function MonthlyReport({lang,doshaType}){
const t=TX[lang];const D=DD[lang][doshaType];
const[report,setReport]=useLS("prakruti_monthly_"+new Date().getMonth(),null);
const[loading,setLoading]=useState(false);

const generate=useCallback(async()=>{
setLoading(true);
// Collect last 30 days of check-ins
const entries=[];for(let i=0;i<30;i++){const d=new Date();d.setDate(d.getDate()-i);try{const raw=localStorage.getItem("ci_"+d.toDateString());if(raw){const p=JSON.parse(raw);if(p?.text)entries.push(p.text)}}catch{}}
if(entries.length===0){setLoading(false);return}
const prompt=`Here are my daily mood/health check-ins from the past ${entries.length} days (most recent first):\n${entries.map((e,i)=>`Day ${i+1}: ${e}`).join("\n")}\n\nAnalyze patterns in my mood and health. Give me:\n1. A brief summary of my overall wellness trend\n2. The most recurring issues\n3. 3-4 specific long-term Ayurvedic recommendations to address the root causes\n4. One habit to focus on this coming month`;
const resp=await callAI({userText:prompt,doshaName:D.name,doshaEl:D.el,lang,season:getSeason(),sysOverride:`You are Prakruti AI monthly wellness analyst. User's dosha: ${D.name}. Respond in ${lang==="tr"?"Turkish":"English"}. Keep under 200 words. Be insightful, specific, and actionable. Focus on patterns, not individual days.`});
if(resp)setReport(resp);setLoading(false)},[D,lang,setReport]);

return<div className="stk">
<div className="cd"><span className="ct">{t.wrMonth}</span>
{report?<div className="ai-report-txt">{report}</div>:loading?<div className="ai-ld"><div className="ai-sp"/>{t.wrMonthWait}</div>:<button className="btn bl" onClick={generate}>{t.wrMonthBtn}</button>}
</div></div>}

/* ═══ DASHBOARD ═══ */
function Dashboard({onRetake}){
const{lang}=useLang();const t=TX[lang];const D=DD[lang];const ST=STIPS[lang];
const[dt]=useState(()=>localStorage.getItem("doshaType")||"vata");const d=D[dt];
const[tab,setTab]=useState("td");
const[ciDate,setCiDate]=useState(todayStr());const ciKey="ci_"+ciDate;const[ci,setCi]=useLS(ciKey,null);
useEffect(()=>{const iv=setInterval(()=>{const n=todayStr();if(n!==ciDate)setCiDate(n)},30000);return()=>clearInterval(iv)},[ciDate]);
const[aiText,setAiText]=useState("");const[aiLoading,setAiLoading]=useState(false);
const[notifOn]=useLS("prakruti_notif",null);
const[checks,setChecks]=useLS("rit_"+ciDate,[]);
const hr=new Date().getHours();const greet=hr<12?t.gM:hr<18?t.gA:t.gE;const season=getSeason();
const dayIdx=new Date().getDate();
const wisdom=WISDOM[lang][dayIdx%WISDOM[lang].length];
const aiTips=useMemo(()=>ci?.aiResp?parseAITips(ci.aiResp):null,[ci]);

const handleAI=useCallback(async()=>{if(!aiText.trim()||aiLoading)return;setAiLoading(true);
const sysNote=`Respond in ${lang==="tr"?"Turkish":"English"}. User's dosha: ${d.name} (${d.el}). Season: ${season}.\nYou are Prakruti AI. Based on the user's complaint, respond in EXACTLY this format:\n🍽️ FOOD: (1-2 sentences)\n🧘 RITUAL: (1-2 sentences)\n🧴 SKIN: (1 sentence)\n🏃 MOVEMENT: (1 sentence)\n⛔ AVOID: (1 sentence)\nKeep under 120 words. Be specific to their dosha. No medical diagnoses.`;
const resp=await callAI({userText:aiText.trim(),doshaName:d.name,doshaEl:d.el,lang,season,sysOverride:sysNote});
if(resp)setCi({text:aiText.trim(),aiResp:resp,date:ciDate});
setAiLoading(false);setAiText("")},[aiText,aiLoading,d,lang,season,setCi,ciDate]);

const toggleCheck=i=>setChecks(p=>p.includes(i)?p.filter(x=>x!==i):[...p,i]);
const ritPct=d.morn.length?Math.round((checks.length/d.morn.length)*100):0;
const navTabs=[{id:"td",l:t.today,ic:"◎"},{id:"di",l:t.discover,ic:"◆"},{id:"rp",l:t.report,ic:"◑"}];

return<div className="pg dsh" style={{"--dc":cols[dt],"--dd":dims[dt],"--dg":glows[dt]}}>
<div className="dhd" style={{background:`radial-gradient(ellipse at top left,${dims[dt]} 0%,transparent 60%)`}}>
<div className="dht"><span className="bsm">prakruti<span className="bdt">.</span></span><div className="dha"><LS/><span className="dbg" style={{color:cols[dt],borderColor:cols[dt]}}>{d.sym} {d.name}</span><button className="bgst bxs" onClick={onRetake}>{t.dRtk}</button></div></div>
<span className="dgr">{greet}</span><h1 className="dti">{d.name} {t.dPlan}</h1>
<div className="dtg"><span className="dtgi">{SI[season]} {t[sKey[season]]}</span><span className="dtgi">{d.el}</span></div></div>

{!notifOn&&"Notification"in window&&<div className="notif-bar"><span>{t.notifQ}</span><button className="notif-btn" onClick={()=>{Notification.requestPermission().then(p=>{if(p==="granted"){localStorage.setItem("prakruti_notif",'"on"');window.location.reload()}})}}>{t.notifY}</button></div>}

{/* AI — only Today tab */}
{tab==="td"&&<div className="aia">{ci?.aiResp?<div className="ai-done"><span className="ai-done-icon">✦</span><span className="ai-done-txt">{ci.text}</span></div>:<div><h3 className="ai-q">{t.dHow}</h3><div className="ai-iw"><textarea className="ai-in" placeholder={t.dHowPh} value={aiText} onChange={e=>setAiText(e.target.value)} rows={1} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();handleAI()}}}/><button className="ai-sd" onClick={handleAI} disabled={!aiText.trim()||aiLoading}>→</button></div>{aiLoading&&<div className="ai-ld"><div className="ai-sp"/>{t.aiTh}</div>}{!aiLoading&&!aiText&&<div style={{fontSize:".7rem",color:"var(--t3)",marginTop:".35rem"}}>{t.dyH}</div>}</div>}</div>}

<div className="dcc" key={tab+ciDate}>
{tab==="td"&&<div className="stk">
<div className="cd" style={{textAlign:"center",padding:".9rem 1rem"}}><span className="ct">{t.wisT}</span><div className="wisdom">"{wisdom}"</div></div>
{aiTips?<>{aiTips.food&&<DayCard icon="🍽️" title={t.aiFood}>{aiTips.food}</DayCard>}{aiTips.ritual&&<DayCard icon="🧘" title={t.aiRitual}>{aiTips.ritual}</DayCard>}{aiTips.skin&&<DayCard icon="🧴" title={t.aiSkin}>{aiTips.skin}</DayCard>}{aiTips.move&&<DayCard icon="🏃" title={t.aiMove}>{aiTips.move}</DayCard>}{aiTips.avoid&&<DayCard icon="⛔" title={t.aiAvoid}>{aiTips.avoid}</DayCard>}</>:<><DayCard icon="🍽️" title={t.aiFood}>{d.fav[dayIdx%d.fav.length]}</DayCard><DayCard icon="🧴" title={t.aiSkin}>{d.skin[dayIdx%d.skin.length]}</DayCard><DayCard icon="🏃" title={t.aiMove}>{d.ex[dayIdx%d.ex.length]}</DayCard></>}
<div className="cd"><div className="chd"><span className="ct">{t.ritT}</span><span className="cm">{checks.length}/{d.morn.length} {t.ritD}</span></div><div className="rit-prog"><div className="rit-prog-fill" style={{width:`${ritPct}%`}}/></div>{d.morn.map((it,i)=><div key={i} className={`rit-check${checks.includes(i)?" done":""}`} onClick={()=>toggleCheck(i)}><div className={`rit-cb${checks.includes(i)?" on":""}`}>{checks.includes(i)?"✓":""}</div><span>{it}</span></div>)}</div>
</div>}

{tab==="di"&&<div className="stk">
<div className="cd ca"><span className="ct">{t.profT}</span><div style={{display:"flex",gap:".65rem",alignItems:"center"}}><span style={{fontSize:"1.8rem"}}>{d.sym}</span><div><div style={{fontFamily:"var(--fd)",fontSize:"1.3rem",color:"var(--dc)"}}>{d.name}</div><div style={{fontSize:".76rem",color:"var(--t2)"}}>{d.el} — {d.desc}</div></div></div></div>
<Accordion icon="🍽️" title={t.accNut}><div className="fc"><div><span className="fl fg">{t.rFav}</span><ul className="cl">{d.fav.map(f=><li key={f}>{f}</li>)}</ul></div><div><span className="fl fr">{t.rAvd}</span><ul className="cl">{d.avd.map(a=><li key={a}>{a}</li>)}</ul></div></div></Accordion>
<Accordion icon="🌅" title={t.accMorn}><ol className="rl">{d.morn.map((it,i)=><li key={i}><span className="rln">{i+1}</span>{it}</li>)}</ol></Accordion>
<Accordion icon="🌙" title={t.accSlp}><ol className="rl">{d.slp.map((it,i)=><li key={i}><span className="rln">{i+1}</span>{it}</li>)}</ol></Accordion>
<Accordion icon="🏃" title={t.accEx}><div className="eg">{d.ex.map((e,i)=><div key={i} className="ei">◎ {e}</div>)}</div></Accordion>
<Accordion icon="🧴" title={t.accSkin}><ul className="cl">{d.skin.map(s=><li key={s}>{s}</li>)}</ul></Accordion>
<Accordion icon="🌿" title={t.accHerb}><ul className="cl">{d.herb.map(h=><li key={h}>✦ {h}</li>)}</ul></Accordion>
<Accordion icon={SI[season]} title={t.accSeason}><div className="stk">{Object.entries(ST).map(([s,tips])=><div key={s} style={{marginBottom:".4rem"}}><div style={{fontSize:".7rem",color:"var(--t3)",marginBottom:".15rem"}}>{SI[s]} {t[sKey[s]]}</div><p className="sp">{tips[dt]}</p></div>)}</div></Accordion>
</div>}

{tab==="rp"&&<div className="stk">
<WeeklyReport lang={lang}/>
<MonthlyReport lang={lang} doshaType={dt}/>
</div>}
</div>

<div className="bnv">{navTabs.map(tb=><button key={tb.id} className={`bnb${tab===tb.id?" bnbn":""}`} onClick={()=>setTab(tb.id)}><span className="bni">{tb.ic}</span><span className="bnl">{tb.l}</span></button>)}</div>
</div>}

/* ═══ APP ═══ */
export default function App(){
const[lang,setLang]=useLS("prakruti_lang","en");
const[page,setPage]=useState(()=>{if(localStorage.getItem("prakruti_premium"))return"dashboard";if(localStorage.getItem("doshaType"))return"result_return";return"welcome"});
const[rs,setRs]=useState(null);
const go=useCallback(p=>{setPage(p);window.scrollTo(0,0)},[]);

// For returning users who have dosha but haven't "paid"
useEffect(()=>{if(page==="result_return"){const raw=localStorage.getItem("doshaScores");if(raw)setRs(JSON.parse(raw));else go("welcome")}},[page,go]);

return<Lx.Provider value={{lang,setLang}}><style>{CSS}</style>
{page==="welcome"&&<Welcome onStart={()=>go("quiz")}/>}
{page==="quiz"&&<Quiz onFinish={s=>{setRs(s);go("result")}} onBack={()=>go("welcome")}/>}
{(page==="result"||page==="result_return")&&rs&&<Result scores={rs} onDash={()=>{localStorage.setItem("prakruti_premium","true");go("dashboard")}}/>}
{page==="dashboard"&&<Dashboard onRetake={()=>{localStorage.removeItem("doshaType");localStorage.removeItem("doshaSecondary");localStorage.removeItem("doshaScores");localStorage.removeItem("prakruti_premium");go("welcome")}}/>}
</Lx.Provider>}
