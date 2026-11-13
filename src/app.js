(() => {
  const $ = id => document.getElementById(id);
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
  let C = {};
  const colors = () => { C = {ink:css("--ink"), accent:css("--accent"), paper:css("--paper")}; };
  colors();
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", colors);
  new MutationObserver(colors).observe(document.documentElement, {attributes:true, attributeFilter:["data-theme","data-palette"]});

  /* ---------------- Textes ---------------- */
  const T = {
    en: {
      nav_work:"Work", nav_writing:"Writing", nav_contact:"Contact", colour:"Colour",
      dock_network:"Network", dock_work:"Work", dock_writing:"Writing", dock_contact:"Contact",
      hero_say:"I build systems that learn, <i>then I put them in front of real people.</i>",
      cta_work:"See the work", cta_contact:"Get in touch",
      legend:"Behind this text: 40 concepts from my craft. The crosshair follows your finger or cursor, or wanders on its own, and links the closest ones. Cosine computed live.",
      net_kick:"My work as a network", net_h2:"What I know, <i>and what I shipped with it.</i>",
      net_lead:"Three layers, like a neural net: domains, technologies, shipped work. A line exists only if the technology actually ran in the project.",
      l1:"Layer 1 · Domains", l2:"Layer 2 · Technologies", l3:"Output · Work", hint:"Tap a box. The path lights up.",
      cap_d:"Domains", cap_s:"Technologies", cap_p:"Work",
      p_auto:"Auto-play", p_pick:"Your pick", k_work:"Work", k_domain:"Domain", k_skill:"Technology", stack:"Stack",
      nn_h:"Closest work", cos:"cosine", code:"Code ↗", see:"See the project ↗", all_work:"All work ↓",
      used_in:n => `Used in ${n} ${n > 1 ? "projects" : "project"}`, used_list:"Used in: ",
      work_kick:"Work", work_h2:"What I built, <i>and what it changed.</i>", work_lead:"Four projects in production or award-winning.",
      swipe:"Slides on its own · swipe →", oss:"Open source ↗", gpt2_name:"GPT-2 from the paper",
      proof_kick:"Proof", proof_h2:"What you can verify.",
      proof3_t:"1st place, Voice AI Hackathon", proof3_s:"OpenAI × AI Collective · Station F · March 2026",
      writ_kick:"Writing", writ_h2:"Notes from production.", writ_all:"All notes →", writ_h2b:"The ones I would start with.",
      blog_h1:"Notes from <i>production.</i>",
      blog_lead:"Short field notes on training models and shipping agents. What worked, what broke, what I would do again.",
      contact_kick:"Contact", contact_h2:"A model to train, an agent to ship? <i>Let's talk.</i>",
      tap_copy:"Tap to copy", copied:"Copied",
      back:"← All notes", draft:"Draft", min:"min read", next:"Next note", soon:"Coming soon", by_theme:"By theme", by_project:"By project", all:"All", sort:"Sort", s_feat:"Featured", s_short:"Shortest", n_notes:n => `${n} ${n > 1 ? "notes" : "note"}`, series:"Series", part:"Part", featured:"Featured", empty:"Nothing here yet."
    },
    fr: {
      nav_work:"Travaux", nav_writing:"Écrits", nav_contact:"Contact", colour:"Couleur",
      dock_network:"Réseau", dock_work:"Travaux", dock_writing:"Écrits", dock_contact:"Écrire",
      hero_say:"Je construis des systèmes qui apprennent, <i>puis je les mets devant de vraies personnes.</i>",
      cta_work:"Voir le travail", cta_contact:"Me contacter",
      legend:"Derrière ce texte, 40 concepts de mon métier. La croix suit votre doigt ou votre curseur, ou se promène seule, et relie les plus proches. Cosinus calculé en direct.",
      net_kick:"Mon travail comme un réseau", net_h2:"Ce que je sais, <i>et ce que j'en ai fait.</i>",
      net_lead:"Trois couches, comme un réseau de neurones : domaines, technologies, travaux livrés. Un trait n'existe que si la technologie a vraiment servi dans le projet.",
      l1:"Couche 1 · Domaines", l2:"Couche 2 · Technologies", l3:"Sortie · Travaux", hint:"Touchez une case. Le chemin s'allume.",
      cap_d:"Domaines", cap_s:"Technologies", cap_p:"Travaux",
      p_auto:"Lecture automatique", p_pick:"Votre sélection", k_work:"Travail", k_domain:"Domaine", k_skill:"Technologie", stack:"Stack",
      nn_h:"Travaux les plus proches", cos:"cosinus", code:"Code ↗", see:"Voir le projet ↗", all_work:"Tous les travaux ↓",
      used_in:n => `Utilisée dans ${n} ${n > 1 ? "travaux" : "travail"}`, used_list:"Utilisée dans : ",
      work_kick:"Travaux", work_h2:"Ce que j'ai construit, <i>et ce que ça a changé.</i>", work_lead:"Quatre projets en production ou primés.",
      swipe:"Défile seul · glissez →", oss:"Open source ↗", gpt2_name:"GPT-2 depuis le papier",
      proof_kick:"Preuves", proof_h2:"Ce qui se vérifie.",
      proof3_t:"1<sup>re</sup> place, Voice AI Hackathon", proof3_s:"OpenAI × AI Collective · Station F · mars 2026",
      writ_kick:"Écrits", writ_h2:"Notes de production.", writ_all:"Tous les écrits →", writ_h2b:"Celles par lesquelles je commencerais.",
      blog_h1:"Notes de <i>production.</i>",
      blog_lead:"Des notes de terrain, courtes, sur l'entraînement de modèles et la mise en production d'agents. Ce qui a marché, ce qui a cassé, ce que je referais.",
      contact_kick:"Écrire", contact_h2:"Un modèle à entraîner, un agent à livrer ? <i>Parlons-en.</i>",
      tap_copy:"Touchez pour copier", copied:"Adresse copiée",
      back:"← Tous les écrits", draft:"Brouillon", min:"min de lecture", next:"Note suivante", soon:"Bientôt", by_theme:"Par thème", by_project:"Par projet", all:"Tout", sort:"Trier", s_feat:"À la une", s_short:"Plus courtes", n_notes:n => `${n} ${n > 1 ? "notes" : "note"}`, series:"Série", part:"Partie", featured:"À la une", empty:"Rien ici pour l'instant."
    }
  };

  /* ---------------- Données ---------------- */
  const D = [
    {id:"nn", t:{en:"Neural networks", fr:"Réseaux de neurones"}, s:{en:"Neural nets", fr:"Neurones"},
     d:{en:"Transformers, fine-tuning, embeddings. I understand a model well enough to rewrite it.", fr:"Transformers, fine-tuning, embeddings. Je comprends un modèle assez pour le réécrire."}},
    {id:"ag", t:{en:"AI agents", fr:"Agents IA"}, s:{en:"Agents", fr:"Agents"},
     d:{en:"Text or voice agents that answer, act in your tools, and hand off when they are not sure.", fr:"Des agents texte ou voix qui répondent, agissent dans vos outils et passent la main quand ils doutent."}},
    {id:"re", t:{en:"Search and RAG", fr:"Recherche et RAG"}, s:{en:"Search", fr:"Recherche"},
     d:{en:"Vectors and full text fused, measured with MRR and Recall. An answer is only as good as the source it finds.", fr:"Vecteurs et plein texte fusionnés, mesurés en MRR et Recall. Une réponse ne vaut que la source qu'elle retrouve."}},
    {id:"in", t:{en:"Infrastructure", fr:"Infrastructure"}, s:{en:"Infra", fr:"Infra"},
     d:{en:"Terraform, Cloud Run, Docker. If it can't be redeployed from a commit, it doesn't exist.", fr:"Terraform, Cloud Run, Docker. Ce qu'on ne peut pas redéployer d'un commit n'existe pas."}}
  ];
  const S = [
    {id:"pytorch", t:"PyTorch", up:["nn"]}, {id:"transf", t:"Transformers", up:["nn"]}, {id:"ft", t:"Fine-tuning", up:["nn"]},
    {id:"emb", t:"Embeddings", up:["nn","re"]}, {id:"lg", t:"LangGraph", up:["ag"]}, {id:"mcp", t:"MCP", up:["ag"]},
    {id:"livekit", t:"LiveKit", up:["ag"]}, {id:"eval", t:{en:"Evaluation", fr:"Évaluation"}, up:["ag","re"]}, {id:"pgv", t:"pgvector", up:["re"]},
    {id:"rrf", t:{en:"RRF fusion", fr:"Fusion RRF"}, up:["re"]}, {id:"vertex", t:"Vertex AI", up:["re","in"]}, {id:"bq", t:"BigQuery", up:["in"]},
    {id:"fastapi", t:"FastAPI", up:["ag","in"]}, {id:"docker", t:"Docker", up:["in"]}, {id:"tf", t:"Terraform", up:["in"]}, {id:"run", t:"Cloud Run", up:["in"]}
  ];
  const P = [
    {id:"galileo", s:"Galileo", t:{en:"Admissions agent", fr:"Agent d'admissions"}, org:"Galileo Global Education", y:"2026",
     st:{en:"In production", fr:"En production"},
     q:{en:"How do you answer 300,000 visitors a year without losing a counselor's nuance?", fr:"Comment répondre à 300 000 visiteurs par an sans perdre la nuance d'un conseiller ?"},
     d:{en:"A LangGraph agent with RAG and MCP. It answers admissions for three schools and qualifies leads straight into Salesforce. Built to scale to 60+ campuses.", fr:"Un agent LangGraph, RAG et MCP. Il répond aux admissions de trois écoles et qualifie les demandes directement dans Salesforce. Conçu pour passer à plus de 60 campus."},
     m:["300k+", {en:"visitors a year", fr:"visiteurs par an"}], up:["lg","mcp","emb","eval","fastapi","docker","tf"]},
    {id:"ansio", s:"Ansio", t:{en:"Ansio", fr:"Ansio"}, org:{en:"Personal project", fr:"Projet personnel"}, y:"2025 —",
     st:{en:"Live", fr:"En ligne"}, link:"https://ansio.io",
     q:{en:"When should a machine hand over to a human?", fr:"Quand une machine doit-elle passer la main à un humain ?"},
     d:{en:"Designed and built end to end. Instagram, Messenger and WhatsApp wired to a store's FAQ and catalog. Hybrid retrieval, and a clean handoff to a person when confidence drops.", fr:"Conçu et construit de bout en bout. Instagram, Messenger et WhatsApp reliés à la FAQ et au catalogue d'une boutique. Recherche hybride, et passage de main propre à une personne quand la confiance baisse."},
     m:["−80%", {en:"support time", fr:"de temps de support"}], up:["lg","pgv","rrf","emb","fastapi","run","docker"]},
    {id:"medvoice", s:"MedVoice", t:{en:"MedVoice", fr:"MedVoice"}, org:"Voice AI Hackathon · Station F", y:"03.2026",
     st:{en:"1st place", fr:"1re place"}, link:"https://github.com/yvankondjo/HacKMed",
     q:{en:"What can you build right in 48 hours?", fr:"Que peut-on construire de juste en 48 heures ?"},
     d:{en:"A clinical voice agent. It takes the call, books the slot, transcribes the visit, drafts the prescription and calls back. First of 16 teams, selected by Station F.", fr:"Un agent vocal clinique. Il prend l'appel, réserve le créneau, transcrit la consultation, rédige l'ordonnance et rappelle. Premier sur 16 équipes, sélectionné par Station F."},
     m:["1st", {en:"of 16 teams", fr:"sur 16 équipes"}], mfr:"1re", up:["livekit","mcp","fastapi","docker"]},
    {id:"renault", s:"Renault", t:{en:"After-sales search", fr:"Recherche après-vente"}, org:"Renault Group", y:"2023 — 25",
     st:{en:"1,000+ users", fr:"1 000+ utilisateurs"},
     q:{en:"How do you find the right page among thousands, in 27 languages?", fr:"Comment retrouver la bonne page parmi des milliers, dans 27 langues ?"},
     d:{en:"Hybrid search on Vertex AI for 1,000+ technicians. Fine-tuned translation across 26,000 documents. 200,000 complaints classified automatically.", fr:"Recherche hybride sur Vertex AI pour plus de 1 000 techniciens. Traduction affinée sur 26 000 documents. 200 000 réclamations classées automatiquement."},
     m:["+35%", {en:"precision, −60% latency", fr:"de précision, −60 % de latence"}], up:["vertex","emb","ft","transf","bq","eval"]},
    {id:"ragbench", s:"RAGBench", t:{en:"RAGBench-12x", fr:"RAGBench-12x"}, org:"Open source", y:"2026", st:{en:"Open source", fr:"Open source"}, link:"https://github.com/yvankondjo/Ragbench",
     q:{en:"Which RAG should you pick, and how do you know without guessing?", fr:"Quel RAG choisir, et comment le savoir sans deviner ?"},
     d:{en:"Twelve RAG variants on the same data and the same metrics. Reproducible end to end.", fr:"Douze variantes de RAG sur les mêmes données et les mêmes métriques. Reproductible de bout en bout."},
     m:["12", {en:"variants compared", fr:"variantes comparées"}], up:["emb","eval"]},
    {id:"vertexops", s:"VertexOps", t:{en:"VertexOps Pipeline", fr:"VertexOps Pipeline"}, org:"Open source", y:"2026", st:{en:"Open source", fr:"Open source"}, link:"https://github.com/yvankondjo/VertexOps-Pipeline",
     q:{en:"What does it take for a model to actually be served?", fr:"Que faut-il pour qu'un modèle soit vraiment servi ?"},
     d:{en:"MLOps end to end on Google Cloud: Airflow, dbt, BigQuery, a Vertex AI endpoint.", fr:"MLOps de bout en bout sur Google Cloud : Airflow, dbt, BigQuery, un endpoint Vertex AI."},
     m:["6", {en:"steps to the endpoint", fr:"étapes jusqu'à l'endpoint"}], up:["vertex","bq","docker"]},
    {id:"gpt2", s:"GPT-2", t:{en:"GPT-2 from the paper", fr:"GPT-2 depuis le papier"}, org:{en:"Study", fr:"Étude"}, y:"2025", st:{en:"Open source", fr:"Open source"}, link:"https://github.com/yvankondjo/GPT2",
     q:{en:"Can you understand attention without writing it yourself?", fr:"Peut-on comprendre l'attention sans l'écrire soi-même ?"},
     d:{en:"A decoder transformer rebuilt piece by piece in PyTorch.", fr:"Un transformer décodeur reconstruit pièce par pièce en PyTorch."},
     m:["0 → 1", {en:"from a blank page", fr:"depuis une page blanche"}], up:["pytorch","transf"]}
  ];
  const POSTS = [
    {slug:"evaluate-agent", min:4, tag:{en:"Agents", fr:"Agents"},
     t:{en:"Evaluate an agent before it talks to 300,000 people", fr:"Évaluer un agent avant qu'il parle à 300 000 personnes"},
     sum:{en:"The test set is the spec. Notes from shipping an admissions agent.", fr:"Le jeu de test, c'est la spécification. Notes sur un agent d'admissions."},
     body:{en:[
       "An admissions agent doesn't get a second first impression. Three schools, 300,000 visitors a year, and every wrong answer lands on a student deciding where to spend the next five years.",
       "So evaluation came before launch, not after. I ran experiments in Langfuse on real admissions questions and scored each model with an LLM judge on two things: is the answer right, and did it invent anything.",
       "The judge is a tool, not an oracle. Its rubric is written down, versioned, and checked against human reading on a sample. When the judge and a human disagree, the rubric changes.",
       "|Write the questions before the prompts. The test set is the spec.",
       "Then evaluation keeps running in production. Traces, latency and token cost sit next to answer quality. A model swap that is cheaper but hallucinates more doesn't ship."
     ], fr:[
       "Un agent d'admissions n'a pas de seconde chance de faire bonne impression. Trois écoles, 300 000 visiteurs par an, et chaque mauvaise réponse tombe sur un étudiant qui choisit où passer ses cinq prochaines années.",
       "L'évaluation est donc venue avant le lancement, pas après. J'ai lancé des expériences dans Langfuse sur de vraies questions d'admission, et chaque modèle a été noté par un LLM juge sur deux points : la réponse est-elle juste, et a-t-il inventé quelque chose ?",
       "Le juge est un outil, pas un oracle. Sa grille est écrite, versionnée, et comparée à une lecture humaine sur un échantillon. Quand le juge et l'humain ne sont pas d'accord, c'est la grille qui change.",
       "|Écrivez les questions avant les prompts. Le jeu de test, c'est la spécification.",
       "Ensuite, l'évaluation continue en production. Traces, latence et coût en tokens sont à côté de la qualité des réponses. Un modèle moins cher qui hallucine davantage ne part pas en production."
     ]}},
    {slug:"hand-off", min:3, tag:{en:"Agents", fr:"Agents"},
     t:{en:"Knowing when to hand off", fr:"Savoir passer la main"},
     sum:{en:"The most useful thing a support agent can say is: let me get you a person.", fr:"La phrase la plus utile d'un agent de support : je vous passe quelqu'un."},
     body:{en:[
       "The most useful sentence a support agent can say is: let me get you a person.",
       "Ansio answers on Instagram, Messenger and WhatsApp from a store's FAQ and catalog. Retrieval is hybrid: pgvector for meaning, full text for exact words like a product reference, fused with RRF. I measured it with MRR and Recall before trusting it.",
       "But retrieval isn't the product. The handoff is. When the agent isn't confident, it doesn't guess. It passes the conversation to a human, with the context already gathered.",
       "|An agent that knows its limits earns more trust than one that never says no.",
       "That's how support time dropped by 80% for the first e-commerce stores using it: not by answering everything, but by answering what it could and routing the rest cleanly."
     ], fr:[
       "La phrase la plus utile qu'un agent de support puisse dire : je vous passe quelqu'un.",
       "Ansio répond sur Instagram, Messenger et WhatsApp à partir de la FAQ et du catalogue d'une boutique. La recherche est hybride : pgvector pour le sens, le plein texte pour les mots exacts comme une référence produit, le tout fusionné avec RRF. Je l'ai mesurée en MRR et Recall avant de lui faire confiance.",
       "Mais la recherche n'est pas le produit. Le passage de main, si. Quand l'agent n'est pas sûr, il ne devine pas. Il transmet la conversation à une personne, avec le contexte déjà rassemblé.",
       "|Un agent qui connaît ses limites inspire plus confiance qu'un agent qui ne dit jamais non.",
       "C'est comme ça que le temps de support a baissé de 80 % pour les premières boutiques qui l'utilisent : pas en répondant à tout, mais en répondant à ce qu'il savait et en orientant proprement le reste."
     ]}},
    {slug:"twelve-rags", min:4, tag:{en:"RAG", fr:"RAG"},
     t:{en:"Twelve RAGs, one question", fr:"Douze RAG et une seule question"},
     sum:{en:"The most elaborate setup didn't win. What a reproducible benchmark taught me.", fr:"Le montage le plus sophistiqué n'a pas gagné. Ce qu'un banc d'essai reproductible m'a appris."},
     body:{en:[
       "Which RAG should you use? Most teams answer with a blog post. I wanted an answer I could rerun.",
       "RAGBench-12x crosses three choices: simple or agentic orchestration; dense, keyword or hybrid retrieval; with or without a reranker. Twelve configurations, same data, same metrics: NDCG, Recall, MRR, faithfulness, answer relevance.",
       "The result I didn't expect: the most elaborate setup didn't win. Simple orchestration with dense retrieval and a reranker tied for the best NDCG@10, at 0.852. Agentic hybrid with reranking came close at 0.845, with more latency and more moving parts.",
       "Keyword-only search ranked worst, yet had the highest faithfulness, at 0.884. Different metrics, different winners.",
       "|The lesson isn't a configuration. It's a habit: measure on your data, keep the run reproducible, and write down what the benchmark doesn't prove."
     ], fr:[
       "Quel RAG utiliser ? La plupart des équipes répondent avec un article de blog. Je voulais une réponse que je pouvais rejouer.",
       "RAGBench-12x croise trois choix : orchestration simple ou agentique ; recherche dense, par mots-clés ou hybride ; avec ou sans reranker. Douze configurations, mêmes données, mêmes métriques : NDCG, Recall, MRR, fidélité, pertinence des réponses.",
       "Le résultat que je n'attendais pas : le montage le plus sophistiqué n'a pas gagné. L'orchestration simple avec recherche dense et reranker est à égalité pour le meilleur NDCG@10, à 0,852. L'hybride agentique avec reranking suit de près à 0,845, avec plus de latence et plus de pièces mobiles.",
       "La recherche par mots-clés seule classe le moins bien, mais a la meilleure fidélité, à 0,884. Autres métriques, autres gagnants.",
       "|La leçon n'est pas une configuration. C'est une habitude : mesurer sur ses données, garder l'expérience rejouable, et écrire ce que le banc d'essai ne prouve pas."
     ]}}
  ];
  const THEMES = {
    agents:{en:"Agents", fr:"Agents"}, rag:{en:"Search & RAG", fr:"Recherche et RAG"}, eval:{en:"Evaluation", fr:"Évaluation"},
    deep:{en:"Deep learning", fr:"Deep learning"}, infra:{en:"Infra & MLOps", fr:"Infra et MLOps"}, voice:{en:"Voice", fr:"Voix"}
  };
  const SERIES = {ship:{en:"Shipping agents", fr:"Mettre des agents en production"}};
  Object.assign(POSTS[0], {themes:["agents","eval"], project:"galileo", featured:true, series:"ship", part:1, status:"draft"});
  Object.assign(POSTS[1], {themes:["agents","rag"], project:"ansio", featured:true, series:"ship", part:2, status:"draft"});
  Object.assign(POSTS[2], {themes:["rag","eval"], project:"ragbench", featured:true, status:"draft"});
  POSTS.push(
    {slug:"medvoice-48h", status:"soon", min:5, themes:["agents","voice"], project:"medvoice", series:"ship", part:3,
     t:{en:"48 hours, one voice agent", fr:"48 heures, un agent vocal"},
     sum:{en:"What we cut to win a hackathon, and why the cuts mattered more than the features.", fr:"Ce qu'on a coupé pour gagner un hackathon, et pourquoi les coupes ont compté plus que les fonctions."}},
    {slug:"27-languages", status:"soon", min:7, themes:["rag","deep"], project:"renault",
     t:{en:"Searching in 27 languages", fr:"Chercher dans 27 langues"},
     sum:{en:"Hybrid search and fine-tuned translation for 1,000+ technicians. Precision first, then speed.", fr:"Recherche hybride et traduction affinée pour plus de 1 000 techniciens. La précision d'abord, la vitesse ensuite."}},
    {slug:"gpt2-attention", status:"soon", min:10, themes:["deep"], project:"gpt2",
     t:{en:"Rewriting GPT-2 to understand attention", fr:"Réécrire GPT-2 pour comprendre l'attention"},
     sum:{en:"Causal masks, Flash Attention, and what the paper leaves out.", fr:"Masques causaux, Flash Attention, et ce que le papier ne dit pas."}},
    {slug:"served-model", status:"soon", min:6, themes:["infra"], project:"vertexops",
     t:{en:"A model only exists once it's served", fr:"Un modèle n'existe que lorsqu'il est servi"},
     sum:{en:"From Airflow to a Vertex AI endpoint, and the steps most teams skip.", fr:"D'Airflow à un endpoint Vertex AI, et les étapes que la plupart des équipes sautent."}}
  );
  let lang = "en";
  const L = v => (v && typeof v === "object" && !Array.isArray(v)) ? (v[lang] ?? v.en) : v;
  const tx = k => T[lang][k];

  const all = {}; [...D, ...S, ...P].forEach(n => all[n.id] = n);
  const DI = D.map(d => d.id);
  D.forEach((d, i) => d.v = DI.map((_, k) => k === i ? 1 : 0));
  S.forEach(s => s.v = DI.map(k => s.up.includes(k) ? 1 : 0));
  P.forEach(p => { p.v = [0, 0, 0, 0]; p.up.forEach(id => all[id].v.forEach((x, k) => p.v[k] += x)); });
  const norm = v => Math.hypot(...v) || 1;
  const cos = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0) / (norm(a) * norm(b));

  /* ---------------- Horloge, e-mail ---------------- */
  const f1 = new Intl.DateTimeFormat("fr-FR", {timeZone:"Europe/Paris", hour:"2-digit", minute:"2-digit"});
  const tick = () => { $("clock").textContent = f1.format(new Date()); };
  tick(); setInterval(tick, 20000);
  $("mail").addEventListener("click", () => {
    try { navigator.clipboard.writeText($("mail").textContent).then(() => { $("mail-note").textContent = tx("copied"); }, () => {}); } catch (e) {}
  });

  /* ---------------- Réseau (ordinateur) ---------------- */
  const svg = $("graph"), NS = "http://www.w3.org/2000/svg";
  let edges = [], compact = null;
  const mk = (tag, attrs, parent) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); parent.appendChild(e); return e; };
  const layout = (arr, x, a, b) => arr.forEach((n, i) => { n.x = x; n.y = a + (b - a) * (arr.length === 1 ? .5 : i / (arr.length - 1)); });
  function draw(force){
    const isCompact = svg.parentNode.clientWidth < 620;
    if (isCompact === compact && !force) return;
    compact = isCompact; svg.innerHTML = ""; edges = [];
    Object.values(all).forEach(n => n.el = null);
    if (!compact) {
      svg.setAttribute("viewBox", "0 0 800 560");
      layout(D, 175, 90, 470); layout(S, 378, 20, 540); layout(P, 566, 40, 520);
      S.forEach(s => s.up.forEach(u => edges.push({a:u, b:s.id})));
      P.forEach(p => p.up.forEach(u => edges.push({a:u, b:p.id})));
    } else {
      svg.setAttribute("viewBox", "0 0 340 380");
      layout(D, 130, 50, 330); layout(P, 196, 18, 362);
      P.forEach(p => DI.forEach((d, k) => { if (p.v[k] > 0) edges.push({a:d, b:p.id}); }));
    }
    const gE = mk("g", {}, svg);
    edges.forEach(e => { const a = all[e.a], b = all[e.b], m = (a.x + b.x) / 2; e.el = mk("path", {d:`M${a.x + 6} ${a.y} C${m} ${a.y} ${m} ${b.y} ${b.x - 6} ${b.y}`}, gE); });
    const node = (n, kind) => {
      const g = mk("g", {class:"node " + (kind === "s" ? "small" : "big"), tabindex:"0", role:"button", "aria-label":L(n.t)}, svg); g.dataset.id = n.id;
      const label = compact ? L(n.s) : L(n.t);
      if (kind === "s") mk("rect", {x:n.x + 8, y:n.y - 9, width:label.length * 7 + 8, height:18, fill:"var(--paper)"}, g);
      mk("circle", {class:"hit", cx:n.x, cy:n.y, r:kind === "s" ? 11 : 20}, g);
      mk("circle", {class:"dot", cx:n.x, cy:n.y, r:kind === "s" ? 4 : 5.5}, g);
      const t = mk("text", kind === "d" ? {x:n.x - 14, y:n.y + 6, "text-anchor":"end"} : {x:n.x + 13, y:n.y + (kind === "s" ? 4 : 6)}, g);
      t.textContent = label; n.el = g;
    };
    D.forEach(n => node(n, "d")); if (!compact) S.forEach(n => node(n, "s")); P.forEach(n => node(n, "p"));
    if (current) select(current, manualUntil > Date.now(), true);
  }
  function reach(id, list){
    const ids = new Set([id]), es = new Set();
    const up = x => list.forEach(e => { if (e.b === x) { es.add(e); if (!ids.has(e.a)) { ids.add(e.a); up(e.a); } } });
    const down = x => list.forEach(e => { if (e.a === x) { es.add(e); if (!ids.has(e.b)) { ids.add(e.b); down(e.b); } } });
    up(id); down(id); return {ids, es};
  }

  /* ---------------- Réseau en couches (téléphone) ---------------- */
  const full = [];
  S.forEach(x => x.up.forEach(u => full.push({a:u, b:x.id})));
  P.forEach(x => x.up.forEach(u => full.push({a:u, b:x.id})));
  let mchips = {}, mLit = new Set();
  function buildChips(){
    const row = (arr, cls) => arr.map(n => `<button class="mchip ${cls}" type="button" data-id="${n.id}">${cls === "t" ? L(n.t) : L(n.s)}</button>`).join("");
    $("mr-d").innerHTML = row(D, "d"); $("mr-s").innerHTML = row(S, "t"); $("mr-p").innerHTML = row(P, "p");
    mchips = {}; document.querySelectorAll(".mchip").forEach(c => mchips[c.dataset.id] = c);
  }
  function mlines(){
    const box = $("mnet"), Ls = $("mlines");
    if (!box.offsetParent) return;
    const r0 = box.getBoundingClientRect();
    Ls.setAttribute("viewBox", `0 0 ${r0.width} ${r0.height}`);
    const pt = (id, bottom) => { const r = mchips[id].getBoundingClientRect(); return [r.left - r0.left + r.width / 2, (bottom ? r.bottom : r.top) - r0.top]; };
    Ls.innerHTML = [...mLit].map(e => { const [x1, y1] = pt(e.a, true), [x2, y2] = pt(e.b, false), m = (y1 + y2) / 2; return `<path d="M${x1} ${y1} C${x1} ${m} ${x2} ${m} ${x2} ${y2}"/>`; }).join("");
  }
  function mselect(id){
    const {ids, es} = reach(id, full);
    mLit = es; $("mnet").classList.add("sel");
    Object.entries(mchips).forEach(([k, c]) => { c.classList.toggle("on", ids.has(k) && k !== id); c.classList.toggle("me", k === id); });
    mlines();
  }
  new ResizeObserver(mlines).observe($("mnet"));
  if (document.fonts) document.fonts.ready.then(mlines);

  /* ---------------- Panneau ---------------- */
  let dimRows = [];
  function buildDims(){
    $("dims").innerHTML = "";
    dimRows = D.map(d => { const r = document.createElement("div"); r.className = "dim";
      r.innerHTML = `<span>${L(d.s)}</span><span class="tr"><i></i></span><span class="v">0.00</span>`;
      $("dims").appendChild(r); return {r, bar:r.querySelector("i"), v:r.querySelector(".v")}; });
  }
  let current = null, manualUntil = 0;
  function select(id, manual, force){
    if (id === current && !force) return;
    current = id; mselect(id);
    const n = all[id], {ids, es} = reach(id, edges);
    svg.classList.add("on");
    edges.forEach(e => e.el.classList.toggle("lit", es.has(e)));
    Object.values(all).forEach(x => x.el && x.el.classList.toggle("lit", ids.has(x.id)));
    $("mode").textContent = manual ? tx("p_pick") : tx("p_auto");
    const isP = P.includes(n), isD = D.includes(n);
    $("kind").textContent = isP ? tx("k_work") : isD ? tx("k_domain") : tx("k_skill");
    $("p-t").textContent = L(n.t);
    const used = P.filter(p => p.up.includes(id)).map(p => L(p.t));
    $("p-w").textContent = isP ? `${L(n.org)} · ${n.y}` : isD ? tx("k_domain") : tx("used_in")(used.length);
    $("p-q").textContent = isP ? L(n.q) : isD ? L(n.d) : tx("used_list") + used.join(", ") + ".";
    const techs = isP ? n.up.map(x => L(all[x].t)) : isD ? S.filter(x => x.up.includes(id)).map(x => L(x.t)) : [];
    $("p-tech").innerHTML = techs.length ? `<span class="k">${tx("stack")}</span>` + techs.map(x => `<span>${x}</span>`).join("") : "";
    const u = norm(n.v), mx = Math.max(...n.v) || 1, best = n.v.indexOf(mx);
    dimRows.forEach((d, k) => { d.bar.style.width = (n.v[k] / mx * 100).toFixed(1) + "%"; d.v.textContent = (n.v[k] / u).toFixed(2); d.r.classList.toggle("top", k === best); });
    const ranked = P.filter(p => p.id !== id).map(p => ({p, c:cos(n.v, p.v)})).sort((a, b) => b.c - a.c).slice(0, 2);
    $("nn").innerHTML = ranked.map((r, i) => `<li data-id="${r.p.id}"><span class="mono mut">0${i + 1}</span><b>${L(r.p.t)}</b><span class="mono ${i ? "mut" : "lab"}">${r.c.toFixed(3)}</span></li>`).join("");
    $("p-m").innerHTML = isP ? `<b>${lang === "fr" && n.mfr ? n.mfr : n.m[0]}</b><span>${L(n.m[1])}</span>` : "";
    const l = $("p-l");
    if (isP && n.link) { l.href = n.link; l.textContent = n.link.includes("github") ? tx("code") : tx("see"); }
    else { l.href = "#work"; l.textContent = tx("all_work"); }
  }
  const pick = id => { manualUntil = Date.now() + 5000; select(id, true, true); };
  svg.addEventListener("pointerover", e => { const g = e.target.closest("g.node"); if (g && e.pointerType === "mouse") pick(g.dataset.id); });
  svg.addEventListener("click", e => { const g = e.target.closest("g.node"); if (g) pick(g.dataset.id); });
  svg.addEventListener("focusin", e => { const g = e.target.closest("g.node"); if (g) pick(g.dataset.id); });
  $("nn").addEventListener("click", e => { const li = e.target.closest("li"); if (li) pick(li.dataset.id); });
  $("mnet").addEventListener("click", e => { const c = e.target.closest(".mchip"); if (c) pick(c.dataset.id); });
  const order = P.map(p => p.id); let idx = 1;
  if (!reduce) setInterval(() => { if (Date.now() > manualUntil && !$("v-home").hidden) select(order[idx++ % order.length], false); }, 3400);

  /* ---------------- Travaux ---------------- */
  const worksEl = $("works");
  function buildWorks(){
    worksEl.innerHTML = P.slice(0, 4).map(w => { const tag = w.link ? `a href="${w.link}"` : "div", end = w.link ? "a" : "div";
      return `<${tag} class="work"><div class="top mono"><span class="lab">${L(w.org)}</span><span class="mut">${L(w.st)}</span></div><h3>${L(w.t)}</h3><p>${L(w.d)}</p><div class="k"><b>${lang === "fr" && w.mfr ? w.mfr : w.m[0]}</b><span>${L(w.m[1])}</span></div></${end}>`; }).join("");
    $("dots").innerHTML = [...worksEl.children].map(() => "<i></i>").join("");
    syncDots();
  }
  const syncDots = () => { const cards = [...worksEl.children], dots = [...$("dots").children]; if (cards.length < 2) return;
    const i = Math.round(worksEl.scrollLeft / (cards[1].offsetLeft - cards[0].offsetLeft || 1)); dots.forEach((d, k) => d.classList.toggle("on", k === Math.min(i, cards.length - 1))); };
  worksEl.addEventListener("scroll", syncDots, {passive:true});
  let wPause = 0, wVisible = false;
  ["pointerdown","touchstart","wheel","keydown"].forEach(ev => worksEl.addEventListener(ev, () => { wPause = Date.now() + 7000; }, {passive:true}));
  new IntersectionObserver(es => { wVisible = es[0].isIntersecting; }, {threshold:.5}).observe(worksEl);
  if (!reduce) setInterval(() => {
    const cards = worksEl.children;
    if (!wVisible || Date.now() < wPause || worksEl.scrollWidth <= worksEl.clientWidth + 4 || cards.length < 2) return;
    const step = cards[1].offsetLeft - cards[0].offsetLeft;
    worksEl.scrollTo({left:((Math.round(worksEl.scrollLeft / step) + 1) % cards.length) * step, behavior:"smooth"});
  }, 3800);

  /* ---------------- Écrits ---------------- */
  const projName = id => { const p = P.find(x => x.id === id); return p ? L(p.s) : ""; };
  const noteRow = p => {
    const soon = p.status === "soon", tag = soon ? "div" : `a href="#note-${p.slug}"`, end = soon ? "div" : "a";
    const status = soon ? `<span class="mut">${tx("soon")}</span>` : `<span class="draft">${tx("draft")}</span>`;
    const ser = p.series ? `<span class="mut">${L(SERIES[p.series])} ${p.part}/${POSTS.filter(x => x.series === p.series).length}</span>` : "";
    return `<${tag} class="note${soon ? " soon" : ""}"><span><span class="t">${L(p.t)}</span><p>${L(p.sum)}</p>
      <span class="tags-row">${p.themes.map(k => `<em>${L(THEMES[k])}</em>`).join("")}<em class="pj">${projName(p.project)}</em></span></span>
      <span class="meta mono">${status}<span class="mut">${p.min} ${tx("min")}</span>${ser}</span></${end}>`;
  };
  const F = {by:"theme", key:"all", sort:"feat"};
  function filtered(){
    let list = POSTS.filter(p => F.key === "all" || (F.by === "theme" ? p.themes.includes(F.key) : p.project === F.key));
    const rank = p => (p.featured ? 0 : 1) + (p.status === "soon" ? 2 : 0);
    list = list.slice().sort(F.sort === "short" ? (a, b) => a.min - b.min : (a, b) => rank(a) - rank(b));
    return list;
  }
  function buildFilters(){
    const keys = F.by === "theme" ? Object.keys(THEMES).filter(k => POSTS.some(p => p.themes.includes(k)))
                                  : P.map(p => p.id).filter(id => POSTS.some(p => p.project === id));
    const count = k => POSTS.filter(p => F.by === "theme" ? p.themes.includes(k) : p.project === k).length;
    const label = k => F.by === "theme" ? L(THEMES[k]) : projName(k);
    $("fchips").innerHTML = `<button type="button" class="fchip" data-k="all" aria-pressed="${F.key === "all"}">${tx("all")} <span>${POSTS.length}</span></button>` +
      keys.map(k => `<button type="button" class="fchip" data-k="${k}" aria-pressed="${F.key === k}">${label(k)} <span>${count(k)}</span></button>`).join("");
    document.querySelectorAll(".seg button").forEach(b => { b.textContent = tx(b.dataset.by === "theme" ? "by_theme" : "by_project"); b.setAttribute("aria-pressed", String(b.dataset.by === F.by)); });
    document.querySelectorAll(".sortb").forEach(b => { b.textContent = tx(b.dataset.sort === "feat" ? "s_feat" : "s_short"); b.setAttribute("aria-pressed", String(b.dataset.sort === F.sort)); });
    $("sort-l").textContent = tx("sort");
  }
  function buildNotes(){
    $("home-notes").innerHTML = `<div class="notes" style="margin-bottom:0">${POSTS.filter(p => p.featured).map(noteRow).join("")}</div>`;
    $("all-count").textContent = POSTS.length;
    buildFilters();
    const list = filtered();
    $("ncount").textContent = tx("n_notes")(list.length);
    $("blog-notes").innerHTML = list.length ? list.map(noteRow).join("") : `<p class="mut" style="padding:22px 0">${tx("empty")}</p>`;
  }
  document.addEventListener("click", e => {
    const seg = e.target.closest(".seg button"); if (seg) { F.by = seg.dataset.by; F.key = "all"; buildNotes(); return; }
    const fc = e.target.closest(".fchip"); if (fc) { F.key = fc.dataset.k; buildNotes(); return; }
    const sb = e.target.closest(".sortb"); if (sb) { F.sort = sb.dataset.sort; buildNotes(); }
  });
  function renderPost(slug){
    const readable = POSTS.filter(p => p.status !== "soon");
    const i = readable.findIndex(p => p.slug === slug); if (i < 0) return false;
    const p = readable[i], nx = readable[(i + 1) % readable.length];
    const parts = p.series ? POSTS.filter(x => x.series === p.series).sort((a, b) => a.part - b.part) : [];
    const seriesBox = parts.length ? `<div class="series"><span class="mono lab">${tx("series")} · ${L(SERIES[p.series])}</span><ol>${parts.map(x => `<li${x.slug === p.slug ? ' class="here"' : ""}><span class="mono mut">${tx("part")} ${x.part}</span>${x.status === "soon" || x.slug === p.slug ? `<b>${L(x.t)}</b>` : `<a href="#note-${x.slug}">${L(x.t)}</a>`}${x.status === "soon" ? `<span class="mono mut">${tx("soon")}</span>` : ""}</li>`).join("")}</ol></div>` : "";
    $("post").innerHTML = `<a class="back mono ul" href="#blog">${tx("back")}</a>
      <div class="mono lab">${p.themes.map(k => L(THEMES[k])).join(" · ")} · ${projName(p.project)}</div><h1>${L(p.t)}</h1>
      <div class="meta mono"><span class="draft">${tx("draft")}</span><span class="mut">Jacob Kondjo · ${p.min} ${tx("min")}</span></div>
      ${seriesBox}
      ${L(p.body).map((par, k) => par.startsWith("|") ? `<p class="pull">${par.slice(1)}</p>` : `<p${k ? "" : ' class="lede"'}>${par}</p>`).join("")}
      <div class="next"><span class="mono mut">${tx("next")}</span><a href="#note-${nx.slug}">${L(nx.t)} →</a></div>`;
    return true;
  }

  /* ---------------- Vues ---------------- */
  const HOME = ["top","network","work","proof","writing","contact"];
  function route(){
    const h = location.hash.slice(1);
    let view = "home";
    if (h === "blog") view = "blog";
    else if (h.startsWith("note-") && renderPost(h.slice(5))) view = "post";
    $("v-home").hidden = view !== "home"; $("v-blog").hidden = view !== "blog"; $("v-post").hidden = view !== "post";
    $("nav-blog").toggleAttribute("aria-current", view !== "home");
    if (view !== "home") { window.scrollTo(0, 0); dockLinks.forEach(a => a.setAttribute("aria-current", String(a.dataset.s === "blog"))); }
    else if (HOME.includes(h)) { setTimeout(() => { $(h).scrollIntoView(); mlines(); }, 60); }
    else { mlines(); }
  }
  const dockLinks = [...document.querySelectorAll(".dock a")];
  const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting && !$("v-home").hidden) dockLinks.forEach(a => a.setAttribute("aria-current", String(a.dataset.s === (en.target.id === "writing" ? "blog" : en.target.id)))); }), {rootMargin:"-45% 0px -50% 0px"});
  ["network","work","proof","writing","contact"].forEach(id => io.observe($(id)));
  addEventListener("hashchange", route);

  /* ---------------- Langue ---------------- */
  function setLang(l, save){
    lang = l; document.documentElement.lang = l;
    document.querySelectorAll("[data-t]").forEach(el => { const v = T[l][el.dataset.t]; if (typeof v === "string") el.innerHTML = v; });
    document.querySelectorAll(".lang button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.lang === l)));
    document.title = "Jacob Kondjo · AI Engineer";
    buildChips(); buildDims(); buildWorks(); buildNotes(); draw(true);
    if (current) select(current, manualUntil > Date.now(), true);
    if (location.hash.startsWith("#note-")) renderPost(location.hash.slice(6));
    if (save) { try { localStorage.setItem("lang", l); } catch (e) {} }
  }
  document.querySelectorAll(".lang button").forEach(b => b.addEventListener("click", () => setLang(b.dataset.lang, true)));
  let saved = null; try { saved = localStorage.getItem("lang"); } catch (e) {}
  const browserFr = (navigator.languages || [navigator.language || ""]).some(x => /^fr\b/i.test(x));
  setLang(saved === "fr" || saved === "en" ? saved : (browserFr ? "fr" : "en"), false);
  new ResizeObserver(() => draw(false)).observe(svg.parentNode);
  select("galileo", false, true);
  route();

  /* ---------------- Espace latent (ouverture) ---------------- */
  const ANCH = [[.12,.3],[.5,.14],[.88,.3],[.86,.78],[.5,.9],[.14,.76]];
  const CONCEPTS = [
    ["PyTorch",[1,0,0,.1,0,.2]],["TensorFlow",[1,0,0,.1,0,.2]],["Transformer",[1,.2,.2,0,0,0]],["Attention",[1,.1,.3,0,0,0]],
    [{en:"Backprop", fr:"Rétropropagation"},[1,0,0,0,0,.1]],["Fine-tuning",[.9,.1,0,0,.3,.3]],["CNN",[1,0,0,0,0,.1]],["YOLOv8",[.9,0,0,.1,.1,.1]],
    ["GPT-2",[1,.2,0,0,0,0]],["Embeddings",[.6,0,.9,0,0,.2]],
    ["Agents",[.1,1,.2,0,.1,0]],["LangGraph",[0,1,.2,.1,0,0]],["MCP",[0,1,0,.3,0,0]],["LiveKit",[0,.9,0,.4,0,0]],
    ["Twilio",[0,.7,0,.5,0,0]],["Function calling",[.1,.9,.1,.1,0,0]],["Claude",[.3,.8,.2,0,0,0]],["Gemini",[.4,.7,.3,0,0,0]],
    ["RAG",[.1,.5,1,0,.2,0]],["pgvector",[0,0,1,.3,0,.3]],["RRF",[0,0,1,0,.2,0]],["Reranking",[.3,0,1,0,.2,0]],
    [{en:"Hybrid search", fr:"Recherche hybride"},[0,0,1,.1,.1,.1]],["BM25",[0,0,1,0,0,.1]],
    ["Langfuse",[0,.4,.1,.2,1,0]],["LLM-as-a-judge",[.2,.4,.2,0,1,0]],["MRR",[0,0,.6,0,1,0]],["Recall@5",[0,0,.6,0,1,0]],["BLEU",[.4,0,0,0,1,0]],
    ["Terraform",[0,0,0,1,0,0]],["Cloud Tasks",[0,.1,0,1,0,0]],["Docker",[0,0,0,1,0,.1]],["Cloud Run",[0,.1,0,1,0,0]],
    ["Azure",[0,0,0,1,0,.1]],["CI/CD",[0,0,0,1,.2,0]],["FastAPI",[0,.3,0,.8,0,0]],
    ["BigQuery",[0,0,.1,.3,0,1]],["Airflow",[0,0,0,.4,0,1]],["dbt",[0,0,0,.2,0,1]],["Vertex AI",[.5,.1,.3,.6,.1,.5]]
  ];
  const frac = x => x - Math.floor(x);
  const hero = $("space"), cv = $("field"), g = cv.getContext("2d");
  let W = 0, H = 0, nodes = [];
  const ptr = {x:0, y:0, on:false, last:0};
  function build(){
    const r = hero.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 2);
    W = r.width; H = r.height; if (!W || !H) return;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    nodes = CONCEPTS.map(([name, v], i) => {
      const s = v.reduce((a, b) => a + b, 0); let x = 0, y = 0;
      v.forEach((w, k) => { x += w * ANCH[k][0]; y += w * ANCH[k][1]; });
      x = x / s + (frac(Math.sin(i * 12.9898) * 43758.5453) - .5) * .16;
      y = y / s + (frac(Math.sin(i * 78.233) * 12543.123) - .5) * .16;
      return {name, v, x:Math.min(.97, Math.max(.03, x)) * W, y:Math.min(.96, Math.max(.04, y)) * H, j:i};
    });
  }
  new ResizeObserver(build).observe(hero);
  const move = e => { const r = hero.getBoundingClientRect(); ptr.x = e.clientX - r.left; ptr.y = e.clientY - r.top; ptr.on = true; ptr.last = Date.now(); };
  hero.addEventListener("pointermove", move, {passive:true});
  hero.addEventListener("pointerdown", move, {passive:true});
  hero.addEventListener("pointerleave", e => { if (e.pointerType === "mouse") ptr.on = false; });
  let qx = 0, qy = 0;
  function frame(t){
    if (!$("v-home").hidden && W && H) {
      if (ptr.on && Date.now() - ptr.last > 4000) ptr.on = false;
      const auto = !ptr.on;
      const tx2 = auto ? W * (.64 + .28 * Math.sin(t * .00016)) : ptr.x;
      const ty2 = auto ? H * (.5 + .34 * Math.sin(t * .00023 + 1.3)) : ptr.y;
      if (!qx && !qy) { qx = tx2; qy = ty2; }
      qx += (tx2 - qx) * (auto ? .03 : .2); qy += (ty2 - qy) * (auto ? .03 : .2);
      g.clearRect(0, 0, W, H);
      const sigma = .32 * Math.max(W, H);
      const q = ANCH.map(([ax, ay]) => Math.exp(-((Math.hypot(qx - ax * W, qy - ay * H) / sigma) ** 2)));
      const top = nodes.map(n => ({n, c:cos(q, n.v)})).sort((a, b) => b.c - a.c).slice(0, 4);
      const small = W < 700, fade = small ? (ptr.on ? .85 : .5) : 1;
      g.fillStyle = C.ink;
      for (const n of nodes) {
        n.dx = n.x + (reduce ? 0 : Math.sin(t * .0004 + n.j) * 2); n.dy = n.y + (reduce ? 0 : Math.cos(t * .00035 + n.j) * 2);
        g.globalAlpha = .24; g.beginPath(); g.arc(n.dx, n.dy, 2, 0, Math.PI * 2); g.fill();
      }
      g.strokeStyle = C.accent; g.fillStyle = C.accent; g.lineWidth = 1;
      top.forEach(({n}, i) => {
        g.globalAlpha = (.55 - i * .1) * fade; g.beginPath(); g.moveTo(qx, qy); g.lineTo(n.dx, n.dy); g.stroke();
        g.globalAlpha = fade; g.beginPath(); g.arc(n.dx, n.dy, 3.2 - i * .4, 0, Math.PI * 2); g.fill();
      });
      g.globalAlpha = fade;
      g.beginPath(); g.arc(qx, qy, 8, 0, Math.PI * 2); g.stroke();
      g.beginPath(); g.moveTo(qx - 13, qy); g.lineTo(qx - 4, qy); g.moveTo(qx + 4, qy); g.lineTo(qx + 13, qy); g.moveTo(qx, qy - 13); g.lineTo(qx, qy - 4); g.moveTo(qx, qy + 4); g.lineTo(qx, qy + 13); g.stroke();
      const b = top[0];
      if (b && (!small || ptr.on)) {
        const label = L(b.n.name) + "  cos " + b.c.toFixed(3);
        g.font = "11px 'IBM Plex Mono', monospace"; const lw = g.measureText(label).width;
        const lx = Math.min(b.n.dx + 8, W - lw - 12), ly = b.n.dy - 10;
        g.globalAlpha = .9; g.fillStyle = C.paper; g.fillRect(lx - 4, ly - 12, lw + 8, 17);
        g.globalAlpha = 1; g.fillStyle = C.accent; g.fillText(label, lx, ly);
      }
      g.globalAlpha = 1;
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
