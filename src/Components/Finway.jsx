import React, { useState, useEffect, useMemo } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  PieChart,
  Bot,
  Gamepad2,
  Award,
  Calculator,
  Moon,
  Sun,
  Globe,
  LogOut,
  User,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  Sparkles,
  ChevronRight,
  ShieldAlert,
  Target,
  ArrowUpRight,
  RefreshCw,
  BookOpen,
  DollarSign
} from 'lucide-react';

const TRANSLATIONS = {
  UZ: {
    appName: "FinWay",
    tagline: "Sizning moliyaviy erkinlik va savodxonlik yo'lboshchingiz",
    loginTitle: "FinWay Platformasiga Xush Kelibsiz",
    loginDesc: "Moliyaviy kelajagingizni boshqarish uchun ismingiz va familiyangizni kiriting",
    firstName: "Ismingiz",
    lastName: "Familiyangiz",
    role: "Sizning maqomingiz",
    roleStudent: "O'quvchi / Talaba",
    rolePro: "Mutaxassis / Ishchi",
    roleFamily: "Oilaboshi",
    roleInvestor: "Boshlovchi Investor",
    enterApp: "Platformaga Kirish",
    dashboard: "Boshqaruv Paneli",
    budgetTracker: "Budjet va Xarajatlar",
    aiAdvisor: "FinWay AI Maslahatchi",
    simulator: "Erkinlik Simulyatori",
    quizHub: "Bilim va Testlar",
    calculators: "Kalkulyatorlar",
    financialHealth: "Moliyaviy Salomatlik Indeksi",
    totalBalance: "Jami Balans",
    monthlyIncome: "Oylik Daromad",
    monthlyExpense: "Oylik Xarajat",
    savingsGoal: "Jamg'arma Maqsadi",
    aiPromptPlaceholder: "FinWay AI'dan moliya haqida istalgan narsani so'rang...",
    askAi: "Yuborish",
    calcCompound: "Murakkab Foiz",
    calcLoan: "Kredit To'lovi",
    calcGoal: "Maqsad Muddati",
    gameTitle: "Moliyaviy Erkinlik Simulyatori",
    gameDesc: "Oylik qarorlar qabul qiling va 12 oyda qanday moliyaviy natijaga erishishingizni ko'ring!",
    nextMonth: "Keyingi Oydagi Qaror",
    restartGame: "Qayta Boshlash",
    badges: "Yutuqlar va Nishonlar",
    quizTitle: "Moliyaviy Savodxonlik Testi",
    score: "Ball",
    streak: "Ketma-ketlik",
    themeToggle: "Rejim",
    langToggle: "Til",
    logout: "Chiqish",
    welcome: "Xush kelibsiz",
    addTransaction: "Kirim/Chiqim Qo'shish",
    amount: "Mablağ (so'm)",
    category: "Kategoriya",
    type: "Turi",
    income: "Kirim",
    expense: "Chiqim",
    add: "Qo'shish",
    recentTransactions: "Oxirgi Operatsiyalar",
    noData: "Ma'lumotlar mavjud emas",
    goodJob: "Ajoyib natija!",
    caution: "Diqqat qiling!",
  },
  EN: {
    appName: "FinWay",
    tagline: "Your Guide to Financial Freedom and Literacy",
    loginTitle: "Welcome to FinWay Platform",
    loginDesc: "Enter your full name and role to start mastering your finances",
    firstName: "First Name",
    lastName: "Last Name",
    role: "Your Current Role",
    roleStudent: "Student / Learner",
    rolePro: "Professional / Employee",
    roleFamily: "Head of Household",
    roleInvestor: "Novice Investor",
    enterApp: "Enter Platform",
    dashboard: "Dashboard",
    budgetTracker: "Budget & Expenses",
    aiAdvisor: "FinWay AI Advisor",
    simulator: "Freedom Simulator",
    quizHub: "Learning & Quizzes",
    calculators: "Calculators",
    financialHealth: "Financial Health Score",
    totalBalance: "Total Balance",
    monthlyIncome: "Monthly Income",
    monthlyExpense: "Monthly Expense",
    savingsGoal: "Savings Goal",
    aiPromptPlaceholder: "Ask FinWay AI anything about finance, budgeting or investments...",
    askAi: "Send",
    calcCompound: "Compound Interest",
    calcLoan: "Loan EMI",
    calcGoal: "Goal Planner",
    gameTitle: "Financial Freedom Simulator",
    gameDesc: "Make smart monthly decisions and build net worth over 12 virtual months!",
    nextMonth: "Advance to Next Month",
    restartGame: "Restart Game",
    badges: "Achievements & Badges",
    quizTitle: "Financial Literacy Quiz",
    score: "Score",
    streak: "Streak",
    themeToggle: "Theme",
    langToggle: "Language",
    logout: "Log Out",
    welcome: "Welcome back",
    addTransaction: "Add Transaction",
    amount: "Amount ($)",
    category: "Category",
    type: "Type",
    income: "Income",
    expense: "Expense",
    add: "Add Record",
    recentTransactions: "Recent Transactions",
    noData: "No transactions recorded yet",
    goodJob: "Great Financial Discipline!",
    caution: "Watch out for expenses!",
  },
  RU: {
    appName: "FinWay",
    tagline: "Ваш путеводитель по финансовой грамотности и свободе",
    loginTitle: "Добро пожаловать в FinWay",
    loginDesc: "Введите ваше имя, фамилию и роль для входа в систему",
    firstName: "Имя",
    lastName: "Фамилия",
    role: "Ваш статус",
    roleStudent: "Ученик / Студент",
    rolePro: "Специалист / Работник",
    roleFamily: "Глава семьи",
    roleInvestor: "Начинающий инвестор",
    enterApp: "Войти в платформу",
    dashboard: "Главная Панель",
    budgetTracker: "Бюджет и Расходы",
    aiAdvisor: "FinWay ИИ Консультант",
    simulator: "Симулятор Свободы",
    quizHub: "Обучение и Тесты",
    calculators: "Калькуляторы",
    financialHealth: "Индекс Финансового Zдоровья",
    totalBalance: "Общий Баланс",
    monthlyIncome: "Месячный Доход",
    monthlyExpense: "Месячный Расход",
    savingsGoal: "Цель Накопления",
    aiPromptPlaceholder: "Задайте любой вопрос FinWay AI о финансах и инвестициях...",
    askAi: "Отправить",
    calcCompound: "Сложный Процент",
    calcLoan: "Расчет Кредита",
    calcGoal: "Планировщик Цели",
    gameTitle: "Симулятор Финансовой Свободы",
    gameDesc: "Принимайте решения каждый месяц и постройте капитал за 12 виртуальных месяцев!",
    nextMonth: "Следующий Месяц",
    restartGame: "Перезапустить",
    badges: "Достижения и Значки",
    quizTitle: "Тест Финансовой Грамотности",
    score: "Баллы",
    streak: "Серия",
    themeToggle: "Тема",
    langToggle: "Язык",
    logout: "Выйти",
    welcome: "Добро пожаловать",
    addTransaction: "Добавить операцию",
    amount: "Сумма (сум)",
    category: "Категория",
    type: "Тип",
    income: "Доход",
    expense: "Расход",
    add: "Добавить",
    recentTransactions: "Последние Операции",
    noData: "Нет записей",
    goodJob: "Отличная дисциплина!",
    caution: "Внимание к расходам!",
  }
};

