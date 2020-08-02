const Home = () => import('@/pages/home/Home')
const Report = () => import('@/pages/home/Report')
const BalanceSheet = () => import('@/pages/home/reports/BalanceSheet')
const ProfitAndLoss = () => import('@/pages/home/reports/ProfitAndLoss')
const CashFlowStatement = () => import('@/pages/home/reports/CashFlowStatement')
const TrialBalance = () => import('@/pages/home/reports/TrialBalance')
const GeneralLedger = () => import('@/pages/home/reports/GeneralLedger')

export default [
  {
    path: '',
    name: 'Home',
    component: Home
  },
  {
    path: '/report',
    name: 'Report',
    component: Report
  },
  {
    path: '/report/balance-sheet',
    name: 'BalanceSheet',
    component: BalanceSheet
  },
  {
    path: '/report/profit-and-loss',
    name: 'ProfitAndLoss',
    component: ProfitAndLoss
  },
  {
    path: '/report/cash-flow-statement',
    name: 'CashFlowStatement',
    component: CashFlowStatement
  },
  {
    path: '/report/trial-balance',
    name: 'TrialBalance',
    component: TrialBalance
  },
  {
    path: '/report/general-ledger',
    name: 'GeneralLedger',
    component: GeneralLedger
  }
]
