import{useState,useEffect,useCallback,useMemo,createContext,useContext,useRef}from"react";

/* ═══ CSS ═══ */
const CSS=`@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300;1,9..40,400&display=swap');
:root{--bg:#0C0B09;--bg2:#141310;--bg3:#1C1B17;--bg4:#252420;--bd:rgba(255,255,255,.06);--bd2:rgba(255,255,255,.1);--t:#EDE8DF;--t2:#9E978C;--t3:#635E56;--gl:#B8956A;--gld:rgba(184,149,106,.1);--glg:rgba(184,149,106,.3);--grn:#5A8F5E;--red:#C46A42;--blu:#6A9DB8;--fd:'Instrument Serif',serif;--fb:'DM Sans',sans-serif;--r:16px;--rs:10px;--tr:.25s cubic-bezier(.4,0,.2,1);--dc:var(--gl);--dd:var(--gld);--dg:var(--glg)}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}body{font-family:var(--fb);background:var(--bg);color:var(--t);-webkit-font-smoothing:antialiased;line-height:1.6;min-height:100vh;overflow-x:hidden}h1,h2,h3,h4{font-family:var(--fd);font-weight:400;line-height:1.1}button{font-family:var(--fb);cursor:pointer;background:none;border:none;color:inherit}ul,ol{list-style:none}input,textarea{font-family:var(--fb);background:none;border:none;color:var(--t);outline:none}.pg{min-height:100vh;background:var(--bg)}
@keyframes fu{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}@keyframes fi{from{opacity:0}to{opacity:1}}@keyframes od{0%{transform:scale(1) translate(0)}33%{transform:scale(1.08) translate(15px,-12px)}66%{transform:scale(.95) translate(-10px,10px)}100%{transform:scale(1) translate(0)}}@keyframes pl{0%,100%{opacity:.6}50%{opacity:1}}@keyframes spin{to{transform:rotate(360deg)}}
.ov{display:block;font-size:.68rem;letter-spacing:.18em;text-transform:uppercase;color:var(--t3)}.bsm{font-family:var(--fd);font-size:1.15rem;color:var(--t);cursor:pointer}.bdt{color:var(--gl)}
.btn{background:var(--gl);color:var(--bg);font-weight:600;letter-spacing:.02em;border-radius:50px;transition:all var(--tr);display:inline-flex;align-items:center;justify-content:center;gap:.5rem;padding:.9rem 2rem;font-size:.88rem}.btn:hover{opacity:.88;transform:translateY(-1px);box-shadow:0 8px 30px var(--glg)}.bl{width:100%}
.bgst{color:var(--t2);border:1px solid var(--bd2);border-radius:50px;transition:all var(--tr)}.bgst:hover{background:var(--bg3);color:var(--t)}.bxs{padding:.3rem .75rem;font-size:.72rem}
.bt{color:var(--t3);font-size:.8rem;margin-top:.75rem;transition:color var(--tr)}.bt:hover{color:var(--t)}
.lsw{font-size:.7rem;font-weight:600;letter-spacing:.08em;color:var(--t2);border:1px solid var(--bd2);padding:.25rem .6rem;border-radius:50px;transition:all var(--tr)}.lsw:hover{color:var(--t);border-color:var(--gl)}
.orb{position:absolute;border-radius:50%;filter:blur(90px);animation:od 14s ease-in-out infinite}.o1{width:350px;height:350px;background:var(--glg);top:-100px;left:-80px}.o2{width:280px;height:280px;background:rgba(90,143,94,.15);bottom:-80px;right:-60px;animation-delay:-6s}
.onb{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2rem 1.5rem;position:relative;overflow:hidden}.obg{position:absolute;inset:0;pointer-events:none}.oc{position:relative;z-index:1;max-width:360px;width:100%;text-align:center}.os{animation:fu .4s ease both;margin-bottom:2.5rem}.oi{font-size:3.5rem;display:block;margin-bottom:1.5rem;animation:pl 3s ease-in-out infinite}.ot{font-size:2rem;margin-bottom:.75rem;letter-spacing:-.02em}.odc{color:var(--t2);font-size:.92rem;line-height:1.7}.dots{display:flex;justify-content:center;gap:.5rem;margin-bottom:2rem}.dot{width:8px;height:8px;border-radius:50%;background:var(--bg4);transition:all var(--tr)}.don{background:var(--gl);width:24px;border-radius:4px}
.qz{display:flex;flex-direction:column}.qn{position:sticky;top:0;z-index:100;display:flex;align-items:center;gap:1rem;padding:1rem 1.25rem;background:rgba(12,11,9,.92);backdrop-filter:blur(20px);border-bottom:1px solid var(--bd)}.qb{font-size:1.2rem;color:var(--t2);padding:.25rem .5rem}.qp{display:flex;align-items:center;gap:.75rem;flex:1}.qtr{flex:1;height:3px;background:var(--bg4);border-radius:2px;overflow:hidden}.qfl{height:100%;background:var(--gl);border-radius:2px;transition:width .5s ease}.qc{font-size:.72rem;color:var(--t3)}.qbd{flex:1;display:flex;align-items:center;justify-content:center;padding:2rem 1.5rem}.qcd{width:100%;max-width:520px;animation:fu .3s ease both}.qct{display:inline-flex;align-items:center;gap:.4rem;font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;color:var(--gl);background:var(--gld);border:1px solid var(--glg);padding:.3rem .8rem;border-radius:50px;margin-bottom:1.5rem}.qq{font-size:clamp(1.4rem,4vw,2rem);color:var(--t);margin-bottom:1.75rem;line-height:1.25}.qos{display:flex;flex-direction:column;gap:.6rem;margin-bottom:1.25rem}.qo{display:flex;align-items:center;gap:.85rem;padding:1rem 1.1rem;background:var(--bg2);border:1px solid var(--bd);border-radius:var(--r);text-align:left;font-size:.86rem;color:var(--t2);line-height:1.5;transition:all var(--tr);width:100%}.qo:hover{border-color:var(--bd2);background:var(--bg3)}.qon{background:var(--gld);border-color:var(--gl);color:var(--t)}.qr{width:18px;height:18px;border-radius:50%;border:1.5px solid var(--bg4);flex-shrink:0;display:flex;align-items:center;justify-content:center;transition:all var(--tr)}.qrn{background:var(--gl);border-color:var(--gl)}.qrd{width:6px;height:6px;border-radius:50%;background:var(--bg)}.qnx{width:100%;padding:.9rem;border-radius:var(--r);font-size:.86rem;font-weight:500;transition:all var(--tr);background:var(--bg3);color:var(--t3);cursor:not-allowed}.qnxn{background:var(--gl);color:var(--bg);font-weight:600;cursor:pointer;box-shadow:0 0 24px var(--glg)}.qnxn:hover{opacity:.9}.qh{text-align:center;font-size:.72rem;color:var(--t3);margin-top:1rem;font-style:italic}
.rp{padding-bottom:80px}.rh{padding:4rem 1.5rem 3rem;text-align:center;background:radial-gradient(ellipse at center,var(--dd) 0%,transparent 70%);animation:fi .5s ease both}.rn{font-size:clamp(4.5rem,16vw,7.5rem);color:var(--dc);line-height:.88;margin:.4rem 0;text-shadow:0 0 50px var(--dg);letter-spacing:-.04em}.re{font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;color:var(--t3)}.rs{font-family:var(--fd);font-style:italic;color:var(--t2);font-size:.95rem;margin:.4rem 0 1.25rem}.rs em{color:var(--t)}.rd{font-size:.92rem;color:var(--t2);max-width:460px;margin:0 auto 2.5rem;line-height:1.75}.rbs{max-width:340px;margin:0 auto;display:flex;flex-direction:column;gap:.7rem}.rbr{display:flex;align-items:center;gap:.7rem}.rbl{font-family:var(--fd);font-size:.92rem;width:52px;text-align:right;flex-shrink:0}.rbt{flex:1;height:4px;background:var(--bg3);border-radius:2px;overflow:hidden}.rbf{height:100%;border-radius:2px;transition:width 1.2s ease;opacity:.85}.rbp{font-size:.68rem;color:var(--t3);width:30px}.rbb{position:fixed;bottom:0;left:0;right:0;padding:1rem 1.5rem;background:rgba(12,11,9,.95);backdrop-filter:blur(20px);border-top:1px solid var(--bd)}
.tbs{display:flex;border-bottom:1px solid var(--bd);padding:0 1.5rem;overflow-x:auto;background:var(--bg);position:sticky;top:0;z-index:90}.tb{padding:.85rem 1.1rem;font-size:.76rem;letter-spacing:.06em;text-transform:uppercase;color:var(--t3);border-bottom:2px solid transparent;margin-bottom:-1px;white-space:nowrap;transition:all var(--tr)}.tbn{color:var(--dc);border-bottom-color:var(--dc);font-weight:600}
.rc{max-width:640px;margin:0 auto;padding:1.5rem;animation:fu .3s ease both}.rg{display:grid;grid-template-columns:1fr 1fr;gap:.85rem}
.stk{display:flex;flex-direction:column;gap:.75rem}.cd{background:var(--bg2);border:1px solid var(--bd);border-radius:var(--r);padding:1.25rem;animation:fu .35s ease both}.cw{grid-column:1/-1}.ca{border-color:var(--dc);background:linear-gradient(135deg,var(--bg2),var(--bg3))}
.chd{display:flex;justify-content:space-between;align-items:center;margin-bottom:.75rem}.ct{display:block;font-size:.68rem;letter-spacing:.12em;text-transform:uppercase;color:var(--dc);margin-bottom:.75rem}.chd .ct{margin-bottom:0}.cm{font-size:.68rem;color:var(--t3)}
.cl{display:flex;flex-direction:column;gap:.4rem}.cl li{font-size:.82rem;color:var(--t2);line-height:1.5;padding-left:1rem;position:relative}.cl li::before{content:'·';position:absolute;left:0;color:var(--dc);font-weight:700}
.hg{display:grid;grid-template-columns:1fr 1fr;gap:.4rem}.hi{font-size:.8rem;color:var(--t2);line-height:1.5}
.fc{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-top:.25rem}.fl{display:block;font-size:.68rem;letter-spacing:.1em;text-transform:uppercase;margin-bottom:.5rem}.fg{color:var(--grn)}.fr{color:var(--red)}
.rl{display:flex;flex-direction:column;gap:.55rem}.rl li{display:flex;gap:.65rem;align-items:flex-start;font-size:.82rem;color:var(--t2);line-height:1.5}.rln{width:20px;height:20px;border-radius:5px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:.6rem;font-weight:600;background:var(--dd);color:var(--dc)}
.eg{display:grid;grid-template-columns:1fr 1fr;gap:.5rem}.ei{background:var(--bg3);border-radius:var(--rs);padding:.75rem .9rem;font-size:.82rem;color:var(--t2)}
.sp{font-size:.83rem;color:var(--t2);line-height:1.65;margin-top:.2rem}
/* Dashboard */
.dsh{padding-bottom:68px}.dhd{padding:1.75rem 1.5rem 1.25rem;border-bottom:1px solid var(--bd)}.dht{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:.75rem}.dha{display:flex;gap:.4rem;align-items:center}.dbg{font-size:.7rem;font-weight:600;padding:.25rem .65rem;border-radius:50px;border:1px solid}.dgr{font-size:.76rem;color:var(--t3);display:block;margin-bottom:.1rem}.dti{font-size:clamp(1.5rem,5vw,2.2rem);margin-bottom:.5rem;letter-spacing:-.02em}.dtg{display:flex;gap:.4rem;flex-wrap:wrap}.dtgi{font-size:.7rem;color:var(--t2);background:var(--bg2);border:1px solid var(--bd);padding:.2rem .6rem;border-radius:50px}
/* AI input */
.aia{padding:1rem 1.5rem;border-bottom:1px solid var(--bd)}.ai-q{font-size:1rem;margin-bottom:.75rem}
.ai-iw{display:flex;gap:.5rem;align-items:flex-end}.ai-in{flex:1;background:var(--bg2);border:1px solid var(--bd);border-radius:var(--r);padding:.8rem 1rem;font-size:.85rem;resize:none;min-height:42px;max-height:100px;line-height:1.5;transition:border-color var(--tr)}.ai-in:focus{border-color:var(--gl)}.ai-in::placeholder{color:var(--t3)}.ai-sd{background:var(--gl);color:var(--bg);border-radius:50%;width:38px;height:38px;display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0}.ai-sd:disabled{opacity:.3;cursor:not-allowed}.ai-ld{display:flex;align-items:center;gap:.5rem;padding:.6rem 0;font-size:.78rem;color:var(--t3)}.ai-sp{width:14px;height:14px;border:2px solid var(--bd2);border-top-color:var(--gl);border-radius:50%;animation:spin .6s linear infinite}
/* AI done state — small bar showing what was asked */
.ai-done{display:flex;align-items:center;gap:.5rem;background:var(--bg2);border:1px solid var(--bd);border-radius:var(--rs);padding:.6rem .85rem}.ai-done-icon{font-size:.9rem;color:var(--dc)}.ai-done-txt{font-size:.76rem;color:var(--t3);flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
/* Daily tip cards */
.dy-card{background:var(--bg2);border:1px solid var(--bd);border-radius:var(--r);padding:1rem 1.15rem;animation:fu .3s ease both}.dy-hd{display:flex;align-items:center;gap:.6rem;margin-bottom:.6rem}.dy-icon{font-size:1.2rem}.dy-title{font-size:.8rem;font-weight:500;color:var(--t)}.dy-body{font-size:.82rem;color:var(--t2);line-height:1.6;white-space:pre-line}
/* Ritual checklist */
.rit-check{display:flex;align-items:flex-start;gap:.6rem;padding:.5rem 0;font-size:.8rem;color:var(--t2);line-height:1.4;cursor:pointer;transition:opacity var(--tr)}.rit-check.done{opacity:.35;text-decoration:line-through}.rit-cb{width:18px;height:18px;border-radius:5px;border:1.5px solid var(--bd2);flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:.6rem;transition:all var(--tr)}.rit-cb.on{background:var(--dc);border-color:var(--dc);color:var(--bg)}.rit-prog{height:3px;background:var(--bg4);border-radius:2px;margin-bottom:.6rem;overflow:hidden}.rit-prog-fill{height:100%;background:var(--dc);border-radius:2px;transition:width .4s ease}
/* Wisdom */
.wisdom{font-family:var(--fd);font-style:italic;font-size:.9rem;color:var(--t);line-height:1.55;text-align:center;padding:.5rem 0}
/* Accordion */
.acc{border:1px solid var(--bd);border-radius:var(--r);overflow:hidden;background:var(--bg2)}.acc+.acc{margin-top:.5rem}.acc-hd{display:flex;align-items:center;justify-content:space-between;padding:1rem 1.15rem;cursor:pointer;transition:background var(--tr)}.acc-hd:hover{background:var(--bg3)}.acc-hd-left{display:flex;align-items:center;gap:.6rem}.acc-icon{font-size:1.1rem}.acc-title{font-size:.85rem;font-weight:500;color:var(--t)}.acc-arrow{color:var(--t3);font-size:.75rem;transition:transform var(--tr)}.acc-arrow.open{transform:rotate(180deg)}.acc-body{padding:0 1.15rem 1.15rem;animation:fu .2s ease both}
/* Weekly report */
.wr-card{background:var(--bg2);border:1px solid var(--bd);border-radius:var(--r);padding:1.25rem}
.mood-week{display:flex;flex-direction:column;gap:.4rem;margin-top:.5rem}.mood-row{display:flex;align-items:center;gap:.6rem;font-size:.78rem}.mood-day{width:28px;color:var(--t3);font-weight:500;flex-shrink:0}.mood-emoji{font-size:1rem;width:24px;text-align:center}.mood-text{color:var(--t2);flex:1}.mood-none{color:var(--t3);font-style:italic}
.wr-stat{display:flex;justify-content:space-between;margin-top:.75rem;padding-top:.75rem;border-top:1px solid var(--bd)}.wr-stat-item{text-align:center;flex:1}.wr-stat-val{font-family:var(--fd);font-size:1.2rem;color:var(--dc)}.wr-stat-label{font-size:.58rem;color:var(--t3);text-transform:uppercase;letter-spacing:.08em}
/* Top moods */
.top-moods{display:flex;gap:.5rem;flex-wrap:wrap;margin-top:.5rem}.top-mood{display:flex;align-items:center;gap:.3rem;font-size:.76rem;padding:.3rem .65rem;border-radius:50px;background:var(--bg3);color:var(--t2)}.top-mood-ct{color:var(--dc);font-weight:600}
/* Badges */
.badges{display:flex;gap:.4rem;flex-wrap:wrap}.badge{display:flex;align-items:center;gap:.3rem;font-size:.7rem;padding:.3rem .65rem;border-radius:50px;border:1px solid var(--bd)}.badge.earned{border-color:var(--dc);background:var(--dd);color:var(--dc)}.badge.locked{color:var(--t3);opacity:.35}
/* Notification */
.notif-bar{display:flex;align-items:center;justify-content:space-between;padding:.6rem 1.5rem;background:var(--bg2);border-bottom:1px solid var(--bd);font-size:.76rem;color:var(--t2)}.notif-btn{font-size:.68rem;font-weight:600;color:var(--gl);border:1px solid var(--gl);padding:.2rem .65rem;border-radius:50px}
/* Bottom nav */
.bnv{position:fixed;bottom:0;left:0;right:0;background:rgba(12,11,9,.97);backdrop-filter:blur(20px);border-top:1px solid var(--bd);display:flex;padding:.5rem 1rem;justify-content:space-around}.bnb{display:flex;flex-direction:column;align-items:center;gap:.15rem;padding:.3rem 1.2rem;border-radius:var(--rs);transition:all var(--tr)}.bnbn{background:var(--dd)}.bni{font-size:1rem;color:var(--t3)}.bnbn .bni{color:var(--dc)}.bnl{font-size:.6rem;font-weight:500;color:var(--t3)}.bnbn .bnl{color:var(--dc)}
.dcc{padding:1.25rem 1.5rem;max-width:640px;margin:0 auto;animation:fu .2s ease both}
@media(max-width:640px){.rg,.fc,.hg,.eg{grid-template-columns:1fr}.rn{font-size:clamp(3.5rem,18vw,6rem)}}`;

