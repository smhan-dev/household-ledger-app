/* daypocket prototype. All data lives in localStorage on this device. */
'use strict';

/* ---------------- icons ---------------- */
const ICONS = {
  wallet: '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',
  lock: '<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
  history: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/>',
  sliders: '<path d="M21 4h-7M10 4H3M21 12h-9M8 12H3M21 20h-5M12 20H3M14 2v4M8 10v4M16 18v4"/>',
  plus: '<path d="M5 12h14M12 5v14"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  chevL: '<path d="m15 18-6-6 6-6"/>',
  chevR: '<path d="m9 18 6-6-6-6"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  trash: '<path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
  back: '<path d="M10 5a2 2 0 0 0-1.34.52l-6.33 5.74a1 1 0 0 0 0 1.48l6.33 5.74A2 2 0 0 0 10 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"/><path d="m12 9 6 6M18 9l-6 6"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  pencil: '<path d="M21.17 6.81a1 1 0 0 0-3.99-3.99L3.84 16.17a2 2 0 0 0-.5.83l-1.32 4.35a.5.5 0 0 0 .62.62l4.35-1.32a2 2 0 0 0 .83-.5z"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5M12 15V3"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20"/>',
  utensils: '<path d="M6 2a2.5 2.5 0 0 0-2.5 2.5v3a2.5 2.5 0 0 0 5 0v-3A2.5 2.5 0 0 0 6 2ZM6 10v12"/><path d="M14 2 13 22M19 2l-3 20"/>',
  coffee: '<path d="M10 2v2M14 2v2M6 2v2M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/>',
  bus: '<path d="M8 6v6M15 6v6M2 12h19.6M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/><circle cx="7" cy="18" r="2"/><path d="M9 18h5"/><circle cx="16" cy="18" r="2"/>',
  cart: '<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>',
  bag: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4ZM3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
  more: '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>'
};
const ic = (name, cls = '') => `<svg class="i ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name]}</svg>`;

const CATS = [
  { id: 'food', icon: 'utensils', color: '#E59A1F', bg: '#FFF2DC', quick: [9000, 12000, 15000] },
  { id: 'coffee', icon: 'coffee', color: '#8A5A3C', bg: '#F4EAE3', quick: [2000, 4500, 6000] },
  { id: 'transport', icon: 'bus', color: '#2F7BEA', bg: '#E5F0FF', quick: [1500, 3000, 10000] },
  { id: 'groceries', icon: 'cart', color: '#22A06B', bg: '#E2F5EC', quick: [10000, 30000, 50000] },
  { id: 'shopping', icon: 'bag', color: '#D9488B', bg: '#FCE6F1', quick: [20000, 50000, 100000] },
  { id: 'other', icon: 'more', color: '#5B64C9', bg: '#ECEEFC', quick: [5000, 10000, 30000] }
];
const catOf = id => CATS.find(c => c.id === id) || CATS[5];

/* ---------------- state ---------------- */
const STORE = 'daypocket.v1';
const fresh = () => ({
  lang: (navigator.language || 'ko').toLowerCase().startsWith('ko') ? 'ko' : 'en',
  setupDone: false,
  profile: null,
  expenses: []
});
/** Load saved data and drop anything malformed so a damaged entry cannot break the budget math. */
function loadState() {
  let s;
  try { s = JSON.parse(localStorage.getItem(STORE)); } catch (e) { s = null; }
  if (!s || typeof s !== 'object') return fresh();
  const base = fresh();
  s.lang = s.lang === 'en' ? 'en' : s.lang === 'ko' ? 'ko' : base.lang;
  s.expenses = Array.isArray(s.expenses) ? s.expenses.filter(e => e && typeof e.id === 'string'
    && Number.isInteger(e.amount) && e.amount > 0 && /^\d{4}-\d{2}-\d{2}$/.test(e.date)
    && CATS.some(c => c.id === e.cat)) : [];
  if (s.setupDone && !(s.profile && Number.isFinite(s.profile.daily) && s.profile.anchor && s.profile.payDate)) {
    s.setupDone = false; s.profile = null;
  }
  return s;
}
let S = loadState();
const save = () => {
  try { localStorage.setItem(STORE, JSON.stringify(S)); }
  catch (e) { toast(t('saveFailed')); }
};

const ui = {
  tab: 'today',
  step: 0,
  draft: null,
  editStep: null,
  sheet: null,
  histMonth: null,
  histDay: null,
  histCat: 'all',
  histQuery: '',
  prevLeft: null,
  undo: null,
  debtFlash: false
};

/* ---------------- helpers ---------------- */
const L = () => I18N[S.lang];
function t(key, vars) {
  let s = key.split('.').reduce((o, k) => (o ? o[k] : undefined), L());
  if (s === undefined) return key;
  if (vars) for (const k in vars) s = s.split(`{${k}}`).join(vars[k]);
  return s;
}
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const uid = () => Math.random().toString(36).slice(2, 10);
const sum = (arr, f) => arr.reduce((a, x) => a + (Number(f(x)) || 0), 0);
const fmt = n => `${n < 0 ? '−' : ''}₩${Math.abs(Math.round(n)).toLocaleString('ko-KR')}`;
const fmtIn = n => (n === null || n === undefined || n === '') ? '' : Number(n).toLocaleString('ko-KR');
const money = n => `${n < 0 ? '−' : ''}<span class="won">₩</span>${Math.abs(Math.round(n)).toLocaleString('ko-KR')}`;
function short(n) {
  if (S.lang === 'ko') return n >= 10000 ? `${+(n / 10000).toFixed(1)}만` : `${+(n / 1000).toFixed(1)}천`;
  return `${+(n / 1000).toFixed(1)}k`;
}

const pad = n => String(n).padStart(2, '0');
const ymd = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parse = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
const today = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };
const diffDays = (a, b) => Math.round((b - a) / 86400000);
const dim = (y, m) => new Date(y, m + 1, 0).getDate();
const monday = d => addDays(d, -((d.getDay() + 6) % 7));
const dateAt = (y, m, day) => new Date(y, m, Math.min(day, dim(y, m)));

/** Next occurrence of a day-of-month strictly after `from` (or on/after when inclusive). */
function nextDayOfMonth(from, day, inclusive) {
  let d = dateAt(from.getFullYear(), from.getMonth(), day);
  if (inclusive ? d < from : d <= from) d = dateAt(from.getFullYear(), from.getMonth() + 1, day);
  return d;
}

function fmtDate(s, opts) {
  return parse(s).toLocaleDateString(L().locale, opts || { month: 'short', day: 'numeric', weekday: 'short' });
}
function dayLabel(s) {
  const td = ymd(today());
  if (s === td) return t('today');
  if (s === ymd(addDays(today(), -1))) return t('yesterday');
  return fmtDate(s);
}

/* ---------------- budget math ---------------- */
/**
 * spendable = balance + money coming in before payday − fixed costs due before payday − debt payments − savings
 * daily     = spendable ÷ days until payday (rounded down to ₩100)
 */
