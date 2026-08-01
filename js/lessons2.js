/* React Playground — lesson data (part 2: Hooks, Styling, Advanced) */
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
    <div className="demo-card" style={{ textAlign: 'center' }}>
      <span className="demo-tag">useEffect + cleanup</span>
      <h2 style={{ margin: '10px 0 4px', fontSize: 18 }}>Stopwatch</h2>
      <div style={{ fontFamily: 'JetBrains Mono', fontSize: 38, fontWeight: 700,
        margin: '10px 0 16px', letterSpacing: 2 }}>{fmt(ms)}</div>
      <div className="demo-row" style={{ justifyContent: 'center' }}>
        <button className="demo-btn" onClick={() => setRunning(r => !r)}>
          {running ? '⏸ Pause' : '▶ Start'}
        </button>
        <button className="demo-btn ghost" onClick={() => { setRunning(false); setMs(0); }}>Reset</button>
      </div>
      <p style={{ fontSize: 11, color: '#5a6a90', marginTop: 12 }}>
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
    <div className="demo-card">
      <span className="demo-tag">useRef</span>
      <h2 style={{ margin: '10px 0 12px', fontSize: 18 }}>Refs: no re-render</h2>
      <div className="demo-row" style={{ marginBottom: 10 }}>
        <input ref={inputRef} className="demo-input" placeholder="Type here…"
          value={typed} onChange={e => setTyped(e.target.value)} />
        <button className="demo-btn" onClick={() => { inputRef.current.focus(); inputRef.current.select(); }}>
          Focus
        </button>
      </div>
      <p style={{ fontSize: 12.5, color: '#8895b8', lineHeight: 1.7 }}>
        Typed: <b style={{ color: '#e4eaf5' }}>{typed || '(empty)'}</b><br />
        Re-renders: <b style={{ color: '#f0d060' }}>{renders.current}</b> — typing
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
    <div className="demo-card">
      <span className="demo-tag">useMemo</span>
      <h2 style={{ margin: '10px 0 12px', fontSize: 18 }}>Memoize the expensive part</h2>
      <div className="demo-row" style={{ marginBottom: 12 }}>
        <input className="demo-input" type="number" min="1" max="40" value={num}
          onChange={e => setNum(+e.target.value)} />
        <button className="demo-btn ghost" onClick={() => setTick(t => t + 1)}>
          re-render ({tick})
        </button>
      </div>
      <p style={{ fontSize: 13, color: '#8895b8' }}>
        fib({num}) = <b style={{ color: '#3ddc84' }}>{fib.v}</b>{' '}
        <span style={{ fontSize: 11 }}>({fib.ms}ms)</span>
      </p>
      <p style={{ fontSize: 11.5, color: '#5a6a90', marginTop: 8 }}>
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
    <button className="demo-btn small ghost" onClick={onClick}>{label}</button>
  );
});

function App() {
  const [count, setCount] = React.useState(0);

  // stable identity — child skips re-render when count changes
  const handleClick = React.useCallback(() => {
    console.log('clicked!');
  }, []);

  return (
    <div className="demo-card">
      <span className="demo-tag">useCallback + React.memo</span>
      <h2 style={{ margin: '10px 0 12px', fontSize: 18 }}>Stable callbacks</h2>
      <p style={{ fontSize: 13.5, marginBottom: 12 }}>
        Count: <b style={{ color: '#3ddc84' }}>{count}</b>
      </p>
      <div className="demo-row">
        <button className="demo-btn" onClick={() => setCount(c => c + 1)}>bump parent</button>
        <Child label="memoized child" onClick={handleClick} />
      </div>
      <p style={{ fontSize: 11.5, color: '#5a6a90', marginTop: 10 }}>
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
    <div className="demo-card" style={{ textAlign: 'center' }}>
      <span className="demo-tag">useReducer</span>
      <h2 style={{ margin: '10px 0 4px', fontSize: 18 }}>Reducer Counter</h2>
      <div style={{ fontSize: 42, fontWeight: 800, margin: '8px 0 14px' }}>{state.count}</div>
      <div className="demo-row" style={{ justifyContent: 'center', flexWrap: 'wrap' }}>
        <button className="demo-btn" onClick={() => dispatch({ type: 'inc' })}>+1</button>
        <button className="demo-btn ghost" onClick={() => dispatch({ type: 'dec' })}>-1</button>
        <button className="demo-btn ghost" onClick={() => dispatch({ type: 'set', value: 0 })}>0</button>
      </div>
      <p style={{ fontSize: 12, color: odd ? '#f0d060' : '#5a6a90', marginTop: 12 }}>
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
    <div style={{
      border: '1px solid ' + (dark ? '#1e3058' : '#dde3f0'),
      borderRadius: 10, padding: 14, marginBottom: 10,
      background: dark ? '#111d38' : '#f4f6fb',
      color: dark ? '#e4eaf5' : '#0f1729',
      fontSize: 13
    }}>
      I am <b>{theme}</b> — no props needed, I read it from context.
    </div>
  );
}

function App() {
  const [theme, setTheme] = React.useState('dark');
  return (
    <div className="demo-card">
      <span className="demo-tag">useContext</span>
      <h2 style={{ margin: '10px 0 12px', fontSize: 18 }}>Theme via context</h2>
      <ThemeCtx.Provider value={theme}>
        <ThemedBox />
        <ThemedBox />
      </ThemeCtx.Provider>
      <button className="demo-btn" onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}>
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
        id: 'styling', icon: '💅', title: 'Styling Components',
        desc: 'Three built-in ways: className (CSS/Tailwind), inline style objects, and conditional classes. No framework required.',
        points: ['<b>className</b> for stylesheets / Tailwind', '<b>style={{}}</b> — camelCase keys, object', '<b>Conditional classes</b> with ternaries'],
        code: `function App() {
  const [on, setOn] = React.useState(true);

  return (
    <div className="demo-card">
      <span className="demo-tag">className + style + conditionals</span>
      <h2 style={{ margin: '10px 0 12px', fontSize: 18 }}>Three ways to style</h2>
      <div style={{
        padding: 12, borderRadius: 10, marginBottom: 12,
        background: on ? 'rgba(61,220,132,.12)' : 'rgba(228,104,106,.12)',
        border: '1px solid ' + (on ? '#3ddc84' : '#e4686a'),
        color: on ? '#3ddc84' : '#e4686a', fontSize: 13, fontWeight: 600
      }}>
        {on ? '● online' : '○ offline'} — inline style object
      </div>
      <div className="demo-code" style={{ marginBottom: 12 }}>
        className="demo-btn {on ? 'primary' : 'ghost'}"
      </div>
      <button className={'demo-btn' + (on ? '' : ' ghost')} onClick={() => setOn(o => !o)}>
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
        <div style={{ border: '1px solid #e4686a', borderRadius: 10, padding: 14,
          background: 'rgba(228,104,106,.08)', color: '#e4686a', fontSize: 12.5 }}>
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
    <button className="demo-btn ghost" onClick={() => setBoom(true)}>detonate</button>
  );
}

function App() {
  return (
    <div className="demo-card">
      <span className="demo-tag">error boundary</span>
      <h2 style={{ margin: '10px 0 12px', fontSize: 18 }}>Catch crashes, keep the app alive</h2>
      <Boundary>
        <Bomb />
      </Boundary>
      <p style={{ fontSize: 12, color: '#8895b8', marginTop: 10 }}>
        The error is caught here — the rest of the UI keeps working.
      </p>
    </div>
  );
}`,
      },
    ],
  },
);