/* ═══ CORE ═══ */
const Lx=createContext();const useLang=()=>useContext(Lx);
function useLS(k,i){const[v,s]=useState(()=>{try{const x=localStorage.getItem(k);return x?JSON.parse(x):i}catch{return i}});useEffect(()=>{try{localStorage.setItem(k,JSON.stringify(v))}catch{}},[k,v]);return[v,s]}
// Returns today's date string, always fresh
function todayStr(){return new Date().toDateString()}

/* ═══ i18n ═══ */
const TX={en:{onb1t:"Discover Your Prakruti",onb1d:"Understand your body, mind, and energy through 5,000 years of Ayurvedic wisdom.",onb2t:"AI Wellness Advisor",onb2d:"Describe how you feel — get personalized Ayurvedic advice powered by AI.",onb3t:"Just 3 Minutes",onb3d:"15 questions, no account, completely free.",cont:"Continue →",start:"Start the Quiz ✦",skip:"Start quiz now",qhint:"Choose what feels most naturally true",qsee:"See My Results ✦",qnext:"Continue →",cBody:"Physical",cDig:"Digestion",cSlp:"Sleep",cMind:"Mind",cEmo:"Emotions",cLife:"Lifestyle",rYour:"Your constitution is",rWith:"with",rInf:"influence",rOpen:"Open My Dashboard ✦",tOv:"Overview",tFd:"Nutrition",tRi:"Rituals",tMv:"Movement",rStr:"Strengths",rImb:"Imbalanced",rHerb:"Herbs",rNut:"Nutrition",rFav:"✓ Favor",rAvd:"✕ Avoid",rMorn:"Morning Ritual",rSlp:"Sleep Protocol",rEx:"Exercise",dPlan:"Plan",dRtk:"Retake",dHow:"How are you feeling today?",dHowPh:"e.g. headache, feeling tired, stressed...",dyH:"Tell Prakruti how you feel for personalized daily tips.",gM:"Good morning",gA:"Good afternoon",gE:"Good evening",sSpr:"Spring",sSum:"Summer",sAut:"Autumn",sWin:"Winter",aiL:"✦ Prakruti AI",aiTh:"Analyzing...",today:"Today",discover:"Discover",report:"Report",ritT:"Daily Checklist",ritD:"done",wisT:"Daily Wisdom",badges:"Achievements",b1:"First Check-in",b2:"7-Day Streak",b3:"Quiz Done",b4:"30 Check-ins",wrT:"This Week — Mood History",wrC:"Check-ins",wrS:"Streak",wrTop:"Most Frequent",notifQ:"Enable reminders?",notifY:"Enable",accNut:"Nutrition Guide",accMorn:"Morning Ritual",accSlp:"Sleep Protocol",accHerb:"Herbs & Supplements",accSeason:"Seasonal Advice",accEx:"Exercise Guide",accSkin:"Skin Care Guide",profT:"Your Dosha Profile",noCI:"—",aiFood:"🍽️ Eat Today",aiRitual:"🧘 Do Today",aiSkin:"🧴 Skin Today",aiMove:"🏃 Move Today",aiAvoid:"⛔ Avoid Today"},
tr:{onb1t:"Prakruti'ni Keşfet",onb1d:"5.000 yıllık Ayurveda bilgeliğiyle kendini tanı.",onb2t:"AI Sağlık Danışmanı",onb2d:"Nasıl hissettiğini anlat — AI destekli kişisel öneriler al.",onb3t:"3 Dakika Yeterli",onb3d:"15 soru, hesap yok, tamamen ücretsiz.",cont:"Devam →",start:"Testi Başlat ✦",skip:"Hemen başla",qhint:"En doğal tanımlayan seçeneği işaretleyin",qsee:"Sonuçlarımı Gör ✦",qnext:"Devam →",cBody:"Fiziksel",cDig:"Sindirim",cSlp:"Uyku",cMind:"Zihin",cEmo:"Duygular",cLife:"Yaşam Tarzı",rYour:"Senin anayasan",rWith:"ve",rInf:"etkisi",rOpen:"Dashboard'u Aç ✦",tOv:"Genel",tFd:"Beslenme",tRi:"Ritüel",tMv:"Hareket",rStr:"Güçlü Yanlar",rImb:"Dengesizlikte",rHerb:"Bitkiler",rNut:"Beslenme",rFav:"✓ Tüket",rAvd:"✕ Kaçın",rMorn:"Sabah Ritüeli",rSlp:"Uyku Protokolü",rEx:"Egzersiz",dPlan:"Planın",dRtk:"Yeniden",dHow:"Bugün nasıl hissediyorsun?",dHowPh:"ör. Başım ağrıyor, yorgunum, stres...",dyH:"Prakruti'ye nasıl hissettiğini yaz, günlük ipuçların oluşsun.",gM:"Günaydın",gA:"İyi günler",gE:"İyi akşamlar",sSpr:"İlkbahar",sSum:"Yaz",sAut:"Sonbahar",sWin:"Kış",aiL:"✦ Prakruti AI",aiTh:"Analiz ediliyor...",today:"Bugün",discover:"Keşfet",report:"Rapor",ritT:"Günlük Checklist",ritD:"tamam",wisT:"Günün Bilgeliği",badges:"Başarımlar",b1:"İlk Giriş",b2:"7 Gün Seri",b3:"Test Tamam",b4:"30 Giriş",wrT:"Bu Hafta — Ruh Hali Geçmişi",wrC:"Giriş",wrS:"Seri",wrTop:"En Sık",notifQ:"Hatırlatmaları aç?",notifY:"Aç",accNut:"Beslenme Rehberi",accMorn:"Sabah Ritüeli",accSlp:"Uyku Protokolü",accHerb:"Bitkiler & Takviyeler",accSeason:"Mevsimsel Tavsiyeler",accEx:"Egzersiz Rehberi",accSkin:"Cilt Bakım Rehberi",profT:"Dosha Profilin",noCI:"—",aiFood:"🍽️ Bugün Ye",aiRitual:"🧘 Bugün Yap",aiSkin:"🧴 Bugün Cilt",aiMove:"🏃 Bugün Hareket",aiAvoid:"⛔ Bugün Kaçın"}};
const catMap={body:"cBody",digestion:"cDig",sleep:"cSlp",mind:"cMind",emotion:"cEmo",lifestyle:"cLife"};
const cols={vata:"#B8956A",pitta:"#C46A42",kapha:"#5A8F5E"};const dims={vata:"rgba(184,149,106,.08)",pitta:"rgba(196,106,66,.08)",kapha:"rgba(90,143,94,.08)"};const glows={vata:"rgba(184,149,106,.25)",pitta:"rgba(196,106,66,.25)",kapha:"rgba(90,143,94,.25)"};
function getSeason(){const m=new Date().getMonth();if(m>=2&&m<=4)return"spring";if(m>=5&&m<=7)return"summer";if(m>=8&&m<=10)return"autumn";return"winter";}
const SI={spring:"🌸",summer:"☀️",autumn:"🍂",winter:"❄️"};const sKey={spring:"sSpr",summer:"sSum",autumn:"sAut",winter:"sWin"};

