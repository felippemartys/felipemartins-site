
// ==========================
// ESPERA DOM CARREGAR (ESSENCIAL)
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
// TRADUÇÕES
// ==========================
const translations = {

pt:{
nome:"Felipe Martins",

specialties_title:"Especialidades",

sobre:`Profissional com mais de 9 anos de experiência em telecomunicações, atuando diretamente em ambientes críticos de missão com alta disponibilidade.

Especialista em troubleshooting avançado de voz sobre IP (VoIP), análise de sinalização SIP, investigação de falhas em tempo real e sustentação de plataformas corporativas e operadoras.

Experiência sólida na identificação de problemas complexos envolvendo latência, perda de pacotes, falhas de codec, autenticação e roteamento de chamadas.`,

khomp_title:"Khomp & Oracle SBC",
khomp_desc:`Atuação profunda em ambientes de voz utilizando SBCs e gateways.

• Análise detalhada de call flow SIP
• Interpretação de logs SIP e debug avançado
• Captura e análise de pacotes com Wireshark
• Diagnóstico de falhas de autenticação SIP
• Troubleshooting de problemas de mídia RTP
• Configuração de rotas e interconexão com operadoras
• Atuação em incidentes críticos em produção`,

cloud_title:"Cloud, NICE CX & Neotel",
cloud_desc:`Experiência com plataformas omnichannel em ambientes cloud.

• Configuração e operação do NICE CX
• Domínio da plataforma Neotel NXperience
• Estruturação de fluxos de atendimento (voz)
• Integração entre sistemas via API
• Troubleshooting de falhas VoIP em ambiente cloud
• Análise de topologia e arquitetura de comunicação
• Diagnóstico de degradação de qualidade de chamadas`,

aws_title:"AWS & Automação",
aws_desc:`Atuação com serviços de armazenamento e automação.

• Gerenciamento de buckets S3
• Criação de rotinas automatizadas
• Monitoramento e análise de logs
• Troubleshooting de pipelines
• Garantia de integridade de dados`,

avaya_title:"Avaya (CM, CMS, SMGR)",
avaya_desc:`Experiência em ambientes corporativos de voz.

• Configuração de vetores, VDN e troncos SIP
• Monitoramento via CMS
• Administração via SMGR
• Troubleshooting em produção`,

experience_title:"Experiência Profissional",

actionline_title:"ACTIONLINE",

actionline_1_role:"Analista de Suporte Jr",
actionline_1_time:"2017 - 2018",
actionline_1_desc:"Suporte técnico em telecom com foco em VoIP.",

actionline_2_role:"Analista de Telecomunicações Jr",
actionline_2_time:"2018 - 2019",
actionline_2_desc:"Atuação em cenários críticos com análise avançada de falhas.",

betta_title:"BETTA GROUP",

betta_1_role:"Analista Avaya e Integração",
betta_1_time:"2019 - 2020",
betta_1_desc:"Suporte em integração de soluções de voz.",

betta_2_role:"Suporte Pleno",
betta_2_time:"2020 - 2022",
betta_2_desc:"Troubleshooting avançado VoIP.",

betta_3_role:"Especialista de Conectividade",
betta_3_time:"2022 - Atual",
betta_3_desc:"Projetos VoIP e análise SIP avançada."
},

// ================= EN =================
en:{
nome:"Felipe Martins",

specialties_title:"Specialties",

sobre:`Professional with over 9 years of experience in telecommunications, working in mission-critical environments with high availability.

Specialist in advanced VoIP troubleshooting, SIP signaling analysis, real-time failure investigation, and support of corporate and carrier platforms.

Strong experience identifying complex issues involving latency, packet loss, codec failures, authentication, and call routing.`,

khomp_title:"Khomp & Oracle SBC",
khomp_desc:`Deep experience in voice environments using SBCs and gateways.

• SIP call flow analysis
• Advanced SIP debugging
• Packet capture using Wireshark
• Authentication troubleshooting
• RTP media issues
• Routing and carrier interconnection
• Critical incident response`,

cloud_title:"Cloud, NICE CX & Neotel",
cloud_desc:`Experience with cloud omnichannel platforms.

• NICE CX configuration
• Neotel NXperience expertise
• Voice flow design
• API integrations
• VoIP troubleshooting
• Architecture analysis`,

aws_title:"AWS & Automation",
aws_desc:`Experience with storage and automation.

• S3 management
• Automation routines
• Log monitoring
• Pipeline troubleshooting`,

avaya_title:"Avaya (CM, CMS, SMGR)",
avaya_desc:`Corporate voice environment experience.

• SIP trunk configuration
• CMS monitoring
• SMGR administration
• Production troubleshooting`,

experience_title:"Professional Experience",

actionline_title:"ACTIONLINE",

actionline_1_role:"Support Analyst Jr",
actionline_1_time:"2017 - 2018",
actionline_1_desc:"Telecom technical support focused on VoIP.",

actionline_2_role:"Telecom Analyst Jr",
actionline_2_time:"2018 - 2019",
actionline_2_desc:"Advanced troubleshooting in critical environments.",

betta_title:"BETTA GROUP",

betta_1_role:"Avaya & Integration Analyst",
betta_1_time:"2019 - 2020",
betta_1_desc:"Voice integration support.",

betta_2_role:"Support Analyst",
betta_2_time:"2020 - 2022",
betta_2_desc:"Advanced VoIP troubleshooting.",

betta_3_role:"Connectivity Specialist",
betta_3_time:"2022 - Present",
betta_3_desc:"VoIP projects and SIP analysis."
},

// ================= ES =================
es:{
nome:"Felipe Martins",

specialties_title:"Especialidades",

sobre:`Profesional con más de 9 años de experiencia en telecomunicaciones en entornos críticos de alta disponibilidad.

Especialista en troubleshooting VoIP, análisis SIP y diagnóstico en tiempo real.

Experiencia en latencia, pérdida de paquetes, fallas de codec y enrutamiento.`,

khomp_title:"Khomp & Oracle SBC",
khomp_desc:`Experiencia en entornos de voz con SBCs.

• Análisis de call flow SIP
• Debug SIP
• Captura con Wireshark
• Problemas de autenticación
• RTP troubleshooting`,

cloud_title:"Cloud, NICE CX & Neotel",
cloud_desc:`Experiencia en plataformas cloud omnicanal.

• Configuración NICE CX
• Neotel NXperience
• Integraciones API
• Troubleshooting VoIP`,

aws_title:"AWS y Automatización",
aws_desc:`Experiencia en almacenamiento y automatización.

• Gestión S3
• Automatización
• Logs y monitoreo`,

avaya_title:"Avaya",
avaya_desc:`Experiencia en plataformas de voz corporativa.`,

experience_title:"Experiencia Profesional",

actionline_title:"ACTIONLINE",

actionline_1_role:"Analista Soporte Jr",
actionline_1_time:"2017 - 2018",
actionline_1_desc:"Soporte telecom enfocado en VoIP.",

actionline_2_role:"Analista Telecom Jr",
actionline_2_time:"2018 - 2019",
actionline_2_desc:"Troubleshooting avanzado.",

betta_title:"BETTA GROUP",

betta_1_role:"Analista Avaya",
betta_1_time:"2019 - 2020",
betta_1_desc:"Integración de voz.",

betta_2_role:"Soporte",
betta_2_time:"2020 - 2022",
betta_2_desc:"VoIP troubleshooting.",

betta_3_role:"Especialista Conectividade",
betta_3_time:"2022 - Atual",
betta_3_desc:"Projetos VoIP."
}

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
        },1300);
      }
    });
  },{threshold:0.6});

  items.forEach(i=>observer.observe(i));
}


// ==========================
// MODAL CERTIFICAÇÕES (CORRIGIDO)
// ==========================
const certData = {
  "wireshark": {
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
  "cybersecurity": {
    title: "Cybersecurity",
    text: "Introdução à cibersegurança com foco em proteção de redes e análise de ameaças."
  },
  "oracle-sbc": {
    title: "Oracle Communications SBC (Training)",
    text: "Treinamento preparatório focado em Oracle Communications Session Border Controller (SBC), SIP e segurança de borda.",
    warning: "Este certificado NÃO é oficial da Oracle. Trata-se de um curso preparatório realizado via Udemy."
  }
};


// ==========================
// MODAL
// ==========================
function openCert(key){

  const modal = document.getElementById("certModal");
  const data = certData[key];

  document.getElementById("modalTitle").innerText = data.title;
  document.getElementById("modalText").innerText = data.text;

  const warningEl = document.getElementById("modalWarning");

  if(warningEl){
    if(data.warning){
      warningEl.innerText = data.warning;
      warningEl.style.display = "block";
    } else {
      warningEl.style.display = "none";
    }
  }

  modal.style.display = "flex";
}


// ==========================
function closeCert(){
  document.getElementById("certModal").style.display = "none";
}