export default function App() {
  const [lang, setLang] = useState('UZ');
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState(null);

  // Auth form state
  const [loginFirstName, setLoginFirstName] = useState('');
  const [loginLastName, setLoginLastName] = useState('');
  const [loginRole, setLoginRole] = useState("O'quvchi / Talaba");

  // Notifications Toast
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const t = TRANSLATIONS[lang] || TRANSLATIONS.UZ;

  const [transactions, setTransactions] = useState([
    { id: 1, title: 'Oylik Maosh', amount: 8000000, category: 'Daromad', type: 'income', date: '2026-10-01' },
    { id: 2, title: 'Oziq-ovqat va bozor', amount: 1800000, category: 'Oziq-ovqat', type: 'expense', date: '2026-10-03' },
    { id: 3, title: 'Kommunal va Internet', amount: 450000, category: 'Kommunal', type: 'expense', date: '2026-10-05' },
    { id: 4, title: 'Frilans loyiha', amount: 2500000, category: 'Kirim', type: 'income', date: '2026-10-08' },
    { id: 5, title: 'Aksiya va Obligatsiyalar', amount: 1000000, category: 'Investitsiya', type: 'expense', date: '2026-10-09' }
  ]);

  const [newTransTitle, setNewTransTitle] = useState('');
  const [newTransAmount, setNewTransAmount] = useState('');
  const [newTransCategory, setNewTransCategory] = useState('Transport');
  const [newTransType, setNewTransType] = useState('expense');

  const financialTotals = useMemo(() => {
    const income = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
    const expense = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
    const balance = income - expense;
    // Health Score calculation heuristic
    const savingsRatio = income > 0 ? ((income - expense) / income) * 100 : 0;
    let score = Math.min(100, Math.max(10, Math.round(savingsRatio * 2.2 + 20)));
    if (isNaN(score)) score = 50;

    return { income, expense, balance, score };
  }, [transactions]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginFirstName.trim() || !loginLastName.trim()) {
      showToast('Iltimos, ism va familiyangizni to\'liq kiriting!', 'error');
      return;
    }
    const newUser = {
      firstName: loginFirstName.trim(),
      lastName: loginLastName.trim(),
      role: loginRole,
      avatar: `${loginFirstName.charAt(0)}${loginLastName.charAt(0)}`.toUpperCase()
    };
    setUser(newUser);
    showToast(`${t.welcome}, ${newUser.firstName} ${newUser.lastName}!`);
  };

  const handleAddTransaction = (e) => {
    e.preventDefault();
    const amt = parseFloat(newTransAmount);
    if (!newTransTitle.trim() || isNaN(amt) || amt <= 0) {
      showToast('Noto' + "'g'ri ma'lumot kiritildi", 'error');
      return;
    }
    const item = {
      id: Date.now(),
      title: newTransTitle,
      amount: amt,
      category: newTransCategory,
      type: newTransType,
      date: new Date().toISOString().split('T')[0]
    };
    setTransactions([item, ...transactions]);
    setNewTransTitle('');
    setNewTransAmount('');
    showToast('Operatsiya muvaffaqiyatli qo\'shildi!');
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
    showToast('Operatsiya o\'chirildi', 'info');
  };

  if (!user) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} flex items-center justify-center p-4 transition-colors duration-300 font-sans`}>
        {/* Background Decorative Gradients */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
        </div>

        <div className={`w-full max-w-md p-8 rounded-3xl backdrop-blur-xl ${darkMode ? 'bg-slate-900/80 border border-slate-800 shadow-2xl shadow-emerald-500/5' : 'bg-white/80 border border-slate-200 shadow-xl'} relative z-10 transition-all`}>
          {/* Header & Brand */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 shadow-lg shadow-emerald-500/30 mb-4">
              <Wallet className="w-8 h-8 text-slate-950" />
            </div>
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              {t.appName}
            </h1>
            <p className="text-sm text-slate-400 mt-2">{t.tagline}</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                {t.firstName}
              </label>
              <input
                type="text"
                required
                value={loginFirstName}
                onChange={(e) => setLoginFirstName(e.target.value)}
                placeholder="Masalan: Sardor"
                className={`w-full px-4 py-3 rounded-xl outline-none transition ${darkMode ? 'bg-slate-800/80 border border-slate-700 text-slate-100 focus:border-emerald-500' : 'bg-slate-100 border border-slate-300 text-slate-900 focus:border-emerald-500'}`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                {t.lastName}
              </label>
              <input
                type="text"
                required
                value={loginLastName}
                onChange={(e) => setLoginLastName(e.target.value)}
                placeholder="Masalan: Rahimov"
                className={`w-full px-4 py-3 rounded-xl outline-none transition ${darkMode ? 'bg-slate-800/80 border border-slate-700 text-slate-100 focus:border-emerald-500' : 'bg-slate-100 border border-slate-300 text-slate-900 focus:border-emerald-500'}`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                {t.role}
              </label>
              <select
                value={loginRole}
                onChange={(e) => setLoginRole(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl outline-none transition ${darkMode ? 'bg-slate-800/80 border border-slate-700 text-slate-100 focus:border-emerald-500' : 'bg-slate-100 border border-slate-300 text-slate-900 focus:border-emerald-500'}`}
              >
                <option value="O'quvchi / Talaba">{t.roleStudent}</option>
                <option value="Mutaxassis / Ishchi">{t.rolePro}</option>
                <option value="Oilaboshi">{t.roleFamily}</option>
                <option value="Boshlovchi Investor">{t.roleInvestor}</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-emerald-500/25 transition transform active:scale-95 flex items-center justify-center space-x-2"
            >
              <span>{t.enterApp}</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </form>

          {/* Controls Bar for Modal */}
          <div className="mt-8 pt-6 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center space-x-1 hover:text-emerald-400 transition"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              <span>{darkMode ? 'Yorug\' rejim' : 'Qorong\'u rejim'}</span>
            </button>

            <div className="flex space-x-2">
              {['UZ', 'EN', 'RU'].map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2 py-1 rounded-md font-semibold transition ${lang === l ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'hover:text-slate-200'}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} transition-colors duration-300 font-sans flex flex-col md:flex-row`}>
      
      {/* Toast Alert Component */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-2xl shadow-2xl border backdrop-blur-md flex items-center space-x-3 transition-all animate-bounce ${toast.type === 'error' ? 'bg-red-500/20 border-red-500/50 text-red-300' : toast.type === 'info' ? 'bg-blue-500/20 border-blue-500/50 text-blue-300' : 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'}`}>
          {toast.type === 'error' ? <AlertCircle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
          <span className="font-medium text-sm">{toast.msg}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className={`w-full md:w-72 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'} backdrop-blur-xl shrink-0`}>
        <div>
          {/* Logo */}
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Wallet className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <span className="text-xl font-black bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                FinWay
              </span>
              <span className="text-[10px] block font-semibold uppercase tracking-widest text-emerald-500">
                Hackathon Edition
              </span>
            </div>
          </div>

          {/* User Profile Badge */}
          <div className={`p-4 rounded-2xl mb-8 flex items-center space-x-3 border ${darkMode ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-500 text-slate-950 font-extrabold flex items-center justify-center shadow">
              {user.avatar}
            </div>
            <div className="overflow-hidden">
              <p className="font-bold text-sm truncate">{user.firstName} {user.lastName}</p>
              <p className="text-xs text-slate-400 truncate">{user.role}</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {[
              { id: 'dashboard', label: t.dashboard, icon: PieChart },
              { id: 'budget', label: t.budgetTracker, icon: Wallet },
              { id: 'ai', label: t.aiAdvisor, icon: Bot, badge: 'AI' },
              { id: 'simulator', label: t.simulator, icon: Gamepad2 },
              { id: 'quiz', label: t.quizHub, icon: Award },
              { id: 'calculators', label: t.calculators, icon: Calculator },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-between transition ${isActive ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md shadow-emerald-500/20' : darkMode ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isActive ? 'bg-slate-950 text-emerald-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Global Controls & Logout */}
        <div className="pt-6 border-t border-slate-800/80 space-y-4">
          <div className="flex items-center justify-between">
            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2.5 rounded-xl border transition ${darkMode ? 'bg-slate-800 border-slate-700 text-emerald-400' : 'bg-slate-100 border-slate-300 text-slate-700'}`}
              title="Mavzuni o'zgartirish"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Language Selector */}
            <div className="flex bg-slate-800/60 p-1 rounded-xl border border-slate-700/50">
              {['UZ', 'EN', 'RU'].map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2 py-1 text-xs font-bold rounded-lg transition ${lang === l ? 'bg-emerald-500 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-100'}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              setUser(null);
              showToast('Tizimdan chiqildi');
            }}
            className="w-full py-2.5 px-4 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition text-sm font-semibold flex items-center justify-center space-x-2"
          >
            <LogOut className="w-4 h-4" />
            <span>{t.logout}</span>
          </button>
        </div>
      </aside>

      {/* Main View Area */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
        {/* Dynamic Tab Renderer */}
        {activeTab === 'dashboard' && (
          <DashboardView
            t={t}
            darkMode={darkMode}
            user={user}
            totals={financialTotals}
            transactions={transactions}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'budget' && (
          <BudgetTrackerView
            t={t}
            darkMode={darkMode}
            transactions={transactions}
            handleAddTransaction={handleAddTransaction}
            handleDeleteTransaction={handleDeleteTransaction}
            newTransTitle={newTransTitle}
            setNewTransTitle={setNewTransTitle}
            newTransAmount={newTransAmount}
            setNewTransAmount={setNewTransAmount}
            newTransCategory={newTransCategory}
            setNewTransCategory={setNewTransCategory}
            newTransType={newTransType}
            setNewTransType={setNewTransType}
            totals={financialTotals}
          />
        )}

        {activeTab === 'ai' && (
          <AIAdvisorView t={t} darkMode={darkMode} user={user} totals={financialTotals} />
        )}

        {activeTab === 'simulator' && (
          <SimulatorView t={t} darkMode={darkMode} showToast={showToast} />
        )}

        {activeTab === 'quiz' && (
          <QuizView t={t} darkMode={darkMode} showToast={showToast} />
        )}

        {activeTab === 'calculators' && (
          <CalculatorsView t={t} darkMode={darkMode} />
        )}
      </main>
    </div>
  );
}