function calc(p, from = today()) {
  const pay = nextDayOfMonth(from, p.payday, false);
  const days = Math.max(1, diffDays(from, pay));
  const inc = sum(p.incoming.filter(i => !i.date || (parse(i.date) >= from && parse(i.date) < pay)), i => i.amount);
  const fixed = sum(p.fixed.filter(f => !f.day || nextDayOfMonth(from, f.day, true) < pay), f => f.amount);
  const debt = sum(p.debts, d => d.monthly);
  const savings = Number(p.savings) || 0;
  const avail = (Number(p.balance) || 0) + inc - fixed - debt - savings;
  const daily = avail > 0 ? Math.floor(avail / days / 100) * 100 : 0;
  return { pay, days, inc, fixed, debt, savings, avail, daily };
}

function commitProfile(draft, from = today()) {
  const p = JSON.parse(JSON.stringify(draft));
  const r = calc(p, from);
  p.daily = r.daily;
  p.anchor = ymd(from);
  p.payDate = ymd(r.pay);
  p.cycleDays = r.days;
  S.profile = p;
}

const spentOn = s => sum(S.expenses.filter(e => e.date === s), e => e.amount);
const spentBetween = (a, b) => sum(S.expenses.filter(e => e.date >= a && e.date <= b), e => e.amount);

function estBalance() {
  const p = S.profile;
  const y = ymd(addDays(today(), -1));
  return p.balance - spentBetween(p.anchor, y);
}

function weekInfo() {
  const p = S.profile, td = today(), mon = monday(td), sun = addDays(mon, 6);
  const anchor = parse(p.anchor);
  const start = mon < anchor ? anchor : mon;
  const nDays = Math.max(0, diffDays(start, sun) + 1);
  const budget = p.daily * nDays;
  const spent = spentBetween(ymd(start), ymd(sun));
  let past = 0;
  for (let d = new Date(start); d < td; d = addDays(d, 1)) past += p.daily - spentOn(ymd(d));
  const dots = [];
  for (let i = 0; i < 7; i++) {
    const d = addDays(mon, i), s = ymd(d), sp = spentOn(s);
    let st;
    if (d < anchor) st = 'off';
    else if (s === ymd(td)) st = 'today';
    else if (d > td) st = 'future';
    else st = sp === 0 ? 'zero' : sp <= p.daily ? 'good' : 'over';
    dots.push({ st, label: L().weekdays[i] });
  }
  return { mon, sun, budget, spent, left: budget - spent, past, dots };
}

/* ---------------- draft (onboarding + edit) ---------------- */
const newDraft = () => ({ balance: null, salary: null, payday: 25, incoming: [], fixed: [], debts: [], savings: null });
const STEPS = ['welcome', 'balance', 'income', 'extra', 'fixed', 'debts', 'savings', 'result'];

function setPath(obj, path, v) {
  const parts = path.split('.');
  if (parts.length === 1) { obj[parts[0]] = v; return; }
  const item = obj[parts[0]].find(x => x.id === parts[1]);
  if (item) item[parts[2]] = v;
}

function stepValid(k) {
  const d = ui.draft;
  if (k === 'balance') return d.balance !== null;
  if (k === 'income') return d.salary !== null && !!d.payday;
  return true;
}

/* ---------------- onboarding views ---------------- */
function langSeg() {
  return `<div class="seg">
    <button class="${S.lang === 'ko' ? 'on' : ''}" data-act="lang" data-v="ko">한국어</button>
    <button class="${S.lang === 'en' ? 'on' : ''}" data-act="lang" data-v="en">EN</button></div>`;
}

function welcomeHTML() {
  return `<div class="dark on-dark">
    <div class="dark-top"><div class="logo"><span class="logo-mark">${ic('wallet')}</span>daypocket</div>${langSeg()}</div>
    <div class="dark-body step-anim">
      <div class="eyebrow w-kicker">${t('welcomeKicker')}</div>
      <h1 class="w-title">${t('welcomeTitle')}</h1>
      <p class="w-sub">${t('welcomeSub')}</p>
      <div class="priv">
        <div class="priv-h"><span class="lock">${ic('lock')}</span><span class="t-body-lg">${t('privTitle')}</span></div>
        <p class="t-body">${t('privBody')}</p>
        <div class="priv-pts">${L().privPts.map(x => `<span>${ic('check')}${x}</span>`).join('')}</div>
      </div>
    </div>
    <div class="dark-actions">
      <button class="btn btn-lime" data-act="start">${t('start')}</button>
      <button class="btn btn-text" data-act="demo">${t('demo')}</button>
    </div></div>`;
}

const STEP_KEY = { balance: 'bal', income: 'inc', extra: 'extra', fixed: 'fixed', debts: 'debt', savings: 'save' };
function qHead(k, editing) {
  const pre = STEP_KEY[k];
  const hint = editing && k === 'balance' ? t('balEditHint') : t(pre + 'Hint');
  return `<div class="eyebrow">${t(pre + 'Eyebrow')}</div>
    <h1 class="q-title t-h1">${t(pre + 'Title')}</h1>
    <p class="q-hint t-body">${hint}</p><div class="q-gap"></div>`;
}

const moneyField = (bind, val, ph = '0') =>
  `<label class="field"><span>₩</span><input inputmode="numeric" data-money data-bind="${bind}" value="${fmtIn(val)}" placeholder="${ph}"></label>`;

function rowHTML(list, it) {
  const del = `<button class="ri-del" data-act="rmItem" data-list="${list}" data-id="${it.id}" aria-label="remove">${ic('x')}</button>`;
  const name = `<input class="ri-name" data-bind="${list}.${it.id}.name" value="${esc(it.name)}" placeholder="${t('namePh')}">`;
  if (list === 'fixed') {
    return `<div class="row-item">${name}<div class="ri-fields">${moneyField(`fixed.${it.id}.amount`, it.amount)}
      <label class="field day"><input inputmode="numeric" data-int data-bind="fixed.${it.id}.day" value="${it.day || ''}" placeholder="${t('dayPh')}"></label>${del}</div></div>`;
  }
  if (list === 'incoming') {
    return `<div class="row-item">${name}<div class="ri-fields">${moneyField(`incoming.${it.id}.amount`, it.amount)}
      <label class="field date"><input type="date" data-bind="incoming.${it.id}.date" value="${it.date || ''}"></label>${del}</div></div>`;
  }
  return `<div class="row-item">${name}<div class="ri-fields">
    <label class="field"><span>${t('monthly')}</span><input inputmode="numeric" data-money data-bind="debts.${it.id}.monthly" value="${fmtIn(it.monthly)}" placeholder="0"></label>
    <label class="field"><span>${t('remaining')}</span><input inputmode="numeric" data-money data-bind="debts.${it.id}.remaining" value="${fmtIn(it.remaining)}" placeholder="0"></label>${del}</div></div>`;
}

function presetChips(list, presets) {
  const d = ui.draft[list];
  return `<div class="chips">${presets.map(p => {
    const on = d.some(x => x.key === p.k);
    return `<button class="chip ${on ? 'on' : ''}" data-act="preset" data-list="${list}" data-k="${p.k}">${on ? ic('check') : '<span class="plus">+</span>'}${p[S.lang]}</button>`;
  }).join('')}</div>`;
}

