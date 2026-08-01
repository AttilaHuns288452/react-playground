/* React Playground — component library (part 1) — Tailwind edition */
const COMPONENTS = [
  {
    id: 'btn', icon: '🔘', name: 'Button',
    desc: 'Variants, sizes, loading state, icons.',
    code: `function Button({ children, variant, size, loading, onClick }) {
  const variants = {
    primary: 'bg-gradient-to-br from-blue-500 to-purple-500 text-white hover:brightness-110',
    ghost: 'border border-slate-600 bg-transparent text-slate-200 hover:border-blue-500',
    danger: 'border border-rose-500 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20',
  };
  const sizes = {
    small: 'px-2.5 py-1 text-[11px]',
    medium: 'px-4.5 py-2 text-[13px]',
  };
  return (
    <button
      className={'rounded-lg font-semibold transition ' + (variants[variant] || variants.primary) + ' ' + (sizes[size] || sizes.medium)}
      onClick={onClick} disabled={loading}>
      {loading ? '…' : children}
    </button>
  );
}

function App() {
  return (
    <div className="max-w-md w-full rounded-2xl border border-slate-700/60 bg-slate-900 p-6 shadow-xl">
      <span className="inline-block rounded-full bg-blue-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-blue-400">Button</span>
      <h2 className="mt-2.5 mb-3.5 text-lg font-bold text-slate-100">Button variants</h2>
      <div className="grid gap-2.5">
        <div className="flex items-center gap-2">
          <Button variant="primary" size="medium">Primary</Button>
          <Button variant="ghost" size="medium">Ghost</Button>
          <Button variant="danger" size="medium">Delete</Button>
        </div>
        <div className="flex items-center gap-2">
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
    <div className="max-w-sm w-full overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900 shadow-xl">
      {title && (
        <div className="border-b border-slate-700/60 px-4.5 py-3.5 text-sm font-bold text-slate-100">{title}</div>
      )}
      <div className="px-4.5 py-4 text-[13px] leading-relaxed text-slate-400">{children}</div>
      {footer && (
        <div className="flex justify-end gap-2 border-t border-slate-700/60 px-4.5 py-3">{footer}</div>
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
          <button className="rounded-lg border border-slate-600 px-3 py-1.5 text-[11px] font-semibold text-slate-200 transition hover:border-blue-500">Cancel</button>
          <button className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 px-3 py-1.5 text-[11px] font-semibold text-white transition hover:brightness-110">Save</button>
        </React.Fragment>
      }>
      You are <b className="text-emerald-400">₱4,250</b> away from your
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
    green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    red: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    gold: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
  };
  const dots = {
    green: 'bg-emerald-400', red: 'bg-rose-400', gold: 'bg-amber-400',
    blue: 'bg-blue-400', purple: 'bg-purple-400',
  };
  const t = tones[tone] || tones.blue;
  return (
    <span className={'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold ' + t}>
      <span className={'h-1.5 w-1.5 rounded-full ' + (dots[tone] || dots.blue)} />
      {children}
    </span>
  );
}

function App() {
  return (
    <div className="max-w-md w-full rounded-2xl border border-slate-700/60 bg-slate-900 p-6 shadow-xl">
      <span className="inline-block rounded-full bg-blue-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-blue-400">Badge</span>
      <h2 className="mt-2.5 mb-3.5 text-lg font-bold text-slate-100">Status tones</h2>
      <div className="flex flex-wrap items-center gap-2">
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
        border: '2px solid #0f172a'
      }}>
        {src ? <img src={src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : name[0]}
      </div>
      {online && (
        <span style={{
          position: 'absolute', bottom: 0, right: 0, width: size * 0.28, height: size * 0.28,
          borderRadius: '50%', background: '#34d399', border: '2px solid #0f172a'
        }} />
      )}
    </div>
  );
}

function App() {
  return (
    <div className="max-w-md w-full rounded-2xl border border-slate-700/60 bg-slate-900 p-6 shadow-xl">
      <span className="inline-block rounded-full bg-blue-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-blue-400">Avatar</span>
      <h2 className="mt-2.5 mb-3.5 text-lg font-bold text-slate-100">Team row</h2>
      <div className="flex items-center gap-2.5">
        <Avatar name="A" color="#4a8cf4" online />
        <Avatar name="J" color="#9b7cf7" online size={52} />
        <Avatar name="M" color="#34d399" />
        <Avatar name="K" color="#e4686a" size={34} />
      </div>
      <p className="mt-3 text-xs text-slate-500">
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
    info: { c: 'text-blue-400', bg: 'border-blue-500/40 bg-blue-500/10' },
    success: { c: 'text-emerald-400', bg: 'border-emerald-500/40 bg-emerald-500/10' },
    warn: { c: 'text-amber-400', bg: 'border-amber-500/40 bg-amber-500/10' },
    error: { c: 'text-rose-400', bg: 'border-rose-500/40 bg-rose-500/10' },
  };
  const t = tones[tone] || tones.info;
  const icon = tone === 'error' ? '⛔' : tone === 'warn' ? '⚠️' : tone === 'success' ? '✅' : '💡';
  return (
    <div className={'mb-2 flex items-start gap-2.5 rounded-xl border p-3.5 ' + t.bg}>
      <span className={t.c}>{icon}</span>
      <div className="flex-1">
        <div className={'text-[12.5px] font-bold ' + t.c}>{title}</div>
        <div className="mt-0.5 text-xs leading-relaxed text-slate-400">{children}</div>
      </div>
      {onClose && (
        <button onClick={onClose} className="cursor-pointer border-none bg-transparent text-[13px] text-slate-500">✕</button>
      )}
    </div>
  );
}

function App() {
  const [show, setShow] = React.useState(true);
  return (
    <div className="max-w-md w-full rounded-2xl border border-slate-700/60 bg-slate-900 p-6 shadow-xl">
      <span className="inline-block rounded-full bg-blue-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-blue-400">Alert</span>
      <h2 className="mt-2.5 mb-3.5 text-lg font-bold text-slate-100">Tones</h2>
      <Alert tone="info" title="Heads up">Deploy finished at 14:32 UTC.</Alert>
      <Alert tone="success" title="Payment received">₱12,500 credited to savings.</Alert>
      <Alert tone="warn" title="Low balance">Below ₱1,000 — 3 days left.</Alert>
      {show
        ? <Alert tone="error" title="Sync failed" onClose={() => setShow(false)}>Retrying in 30s… (dismissible)</Alert>
        : <button className="rounded-lg border border-slate-600 px-3 py-1.5 text-[11px] font-semibold text-slate-200 transition hover:border-blue-500"
            onClick={() => setShow(true)}>show again</button>}
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

  return (
    <div className="max-w-md w-full rounded-2xl border border-slate-700/60 bg-slate-900 p-6 shadow-xl">
      <span className="inline-block rounded-full bg-blue-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-blue-400">Table + sort</span>
      <h2 className="mt-2.5 mb-3.5 text-lg font-bold text-slate-100">Portfolio</h2>
      <table className="w-full border-collapse text-[12.5px]">
        <thead>
          <tr className="text-left text-[10.5px] uppercase tracking-[.06em] text-slate-500">
            <th className="px-2 py-1.5">
              <button className="rounded-md border border-slate-700 px-2 py-0.5 text-[10px] font-semibold text-slate-300 transition hover:border-blue-500"
                onClick={() => setSort('ticker')}>Ticker</button>
            </th>
            <th className="px-2 py-1.5">
              <button className="rounded-md border border-slate-700 px-2 py-0.5 text-[10px] font-semibold text-slate-300 transition hover:border-blue-500"
                onClick={() => setSort('price')}>Price</button>
            </th>
            <th className="px-2 py-1.5">24h</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map(r => (
            <tr key={r.id} className="border-t border-slate-700/60">
              <td className="px-2 py-2 font-bold text-slate-200">{r.ticker}</td>
              <td className="px-2 py-2 font-mono text-slate-300">{r.price.toFixed(2)}</td>
              <td className={'px-2 py-2 ' + (r.up ? 'text-emerald-400' : 'text-rose-400')}>{r.chg}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-2.5 text-[11px] text-slate-500">
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
    <div className="w-full max-w-md">
      <nav className="flex items-center gap-3 rounded-xl border border-slate-700/60 bg-slate-900 p-2.5">
        <b className="px-1.5 text-sm text-slate-100">₱ CashFlow</b>
        <div className="ml-2 flex flex-wrap gap-1">
          {links.map(l => (
            <button key={l} onClick={() => setActive(l)}
              className={
                'cursor-pointer rounded-lg border-none px-2.5 py-1.5 text-xs font-semibold transition ' +
                (active === l ? 'bg-blue-500/20 text-blue-400' : 'bg-transparent text-slate-400 hover:text-slate-200')
              }>{l}</button>
          ))}
        </div>
        <span className="ml-auto flex items-center gap-2">
          <button className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 px-3 py-1.5 text-[11px] font-semibold text-white transition hover:brightness-110">+ Add</button>
          <button className="cursor-pointer rounded-lg border border-slate-600 px-2.5 py-1.5 text-[11px] text-slate-200 transition hover:border-blue-500"
            onClick={() => setOpen(o => !o)}>☰</button>
        </span>
      </nav>
      {open && (
        <div className="mt-1.5 grid gap-0.5 rounded-xl border border-slate-700/60 bg-slate-900 p-2">
          {links.map(l => (
            <button key={l} onClick={() => { setActive(l); setOpen(false); }}
              className="cursor-pointer rounded-lg border-none px-3 py-2 text-left text-[12.5px] text-slate-400 transition hover:bg-slate-800 hover:text-slate-200">{l}</button>
          ))}
        </div>
      )}
      <p className="mt-2.5 text-xs text-slate-500">
        Active: <b className="text-blue-400">{active}</b> · mobile menu toggles below
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
    <div onClick={onClose}
      className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-5">
      <div onClick={e => e.stopPropagation()}
        className="w-full max-w-sm rounded-2xl border border-slate-700/60 bg-slate-900 p-5 shadow-2xl">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-[15px] font-bold text-slate-100">{title}</h3>
          <button onClick={onClose} className="cursor-pointer border-none bg-transparent text-[15px] text-slate-500">✕</button>
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
    <div className="max-w-md w-full rounded-2xl border border-slate-700/60 bg-slate-900 p-6 shadow-xl">
      <span className="inline-block rounded-full bg-blue-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-blue-400">Modal</span>
      <h2 className="mt-2.5 mb-3 text-lg font-bold text-slate-100">Confirm dialog</h2>
      <p className="mb-3 text-[13px] text-slate-400">
        Escape closes it, backdrop click closes it, stopPropagation keeps the box open.
      </p>
      <button className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 px-4 py-2 text-[13px] font-semibold text-white transition hover:brightness-110"
        onClick={() => setOpen(true)}>Open modal</button>
      <Modal open={open} title="Delete budget?" onClose={() => setOpen(false)}>
        <p className="mb-4 text-[13px] text-slate-400">
          This removes the "Eating out" budget and its history. This cannot be undone.
        </p>
        <div className="flex items-center justify-end gap-2">
          <button className="rounded-lg border border-slate-600 px-3 py-1.5 text-[11px] font-semibold text-slate-200 transition hover:border-blue-500"
            onClick={() => setOpen(false)}>Cancel</button>
          <button className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 px-3 py-1.5 text-[11px] font-semibold text-white transition hover:brightness-110"
            onClick={() => { setOpen(false); alert('deleted (demo)'); }}>Delete</button>
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
    <div className={'animate-pulse bg-slate-700/50 ' + (circle ? 'rounded-full' : 'rounded-lg')}
      style={{ width: w, height: h }} />
  );
}

function App() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const id = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="max-w-md w-full rounded-2xl border border-slate-700/60 bg-slate-900 p-6 shadow-xl">
      <span className="inline-block rounded-full bg-blue-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-blue-400">Skeleton</span>
      <h2 className="mt-2.5 mb-3.5 text-lg font-bold text-slate-100">Loading states</h2>
      {loading ? (
        <div className="grid gap-2.5">
          <div className="flex items-center gap-2.5">
            <Skeleton w={40} h={40} circle />
            <div className="grid flex-1 gap-1.5">
              <Skeleton w="60%" h={12} />
              <Skeleton w="35%" h={10} />
            </div>
          </div>
          <Skeleton w="100%" h={70} />
          <Skeleton w="100%" h={70} />
        </div>
      ) : (
        <div>
          <p className="mb-2 text-[13.5px] text-slate-200">📊 Your summary is ready</p>
          <p className="text-[12.5px] text-slate-400">Spending down 8% this month. Nice.</p>
        </div>
      )}
    </div>
  );
}`,
  },
];