/* ═══ DATA ═══ */
const QS={en:[{id:1,cat:"body",ic:"🦴",q:"What is your natural body frame?",o:[{t:"Thin, light — hard to gain weight",d:"vata"},{t:"Medium, muscular",d:"pitta"},{t:"Broad, sturdy — gain easily",d:"kapha"}]},{id:2,cat:"body",ic:"✋",q:"How is your skin?",o:[{t:"Dry, rough, cool",d:"vata"},{t:"Warm, oily, rash-prone",d:"pitta"},{t:"Thick, smooth, moist",d:"kapha"}]},{id:3,cat:"body",ic:"💇",q:"How is your hair?",o:[{t:"Dry, frizzy, thin",d:"vata"},{t:"Fine, oily, early greying",d:"pitta"},{t:"Thick, wavy, lustrous",d:"kapha"}]},{id:4,cat:"digestion",ic:"🍽️",q:"How is your appetite?",o:[{t:"Irregular",d:"vata"},{t:"Strong — irritable if skipped",d:"pitta"},{t:"Slow — can skip meals",d:"kapha"}]},{id:5,cat:"digestion",ic:"😌",q:"After eating?",o:[{t:"Bloated or gassy",d:"vata"},{t:"Warm — sometimes heartburn",d:"pitta"},{t:"Heavy, want to nap",d:"kapha"}]},{id:6,cat:"sleep",ic:"🌙",q:"How do you sleep?",o:[{t:"Light, interrupted",d:"vata"},{t:"Fall asleep easy, wake sharp",d:"pitta"},{t:"Deep, long, hard to wake",d:"kapha"}]},{id:7,cat:"sleep",ic:"⏰",q:"Natural sleep duration?",o:[{t:"< 6 hours",d:"vata"},{t:"6–8 hours",d:"pitta"},{t:"> 8 hours",d:"kapha"}]},{id:8,cat:"mind",ic:"🧠",q:"Mind under pressure?",o:[{t:"Overthink, scattered",d:"vata"},{t:"Analyze, solve fast",d:"pitta"},{t:"Stay calm, slow",d:"kapha"}]},{id:9,cat:"mind",ic:"💭",q:"Your memory?",o:[{t:"Quick learn, quick forget",d:"vata"},{t:"Sharp, detailed",d:"pitta"},{t:"Slow learn, never forget",d:"kapha"}]},{id:10,cat:"mind",ic:"😤",q:"Stress response?",o:[{t:"Anxious, worried",d:"vata"},{t:"Angry, frustrated",d:"pitta"},{t:"Withdraw, quiet",d:"kapha"}]},{id:11,cat:"emotion",ic:"💔",q:"Biggest struggle?",o:[{t:"Fear & anxiety",d:"vata"},{t:"Anger & jealousy",d:"pitta"},{t:"Attachment",d:"kapha"}]},{id:12,cat:"emotion",ic:"⚖️",q:"Decision making?",o:[{t:"Impulsive",d:"vata"},{t:"Decisive",d:"pitta"},{t:"Slow",d:"kapha"}]},{id:13,cat:"lifestyle",ic:"🏃",q:"Exercise?",o:[{t:"Love it, tire fast",d:"vata"},{t:"Competitive",d:"pitta"},{t:"Prefer slow pace",d:"kapha"}]},{id:14,cat:"lifestyle",ic:"⚡",q:"Daily energy?",o:[{t:"Bursts then crash",d:"vata"},{t:"Strong, consistent",d:"pitta"},{t:"Steady but low",d:"kapha"}]},{id:15,cat:"lifestyle",ic:"🌡️",q:"Climate?",o:[{t:"Warm, humid",d:"vata"},{t:"Cool",d:"pitta"},{t:"Warm, dry",d:"kapha"}]}],
tr:[{id:1,cat:"body",ic:"🦴",q:"Vücut yapınız?",o:[{t:"İnce, hafif",d:"vata"},{t:"Orta, kaslı",d:"pitta"},{t:"Geniş, sağlam",d:"kapha"}]},{id:2,cat:"body",ic:"✋",q:"Cildiniz?",o:[{t:"Kuru, serin",d:"vata"},{t:"Sıcak, yağlı",d:"pitta"},{t:"Kalın, nemli",d:"kapha"}]},{id:3,cat:"body",ic:"💇",q:"Saçlarınız?",o:[{t:"Kuru, kırılgan",d:"vata"},{t:"İnce, yağlı",d:"pitta"},{t:"Kalın, parlak",d:"kapha"}]},{id:4,cat:"digestion",ic:"🍽️",q:"İştahınız?",o:[{t:"Düzensiz",d:"vata"},{t:"Güçlü",d:"pitta"},{t:"Yavaş",d:"kapha"}]},{id:5,cat:"digestion",ic:"😌",q:"Yemek sonrası?",o:[{t:"Şişkinlik",d:"vata"},{t:"Sıcaklık, reflü",d:"pitta"},{t:"Ağırlık",d:"kapha"}]},{id:6,cat:"sleep",ic:"🌙",q:"Uykunuz?",o:[{t:"Hafif, bölünür",d:"vata"},{t:"Kolay dalma",d:"pitta"},{t:"Derin, uzun",d:"kapha"}]},{id:7,cat:"sleep",ic:"⏰",q:"Uyku süresi?",o:[{t:"< 6 saat",d:"vata"},{t:"6–8 saat",d:"pitta"},{t:"> 8 saat",d:"kapha"}]},{id:8,cat:"mind",ic:"🧠",q:"Baskı altında?",o:[{t:"Aşırı düşünme",d:"vata"},{t:"Analiz, çözüm",d:"pitta"},{t:"Sakin, yavaş",d:"kapha"}]},{id:9,cat:"mind",ic:"💭",q:"Hafızanız?",o:[{t:"Çabuk öğren/unut",d:"vata"},{t:"Keskin",d:"pitta"},{t:"Yavaş/unutmaz",d:"kapha"}]},{id:10,cat:"mind",ic:"😤",q:"Stres?",o:[{t:"Kaygı",d:"vata"},{t:"Öfke",d:"pitta"},{t:"İçe kapanma",d:"kapha"}]},{id:11,cat:"emotion",ic:"💔",q:"En zor duygu?",o:[{t:"Korku",d:"vata"},{t:"Öfke",d:"pitta"},{t:"Bağımlılık",d:"kapha"}]},{id:12,cat:"emotion",ic:"⚖️",q:"Karar?",o:[{t:"Hızlı",d:"vata"},{t:"Kararlı",d:"pitta"},{t:"Yavaş",d:"kapha"}]},{id:13,cat:"lifestyle",ic:"🏃",q:"Egzersiz?",o:[{t:"Sever, yorulur",d:"vata"},{t:"Rekabetçi",d:"pitta"},{t:"Yavaş tempo",d:"kapha"}]},{id:14,cat:"lifestyle",ic:"⚡",q:"Enerji?",o:[{t:"Dalgalı",d:"vata"},{t:"Güçlü",d:"pitta"},{t:"Düşük",d:"kapha"}]},{id:15,cat:"lifestyle",ic:"🌡️",q:"İklim?",o:[{t:"Sıcak nemli",d:"vata"},{t:"Serin",d:"pitta"},{t:"Sıcak kuru",d:"kapha"}]}]};

