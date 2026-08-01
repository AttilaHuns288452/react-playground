/* React Playground — lesson data (part 1: JSX, Components, State) */
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
    <div className="demo-card">
      <span className="demo-tag">JSX</span>
      <h2 style={{ margin: '10px 0 8px', fontSize: 18 }}>Hello, JSX!</h2>
      <p style={{ color: '#8895b8', fontSize: 13, lineHeight: 1.6 }}>
        This whole card is JSX — markup written
        directly inside a JavaScript function.
      </p>
      <div className="demo-code" style={{ marginTop: 12 }}>
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
    <div className="demo-card">
      <span className="demo-tag">{'{expr}'}</span>
      <h2 style={{ margin: '10px 0 8px', fontSize: 18 }}>Curly braces = JavaScript</h2>
      <p style={{ fontSize: 13, color: '#8895b8', lineHeight: 1.8 }}>
        Hi, {name}!<br />
        Price: <b>{'₱' + price.toLocaleString()}</b><br />
        Math: {2 + 3 * 4}<br />
        Uppercase: {name.toUpperCase()}<br />
        Length: {name.length} letters
      </p>
      <p style={{ fontSize: 13, color: '#8895b8', marginTop: 10 }}>
        Map over data: {items.map(i => <b key={i} style={{ marginRight: 6 }}>{i}</b>)}
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
    <div className="demo-card">
      <span className="demo-tag">Fragment</span>
      <h2 style={{ margin: '10px 0 12px', fontSize: 18 }}>One root, no wrapper</h2>
      <p style={{ fontSize: 13, color: '#8895b8', lineHeight: 1.7 }}>
        A fragment lets siblings sit side by side
        without a parent div in the DOM:
      </p>
      <div className="demo-row" style={{ marginTop: 10 }}>
        <span className="demo-tag">span 1</span>
        <span className="demo-tag">span 2</span>
        <span className="demo-tag">span 3</span>
      </div>
      <p className="demo-code" style={{ marginTop: 12 }}>
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
    <div className="demo-card">
      <span className="demo-tag">ternary · && · early return</span>
      <h2 style={{ margin: '10px 0 12px', fontSize: 18 }}>Conditional Rendering</h2>

      {loggedIn ? (
        <p style={{ fontSize: 13.5, marginBottom: 12 }}>
          👋 Welcome back! {unread > 0 && (
            <span className="demo-tag" style={{ background: 'rgba(228,104,106,.15)', color: '#e4686a' }}>
              {unread} unread
            </span>
          )}
        </p>
      ) : (
        <p style={{ fontSize: 13.5, marginBottom: 12, color: '#8895b8' }}>You are logged out.</p>
      )}

      <button className="demo-btn" onClick={() => setLoggedIn(l => !l)}>
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
  return <p style={{ fontSize: 14, marginBottom: 8 }}>👋 from Greeting</p>;
}

function Card({ children }) {
  return (
    <div className="demo-card" style={{ padding: 16 }}>
      {children}
    </div>
  );
}

function App() {
  return (
    <div className="demo-card">
      <span className="demo-tag">components</span>
      <h2 style={{ margin: '10px 0 12px', fontSize: 18 }}>Compose, don&apos;t repeat</h2>
      <Greeting />
      <Greeting />
      <Card>
        <p style={{ fontSize: 13, color: '#8895b8' }}>
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
    <div className="demo-card">
      <span className="demo-tag">props</span>
      <h2 style={{ margin: '10px 0 14px', fontSize: 18 }}>Props in, JSX out</h2>
      <div className="demo-row" style={{ gap: 12 }}>
        <Avatar name="Attila" color="#4a8cf4" />
        <Avatar name="Juan" color="#9b7cf7" size={56} />
        <Avatar name="Maria" color="#3ddc84" size={32} />
      </div>
      <p style={{ fontSize: 12, color: '#8895b8', marginTop: 12 }}>
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
    <div style={{
      border: '1px solid #1e3058', borderRadius: 12,
      background: '#111d38', padding: 14, marginBottom: 10
    }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.08em',
        textTransform: 'uppercase', color: '#7aa9f7', marginBottom: 8 }}>{title}</div>
      {children}
    </div>
  );
}

