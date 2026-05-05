// ==========================
// ESPERA DOM CARREGAR (ESSENCIAL)
// ==========================
document.addEventListener("DOMContentLoaded", () => {

  initLoader(); // 🔥 NOVO LOADER TERMINAL

  initObserver();
  initScroll();

  setLang(localStorage.getItem("lang") || "pt");

});


// ==========================
// LOADER SIMPLES
// ==========================
function initLoader(){

  setTimeout(() => {
    const loader = document.getElementById("loader");
    if(loader){
      loader.classList.add("hide");
    }
  }, 1500);

}

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
// TRADUÇÕES (MANTIDO)
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
• Criação de rotinas automatizadas com Syncovery
• Integração entre sistemas via transferência de arquivos
• Monitoramento e análise de logs
• Troubleshooting de falhas em pipelines automatizados
• Garantia de integridade e consistência de dados`,

avaya_title:"Avaya (CM, CMS, SMGR)",
avaya_desc:`Experiência em ambientes corporativos de voz.

• Configuração de vetores, VDN e troncos SIP no Avaya CM
• Monitoramento e relatórios via CMS
• Administração via Session Manager (SMGR)
• Análise de chamadas e fluxos de atendimento
• Troubleshooting de falhas em produção
• Diagnóstico de problemas de sinalização e roteamento`,

experience_title:"Experiência Profissional",

actionline_title:"ACTIONLINE",

actionline_1_role:"Analista de Suporte Jr",
actionline_1_time:"2017 - 2018",
actionline_1_desc:`Atuação em suporte técnico de telecomunicações com foco em atendimento de incidentes de voz (VoIP) e infraestrutura de comunicação corporativa.`,

actionline_2_role:"Analista de Telecomunicações Jr",
actionline_2_time:"2018 - 2019",
actionline_2_desc:`Evolução para atuação em cenários mais críticos, com foco em análise avançada de falhas e suporte a integrações de sistemas de voz.

• Diagnóstico de falhas SIP
• Análise de qualidade de chamadas
• Suporte a incidentes críticos`,

betta_title:"BETTA GROUP",

betta_1_role:"Analista Avaya e Integração de Telecom",
betta_1_time:"2019 - 2020",
betta_1_desc:`Atuação em incidentes de integração de soluções de voz e suporte a ambientes de alta complexidade.`,

betta_2_role:"Sustentação de Suporte Pleno",
betta_2_time:"2020 - 2022",
betta_2_desc:`Suporte a ambientes corporativos de voz e troubleshooting avançado de plataformas VoIP.`,

betta_3_role:"Especialista de Conectividade",
betta_3_time:"2022 - Atual",
betta_3_desc:`Atuação em projetos VoIP (NICE CX, SIP, SBC KHOMP e Oracle).

Responsável por troubleshooting avançado de VoIP e análise de sinalização SIP.

• Sustentação de ambientes VoIP corporativos
• Call flow SIP ponta a ponta
• SBCs e gateways
• Incidentes críticos`
}

};


// ==========================
// TROCA DE IDIOMA
// ==========================
function setLang(lang){

  const elements = document.querySelectorAll("[data-key]");

  elements.forEach(el=>{
    const key = el.getAttribute("data-key");
    if(!key) return;

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
            text.style.willChange = "transform, opacity";
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
// BACKGROUND ANIMADO
// ==========================

  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resize);
  resize();

  const NODE_COUNT = 85;

  for(let i=0;i<NODE_COUNT;i++){
    nodes.push({
      x: Math.random()*w,
      y: Math.random()*h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3
    });
  }

  function draw(){
    ctx.clearRect(0,0,w,h);

    nodes.forEach(n=>{
      ctx.beginPath();
      ctx.arc(n.x,n.y,2,0,Math.PI*2);
      ctx.fillStyle="rgba(56,189,248,0.7)";
      ctx.fill();

      n.x += n.vx;
      n.y += n.vy;

      if(n.x<0||n.x>w) n.vx*=-1;
      if(n.y<0||n.y>h) n.vy*=-1;
    });

    requestAnimationFrame(draw);
  }

  draw();
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
// MODAL CERT
// ==========================
const certData = {
  "wireshark": {
    title: "Wireshark",
    text: "Análise avançada de pacotes SIP/RTP em troubleshooting de voz."
  },
  "khomp-kmg": {
    title: "Khomp KMG",
    text: "Configuração de gateways de voz e análise SIP."
  },
  "khomp-vsbc": {
    title: "Khomp vSBC",
    text: "Controle e segurança de chamadas VoIP."
  },
  "cybersecurity": {
    title: "Cybersecurity",
    text: "Fundamentos de segurança de redes e análise de vulnerabilidades."
  }
};

function openCert(key){
  const modal = document.getElementById("certModal");
  document.getElementById("modalTitle").innerText = certData[key].title;
  document.getElementById("modalText").innerText = certData[key].text;
  modal.style.display = "flex";
}

function closeCert(){
  document.getElementById("certModal").style.display = "none";
}


// INIT CERT
document.addEventListener("DOMContentLoaded", ()=>{
  initCertSystem();
});