const DD={en:{vata:{name:"Vata",el:"Air & Space",sym:"🌬️",desc:"Creative and energetic. Imbalanced: anxiety, dryness.",str:["Creative","Quick learner","Enthusiastic","Adaptable"],ch:["Anxiety","Irregular sleep","Sensitive digestion","Cold extremities"],fav:["Warm, cooked, oily foods","Sweet, sour, salty","Root vegetables","Ghee & sesame oil","Warm teas","Rice, wheat, oats"],avd:["Raw & cold foods","Dry crackers","Carbonated drinks","Excess caffeine","Bitter foods"],morn:["Wake by 6 AM","Sesame oil massage","Warm ginger-lemon water","10 min gentle yoga","Warm breakfast"],ex:["Gentle yoga","Nature walks","Swimming","Tai chi","Dance"],slp:["Bed by 10 PM","Warm oil foot massage","No screens 1hr before","Warm dark room","Chamomile tea"],herb:["Ashwagandha — calms","Shatavari — nourishes","Triphala — digestion","Brahmi — quiets mind"],skin:["Apply sesame or almond oil daily","Use gentle oil-based cleansers","Warm water face wash only","Honey + milk hydrating mask weekly","Drink warm water all day"]},pitta:{name:"Pitta",el:"Fire & Water",sym:"🔥",desc:"Sharp-minded and driven. Imbalanced: anger, burnout.",str:["Natural leader","Sharp intellect","Decisive","Strong digestion"],ch:["Anger","Perfectionism","Overheating","Burnout"],fav:["Cool foods","Sweet, bitter, astringent","Cucumber, coconut, greens","Coconut oil & ghee","Mint teas","Barley, oats"],avd:["Spicy foods","Red meat","Alcohol & caffeine","Sour fruits","Fried foods"],morn:["Wake by 6 AM","Cool face wash","Sitali pranayama","Moderate yoga","Light breakfast"],ex:["Swimming","Cycling","Cooling yoga","Hiking","Team sports"],slp:["Sleep by 10-11 PM","Cool bedroom","No late work","Coconut oil massage","Rose tea"],herb:["Brahmi — cools","Amalaki — anti-inflammatory","Neem — purifies","Shatavari — balances"],skin:["Use coconut oil or aloe vera","Rose water toner daily","Avoid sun 11am-3pm","Sandalwood + rose water mask","Go natural — no harsh chemicals"]},kapha:{name:"Kapha",el:"Earth & Water",sym:"🌿",desc:"Loyal and patient. Imbalanced: lethargy, stagnation.",str:["Stable","Loyal","Patient","Enduring"],ch:["Lethargy","Weight gain","Comfort attachment","Slow metabolism"],fav:["Light, dry, warm foods","Pungent, bitter, astringent","Legumes & greens","Honey","Ginger & pepper teas","Millet, buckwheat"],avd:["Heavy, oily, cold foods","Excess dairy","Sweets","Wheat & bread","Fried foods"],morn:["Wake by 6 AM strictly","Dry brushing","Ginger-honey-pepper water","Vigorous exercise","Light breakfast"],ex:["Running","Vinyasa yoga","HIIT","Dancing","Uphill cycling"],slp:["Sleep 10 PM, wake 6 AM","No napping","Dry warm room","Evening walk","Tulsi tea"],herb:["Trikatu — metabolism","Guggulu — reduces Kapha","Tulsi — uplifts","Triphala — cleanses"],skin:["Dry brush before shower","Light oils — jojoba or sunflower","Chickpea flour exfoliation 2x/week","Steam face with eucalyptus","No heavy creams"]}},
tr:{vata:{name:"Vata",el:"Hava & Uzay",sym:"🌬️",desc:"Yaratıcı ve enerjik. Dengesizlikte kaygı, kuruluk.",str:["Yaratıcı","Hızlı öğrenen","Coşkulu","Değişime açık"],ch:["Kaygı","Düzensiz uyku","Hassas sindirim","Soğuk el-ayak"],fav:["Sıcak, pişmiş, yağlı","Tatlı, ekşi, tuzlu","Kök sebzeler","Ghee, susam yağı","Sıcak çaylar","Pirinç, buğday, yulaf"],avd:["Çiğ ve soğuk","Kuru kraker","Gazlı içecekler","Kafein","Acı ve buruk"],morn:["06:00'da uyan","Susam yağı masajı","Zencefilli limonlu su","10 dk hafif yoga","Sıcak kahvaltı"],ex:["Hafif yoga","Doğa yürüyüşü","Yüzme","Tai chi","Dans"],slp:["22:00'da yat","Sıcak yağ ayak masajı","Ekran yok","Sıcak karanlık oda","Papatya çayı"],herb:["Ashwagandha — sakinleştirir","Shatavari — besler","Triphala — sindirim","Brahmi — yatıştırır"],skin:["Günlük susam veya badem yağı","Yumuşak yağ bazlı temizleyici","Sadece ılık suyla yıka","Haftalık bal+süt maskesi","Gün boyu ılık su iç"]},pitta:{name:"Pitta",el:"Ateş & Su",sym:"🔥",desc:"Keskin zekalı, kararlı. Dengesizlikte öfke, tükenmişlik.",str:["Lider","Keskin zeka","Kararlı","Güçlü sindirim"],ch:["Öfke","Mükemmeliyetçilik","Isınma","Tükenmişlik"],fav:["Serin yiyecekler","Tatlı, acı, buruk","Salatalık, hindistan cevizi","Hindistan cevizi yağı","Nane çayları","Arpa, yulaf"],avd:["Baharatlı","Kırmızı et","Alkol, kafein","Ekşi meyveler","Kızartma"],morn:["06:00'da uyan","Serin suyla yüz yıka","Sitali pranayama","Orta şiddetli yoga","Hafif kahvaltı"],ex:["Yüzme","Bisiklet","Serinletici yoga","Doğa yürüyüşü","Takım sporları"],slp:["22-23:00'da uyu","Serin oda","Geç çalışma yapma","Hindistan cevizi yağı masajı","Gül çayı"],herb:["Brahmi — serinletir","Amalaki — anti-inflamatuar","Neem — arındırır","Shatavari — dengeler"],skin:["Hindistan cevizi yağı veya aloe vera","Günlük gül suyu tonik","11-15 arası güneşten kaçın","Sandal ağacı+gül suyu maskesi","Doğal ürünler kullan"]},kapha:{name:"Kapha",el:"Toprak & Su",sym:"🌿",desc:"Sadık, sabırlı. Dengesizlikte letarji, durgunluk.",str:["İstikrarlı","Sadık","Sabırlı","Dayanıklı"],ch:["Halsizlik","Kilo alma","Bağımlılık","Yavaş metabolizma"],fav:["Hafif, kuru, sıcak","Acı, yakıcı, buruk","Baklagiller, yeşillikler","Bal","Zencefil, karabiber çayları","Darı, karabuğday"],avd:["Ağır, yağlı, soğuk","Süt ürünleri","Şeker","Buğday, ekmek","Tuzlu, kızartılmış"],morn:["06:00'da kesinlikle uyan","Kuru fırçalama","Zencefil-bal-karabiber su","Yoğun egzersiz","Hafif kahvaltı"],ex:["Koşu","Vinyasa yoga","HIIT","Dans","Yokuş bisikleti"],slp:["22:00-06:00","Gündüz uyuma","Kuru sıcak oda","Akşam yürüyüşü","Tulsi çayı"],herb:["Trikatu — metabolizma","Guggulu — azaltır","Tulsi — canlandırır","Triphala — temizler"],skin:["Duştan önce kuru fırçalama","Hafif yağlar — jojoba, ayçiçeği","Haftada 2x nohut unu peeling","Okaliptüslü buhar","Ağır krem kullanma"]}}};