function stepBody(k, editing) {
  const d = ui.draft;
  if (k === 'balance') {
    return `${qHead(k, editing)}<label class="big-money"><span>₩</span><input inputmode="numeric" data-money data-bind="balance" value="${fmtIn(d.balance)}" placeholder="0" autofocus></label>`;
  }
  if (k === 'income') {
    const days = Array.from({ length: 30 }, (_, i) => i + 1);
    return `${qHead(k, editing)}
      <div class="sub-label">${t('salary')}</div>
      <label class="big-money sm"><span>₩</span><input inputmode="numeric" data-money data-bind="salary" value="${fmtIn(d.salary)}" placeholder="0"></label>
      <div class="sub-label">${t('payday')} <span class="num">${d.payday === 31 ? t('lastDay') : t('dayN', { n: d.payday })}</span></div>
      <div class="day-grid">${days.map(n => `<button class="${d.payday === n ? 'on' : ''}" data-act="payday" data-v="${n}">${n}</button>`).join('')}
        <button class="wide ${d.payday === 31 ? 'on' : ''}" data-act="payday" data-v="31">${t('lastDay')}</button></div>
      <p class="q-hint t-body">${t('paydayHint')}</p>`;
  }
  if (k === 'extra') {
    return `${qHead(k, editing)}${presetChips('incoming', EXTRA_PRESETS)}
      <div class="rows">${d.incoming.map(it => rowHTML('incoming', it)).join('')}</div>
      <button class="add-custom" data-act="custom" data-list="incoming">${ic('plus')}${t('custom')}</button>`;
  }
  if (k === 'fixed') {
    return `${qHead(k, editing)}
      ${FIXED_PRESETS.map(g => `<div class="group"><div class="group-h t-caption">${t('groups.' + g.g)}</div>${presetChips('fixed', g.items)}</div>`).join('')}
      <div class="tip t-body"><span aria-hidden="true">💡</span><span>${t('fixedTip')}</span></div>
      <div class="sub-label">${t('selected')} <span class="num" id="fixedTotal">${fmt(sum(d.fixed, f => f.amount))}</span></div>
      <div class="rows">${d.fixed.map(it => rowHTML('fixed', it)).join('')}</div>
      <button class="add-custom" data-act="custom" data-list="fixed">${ic('plus')}${t('custom')}</button>`;
  }
  if (k === 'debts') {
    const yay = ui.debtFlash && d.debts.length === 0;
    return `${qHead(k, editing)}
      <button class="big-choice ${yay ? 'on' : ''}" data-act="noDebt">${yay ? t('noDebtYay') : t('noDebt')}</button>
      <div class="or t-caption">${t('orDebt')}</div>
      ${presetChips('debts', DEBT_PRESETS)}
      <div class="rows">${d.debts.map(it => rowHTML('debts', it)).join('')}</div>
      <button class="add-custom" data-act="custom" data-list="debts">${ic('plus')}${t('custom')}</button>`;
  }
  if (k === 'savings') {
    const opts = [100000, 300000, 500000, 1000000];
    return `${qHead(k, editing)}
      <label class="big-money"><span>₩</span><input inputmode="numeric" data-money data-bind="savings" value="${fmtIn(d.savings)}" placeholder="0"></label>
      <div class="chips" style="margin-top:var(--s5)">${opts.map(v => `<button class="chip ${d.savings === v ? 'on' : ''}" data-act="savePick" data-v="${v}">${fmt(v)}</button>`).join('')}
      <button class="chip ${d.savings === 0 ? 'on' : ''}" data-act="savePick" data-v="0">${t('savePass')}</button></div>`;
  }
  return '';
}

function resultHTML() {
  const r = calc(ui.draft);
  return `<div class="dark on-dark">
    <div class="dark-top"><button class="icon-btn" data-act="obBack" aria-label="back">${ic('chevL')}</button>${langSeg()}</div>
    <div class="dark-body step-anim">
      <div class="res-label t-h3">${t('resLabel')}</div>
      <div class="res-amt num" id="countup" data-to="${r.daily}">${money(0)}</div>
      <div class="t-h2">${t('resSuffix')}</div>
      <div class="res-week t-body">${t('resWeek', { x: fmt(r.daily * 7) })}</div>
      <div class="bd num t-body">
        <div class="bd-row"><span>${t('bdBalance')}</span><b>${fmt(ui.draft.balance || 0)}</b></div>
        ${r.inc ? `<div class="bd-row"><span>${t('bdIncoming')}</span><b>${fmt(r.inc)}</b></div>` : ''}
        <div class="bd-row"><span>${t('bdFixed')}</span><b>${fmt(r.fixed)}</b></div>
        ${r.debt ? `<div class="bd-row"><span>${t('bdDebt')}</span><b>${fmt(r.debt)}</b></div>` : ''}
        ${r.savings ? `<div class="bd-row"><span>${t('bdSavings')}</span><b>${fmt(r.savings)}</b></div>` : ''}
        <div class="bd-row total"><span>${t('bdAvail')}</span><b>${fmt(r.avail)}</b></div>
        <div class="bd-row"><span>${t('bdDays', { n: r.days })}</span></div>
      </div>
      ${r.daily < 10000 ? `<div class="res-tight t-body">${t('resTight')}</div>` : ''}
    </div>
    <div class="dark-actions"><button class="btn btn-lime" data-act="finish">${t('letsGo')}</button></div></div>`;
}

function onboardingHTML() {
  const k = STEPS[ui.step];
  if (k === 'welcome') return welcomeHTML();
  if (k === 'result') return resultHTML();
  const total = STEPS.length - 2;
  const optional = ['extra', 'debts', 'savings'].includes(k);
  return `<div class="ob">
    <div class="ob-top"><button class="icon-btn" data-act="obBack" aria-label="back">${ic('chevL')}</button>
      <div class="ob-progress"><i style="width:${(ui.step / total) * 100}%"></i></div>
      <span class="ob-count num t-caption">${ui.step}/${total}</span></div>
    <div class="ob-body step-anim">${stepBody(k, false)}</div>
    <div class="ob-foot">
      <button class="btn btn-navy" id="nextBtn" data-act="obNext" ${stepValid(k) ? '' : 'disabled'}>${t('next')}</button>
      ${k === 'extra' ? `<button class="btn btn-text" data-act="noneNext">${t('none')}</button>` : ''}
      ${optional && k !== 'extra' && k !== 'debts' ? `<button class="btn btn-text" data-act="skipNext">${t('skip')}</button>` : ''}
    </div></div>`;
}

/* ---------------- main views ---------------- */
function headerHTML() {
  return `<div class="hdr"><div class="logo"><span class="logo-mark">${ic('wallet')}</span>daypocket</div>
    <button class="pill-private" data-act="priv">${ic('lock')}${t('private')}</button></div>`;
}

function itemHTML(e) {
  const c = catOf(e.cat);
  const time = e.ts && ymd(new Date(e.ts)) === e.date ? new Date(e.ts).toLocaleTimeString(L().locale, { hour: 'numeric', minute: '2-digit' }) : '';
  const title = e.note ? esc(e.note) : t('cats.' + c.id);
  const sub = [e.note ? t('cats.' + c.id) : '', time].filter(Boolean).join(' · ');
  return `<button class="item" data-act="openEdit" data-id="${e.id}">
    <span class="tile" style="background:${c.bg};color:${c.color}">${ic(c.icon)}</span>
    <span class="item-main"><span class="item-title t-body-lg">${title}</span>${sub ? `<span class="item-sub">${sub}</span>` : ''}</span>
    <span class="t-body-lg num">${fmt(e.amount)}</span></button>`;
}