function DashboardView({ t, darkMode, user, totals, transactions, setActiveTab }) {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className={`p-6 md:p-8 rounded-3xl relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-slate-950 shadow-2xl`}>
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block px-3 py-1 rounded-full bg-slate-950/20 text-slate-950 text-xs font-bold uppercase tracking-wider mb-3 backdrop-blur-sm">
            FinWay Dashboard
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold mb-2 text-slate-950">
            {t.welcome}, {user.firstName}! 👋
          </h2>
          <p className="text-slate-900 font-medium text-sm md:text-base">
            Sizning moliyaviy salomatlik ko'rsatkichingiz: <span className="font-black underline">{totals.score}/100</span>. Bugungi qarorlaringiz kelajagingizni belgilaydi!
          </p>
        </div>
        {/* Visual Graphics */}
        <Sparkles className="absolute right-6 bottom-6 w-32 h-32 text-slate-950/10 pointer-events-none" />
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className={`p-6 rounded-2xl border backdrop-blur-xl ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{t.totalBalance}</span>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-emerald-400">
            {totals.balance.toLocaleString()} <span className="text-xs font-normal">so'm</span>
          </p>
          <span className="text-xs text-slate-400 mt-2 block flex items-center">
            <TrendingUp className="w-3.5 h-3.5 mr-1 text-emerald-400" /> Sof kapital
          </span>
        </div>

        <div className={`p-6 rounded-2xl border backdrop-blur-xl ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{t.monthlyIncome}</span>
            <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-teal-400">
            +{totals.income.toLocaleString()} <span className="text-xs font-normal">so'm</span>
          </p>
          <span className="text-xs text-slate-400 mt-2 block">Oylik tushumlar</span>
        </div>

        <div className={`p-6 rounded-2xl border backdrop-blur-xl ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{t.monthlyExpense}</span>
            <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400">
              <TrendingDown className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-rose-400">
            -{totals.expense.toLocaleString()} <span className="text-xs font-normal">so'm</span>
          </p>
          <span className="text-xs text-slate-400 mt-2 block">Jami xarajatlar</span>
        </div>

        <div className={`p-6 rounded-2xl border backdrop-blur-xl ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Salomatlik Balli</span>
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
              <Target className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-cyan-400">
            {totals.score} / 100
          </p>
          <div className="w-full bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-400 to-cyan-400 h-full transition-all duration-500"
              style={{ width: `${totals.score}%` }}
            />
          </div>
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* FinWay AI Advisor Quick Prompt */}
        <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'} lg:col-span-2 flex flex-col justify-between`}>
          <div>
            <div className="flex items-center space-x-2 text-emerald-400 mb-3">
              <Bot className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">FinWay AI Maslahat</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Moliyaviy strategiyangiz haqida so'rang</h3>
            <p className="text-slate-400 text-sm mb-6">
              AI sizning joriy kirim va chiqimlaringiz asosida avtomatik ravishda optimal tejash hamda investitsiya rejalarini tuzib beradi.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('ai')}
            className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20 hover:opacity-90 transition"
          >
            <span>AI Maslahatchini Ochish</span>
            <ArrowUpRight className="w-5 h-5" />
          </button>
        </div>

        {/* Gamified Challenge Launcher */}
        <div className={`p-6 rounded-3xl border bg-gradient-to-br from-slate-900 to-slate-950 border-emerald-500/30 text-slate-100 flex flex-col justify-between`}>
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold mb-3 border border-emerald-500/30">
              <Gamepad2 className="w-4 h-4" />
              <span>Simulyator Game</span>
            </div>
            <h3 className="text-xl font-bold mb-2">12 Oylik Erkinlik Sinovi</h3>
            <p className="text-slate-400 text-sm mb-4">
              Real hayotiy tanlovlar orqali 12 oy davomida moliyaviy kapitalingizni ko'paytiring!
            </p>
          </div>
          <button
            onClick={() => setActiveTab('simulator')}
            className="w-full py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/30 font-bold flex items-center justify-center space-x-2 transition"
          >
            <span>O'yinni Boshlash</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Recent Transactions List */}
      <div className={`p-6 rounded-3xl border backdrop-blur-xl ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold">{t.recentTransactions}</h3>
          <button
            onClick={() => setActiveTab('budget')}
            className="text-xs font-bold text-emerald-400 hover:underline flex items-center space-x-1"
          >
            <span>Barchasini ko'rish</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          {transactions.slice(0, 4).map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-2xl flex items-center justify-between border transition ${darkMode ? 'bg-slate-800/30 border-slate-800/80' : 'bg-slate-50 border-slate-200'}`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.type === 'income' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                  {item.type === 'income' ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                </div>
                <div>
                  <p className="font-bold text-sm">{item.title}</p>
                  <p className="text-xs text-slate-400">{item.category} • {item.date}</p>
                </div>
              </div>
              <p className={`font-black text-sm ${item.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
                {item.type === 'income' ? '+' : '-'}{item.amount.toLocaleString()} so'm
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BudgetTrackerView({
  t,
  darkMode,
  transactions,
  handleAddTransaction,
  handleDeleteTransaction,
  newTransTitle,
  setNewTransTitle,
  newTransAmount,
  setNewTransAmount,
  newTransCategory,
  setNewTransCategory,
  newTransType,
  setNewTransType,
  totals
}) {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h2 className="text-2xl font-black mb-1">{t.budgetTracker}</h2>
        <p className="text-slate-400 text-sm">Xarajatlar va daromadlaringizni batafsil nazorat qiling</p>
      </div>

      {/* Progress Bar for Monthly Budget */}
      <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-bold">Oylik Tejash Maqsadi (50/30/20 qoidasi)</span>
          <span className="text-xs font-extrabold text-emerald-400">
            {totals.income > 0 ? Math.round((totals.balance / totals.income) * 100) : 0}% tejaldi
          </span>
        </div>
        <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-500"
            style={{ width: `${Math.min(100, Math.max(0, totals.income > 0 ? (totals.balance / totals.income) * 100 : 0))}%` }}
          />
        </div>
      </div>

      {/* Add New Transaction Form */}
      <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
        <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
          <Plus className="w-5 h-5 text-emerald-400" />
          <span>Yangi Operatsiya Qo'shish</span>
        </h3>

        <form onSubmit={handleAddTransaction} className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <input
            type="text"
            required
            placeholder="Nomi (Masalan: Oziq-ovqat)"
            value={newTransTitle}
            onChange={(e) => setNewTransTitle(e.target.value)}
            className={`px-4 py-3 rounded-xl outline-none text-sm border ${darkMode ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-slate-100 border-slate-300 text-slate-900'}`}
          />

          <input
            type="number"
            required
            placeholder="Mablağ (so'm)"
            value={newTransAmount}
            onChange={(e) => setNewTransAmount(e.target.value)}
            className={`px-4 py-3 rounded-xl outline-none text-sm border ${darkMode ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-slate-100 border-slate-300 text-slate-900'}`}
          />

          <select
            value={newTransCategory}
            onChange={(e) => setNewTransCategory(e.target.value)}
            className={`px-4 py-3 rounded-xl outline-none text-sm border ${darkMode ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-slate-100 border-slate-300 text-slate-900'}`}
          >
            <option value="Maosh">Maosh</option>
            <option value="Frilans">Frilans</option>
            <option value="Oziq-ovqat">Oziq-ovqat</option>
            <option value="Transport">Transport</option>
            <option value="Kommunal">Kommunal</option>
            <option value="Investitsiya">Investitsiya</option>
            <option value="Kuyin-kechak">Kiyim-kechak</option>
            <option value="Boshqa">Boshqa</option>
          </select>

          <select
            value={newTransType}
            onChange={(e) => setNewTransType(e.target.value)}
            className={`px-4 py-3 rounded-xl outline-none text-sm border ${darkMode ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-slate-100 border-slate-300 text-slate-900'}`}
          >
            <option value="expense">{t.expense}</option>
            <option value="income">{t.income}</option>
          </select>

          <button
            type="submit"
            className="py-3 px-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold rounded-xl shadow-lg shadow-emerald-500/20 hover:opacity-90 transition flex items-center justify-center space-x-2"
          >
            <span>Qo'shish</span>
          </button>
        </form>
      </div>

      {/* Full Transactions List */}
      <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
        <h3 className="text-lg font-bold mb-4">Barcha Amallar Tarmog'i</h3>
        <div className="space-y-3">
          {transactions.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-2xl flex items-center justify-between border transition ${darkMode ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.type === 'income' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                  {item.type === 'income' ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                </div>
                <div>
                  <p className="font-bold text-sm">{item.title}</p>
                  <p className="text-xs text-slate-400">{item.category} • {item.date}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className={`font-black text-sm ${item.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {item.type === 'income' ? '+' : '-'}{item.amount.toLocaleString()} so'm
                </span>
                <button
                  onClick={() => handleDeleteTransaction(item.id)}
                  className="p-2 text-slate-500 hover:text-rose-400 transition"
                  title="O'chirish"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AIAdvisorView({ t, darkMode, user, totals }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: `Salom ${user.firstName}! Men FinWay AI - sizning shaxsiy moliyaviy aqlli maslahatchigingizman. Sizning joriy soflik balansingiz ${totals.balance.toLocaleString()} so'm. Sizga qanday moliyaviy yordam bera olaman?`
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const quickPrompts = [
    "Qanday qilib daromadimning 20% qismini tejasam bo'ladi?",
    "Aksiyalar va depozitlar orasidagi asosiy farq nimada?",
    "Moliyaviy xavfsizlik yostig'ini qanday shakllantirish kerak?",
    "50/30/20 qoidasi nima va uni qanday qo'llash mumkin?"
  ];

  const handleSend = async (queryText) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg = { id: Date.now(), sender: 'user', text: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInput('');
    setLoading(true);

    try {
      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

      const systemPrompt = `You are FinWay AI, an expert, encouraging financial advisor for youth, employees, and families. 
      The current user is ${user.firstName} ${user.lastName}, who is a ${user.role}.
      Current user's financial overview: Monthly Income: ${totals.income} UZS, Expenses: ${totals.expense} UZS, Net Balance: ${totals.balance} UZS, Health Score: ${totals.score}/100.
      Provide concise, highly actionable, friendly financial advice in Uzbek (or match user language if requested). Keep formatting clean with bullet points if necessary.`;

      const payload = {
        contents: [{ parts: [{ text: textToSend }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] }
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      const aiResponseText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Kechirasiz, javob olishda muammo yuz berdi. Qaytadan urinib ko'ring.";

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'ai', text: aiResponseText }
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'ai', text: "Tarmoqda xatolik yuz berdi. FinWay AI hozirda band bo'lishi mumkin." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn h-[calc(100vh-8rem)] flex flex-col">
      <div>
        <h2 className="text-2xl font-black mb-1 flex items-center space-x-2">
          <Bot className="w-7 h-7 text-emerald-400" />
          <span>{t.aiAdvisor}</span>
        </h2>
        <p className="text-slate-400 text-sm">Sun'iy intellekt asosida real vaqtli shaxsiy moliya tahlili</p>
      </div>

      {/* Chat History Box */}
      <div className={`flex-1 p-6 rounded-3xl border overflow-y-auto space-y-4 ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xl p-4 rounded-2xl text-sm leading-relaxed ${m.sender === 'user' ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-medium rounded-tr-none' : darkMode ? 'bg-slate-800 border border-slate-700 text-slate-100 rounded-tl-none' : 'bg-slate-100 border border-slate-200 text-slate-900 rounded-tl-none'}`}>
              <p className="whitespace-pre-line">{m.text}</p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className={`p-4 rounded-2xl text-xs font-semibold flex items-center space-x-2 ${darkMode ? 'bg-slate-800 text-emerald-400' : 'bg-slate-100 text-emerald-600'}`}>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>FinWay AI javob shakllantirmoqda...</span>
            </div>
          </div>
        )}
      </div>

      {/* Quick Scenario Buttons */}
      <div className="flex flex-wrap gap-2">
        {quickPrompts.map((qp, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(qp)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-300 hover:border-emerald-500/50 hover:text-emerald-400' : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-500'}`}
          >
            ⚡ {qp}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div className="flex items-center space-x-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={t.aiPromptPlaceholder}
          className={`flex-1 px-5 py-4 rounded-2xl outline-none text-sm border ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-100 focus:border-emerald-500' : 'bg-white border-slate-200 text-slate-900 focus:border-emerald-500'}`}
        />
        <button
          onClick={() => handleSend()}
          disabled={loading}
          className="py-4 px-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90 text-slate-950 font-bold rounded-2xl shadow-lg shadow-emerald-500/20 transition flex items-center justify-center space-x-2"
        >
          <span>{t.askAi}</span>
        </button>
      </div>
    </div>
  );
}

function SimulatorView({ t, darkMode, showToast }) {
  const [month, setMonth] = useState(1);
  const [capital, setCapital] = useState(1000000);
  const [knowledge, setKnowledge] = useState(30);
  const [gameOver, setGameOver] = useState(false);

  const scenarios = [
    {
      month: 1,
      title: "Birinchi Oylik Maosh va Bonus",
      desc: "Siz 3,000,000 so'm daromad oldingiz. Uni qanday taqsimlaysiz?",
      choices: [
        { text: "Yangi flagman telefonni bo'lib to'lashga olish (Oylik: 800,000)", capitalChange: -500000, knowChange: -5, msg: "Telefon narxi tushadi va bo'lib to'lash xarajati ortdi!" },
        { text: "Moliya kitoblari sotib olish va 30% tejash", capitalChange: 900000, knowChange: +20, msg: "Ajoyib! Bilim va jamg'arma oshdi." },
        { text: "Do'stlar bilan barcha pulni bayram qilish", capitalChange: -1000000, knowChange: -10, msg: "Barcha pul sarflandi!" }
      ]
    },
    {
      month: 2,
      title: "Kutilmagan Favqulodda Xarajat",
      desc: "Sog'liqni saqlash yoki maishiy texnika buzilishi sababli kutilmagan xarajat chiqdi.",
      choices: [
        { text: "Favqulodda jamg'armadan to'lash", capitalChange: -400000, knowChange: +10, msg: "To'g'ri strategiya! Qarzga kirmadingiz." },
        { text: "Yuqori foizli mikrokredit olish", capitalChange: -900000, knowChange: -15, msg: "Mikrokredit foizlari kapitalingizni qisqartirdi." }
      ]
    },
    {
      month: 3,
      title: "Investitsiya Imkoniyati",
      desc: "Bozorda barqaror obligatsiyalar va aksiyalar taklif qilinmoqda.",
      choices: [
        { text: "Kapitalning 40% qismini obligatsiyalarga tikish", capitalChange: +600000, knowChange: +15, msg: "Oylik passiv daromad va foizlar kelishni boshladi!" },
        { text: "Shubhali tez boyish sxemasiga (piramidaga) tikish", capitalChange: -1200000, knowChange: -20, msg: "Piramida yopildi va pulingiz yo'qoldi!" }
      ]
    }
  ];

  const currentScenario = scenarios[(month - 1) % scenarios.length];

  const handleChoice = (choice) => {
    const nextCap = capital + choice.capitalChange;
    const nextKnow = Math.min(100, Math.max(0, knowledge + choice.knowChange));

    setCapital(nextCap);
    setKnowledge(nextKnow);
    showToast(choice.msg, choice.capitalChange >= 0 ? 'success' : 'error');

    if (month >= 12) {
      setGameOver(true);
    } else {
      setMonth(month + 1);
    }
  };

  const resetGame = () => {
    setMonth(1);
    setCapital(1000000);
    setKnowledge(30);
    setGameOver(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-black mb-1 flex items-center space-x-2">
          <Gamepad2 className="w-7 h-7 text-emerald-400" />
          <span>{t.gameTitle}</span>
        </h2>
        <p className="text-slate-400 text-sm">{t.gameDesc}</p>
      </div>

      {/* Game Header Metrics */}
      <div className="grid grid-cols-3 gap-4">
        <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'}`}>
          <span className="text-xs text-slate-400 font-bold uppercase">Bosqich</span>
          <p className="text-xl font-black text-emerald-400">{month} / 12 Oy</p>
        </div>
        <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'}`}>
          <span className="text-xs text-slate-400 font-bold uppercase">Joriy Kapital</span>
          <p className="text-xl font-black text-teal-400">{capital.toLocaleString()} so'm</p>
        </div>
        <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'}`}>
          <span className="text-xs text-slate-400 font-bold uppercase">Moliyaviy Bilim</span>
          <p className="text-xl font-black text-cyan-400">{knowledge}%</p>
        </div>
      </div>

      {!gameOver ? (
        <div className={`p-8 rounded-3xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'} space-y-6`}>
          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase">
              {month}-oy ssenariysi
            </span>
            <h3 className="text-2xl font-bold mt-3 mb-2">{currentScenario.title}</h3>
            <p className="text-slate-400 text-sm">{currentScenario.desc}</p>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-800">
            {currentScenario.choices.map((choice, idx) => (
              <button
                key={idx}
                onClick={() => handleChoice(choice)}
                className={`w-full p-4 rounded-2xl text-left border font-semibold transition flex justify-between items-center ${darkMode ? 'bg-slate-800/60 border-slate-700 hover:border-emerald-500 hover:bg-slate-800' : 'bg-slate-50 border-slate-200 hover:border-emerald-500 hover:bg-slate-100'}`}
              >
                <span>{choice.text}</span>
                <ChevronRight className="w-5 h-5 text-emerald-400 shrink-0 ml-2" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className={`p-8 rounded-3xl border text-center ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'} space-y-6`}>
          <Award className="w-16 h-16 text-emerald-400 mx-auto" />
          <h3 className="text-3xl font-black">12 Oylik Simulyatsiya Yakunlandi!</h3>
          <p className="text-slate-400">
            Yakuniy kapitalingiz: <span className="font-bold text-emerald-400">{capital.toLocaleString()} so'm</span>.
            Moliyaviy bilmingiz darajasi: <span className="font-bold text-cyan-400">{knowledge}%</span>.
          </p>
          <button
            onClick={resetGame}
            className="py-3 px-8 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold rounded-2xl shadow-lg transition"
          >
            {t.restartGame}
          </button>
        </div>
      )}
    </div>
  );
}

function QuizView({ t, darkMode, showToast }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);

  const questions = [
    {
      q: "Inflyatsiya tushunchasi nimani anglatadi?",
      options: [
        "Pulingizning xarid qobiliyati va qiymati vaqt o'tishi bilan pasayishi",
        "Bankda saqlanayotgan pulning ko'payishi",
        "Valyuta kursining doimiy pastlashi"
      ],
      correct: 0
    },
    {
      q: "50/30/20 budjet qoidasiga ko'ra 20% qism nimaga ajratilishi kerak?",
      options: [
        "Oziq-ovqat va uy xarajatlariga",
        "O'yin-kulgi va sayohatga",
        "Jamg'arma va investitsiyalarga"
      ],
      correct: 2
    },
    {
      q: "Murakkab foiz (Compound interest) effekti nima?",
      options: [
        "Faqat dastlabki sarmoyaga foiz hisoblanishi",
        "Topilgan foizlar ustiga ham qayta foiz hisoblanib kapitalning jadal o'sishi",
        "Kredit bo'yicha ortiqcha jarimalar"
      ],
      correct: 1
    }
  ];

  const handleAnswer = (idx) => {
    if (idx === questions[currentQ].correct) {
      setScore(score + 100);
      showToast("To'g'ri javob! +100 Ball", "success");
    } else {
      showToast("Noto'g'ri javob", "error");
    }

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      showToast("Test yakunlandi!", "info");
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-3xl mx-auto">
      <div>
        <h2 className="text-2xl font-black mb-1 flex items-center space-x-2">
          <BookOpen className="w-7 h-7 text-emerald-400" />
          <span>{t.quizTitle}</span>
        </h2>
        <p className="text-slate-400 text-sm">Bilimingizni sinang va "Investor Pro" nishonini qo'lga kiriting</p>
      </div>

      {/* Badges Ribbon */}
      <div className="grid grid-cols-3 gap-4">
        <div className={`p-4 rounded-2xl border text-center ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
          <Award className="w-8 h-8 text-amber-400 mx-auto mb-2" />
          <p className="text-xs font-bold">Moliyaviy Boshlovchi</p>
        </div>
        <div className={`p-4 rounded-2xl border text-center ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
          <Award className="w-8 h-8 text-teal-400 mx-auto mb-2" />
          <p className="text-xs font-bold">Tejamkor Master</p>
        </div>
        <div className={`p-4 rounded-2xl border text-center ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
          <Award className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
          <p className="text-xs font-bold">Investor Pro</p>
        </div>
      </div>

      {/* Quiz Interactive Card */}
      <div className={`p-8 rounded-3xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'} space-y-6`}>
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold uppercase text-emerald-400">Savol {currentQ + 1} / {questions.length}</span>
          <span className="text-sm font-black">Ball: {score}</span>
        </div>

        <h3 className="text-xl font-bold">{questions[currentQ].q}</h3>

        <div className="space-y-3">
          {questions[currentQ].options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              className={`w-full p-4 rounded-2xl text-left border font-medium transition ${darkMode ? 'bg-slate-800/60 border-slate-700 hover:border-emerald-500 hover:bg-slate-800' : 'bg-slate-50 border-slate-200 hover:border-emerald-500 hover:bg-slate-100'}`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function CalculatorsView({ t, darkMode }) {
  const [calcType, setCalcType] = useState('compound');

  // Compound interest state
  const [principal, setPrincipal] = useState(10000000);
  const [rate, setRate] = useState(18);
  const [years, setYears] = useState(3);

  const compoundResult = useMemo(() => {
    const P = parseFloat(principal) || 0;
    const r = (parseFloat(rate) || 0) / 100;
    const tYears = parseFloat(years) || 0;
    const total = P * Math.pow(1 + r, tYears);
    const profit = total - P;
    return { total: Math.round(total), profit: Math.round(profit) };
  }, [principal, rate, years]);

  return (
    <div className="space-y-8 animate-fadeIn max-w-3xl mx-auto">
      <div>
        <h2 className="text-2xl font-black mb-1 flex items-center space-x-2">
          <Calculator className="w-7 h-7 text-emerald-400" />
          <span>{t.calculators}</span>
        </h2>
        <p className="text-slate-400 text-sm">Kelajakdagi daromad va jamg'armalaringizni aniq hisoblang</p>
      </div>

      {/* Tabs Switcher */}
      <div className="flex space-x-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
        <button
          onClick={() => setCalcType('compound')}
          className={`flex-1 py-3 text-xs font-bold rounded-xl transition ${calcType === 'compound' ? 'bg-emerald-500 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'}`}
        >
          {t.calcCompound}
        </button>
      </div>

      {/* Calculator Body */}
      {calcType === 'compound' && (
        <div className={`p-8 rounded-3xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'} space-y-6`}>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Boshlang'ich Sarmoya (so'm)</label>
              <input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                className={`w-full p-4 rounded-xl outline-none border ${darkMode ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-slate-100 border-slate-300 text-slate-900'}`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Yillik Foiz Stavkasi (%)</label>
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className={`w-full p-4 rounded-xl outline-none border ${darkMode ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-slate-100 border-slate-300 text-slate-900'}`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Muddati (Yil)</label>
              <input
                type="number"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                className={`w-full p-4 rounded-xl outline-none border ${darkMode ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-slate-100 border-slate-300 text-slate-900'}`}
              />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-400">Sof Foyda:</span>
              <span className="font-bold text-emerald-400">+{compoundResult.profit.toLocaleString()} so'm</span>
            </div>
            <div className="flex justify-between items-center text-lg font-black pt-2 border-t border-emerald-500/20">
              <span>Yakuniy Summa:</span>
              <span className="text-emerald-400">{compoundResult.total.toLocaleString()} so'm</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
