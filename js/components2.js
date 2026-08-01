/* React Playground — component library (part 2) — Tailwind edition */
COMPONENTS.push(
  {
    id: 'tabs', icon: '📑', name: 'Tabs',
    desc: 'Tabbed panels with keyboard-accessible buttons.',
    code: `function App() {
  const [tab, setTab] = React.useState('overview');
  const TABS = {
    overview: '🏠 Overview — income, spending, net worth at a glance.',
    budget: '💸 Budget — per-category caps and burn rate.',
    goals: '🎯 Goals — savings targets and progress bars.',
  };
  return (
    <div className="max-w-md w-full rounded-2xl border border-slate-700/60 bg-slate-900 p-6 shadow-xl">
      <span className="inline-block rounded-full bg-blue-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-blue-400">Tabs</span>
      <h2 className="mt-2.5 mb-3 text-lg font-bold text-slate-100">CashFlow tabs</h2>
      <div className="mb-3.5 flex items-center gap-1.5">
        {Object.keys(TABS).map(k => (
          <button key={k}
            className={
              'rounded-lg px-3.5 py-1.5 text-[12.5px] font-semibold transition ' +
              (tab === k
                ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white'
                : 'border border-slate-700 text-slate-400 hover:text-slate-200')
            }
            onClick={() => setTab(k)}>{k}</button>
        ))}
      </div>
      <p className="rounded-lg bg-slate-800/60 p-3 text-[13.5px] leading-relaxed text-slate-400">
        {TABS[tab]}
      </p>
    </div>
  );
}`,
  },
  {
    id: 'todo', icon: '✅', name: 'Todo List',
    desc: 'Add, toggle, delete — classic state drill.',
    code: `function App() {
  const [todos, setTodos] = React.useState([
    { id: 1, text: 'Learn React', done: true },
    { id: 2, text: 'Build a playground', done: false },
  ]);
  const [text, setText] = React.useState('');

  const add = () => {
    if (!text.trim()) return;
    setTodos(t => [...t, { id: Date.now(), text, done: false }]);
    setText('');
  };

  return (
    <div className="max-w-md w-full rounded-2xl border border-slate-700/60 bg-slate-900 p-6 shadow-xl">
      <span className="inline-block rounded-full bg-blue-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-blue-400">useState</span>
      <h2 className="mt-2.5 mb-3 text-lg font-bold text-slate-100">Todo List</h2>
      <div className="mb-3 flex items-center gap-2">
        <input className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-[12.5px] text-slate-200 outline-none focus:border-blue-500"
          placeholder="Add a todo…" value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && add()} />
        <button className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 px-3.5 py-2 text-[13px] font-semibold text-white transition hover:brightness-110"
          onClick={add}>Add</button>
      </div>
      <ul className="grid list-none gap-1.5">
        {todos.map(t => (
          <li key={t.id} className="flex items-center justify-between rounded-lg bg-slate-800/60 px-2.5 py-1.5">
            <span className={'text-[13px] ' + (t.done ? 'opacity-50 line-through' : 'text-slate-200')}>
              {t.text}
            </span>
            <span className="flex items-center gap-1.5">
              <button className="cursor-pointer rounded-md border border-slate-700 px-2 py-0.5 text-[11px] text-slate-300 transition hover:border-blue-500"
                onClick={() => setTodos(x => x.map(i => i.id === t.id ? { ...i, done: !i.done } : i))}>
                {t.done ? '↩' : '✓'}
              </button>
              <button className="cursor-pointer rounded-md border border-slate-700 px-2 py-0.5 text-[11px] text-slate-300 transition hover:border-rose-500"
                onClick={() => setTodos(x => x.filter(i => i.id !== t.id))}>✕</button>
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-2.5 text-[11px] text-slate-500">{todos.length} items · Enter adds</p>
    </div>
  );
}`,
  },
  {
    id: 'form', icon: '📝', name: 'Form',
    desc: 'Controlled form with validation states.',
    code: `function App() {
  const [form, setForm] = React.useState({ name: '', email: '' });
  const [sent, setSent] = React.useState(false);
  const [err, setErr] = React.useState('');

  const set = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = e => {
    e.preventDefault();
    if (!form.name.trim() || !/^[^@\\s]+@[^@\\s]+$/.test(form.email)) {
      setErr('Fill a valid name + email.');
      return;
    }
    setErr(''); setSent(true);
  };

  return (
    <div className="max-w-md w-full rounded-2xl border border-slate-700/60 bg-slate-900 p-6 shadow-xl">
      <span className="inline-block rounded-full bg-blue-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-blue-400">controlled form</span>
      <h2 className="mt-2.5 mb-3 text-lg font-bold text-slate-100">Sign Up</h2>
      {sent ? (
        <div className="py-4 text-center">
          <div className="text-3xl">🎉</div>
          <p className="my-2 text-sm text-slate-200">Welcome, {form.name}!</p>
          <button className="rounded-lg border border-slate-600 px-4 py-2 text-[13px] font-semibold text-slate-200 transition hover:border-blue-500"
            onClick={() => { setSent(false); setForm({ name: '', email: '' }); }}>Reset</button>
        </div>
      ) : (
        <form onSubmit={submit} className="grid gap-2.5">
          <input className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-[12.5px] text-slate-200 outline-none focus:border-blue-500"
            name="name" placeholder="Name" value={form.name} onChange={set} />
          <input className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-[12.5px] text-slate-200 outline-none focus:border-blue-500"
            name="email" type="email" placeholder="Email" value={form.email} onChange={set} />
          {err && <p className="text-[11.5px] text-rose-400">{err}</p>}
          <button type="submit" className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 px-4 py-2 text-[13px] font-semibold text-white transition hover:brightness-110">
            Submit
          </button>
        </form>
      )}
    </div>
  );
}`,
  },
  {
    id: 'accordion', icon: '🪗', name: 'Accordion',
    desc: 'Expand/collapse items, one open at a time.',
    code: `function Item({ title, children, open, onToggle }) {
  return (
    <div className="mb-2 overflow-hidden rounded-xl border border-slate-700">
      <button onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between border-none bg-transparent px-3.5 py-2.5 text-[13px] font-semibold text-slate-200 transition hover:bg-slate-800/50">
        <span>{title}</span><span>{open ? '−' : '+'}</span>
      </button>
      {open && <div className="bg-slate-800/50 px-3.5 py-2.5 text-[12.5px] text-slate-400">{children}</div>}
    </div>
  );
}

function App() {
  const [open, setOpen] = React.useState(0);
  const items = [
    ['What is JSX?', 'A syntax extension that mixes HTML-like markup into JavaScript.'],
    ['What are hooks?', 'Functions like useState and useEffect that add state and lifecycle to components.'],
    ['Why key props?', 'Keys help React identify which list items changed, got added, or were removed.'],
  ];
  return (
    <div className="max-w-md w-full rounded-2xl border border-slate-700/60 bg-slate-900 p-6 shadow-xl">
      <span className="inline-block rounded-full bg-blue-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-blue-400">props + state</span>
      <h2 className="mt-2.5 mb-3 text-lg font-bold text-slate-100">Accordion</h2>
      {items.map(([t, d], i) => (
        <Item key={t} title={t} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)}>{d}</Item>
      ))}
    </div>
  );
}`,
  },
  {
    id: 'stopwatch', icon: '⏱️', name: 'Stopwatch',
    desc: 'Interval timing with cleanup.',
    code: `function App() {
  const [ms, setMs] = React.useState(0);
  const [running, setRunning] = React.useState(false);

  React.useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setMs(m => m + 10), 10);
    return () => clearInterval(id);
  }, [running]);

  const fmt = m => {
    const min = String(Math.floor(m / 60000)).padStart(2, '0');
    const sec = String(Math.floor(m / 1000) % 60).padStart(2, '0');
    const cen = String(Math.floor(m / 10) % 100).padStart(2, '0');
    return min + ':' + sec + '.' + cen;
  };

  return (
    <div className="max-w-md w-full rounded-2xl border border-slate-700/60 bg-slate-900 p-6 text-center shadow-xl">
      <span className="inline-block rounded-full bg-blue-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-blue-400">useEffect</span>
      <h2 className="mt-2.5 text-lg font-bold text-slate-100">Stopwatch</h2>
      <div className="my-2.5 font-mono text-4xl font-bold tracking-[.2em] text-slate-100">{fmt(ms)}</div>
      <div className="flex items-center justify-center gap-2">
        <button className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 px-4 py-2 text-[13px] font-semibold text-white transition hover:brightness-110"
          onClick={() => setRunning(r => !r)}>{running ? '⏸ Pause' : '▶ Start'}</button>
        <button className="rounded-lg border border-slate-600 px-4 py-2 text-[13px] font-semibold text-slate-200 transition hover:border-blue-500"
          onClick={() => { setRunning(false); setMs(0); }}>Reset</button>
      </div>
      <p className="mt-3 text-[11px] text-slate-500">interval cleaned up when stopped</p>
    </div>
  );
}`,
  },
  {
    id: 'colorpicker', icon: '🎨', name: 'Color Picker',
    desc: 'Three sliders → derived HSL color.',
    code: `function App() {
  const [hue, setHue] = React.useState(210);
  const [sat, setSat] = React.useState(80);
  const [light, setLight] = React.useState(55);
  const color = 'hsl(' + hue + ',' + sat + '%,' + light + '%)';

  const Slider = ({ label, value, set, max }) => (
    <label className="mb-2.5 grid gap-1 text-xs text-slate-400">
      {label} <b className="text-slate-200">{value}</b>
      <input type="range" min="0" max={max} value={value} onChange={e => set(+e.target.value)} />
    </label>
  );

  return (
    <div className="max-w-md w-full rounded-2xl border border-slate-700/60 bg-slate-900 p-6 shadow-xl">
      <span className="inline-block rounded-full bg-blue-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-blue-400">derived state</span>
      <h2 className="mt-2.5 mb-3 text-lg font-bold text-slate-100">Color Picker</h2>
      <div className="mb-3.5 h-[90px] rounded-xl border border-slate-700" style={{ background: color }} />
      <Slider label="Hue" value={hue} set={setHue} max={360} />
      <Slider label="Saturation" value={sat} set={setSat} max={100} />
      <Slider label="Lightness" value={light} set={setLight} max={100} />
      <code className="font-mono text-xs" style={{ color }}>{color}</code>
    </div>
  );
}`,
  },
  {
    id: 'clock', icon: '🕐', name: 'Clock',
    desc: 'Live time, one effect.',
    code: `function App() {
  const [now, setNow] = React.useState(new Date());

  React.useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const fmt = n => String(n).padStart(2, '0');
  const day = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="max-w-md w-full rounded-2xl border border-slate-700/60 bg-slate-900 p-6 text-center shadow-xl">
      <span className="inline-block rounded-full bg-blue-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-blue-400">live tick</span>
      <h2 className="mt-2.5 text-lg font-bold text-slate-100">{day}</h2>
      <div className="my-2 font-mono text-[42px] font-bold tracking-[.3em] text-slate-100">
        {fmt(now.getHours())}:{fmt(now.getMinutes())}:{fmt(now.getSeconds())}
      </div>
      <p className="text-[11px] text-slate-500">updates every second · interval cleaned on unmount</p>
    </div>
  );
}`,
  },
  {
    id: 'profile', icon: '👤', name: 'Profile Card',
    desc: 'Stats row + avatar + CTA.',
    code: `const stats = [
  { label: 'Repos', value: 42 },
  { label: 'Stars', value: 128 },
  { label: 'Days', value: 365 },
];

function App() {
  return (
    <div className="max-w-md w-full rounded-2xl border border-slate-700/60 bg-slate-900 p-6 text-center shadow-xl">
      <div className="mx-auto mb-2.5 grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-2xl font-extrabold text-white">A</div>
      <h2 className="text-[17px] font-bold text-slate-100">Attila</h2>
      <p className="my-1 text-[12.5px] text-slate-400">Filipino · PHP pesos · React fan</p>
      <div className="mb-3.5 flex items-center justify-center gap-2">
        {stats.map(s => (
          <div key={s.label} className="min-w-[70px] rounded-xl bg-slate-800/60 px-3.5 py-2">
            <div className="text-[15px] font-extrabold text-slate-100">{s.value}</div>
            <div className="text-[10px] text-slate-500">{s.label}</div>
          </div>
        ))}
      </div>
      <button className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 px-4 py-2 text-[13px] font-semibold text-white transition hover:brightness-110">
        Follow
      </button>
    </div>
  );
}`,
  },
);