function groupedList(list) {
  const groups = {};
  list.forEach(e => (groups[e.date] = groups[e.date] || []).push(e));
  return Object.keys(groups).sort().reverse().map(dt => `
    <div class="grp-label t-caption"><span>${dayLabel(dt)}</span><span class="num">${fmt(sum(groups[dt], e => e.amount))}</span></div>
    <div class="list">${groups[dt].sort((a, b) => b.ts - a.ts).map(itemHTML).join('')}</div>`).join('');
}

const sortedExpenses = () => [...S.expenses].sort((a, b) => (b.date + b.ts).localeCompare(a.date + a.ts));

function todayHTML() {
  const p = S.profile, td = ymd(today());
  const spent = spentOn(td), left = p.daily - spent, over = left < 0;
  const w = weekInfo();
  const cycleEnded = today() >= parse(p.payDate);
  const recent = sortedExpenses().slice(0, 6);
  const ratio = p.daily ? Math.max(0, Math.min(1, left / p.daily)) : 0;
  const wRatio = w.budget ? Math.max(0, Math.min(1, w.left / w.budget)) : 0;
  const dleft = Math.max(0, diffDays(today(), parse(p.payDate)));
  return `${headerHTML()}
    <div class="date-line">${parse(td).toLocaleDateString(L().locale, { month: 'long', day: 'numeric', weekday: 'long' })}</div>
    <section class="hero ${over ? 'over' : ''}">
      <div class="hero-top"><span class="hero-label">${over ? t('overToday') : t('leftToday')}</span>
        ${cycleEnded ? '' : `<span class="hero-badge num">${t('paydayBadge', { n: dleft })}</span>`}</div>
      <span class="hero-amt t-display num" id="heroAmt" data-v="${Math.abs(left)}">${money(Math.abs(left))}</span>
      <div class="hero-sub t-body num">${over ? t('overSub', { b: fmt(p.daily) }) : spent === 0 ? t('fresh', { b: fmt(p.daily) }) : t('spentOf', { b: fmt(p.daily), s: fmt(spent) })}</div>
      <div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(ratio * 100)}"><i style="width:${ratio * 100}%"></i></div>
    </section>
    ${cycleEnded ? `<div class="banner"><span>${t('cycleEnded')}</span><button data-act="edit" data-step="1">${t('recalc')}</button></div>` : ''}
    <section class="card week">
      <div class="week-top">
        <div><div class="week-label">${t('weekLeft')}</div>
          <div class="week-range t-caption">${fmtDate(ymd(w.mon), { month: 'short', day: 'numeric' })} – ${fmtDate(ymd(w.sun), { month: 'short', day: 'numeric' })}</div></div>
        <div class="week-of t-caption num">${t('weekOf', { b: fmt(w.budget) })}</div>
      </div>
      <div class="week-amt t-h2 num ${w.left < 0 ? 'neg' : ''}">${money(w.left)}</div>
      <div class="bar"><i style="width:${wRatio * 100}%"></i></div>
      <div class="dots">${w.dots.map(d => `<div class="dot ${d.st}"><i>${d.st === 'zero' || d.st === 'good' ? ic('check') : d.st === 'over' ? ic('x') : ''}</i>${d.label}</div>`).join('')}</div>
      ${w.past > 0 ? `<div class="week-note pos num">${t('saved', { x: fmt(w.past) })}</div>` : w.past < 0 ? `<div class="week-note neg num">${t('overPast', { x: fmt(w.past) })}</div>` : ''}
    </section>
    <div class="sec-h"><h2 class="t-h3">${t('recent')}</h2>${recent.length ? `<button data-act="tab" data-v="history">${t('seeAll')}</button>` : ''}</div>
    ${recent.length ? groupedList(recent) : `<div class="empty t-body">${t('empty')}</div>`}`;
}

function historyHTML() {
  const p = S.profile, td = today();
  if (!ui.histMonth) ui.histMonth = ymd(td).slice(0, 7);
  const [y, m] = ui.histMonth.split('-').map(Number);
  const first = new Date(y, m - 1, 1), n = dim(y, m - 1);
  const monthLabel = first.toLocaleDateString(L().locale, { year: 'numeric', month: 'long' });
  const monthShort = first.toLocaleDateString(L().locale, { month: 'long' });
  const monthExp = S.expenses.filter(e => e.date.startsWith(ui.histMonth));
  const total = sum(monthExp, e => e.amount);
  const lastDay = ymd(td).startsWith(ui.histMonth) ? td.getDate() : n;
  const offset = (first.getDay() + 6) % 7;
  const anchor = p.anchor;

  let cells = L().weekdays.map(w => `<div class="cal-h t-caption">${w}</div>`).join('');
  for (let i = 0; i < offset; i++) cells += '<div></div>';
  for (let d = 1; d <= n; d++) {
    const s = `${ui.histMonth}-${pad(d)}`, sp = spentOn(s);
    let st = '';
    if (parse(s) > td) st = 'future';
    else if (s < anchor && !sp) st = 'pre';
    else st = sp === 0 ? 'zero' : sp <= p.daily ? 'good' : 'over';
    if (s === ymd(td)) st += ' today';
    if (ui.histDay === s) st += ' sel';
    cells += `<button class="cal-d ${st}" data-act="histDay" data-v="${s}"><span class="num">${d}</span>${sp ? `<small class="num">${short(sp)}</small>` : ''}</button>`;
  }

  return `${headerHTML()}<h1 class="page-title t-h1">${t('historyTitle')}</h1>
    <section class="card">
      <div class="month-sw"><button class="icon-btn" data-act="histMonth" data-v="-1" aria-label="previous month">${ic('chevL')}</button><b class="t-h3">${monthLabel}</b><button class="icon-btn" data-act="histMonth" data-v="1" aria-label="next month">${ic('chevR')}</button></div>
      <div class="month-stat"><div><div class="stat-l">${t('monthTotal', { m: monthShort })}</div><div class="t-h2 num">${money(total)}</div></div>
        <div class="avg t-caption num">${t('perDay', { x: fmt(lastDay ? total / lastDay : 0) })}</div></div>
      <div class="cal">${cells}</div>
      <div class="legend"><span><i class="lg-good"></i>${t('lgGood')}</span><span><i class="lg-zero"></i>${t('lgZero')}</span><span><i class="lg-over"></i>${t('lgOver')}</span></div>
    </section>
    <label class="search">${ic('search')}<input id="histSearch" type="search" autocomplete="off" value="${esc(ui.histQuery)}" placeholder="${t('searchPh')}" aria-label="${t('searchPh')}"></label>
    <div class="chips scroll hist-chips">
      <button class="chip ${ui.histCat === 'all' ? 'on' : ''}" data-act="histCat" data-v="all">${t('all')}</button>
      ${CATS.map(c => `<button class="chip ${ui.histCat === c.id ? 'on' : ''}" data-act="histCat" data-v="${c.id}">${t('cats.' + c.id)}</button>`).join('')}
    </div>
    ${ui.histDay ? `<button class="chip clear-day" data-act="histDay" data-v="${ui.histDay}">${ic('x')}${t('clearDay', { d: fmtDate(ui.histDay, { month: 'short', day: 'numeric' }) })}</button>` : ''}
    <div id="histList">${historyListHTML()}</div>`;
}

