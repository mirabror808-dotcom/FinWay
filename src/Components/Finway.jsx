import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  TrendingUp, TrendingDown, Wallet, PieChart, Bot, Gamepad2, Award, Calculator,
  Moon, Sun, LogOut, Plus, Trash2, CheckCircle, AlertCircle, Sparkles,
  ChevronRight, Target, ArrowUpRight, RefreshCw, BookOpen,
} from "lucide-react";
 
/* ============================ TRANSLATIONS ============================ */
const TRANSLATIONS = {
  UZ: {
    appName: "FinWay",
    tagline: "Sizning moliyaviy erkinlik va savodxonlik yo'lboshchingiz",
    firstName: "Ismingiz", lastName: "Familiyangiz", role: "Sizning maqomingiz",
    roleStudent: "O'quvchi / Talaba", rolePro: "Mutaxassis / Ishchi",
    roleFamily: "Oilaboshi", roleInvestor: "Boshlovchi Investor",
    enterApp: "Platformaga Kirish",
    dashboard: "Boshqaruv Paneli", budgetTracker: "Budjet va Xarajatlar",
    aiAdvisor: "FinWay AI Maslahatchi", simulator: "Erkinlik Simulyatori",
    quizHub: "Bilim va Testlar", calculators: "Kalkulyatorlar",
    totalBalance: "Jami Balans", monthlyIncome: "Oylik Daromad", monthlyExpense: "Oylik Xarajat",
    healthScore: "Salomatlik Balli",
    aiPromptPlaceholder: "FinWay AI'dan moliya haqida istalgan narsani so'rang...",
    askAi: "Yuborish",
    calcCompound: "Murakkab Foiz", calcLoan: "Kredit To'lovi", calcGoal: "Maqsad Muddati",
    gameTitle: "Moliyaviy Erkinlik Simulyatori",
    gameDesc: "Oylik qarorlar qabul qiling va 12 oyda qanday natijaga erishishingizni ko'ring!",
    restartGame: "Qayta Boshlash",
    quizTitle: "Moliyaviy Savodxonlik Testi",
    logout: "Chiqish", welcome: "Xush kelibsiz",
    income: "Kirim", expense: "Chiqim",
    recentTransactions: "Oxirgi Operatsiyalar",
    addTx: "Yangi Operatsiya Qo'shish", add: "Qo'shish", allTx: "Barcha Amallar",
    title: "Nomi", amount: "Mablag' (so'm)",
    lightMode: "Yorug' rejim", darkMode: "Qorong'u rejim",
  },
  EN: {
    appName: "FinWay",
    tagline: "Your Guide to Financial Freedom and Literacy",
    firstName: "First Name", lastName: "Last Name", role: "Your Current Role",
    roleStudent: "Student / Learner", rolePro: "Professional / Employee",
    roleFamily: "Head of Household", roleInvestor: "Novice Investor",
    enterApp: "Enter Platform",
    dashboard: "Dashboard", budgetTracker: "Budget & Expenses",
    aiAdvisor: "FinWay AI Advisor", simulator: "Freedom Simulator",
    quizHub: "Learning & Quizzes", calculators: "Calculators",
    totalBalance: "Total Balance", monthlyIncome: "Monthly Income", monthlyExpense: "Monthly Expense",
    healthScore: "Health Score",
    aiPromptPlaceholder: "Ask FinWay AI anything about finance, budgeting or investing...",
    askAi: "Send",
    calcCompound: "Compound Interest", calcLoan: "Loan EMI", calcGoal: "Goal Planner",
    gameTitle: "Financial Freedom Simulator",
    gameDesc: "Make smart monthly decisions and build net worth over 12 virtual months!",
    restartGame: "Restart Game",
    quizTitle: "Financial Literacy Quiz",
    logout: "Log Out", welcome: "Welcome",
    income: "Income", expense: "Expense",
    recentTransactions: "Recent Transactions",
    addTx: "Add Transaction", add: "Add", allTx: "All Transactions",
    title: "Title", amount: "Amount (UZS)",
    lightMode: "Light mode", darkMode: "Dark mode",
  },
  RU: {
    appName: "FinWay",
    tagline: "Ваш путеводитель по финансовой грамотности и свободе",
    firstName: "Имя", lastName: "Фамилия", role: "Ваш статус",
    roleStudent: "Ученик / Студент", rolePro: "Специалист / Работник",
    roleFamily: "Глава семьи", roleInvestor: "Начинающий инвестор",
    enterApp: "Войти в платформу",
    dashboard: "Главная Панель", budgetTracker: "Бюджет и Расходы",
    aiAdvisor: "FinWay ИИ Консультант", simulator: "Симулятор Свободы",
    quizHub: "Обучение и Тесты", calculators: "Калькуляторы",
    totalBalance: "Общий Баланс", monthlyIncome: "Месячный Доход", monthlyExpense: "Месячный Расход",
    healthScore: "Финансовое здоровье",
    aiPromptPlaceholder: "Задайте любой вопрос FinWay AI о финансах и инвестициях...",
    askAi: "Отправить",
    calcCompound: "Сложный Процент", calcLoan: "Расчет Кредита", calcGoal: "Планировщик Цели",
    gameTitle: "Симулятор Финансовой Свободы",
    gameDesc: "Принимайте решения каждый месяц и постройте капитал за 12 виртуальных месяцев!",
    restartGame: "Перезапустить",
    quizTitle: "Тест Финансовой Грамотности",
    logout: "Выйти", welcome: "Добро пожаловать",
    income: "Доход", expense: "Расход",
    recentTransactions: "Последние Операции",
    addTx: "Добавить операцию", add: "Добавить", allTx: "Все операции",
    title: "Название", amount: "Сумма (сум)",
    lightMode: "Светлая тема", darkMode: "Тёмная тема",
  },
};
 
const INCOME_CATS = ["Maosh", "Frilans", "Boshqa kirim"];
const EXPENSE_CATS = ["Oziq-ovqat", "Transport", "Kommunal", "Investitsiya", "Kiyim-kechak", "Boshqa"];
 
/* ============================ HELPERS ============================ */
const fmt = (n) => Math.round(Number(n) || 0).toLocaleString("ru-RU").replace(/\u00a0/g, " ");
 
