/* React Playground — component library (part 3: most-used) — Tailwind edition */
COMPONENTS.push(
  {
    id: 'switch', icon: '🎚️', name: 'Switch / Toggle',
    desc: 'Accessible on/off toggle with aria.',
    code: `function Switch({ checked, onChange, label }) {
  return (
    <button role="switch" aria-checked={checked} aria-label={label}
      onClick={() => onChange(!checked)}
      className={
        'relative h-6 w-11 cursor-pointer rounded-full border-none transition-colors ' +
        (checked ? 'bg-emerald-500' : 'bg-slate-600')
      }>
      <span className={
        'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ' +
        (checked ? 'left-[22px]' : 'left-0.5')
      } />
    </button>
  );
}

function App() {
  const [wifi, setWifi] = React.useState(true);
  const [dark, setDark] = React.useState(false);
  const [auto, setAuto] = React.useState(true);

  const Row = ({ label, sub, value, set }) => (
    <div className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-800/50 px-3.5 py-2.5">
      <div>
        <div className="text-[13px] font-semibold text-slate-200">{label}</div>
        <div className="text-[11px] text-slate-500">{sub}</div>
      </div>
      <Switch checked={value} onChange={set} label={label} />
    </div>
  );

  return (
    <div className="max-w-md w-full rounded-2xl border border-slate-700/60 bg-slate-900 p-6 shadow-xl">
      <span className="inline-block rounded-full bg-blue-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-blue-400">Switch</span>
      <h2 className="mt-2.5 mb-3.5 text-lg font-bold text-slate-100">Settings</h2>
      <div className="grid gap-2">
        <Row label="Wi-Fi" sub={wifi ? 'Connected to HomeNet' : 'Off'} value={wifi} set={setWifi} />
        <Row label="Dark mode" sub="Applies system-wide" value={dark} set={setDark} />
        <Row label="Auto-update" sub="Install overnight" value={auto} set={setAuto} />
      </div>
    </div>
  );
}`,
  },
  {
    id: 'progress', icon: '📈', name: 'Progress Bar',
    desc: 'Animated progress with label.',
    code: `function Progress({ value, tone }) {
  const colors = {
    blue: 'bg-blue-500', green: 'bg-emerald-500',
    gold: 'bg-amber-500', red: 'bg-rose-500',
  };
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-xs">
        <span className="font-semibold text-slate-300">Progress</span>
        <span className="font-mono text-slate-400">{value}%</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
        <div className={'h-full rounded-full transition-all duration-500 ' + (colors[tone] || colors.blue)}
          style={{ width: value + '%' }} />
      </div>
    </div>
  );
}

function App() {
  const [pct, setPct] = React.useState(35);

  React.useEffect(() => {
    const id = setInterval(() => setPct(p => (p >= 100 ? 0 : p + 5)), 400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="max-w-md w-full rounded-2xl border border-slate-700/60 bg-slate-900 p-6 shadow-xl">
      <span className="inline-block rounded-full bg-blue-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-blue-400">Progress</span>
      <h2 className="mt-2.5 mb-4 text-lg font-bold text-slate-100">Uploading…</h2>
      <Progress value={pct} tone={pct > 75 ? 'green' : pct > 40 ? 'gold' : 'blue'} />
      <p className="mt-3 text-[11px] text-slate-500">
        width is inline style (dynamic value) — transition-all animates it.
      </p>
    </div>
  );
}`,
  },
  {
    id: 'dropdown', icon: '🔽', name: 'Dropdown / Select',
    desc: 'Custom dropdown with outside-click close.',
    code: `function Dropdown({ options, value, onChange }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const onClick = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      <button onClick={() => setOpen(o => !o)}
        className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-[12.5px] text-slate-200 transition hover:border-blue-500">
        <span>{options.find(o => o.value === value)?.label || 'Select…'}</span>
        <span className="text-slate-500">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className="absolute z-10 mt-1 w-full overflow-hidden rounded-lg border border-slate-700 bg-slate-900 shadow-xl">
          {options.map(o => (
            <button key={o.value} onClick={() => { onChange(o.value); setOpen(false); }}
              className={
                'block w-full cursor-pointer border-none px-3 py-2 text-left text-[12.5px] transition ' +
                (o.value === value ? 'bg-blue-500/15 font-semibold text-blue-400' : 'text-slate-300 hover:bg-slate-800')
              }>
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function App() {
  const [currency, setCurrency] = React.useState('PHP');
  const options = [
    { value: 'PHP', label: '🇵🇭 PHP — Philippine Peso' },
    { value: 'USD', label: '🇺🇸 USD — US Dollar' },
    { value: 'EUR', label: '🇪🇺 EUR — Euro' },
    { value: 'JPY', label: '🇯🇵 JPY — Yen' },
  ];
  return (
    <div className="max-w-md w-full rounded-2xl border border-slate-700/60 bg-slate-900 p-6 shadow-xl">
      <span className="inline-block rounded-full bg-blue-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-blue-400">Dropdown</span>
      <h2 className="mt-2.5 mb-3 text-lg font-bold text-slate-100">Currency</h2>
      <Dropdown options={options} value={currency} onChange={setCurrency} />
      <p className="mt-3 text-xs text-slate-500">
        outside-click closes via document listener + ref containment.
      </p>
    </div>
  );
}`,
  },
  {
    id: 'tooltip', icon: '💬', name: 'Tooltip',
    desc: 'Hover tooltip, pure CSS group.',
    code: `function Tooltip({ text, children }) {
  return (
    <span className="group relative inline-flex">
      {children}
      <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-[11px] font-semibold text-slate-200 opacity-0 shadow-xl transition-opacity duration-150 group-hover:opacity-100">
        {text}
        <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
      </span>
    </span>
  );
}

function App() {
  const [copied, setCopied] = React.useState(false);
  return (
    <div className="max-w-md w-full rounded-2xl border border-slate-700/60 bg-slate-900 p-6 shadow-xl">
      <span className="inline-block rounded-full bg-blue-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-blue-400">Tooltip</span>
      <h2 className="mt-2.5 mb-4 text-lg font-bold text-slate-100">Hover me</h2>
      <div className="flex items-center gap-3">
        <Tooltip text="Delete forever (can't undo)">
          <button className="rounded-lg border border-slate-600 px-3.5 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-rose-500">🗑️</button>
        </Tooltip>
        <Tooltip text="Copy invite link">
          <button className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 px-3.5 py-1.5 text-xs font-semibold text-white transition hover:brightness-110"
            onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 1500); }}>
            🔗 {copied ? 'Copied!' : 'Copy'}
          </button>
        </Tooltip>
      </div>
      <p className="mt-4 text-[11px] text-slate-500">
        pure Tailwind group-hover — no JS state needed for the tip itself.
      </p>
    </div>
  );
}`,
  },
  {
    id: 'pagination', icon: '📄', name: 'Pagination',
    desc: 'Page buttons with current state.',
    code: `function Pagination({ page, total, onChange }) {
  const pages = [];
  for (let i = 1; i <= total; i++) pages.push(i);
  return (
    <div className="flex items-center gap-1">
      <button disabled={page === 1} onClick={() => onChange(page - 1)}
        className="cursor-pointer rounded-lg border border-slate-700 px-2.5 py-1.5 text-xs text-slate-300 transition hover:border-blue-500 disabled:cursor-not-allowed disabled:opacity-40">
        ‹
      </button>
      {pages.map(p => (
        <button key={p} onClick={() => onChange(p)}
          className={
            'cursor-pointer rounded-lg border px-3 py-1.5 text-xs font-semibold transition ' +
            (p === page
              ? 'border-blue-500 bg-blue-500/20 text-blue-400'
              : 'border-slate-700 text-slate-300 hover:border-blue-500')
          }>{p}</button>
      ))}
      <button disabled={page === total} onClick={() => onChange(page + 1)}
        className="cursor-pointer rounded-lg border border-slate-700 px-2.5 py-1.5 text-xs text-slate-300 transition hover:border-blue-500 disabled:cursor-not-allowed disabled:opacity-40">
        ›
      </button>
    </div>
  );
}

function App() {
  const [page, setPage] = React.useState(1);
  const [items] = React.useState(Array.from({ length: 35 }, (_, i) => 'Item ' + (i + 1)));
  const perPage = 5;
  const totalPages = Math.ceil(items.length / perPage);
  const slice = items.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="max-w-md w-full rounded-2xl border border-slate-700/60 bg-slate-900 p-6 shadow-xl">
      <span className="inline-block rounded-full bg-blue-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-blue-400">Pagination</span>
      <h2 className="mt-2.5 mb-3 text-lg font-bold text-slate-100">Invoices · page {page}/{totalPages}</h2>
      <div className="mb-3 grid gap-1.5">
        {slice.map(i => (
          <div key={i} className="rounded-lg bg-slate-800/60 px-3 py-2 text-[12.5px] text-slate-300">{i}</div>
        ))}
      </div>
      <Pagination page={page} total={totalPages} onChange={setPage} />
    </div>
  );
}`,
  },
  {
    id: 'breadcrumb', icon: '🍞', name: 'Breadcrumb',
    desc: 'Navigation trail with separators.',
    code: `function Breadcrumb({ items }) {
  return (
    <nav aria-label="breadcrumb" className="flex items-center gap-1.5 text-xs">
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-1.5">
            {last
              ? <span className="font-semibold text-slate-200">{item}</span>
              : <button className="cursor-pointer border-none bg-transparent text-slate-400 transition hover:text-blue-400">{item}</button>}
            {!last && <span className="text-slate-600">/</span>}
          </span>
        );
      })}
    </nav>
  );
}

function App() {
  const trail = ['Home', 'Projects', 'react-playground', 'src'];
  return (
    <div className="max-w-md w-full rounded-2xl border border-slate-700/60 bg-slate-900 p-6 shadow-xl">
      <span className="inline-block rounded-full bg-blue-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-blue-400">Breadcrumb</span>
      <h2 className="mt-2.5 mb-4 text-lg font-bold text-slate-100">File browser</h2>
      <Breadcrumb items={trail} />
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        {['index.html', 'App.jsx', 'styles.css'].map(f => (
          <div key={f} className="rounded-lg bg-slate-800/60 px-2 py-3 text-[11px] text-slate-300">
            📄<br />{f}
          </div>
        ))}
      </div>
    </div>
  );
}`,
  },
  {
    id: 'spinner', icon: '⏳', name: 'Spinner / Loader',
    desc: 'Ring, dots, and full-state loading.',
    code: `function Spinner({ size = 32 }) {
  return (
    <span className="inline-block animate-spin rounded-full border-[3px] border-slate-700 border-t-blue-500"
      style={{ width: size, height: size }} />
  );
}

function Dots() {
  return (
    <span className="inline-flex items-center gap-1">
      {[0, 1, 2].map(i => (
        <span key={i} className="h-2 w-2 animate-bounce rounded-full bg-blue-400"
          style={{ animationDelay: i * 0.15 + 's' }} />
      ))}
    </span>
  );
}

function App() {
  const [busy, setBusy] = React.useState(false);

  const fakeFetch = () => {
    setBusy(true);
    setTimeout(() => setBusy(false), 1800);
  };

  return (
    <div className="max-w-md w-full rounded-2xl border border-slate-700/60 bg-slate-900 p-6 text-center shadow-xl">
      <span className="inline-block rounded-full bg-blue-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-blue-400">Spinner</span>
      <h2 className="mt-2.5 mb-4 text-lg font-bold text-slate-100">Loading states</h2>
      <div className="mb-4 flex items-center justify-center gap-6">
        <Spinner />
        <Dots />
      </div>
      <button disabled={busy} onClick={fakeFetch}
        className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 px-4 py-2 text-[13px] font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60">
        {busy ? <React.Fragment><Spinner size={16} /> Loading…</React.Fragment> : 'Simulate fetch'}
      </button>
    </div>
  );
}`,
  },
  {
    id: 'statcard', icon: '📊', name: 'Stat Card',
    desc: 'Metric with delta badge.',
    code: `function StatCard({ label, value, delta, up, icon }) {
  return (
    <div className="rounded-2xl border border-slate-700/60 bg-slate-900 p-4 shadow-xl">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">{label}</span>
        <span className="text-sm">{icon}</span>
      </div>
      <div className="mt-1.5 text-2xl font-extrabold text-slate-100">{value}</div>
      <div className="mt-1 flex items-center gap-1.5">
        <span className={
          'rounded-full px-1.5 py-0.5 text-[10px] font-bold ' +
          (up ? 'bg-emerald-500/15 text-emerald-400' : 'bg-rose-500/15 text-rose-400')
        }>{up ? '▲' : '▼'} {delta}</span>
        <span className="text-[10px] text-slate-500">vs last month</span>
      </div>
    </div>
  );
}

function App() {
  const stats = [
    { label: 'Income', value: '₱84,200', delta: '+12%', up: true, icon: '💵' },
    { label: 'Spending', value: '₱51,900', delta: '-8%', up: true, icon: '🛒' },
    { label: 'Savings', value: '₱32,300', delta: '+4%', up: true, icon: '🏦' },
    { label: 'Debt', value: '₱12,500', delta: '+2%', up: false, icon: '💳' },
  ];
  return (
    <div className="grid w-full max-w-md grid-cols-2 gap-2.5">
      {stats.map(s => <StatCard key={s.label} {...s} />)}
    </div>
  );
}`,
  },
  {
    id: 'empty', icon: '🫙', name: 'Empty State',
    desc: 'Friendly no-data placeholder with CTA.',
    code: `function EmptyState({ icon, title, desc, action }) {
  return (
    <div className="w-full max-w-md rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 p-8 text-center">
      <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-slate-800 text-2xl">{icon}</div>
      <h3 className="text-[15px] font-bold text-slate-100">{title}</h3>
      <p className="mx-auto mt-1.5 max-w-[260px] text-[12.5px] leading-relaxed text-slate-500">{desc}</p>
      {action}
    </div>
  );
}

function App() {
  const [hasData, setHasData] = React.useState(false);
  return hasData ? (
    <div className="w-full max-w-md rounded-2xl border border-slate-700/60 bg-slate-900 p-6">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-100">Transactions</h3>
        <button className="cursor-pointer rounded-lg border border-slate-700 px-2.5 py-1 text-[11px] text-slate-300 transition hover:border-blue-500"
          onClick={() => setHasData(false)}>clear</button>
      </div>
      {[['GrabFood', '-₱185'], ['Salary', '+₱42,000'], ['Electric', '-₱2,340']].map(([n, a]) => (
        <div key={n} className="mb-1.5 flex items-center justify-between rounded-lg bg-slate-800/60 px-3 py-2 text-[12.5px]">
          <span className="text-slate-300">{n}</span>
          <span className={'font-mono ' + (a.startsWith('+') ? 'text-emerald-400' : 'text-slate-400')}>{a}</span>
        </div>
      ))}
    </div>
  ) : (
    <EmptyState
      icon="🧾"
      title="No transactions yet"
      desc="When you add your first expense or income, it shows up here with categories and totals."
      action={
        <button className="mt-4 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 px-4 py-2 text-[13px] font-semibold text-white transition hover:brightness-110"
          onClick={() => setHasData(true)}>
          + Add transaction
        </button>
      }
    />
  );
}`,
  },
  {
    id: 'rating', icon: '⭐', name: 'Rating',
    desc: 'Star rating with hover preview.',
    code: `function Rating({ value, onChange }) {
  const [hover, setHover] = React.useState(0);
  const shown = hover || value;
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(star => (
        <button key={star}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(star)}
          className={'cursor-pointer border-none bg-transparent text-xl transition-transform hover:scale-125 ' + (star <= shown ? '' : 'opacity-30 grayscale')}
          aria-label={star + ' stars'}>
          ⭐
        </button>
      ))}
      <span className="ml-2 font-mono text-xs text-slate-400">{shown || '–'}/5</span>
    </div>
  );
}

function App() {
  const [stars, setStars] = React.useState(4);
  const [submitted, setSubmitted] = React.useState(false);
  return (
    <div className="max-w-md w-full rounded-2xl border border-slate-700/60 bg-slate-900 p-6 shadow-xl">
      <span className="inline-block rounded-full bg-blue-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-blue-400">Rating</span>
      <h2 className="mt-2.5 mb-1 text-lg font-bold text-slate-100">Rate this lesson</h2>
      <p className="mb-3 text-[12.5px] text-slate-400">hover previews, click to set</p>
      <Rating value={stars} onChange={setStars} />
      <button className="mt-4 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 px-4 py-2 text-[13px] font-semibold text-white transition hover:brightness-110"
        onClick={() => setSubmitted(true)}>
        Submit
      </button>
      {submitted && (
        <p className="mt-3 text-xs text-emerald-400">
          Thanks! You rated {stars}/5 {stars >= 4 ? '🎉' : stars >= 3 ? '👍' : '🙏'}
        </p>
      )}
    </div>
  );
}`,
  },
);