function historyListHTML() {
  const q = ui.histQuery.trim().toLowerCase();
  const list = sortedExpenses().filter(e => e.date.startsWith(ui.histMonth)
    && (!ui.histDay || e.date === ui.histDay)
    && (ui.histCat === 'all' || e.cat === ui.histCat)
    && (!q || (e.note || '').toLowerCase().includes(q) || t('cats.' + e.cat).toLowerCase().includes(q)));
  return list.length ? groupedList(list) : `<div class="empty t-body" style="margin-top:var(--s4)">${t('noResults')}</div>`;
}

function donutHTML() {
  const month = ymd(today()).slice(0, 7);
  const exp = S.expenses.filter(e => e.date.startsWith(month));
  const total = sum(exp, e => e.amount);
  if (!total) return `<p class="t-body" style="color:var(--text-3);text-align:center">${t('noData')}</p>`;
  const parts = CATS.map(c => ({ c, v: sum(exp.filter(e => e.cat === c.id), e => e.amount) })).filter(x => x.v).sort((a, b) => b.v - a.v);
  const R = 50, C = 2 * Math.PI * R;
  let acc = 0;
  const segs = parts.map(x => {
    const len = (x.v / total) * C;
    const s = `<circle cx="65" cy="65" r="${R}" fill="none" stroke="${x.c.color}" stroke-width="18" stroke-dasharray="${Math.max(0, len - 2)} ${C}" stroke-dashoffset="${-acc}"/>`;
    acc += len;
    return s;
  }).join('');
  return `<div class="donut-wrap"><div class="donut"><svg viewBox="0 0 130 130" aria-hidden="true"><circle cx="65" cy="65" r="${R}" fill="none" stroke="#EDF0F8" stroke-width="18"/>${segs}</svg>
    <div class="donut-c"><small>${t('total')}</small><b class="num">${short(total)}</b></div></div>
    <div class="lg">${parts.map(x => `<div class="lg-row"><i style="background:${x.c.color}"></i><span>${t('cats.' + x.c.id)}</span><b class="num">${Math.round((x.v / total) * 100)}%</b></div>`).join('')}</div></div>`;
}

function planHTML() {
  const p = S.profile, td = today();
  const pay = parse(p.payDate);
  const dleft = Math.max(0, diffDays(td, pay));
  const cycleBudget = p.daily * p.cycleDays;
  const cycleSpent = spentBetween(p.anchor, ymd(addDays(pay, -1)));
  const cycleLeft = cycleBudget - cycleSpent;
  const ratio = cycleBudget ? Math.max(0, Math.min(1, cycleLeft / cycleBudget)) : 0;
  const sec = (title, step, total, rows) => `<div class="pcard"><div class="pcard-h"><h3>${title}</h3>${total !== null ? `<span class="tot num">${total}</span>` : ''}<button class="edit-btn" data-act="edit" data-step="${step}">${t('edit')}</button></div>${rows}</div>`;
  const row = (l, v, sub = '') => `<div class="prow"><span>${esc(l)}${sub ? `<small>${sub}</small>` : ''}</span><b class="num">${v}</b></div>`;
  const none = `<div class="prow muted"><span>${t('nothing')}</span></div>`;

  const balanceNow = estBalance() - spentOn(ymd(td));
  return `${headerHTML()}<h1 class="page-title t-h1">${t('planTitle')}</h1>
    <div class="stat-grid">
      <div class="stat hero-stat"><div class="stat-l">${t('cycleLeft')}</div><div class="stat-v num">${money(cycleLeft)}</div>
        <div class="bar"><i style="width:${ratio * 100}%"></i></div><div class="stat-s t-caption num">${t('ofX', { x: fmt(cycleBudget) })}</div></div>
      <div class="stat"><div class="stat-l">${t('estBalance')}</div><div class="stat-v num">${money(balanceNow)}</div></div>
      <div class="stat"><div class="stat-l">${t('dDay')}</div><div class="stat-v num">${t('dDayV', { n: dleft })}</div></div>
      <div class="stat"><div class="stat-l">${t('dailyBudget')}</div><div class="stat-v num">${money(p.daily)}</div></div>
      <div class="stat"><div class="stat-l">${t('weekBudget')}</div><div class="stat-v num">${money(p.daily * 7)}</div></div>
    </div>
    <div class="sec-h"><h2 class="t-h3">${t('byCat')}</h2></div>
    <section class="card">${donutHTML()}</section>
    <div class="sec-h"><h2 class="t-h3">${t('manage')}</h2></div>
    ${sec(t('balanceSec'), 1, null, row(t('estBalance'), fmt(balanceNow)))}
    ${sec(t('incomeSec'), 2, null, row(t('incomeRow', { d: p.payday === 31 ? t('lastDay') : p.payday }), fmt(p.salary || 0)))}
    ${sec(t('fixedSec'), 4, fmt(sum(p.fixed, f => f.amount)), p.fixed.length ? p.fixed.map(f => row(f.name || '—', fmt(f.amount || 0), f.day ? t('dayN', { n: f.day }) : '')).join('') : none)}
    ${sec(t('extraSec'), 3, p.incoming.length ? fmt(sum(p.incoming, f => f.amount)) : null, p.incoming.length ? p.incoming.map(f => row(f.name || '—', fmt(f.amount || 0), f.date ? fmtDate(f.date, { month: 'short', day: 'numeric' }) : '')).join('') : none)}
    ${sec(t('debtSec'), 5, p.debts.length ? fmt(sum(p.debts, d => d.remaining)) : null, p.debts.length ? p.debts.map(d => {
      const months = d.monthly ? Math.ceil((d.remaining || 0) / d.monthly) : 0;
      const sub = [t('debtMonthly', { x: fmt(d.monthly || 0) }), months ? t('monthsLeft', { n: months }) : ''].filter(Boolean).join(' · ');
      return row(d.name || '—', fmt(d.remaining || 0), sub);
    }).join('') : none)}
    ${sec(t('saveSec'), 6, null, row(t('perMonth'), fmt(p.savings || 0)))}
    <div class="sec-h"><h2 class="t-h3">${t('settings')}</h2></div>
    <div class="pcard">
      <div class="set-row"><span>${t('language')}</span>${langSeg()}</div>
      <button class="set-row" data-act="export"><span>${t('export')}</span>${ic('download')}</button>
      <button class="set-row danger" data-act="reset"><span>${t('reset')}</span>${ic('trash')}</button>
    </div>
    <div class="priv-note">${ic('lock')}<span>${t('privNote')}</span></div>`;
}

function editHTML() {
  const k = STEPS[ui.editStep];
  return `<div class="edit"><div class="edit-panel">
    <div class="ob-top"><button class="icon-btn" data-act="editClose" aria-label="close">${ic('x')}</button></div>
    <div class="ob-body" id="editBody">${stepBody(k, true)}</div>
    <div class="ob-foot"><button class="btn btn-navy" id="nextBtn" data-act="editSave" ${stepValid(k) ? '' : 'disabled'}>${t('saveRecalc')}</button></div>
  </div></div>`;
}