function App() {
  return (
    <div className="demo-card">
      <span className="demo-tag">children</span>
      <h2 style={{ margin: '10px 0 12px', fontSize: 18 }}>Composition</h2>
      <Panel title="Notice">
        <p style={{ fontSize: 13, color: '#8895b8' }}>I am arbitrary JSX passed as children.</p>
      </Panel>
      <Panel title="Alert">
        <p style={{ fontSize: 13, color: '#f0d060' }}>Children can be anything — text, elements, components.</p>
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
    <div className="demo-card">
      <span className="demo-tag">.map() + keys</span>
      <h2 style={{ margin: '10px 0 12px', fontSize: 18 }}>Lists & Keys</h2>
      {players.map(p => (
        <div key={p.id} className="demo-row" style={{ justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontSize: 13 }}>
            {p.name} <span style={{ color: '#5a6a90', fontSize: 11 }}>{p.team}</span>
          </span>
          <button className="demo-btn small ghost" onClick={() => add(p)}>
            {draft.includes(p.id) ? '✓ drafted' : '+ draft'}
          </button>
        </div>
      ))}
      <p style={{ fontSize: 12, color: '#8895b8', marginTop: 10 }}>
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
    <div className="demo-card">
      <span className="demo-tag">useState</span>
      <h2 style={{ margin: '10px 0 6px', fontSize: 18 }}>Counter</h2>
      <p style={{ color: '#8895b8', fontSize: 13, marginBottom: 14 }}>
        setCount schedules a re-render with the new value.
      </p>
      <div className="demo-row" style={{ marginBottom: 10 }}>
        <button className="demo-btn" onClick={() => setCount(c => c + step)}>+{step}</button>
        <button className="demo-btn ghost" onClick={() => setCount(0)}>Reset</button>
        <b style={{ fontSize: 20, marginLeft: 8 }}>{count}</b>
      </div>
      <label style={{ fontSize: 12, color: '#8895b8' }}>
        Step: <input type="range" min="1" max="10" value={step}
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
    <div className="demo-card">
      <span className="demo-tag">events</span>
      <h2 style={{ margin: '10px 0 12px', fontSize: 18 }}>Events are just props</h2>
      <div className="demo-row" style={{ marginBottom: 10, flexWrap: 'wrap' }}>
        <button className="demo-btn" onClick={() => setClicks(c => c + 1)}>
          Clicked {clicks}×
        </button>
        <button className="demo-btn ghost"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}>
          {hover ? '🖱️ hovered' : 'hover me'}
        </button>
      </div>
      <div
        onMouseMove={e => setPos(e.clientX + ', ' + e.clientY)}
        style={{ border: '1px dashed #1e3058', borderRadius: 8, padding: 12,
          fontSize: 12, color: '#8895b8', fontFamily: 'JetBrains Mono' }}>
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
    <div className="demo-card">
      <span className="demo-tag">controlled form</span>
      <h2 style={{ margin: '10px 0 12px', fontSize: 18 }}>Sign Up</h2>
      {sent ? (
        <div style={{ textAlign: 'center', padding: '18px 0' }}>
          <div style={{ fontSize: 30 }}>🎉</div>
          <p style={{ margin: '8px 0', fontSize: 14 }}>Welcome, {form.name}!</p>
          <button className="demo-btn ghost" onClick={() => { setSent(false); setForm({ name: '', email: '' }); }}>Reset</button>
        </div>
      ) : (
        <form onSubmit={submit} style={{ display: 'grid', gap: 10 }}>
          <input className="demo-input" name="name" placeholder="Name" value={form.name} onChange={set} />
          <input className="demo-input" name="email" type="email" placeholder="Email" value={form.email} onChange={set} />
          {err && <p style={{ color: '#e4686a', fontSize: 11.5 }}>{err}</p>}
          <button className="demo-btn" type="submit">Submit</button>
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
    <label style={{ display: 'grid', gap: 6, fontSize: 12.5, color: '#8895b8' }}>
      {label}
      <input className="demo-input" type="number" value={value}
        onChange={e => onChange(+e.target.value)} />
    </label>
  );
}

function App() {
  const [celsius, setCelsius] = React.useState(25);
  const fahrenheit = Math.round(celsius * 9 / 5 + 32);

  return (
    <div className="demo-card">
      <span className="demo-tag">lifting state</span>
      <h2 style={{ margin: '10px 0 12px', fontSize: 18 }}>One state, two fields</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <Temperature label="°C" value={celsius} onChange={setCelsius} />
        <Temperature label="°F" value={fahrenheit}
          onChange={f => setCelsius(Math.round((f - 32) * 5 / 9))} />
      </div>
      <p style={{ fontSize: 12, color: '#8895b8', marginTop: 12 }}>
        State lives in App — both inputs edit the same source of truth.
      </p>
    </div>
  );
}`,
      },
    ],
  },
];