const STIPS={en:{spring:{vata:"Spring moisture grounds Vata.",pitta:"Neutral. Bitter greens cleanse.",kapha:"Toughest season. More exercise."},summer:{vata:"Heat worsens Vata. Stay hydrated.",pitta:"Most critical. Cool foods.",kapha:"Balances Kapha. Be active."},autumn:{vata:"Aggravates Vata — stay warm.",pitta:"Cools Pitta. Focus season.",kapha:"Keep moving."},winter:{vata:"Cold amplifies anxiety. Warmth.",pitta:"Heals Pitta. Rest.",kapha:"Hardest time. Discipline."}},
tr:{spring:{vata:"Nem topraklar.",pitta:"Nötr. Yeşillikler arındırır.",kapha:"En zor mevsim."},summer:{vata:"Sıcak artırır. Bol su.",pitta:"En kritik. Serinletici gıdalar.",kapha:"Dengeler. Aktif ol."},autumn:{vata:"Tetikler — sıcak kal.",pitta:"Serinletir. Odaklan.",kapha:"Harekete devam."},winter:{vata:"Soğuk kaygıyı artırır.",pitta:"Şifa. Dinlen.",kapha:"Disiplin şart."}}};

const WISDOM={en:["When diet is wrong, medicine is of no use. When diet is correct, medicine is of no need.","The body is your temple. Keep it pure and clean for the soul to reside in.","Every human being is the author of their own health or disease.","He who has health has hope, and he who has hope has everything.","The natural healing force within each of us is the greatest force in getting well.","Balance is the perfect state of still water.","Sleep is the best meditation."],
tr:["Diyet yanlışsa ilaç faydasız, doğruysa ilaca gerek yok.","Beden tapınağındır. Ruhun için saf tut.","Her insan kendi sağlığının yazarıdır.","Sağlığı olan umut eder, umudu olan her şeye sahiptir.","İçimizdeki doğal iyileşme gücü en büyük güçtür.","Denge, durgun suyun mükemmel halidir.","Uyku en iyi meditasyondur."]};

