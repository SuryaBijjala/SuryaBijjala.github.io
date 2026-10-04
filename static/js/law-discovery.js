/* =====================================================================
   Workflow diagrams for computational/law-discovery.html (Mermaid).
   Loaded as a normal script (not type="module") so the page also works
   when opened straight from disk (file://) for local previews.
   Edit the `diagrams` object to change a diagram or its caption.
   ===================================================================== */
(async function () {
'use strict';

const { default: mermaid } = await import('https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs');

mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  fontFamily: 'Inter, sans-serif',
  themeVariables: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    primaryColor: '#ffffff',
    primaryTextColor: '#262626',
    primaryBorderColor: '#d4d4d4',
    lineColor: '#a3a3a3',
    secondaryColor: '#f5f5f5',
    tertiaryColor: '#fafafa',
    clusterBkg: '#fafafa',
    clusterBorder: '#e5e5e5',
    edgeLabelBackground: '#ffffff',
    titleColor: '#525252',
  },
  flowchart: { curve: 'basis', htmlLabels: true, useMaxWidth: true, padding: 14 },
});

const classDefs = `
  classDef agent fill:#171717,stroke:#171717,color:#ffffff
  classDef store fill:#f5f5f5,stroke:#d4d4d4,color:#404040
  classDef decision fill:#ffffff,stroke:#737373,color:#262626
  classDef fail fill:#fafafa,stroke:#d4d4d4,stroke-dasharray:4 3,color:#a3a3a3
  classDef terminal fill:#262626,stroke:#262626,color:#ffffff
  classDef kept fill:#404040,stroke:#262626,color:#ffffff
  classDef pruned fill:#fafafa,stroke:#d4d4d4,stroke-dasharray:4 3,color:#a3a3a3
`;

const diagrams = {
  pipeline: {
    caption:
      'End-to-end workflow from the research question to deployment. Dark nodes are LLM agents; grey cylinders are data stores. The knowledge base built in stage (i) is reused by the explanation agent in stage (v).',
    code: `flowchart TD
${classDefs}
  Q(["Research question<br/>target property"]) --> A1
  subgraph S1["(i) Literature review and data preparation"]
    direction TB
    A1["Retrieve publications<br/>or user-supplied references"] --> A2[("GraphRAG / LightRAG<br/>knowledge base")]
    A2 --> A3["Reasoning LLM recommends<br/>variables and operators"]
    A1 --> A4[("Curated dataset")]
  end
  A3 --> B1
  A4 --> B1
  subgraph S2["(ii) Task-specific prompt"]
    B1["General Instruction · Task Description<br/>Formula Memory · Example Output (JSON)"]
  end
  B1 --> C1
  subgraph S3["(iii) Initialize beam search"]
    C1["Max depth D · formulas per node N · beam width K"]
  end
  C1 --> D1
  subgraph S4["(iv) Multi-agent symbolic regression"]
    direction TB
    D1["K retained nodes at depth d"] --> D2["Generate → inspect → evaluate<br/>→ memory → reflect"]
    D2 --> D3["Up to N × K scored candidates<br/>stored in formula database"]
    D3 --> D4["Keep top-K lowest scores"]
    D4 --> D5{"Reached<br/>max depth D?"}
    D5 -- "no · next depth" --> D1
    D5 -- "yes" --> D6["Best-scoring formula<br/>over all explored nodes"]
  end
  D6 --> E1
  subgraph S5["(v) Scientific interpretation"]
    E1["Explanation agent + RAG<br/>physical meaning, assumptions, limits"]
  end
  E1 --> F1(["(vi) Prediction and materials design"])
  A2 -. "domain context" .-> E1
  class Q,F1 terminal
  class A3,D2,E1 agent
  class A2,A4 store
  class D5 decision`,
  },
  loop: {
    caption:
      'The iterative loop run at every search node. Invalid or non-evaluable expressions are discarded; the scored trajectory is fed back through the reflection agent to steer the next round of proposals.',
    code: `flowchart LR
${classDefs}
  P["Prompt<br/>instruction · task<br/>memory · examples"] --> G["Generation agent<br/>formulas with param[i]<br/>+ theory rationale"]
  G --> I{"Valid syntax<br/>and operators?"}
  I -- "no" --> X["Discard<br/>score = None"]
  I -- "yes" --> E["Evaluation<br/>fit param[i]<br/>NMSE + λ·C(f)"]
  E -- "overflow / ÷0" --> X
  E --> M[("Memory<br/>F0: s0 → F1: s1 → …")]
  M --> R["Reflection agent<br/>diagnose and refine"]
  R --> P
  DB[("Dataset")] -.-> E
  class G,R agent
  class M,DB store
  class I decision
  class X fail`,
  },
  beam: {
    caption:
      'Beam-search expansion with K = 2 and N = 3. Dark nodes are retained (top-K by score); dashed nodes are pruned. Each child inherits its parent’s trajectory, and the K nodes at each depth are evaluated in parallel.',
    code: `flowchart LR
${classDefs}
  root(("Root")) --> a1(("1")) & a2(("2")) & a3(("3")) & a4(("4"))
  a2 --> b1(("2.1")) & b2(("2.2")) & b3(("2.3"))
  a3 --> b4(("3.1")) & b5(("3.2")) & b6(("3.3"))
  b2 --> c1(("…"))
  b4 --> c2(("…"))
  c1 --> best(["Best formula<br/>lowest score"])
  c2 --> best
  class root,best terminal
  class a2,a3,b2,b4,c1,c2 kept
  class a1,a4,b1,b3,b5,b6 pruned`,
  },
};

const target = document.getElementById('fw-diagram');
const caption = document.getElementById('fw-caption');
const tabs = document.querySelectorAll('.fw-tab');
const cache = {};

async function show(key) {
  tabs.forEach((t) => t.setAttribute('aria-selected', String(t.dataset.tab === key)));
  caption.textContent = diagrams[key].caption;
  try {
    if (!cache[key]) {
      const { svg } = await mermaid.render('fw-svg-' + key, diagrams[key].code);
      cache[key] = svg;
    }
    target.innerHTML = cache[key];
  } catch (err) {
    console.error(err);
    target.innerHTML =
      '<span class="text-xs tracking-widest uppercase text-neutral-400">Diagram could not be rendered</span>';
  }
}

tabs.forEach((t) => t.addEventListener('click', () => show(t.dataset.tab)));

// Wait for web fonts so Mermaid measures label widths correctly.
if (document.fonts && document.fonts.ready) await document.fonts.ready;
show('pipeline');
})();