function mainHTML() {
  const body = ui.tab === 'today' ? todayHTML() : ui.tab === 'history' ? historyHTML() : planHTML();
  const tabs = [['today', 'sun'], ['history', 'history'], ['plan', 'sliders']];
  return `<div class="main">${body}</div>
    ${ui.tab !== 'plan' ? `<div class="fab"><button class="btn btn-lime" data-act="openAdd">${ic('plus')}${t('add')}</button></div>` : ''}
    <nav class="tabbar">${tabs.map(([k, icon]) => `<button class="tab ${ui.tab === k ? 'on' : ''}" data-act="tab" data-v="${k}">${ic(icon)}${t('tabs.' + k)}</button>`).join('')}</nav>
    ${ui.editStep !== null ? editHTML() : ''}`;
}

/* ---------------- expense sheet ---------------- */
function openSheet(e) {
  ui.sheet = e
    ? { mode: 'edit', id: e.id, cat: e.cat, amount: String(e.amount), note: e.note || '', date: e.date }
    : { mode: 'add', cat: 'food', amount: '', note: '', date: ymd(today()) };
  renderSheet();
  // A history entry lets the Android back button (and browser back) close the sheet instead of leaving the app.
  history.pushState({ sheet: true }, '');
  requestAnimationFrame(() => requestAnimationFrame(() => document.querySelector('.sheet-wrap')?.classList.add('open')));
}
function closeSheet(fromPopState) {
  const w = document.querySelector('.sheet-wrap');
  if (!w || !ui.sheet) return;
  const sheet = w.querySelector('.sheet');
  sheet.classList.remove('dragging');
  sheet.style.transform = '';
  w.classList.remove('open');
  ui.sheet = null;
  if (!fromPopState && history.state && history.state.sheet) history.back();
  setTimeout(() => { if (!ui.sheet) document.getElementById('sheetRoot').innerHTML = ''; }, 400);
}
window.addEventListener('popstate', () => { if (ui.sheet) closeSheet(true); });

/* Drag the handle down to close the sheet. */
let drag = null;
document.addEventListener('pointerdown', ev => {
  if (!ev.target.closest('[data-grab]') || !ui.sheet) return;
  const sheet = document.querySelector('.sheet');
  drag = { y0: ev.clientY, dy: 0, sheet };
  sheet.classList.add('dragging');
  ev.target.setPointerCapture?.(ev.pointerId);
});
document.addEventListener('pointermove', ev => {
  if (!drag) return;
  drag.dy = Math.max(0, ev.clientY - drag.y0);
  drag.sheet.style.transform = `translateY(${drag.dy}px)`;
});
document.addEventListener('pointerup', () => {
  if (!drag) return;
  const { sheet, dy } = drag;
  drag = null;
  sheet.classList.remove('dragging');
  if (dy > 120) closeSheet();
  else sheet.style.transform = '';
});

const haptic = () => { try { navigator.vibrate && navigator.vibrate(12); } catch (e) { /* not supported */ } };
const NOTE_MAX = 40;
const AMOUNT_MAX = 999999999;
const isValidDate = s => /^\d{4}-\d{2}-\d{2}$/.test(s) && !isNaN(parse(s)) && s <= ymd(today());

function noteSuggestions(cat) {
  const used = [];
  sortedExpenses().forEach(e => { if (e.cat === cat && e.note && !used.includes(e.note)) used.push(e.note); });
  const base = L().notes[cat] || [];
  return [...used.slice(0, 3), ...base.filter(b => !used.includes(b))].slice(0, 6);
}

function sheetInner() {
  const s = ui.sheet, p = S.profile, td = ymd(today()), yd = ymd(addDays(today(), -1));
  const amt = Number(s.amount || 0);
  const c = catOf(s.cat);
  const others = sum(S.expenses.filter(e => e.date === s.date && e.id !== s.id), e => e.amount);
  const leftAfter = p.daily - others - amt;
  const isToday = s.date === td;
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '000', '0', 'back'];
  return `<div class="grab" data-grab aria-hidden="true"></div>
    <div class="sh-top"><h3 class="t-h3">${s.mode === 'edit' ? t('sheetEdit') : t('sheetAdd')}</h3>
      <div class="acts">${s.mode === 'edit' ? `<button class="icon-btn" data-act="delExp" aria-label="delete">${ic('trash')}</button>` : ''}<button class="icon-btn" data-act="closeSheet" aria-label="close">${ic('x')}</button></div></div>
    <div class="cats">${CATS.map(x => {
      const on = x.id === s.cat;
      return `<button class="cat ${on ? 'on' : ''}" data-act="cat" data-v="${x.id}"><span class="tile" style="background:${on ? x.color : x.bg};color:${on ? '#fff' : x.color}">${ic(x.icon)}</span>${t('cats.' + x.id)}</button>`;
    }).join('')}</div>
    <div class="amt t-display-sm num ${amt ? '' : 'ph'} ${ui.bump ? 'bump' : ''}" aria-live="polite">${money(amt)}<span class="caret"></span></div>
    <div class="quick">${c.quick.map(v => `<button class="num" data-act="quick" data-v="${v}">${fmt(v)}</button>`).join('')}</div>
    <label class="note-box">${ic('pencil')}<input id="noteIn" value="${esc(s.note)}" placeholder="${t('notePh')}" maxlength="${NOTE_MAX}" autocomplete="off" aria-label="${t('notePh')}"></label>
    <div class="chips scroll note-chips">${noteSuggestions(s.cat).map(n => `<button class="chip ${s.note === n ? 'on' : ''}" data-act="noteChip" data-v="${esc(n)}">${esc(n)}</button>`).join('')}</div>
    <div class="meta">
      <button class="chip ${s.date === td ? 'on' : ''}" data-act="dateChip" data-v="${td}">${t('today')}</button>
      <button class="chip ${s.date === yd ? 'on' : ''}" data-act="dateChip" data-v="${yd}">${t('yesterday')}</button>
      <input type="date" id="dateIn" value="${s.date}" max="${td}">
    </div>
    ${isToday ? `<div class="preview ${leftAfter < 0 ? 'neg' : ''}"><span>${leftAfter < 0 ? t('afterSaveOver') : t('afterSave')}</span><b class="num">${fmt(Math.abs(leftAfter))}</b></div>` : ''}
    <div class="keypad">${keys.map(k => `<button class="num ${k === '000' ? 'sm' : ''}" data-act="key" data-v="${k}" ${k === 'back' ? 'aria-label="delete digit"' : ''}>${k === 'back' ? ic('back') : k}</button>`).join('')}</div>
    <button class="btn btn-lime" data-act="saveExp" ${amt > 0 ? '' : 'disabled'}>${t('saveBtn')}</button>`;
}

function renderSheet() {
  const root = document.getElementById('sheetRoot');
  if (!ui.sheet) { root.innerHTML = ''; return; }
  let wrap = root.querySelector('.sheet-wrap');
  if (!wrap) {
    root.innerHTML = `<div class="sheet-wrap" data-act="backdrop"><div class="sheet" role="dialog" aria-modal="true"></div></div>`;
    wrap = root.querySelector('.sheet-wrap');
  }
  const sheet = wrap.querySelector('.sheet');
  const top = sheet.scrollTop;
  sheet.innerHTML = sheetInner();
  sheet.scrollTop = top;
}

