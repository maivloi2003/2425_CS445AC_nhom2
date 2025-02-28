// Routes Config
import routesConfig from '~/config/routes'

// Layouts
import { HeaderOnly } from '~/layouts';

// Pages
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Setting from '~/pages/Setting';
import Profile from '~/pages/Profile';
import Register from '~/pages/Register';
import Upload from '~/pages/Upload';
import ActiveAccount from '~/pages/ActiveAccount';
import ForgotPassword from '~/pages/ForgotPassword';
import SendEmail from '~/pages/SendEmail';
import ConfirmEmail from '~/pages/ConfirmEmail';
import PostDetail from '~/pages/PostDetail';
import ResetPassword from '~/pages/ResetPassword';
import AboutFL from '~/pages/AboutFL'
import Policy from '~/pages/Policy'
import Help from '~/pages/Help'
import Friends from '~/pages/Friends';
import Dashboard from '~/pages/admin/Dashboard';
import UsersManagement from '~/pages/admin/UsersManagement';
import PostsManagement from '~/pages/admin/PostsManagement';
import Statistic from '~/pages/admin/Statistic';
import Report from '~/pages/admin/Report';
import AdminLayout from '~/layouts/AdminLayout';

const publicRoutes = [
    { path: routesConfig.home, component: Home },
    { path: routesConfig.login, component: Login, layout: null },
    { path: routesConfig.register, component: Register, layout: null },
    { path: routesConfig.forgotPassword, component: ForgotPassword, layout: null },
    { path: routesConfig.resetPassword, component: ResetPassword, layout: null },
    { path: routesConfig.confirmEmail, component: ConfirmEmail, layout: null },
    { path: routesConfig.policy, component: Policy, layout: HeaderOnly },
    { path: routesConfig.help, component: Help, layout: HeaderOnly },
    { path: routesConfig.aboutFL, component: AboutFL, layout: HeaderOnly },
    { path: routesConfig.postDetail, component: PostDetail },
    { path: routesConfig.dashboard, component: Dashboard, layout: AdminLayout },
    { path: routesConfig.usersManagement, component: UsersManagement, layout: AdminLayout },
    { path: routesConfig.postsManagement, component: PostsManagement, layout: AdminLayout },
    { path: routesConfig.statistic, component: Statistic, layout: AdminLayout },
    { path: routesConfig.report, component: Report, layout: AdminLayout },
];

const privateRoutes = [
    { path: routesConfig.setting, component: Setting, layout: HeaderOnly },
    { path: routesConfig.friends, component: Friends, layout: HeaderOnly },
    { path: routesConfig.profile, component: Profile, layout: HeaderOnly },
    { path: routesConfig.upload, component: Upload, layout: HeaderOnly },
    { path: routesConfig.activeAccount, component: ActiveAccount, layout: null },
    { path: routesConfig.sendEmail, component: SendEmail, layout: null },
];

const adminRoutes = [
]

export { publicRoutes, privateRoutes, adminRoutes };
