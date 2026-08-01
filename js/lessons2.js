/* React Playground — lesson data (part 2: Hooks, Styling, Advanced) — Tailwind edition */
CATEGORIES.push(
  {
    name: 'Hooks', icon: '🪝',
    sections: [
      {
        id: 'useeffect', icon: '⏱️', title: 'useEffect',
        desc: 'Run side effects after render — fetching, timers, subscriptions. Return a cleanup function for anything you started.',
        points: ['<b>[]</b> deps = run once on mount', '<b>cleanup</b> runs on unmount & before re-run', 'The dependency array controls <b>when</b> it re-runs'],
        code: `function App() {
  const [ms, setMs] = React.useState(0);
  const [running, setRunning] = React.useState(false);

  React.useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setMs(m => m + 10), 10);
    return () => clearInterval(id);   // cleanup
  }, [running]);

  const fmt = m => {
    const min = String(Math.floor(m / 60000)).padStart(2, '0');
    const sec = String(Math.floor(m / 1000) % 60).padStart(2, '0');
    const cen = String(Math.floor(m / 10) % 100).padStart(2, '0');
    return min + ':' + sec + '.' + cen;
  };

  return (
    <div className="max-w-md w-full rounded-2xl border border-slate-700/60 bg-slate-900 p-6 text-center shadow-xl">
      <span className="inline-block rounded-full bg-blue-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-blue-400">useEffect + cleanup</span>
      <h2 className="mt-2.5 text-lg font-bold text-slate-100">Stopwatch</h2>
      <div className="my-2.5 font-mono text-4xl font-bold tracking-[.2em] text-slate-100">{fmt(ms)}</div>
      <div className="flex items-center justify-center gap-2">
        <button className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 px-4 py-2 text-[13px] font-semibold text-white transition hover:brightness-110"
          onClick={() => setRunning(r => !r)}>
          {running ? '⏸ Pause' : '▶ Start'}
        </button>
        <button className="rounded-lg border border-slate-600 px-4 py-2 text-[13px] font-semibold text-slate-200 transition hover:border-blue-500"
          onClick={() => { setRunning(false); setMs(0); }}>Reset</button>
      </div>
      <p className="mt-3 text-[11px] text-slate-500">
        interval cleaned up when stopped or unmounted
      </p>
    </div>
  );
}`,
      },
      {
        id: 'useref', icon: '🎯', title: 'useRef',
        desc: 'useRef holds a mutable value that does NOT trigger re-renders. Perfect for DOM refs (focus, scroll) and instance-like data.',
        points: ['<b>ref.current</b> — mutate freely, no re-render', '<b>ref={el}</b> attaches to a DOM node', 'Great for <b>focus</b>, <b>measure</b>, <b>previous value</b>'],
        code: `function App() {
  const inputRef = React.useRef(null);
  const [typed, setTyped] = React.useState('');
  const renders = React.useRef(0);
  renders.current++;

  return (
    <div className="max-w-md w-full rounded-2xl border border-slate-700/60 bg-slate-900 p-6 shadow-xl">
      <span className="inline-block rounded-full bg-blue-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-blue-400">useRef</span>
      <h2 className="mt-2.5 mb-3 text-lg font-bold text-slate-100">Refs: no re-render</h2>
      <div className="mb-2.5 flex items-center gap-2">
        <input ref={inputRef}
          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-[12.5px] text-slate-200 outline-none focus:border-blue-500"
          placeholder="Type here…" value={typed} onChange={e => setTyped(e.target.value)} />
        <button className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 px-3.5 py-2 text-[13px] font-semibold text-white transition hover:brightness-110"
          onClick={() => { inputRef.current.focus(); inputRef.current.select(); }}>
          Focus
        </button>
      </div>
      <p className="text-[12.5px] leading-relaxed text-slate-400">
        Typed: <b className="text-slate-200">{typed || '(empty)'}</b><br />
        Re-renders: <b className="text-amber-400">{renders.current}</b> — typing
        re-renders, but renders.current lives outside render.
      </p>
    </div>
  );
}`,
      },
      {
        id: 'usememo', icon: '⚡', title: 'useMemo',
        desc: 'Cache the result of an expensive calculation so it only recomputes when its dependencies change.',
        points: ['<b>useMemo(fn, [deps])</b> returns a cached value', 'Only helps when the calc is <b>actually slow</b>', 'Skip it until you can measure the cost'],
        code: `function App() {
  const [num, setNum] = React.useState(30);
  const [tick, setTick] = React.useState(0);

  // slow Fibonacci — recomputed only when num changes
  const fib = React.useMemo(() => {
    const t0 = performance.now();
    const f = n => n < 2 ? n : f(n - 1) + f(n - 2);
    const v = f(num);
    return { v, ms: (performance.now() - t0).toFixed(1) };
  }, [num]);

  return (
    <div className="max-w-md w-full rounded-2xl border border-slate-700/60 bg-slate-900 p-6 shadow-xl">
      <span className="inline-block rounded-full bg-blue-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-blue-400">useMemo</span>
      <h2 className="mt-2.5 mb-3 text-lg font-bold text-slate-100">Memoize the expensive part</h2>
      <div className="mb-3 flex items-center gap-2">
        <input type="number" min="1" max="40" value={num}
          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-[12.5px] text-slate-200 outline-none focus:border-blue-500"
          onChange={e => setNum(+e.target.value)} />
        <button className="rounded-lg border border-slate-600 px-3.5 py-2 text-[13px] font-semibold text-slate-200 transition hover:border-blue-500"
          onClick={() => setTick(t => t + 1)}>
          re-render ({tick})
        </button>
      </div>
      <p className="text-[13px] text-slate-400">
        fib({num}) = <b className="text-emerald-400">{fib.v}</b>{' '}
        <span className="text-[11px]">({fib.ms}ms)</span>
      </p>
      <p className="mt-2 text-[11.5px] text-slate-500">
        Clicking re-render is instant — the fib cache only invalidates when num changes.
      </p>
    </div>
  );
}`,
      },
      {
        id: 'usecallback', icon: '🔗', title: 'useCallback',
        desc: 'Return a stable function identity across renders — useful when passing callbacks to memoized children.',
        points: ['<b>useCallback(fn, [deps])</b> — same fn reference until deps change', 'Pairs with <b>React.memo</b> to skip child re-renders', 'Dependency arrays: same rules as useEffect'],
        code: `const Child = React.memo(function Child({ label, onClick }) {
  console.log('child rendered:', label);
  return (
    <button className="rounded-lg border border-slate-600 px-3.5 py-1.5 text-[11px] font-semibold text-slate-200 transition hover:border-blue-500"
      onClick={onClick}>{label}</button>
  );
});

function App() {
  const [count, setCount] = React.useState(0);

  // stable identity — child skips re-render when count changes
  const handleClick = React.useCallback(() => {
    console.log('clicked!');
  }, []);

  return (
    <div className="max-w-md w-full rounded-2xl border border-slate-700/60 bg-slate-900 p-6 shadow-xl">
      <span className="inline-block rounded-full bg-blue-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-blue-400">useCallback + React.memo</span>
      <h2 className="mt-2.5 mb-3 text-lg font-bold text-slate-100">Stable callbacks</h2>
      <p className="mb-3 text-[13.5px] text-slate-300">
        Count: <b className="text-emerald-400">{count}</b>
      </p>
      <div className="flex items-center gap-2">
        <button className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 px-4 py-2 text-[13px] font-semibold text-white transition hover:brightness-110"
          onClick={() => setCount(c => c + 1)}>bump parent</button>
        <Child label="memoized child" onClick={handleClick} />
      </div>
      <p className="mt-2.5 text-[11.5px] text-slate-500">
        Open the console — the child only logs once, not on every parent bump.
      </p>
    </div>
  );
}`,
      },
      {
        id: 'usereducer', icon: '🏛️', title: 'useReducer',
        desc: 'Like useState but with a reducer — a pure function (state, action) =&gt; nextState. Great for multi-step state machines.',
        points: ['<b>dispatch({ type })</b> instead of setState', 'Reducer is <b>pure</b> — same input, same output', 'All update logic in one place'],
        code: `const reducer = (state, action) => {
  switch (action.type) {
    case 'inc': return { ...state, count: state.count + 1 };
    case 'dec': return { ...state, count: state.count - 1 };
    case 'set': return { ...state, count: action.value };
    case 'reset': return { count: 0 };
    default: return state;
  }
};

function App() {
  const [state, dispatch] = React.useReducer(reducer, { count: 0 });
  const odd = state.count % 2 !== 0;

  return (
    <div className="max-w-md w-full rounded-2xl border border-slate-700/60 bg-slate-900 p-6 text-center shadow-xl">
      <span className="inline-block rounded-full bg-blue-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-blue-400">useReducer</span>
      <h2 className="mt-2.5 text-lg font-bold text-slate-100">Reducer Counter</h2>
      <div className="my-2 text-4xl font-extrabold text-slate-100">{state.count}</div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 px-4 py-2 text-[13px] font-semibold text-white transition hover:brightness-110"
          onClick={() => dispatch({ type: 'inc' })}>+1</button>
        <button className="rounded-lg border border-slate-600 px-4 py-2 text-[13px] font-semibold text-slate-200 transition hover:border-blue-500"
          onClick={() => dispatch({ type: 'dec' })}>-1</button>
        <button className="rounded-lg border border-slate-600 px-4 py-2 text-[13px] font-semibold text-slate-200 transition hover:border-blue-500"
          onClick={() => dispatch({ type: 'set', value: 0 })}>0</button>
      </div>
      <p className="mt-3 text-xs text-amber-400/90">
        {odd ? 'odd number' : 'even number'} · every action goes through the reducer
      </p>
    </div>
  );
}`,
      },
      {
        id: 'context', icon: '🌍', title: 'useContext',
        desc: 'Share data across the whole tree without prop-drilling — theme, auth, language. Context = provider + consumer.',
        points: ['<b>createContext</b> then <b>&lt;Provider value&gt;</b>', '<b>useContext(Ctx)</b> reads the nearest value', 'Re-renders everyone who consumes it — don&apos;t overuse'],
        code: `const ThemeCtx = React.createContext('dark');

function ThemedBox() {
  const theme = React.useContext(ThemeCtx);
  const dark = theme === 'dark';
  return (
    <div className={
      'mb-2.5 rounded-xl border p-3.5 text-[13px] ' +
      (dark ? 'border-slate-600 bg-slate-800 text-slate-200' : 'border-slate-300 bg-slate-100 text-slate-700')
    }>
      I am <b>{theme}</b> — no props needed, I read it from context.
    </div>
  );
}

function App() {
  const [theme, setTheme] = React.useState('dark');
  return (
    <div className="max-w-md w-full rounded-2xl border border-slate-700/60 bg-slate-900 p-6 shadow-xl">
      <span className="inline-block rounded-full bg-blue-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-blue-400">useContext</span>
      <h2 className="mt-2.5 mb-3 text-lg font-bold text-slate-100">Theme via context</h2>
      <ThemeCtx.Provider value={theme}>
        <ThemedBox />
        <ThemedBox />
      </ThemeCtx.Provider>
      <button className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 px-4 py-2 text-[13px] font-semibold text-white transition hover:brightness-110"
        onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}>
        toggle theme
      </button>
    </div>
  );
}`,
      },
    ],
  },
  {
    name: 'Styling & Advanced', icon: '🎨',
    sections: [
      {
        id: 'styling', icon: '💅', title: 'Styling with Tailwind',
        desc: 'React pairs perfectly with Tailwind — className takes utility strings, and conditional classes are just string logic.',
        points: ['<b>className</b> = utility strings', '<b>Conditional classes</b> with ternaries or template strings', 'Inline style only for <b>dynamic values</b> (colors, sizes)'],
        code: `function App() {
  const [on, setOn] = React.useState(true);

  return (
    <div className="max-w-md w-full rounded-2xl border border-slate-700/60 bg-slate-900 p-6 shadow-xl">
      <span className="inline-block rounded-full bg-blue-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-blue-400">Tailwind className</span>
      <h2 className="mt-2.5 mb-3 text-lg font-bold text-slate-100">Utilities, not CSS files</h2>
      <div className={
        'mb-3 rounded-xl border p-3 text-[13px] font-semibold ' +
        (on ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400' : 'border-rose-500 bg-rose-500/10 text-rose-400')
      }>
        {on ? '● online' : '○ offline'} — conditional classes
      </div>
      <div className="mb-3 rounded-lg border border-slate-700 bg-slate-800/60 px-2.5 py-2 font-mono text-[11.5px] text-slate-300">
        className={"demo-btn " + (on ? "primary" : "ghost")}
      </div>
      <button className={
        'rounded-lg px-4 py-2 text-[13px] font-semibold transition ' +
        (on ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white hover:brightness-110'
            : 'border border-slate-600 text-slate-200 hover:border-blue-500')
      } onClick={() => setOn(o => !o)}>
        toggle
      </button>
    </div>
  );
}`,
      },
      {
        id: 'error-boundary', icon: '🛟', title: 'Error Boundaries',
        desc: 'A class component that catches render errors in its children and shows a fallback instead of crashing the whole app.',
        points: ['<b>componentDidCatch</b> + <b>getDerivedStateFromError</b>', 'Only class components can be boundaries', 'Wrap risky subtrees — one crash ≠ blank page'],
        code: `class Boundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(error) { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <div className="rounded-xl border border-rose-500 bg-rose-500/10 p-3.5 text-[12.5px] text-rose-400">
          ⚠ {this.state.error.message}
        </div>
      );
    }
    return this.props.children;
  }
}

function Bomb() {
  const [boom, setBoom] = React.useState(false);
  if (boom) throw new Error('💥 I exploded!');
  return (
    <button className="rounded-lg border border-slate-600 px-4 py-2 text-[13px] font-semibold text-slate-200 transition hover:border-rose-500"
      onClick={() => setBoom(true)}>detonate</button>
  );
}

function App() {
  return (
    <div className="max-w-md w-full rounded-2xl border border-slate-700/60 bg-slate-900 p-6 shadow-xl">
      <span className="inline-block rounded-full bg-blue-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-blue-400">error boundary</span>
      <h2 className="mt-2.5 mb-3 text-lg font-bold text-slate-100">Catch crashes, keep the app alive</h2>
      <Boundary>
        <Bomb />
      </Boundary>
      <p className="mt-2.5 text-xs text-slate-500">
        The error is caught here — the rest of the UI keeps working.
      </p>
    </div>
  );
}`,
      },
    ],
  },
);
