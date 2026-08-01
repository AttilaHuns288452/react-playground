/* React Playground — lesson data (part 3: Understanding React) — Tailwind edition */
CATEGORIES.push(
  {
    name: 'Understanding React', icon: '🧠',
    sections: [
      {
        id: 'how-react-calls', icon: '📞', title: 'How React Calls Your Components',
        desc: 'React is just a function caller. Your component is a function; React calls it, takes the JSX it returns, and turns it into DOM. No magic — the same function gets called again on every update.',
        points: ['<b>Component = function</b> returning JSX', 'React <b>calls</b> it (App()) and reads the returned tree', 'JSX is compiled to <b>createElement</b> calls before React ever runs', 'Every re-render = the function is <b>called again</b>'],
        code: `function Logged(props) {
  console.log('🏷️ called with props:', JSON.stringify(props));
  return <p className="text-[13px] text-slate-300">{props.msg}</p>;
}

function App() {
  const [n, setN] = React.useState(0);
  console.log('🔁 App() called — render #' + (n + 1));

  return (
    <div className="max-w-md w-full rounded-2xl border border-slate-700/60 bg-slate-900 p-6 shadow-xl">
      <span className="inline-block rounded-full bg-blue-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-blue-400">function call</span>
      <h2 className="mt-2.5 text-lg font-bold text-slate-100">You write functions, React calls them</h2>
      <p className="mt-1.5 mb-3 text-[13px] leading-relaxed text-slate-400">
        Open the console. Every click calls <b className="text-slate-200">App()</b> again,
        which returns fresh JSX — React diffs it against the old tree
        and patches only what changed.
      </p>
      <Logged msg={'render #' + n} />
      <button className="mt-3 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 px-4 py-2 text-[13px] font-semibold text-white transition hover:brightness-110"
        onClick={() => setN(x => x + 1)}>
        re-render
      </button>
    </div>
  );
}`,
      },
      {
        id: 'render-cycle', icon: '🔄', title: 'The Render Cycle',
        desc: 'Render → commit → effect. Render: React calls your function and builds the virtual tree. Commit: it patches the real DOM. Effects: side effects run after the DOM is live. setState kicks the whole cycle off again.',
        points: ['<b>Render</b>: component function runs, JSX tree built', '<b>Commit</b>: React updates the real DOM', '<b>Effects</b> (useEffect) run <b>after</b> commit', 'State change → render → commit → effect → repeat'],
        code: `function App() {
  const [count, setCount] = React.useState(0);
  const renderCount = React.useRef(0);
  renderCount.current++;

  React.useEffect(() => {
    console.log('🧹 effect ran — DOM is already updated');
  });

  return (
    <div className="max-w-md w-full rounded-2xl border border-slate-700/60 bg-slate-900 p-6 shadow-xl">
      <span className="inline-block rounded-full bg-blue-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-blue-400">render → commit → effect</span>
      <h2 className="mt-2.5 text-lg font-bold text-slate-100">The cycle</h2>
      <div className="my-3 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-xl bg-slate-800/60 p-2.5">
          <div className="text-base">🧠</div>
          <div className="text-[10px] font-bold uppercase tracking-wide text-blue-400">render</div>
          <div className="mt-0.5 text-[10px] text-slate-500">function runs</div>
        </div>
        <div className="rounded-xl bg-slate-800/60 p-2.5">
          <div className="text-base">🖼️</div>
          <div className="text-[10px] font-bold uppercase tracking-wide text-emerald-400">commit</div>
          <div className="mt-0.5 text-[10px] text-slate-500">DOM patched</div>
        </div>
        <div className="rounded-xl bg-slate-800/60 p-2.5">
          <div className="text-base">🧹</div>
          <div className="text-[10px] font-bold uppercase tracking-wide text-amber-400">effect</div>
          <div className="mt-0.5 text-[10px] text-slate-500">side effects</div>
        </div>
      </div>
      <p className="text-[13px] text-slate-300">
        Count: <b className="text-emerald-400">{count}</b>
        <span className="ml-2 text-xs text-slate-500">· {renderCount.current} renders so far</span>
      </p>
      <button className="mt-3 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 px-4 py-2 text-[13px] font-semibold text-white transition hover:brightness-110"
        onClick={() => setCount(c => c + 1)}>
        setCount → new cycle
      </button>
      <p className="mt-2.5 text-[11px] text-slate-500">
        renders.current counts calls; effect logs AFTER the DOM is live — check the console order.
      </p>
    </div>
  );
}`,
      },
      {
        id: 'why-hooks', icon: '🪝', title: 'Why Hooks Work',
        desc: 'Functions forget everything between calls — so where does state live? React stores it in a hidden per-component slot. Each hook call claims the next slot in order, which is why the Rules of Hooks exist.',
        points: ['Components are <b>just functions</b> — they can&apos;t keep local state', 'React keeps a hidden <b>state slot per hook call</b>', '<b>Order matters</b>: hooks must run in the same order every render', 'Two components = <b>two separate slots</b> — state never leaks between them'],
        code: `function Counter({ label, start = 0 }) {
  const [n, setN] = React.useState(start);   // slot #1
  const [step, setStep] = React.useState(1); // slot #2
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-3.5">
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-semibold text-slate-200">{label}</span>
        <span className="text-xl font-extrabold text-slate-100">{n}</span>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <button className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 px-3 py-1 text-xs font-semibold text-white transition hover:brightness-110"
          onClick={() => setN(x => x + step)}>+{step}</button>
        <button className="cursor-pointer rounded-lg border border-slate-700 px-2 py-1 text-xs text-slate-300 transition hover:border-blue-500"
          onClick={() => setStep(s => (s === 1 ? 5 : 1))}>step↔{step}</button>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="max-w-md w-full rounded-2xl border border-slate-700/60 bg-slate-900 p-6 shadow-xl">
      <span className="inline-block rounded-full bg-blue-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-blue-400">hook slots</span>
      <h2 className="mt-2.5 mb-1 text-lg font-bold text-slate-100">Two counters, separate memory</h2>
      <p className="mb-3 text-[13px] leading-relaxed text-slate-400">
        Same component rendered twice — React keeps
        <b className="text-slate-200"> separate state slots</b> per instance.
        Each Counter has its own useState pair, even though it&apos;s one function.
      </p>
      <div className="grid gap-2">
        <Counter label="Left" start={0} />
        <Counter label="Right" start={10} />
      </div>
    </div>
  );
}`,
      },
    ],
  },
);
