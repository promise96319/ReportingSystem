const DataImport = () => import('@/pages/main/DataImport')
const DataMaintenance = () => import('@/pages/main/DataMaintenance')
const AccountList = () => import('@/pages/main/AccountList')
const Mapping = () => import('@/pages/main/Mapping')
const ReportResult = () => import('@/pages/main/ReportResult')

export default [
  {
    path: '/data/import',
    name: 'DataImport',
    component: DataImport,
    meta: {
      isSideBar: true
    }
  },
  {
    path: '/data/maintenance',
    name: 'DataMaintenance',
    component: DataMaintenance,
    meta: {
      isSideBar: true
    }
  },

  {
    path: '/accounts',
    name: 'AccountList',
    component: AccountList,
    meta: {
      isSideBar: true
    }
  },
  {
    path: '/mapping',
    name: 'Mapping',
    component: Mapping,
    meta: {
      isSideBar: true
    }
  },
  {
    path: '/results',
    name: 'ReportResult',
    component: ReportResult,
    meta: {
      isSideBar: true
    }
  }
]
