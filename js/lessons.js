/* React Playground — lesson data (part 1: JSX, Components, State) — Tailwind edition */
const CATEGORIES = [
  {
    name: 'JSX & Rendering', icon: '🧱',
    sections: [
      {
        id: 'jsx-basics', icon: '📝', title: 'What is JSX?',
        desc: 'JSX is a syntax extension that lets you write HTML-like markup inside JavaScript. Babel compiles it into React.createElement calls — no strings, no template engines.',
        points: ['<b>One component</b> = one function returning JSX', '<b>Self-closing</b> tags: <img />, <br />', '<b>class</b> becomes <b>className</b>'],
        code: `function App() {
  return (
    <div className="max-w-md w-full rounded-2xl border border-slate-700/60 bg-slate-900 p-6 shadow-xl">
      <span className="inline-block rounded-full bg-blue-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-blue-400">JSX</span>
      <h2 className="mt-2.5 text-lg font-bold text-slate-100">Hello, JSX!</h2>
      <p className="mt-2 text-[13px] leading-relaxed text-slate-400">
        This whole card is JSX — markup written
        directly inside a JavaScript function.
      </p>
      <div className="mt-3 rounded-lg border border-slate-700 bg-slate-800/60 px-2.5 py-2 font-mono text-[11.5px] text-slate-300">
        {'<h1>Hello</h1>'}  {'// compiles to createElement'}
      </div>
    </div>
  );
}`,
      },
      {
        id: 'jsx-expressions', icon: '🧮', title: 'Expressions in JSX',
        desc: 'Anything inside curly braces { } is evaluated as JavaScript — variables, math, function calls, even other JSX.',
        points: ['<b>{expr}</b> renders the value', '<b>Strings & numbers</b> render directly', '<b>Objects are not valid children</b> — use JSON.stringify'],
        code: `function App() {
  const name = 'Attila';
  const price = 1250;
  const items = ['JSX', 'State', 'Hooks'];

  return (
    <div className="max-w-md w-full rounded-2xl border border-slate-700/60 bg-slate-900 p-6 shadow-xl">
      <span className="inline-block rounded-full bg-blue-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-blue-400">{'{expr}'}</span>
      <h2 className="mt-2.5 text-lg font-bold text-slate-100">Curly braces = JavaScript</h2>
      <p className="mt-2 text-[13px] leading-relaxed text-slate-400">
        Hi, {name}!<br />
        Price: <b className="text-slate-200">{'₱' + price.toLocaleString()}</b><br />
        Math: {2 + 3 * 4}<br />
        Uppercase: {name.toUpperCase()}<br />
        Length: {name.length} letters
      </p>
      <p className="mt-2.5 text-[13px] text-slate-400">
        Map over data:{' '}
        {items.map(i => <b key={i} className="mr-1.5 text-blue-400">{i}</b>)}
      </p>
    </div>
  );
}`,
      },
      {
        id: 'fragments', icon: '🧩', title: 'Fragments',
        desc: 'A component must return ONE root element. Fragments (<>...</>) group children without adding a DOM node — no more wrapper divs.',
        points: ['<b>&lt;&gt;…&lt;/&gt;</b> adds no DOM node', 'Short syntax needs a <b>key</b> inside lists', 'Long form: &lt;React.Fragment&gt;'],
        code: `function App() {
  return (
    <div className="max-w-md w-full rounded-2xl border border-slate-700/60 bg-slate-900 p-6 shadow-xl">
      <span className="inline-block rounded-full bg-blue-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-blue-400">Fragment</span>
      <h2 className="mt-2.5 text-lg font-bold text-slate-100">One root, no wrapper</h2>
      <p className="mt-2 text-[13px] leading-relaxed text-slate-400">
        A fragment lets siblings sit side by side
        without a parent div in the DOM:
      </p>
      <div className="mt-2.5 flex items-center gap-2">
        <span className="rounded-full bg-blue-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-blue-400">span 1</span>
        <span className="rounded-full bg-purple-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-purple-400">span 2</span>
        <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-400">span 3</span>
      </div>
      <p className="mt-3 rounded-lg border border-slate-700 bg-slate-800/60 px-2.5 py-2 font-mono text-[11.5px] text-slate-300">
        return {'<>'} &lt;A/&gt; &lt;B/&gt; {'</>'}
      </p>
    </div>
  );
}`,
      },
      {
        id: 'conditional', icon: '🔀', title: 'Conditional Rendering',
        desc: 'Render different output based on state — ternary, && short-circuit, or early return.',
        points: ['<b>{cond ? A : B}</b> — if/else in JSX', '<b>{cond && &lt;A/&gt;}</b> — render or nothing', '<b>Early return</b> — bail out before the JSX'],
        code: `function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [unread, setUnread] = React.useState(3);

  return (
    <div className="max-w-md w-full rounded-2xl border border-slate-700/60 bg-slate-900 p-6 shadow-xl">
      <span className="inline-block rounded-full bg-blue-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-blue-400">ternary · && · early return</span>
      <h2 className="mt-2.5 text-lg font-bold text-slate-100">Conditional Rendering</h2>

      {loggedIn ? (
        <p className="mb-3 text-[13.5px] text-slate-300">
          👋 Welcome back!{' '}
          {unread > 0 && (
            <span className="rounded-full bg-rose-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-rose-400">
              {unread} unread
            </span>
          )}
        </p>
      ) : (
        <p className="mb-3 text-[13.5px] text-slate-400">You are logged out.</p>
      )}

      <button className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 px-4 py-2 text-[13px] font-semibold text-white transition hover:brightness-110"
        onClick={() => setLoggedIn(l => !l)}>
        {loggedIn ? 'Log out' : 'Log in'}
      </button>
    </div>
  );
}`,
      },
    ],
  },
  {
    name: 'Components & Props', icon: '🧩',
    sections: [
      {
        id: 'function-components', icon: '⚙️', title: 'Function Components',
        desc: 'A component is just a function that returns JSX. Capitalize the name and reuse it like an HTML tag — that is the whole mental model.',
        points: ['<b>Capital letter</b> — lowercase is treated as HTML', '<b>Reusable</b>: render it as many times as you like', '<b>Props in, JSX out</b> — pure functions'],
        code: `function Greeting() {
  return <p className="mb-2 text-sm text-slate-300">👋 from Greeting</p>;
}

function Card({ children }) {
  return (
    <div className="rounded-xl border border-slate-700/60 bg-slate-900 p-4">
      {children}
    </div>
  );
}

function App() {
  return (
    <div className="max-w-md w-full rounded-2xl border border-slate-700/60 bg-slate-900 p-6 shadow-xl">
      <span className="inline-block rounded-full bg-blue-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-blue-400">components</span>
      <h2 className="mt-2.5 mb-3 text-lg font-bold text-slate-100">Compose, don&apos;t repeat</h2>
      <Greeting />
      <Greeting />
      <Card>
        <p className="text-[13px] text-slate-400">
          Greeting is used twice above — same function,
          two outputs. That&apos;s a component.
        </p>
      </Card>
    </div>
  );
}`,
      },
      {
        id: 'props', icon: '📦', title: 'Props',
        desc: 'Props are the arguments you pass to a component — read-only data from the parent. One-way data flow: parent → child.',
        points: ['<b>Read-only</b> — never mutate props', '<b>Destructure</b> them in the signature', '<b>defaults</b>: function Card({ size = 16 })'],
        code: `function Avatar({ name, color, size = 44 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: color, display: 'grid', placeItems: 'center',
      fontSize: size * 0.45, fontWeight: 800, color: '#fff'
    }}>
      {name[0]}
    </div>
  );
}

function App() {
  return (
    <div className="max-w-md w-full rounded-2xl border border-slate-700/60 bg-slate-900 p-6 shadow-xl">
      <span className="inline-block rounded-full bg-blue-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-blue-400">props</span>
      <h2 className="mt-2.5 mb-3 text-lg font-bold text-slate-100">Props in, JSX out</h2>
      <div className="flex items-center gap-3">
        <Avatar name="Attila" color="#4a8cf4" />
        <Avatar name="Juan" color="#9b7cf7" size={56} />
        <Avatar name="Maria" color="#3ddc84" size={32} />
      </div>
      <p className="mt-3 text-xs text-slate-500">
        Same component, different props — size, color, initial.
      </p>
    </div>
  );
}`,
      },
      {
        id: 'children', icon: '🪆', title: 'Children & Composition',
        desc: 'The children prop lets components wrap arbitrary content — the foundation of layouts, modals, and cards.',
        points: ['<b>children</b> = whatever sits between tags', 'Compose layouts from small pieces', '<b>Slot pattern</b>: pass children + props together'],
        code: `function Panel({ title, children }) {
  return (
    <div className="mb-2.5 rounded-xl border border-slate-700 bg-slate-800/50 p-3.5">
      <div className="mb-2 text-[11px] font-bold uppercase tracking-[.08em] text-blue-400">{title}</div>
      {children}
    </div>
  );
}

function App() {
  return (
    <div className="max-w-md w-full rounded-2xl border border-slate-700/60 bg-slate-900 p-6 shadow-xl">
      <span className="inline-block rounded-full bg-blue-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-blue-400">children</span>
      <h2 className="mt-2.5 mb-3 text-lg font-bold text-slate-100">Composition</h2>
      <Panel title="Notice">
        <p className="text-[13px] text-slate-400">I am arbitrary JSX passed as children.</p>
      </Panel>
      <Panel title="Alert">
        <p className="text-[13px] text-amber-400">Children can be anything — text, elements, components.</p>
      </Panel>
    </div>
  );
}`,
      },
      {
        id: 'lists-keys', icon: '📋', title: 'Lists & Keys',
        desc: 'Render arrays with .map(). Every item needs a stable key so React can track which items changed, got added, or were removed.',
        points: ['<b>key</b> = stable unique id (never index if order changes)', '<b>map</b> returns an array of JSX', '<b>Filter + map</b> chain for derived lists'],
        code: `const players = [
  { id: 1, name: 'LeBron', team: 'LAL' },
  { id: 2, name: 'Curry', team: 'GSW' },
  { id: 3, name: 'Jokic', team: 'DEN' },
];

function App() {
  const [draft, setDraft] = React.useState([]);
  const add = p => setDraft(d => d.includes(p.id) ? d : [...d, p.id]);

  return (
    <div className="max-w-md w-full rounded-2xl border border-slate-700/60 bg-slate-900 p-6 shadow-xl">
      <span className="inline-block rounded-full bg-blue-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-blue-400">.map() + keys</span>
      <h2 className="mt-2.5 mb-3 text-lg font-bold text-slate-100">Lists & Keys</h2>
      {players.map(p => (
        <div key={p.id} className="mb-1.5 flex items-center justify-between">
          <span className="text-[13px] text-slate-200">
            {p.name} <span className="text-[11px] text-slate-500">{p.team}</span>
          </span>
          <button className="rounded-lg border border-slate-600 px-2.5 py-1 text-[11px] font-semibold text-slate-200 transition hover:border-blue-500"
            onClick={() => add(p)}>
            {draft.includes(p.id) ? '✓ drafted' : '+ draft'}
          </button>
        </div>
      ))}
      <p className="mt-2.5 text-xs text-slate-500">
        Drafted: {draft.length} · keys keep state per row
      </p>
    </div>
  );
}`,
      },
    ],
  },
  {
    name: 'State & Events', icon: '🎯',
    sections: [
      {
        id: 'usestate', icon: '🔢', title: 'useState',
        desc: 'State is data that changes over time. useState returns [value, setValue] — call the setter to re-render the component with the new value.',
        points: ['<b>const [n, setN] = useState(0)</b>', 'Updater form: <b>setN(n =&gt; n + 1)</b> when the new value depends on the old', 'State is <b>per-instance</b> — each component gets its own'],
        code: `function App() {
  const [count, setCount] = React.useState(0);
  const [step, setStep] = React.useState(1);

  return (
    <div className="max-w-md w-full rounded-2xl border border-slate-700/60 bg-slate-900 p-6 shadow-xl">
      <span className="inline-block rounded-full bg-blue-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-blue-400">useState</span>
      <h2 className="mt-2.5 text-lg font-bold text-slate-100">Counter</h2>
      <p className="mb-3.5 mt-1.5 text-[13px] text-slate-400">
        setCount schedules a re-render with the new value.
      </p>
      <div className="mb-2.5 flex items-center gap-2">
        <button className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 px-4 py-2 text-[13px] font-semibold text-white transition hover:brightness-110"
          onClick={() => setCount(c => c + step)}>+{step}</button>
        <button className="rounded-lg border border-slate-600 px-4 py-2 text-[13px] font-semibold text-slate-200 transition hover:border-blue-500"
          onClick={() => setCount(0)}>Reset</button>
        <b className="ml-2 text-xl text-slate-100">{count}</b>
      </div>
      <label className="text-xs text-slate-400">
        Step:{' '}
        <input type="range" min="1" max="10" value={step}
          onChange={e => setStep(+e.target.value)} />
      </label>
    </div>
  );
}`,
      },
      {
        id: 'events', icon: '🖱️', title: 'Handling Events',
        desc: 'Events are props: onClick, onChange, onSubmit… Handlers receive the event object — preventDefault stops browser defaults.',
        points: ['<b>onClick={handler}</b> — pass the function, don&apos;t call it', '<b>e.target.value</b> reads inputs', '<b>e.preventDefault()</b> in forms'],
        code: `function App() {
  const [clicks, setClicks] = React.useState(0);
  const [hover, setHover] = React.useState(false);
  const [pos, setPos] = React.useState('0, 0');

  return (
    <div className="max-w-md w-full rounded-2xl border border-slate-700/60 bg-slate-900 p-6 shadow-xl">
      <span className="inline-block rounded-full bg-blue-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-blue-400">events</span>
      <h2 className="mt-2.5 mb-3 text-lg font-bold text-slate-100">Events are just props</h2>
      <div className="mb-2.5 flex flex-wrap items-center gap-2">
        <button className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 px-4 py-2 text-[13px] font-semibold text-white transition hover:brightness-110"
          onClick={() => setClicks(c => c + 1)}>
          Clicked {clicks}×
        </button>
        <button className="rounded-lg border border-slate-600 px-4 py-2 text-[13px] font-semibold text-slate-200 transition hover:border-blue-500"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}>
          {hover ? '🖱️ hovered' : 'hover me'}
        </button>
      </div>
      <div className="rounded-lg border border-dashed border-slate-600 p-3 font-mono text-xs text-slate-400"
        onMouseMove={e => setPos(e.clientX + ', ' + e.clientY)}>
        mouse: {pos}
      </div>
    </div>
  );
}`,
      },
      {
        id: 'forms', icon: '📝', title: 'Forms & Controlled Inputs',
        desc: 'A controlled input stores its value in state and updates it on every keystroke — React owns the source of truth.',
        points: ['<b>value={state} + onChange</b> = controlled', 'One handler can serve many fields via <b>name</b>', 'Validate before submit, show errors inline'],
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
        id: 'lifting', icon: '⬆️', title: 'Lifting State Up',
        desc: 'When two components need the same data, move the state to their closest common parent and pass it down via props.',
        points: ['<b>Single source of truth</b> in the parent', 'Pass <b>value + setter</b> down as props', 'Child calls the parent&apos;s setter — data flows up via events'],
        code: `function Temperature({ label, value, onChange }) {
  return (
    <label className="grid gap-1.5 text-[12.5px] text-slate-400">
      {label}
      <input type="number" className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-[12.5px] text-slate-200 outline-none focus:border-blue-500"
        value={value} onChange={e => onChange(+e.target.value)} />
    </label>
  );
}

function App() {
  const [celsius, setCelsius] = React.useState(25);
  const fahrenheit = Math.round(celsius * 9 / 5 + 32);

  return (
    <div className="max-w-md w-full rounded-2xl border border-slate-700/60 bg-slate-900 p-6 shadow-xl">
      <span className="inline-block rounded-full bg-blue-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-blue-400">lifting state</span>
      <h2 className="mt-2.5 mb-3 text-lg font-bold text-slate-100">One state, two fields</h2>
      <div className="grid grid-cols-2 gap-2.5">
        <Temperature label="°C" value={celsius} onChange={setCelsius} />
        <Temperature label="°F" value={fahrenheit}
          onChange={f => setCelsius(Math.round((f - 32) * 5 / 9))} />
      </div>
      <p className="mt-3 text-xs text-slate-500">
        State lives in App — both inputs edit the same source of truth.
      </p>
    </div>
  );
}`,
      },
    ],
  },
];
