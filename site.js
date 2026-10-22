'use strict';
(() => {
  // Respect reduced-motion settings throughout the experience.
  const motionOK = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const progress = document.querySelector('.scroll-progress');
  const updateProgress = () => {
    if (!progress) return;
    const range = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (range > 0 ? Math.min(100, Math.max(0, window.scrollY / range * 100)) : 0) + '%';
  };
  addEventListener('scroll', updateProgress, { passive: true });
  addEventListener('resize', updateProgress, { passive: true });
  updateProgress();

  const toggle = document.querySelector('.menu-button');
  const nav = document.querySelector('#main-nav');
  if (toggle && nav) {
    const closeNav = () => { nav.classList.remove('open'); toggle.setAttribute('aria-expanded','false'); toggle.textContent='☰'; };
    toggle.addEventListener('click', () => {const open = nav.classList.toggle('open');toggle.setAttribute('aria-expanded', String(open)); toggle.textContent = open ? '×' : '☰';});
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));
    document.addEventListener('keydown', e => {if (e.key === 'Escape') closeNav();});
    document.addEventListener('click', e => {if (!nav.contains(e.target) && !toggle.contains(e.target)) closeNav();});
  }

  document.querySelectorAll('[data-year]').forEach(el => el.textContent = String(new Date().getFullYear()));
  document.querySelectorAll('[data-print]').forEach(button => button.addEventListener('click', () => window.print()));

  const reveals = [...document.querySelectorAll('[data-reveal]')];
  if (motionOK && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => { entries.forEach(({target,isIntersecting}) => {
      if (isIntersecting) { target.classList.add('visible'); observer.unobserve(target); }
    }); }, { threshold: .06, rootMargin:'0px 0px 70px 0px'});
    reveals.forEach(el => observer.observe(el));
  } else { reveals.forEach(el => el.classList.add('visible')); }

  const filterBtns = [...document.querySelectorAll('[data-filter]')];
  filterBtns.forEach(btn => btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    filterBtns.forEach(b => b.setAttribute('aria-pressed',String(b === btn)));
    document.querySelectorAll('[data-project-category]').forEach(card => {card.hidden = filter !== 'all' && card.dataset.projectCategory !== filter;});
  }));

  // Four authentic paths grounded in the resume; no fabricated logs, statistics or incident counts.
  const stories = {
    amazon: [
      ['cmd', '$ cat experience/amazon-air.txt'],
      ['', 'ROLE      Amazon Air Point of Contact (POC)'],
      ['', 'CONTEXT   Time-critical aviation operations'],
      ['', 'WORK      Monitor operational alerts and workflow conditions.'],
      ['warn', 'ACTION    Triage issues and troubleshoot scanners and workstations.'],
      ['', 'ESCALATE  Coordinate with technical teams when beyond scope.'],
      ['', 'DOCUMENT  Record unresolved issues and shift handoffs.'],
      ['dim','NOTE      Operational monitoring, not a claim of production SOC work.']
    ],
    siem: [
      ['cmd', '$ cat projects/phishing-investigation.txt'],
      ['', 'PROJECT   WGU capstone / simulated phishing investigation'],
      ['', 'TOOLS     Elastic SIEM'],
      ['', 'REVIEW    Security alerts and supporting evidence.'],
      ['warn', 'ANALYZE   Test hypotheses and determine likely cause and scope.'],
      ['', 'RESPOND   Select remediation and validate within the simulation.'],
      ['', 'REPORT    Executive summary and technical incident report.'],
      ['dim','NOTE      Academic simulation; no production client data.']
    ],
    forensics: [
      ['cmd', '$ cat projects/windows-forensics.txt'],
      ['', 'PROJECT   Windows 11 investigation scenario'],
      ['', 'TOOLS     Autopsy'],
      ['', 'EXAMINE   Deleted files, system logs, browser artifacts.'],
      ['warn', 'EVIDENCE  Documented 10 potential forensic evidence items.'],
      ['', 'VERIFY    Evidence handling and hash verification practices.'],
      ['', 'REPORT    Investigation methodology, findings, conclusions.'],
      ['dim','NOTE      Academic exercise, not a real breach attribution.']
    ],
    testing: [
      ['cmd', '$ cat labs/security-testing.txt'],
      ['', 'PROJECT   CompTIA PenTest+ training labs'],
      ['', 'SCOPE     Controlled, authorized lab environments'],
      ['', 'TOOLS     Nmap, Metasploit, SQLmap, Netcat, Kali Linux.'],
      ['warn', 'ASSESS    Reconnaissance, enumeration, vulnerability identification.'],
      ['', 'ANALYZE   Interpret tool output and select next steps.'],
      ['', 'DOCUMENT  Translate findings into follow-up actions.'],
      ['dim','NOTE      Labs only; not represented as client engagements.']
    ]
  };
  const terminalOutput = document.getElementById('story-output');
  const storyBtns = [...document.querySelectorAll('[data-story]')];
  function setStory(key) {
    if (!terminalOutput || !stories[key]) return;
    terminalOutput.replaceChildren();
    for (const [className, message] of stories[key]) {
      const p = document.createElement('p'); p.className = `console-line ${className}`.trim(); p.textContent = message; terminalOutput.appendChild(p);
    }
    storyBtns.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.story === key)));
    const details = document.querySelector('[data-story-label]');
    if (details) details.textContent = ({amazon:'Operational experience',siem:'Security operations project',forensics:'Forensic investigation',testing:'Authorized training labs'})[key];
  }
  storyBtns.forEach(btn => btn.addEventListener('click', () => setStory(btn.dataset.story)));
  if (terminalOutput) setStory('amazon');

  // Accessible step-by-step case-study workflow.
  const stepBtns = [...document.querySelectorAll('.workflow-step')];
  stepBtns.forEach((btn,i) => btn.addEventListener('click', () => activateStep(i)));
  function activateStep(i) {
    if (!stepBtns[i]) return;
    stepBtns.forEach((btn,j) => {
      const active = i === j;
      btn.setAttribute('aria-selected', String(active));
      btn.tabIndex = active ? 0 : -1;
      const panel = document.getElementById(btn.getAttribute('aria-controls'));
      if(panel) panel.hidden = !active;
    });
  }
  if (stepBtns.length) {
    stepBtns[0].tabIndex = 0;
    stepBtns.forEach((btn,i) => btn.addEventListener('keydown', e => {
      if (!['ArrowLeft','ArrowRight','Home','End'].includes(e.key)) return;
      e.preventDefault();
      const index = e.key === 'Home' ? 0 : e.key === 'End' ? stepBtns.length-1 : (i + (e.key === 'ArrowRight' ? 1:-1)+stepBtns.length)%stepBtns.length;
      activateStep(index); stepBtns[index].focus();
    }));
  }

  // Ambient stars: decorative, minimal, pause when hidden, avoid animations on reduced-motion.
  const canvas = document.getElementById('ambient');
  if(canvas && motionOK) {
    const ctx = canvas.getContext('2d');
    if(ctx) {
      let stars=[],w=0,h=0,last=0,frame=0;
      const resize = () => {
        w = window.innerWidth; h = window.innerHeight;
        const dpr=Math.min(devicePixelRatio||1,2);
        canvas.width = Math.floor(w*dpr); canvas.height=Math.floor(h*dpr);
        canvas.style.width = w+'px'; canvas.style.height=h+'px';
        ctx.setTransform(dpr,0,0,dpr,0,0);
        const count = Math.min(95,Math.floor(w*h/18000));
        stars=Array.from({length:count}, (_,i)=>({x: ((i*111.37+.17)%1)*w,y:((i*72.47+.41)%1)*h,r: i%11===0?1.2:.55,shift:(i%7)*.27}));
      };
      resize(); window.addEventListener('resize',resize,{passive:true});
      const tick = now => {
        if(document.hidden){frame=requestAnimationFrame(tick);return;}
        if(now-last < 38){frame=requestAnimationFrame(tick);return;}
        last=now;ctx.clearRect(0,0,w,h);
        for(const s of stars){const opacity=.11+.17*(1+Math.sin(now*.0006+s.shift))/2;ctx.fillStyle=`rgba(203,244,224,${opacity})`;ctx.fillRect(s.x,s.y,s.r,s.r);}
        frame=requestAnimationFrame(tick);
      };
      frame=requestAnimationFrame(tick);
      document.addEventListener('visibilitychange', () => {if(document.hidden) ctx.clearRect(0,0,w,h);});
      window.addEventListener('pagehide',()=>cancelAnimationFrame(frame),{once:true});
    }
  }
})();