function saveExpense() {
  const s = ui.sheet;
  if (!s) return; // sheet already closing: ignore a second tap so the expense is not saved twice
  const amount = Number(s.amount || 0);
  if (!Number.isInteger(amount) || amount <= 0 || amount > AMOUNT_MAX) return;
  if (!isValidDate(s.date)) { toast(t('badDate')); return; }
  const note = s.note.trim().slice(0, NOTE_MAX);
  if (s.mode === 'edit') {
    const e = S.expenses.find(x => x.id === s.id);
    const before = { ...e };
    Object.assign(e, { amount, cat: s.cat, note, date: s.date });
    ui.undo = { type: 'edit', before };
    toast(t('toastUpdated'), true);
  } else {
    const e = { id: uid(), amount, cat: s.cat, note, date: s.date, ts: Date.now() };
    S.expenses.push(e);
    ui.undo = { type: 'add', id: e.id };
    toast(t('toastAdded'), true);
  }
  save();
  haptic();
  closeSheet();
  render();
}

function deleteExpense() {
  if (!ui.sheet) return;
  const idx = S.expenses.findIndex(x => x.id === ui.sheet.id);
  if (idx < 0) return;
  ui.undo = { type: 'delete', item: S.expenses[idx] };
  S.expenses.splice(idx, 1);
  save();
  closeSheet();
  render();
  toast(t('toastDeleted'), true);
}

function undo() {
  const u = ui.undo;
  if (!u) return;
  if (u.type === 'add') S.expenses = S.expenses.filter(e => e.id !== u.id);
  if (u.type === 'delete') S.expenses.push(u.item);
  if (u.type === 'edit') { const i = S.expenses.findIndex(e => e.id === u.before.id); if (i >= 0) S.expenses[i] = u.before; }
  ui.undo = null;
  save();
  render();
  hideToast();
}

/**
 * CSV for spreadsheet apps. Cells that start with = + - @ (or tab/CR) are prefixed with an apostrophe
 * so Excel/Sheets show them as text instead of running them as formulas (CSV injection).
 */
function csvCell(v) {
  let s = String(v ?? '');
  if (typeof v !== 'number' && /^[=+\-@\t\r]/.test(s)) s = "'" + s;
  return `"${s.replace(/"/g, '""')}"`;
}
function toCSV(list) {
  const head = S.lang === 'ko' ? ['날짜', '카테고리', '금액', '메모'] : ['date', 'category', 'amount', 'note'];
  return [head, ...list.map(e => [e.date, t('cats.' + e.cat), e.amount, e.note || ''])]
    .map(r => r.map(csvCell).join(',')).join('\r\n');
}

/* ---------------- toast ---------------- */
let toastTimer;
function toast(msg, withUndo) {
  const el = document.getElementById('toast');
  el.innerHTML = `<div class="toast-in"><span>${esc(msg)}</span>${withUndo ? `<button data-act="undo">${t('undo')}</button>` : ''}</div>`;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(hideToast, 4000);
}
function hideToast() { document.getElementById('toast').classList.remove('show'); }