/* ═══ AI ═══ */
async function getAIAdvice(txt,dName,dEl,lang,season){
const sysNote=`Respond in ${lang==="tr"?"Turkish":"English"}. The user's dosha is ${dName} (${dEl}). Season: ${season}.
You are Prakruti AI, an Ayurvedic wellness advisor. Based on the user's complaint, give advice in EXACTLY this format with these 5 headers (use the exact emoji+text as headers):
🍽️ FOOD: (1-2 sentences — what to eat/drink today)
🧘 RITUAL: (1-2 sentences — breathing, meditation, or self-care to do)
🧴 SKIN: (1 sentence — skin care tip related to their state)
🏃 MOVEMENT: (1 sentence — exercise recommendation)
⛔ AVOID: (1 sentence — what to avoid today)
Keep total under 120 words. Be specific to their dosha and complaint. No medical diagnoses.`;
try{const r=await fetch("/api/ai-advisor",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userText:txt,doshaName:dName,doshaEl:dEl,lang,season,sysOverride:sysNote})});const d=await r.json();if(d.error)throw 0;return d.content?.map(b=>b.type==="text"?b.text:"").join("")||""}catch{return null}}

function parseAIResponse(text){
if(!text)return null;
const sections={food:"",ritual:"",skin:"",move:"",avoid:""};
const lines=text.split("\n").filter(l=>l.trim());
let current=null;
for(const line of lines){
const l=line.trim();
if(l.includes("🍽️")||l.toLowerCase().includes("food"))current="food";
else if(l.includes("🧘")||l.toLowerCase().includes("ritual"))current="ritual";
else if(l.includes("🧴")||l.toLowerCase().includes("skin"))current="skin";
else if(l.includes("🏃")||l.toLowerCase().includes("move"))current="move";
else if(l.includes("⛔")||l.toLowerCase().includes("avoid"))current="avoid";
if(current){
let clean=l.replace(/^[🍽️🧘🧴🏃⛔]+\s*/,"").replace(/^(FOOD|RITUAL|SKIN|MOVEMENT|AVOID|BESLENME|RİTÜEL|CİLT|HAREKET|KAÇIN)\s*[:：]\s*/i,"").trim();
if(clean&&clean!==l.split(":")[0]?.trim())sections[current]+=(sections[current]?" ":"")+clean;
}}
return sections}

/* ═══ COMPONENTS ═══ */
function LS(){const{lang,setLang}=useLang();return<button className="lsw" onClick={()=>setLang(lang==="en"?"tr":"en")}>{lang==="en"?"TR":"EN"}</button>}
function Accordion({icon,title,children}){const[open,setOpen]=useState(false);return<div className="acc"><div className="acc-hd" onClick={()=>setOpen(!open)}><div className="acc-hd-left"><span className="acc-icon">{icon}</span><span className="acc-title">{title}</span></div><span className={`acc-arrow${open?" open":""}`}>▾</span></div>{open&&<div className="acc-body">{children}</div>}</div>}
function DayCard({icon,title,children}){return<div className="dy-card"><div className="dy-hd"><span className="dy-icon">{icon}</span><span className="dy-title">{title}</span></div><div className="dy-body">{children}</div></div>}

function Onboarding({onStart}){const{lang}=useLang();const t=TX[lang];const[s,setS]=useState(0);
const sl=[{i:"🕉️",tt:t.onb1t,dd:t.onb1d},{i:"🤖",tt:t.onb2t,dd:t.onb2d},{i:"✨",tt:t.onb3t,dd:t.onb3d}];
return<div className="pg onb"><div className="obg"><div className="orb o1"/><div className="orb o2"/></div><div className="oc"><LS/><div className="os" key={s}><span className="oi">{sl[s].i}</span><h1 className="ot">{sl[s].tt}</h1><p className="odc">{sl[s].dd}</p></div><div className="dots">{sl.map((_,i)=><div key={i} className={`dot${i===s?" don":""}`}/>)}</div>{s<2?<button className="btn bl" onClick={()=>setS(s+1)}>{t.cont}</button>:<button className="btn bl" onClick={onStart}>{t.start}</button>}{s<2&&<button className="bt" onClick={onStart}>{t.skip}</button>}</div></div>}

function Quiz({onFinish,onBack}){const{lang}=useLang();const t=TX[lang];const qs=QS[lang];const[step,setStep]=useState(0);const[sc,setSc]=useState({vata:0,pitta:0,kapha:0});const[sel,setSel]=useState(null);const[ani,setAni]=useState(false);const q=qs[step];const pct=(step/qs.length)*100;
const nx=useCallback(()=>{if(!sel||ani)return;setAni(true);const ns={...sc,[sel]:sc[sel]+3};setSc(ns);setTimeout(()=>{if(step+1>=qs.length)onFinish(ns);else{setStep(step+1);setSel(null);setAni(false)}},250)},[sel,ani,sc,step,onFinish,qs.length]);
return<div className="pg qz"><div className="qn"><button className="qb" onClick={onBack}>←</button><div className="qp"><div className="qtr"><div className="qfl" style={{width:`${pct}%`}}/></div><span className="qc">{step+1}/{qs.length}</span></div></div><div className="qbd"><div className="qcd" key={step}><div className="qct"><span>{q.ic}</span>{t[catMap[q.cat]]}</div><h2 className="qq">{q.q}</h2><div className="qos">{q.o.map((o,i)=><button key={i} className={`qo${sel===o.d?" qon":""}`} onClick={()=>!ani&&setSel(o.d)}><div className={`qr${sel===o.d?" qrn":""}`}>{sel===o.d&&<div className="qrd"/>}</div><span>{o.t}</span></button>)}</div><button className={`qnx${sel?" qnxn":""}`} onClick={nx} disabled={!sel}>{step+1===qs.length?t.qsee:t.qnext}</button><p className="qh">{t.qhint}</p></div></div></div>}

