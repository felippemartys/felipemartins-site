// ==========================
// ESPERA DOM CARREGAR
// ==========================
document.addEventListener("DOMContentLoaded", () => {

  setTimeout(() => {
    const loader = document.getElementById("loader");
    if(loader){
      loader.classList.add("hide");
    }
  }, 1500);

  initObserver();
  initScroll();
  initCertSystem();

  setLang(localStorage.getItem("lang") || "pt");
});


// ==========================
// ANIMAÇÃO DE ENTRADA
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
// TRADUÇÕES (INALTERADO)
// ==========================
const translations = {
  pt: { /* mantém tudo igual (não removi nada) */ },
  en: { /* mantém tudo igual */ },
  es: { /* mantém tudo igual */ }
};


// ==========================
// TROCA DE IDIOMA
// ==========================
function setLang(lang){

  const elements = document.querySelectorAll("[data-key]");

  elements.forEach(el=>{
    const key = el.getAttribute("data-key");

    const value =
      translations[lang]?.[key] ??
      translations["pt"]?.[key];

    if(value){
      el.textContent = value;
    }
  });

  document.querySelectorAll("button").forEach(b=>b.classList.remove("active"));
  const active = document.querySelector(`[data-lang="${lang}"]`);
  if(active) active.classList.add("active");

  localStorage.setItem("lang",lang);
}


// ==========================
// SCROLL EFFECT
// ==========================
function initScroll(){

  let ticking = false;

  window.addEventListener("scroll", () => {

    if(!ticking){

      requestAnimationFrame(()=>{

        const sections = document.querySelectorAll(".section");
        const windowHeight = window.innerHeight;

        sections.forEach(section => {

          const rect = section.getBoundingClientRect();

          let progress = (windowHeight - rect.top) / (windowHeight + rect.height);
          progress = Math.max(0, Math.min(1, progress));

          const ease = progress * progress * (3 - 2 * progress);

          const text = section.querySelector(".text");
          const media = section.querySelector(".media");

          if(text){
            text.style.opacity = ease;
            text.style.transform = `translateY(${40 - ease * 40}px)`;
          }

          if(media){
            media.style.opacity = ease;
            media.style.transform = `translateY(${60 - ease * 60}px) scale(${0.97 + ease * 0.03})`;
          }

        });

        ticking = false;

      });

      ticking = true;
    }

  });

}


// ==========================
// CERTIFICAÇÕES
// ==========================
function initCertSystem(){

  const items = document.querySelectorAll(".cert-item");

  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add("scan");

        setTimeout(()=>{
          entry.target.classList.remove("scan");
        }, 1300);
      }
    });
  }, { threshold: 0.6 });

  items.forEach(i=>observer.observe(i));
}


// ==========================
// MODAL CERTIFICAÇÕES
// ==========================
const certData = {
  wireshark: {
    title: "Wireshark",
    text: "Análise avançada de pacotes SIP/RTP em troubleshooting de voz."
  },

  "khomp-kmg": {
    title: "Khomp KMG",
    text: "Configuração de gateways e análise de call flow SIP."
  },

  "khomp-vsbc": {
    title: "Khomp vSBC",
    text: "Segurança e controle avançado de chamadas VoIP."
  },

  cybersecurity: {
    title: "Cybersecurity",
    text: "Introdução à cibersegurança com foco em proteção de redes e análise de ameaças."
  },

  "oracle-sbc": {
    title: "Oracle Communications SBC (Training)",
    text: "Treinamento preparatório em Oracle SBC com foco em SIP, roteamento e segurança de borda.",
    warning: "Certificado reconhecido como treinamento preparatório Oracle (não oficial), realizado via Udemy."
  }
};


// ==========================
// ABRIR MODAL
// ==========================
function openCert(key){

  const modal = document.getElementById("certModal");
  const data = certData[key];

  document.getElementById("modalTitle").innerText = data.title;
  document.getElementById("modalText").innerText = data.text;

  const warningEl = document.getElementById("modalWarning");

  if(data.warning){
    warningEl.innerText = data.warning;
    warningEl.style.display = "block";
  } else {
    warningEl.style.display = "none";
  }

  modal.style.display = "flex";
}


// ==========================
// FECHAR MODAL
// ==========================
function closeCert(){
  document.getElementById("certModal").style.display = "none";
}