function cardCls(dark) {
  return dark ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200";
}
function inputCls(dark) {
  return dark
    ? "bg-slate-800 border-slate-700 text-slate-100 focus:border-emerald-500"
    : "bg-slate-100 border-slate-300 text-slate-900 focus:border-emerald-500";
}
 
/* Offline fallback — AI server ishlamasa ham demo to'xtab qolmaydi */
function offlineAdvice(q, totals) {
  const s = q.toLowerCase();
  const sr = totals.income > 0 ? Math.round(((totals.income - totals.expense) / totals.income) * 100) : 0;
  if (s.includes("50/30/20"))
    return "50/30/20 qoidasi:\n• 50% — zarur xarajatlar (uy, oziq-ovqat, transport)\n• 30% — xohishlar (o'yin-kulgi, kiyim)\n• 20% — jamg'arma va investitsiya\nBirinchi bo'lib 20% ni alohida hisobga o'tkazing.";
  if (s.includes("yostiq") || s.includes("favqulodda"))
    return "Moliyaviy xavfsizlik yostig'i — 3–6 oylik majburiy xarajatlaringiz miqdoridagi zaxira.\n• Avval 1 oylik maqsad qo'ying\n• Maoshdan keyin darhol avtomatik o'tkazing\n• Uni faqat favqulodda holatda ishlating";
  if (s.includes("aksiya") || s.includes("depozit"))
    return "Depozit — barqaror, oldindan ma'lum foiz, xavf past.\nAksiya — kompaniya ulushi: daromad potensiali yuqori, lekin narx tushishi mumkin.\nBoshlovchilar uchun: avval zaxira va depozit, keyin kichik summalardan investitsiya.";
  if (s.includes("20%") || s.includes("tejash") || s.includes("jamg"))
    return `Hozirgi tejash darajangiz taxminan ${sr}%.\n• Maosh tushishi bilan 20% ni alohida hisobga o'tkazing\n• Har oy 3 ta eng katta xarajatni ko'rib chiqing\n• Kichik obunalarni bekor qiling`;
  return `Sizning joriy balansingiz ${fmt(totals.balance)} so'm, tejash darajasi ~${sr}%.\n• Xarajatlarni kategoriyalar bo'yicha yuriting\n• Kamida 20% jamg'aring\n• Qarz va kreditni daromadning 30% idan oshirmang`;
}
 
