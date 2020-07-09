const Profile = () => import('@/pages/user/Profile')
const Settings = () => import('@/pages/user/Settings')
const UserManagement = () => import('@/pages/user/UserManagement')

export default [
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
  {
    path: '/usermanagement',
    name: 'UserManagement',
    component: UserManagement
  }
]