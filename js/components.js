/* React Playground — component library data */
const COMPONENTS = [
  {
    id: 'btn', icon: '🔘', name: 'Button',
    desc: 'Variants, sizes, loading state, icons.',
    code: `function Button({ children, variant, size, loading, onClick }) {
  const styles = {
    base: {
      border: 'none', borderRadius: 9, cursor: 'pointer', font: '600 13px Inter',
      transition: '.15s', display: 'inline-flex', alignItems: 'center', gap: 6
    },
    primary: { background: 'linear-gradient(135deg,#4a8cf4,#9b7cf7)', color: '#fff' },
    ghost: { background: 'none', border: '1px solid #1e3058', color: '#e4eaf5' },
    danger: { background: 'rgba(228,104,106,.15)', border: '1px solid #e4686a', color: '#e4686a' },
    small: { padding: '5px 12px', fontSize: 11.5 },
    medium: { padding: '9px 18px' },
  };
  return (
    <button className="demo-btn"
      style={{ ...styles.base, ...styles[variant], ...styles[size] }}
      onClick={onClick} disabled={loading}>
      {loading ? '…' : children}
    </button>
  );
}

function App() {
  return (
    <div className="demo-card">
      <span className="demo-tag">Button</span>
      <h2 style={{ margin: '10px 0 14px', fontSize: 18 }}>Button variants</h2>
      <div style={{ display: 'grid', gap: 10 }}>
        <div className="demo-row">
          <Button variant="primary" size="medium">Primary</Button>
          <Button variant="ghost" size="medium">Ghost</Button>
          <Button variant="danger" size="medium">Delete</Button>
        </div>
        <div className="demo-row">
          <Button variant="primary" size="small">Small</Button>
          <Button variant="primary" size="small" loading>Loading</Button>
          <Button variant="ghost" size="small" onClick={() => alert('hi!')}>Alert</Button>
        </div>
      </div>
    </div>
  );
}`,
  },
  {
    id: 'card', icon: '🃏', name: 'Card',
    desc: 'Composable card with header, body, footer slots.',
    code: `function Card({ title, footer, children }) {
  return (
    <div style={{
      background: '#0c1428', border: '1px solid #1e3058', borderRadius: 14,
      overflow: 'hidden', maxWidth: 360, width: '100%',
      boxShadow: '0 10px 30px rgba(0,0,0,.3)'
    }}>
      {title && (
        <div style={{ padding: '14px 18px', borderBottom: '1px solid #1e3058', fontWeight: 700, fontSize: 14 }}>
          {title}
        </div>
      )}
      <div style={{ padding: '18px', fontSize: 13, color: '#8895b8', lineHeight: 1.7 }}>
        {children}
      </div>
      {footer && (
        <div style={{ padding: '12px 18px', borderTop: '1px solid #1e3058', display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          {footer}
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <Card
      title="💰 Savings Goal"
      footer={
        <React.Fragment>
          <button className="demo-btn small ghost">Cancel</button>
          <button className="demo-btn small">Save</button>
        </React.Fragment>
      }>
      You are <b style={{ color: '#3ddc84' }}>₱4,250</b> away from your
      ₱50,000 emergency fund. Keep it up!
    </Card>
  );
}`,
  },
  {
    id: 'badge', icon: '🏷️', name: 'Badge',
    desc: 'Status pills with color tones and dot.',
    code: `function Badge({ children, tone }) {
  const tones = {
    green: { bg: 'rgba(61,220,132,.12)', c: '#3ddc84' },
    red: { bg: 'rgba(228,104,106,.12)', c: '#e4686a' },
    gold: { bg: 'rgba(240,208,96,.12)', c: '#f0d060' },
    blue: { bg: 'rgba(74,140,244,.12)', c: '#7aa9f7' },
    purple: { bg: 'rgba(155,124,247,.12)', c: '#9b7cf7' },
  };
  const t = tones[tone] || tones.blue;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      background: t.bg, color: t.c, fontSize: 11, fontWeight: 600,
      padding: '4px 10px', borderRadius: 999, border: '1px solid ' + t.c + '33'
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: t.c }} />
      {children}
    </span>
  );
}

function App() {
  return (
    <div className="demo-card">
      <span className="demo-tag">Badge</span>
      <h2 style={{ margin: '10px 0 14px', fontSize: 18 }}>Status tones</h2>
      <div className="demo-row" style={{ flexWrap: 'wrap', gap: 8 }}>
        <Badge tone="green">Active</Badge>
        <Badge tone="red">Overdue</Badge>
        <Badge tone="gold">Pending</Badge>
        <Badge tone="blue">New</Badge>
        <Badge tone="purple">Pro</Badge>
      </div>
    </div>
  );
}`,
  },
  {
    id: 'avatar', icon: '🧑', name: 'Avatar',
    desc: 'Initials, image, online dot, group stack.',
    code: `function Avatar({ name, color, size = 44, online, src }) {
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <div style={{
        width: size, height: size, borderRadius: '50%',
        background: src ? 'transparent' : color,
        display: 'grid', placeItems: 'center', overflow: 'hidden',
        fontSize: size * 0.42, fontWeight: 800, color: '#fff',
        border: '2px solid #0c1428'
      }}>
        {src ? <img src={src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : name[0]}
      </div>
      {online && (
        <span style={{
          position: 'absolute', bottom: 0, right: 0, width: size * 0.28, height: size * 0.28,
          borderRadius: '50%', background: '#3ddc84', border: '2px solid #0c1428'
        }} />
      )}
    </div>
  );
}

function App() {
  return (
    <div className="demo-card">
      <span className="demo-tag">Avatar</span>
      <h2 style={{ margin: '10px 0 14px', fontSize: 18 }}>Team row</h2>
      <div className="demo-row" style={{ gap: 10 }}>
        <Avatar name="A" color="#4a8cf4" online />
        <Avatar name="J" color="#9b7cf7" online size={52} />
        <Avatar name="M" color="#3ddc84" />
        <Avatar name="K" color="#e4686a" size={34} />
      </div>
      <p style={{ fontSize: 12, color: '#8895b8', marginTop: 12 }}>
        online dot + size prop — the dot scales with the avatar.
      </p>
    </div>
  );
}`,
  },
  {
    id: 'alert', icon: '⚠️', name: 'Alert / Toast',
    desc: 'Dismissible alert with tone and icon.',
    code: `function Alert({ tone, title, children, onClose }) {
  const tones = {
    info: { c: '#7aa9f7', bg: 'rgba(74,140,244,.08)' },
    success: { c: '#3ddc84', bg: 'rgba(61,220,132,.08)' },
    warn: { c: '#f0d060', bg: 'rgba(240,208,96,.08)' },
    error: { c: '#e4686a', bg: 'rgba(228,104,106,.08)' },
  };
  const t = tones[tone] || tones.info;
  return (
    <div style={{
      display: 'flex', gap: 10, alignItems: 'flex-start',
      border: '1px solid ' + t.c + '55', borderRadius: 10,
      background: t.bg, padding: '12px 14px', marginBottom: 8
    }}>
      <span style={{ color: t.c }}>{tone === 'error' ? '⛔' : tone === 'warn' ? '⚠️' : tone === 'success' ? '✅' : '💡'}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: t.c }}>{title}</div>
        <div style={{ fontSize: 12, color: '#8895b8', marginTop: 2, lineHeight: 1.5 }}>{children}</div>
      </div>
      {onClose && <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#5a6a90', cursor: 'pointer', fontSize: 13 }}>✕</button>}
    </div>
  );
}

function App() {
  const [show, setShow] = React.useState(true);
  return (
    <div className="demo-card">
      <span className="demo-tag">Alert</span>
      <h2 style={{ margin: '10px 0 14px', fontSize: 18 }}>Tones</h2>
      <Alert tone="info" title="Heads up">Deploy finished at 14:32 UTC.</Alert>
      <Alert tone="success" title="Payment received">₱12,500 credited to savings.</Alert>
      <Alert tone="warn" title="Low balance">Below ₱1,000 — 3 days left.</Alert>
      {show
        ? <Alert tone="error" title="Sync failed" onClose={() => setShow(false)}>Retrying in 30s… (dismissible)</Alert>
        : <button className="demo-btn small ghost" onClick={() => setShow(true)}>show again</button>}
    </div>
  );
}`,
  },
  {
    id: 'table', icon: '📊', name: 'Table',
    desc: 'Data table with sortable columns.',
    code: `const rows = [
  { id: 1, ticker: 'AAPL', price: 245.30, chg: '+1.2%', up: true },
  { id: 2, ticker: 'NVDA', price: 172.88, chg: '-0.4%', up: false },
  { id: 3, ticker: 'TSLA', price: 318.05, chg: '+2.7%', up: true },
  { id: 4, ticker: 'MSFT', price: 452.10, chg: '+0.6%', up: true },
];

function App() {
  const [sort, setSort] = React.useState('ticker');
  const sorted = [...rows].sort((a, b) => String(a[sort]).localeCompare(String(b[sort])));
  const up = a => a.chg.startsWith('+');

  return (
    <div className="demo-card" style={{ maxWidth: 440 }}>
      <span className="demo-tag">Table + sort</span>
      <h2 style={{ margin: '10px 0 14px', fontSize: 18 }}>Portfolio</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5 }}>
        <thead>
          <tr style={{ color: '#5a6a90', textAlign: 'left', fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '.06em' }}>
            <th style={{ padding: '6px 8px' }}>
              <button className="demo-btn small ghost" onClick={() => setSort('ticker')}>Ticker</button>
            </th>
            <th style={{ padding: '6px 8px' }}>
              <button className="demo-btn small ghost" onClick={() => setSort('price')}>Price</button>
            </th>
            <th style={{ padding: '6px 8px' }}>24h</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map(r => (
            <tr key={r.id} style={{ borderTop: '1px solid #1e3058' }}>
              <td style={{ padding: '8px', fontWeight: 700 }}>{r.ticker}</td>
              <td style={{ padding: '8px', fontFamily: 'JetBrains Mono' }}>{r.price.toFixed(2)}</td>
              <td style={{ padding: '8px', color: r.up ? '#3ddc84' : '#e4686a' }}>{r.chg}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ fontSize: 11, color: '#5a6a90', marginTop: 10 }}>
        click Ticker / Price to sort — keys keep rows stable
      </p>
    </div>
  );
}`,
  },
  {
    id: 'navbar', icon: '🧭', name: 'Navbar',
    desc: 'Responsive nav with mobile menu.',
    code: `const links = ['Dashboard', 'Budget', 'Invest', 'Reports'];

function App() {
  const [active, setActive] = React.useState('Budget');
  const [open, setOpen] = React.useState(false);

  return (
    <div style={{ width: '100%', maxWidth: 440 }}>
      <nav style={{
        display: 'flex', alignItems: 'center', gap: 12,
        background: '#0c1428', border: '1px solid #1e3058',
        borderRadius: 12, padding: '10px 14px'
      }}>
        <b style={{ fontSize: 14 }}>₱ CashFlow</b>
        <div style={{ display: 'flex', gap: 4, marginLeft: 10, flexWrap: 'wrap' }}>
          {links.map(l => (
            <button key={l} onClick={() => setActive(l)}
              style={{
                background: active === l ? 'rgba(74,140,244,.18)' : 'none',
                border: 'none', color: active === l ? '#7aa9f7' : '#8895b8',
                fontSize: 12, fontWeight: 600, padding: '6px 10px', borderRadius: 8, cursor: 'pointer'
              }}>{l}</button>
          ))}
        </div>
        <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <button className="demo-btn small">+ Add</button>
          <button className="demo-btn small ghost" onClick={() => setOpen(o => !o)}>☰</button>
        </span>
      </nav>
      {open && (
        <div style={{
          background: '#0c1428', border: '1px solid #1e3058', borderRadius: 12,
          marginTop: 6, padding: 8, display: 'grid', gap: 2
        }}>
          {links.map(l => (
            <button key={l} onClick={() => { setActive(l); setOpen(false); }}
              style={{ textAlign: 'left', background: 'none', border: 'none', color: '#8895b8',
                fontSize: 12.5, padding: '8px 12px', borderRadius: 8, cursor: 'pointer' }}>{l}</button>
          ))}
        </div>
      )}
      <p style={{ fontSize: 12, color: '#8895b8', marginTop: 10 }}>
        Active: <b style={{ color: '#7aa9f7' }}>{active}</b> · mobile menu toggles below
      </p>
    </div>
  );
}`,
  },
  {
    id: 'modal', icon: '🪟', name: 'Modal / Dialog',
    desc: 'Overlay dialog with backdrop click + Escape.',
    code: `function Modal({ open, title, onClose, children }) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,.6)',
      display: 'grid', placeItems: 'center', zIndex: 50, padding: 20
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: '#0c1428', border: '1px solid #1e3058', borderRadius: 16,
        maxWidth: 380, width: '100%', padding: 20,
        boxShadow: '0 24px 60px rgba(0,0,0,.5)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h3 style={{ fontSize: 15 }}>{title}</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#5a6a90', cursor: 'pointer', fontSize: 15 }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function App() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const esc = e => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, []);

  return (
    <div className="demo-card">
      <span className="demo-tag">Modal</span>
      <h2 style={{ margin: '10px 0 12px', fontSize: 18 }}>Confirm dialog</h2>
      <p style={{ fontSize: 13, color: '#8895b8', marginBottom: 12 }}>
        Escape closes it, backdrop click closes it, stopPropagation keeps the box open.
      </p>
      <button className="demo-btn" onClick={() => setOpen(true)}>Open modal</button>
      <Modal open={open} title="Delete budget?" onClose={() => setOpen(false)}>
        <p style={{ fontSize: 13, color: '#8895b8', marginBottom: 16 }}>
          This removes the "Eating out" budget and its history. This cannot be undone.
        </p>
        <div className="demo-row" style={{ justifyContent: 'flex-end' }}>
          <button className="demo-btn small ghost" onClick={() => setOpen(false)}>Cancel</button>
          <button className="demo-btn small" onClick={() => { setOpen(false); alert('deleted (demo)'); }}>Delete</button>
        </div>
      </Modal>
    </div>
  );
}`,
  },
  {
    id: 'skeleton', icon: '🦴', name: 'Skeleton',
    desc: 'Loading placeholders that mimic layout.',
    code: `function Skeleton({ w, h, circle }) {
  return (
    <div style={{
      width: w, height: h, borderRadius: circle ? '50%' : 8,
      background: 'linear-gradient(90deg,#111d38 25%,#1a2a50 50%,#111d38 75%)',
      backgroundSize: '200% 100%',
      animation: 'shimmer 1.4s infinite'
    }} />
  );
}

function App() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const id = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(id);
  }, []);

  const style = { keyframes: '@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}' };

  return (
    <div className="demo-card" style={{ maxWidth: 380 }}>
      <span className="demo-tag">Skeleton</span>
      <h2 style={{ margin: '10px 0 14px', fontSize: 18 }}>Loading states</h2>
      {loading ? (
        <div style={{ display: 'grid', gap: 10 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <Skeleton w={40} h={40} circle />
            <div style={{ flex: 1, display: 'grid', gap: 6 }}>
              <Skeleton w="60%" h={12} />
              <Skeleton w="35%" h={10} />
            </div>
          </div>
          <Skeleton w="100%" h={70} />
          <Skeleton w="100%" h={70} />
        </div>
      ) : (
        <div>
          <p style={{ fontSize: 13.5, marginBottom: 8 }}>📊 Your summary is ready</p>
          <p style={{ fontSize: 12.5, color: '#8895b8' }}>Spending down 8% this month. Nice.</p>
        </div>
      )}
      <style>{style.keyframes}</style>
    </div>
  );
}`,
  },
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
    <div className="demo-card">
      <span className="demo-tag">Tabs</span>
      <h2 style={{ margin: '10px 0 12px', fontSize: 18 }}>CashFlow tabs</h2>
      <div className="demo-row" style={{ marginBottom: 14, gap: 6 }}>
        {Object.keys(TABS).map(k => (
          <button key={k} className="demo-btn"
            style={{ opacity: tab === k ? 1 : .4, padding: '7px 14px' }}
            onClick={() => setTab(k)}>{k}</button>
        ))}
      </div>
      <p style={{
        fontSize: 13.5, color: '#8895b8', background: '#111d38',
        borderRadius: 8, padding: 12, lineHeight: 1.6
      }}>{TABS[tab]}</p>
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
    <div className="demo-card">
      <span className="demo-tag">useState</span>
      <h2 style={{ margin: '10px 0 12px', fontSize: 18 }}>Todo List</h2>
      <div className="demo-row" style={{ marginBottom: 12 }}>
        <input className="demo-input" placeholder="Add a todo…"
          value={text} onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && add()} />
        <button className="demo-btn" onClick={add}>Add</button>
      </div>
      <ul style={{ listStyle: 'none', display: 'grid', gap: 6 }}>
        {todos.map(t => (
          <li key={t.id} className="demo-row" style={{
            justifyContent: 'space-between', background: '#111d38',
            borderRadius: 8, padding: '7px 10px'
          }}>
            <span style={{ textDecoration: t.done ? 'line-through' : 'none', opacity: t.done ? .5 : 1, fontSize: 13 }}>
              {t.text}
            </span>
            <span className="demo-row">
              <button className="demo-btn small ghost" onClick={() => setTodos(x => x.map(i => i.id === t.id ? { ...i, done: !i.done } : i))}>
                {t.done ? '↩' : '✓'}
              </button>
              <button className="demo-btn small ghost" onClick={() => setTodos(x => x.filter(i => i.id !== t.id))}>✕</button>
            </span>
          </li>
        ))}
      </ul>
      <p style={{ fontSize: 11, color: '#5a6a90', marginTop: 10 }}>{todos.length} items · Enter adds</p>
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
    id: 'accordion', icon: '🪗', name: 'Accordion',
    desc: 'Expand/collapse items, one open at a time.',
    code: `function Item({ title, children, open, onToggle }) {
  return (
    <div style={{ border: '1px solid #1e3058', borderRadius: 10, marginBottom: 8, overflow: 'hidden' }}>
      <button className="demo-btn ghost" style={{ width: '100%', justifyContent: 'space-between', borderRadius: 0, display: 'flex' }}
        onClick={onToggle}>
        <span>{title}</span><span>{open ? '−' : '+'}</span>
      </button>
      {open && <div style={{ padding: '10px 14px', fontSize: 12.5, color: '#8895b8', background: '#111d38' }}>{children}</div>}
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
    <div className="demo-card">
      <span className="demo-tag">props + state</span>
      <h2 style={{ margin: '10px 0 12px', fontSize: 18 }}>Accordion</h2>
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
    <div className="demo-card" style={{ textAlign: 'center' }}>
      <span className="demo-tag">useEffect</span>
      <h2 style={{ margin: '10px 0 4px', fontSize: 18 }}>Stopwatch</h2>
      <div style={{ fontFamily: 'JetBrains Mono', fontSize: 38, fontWeight: 700, margin: '10px 0 16px', letterSpacing: 2 }}>
        {fmt(ms)}
      </div>
      <div className="demo-row" style={{ justifyContent: 'center' }}>
        <button className="demo-btn" onClick={() => setRunning(r => !r)}>{running ? '⏸ Pause' : '▶ Start'}</button>
        <button className="demo-btn ghost" onClick={() => { setRunning(false); setMs(0); }}>Reset</button>
      </div>
      <p style={{ fontSize: 11, color: '#5a6a90', marginTop: 12 }}>interval cleaned up when stopped</p>
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
    <label style={{ fontSize: 12, color: '#8895b8', display: 'grid', gap: 4, marginBottom: 10 }}>
      {label} <b style={{ color: '#e4eaf5' }}>{value}</b>
      <input type="range" min="0" max={max} value={value} onChange={e => set(+e.target.value)} />
    </label>
  );

  return (
    <div className="demo-card">
      <span className="demo-tag">derived state</span>
      <h2 style={{ margin: '10px 0 12px', fontSize: 18 }}>Color Picker</h2>
      <div style={{ height: 90, borderRadius: 10, background: color, marginBottom: 14, border: '1px solid #1e3058' }} />
      <Slider label="Hue" value={hue} set={setHue} max={360} />
      <Slider label="Saturation" value={sat} set={setSat} max={100} />
      <Slider label="Lightness" value={light} set={setLight} max={100} />
      <code style={{ fontSize: 12, fontFamily: 'JetBrains Mono', color: color }}>{color}</code>
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
    <div className="demo-card" style={{ textAlign: 'center' }}>
      <span className="demo-tag">live tick</span>
      <h2 style={{ margin: '10px 0 4px', fontSize: 18 }}>{day}</h2>
      <div style={{ fontFamily: 'JetBrains Mono', fontSize: 42, fontWeight: 700, letterSpacing: 3, margin: '8px 0' }}>
        {fmt(now.getHours())}:{fmt(now.getMinutes())}:{fmt(now.getSeconds())}
      </div>
      <p style={{ fontSize: 11, color: '#5a6a90' }}>updates every second · interval cleaned on unmount</p>
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
    <div className="demo-card" style={{ textAlign: 'center' }}>
      <div style={{ width: 64, height: 64, borderRadius: '50%', margin: '0 auto 10px',
        background: 'linear-gradient(135deg, #4a8cf4, #9b7cf7)', display: 'grid', placeItems: 'center',
        fontSize: 26, color: '#fff', fontWeight: 800 }}>A</div>
      <h2 style={{ fontSize: 17 }}>Attila</h2>
      <p style={{ fontSize: 12.5, color: '#8895b8', margin: '4px 0 14px' }}>Filipino · PHP pesos · React fan</p>
      <div className="demo-row" style={{ justifyContent: 'center', marginBottom: 14 }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: '#111d38', borderRadius: 10, padding: '8px 14px', minWidth: 70 }}>
            <div style={{ fontWeight: 800, fontSize: 15 }}>{s.value}</div>
            <div style={{ fontSize: 10, color: '#8895b8' }}>{s.label}</div>
          </div>
        ))}
      </div>
      <button className="demo-btn">Follow</button>
    </div>
  );
}`,
  },
];
