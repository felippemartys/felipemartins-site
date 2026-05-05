// ==========================
// ESPERA DOM CARREGAR
// ==========================
document.addEventListener("DOMContentLoaded", () => {

  setTimeout(() => {
    const loader = document.getElementById("loader");
    if (loader) loader.classList.add("hide");
  }, 1500);

  initObserver();
  initScroll();
  initCertSystem();

  setLang(localStorage.getItem("lang") || "pt");
});


// ==========================
// ANIMAÇÃO ENTRADA
// ==========================
function initObserver(){
  const sections = document.querySelectorAll('.section');

  const observer = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('show');
      }
    });
  },{threshold:0.3});

  sections.forEach(s=>observer.observe(s));
}


// ==========================
// TRADUÇÕES
// ==========================
const translations = {
  pt: {
    nome:"Felipe Martins",
    specialties_title:"Especialidades",
    sobre:"Profissional com 9+ anos em telecom...",
    experience_title:"Experiência Profissional",
    actionline_title:"ACTIONLINE",
    betta_title:"BETTA GROUP"
  },
  en: {
    nome:"Felipe Martins",
    specialties_title:"Specialties",
    sobre:"Professional with 9+ years in telecom...",
    experience_title:"Professional Experience",
    actionline_title:"ACTIONLINE",
    betta_title:"BETTA GROUP"
  },
  es: {
    nome:"Felipe Martins",
    specialties_title:"Especialidades",
    sobre:"Profesional con más de 9 años...",
    experience_title:"Experiencia Profesional",
    actionline_title:"ACTIONLINE",
    betta_title:"BETTA GROUP"
  }
};


// ==========================
// IDIOMA
// ==========================
function setLang(lang){
  document.querySelectorAll("[data-key]").forEach(el=>{
    const key = el.getAttribute("data-key");
    const value = translations[lang]?.[key] || translations.pt?.[key];
    if(value) el.textContent = value;
  });

  document.querySelectorAll("button").forEach(b=>b.classList.remove("active"));
  const active = document.querySelector(`[data-lang="${lang}"]`);
  if(active) active.classList.add("active");

  localStorage.setItem("lang", lang);
}


// ==========================
// SCROLL EFFECT
// ==========================
function initScroll(){

  let ticking = false;

  window.addEventListener("scroll", () => {
    if (ticking) return;

    requestAnimationFrame(() => {

      document.querySelectorAll(".section").forEach(section => {

        const rect = section.getBoundingClientRect();
        const h = window.innerHeight;

        let progress = (h - rect.top) / (h + rect.height);
        progress = Math.max(0, Math.min(1, progress));

        const ease = progress * progress * (3 - 2 * progress);

        const text = section.querySelector(".text");
        const media = section.querySelector(".media");

        if(text){
          text.style.opacity = ease;
          text.style.transform = `translateY(${40 - ease*40}px)`;
        }

        if(media){
          media.style.opacity = ease;
          media.style.transform = `translateY(${60 - ease*60}px) scale(${0.97 + ease*0.03})`;
        }

      });

      ticking = false;
    });

    ticking = true;
  });
}


// ==========================
// CERTIFICAÇÕES
// ==========================
function initCertSystem(){
  const items = document.querySelectorAll(".cert-item");

  const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add("scan");
        setTimeout(()=> entry.target.classList.remove("scan"), 1200);
      }
    });
  }, {threshold:0.6});

  items.forEach(i=>observer.observe(i));
}


// ==========================
// MODAL CERTS
// ==========================
const certData = {
  wireshark: {
    title: "Wireshark",
    text: "Análise SIP/RTP e troubleshooting de voz."
  },
  "khomp-kmg": {
    title: "Khomp KMG",
    text: "Gateways SIP, E1 e análise de call flow."
  },
  "khomp-vsbc": {
    title: "Khomp vSBC",
    text: "Controle de borda SIP e segurança VoIP."
  },
  cybersecurity: {
    title: "Cybersecurity",
    text: "Proteção de redes e análise de ameaças."
  },
  "oracle-sbc": {
    title: "Oracle SBC (Treinamento)",
    text: "Treinamento de SBC Oracle focado em SIP, roteamento e troubleshooting.",
    warning: "⚠ Não oficial Oracle - curso Udemy / preparatório."
  }
};


// ==========================
// OPEN / CLOSE MODAL
// ==========================
function openCert(key){

  const data = certData[key];
  if(!data) return;

  document.getElementById("modalTitle").innerText = data.title;
  document.getElementById("modalText").innerText = data.text;

  const warn = document.getElementById("modalWarning");
  if(warn){
    warn.innerText = data.warning || "";
    warn.style.display = data.warning ? "block" : "none";
  }

  document.getElementById("certModal").style.display = "flex";
}

function closeCert(){
  document.getElementById("certModal").style.display = "none";
}