function Result({scores,onDash}){const{lang}=useLang();const t=TX[lang];const D=DD[lang];const total=scores.vata+scores.pitta+scores.kapha;const sorted=Object.entries(scores).sort((a,b)=>b[1]-a[1]);const pri=sorted[0][0],sec=sorted[1][0],d=D[pri];const[tab,setTab]=useState("ov");
useEffect(()=>{localStorage.setItem("doshaScores",JSON.stringify(scores));localStorage.setItem("doshaType",pri);localStorage.setItem("doshaSecondary",sec)},[scores,pri,sec]);
const tabs=[{id:"ov",l:t.tOv},{id:"fd",l:t.tFd},{id:"ri",l:t.tRi},{id:"mv",l:t.tMv}];
return<div className="pg rp" style={{"--dc":cols[pri],"--dd":dims[pri],"--dg":glows[pri]}}><div className="rh"><span className="ov">{t.rYour}</span><h1 className="rn">{d.name}</h1><span className="re">{d.el}</span><p className="rs">{t.rWith} <em>{D[sec].name}</em> {t.rInf}</p><p className="rd">{d.desc}</p><div className="rbs">{sorted.map(([k,v])=><div className="rbr" key={k}><span className="rbl" style={{color:cols[k]}}>{D[k].name}</span><div className="rbt"><div className="rbf" style={{width:`${(v/total)*100}%`,background:cols[k]}}/></div><span className="rbp">{Math.round((v/total)*100)}%</span></div>)}</div></div>
<div className="tbs">{tabs.map(tb=><button key={tb.id} className={`tb${tab===tb.id?" tbn":""}`} onClick={()=>setTab(tb.id)}>{tb.l}</button>)}</div>
<div className="rc">{tab==="ov"&&<div className="rg"><div className="cd"><span className="ct">{t.rStr}</span><ul className="cl">{d.str.map(s=><li key={s}>{s}</li>)}</ul></div><div className="cd"><span className="ct">{t.rImb}</span><ul className="cl">{d.ch.map(c=><li key={c}>{c}</li>)}</ul></div><div className="cd cw"><span className="ct">{t.rHerb}</span><div className="hg">{d.herb.map(h=><div key={h} className="hi">✦ {h}</div>)}</div></div></div>}{tab==="fd"&&<div className="cd"><span className="ct">{t.rNut} {d.name}</span><div className="fc"><div><span className="fl fg">{t.rFav}</span><ul className="cl">{d.fav.map(f=><li key={f}>{f}</li>)}</ul></div><div><span className="fl fr">{t.rAvd}</span><ul className="cl">{d.avd.map(a=><li key={a}>{a}</li>)}</ul></div></div></div>}{tab==="ri"&&<div className="stk">{[{tt:t.rMorn,items:d.morn},{tt:t.rSlp,items:d.slp}].map(s=><div className="cd" key={s.tt}><span className="ct">{s.tt}</span><ol className="rl">{s.items.map((it,i)=><li key={i}><span className="rln">{i+1}</span>{it}</li>)}</ol></div>)}</div>}{tab==="mv"&&<div className="cd"><span className="ct">{t.rEx} {d.name}</span><div className="eg">{d.ex.map((e,i)=><div key={i} className="ei">◎ {e}</div>)}</div></div>}</div>
<div className="rbb"><button className="btn bl" onClick={onDash}>{t.rOpen}</button></div></div>}

/* ═══ WEEKLY REPORT — with mood history ═══ */
function WeeklyReport({lang}){const t=TX[lang];
const days=useMemo(()=>{const r=[];const dn=lang==="tr"?["Pzt","Sal","Çar","Per","Cum","Cmt","Paz"]:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];const td=new Date();const dow=td.getDay()||7;
for(let i=1;i<=7;i++){const d=new Date(td);d.setDate(td.getDate()-(dow-i));const k="ci_"+d.toDateString();let data=null;try{const raw=localStorage.getItem(k);if(raw)data=JSON.parse(raw)}catch{}r.push({day:dn[i-1],data,cur:i===dow})}return r},[lang]);
const cnt=days.filter(d=>d.data).length;
let streak=0;for(let i=days.length-1;i>=0;i--){if(days[i].data)streak++;else if(i<days.length-1)break}
// Top moods from last 30 days
const moodCounts=useMemo(()=>{const mc={};for(let i=0;i<30;i++){const d=new Date();d.setDate(d.getDate()-i);try{const raw=localStorage.getItem("ci_"+d.toDateString());if(raw){const p=JSON.parse(raw);if(p?.text){const txt=p.text.toLowerCase();mc[txt]=(mc[txt]||0)+1}}}catch{}}return Object.entries(mc).sort((a,b)=>b[1]-a[1]).slice(0,3)},[]);

return<div className="stk">
<div className="wr-card"><span className="ct">{t.wrT}</span>
<div className="mood-week">{days.map((d,i)=><div key={i} className="mood-row"><span className="mood-day" style={{color:d.cur?"var(--dc)":undefined}}>{d.day}</span>{d.data?<><span className="mood-text">{d.data.text?.slice(0,40)}{d.data.text?.length>40?"...":""}</span></>:<span className="mood-none">{t.noCI}</span>}</div>)}</div>
<div className="wr-stat"><div className="wr-stat-item"><div className="wr-stat-val">{cnt}/7</div><div className="wr-stat-label">{t.wrC}</div></div><div className="wr-stat-item"><div className="wr-stat-val">{streak}</div><div className="wr-stat-label">{t.wrS}</div></div></div></div>
{moodCounts.length>0&&<div className="cd"><span className="ct">{t.wrTop}</span><div className="top-moods">{moodCounts.map(([txt,ct])=><span key={txt} className="top-mood"><span className="top-mood-ct">{ct}x</span>{txt.slice(0,25)}</span>)}</div></div>}
</div>}

/* ═══ DASHBOARD ═══ */
function Dashboard({onRetake}){
const{lang}=useLang();const t=TX[lang];const D=DD[lang];const ST=STIPS[lang];
const[dt]=useState(()=>localStorage.getItem("doshaType")||"vata");const d=D[dt];
const[tab,setTab]=useState("td");

// Date-aware check-in — resets on new day
const[ciDate,setCiDate]=useState(todayStr());
const ciKey="ci_"+ciDate;
const[ci,setCi]=useLS(ciKey,null);
// Check if day changed (e.g. app left open overnight)
useEffect(()=>{const iv=setInterval(()=>{const now=todayStr();if(now!==ciDate){setCiDate(now)}},30000);return()=>clearInterval(iv)},[ciDate]);

const[aiText,setAiText]=useState("");const[aiLoading,setAiLoading]=useState(false);
const[notifOn]=useLS("prakruti_notif",null);
const[checks,setChecks]=useLS("rit_"+ciDate,[]);
const hr=new Date().getHours();const greet=hr<12?t.gM:hr<18?t.gA:t.gE;const season=getSeason();
const dayIdx=new Date().getDate();
const wisdom=WISDOM[lang][dayIdx%WISDOM[lang].length];

// Parse AI response into tip cards
const aiTips=useMemo(()=>ci?.aiResp?parseAIResponse(ci.aiResp):null,[ci]);

const handleAI=useCallback(async()=>{if(!aiText.trim()||aiLoading)return;setAiLoading(true);
const resp=await getAIAdvice(aiText.trim(),d.name,d.el,lang,season);
if(resp){setCi({text:aiText.trim(),aiResp:resp,date:ciDate})}
setAiLoading(false);setAiText("")},[aiText,aiLoading,d,lang,season,setCi,ciDate]);

const toggleCheck=i=>{setChecks(prev=>prev.includes(i)?prev.filter(x=>x!==i):[...prev,i])};
const ritPct=d.morn.length?Math.round((checks.length/d.morn.length)*100):0;

const totalCI=useMemo(()=>{let c=0;for(let i=0;i<30;i++){const x=new Date();x.setDate(x.getDate()-i);try{if(localStorage.getItem("ci_"+x.toDateString()))c++}catch{}}return c},[]);
const badgeList=[{id:"b1",earned:totalCI>=1},{id:"b2",earned:totalCI>=7},{id:"b3",earned:true},{id:"b4",earned:totalCI>=30}];

const navTabs=[{id:"td",l:t.today,ic:"◎"},{id:"di",l:t.discover,ic:"◆"},{id:"rp",l:t.report,ic:"◑"}];

return<div className="pg dsh" style={{"--dc":cols[dt],"--dd":dims[dt],"--dg":glows[dt]}}>
<div className="dhd" style={{background:`radial-gradient(ellipse at top left,${dims[dt]} 0%,transparent 60%)`}}>
<div className="dht"><span className="bsm">prakruti<span className="bdt">.</span></span><div className="dha"><LS/><span className="dbg" style={{color:cols[dt],borderColor:cols[dt]}}>{d.sym} {d.name}</span><button className="bgst bxs" onClick={onRetake}>{t.dRtk}</button></div></div>
<span className="dgr">{greet}</span><h1 className="dti">{d.name} {t.dPlan}</h1>
<div className="dtg"><span className="dtgi">{SI[season]} {t[sKey[season]]}</span><span className="dtgi">{d.el}</span></div></div>

{!notifOn&&"Notification"in window&&<div className="notif-bar"><span>{t.notifQ}</span><button className="notif-btn" onClick={()=>{Notification.requestPermission().then(p=>{if(p==="granted"){localStorage.setItem("prakruti_notif",'"on"');window.location.reload()}})}}>{t.notifY}</button></div>}

{/* AI input — only on Today tab, only if not yet submitted today */}
{tab==="td"&&<div className="aia">
{ci?.aiResp?(
<div className="ai-done"><span className="ai-done-icon">✦</span><span className="ai-done-txt">{ci.text}</span></div>
):(
<div><h3 className="ai-q">{t.dHow}</h3>
<div className="ai-iw"><textarea className="ai-in" placeholder={t.dHowPh} value={aiText} onChange={e=>setAiText(e.target.value)} rows={1} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();handleAI()}}}/><button className="ai-sd" onClick={handleAI} disabled={!aiText.trim()||aiLoading}>→</button></div>
{aiLoading&&<div className="ai-ld"><div className="ai-sp"/>{t.aiTh}</div>}
{!aiLoading&&!aiText&&<div style={{fontSize:".72rem",color:"var(--t3)",marginTop:".4rem"}}>{t.dyH}</div>}</div>
)}
</div>}

