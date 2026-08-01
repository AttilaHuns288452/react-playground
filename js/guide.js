/* React Playground — "Try it" tips (guide comprehensiveness) */
const TRY = {
  /* JSX & Rendering */
  'jsx-basics': 'Change the h2 text to your name and watch the preview update. Then try writing a self-closing tag like <img /> — React will complain if you forget the slash.',
  'jsx-expressions': 'Add your own variable — a birthday year, your favorite number — and render it with {}. Try rendering an array with .join(", ") and compare it to .map().',
  'fragments': 'Remove the <> and </> and return the three spans directly — React will error with "Adjacent JSX elements must be wrapped". That error is the fragment lesson.',
  'conditional': 'Add a fourth state: loggedIn === "admin" and render a third branch. Try unread = 0 and see the && short-circuit disappear.',
  /* Components & Props */
  'function-components': 'Write a third component (say, <Footer />) and use it inside App. Components are just functions — anything you can do in a function, you can do in a component.',
  'props': 'Add a size={20} prop to one avatar and watch only that one change. Props are read-only: try writing name[0] = "X" inside Avatar — it will throw in strict mode.',
  'children': 'Nest a Panel inside another Panel. Children can be anything, including other components — this is how layouts are composed.',
  'lists-keys': 'Change the key to the player name and toggle drafts — notice items stay put. Then try key={Math.random()} and watch rows jump around on re-render.',
  /* State & Events */
  'usestate': 'Call setCount twice in one click: setCount(c => c+1); setCount(c => c+1) — the updater form batches correctly, the plain form does not. That is why updaters exist.',
  'events': 'Add an onDoubleClick to the counter button. Event handlers are just props — every DOM event has an on-prefixed React version.',
  'forms': 'Add a password field with type="password" and a show/hide toggle button. Notice the whole form stays in one state object.',
  'lifting': 'Type in °F and watch °C update in the other direction. Both inputs write to the SAME state in App — that is lifting state up.',
  /* Hooks */
  'useeffect': 'Change the dependency array to [] — the interval starts once and never re-syncs, so Pause stops working. That is what the deps array controls.',
  'useref': 'Type in the input and watch the re-render counter climb — but the ref value survives. Now add a second ref that counts characters without re-rendering.',
  'usememo': 'Set the number to 38 and watch the ms jump. Now click "re-render" — instant. That cache is the whole point of useMemo.',
  'usecallback': 'Comment out React.memo around Child and click "bump parent" — the child logs every render again. useCallback + memo work as a pair.',
  'usereducer': 'Add a "double" case to the reducer that returns count * 2. All update logic lives in one switch — that is the reducer pattern.',
  'context': 'Wrap only ONE ThemedBox in the Provider and leave the other outside — the outside one keeps the default. Context only reaches descendants of the provider.',
  /* Styling & Advanced */
  'styling': 'Toggle the button and read the className string — it is just a ternary building a string. That is exactly how most production React apps style conditionally.',
  'error-boundary': 'Move <Bomb /> outside <Boundary> and detonate — the whole preview crashes. Boundaries only catch errors inside their subtree.',
  /* Understanding React */
  'how-react-calls': 'Click re-render and watch the console: App() runs again, returns a fresh tree, React diffs. Add a <Logged /> and count how many times it gets called.',
  'render-cycle': 'Watch the console order: render logs first, the effect logs after the DOM is live. Add a setInterval inside the effect and see it re-register every render.',
  'why-hooks': 'Change the Left counter and the Right counter independently — each keeps its own state slots. That is why hooks are per-instance, not per-function.',
  /* components */
  'btn': 'Add a variant="ghost" loading prop and see the disabled state. Then add a fourth variant like "success" — the map pattern extends in one line.',
  'card': 'Swap the footer for a link or an image. Card is just a shell — the slots (title, children, footer) are what make it reusable.',
  'switch': 'Wire the Wi-Fi switch to actually disable the other toggles — state that depends on state, the classic controlled-component pattern.',
  'dropdown': 'Open the dropdown and click outside — the document listener closes it. Try adding a keyboard handler for ArrowUp/Down navigation.',
  'table': 'Sort by price, then by ticker — the same sort function handles both. Add a "chg" column to the sort keys and it just works.',
  'modal': 'Press Escape while the modal is open. The effect adds a keydown listener on mount and removes it on unmount — that cleanup pattern is everywhere.',
  'progress': 'Slow the interval to 1000ms and watch the transition-all ease — the bar animates because width changes are CSS-transitioned.',
  'rating': 'Hover the stars — the preview state (hover) and committed state (value) are separate. That separation is a core React pattern.',
  'empty': 'Click "Add transaction" and then "clear" — the EmptyState appears again. Empty states are a component, not an afterthought.',
  'pagination': 'Jump to page 7 and back — the slice recomputes from page state. Add a "perPage" dropdown and connect it to the math.',
  'repl': 'Start from scratch: write function App() { return <h1 className="text-3xl font-bold text-blue-400">Hello!</h1> } and press Ctrl+Enter. Everything you need is React + Tailwind, right here.',
};