/* ============================ APP ============================ */
export default function App() {
  const [lang, setLang] = useState("UZ");
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [user, setUser] = useState(null);
 
  const [loginFirstName, setLoginFirstName] = useState("");
  const [loginLastName, setLoginLastName] = useState("");
  const [loginRole, setLoginRole] = useState("student");
 
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);
  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2800);
  };
  useEffect(() => () => clearTimeout(toastTimer.current), []);
 
  const t = TRANSLATIONS[lang] || TRANSLATIONS.UZ;
 
  const [transactions, setTransactions] = useState([
    { id: 1, title: "Oylik maosh", amount: 8000000, category: "Maosh", type: "income", date: "2026-10-01" },
    { id: 2, title: "Oziq-ovqat va bozor", amount: 1800000, category: "Oziq-ovqat", type: "expense", date: "2026-10-03" },
    { id: 3, title: "Kommunal va Internet", amount: 450000, category: "Kommunal", type: "expense", date: "2026-10-05" },
    { id: 4, title: "Frilans loyiha", amount: 2500000, category: "Frilans", type: "income", date: "2026-10-08" },
    { id: 5, title: "Aksiya va Obligatsiyalar", amount: 1000000, category: "Investitsiya", type: "expense", date: "2026-10-09" },
  ]);
 
  const [newTitle, setNewTitle] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newType, setNewType] = useState("expense");
  const [newCategory, setNewCategory] = useState("Transport");
 
  const changeType = (v) => {
    setNewType(v);
    setNewCategory(v === "income" ? INCOME_CATS[0] : EXPENSE_CATS[1]);
  };
 
  const totals = useMemo(() => {
    const income = transactions.filter((x) => x.type === "income").reduce((a, c) => a + c.amount, 0);
    const expense = transactions.filter((x) => x.type === "expense").reduce((a, c) => a + c.amount, 0);
    const balance = income - expense;
    const ratio = income > 0 ? (balance / income) * 100 : 0;
    let score = Math.round(ratio * 2.2 + 20);
    score = Math.min(100, Math.max(10, isNaN(score) ? 50 : score));
    return { income, expense, balance, score };
  }, [transactions]);
 
  const roleLabel = (r) =>
    ({ student: t.roleStudent, pro: t.rolePro, family: t.roleFamily, investor: t.roleInvestor }[r] || r);
 
  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginFirstName.trim() || !loginLastName.trim()) {
      showToast("Iltimos, ism va familiyangizni to'liq kiriting!", "error");
      return;
    }
    const u = {
      firstName: loginFirstName.trim(),
      lastName: loginLastName.trim(),
      role: loginRole,
      avatar: `${loginFirstName.trim().charAt(0)}${loginLastName.trim().charAt(0)}`.toUpperCase(),
    };
    setUser(u);
    showToast(`${t.welcome}, ${u.firstName} ${u.lastName}!`);
  };
 
  const handleAddTransaction = (e) => {
    e.preventDefault();
    const amt = parseFloat(newAmount);
    if (!newTitle.trim() || isNaN(amt) || amt <= 0) {
      showToast("Noto'g'ri ma'lumot kiritildi", "error");
      return;
    }
    setTransactions([
      { id: Date.now(), title: newTitle.trim(), amount: amt, category: newCategory, type: newType, date: new Date().toISOString().split("T")[0] },
      ...transactions,
    ]);
    setNewTitle("");
    setNewAmount("");
    showToast("Operatsiya muvaffaqiyatli qo'shildi!");
  };
 
  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter((x) => x.id !== id));
    showToast("Operatsiya o'chirildi", "info");
  };
 
  const themeBtn = (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="flex items-center space-x-1 hover:text-emerald-400 transition"
    >
      {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      <span>{darkMode ? t.lightMode : t.darkMode}</span>
    </button>
  );
 
  const langBtns = (
    <div className="flex space-x-2">
      {["UZ", "EN", "RU"].map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-2 py-1 rounded-md font-semibold transition ${lang === l ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "hover:text-slate-200"}`}
        >
          {l}
        </button>
      ))}
    </div>
  );
 
  const toastEl = toast && (
    <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-2xl shadow-2xl border backdrop-blur-md flex items-center space-x-3 ${toast.type === "error" ? "bg-red-500/20 border-red-500/50 text-red-300" : toast.type === "info" ? "bg-blue-500/20 border-blue-500/50 text-blue-300" : "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"}`}>
      {toast.type === "error" ? <AlertCircle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
      <span className="font-medium text-sm">{toast.msg}</span>
    </div>
  );
 
  /* ---------------- LOGIN ---------------- */
  if (!user) {
    return (
      <div className={`min-h-screen ${darkMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"} flex items-center justify-center p-4 transition-colors duration-300 font-sans`}>
        {toastEl}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
        </div>
 
        <div className={`w-full max-w-md p-8 rounded-3xl backdrop-blur-xl ${darkMode ? "bg-slate-900/80 border border-slate-800 shadow-2xl" : "bg-white/80 border border-slate-200 shadow-xl"} relative z-10`}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 shadow-lg shadow-emerald-500/30 mb-4">
              <Wallet className="w-8 h-8 text-slate-950" />
            </div>
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">{t.appName}</h1>
            <p className="text-sm text-slate-400 mt-2">{t.tagline}</p>
          </div>
 
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">{t.firstName}</label>
              <input type="text" required value={loginFirstName} onChange={(e) => setLoginFirstName(e.target.value)} placeholder="Sardor"
                className={`w-full px-4 py-3 rounded-xl outline-none transition border ${inputCls(darkMode)}`} />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">{t.lastName}</label>
              <input type="text" required value={loginLastName} onChange={(e) => setLoginLastName(e.target.value)} placeholder="Rahimov"
                className={`w-full px-4 py-3 rounded-xl outline-none transition border ${inputCls(darkMode)}`} />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">{t.role}</label>
              <select value={loginRole} onChange={(e) => setLoginRole(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl outline-none transition border ${inputCls(darkMode)}`}>
                <option value="student">{t.roleStudent}</option>
                <option value="pro">{t.rolePro}</option>
                <option value="family">{t.roleFamily}</option>
                <option value="investor">{t.roleInvestor}</option>
              </select>
            </div>
            <button type="submit"
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-emerald-500/25 transition active:scale-95 flex items-center justify-center space-x-2">
              <span>{t.enterApp}</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </form>
 
          <div className="mt-8 pt-6 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
            {themeBtn}
            {langBtns}
          </div>
        </div>
      </div>
    );
  }
 
  /* ---------------- MAIN ---------------- */
  const navItems = [
    { id: "dashboard", label: t.dashboard, icon: PieChart },
    { id: "budget", label: t.budgetTracker, icon: Wallet },
    { id: "ai", label: t.aiAdvisor, icon: Bot, badge: "AI" },
    { id: "simulator", label: t.simulator, icon: Gamepad2 },
    { id: "quiz", label: t.quizHub, icon: Award },
    { id: "calculators", label: t.calculators, icon: Calculator },
  ];
 
  return (
    <div className={`min-h-screen ${darkMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"} transition-colors duration-300 font-sans flex flex-col md:flex-row`}>
      {toastEl}
 
      <aside className={`w-full md:w-72 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r ${darkMode ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200"} shrink-0`}>
        <div>
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Wallet className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <span className="text-xl font-black bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">FinWay</span>
              <span className="text-[10px] block font-semibold uppercase tracking-widest text-emerald-500">Hackathon Edition</span>
            </div>
          </div>
 
          <div className={`p-4 rounded-2xl mb-8 flex items-center space-x-3 border ${darkMode ? "bg-slate-800/40 border-slate-800" : "bg-slate-100 border-slate-200"}`}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-500 text-slate-950 font-extrabold flex items-center justify-center shadow">{user.avatar}</div>
            <div className="overflow-hidden">
              <p className="font-bold text-sm truncate">{user.firstName} {user.lastName}</p>
              <p className="text-xs text-slate-400 truncate">{roleLabel(user.role)}</p>
            </div>
          </div>
 
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button key={item.id} onClick={() => setActiveTab(item.id)}
                  className={`w-full px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-between transition ${active ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md shadow-emerald-500/20" : darkMode ? "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"}`}>
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${active ? "bg-slate-950 text-emerald-400" : "bg-emerald-500/20 text-emerald-400"}`}>{item.badge}</span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
 
        <div className="pt-6 mt-6 border-t border-slate-800/80 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            {themeBtn}
            {langBtns}
          </div>
          <button onClick={() => { setUser(null); setActiveTab("dashboard"); }}
            className="w-full py-2.5 px-4 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition text-sm font-semibold flex items-center justify-center space-x-2">
            <LogOut className="w-4 h-4" />
            <span>{t.logout}</span>
          </button>
        </div>
      </aside>
 
      <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
        {activeTab === "dashboard" && (
          <DashboardView t={t} dark={darkMode} user={user} totals={totals} transactions={transactions} setActiveTab={setActiveTab} />
        )}
        {activeTab === "budget" && (
          <BudgetView t={t} dark={darkMode} transactions={transactions} totals={totals}
            onAdd={handleAddTransaction} onDelete={handleDeleteTransaction}
            title={newTitle} setTitle={setNewTitle} amount={newAmount} setAmount={setNewAmount}
            category={newCategory} setCategory={setNewCategory} type={newType} setType={changeType} />
        )}
        {activeTab === "ai" && <AIAdvisorView t={t} dark={darkMode} user={user} totals={totals} roleLabel={roleLabel} />}
        {activeTab === "simulator" && <SimulatorView t={t} dark={darkMode} showToast={showToast} />}
        {activeTab === "quiz" && <QuizView t={t} dark={darkMode} showToast={showToast} />}
        {activeTab === "calculators" && <CalculatorsView t={t} dark={darkMode} />}
      </main>
    </div>
  );
}
 
/* ============================ DASHBOARD ============================ */
function DashboardView({ t, dark, user, totals, transactions, setActiveTab }) {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="p-6 md:p-8 rounded-3xl relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-slate-950 shadow-2xl">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block px-3 py-1 rounded-full bg-slate-950/20 text-xs font-bold uppercase tracking-wider mb-3">FinWay Dashboard</span>
          <h2 className="text-2xl md:text-4xl font-extrabold mb-2">{t.welcome}, {user.firstName}! 👋</h2>
          <p className="text-slate-900 font-medium text-sm md:text-base">
            {t.healthScore}: <span className="font-black underline">{totals.score}/100</span>
          </p>
        </div>
        <Sparkles className="absolute right-6 bottom-6 w-32 h-32 text-slate-950/10 pointer-events-none" />
      </div>
 
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard dark={dark} label={t.totalBalance} icon={<Wallet className="w-5 h-5" />} color="emerald" value={`${fmt(totals.balance)} so'm`} />
        <StatCard dark={dark} label={t.monthlyIncome} icon={<TrendingUp className="w-5 h-5" />} color="teal" value={`+${fmt(totals.income)} so'm`} />
        <StatCard dark={dark} label={t.monthlyExpense} icon={<TrendingDown className="w-5 h-5" />} color="rose" value={`-${fmt(totals.expense)} so'm`} />
        <div className={`p-6 rounded-2xl border ${cardCls(dark)}`}>
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{t.healthScore}</span>
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400"><Target className="w-5 h-5" /></div>
          </div>
          <p className="text-2xl font-black text-cyan-400">{totals.score} / 100</p>
          <div className="w-full bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-400 to-cyan-400 h-full transition-all duration-500" style={{ width: `${totals.score}%` }} />
          </div>
        </div>
      </div>
 
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={`p-6 rounded-3xl border ${cardCls(dark)} lg:col-span-2 flex flex-col justify-between`}>
          <div>
            <div className="flex items-center space-x-2 text-emerald-400 mb-3">
              <Bot className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">{t.aiAdvisor}</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Moliyaviy strategiyangiz haqida so'rang</h3>
            <p className="text-slate-400 text-sm mb-6">AI sizning kirim va chiqimlaringiz asosida tejash va investitsiya rejalarini tuzib beradi.</p>
          </div>
          <button onClick={() => setActiveTab("ai")}
            className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20 hover:opacity-90 transition">
            <span>{t.aiAdvisor}</span>
            <ArrowUpRight className="w-5 h-5" />
          </button>
        </div>
 
        <div className="p-6 rounded-3xl border bg-gradient-to-br from-slate-900 to-slate-950 border-emerald-500/30 text-slate-100 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold mb-3 border border-emerald-500/30">
              <Gamepad2 className="w-4 h-4" /><span>Simulyator</span>
            </div>
            <h3 className="text-xl font-bold mb-2">12 Oylik Erkinlik Sinovi</h3>
            <p className="text-slate-400 text-sm mb-4">Real hayotiy tanlovlar orqali 12 oy davomida kapitalingizni ko'paytiring!</p>
          </div>
          <button onClick={() => setActiveTab("simulator")}
            className="w-full py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/30 font-bold flex items-center justify-center space-x-2 transition">
            <span>{t.simulator}</span><ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
 
      <div className={`p-6 rounded-3xl border ${cardCls(dark)}`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold">{t.recentTransactions}</h3>
          <button onClick={() => setActiveTab("budget")} className="text-xs font-bold text-emerald-400 hover:underline flex items-center space-x-1">
            <span>{t.allTx}</span><ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-3">
          {transactions.slice(0, 4).map((item) => <TxRow key={item.id} item={item} dark={dark} />)}
        </div>
      </div>
    </div>
  );
}
 
function StatCard({ dark, label, icon, color, value }) {
  const colors = {
    emerald: ["bg-emerald-500/10 text-emerald-400", "text-emerald-400"],
    teal: ["bg-teal-500/10 text-teal-400", "text-teal-400"],
    rose: ["bg-rose-500/10 text-rose-400", "text-rose-400"],
  }[color];
  return (
    <div className={`p-6 rounded-2xl border ${cardCls(dark)}`}>
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{label}</span>
        <div className={`p-2.5 rounded-xl ${colors[0]}`}>{icon}</div>
      </div>
      <p className={`text-2xl font-black ${colors[1]}`}>{value}</p>
    </div>
  );
}
 
function TxRow({ item, dark, onDelete }) {
  const inc = item.type === "income";
  return (
    <div className={`p-4 rounded-2xl flex items-center justify-between border ${dark ? "bg-slate-800/30 border-slate-800/80" : "bg-slate-50 border-slate-200"}`}>
      <div className="flex items-center space-x-3 min-w-0">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${inc ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"}`}>
          {inc ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
        </div>
        <div className="min-w-0">
          <p className="font-bold text-sm truncate">{item.title}</p>
          <p className="text-xs text-slate-400">{item.category} • {item.date}</p>
        </div>
      </div>
      <div className="flex items-center space-x-3 shrink-0">
        <span className={`font-black text-sm ${inc ? "text-emerald-400" : "text-rose-400"}`}>
          {inc ? "+" : "-"}{fmt(item.amount)} so'm
        </span>
        {onDelete && (
          <button onClick={() => onDelete(item.id)} className="p-2 text-slate-500 hover:text-rose-400 transition" title="O'chirish">
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
 
/* ============================ BUDGET ============================ */
function BudgetView({ t, dark, transactions, totals, onAdd, onDelete, title, setTitle, amount, setAmount, category, setCategory, type, setType }) {
  const cats = type === "income" ? INCOME_CATS : EXPENSE_CATS;
  const pct = totals.income > 0 ? Math.round((totals.balance / totals.income) * 100) : 0;
  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h2 className="text-2xl font-black mb-1">{t.budgetTracker}</h2>
        <p className="text-slate-400 text-sm">Xarajatlar va daromadlaringizni nazorat qiling</p>
      </div>
 
      <div className={`p-6 rounded-3xl border ${cardCls(dark)}`}>
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-bold">Oylik Tejash Maqsadi (50/30/20: kamida 20%)</span>
          <span className={`text-xs font-extrabold ${pct >= 20 ? "text-emerald-400" : "text-amber-400"}`}>{pct}%</span>
        </div>
        <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-500" style={{ width: `${Math.min(100, Math.max(0, pct))}%` }} />
        </div>
      </div>
 
      <div className={`p-6 rounded-3xl border ${cardCls(dark)}`}>
        <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
          <Plus className="w-5 h-5 text-emerald-400" /><span>{t.addTx}</span>
        </h3>
        <form onSubmit={onAdd} className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <input type="text" required placeholder={t.title} value={title} onChange={(e) => setTitle(e.target.value)}
            className={`px-4 py-3 rounded-xl outline-none text-sm border ${inputCls(dark)}`} />
          <input type="number" required min="1" placeholder={t.amount} value={amount} onChange={(e) => setAmount(e.target.value)}
            className={`px-4 py-3 rounded-xl outline-none text-sm border ${inputCls(dark)}`} />
          <select value={type} onChange={(e) => setType(e.target.value)} className={`px-4 py-3 rounded-xl outline-none text-sm border ${inputCls(dark)}`}>
            <option value="expense">{t.expense}</option>
            <option value="income">{t.income}</option>
          </select>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className={`px-4 py-3 rounded-xl outline-none text-sm border ${inputCls(dark)}`}>
            {cats.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <button type="submit" className="py-3 px-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold rounded-xl shadow-lg shadow-emerald-500/20 hover:opacity-90 transition">
            {t.add}
          </button>
        </form>
      </div>
 
      <div className={`p-6 rounded-3xl border ${cardCls(dark)}`}>
        <h3 className="text-lg font-bold mb-4">{t.allTx}</h3>
        <div className="space-y-3">
          {transactions.length === 0 && <p className="text-slate-400 text-sm">—</p>}
          {transactions.map((item) => <TxRow key={item.id} item={item} dark={dark} onDelete={onDelete} />)}
        </div>
      </div>
    </div>
  );
}
 
/* ============================ AI ADVISOR ============================ */
function AIAdvisorView({ t, dark, user, totals, roleLabel }) {
  const [messages, setMessages] = useState([
    {
      id: 1, sender: "ai",
      text: `Salom ${user.firstName}! Men FinWay AI — shaxsiy moliyaviy maslahatchingizman. Joriy sof balansingiz ${fmt(totals.balance)} so'm. Qanday yordam bera olaman?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);
 
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);
 
  const quickPrompts = [
    "Qanday qilib daromadimning 20% qismini tejasam bo'ladi?",
    "Aksiyalar va depozitlar orasidagi asosiy farq nimada?",
    "Moliyaviy xavfsizlik yostig'ini qanday shakllantirish kerak?",
    "50/30/20 qoidasi nima va uni qanday qo'llash mumkin?",
  ];
 
  const handleSend = async (queryText) => {
    const text = (queryText || input).trim();
    if (!text || loading) return;
    setMessages((p) => [...p, { id: Date.now(), sender: "user", text }]);
    if (!queryText) setInput("");
    setLoading(true);
 
    const system = `You are FinWay AI, an expert, encouraging financial advisor for youth, employees, and families in Uzbekistan.
User: ${user.firstName} ${user.lastName}, role: ${roleLabel(user.role)}.
Monthly income: ${totals.income} UZS, expenses: ${totals.expense} UZS, net balance: ${totals.balance} UZS, health score: ${totals.score}/100.
Reply concisely and actionably in the same language the user writes in (default Uzbek). Use short bullet points when helpful. Max ~150 words.`;
 
    let reply = "";
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, system }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.text) reply = data.text;
    } catch (_) { /* fallback below */ }
 
    if (!reply) reply = offlineAdvice(text, totals);
 
    setMessages((p) => [...p, { id: Date.now() + 1, sender: "ai", text: reply }]);
    setLoading(false);
  };
 
  return (
    <div className="space-y-6 animate-fadeIn h-[calc(100vh-8rem)] min-h-[520px] flex flex-col">
      <div>
        <h2 className="text-2xl font-black mb-1 flex items-center space-x-2">
          <Bot className="w-7 h-7 text-emerald-400" /><span>{t.aiAdvisor}</span>
        </h2>
        <p className="text-slate-400 text-sm">Shaxsiy moliya tahlili va maslahatlar</p>
      </div>
 
      <div className={`flex-1 p-6 rounded-3xl border overflow-y-auto space-y-4 ${cardCls(dark)}`}>
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-xl p-4 rounded-2xl text-sm leading-relaxed ${m.sender === "user" ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-medium rounded-tr-none" : dark ? "bg-slate-800 border border-slate-700 text-slate-100 rounded-tl-none" : "bg-slate-100 border border-slate-200 text-slate-900 rounded-tl-none"}`}>
              <p className="whitespace-pre-line">{m.text}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className={`p-4 rounded-2xl text-xs font-semibold flex items-center space-x-2 ${dark ? "bg-slate-800 text-emerald-400" : "bg-slate-100 text-emerald-600"}`}>
              <RefreshCw className="w-4 h-4 animate-spin" /><span>FinWay AI javob yozmoqda...</span>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>
 
      <div className="flex flex-wrap gap-2">
        {quickPrompts.map((qp) => (
          <button key={qp} onClick={() => handleSend(qp)} disabled={loading}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition disabled:opacity-50 ${dark ? "bg-slate-900 border-slate-800 text-slate-300 hover:border-emerald-500/50 hover:text-emerald-400" : "bg-white border-slate-200 text-slate-700 hover:border-emerald-500"}`}>
            ⚡ {qp}
          </button>
        ))}
      </div>
 
      <div className="flex items-center space-x-3">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()} placeholder={t.aiPromptPlaceholder}
          className={`flex-1 px-5 py-4 rounded-2xl outline-none text-sm border ${dark ? "bg-slate-900 border-slate-800 text-slate-100 focus:border-emerald-500" : "bg-white border-slate-200 text-slate-900 focus:border-emerald-500"}`} />
        <button onClick={() => handleSend()} disabled={loading}
          className="py-4 px-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90 disabled:opacity-50 text-slate-950 font-bold rounded-2xl shadow-lg shadow-emerald-500/20 transition">
          {t.askAi}
        </button>
      </div>
    </div>
  );
}
 
/* ============================ SIMULATOR ============================ */
const SCENARIOS = [
  { title: "Birinchi maosh va bonus", desc: "Siz 3 000 000 so'm oldingiz. Uni qanday taqsimlaysiz?", choices: [
    { text: "Yangi telefonni muddatli to'lovga olish", cap: -500000, know: -5, msg: "Muddatli to'lov xarajatni oshirdi." },
    { text: "Moliya kitobi olish va 30% tejash", cap: 900000, know: 20, msg: "Ajoyib! Bilim va jamg'arma oshdi." },
    { text: "Do'stlar bilan hammasini sarflash", cap: -1000000, know: -10, msg: "Barcha pul sarflandi!" } ] },
  { title: "Kutilmagan xarajat", desc: "Maishiy texnika buzildi, ta'mirga pul kerak.", choices: [
    { text: "Favqulodda jamg'armadan to'lash", cap: -400000, know: 10, msg: "To'g'ri! Qarzga kirmadingiz." },
    { text: "Yuqori foizli mikrokredit olish", cap: -900000, know: -15, msg: "Mikrokredit foizi kapitalni qisqartirdi." } ] },
  { title: "Investitsiya imkoniyati", desc: "Barqaror obligatsiyalar taklif qilinmoqda.", choices: [
    { text: "Kapitalning 40% ini obligatsiyaga qo'yish", cap: 600000, know: 15, msg: "Passiv daromad kela boshladi!" },
    { text: "Tez boyish sxemasiga (piramida) kirish", cap: -1200000, know: -20, msg: "Piramida yopildi, pul yo'qoldi!" } ] },
  { title: "Chegirma mavsumi", desc: "Katta aksiya! Hamma narsa 50% arzon.", choices: [
    { text: "Faqat rejadagi narsani sotib olish", cap: -150000, know: 10, msg: "Intizom — eng yaxshi tejash." },
    { text: "Kerak bo'lmasa ham ko'p xarid qilish", cap: -700000, know: -10, msg: "Arzon bo'lsa ham keraksiz xarid — isrof." } ] },
  { title: "Qo'shimcha daromad", desc: "Frilans loyiha taklif qilindi.", choices: [
    { text: "Kechalari ishlab ko'nikma o'rganish", cap: 800000, know: 15, msg: "Yangi daromad manbai ochildi!" },
    { text: "Rad etish", cap: 0, know: 0, msg: "Imkoniyat qo'ldan ketdi." } ] },
  { title: "Do'st qarz so'radi", desc: "Yaqin do'stingiz 1 000 000 so'm qarz so'radi.", choices: [
    { text: "Imkon qadar qismini berish, yozib qo'yish", cap: -300000, know: 10, msg: "Chegara va hisob-kitob — to'g'ri yo'l." },
    { text: "Hamma jamg'armani berish", cap: -1000000, know: -10, msg: "Qaytmaslik xavfi katta edi." } ] },
  { title: "Depozit tanlash", desc: "Bank yillik 18% depozit taklif qilmoqda.", choices: [
    { text: "Zaxiradan ortiqcha qismni depozitga qo'yish", cap: 450000, know: 15, msg: "Foiz daromadi qo'shildi." },
    { text: "Pulni uyda saqlash", cap: -100000, know: -5, msg: "Inflyatsiya pulni yedi." } ] },
  { title: "Sug'urta", desc: "Sog'liq sug'urtasini rasmiylashtirish mumkin.", choices: [
    { text: "Sug'urta olish", cap: -200000, know: 10, msg: "Katta xavfdan himoyalandingiz." },
    { text: "Kerak emas", cap: -600000, know: -5, msg: "Kasallik katta xarajat keltirdi." } ] },
  { title: "Kredit kartasi", desc: "Bank limitli kredit karta taklif qildi.", choices: [
    { text: "Faqat imtiyozli davrda ishlatish", cap: 100000, know: 10, msg: "Foiz to'lamadingiz." },
    { text: "Limitgacha sarflash", cap: -800000, know: -15, msg: "Foiz va jarimalar yig'ildi." } ] },
  { title: "Ta'lim", desc: "Pullik moliya kursi mavjud.", choices: [
    { text: "Kursga yozilish", cap: -250000, know: 25, msg: "Bilim — eng yaxshi investitsiya." },
    { text: "Internetdan bepul o'rganish", cap: 0, know: 10, msg: "Bepul, lekin sekinroq." } ] },
  { title: "Byudjet tahlili", desc: "Oy oxirida xarajatlarni ko'rib chiqish vaqti.", choices: [
    { text: "Barcha xarajatni yozib, tahlil qilish", cap: 400000, know: 15, msg: "Keraksiz xarajatlar topildi." },
    { text: "E'tibor bermaslik", cap: -200000, know: -5, msg: "Pul qayoqqa ketganini bilmay qoldingiz." } ] },
  { title: "Yil yakuni", desc: "Oxirgi qaror: yil davomida to'plangan mablag'.", choices: [
    { text: "20% investitsiya, 20% zaxira, qolgani reja bo'yicha", cap: 700000, know: 15, msg: "Mukammal taqsimot!" },
    { text: "Hammasini bayramga sarflash", cap: -600000, know: -10, msg: "Yangi yil oldidan bo'sh qoldingiz." } ] },
];
 
function SimulatorView({ t, dark, showToast }) {
  const [month, setMonth] = useState(1);
  const [capital, setCapital] = useState(1000000);
  const [knowledge, setKnowledge] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const sc = SCENARIOS[month - 1];
 
  const choose = (c) => {
    setCapital((v) => v + c.cap);
    setKnowledge((v) => Math.min(100, Math.max(0, v + c.know)));
    showToast(c.msg, c.cap >= 0 ? "success" : "error");
    if (month >= SCENARIOS.length) setGameOver(true);
    else setMonth(month + 1);
  };
  const reset = () => { setMonth(1); setCapital(1000000); setKnowledge(30); setGameOver(false); };
 
  const grade = knowledge >= 80 ? "Investor Pro 🏆" : knowledge >= 50 ? "Tejamkor Master 🥈" : "Moliyaviy Boshlovchi 🥉";
 
  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-black mb-1 flex items-center space-x-2">
          <Gamepad2 className="w-7 h-7 text-emerald-400" /><span>{t.gameTitle}</span>
        </h2>
        <p className="text-slate-400 text-sm">{t.gameDesc}</p>
      </div>
 
      <div className="grid grid-cols-3 gap-4">
        <div className={`p-5 rounded-2xl border ${cardCls(dark)}`}>
          <span className="text-xs text-slate-400 font-bold uppercase">Bosqich</span>
          <p className="text-xl font-black text-emerald-400">{Math.min(month, 12)} / 12</p>
        </div>
        <div className={`p-5 rounded-2xl border ${cardCls(dark)}`}>
          <span className="text-xs text-slate-400 font-bold uppercase">Kapital</span>
          <p className="text-xl font-black text-teal-400">{fmt(capital)} so'm</p>
        </div>
        <div className={`p-5 rounded-2xl border ${cardCls(dark)}`}>
          <span className="text-xs text-slate-400 font-bold uppercase">Bilim</span>
          <p className="text-xl font-black text-cyan-400">{knowledge}%</p>
        </div>
      </div>
 
      {!gameOver ? (
        <div className={`p-8 rounded-3xl border ${cardCls(dark)} space-y-6`}>
          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase">{month}-oy</span>
            <h3 className="text-2xl font-bold mt-3 mb-2">{sc.title}</h3>
            <p className="text-slate-400 text-sm">{sc.desc}</p>
          </div>
          <div className="space-y-3 pt-4 border-t border-slate-800">
            {sc.choices.map((c) => (
              <button key={c.text} onClick={() => choose(c)}
                className={`w-full p-4 rounded-2xl text-left border font-semibold transition flex justify-between items-center ${dark ? "bg-slate-800/60 border-slate-700 hover:border-emerald-500" : "bg-slate-50 border-slate-200 hover:border-emerald-500"}`}>
                <span>{c.text}</span>
                <ChevronRight className="w-5 h-5 text-emerald-400 shrink-0 ml-2" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className={`p-8 rounded-3xl border text-center ${cardCls(dark)} space-y-5`}>
          <Award className="w-16 h-16 text-emerald-400 mx-auto" />
          <h3 className="text-3xl font-black">Simulyatsiya yakunlandi!</h3>
          <p className="text-slate-400">
            Yakuniy kapital: <span className="font-bold text-emerald-400">{fmt(capital)} so'm</span> · Bilim: <span className="font-bold text-cyan-400">{knowledge}%</span>
          </p>
          <p className="text-lg font-bold">{grade}</p>
          <button onClick={reset} className="py-3 px-8 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold rounded-2xl shadow-lg">{t.restartGame}</button>
        </div>
      )}
    </div>
  );
}
 
/* ============================ QUIZ ============================ */
const QUESTIONS = [
  { q: "Inflyatsiya nimani anglatadi?", options: ["Pulning xarid qobiliyati vaqt o'tishi bilan pasayishi", "Bankdagi pulning ko'payishi", "Valyuta kursining doimiy pastlashi"], correct: 0 },
  { q: "50/30/20 qoidasida 20% nimaga ajratiladi?", options: ["Oziq-ovqat va uy", "O'yin-kulgi va sayohat", "Jamg'arma va investitsiya"], correct: 2 },
  { q: "Murakkab foiz nima?", options: ["Faqat asosiy summaga foiz", "Foiz ustiga ham foiz hisoblanishi", "Kredit jarimasi"], correct: 1 },
  { q: "Favqulodda zaxira necha oylik xarajatga teng bo'lishi tavsiya etiladi?", options: ["1 haftalik", "3–6 oylik", "5 yillik"], correct: 1 },
  { q: "Qaysi biri 'tez boyish' piramidasining belgisi?", options: ["Kafolatlangan yuqori daromad va yangi a'zo jalb qilish", "Litsenziyalangan bank depoziti", "Aksiyani birjada sotib olish"], correct: 0 },
];
 
function QuizView({ t, dark, showToast }) {
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
 
  const answer = (idx) => {
    const ok = idx === QUESTIONS[i].correct;
    if (ok) { setScore((s) => s + 100); showToast("To'g'ri javob! +100", "success"); }
    else showToast("Noto'g'ri javob", "error");
    if (i < QUESTIONS.length - 1) setI(i + 1);
    else setDone(true);
  };
  const restart = () => { setI(0); setScore(0); setDone(false); };
  const max = QUESTIONS.length * 100;
  const badges = [
    { name: "Moliyaviy Boshlovchi", min: 100, color: "text-amber-400" },
    { name: "Tejamkor Master", min: 300, color: "text-teal-400" },
    { name: "Investor Pro", min: 500, color: "text-emerald-400" },
  ];
 
  return (
    <div className="space-y-8 animate-fadeIn max-w-3xl mx-auto">
      <div>
        <h2 className="text-2xl font-black mb-1 flex items-center space-x-2">
          <BookOpen className="w-7 h-7 text-emerald-400" /><span>{t.quizTitle}</span>
        </h2>
        <p className="text-slate-400 text-sm">Bilimingizni sinang va nishonlarni qo'lga kiriting</p>
      </div>
 
      <div className="grid grid-cols-3 gap-4">
        {badges.map((b) => {
          const got = score >= b.min;
          return (
            <div key={b.name} className={`p-4 rounded-2xl border text-center transition ${cardCls(dark)} ${got ? "" : "opacity-40"}`}>
              <Award className={`w-8 h-8 mx-auto mb-2 ${b.color}`} />
              <p className="text-xs font-bold">{b.name}</p>
            </div>
          );
        })}
      </div>
 
      {!done ? (
        <div className={`p-8 rounded-3xl border ${cardCls(dark)} space-y-6`}>
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase text-emerald-400">Savol {i + 1} / {QUESTIONS.length}</span>
            <span className="text-sm font-black">Ball: {score}</span>
          </div>
          <h3 className="text-xl font-bold">{QUESTIONS[i].q}</h3>
          <div className="space-y-3">
            {QUESTIONS[i].options.map((opt, k) => (
              <button key={opt} onClick={() => answer(k)}
                className={`w-full p-4 rounded-2xl text-left border font-medium transition ${dark ? "bg-slate-800/60 border-slate-700 hover:border-emerald-500" : "bg-slate-50 border-slate-200 hover:border-emerald-500"}`}>
                {opt}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className={`p-8 rounded-3xl border text-center ${cardCls(dark)} space-y-5`}>
          <Award className="w-16 h-16 text-emerald-400 mx-auto" />
          <h3 className="text-3xl font-black">Test yakunlandi!</h3>
          <p className="text-slate-400">Natija: <span className="font-bold text-emerald-400">{score} / {max}</span></p>
          <button onClick={restart} className="py-3 px-8 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold rounded-2xl shadow-lg">{t.restartGame}</button>
        </div>
      )}
    </div>
  );
}
 
/* ============================ CALCULATORS ============================ */
function NumField({ label, value, onChange, dark }) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase text-slate-400 mb-2">{label}</label>
      <input type="number" value={value} onChange={(e) => onChange(e.target.value)}
        className={`w-full p-4 rounded-xl outline-none border ${inputCls(dark)}`} />
    </div>
  );
}
 
function ResultBox({ rows }) {
  return (
    <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 space-y-3">
      {rows.map(([k, v, big], idx) => (
        <div key={k} className={`flex justify-between items-center ${big ? "text-lg font-black pt-2 border-t border-emerald-500/20" : "text-sm"}`}>
          <span className={big ? "" : "text-slate-400"}>{k}</span>
          <span className="font-bold text-emerald-400">{v}</span>
        </div>
      ))}
    </div>
  );
}
 
function CalculatorsView({ t, dark }) {
  const [tab, setTab] = useState("compound");
 
  const [p, setP] = useState(10000000);
  const [rate, setRate] = useState(18);
  const [years, setYears] = useState(3);
  const compound = useMemo(() => {
    const P = parseFloat(p) || 0, r = (parseFloat(rate) || 0) / 100, y = parseFloat(years) || 0;
    const total = P * Math.pow(1 + r, y);
    return { total, profit: total - P };
  }, [p, rate, years]);
 
  const [loan, setLoan] = useState(30000000);
  const [lrate, setLrate] = useState(24);
  const [months, setMonths] = useState(24);
  const loanRes = useMemo(() => {
    const P = parseFloat(loan) || 0, n = parseInt(months) || 0, r = (parseFloat(lrate) || 0) / 100 / 12;
    if (P <= 0 || n <= 0) return { emi: 0, total: 0, over: 0 };
    const emi = r === 0 ? P / n : (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return { emi, total: emi * n, over: emi * n - P };
  }, [loan, lrate, months]);
 
  const [goal, setGoal] = useState(50000000);
  const [save, setSave] = useState(2000000);
  const [grate, setGrate] = useState(15);
  const goalRes = useMemo(() => {
    const G = parseFloat(goal) || 0, S = parseFloat(save) || 0, r = (parseFloat(grate) || 0) / 100 / 12;
    if (G <= 0 || S <= 0) return { m: 0 };
    const m = r === 0 ? G / S : Math.log(1 + (G * r) / S) / Math.log(1 + r);
    return { m: Math.ceil(m) };
  }, [goal, save, grate]);
 
  const tabs = [["compound", t.calcCompound], ["loan", t.calcLoan], ["goal", t.calcGoal]];
 
  return (
    <div className="space-y-8 animate-fadeIn max-w-3xl mx-auto">
      <div>
        <h2 className="text-2xl font-black mb-1 flex items-center space-x-2">
          <Calculator className="w-7 h-7 text-emerald-400" /><span>{t.calculators}</span>
        </h2>
        <p className="text-slate-400 text-sm">Kelajakdagi daromad va to'lovlaringizni hisoblang</p>
      </div>
 
      <div className="flex space-x-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
        {tabs.map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)}
            className={`flex-1 py-3 text-xs font-bold rounded-xl transition ${tab === id ? "bg-emerald-500 text-slate-950 shadow" : "text-slate-400 hover:text-slate-200"}`}>
            {label}
          </button>
        ))}
      </div>
 
      <div className={`p-8 rounded-3xl border ${cardCls(dark)} space-y-6`}>
        {tab === "compound" && (<>
          <NumField dark={dark} label="Boshlang'ich sarmoya (so'm)" value={p} onChange={setP} />
          <NumField dark={dark} label="Yillik foiz (%)" value={rate} onChange={setRate} />
          <NumField dark={dark} label="Muddat (yil)" value={years} onChange={setYears} />
          <ResultBox rows={[["Sof foyda:", `+${fmt(compound.profit)} so'm`], ["Yakuniy summa:", `${fmt(compound.total)} so'm`, true]]} />
        </>)}
        {tab === "loan" && (<>
          <NumField dark={dark} label="Kredit summasi (so'm)" value={loan} onChange={setLoan} />
          <NumField dark={dark} label="Yillik foiz (%)" value={lrate} onChange={setLrate} />
          <NumField dark={dark} label="Muddat (oy)" value={months} onChange={setMonths} />
          <ResultBox rows={[["Ortiqcha to'lov (foiz):", `${fmt(loanRes.over)} so'm`], ["Jami to'lov:", `${fmt(loanRes.total)} so'm`], ["Oylik to'lov:", `${fmt(loanRes.emi)} so'm`, true]]} />
        </>)}
        {tab === "goal" && (<>
          <NumField dark={dark} label="Maqsad summasi (so'm)" value={goal} onChange={setGoal} />
          <NumField dark={dark} label="Oylik jamg'arma (so'm)" value={save} onChange={setSave} />
          <NumField dark={dark} label="Yillik foiz (%)" value={grate} onChange={setGrate} />
          <ResultBox rows={[["Taxminiy muddat:", `${goalRes.m} oy (~${(goalRes.m / 12).toFixed(1)} yil)`, true]]} />
        </>)}
      </div>
    </div>
  );
}