/* ---------------- animation ---------------- */
function tween(el, from, to, ms = 700) {
  const t0 = performance.now();
  const step = now => {
    const k = Math.min(1, (now - t0) / ms), e = 1 - Math.pow(1 - k, 3);
    el.innerHTML = money(Math.round(from + (to - from) * e));
    if (k < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* ---------------- render ---------------- */
function render() {
  document.documentElement.lang = S.lang;
  const app = document.getElementById('app');
  if (!S.setupDone) {
    app.innerHTML = onboardingHTML();
    const cu = document.getElementById('countup');
    if (cu) tween(cu, 0, Number(cu.dataset.to), 1100);
    return;
  }
  app.innerHTML = mainHTML();
  const hero = document.getElementById('heroAmt');
  if (hero) {
    const v = Number(hero.dataset.v);
    if (ui.prevLeft !== null && ui.prevLeft !== v) tween(hero, ui.prevLeft, v);
    ui.prevLeft = v;
  }
}

function rerenderStep() {
  if (ui.editStep !== null) {
    const body = document.getElementById('editBody');
    const top = body.parentElement.scrollTop;
    body.innerHTML = stepBody(STEPS[ui.editStep], true);
    body.parentElement.scrollTop = top;
  } else {
    const y = window.scrollY;
    render();
    document.querySelector('.ob-body')?.classList.remove('step-anim');
    window.scrollTo(0, y);
  }
  updateLive();
}

function updateLive() {
  const k = ui.editStep !== null ? STEPS[ui.editStep] : STEPS[ui.step];
  const btn = document.getElementById('nextBtn');
  if (btn && ui.draft) btn.disabled = !stepValid(k);
  const ft = document.getElementById('fixedTotal');
  if (ft) ft.textContent = fmt(sum(ui.draft.fixed, f => f.amount));
}

/* ---------------- demo data ---------------- */
function loadDemo() {
  const td = today();
  const from = addDays(td, -10);
  const ko = S.lang === 'ko';
  const pick = k => FIXED_PRESETS.flatMap(g => g.items).find(i => i.k === k);
  const fixed = ['rent', 'phone', 'net', 'netflix', 'youtube', 'hair', 'gym'].map(k => {
    const p = pick(k);
    return { id: uid(), key: k, name: p[S.lang], amount: p.amt, day: null };
  });
  const draft = {
    balance: 1750000, salary: 2900000, payday: addDays(td, 18).getDate(),
    incoming: [{ id: uid(), key: 'resale', name: ko ? '중고 판매' : 'Resale', amount: 80000, date: ymd(addDays(td, 3)) }],
    fixed,
    debts: [{ id: uid(), key: 'student', name: ko ? '학자금 대출' : 'Student loan', monthly: 150000, remaining: 4200000 }],
    savings: 300000
  };
  commitProfile(draft, from);
  const N = L().notes;
  const plan = [
    [-10, 'food', 11000, N.food[0]], [-10, 'coffee', 4500, N.coffee[1]],
    [-9, 'transport', 1500, N.transport[0]], [-9, 'food', 14900, N.food[2]],
    [-8, 'groceries', 32000, N.groceries[0]],
    [-7, 'coffee', 6000, N.coffee[3]], [-7, 'food', 9000, N.food[0]],
    [-6, 'shopping', 39000, N.shopping[0]],
    [-5, 'food', 12000, N.food[1]], [-5, 'coffee', 2000, N.coffee[2]],
    [-4, 'other', 2990, N.other[0]],
    [-3, 'food', 8500, N.food[0]], [-3, 'transport', 4800, N.transport[2]],
    [-2, 'coffee', 4500, N.coffee[0]], [-2, 'food', 16000, N.food[1]],
    [0, 'coffee', 4500, N.coffee[1]], [0, 'food', 9000, N.food[0]]
  ];
  S.expenses = plan.map(([off, cat, amount, note], i) => {
    const d = addDays(td, off);
    const ts = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 9 + (i % 3) * 4, (i * 17) % 60).getTime();
    return { id: uid(), cat, amount, note, date: ymd(d), ts };
  });
  S.setupDone = true;
  ui.tab = 'today';
  save();
}

/* ---------------- events ---------------- */
document.addEventListener('click', ev => {
  const el = ev.target.closest('[data-act]');
  if (!el) return;
  const act = el.dataset.act, v = el.dataset.v;
  if (act === 'backdrop' && ev.target !== el) return;

  switch (act) {
    case 'lang':
      S.lang = v; save(); render(); if (ui.sheet) renderSheet(); break;
    case 'start':
      ui.draft = newDraft(); ui.step = 1; render(); break;
    case 'demo':
      loadDemo(); render(); break;
    case 'obNext':
      if (stepValid(STEPS[ui.step])) { ui.step++; render(); window.scrollTo(0, 0); } break;
    case 'noneNext':
      ui.draft.incoming = []; ui.step++; render(); window.scrollTo(0, 0); break;
    case 'skipNext':
      if (STEPS[ui.step] === 'savings') ui.draft.savings = 0;
      ui.step++; render(); window.scrollTo(0, 0); break;
    case 'obBack':
      ui.step = Math.max(0, ui.step - 1); render(); window.scrollTo(0, 0); break;
    case 'payday':
      ui.draft.payday = Number(v); rerenderStep(); break;
    case 'preset': {
      const list = el.dataset.list, k = el.dataset.k;
      const arr = ui.draft[list];
      const i = arr.findIndex(x => x.key === k);
      if (i >= 0) arr.splice(i, 1);
      else {
        const src = list === 'fixed' ? FIXED_PRESETS.flatMap(g => g.items) : list === 'debts' ? DEBT_PRESETS : EXTRA_PRESETS;
        const p = src.find(x => x.k === k);
        const item = { id: uid(), key: k, name: p[S.lang] };
        if (list === 'fixed') Object.assign(item, { amount: p.amt, day: null });
        if (list === 'incoming') Object.assign(item, { amount: null, date: '' });
        if (list === 'debts') Object.assign(item, { monthly: null, remaining: null });
        arr.push(item);
      }
      if (list === 'debts') ui.debtFlash = false;
      rerenderStep(); break;
    }
    case 'custom': {
      const list = el.dataset.list;
      const item = { id: uid(), key: null, name: '' };
      if (list === 'fixed') Object.assign(item, { amount: null, day: null });
      if (list === 'incoming') Object.assign(item, { amount: null, date: '' });
      if (list === 'debts') Object.assign(item, { monthly: null, remaining: null });
      ui.draft[list].push(item);
      rerenderStep();
      const inputs = document.querySelectorAll('.ri-name');
      inputs[inputs.length - 1]?.focus();
      break;
    }
    case 'rmItem':
      ui.draft[el.dataset.list] = ui.draft[el.dataset.list].filter(x => x.id !== el.dataset.id); rerenderStep(); break;
    case 'noDebt':
      ui.draft.debts = []; ui.debtFlash = true; rerenderStep();
      if (ui.editStep === null) setTimeout(() => { if (STEPS[ui.step] === 'debts' && ui.debtFlash) { ui.step++; render(); window.scrollTo(0, 0); } }, 650);
      break;
    case 'savePick':
      ui.draft.savings = Number(v); rerenderStep(); break;
    case 'finish':
      commitProfile(ui.draft); S.setupDone = true; ui.tab = 'today'; ui.prevLeft = null; save(); render(); window.scrollTo(0, 0); break;

    case 'tab':
      hideToast(); ui.tab = v; render(); window.scrollTo(0, 0); break;
    case 'priv':
      toast(t('privToast')); break;
    case 'openAdd':
      openSheet(null); break;
    case 'openEdit':
      openSheet(S.expenses.find(e => e.id === el.dataset.id)); break;
    case 'closeSheet':
    case 'backdrop':
      closeSheet(); break;
    case 'cat':
      ui.sheet.cat = v; renderSheet(); break;
    case 'key': {
      let a = ui.sheet.amount;
      if (v === 'back') a = a.slice(0, -1);
      else if (a.length < 9) a = (a + v).replace(/^0+/, '');
      ui.sheet.amount = a.slice(0, 9);
      ui.bump = true; renderSheet(); ui.bump = false; break;
    }
    case 'quick':
      ui.sheet.amount = v; ui.bump = true; renderSheet(); ui.bump = false; break;
    case 'noteChip':
      ui.sheet.note = ui.sheet.note === v ? '' : v; renderSheet(); break;
    case 'dateChip':
      ui.sheet.date = v; renderSheet(); break;
    case 'saveExp':
      saveExpense(); break;
    case 'delExp':
      deleteExpense(); break;
    case 'undo':
      undo(); break;

    case 'histMonth': {
      const [y, m] = ui.histMonth.split('-').map(Number);
      const d = new Date(y, m - 1 + Number(v), 1);
      ui.histMonth = ymd(d).slice(0, 7); ui.histDay = null; render(); break;
    }
    case 'histDay':
      ui.histDay = ui.histDay === v ? null : v; render(); break;
    case 'histCat':
      ui.histCat = v; render(); break;

    case 'edit': {
      ui.draft = JSON.parse(JSON.stringify(S.profile));
      ui.draft.balance = estBalance();
      ui.editStep = Number(el.dataset.step);
      hideToast(); render(); break;
    }
    case 'editClose':
      ui.editStep = null; ui.draft = null; render(); break;
    case 'editSave':
      commitProfile(ui.draft); ui.editStep = null; ui.draft = null; save(); render(); toast(t('toastSaved')); break;
    case 'export': {
      const csv = toCSV(sortedExpenses());
      const url = URL.createObjectURL(new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' }));
      const a = document.createElement('a');
      a.href = url;
      a.download = `daypocket-${ymd(today())}.csv`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      toast(t('exported'));
      break;
    }
    case 'reset':
      if (confirm(t('resetConfirm'))) {
        const lang = S.lang; S = fresh(); S.lang = lang; save();
        Object.assign(ui, { tab: 'today', step: 0, draft: null, editStep: null, prevLeft: null });
        render();
      }
      break;
  }
});

document.addEventListener('input', ev => {
  const el = ev.target;
  if (el.id === 'noteIn' && ui.sheet) { ui.sheet.note = el.value; return; }
  if (el.id === 'dateIn' && ui.sheet) { if (el.value) { ui.sheet.date = el.value; renderSheet(); } return; }
  if (el.id === 'histSearch') {
    // Update only the list so the input keeps focus and Korean IME composition is not interrupted.
    ui.histQuery = el.value;
    document.getElementById('histList').innerHTML = historyListHTML();
    return;
  }
  const b = el.dataset.bind;
  if (!b || !ui.draft) return;
  let v = el.value;
  if ('money' in el.dataset) {
    const digits = v.replace(/\D/g, '').slice(0, 12);
    v = digits === '' ? null : Number(digits);
    el.value = digits === '' ? '' : v.toLocaleString('ko-KR');
  } else if ('int' in el.dataset) {
    const d = v.replace(/\D/g, '').slice(0, 2);
    v = d === '' ? null : Math.min(31, Math.max(1, Number(d)));
    el.value = v ?? '';
  }
  setPath(ui.draft, b, v);
  updateLive();
});

document.addEventListener('keydown', ev => {
  if (ev.key === 'Escape' && ui.sheet) closeSheet();
  else if (ev.key === 'Escape' && ui.editStep !== null) { ui.editStep = null; ui.draft = null; render(); }
  if (ev.key === 'Enter' && ev.target.matches('[data-bind]') && !S.setupDone) document.getElementById('nextBtn')?.click();
});

render();