<div className="dcc" key={tab+ciDate}>
{/* ═══ TODAY ═══ */}
{tab==="td"&&<div className="stk">
<div className="cd" style={{textAlign:"center",padding:"1rem 1.25rem"}}><span className="ct">{t.wisT}</span><div className="wisdom">"{wisdom}"</div></div>

{/* AI-powered daily tip cards — or fallback to dosha defaults */}
{aiTips?(
<>{aiTips.food&&<DayCard icon="🍽️" title={t.aiFood}>{aiTips.food}</DayCard>}
{aiTips.ritual&&<DayCard icon="🧘" title={t.aiRitual}>{aiTips.ritual}</DayCard>}
{aiTips.skin&&<DayCard icon="🧴" title={t.aiSkin}>{aiTips.skin}</DayCard>}
{aiTips.move&&<DayCard icon="🏃" title={t.aiMove}>{aiTips.move}</DayCard>}
{aiTips.avoid&&<DayCard icon="⛔" title={t.aiAvoid}>{aiTips.avoid}</DayCard>}</>
):(
<>{/* Default dosha tips when no AI check-in yet */}
<DayCard icon="🍽️" title={t.aiFood}>{d.fav[dayIdx%d.fav.length]}</DayCard>
<DayCard icon="🧴" title={t.aiSkin}>{d.skin[dayIdx%d.skin.length]}</DayCard>
<DayCard icon="🏃" title={t.aiMove}>{d.ex[dayIdx%d.ex.length]}</DayCard></>
)}

<div className="cd"><div className="chd"><span className="ct">{t.ritT}</span><span className="cm">{checks.length}/{d.morn.length} {t.ritD}</span></div>
<div className="rit-prog"><div className="rit-prog-fill" style={{width:`${ritPct}%`}}/></div>
{d.morn.map((it,i)=><div key={i} className={`rit-check${checks.includes(i)?" done":""}`} onClick={()=>toggleCheck(i)}><div className={`rit-cb${checks.includes(i)?" on":""}`}>{checks.includes(i)?"✓":""}</div><span>{it}</span></div>)}</div>
</div>}

{/* ═══ DISCOVER ═══ */}
{tab==="di"&&<div className="stk">
<div className="cd ca"><span className="ct">{t.profT}</span><div style={{display:"flex",gap:".75rem",alignItems:"center"}}><span style={{fontSize:"2rem"}}>{d.sym}</span><div><div style={{fontFamily:"var(--fd)",fontSize:"1.4rem",color:"var(--dc)"}}>{d.name}</div><div style={{fontSize:".78rem",color:"var(--t2)"}}>{d.el} — {d.desc}</div></div></div></div>
<Accordion icon="🍽️" title={t.accNut}><div className="fc"><div><span className="fl fg">{t.rFav}</span><ul className="cl">{d.fav.map(f=><li key={f}>{f}</li>)}</ul></div><div><span className="fl fr">{t.rAvd}</span><ul className="cl">{d.avd.map(a=><li key={a}>{a}</li>)}</ul></div></div></Accordion>
<Accordion icon="🌅" title={t.accMorn}><ol className="rl">{d.morn.map((it,i)=><li key={i}><span className="rln">{i+1}</span>{it}</li>)}</ol></Accordion>
<Accordion icon="🌙" title={t.accSlp}><ol className="rl">{d.slp.map((it,i)=><li key={i}><span className="rln">{i+1}</span>{it}</li>)}</ol></Accordion>
<Accordion icon="🏃" title={t.accEx}><div className="eg">{d.ex.map((e,i)=><div key={i} className="ei">◎ {e}</div>)}</div></Accordion>
<Accordion icon="🧴" title={t.accSkin}><ul className="cl">{d.skin.map(s=><li key={s}>{s}</li>)}</ul></Accordion>
<Accordion icon="🌿" title={t.accHerb}><ul className="cl">{d.herb.map(h=><li key={h}>✦ {h}</li>)}</ul></Accordion>
<Accordion icon={SI[season]} title={t.accSeason}><div className="stk">{Object.entries(ST).map(([s,tips])=><div key={s} style={{marginBottom:".5rem"}}><div style={{fontSize:".72rem",color:"var(--t3)",marginBottom:".2rem"}}>{SI[s]} {t[sKey[s]]}</div><p className="sp">{tips[dt]}</p></div>)}</div></Accordion>
</div>}

{/* ═══ REPORT ═══ */}
{tab==="rp"&&<div className="stk">
<WeeklyReport lang={lang}/>
<div className="cd"><span className="ct">{t.badges}</span><div className="badges">{badgeList.map(b=><span key={b.id} className={`badge ${b.earned?"earned":"locked"}`}>{b.earned?"✦":"🔒"} {t[b.id]}</span>)}</div></div>
</div>}
</div>

<div className="bnv">{navTabs.map(tb=><button key={tb.id} className={`bnb${tab===tb.id?" bnbn":""}`} onClick={()=>setTab(tb.id)}><span className="bni">{tb.ic}</span><span className="bnl">{tb.l}</span></button>)}</div>
</div>}

/* ═══ APP ═══ */
export default function App(){
const[lang,setLang]=useLS("prakruti_lang","en");
const[page,setPage]=useState(()=>localStorage.getItem("doshaType")?"dashboard":"onboarding");
const[rs,setRs]=useState(null);
const go=useCallback(p=>{setPage(p);window.scrollTo(0,0)},[]);
return<Lx.Provider value={{lang,setLang}}><style>{CSS}</style>
{page==="onboarding"&&<Onboarding onStart={()=>go("quiz")}/>}
{page==="quiz"&&<Quiz onFinish={s=>{setRs(s);go("result")}} onBack={()=>go("onboarding")}/>}
{page==="result"&&rs&&<Result scores={rs} onDash={()=>go("dashboard")}/>}
{page==="dashboard"&&<Dashboard onRetake={()=>{localStorage.removeItem("doshaType");localStorage.removeItem("doshaSecondary");localStorage.removeItem("doshaScores");go("onboarding")}}/>}
</Lx.Provider>}
