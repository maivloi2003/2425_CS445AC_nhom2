import classNames from 'classnames/bind';
import styles from './SidebarAdmin.module.scss'
import routes from '~/config/routes';
import { faChartLine, faFileInvoice, faBookOpenReader } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser, faCalendar } from '@fortawesome/free-regular-svg-icons';
import Button from '~/components/Button';
import { useState } from 'react';
const cx = classNames.bind(styles)

function SidebarAdmin() {
    const [isSelected, setIsSelected] = useState(0);
    const item = [
        { to: routes.dashboard, icon: faCalendar, title: 'Dashboard' },
        { to: routes.usersManagement, icon: faCircleUser, title: 'Users' },
        { to: routes.postsManagement, icon: faBookOpenReader, title: 'Posts' },
        { to: routes.statistic, icon: faChartLine, title: 'Statistic' },
        { to: routes.report, icon: faFileInvoice, title: 'Report' },
    ]
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('admin')}>ADMIN</h3>
            {item.map((item, index) => (
                <Button onClick={() => setIsSelected(index)} className={cx('nav', { active: isSelected === index })} key={index} leftIcon={item.icon} to={item.to}>{item.title}</Button>
            ))
            }
        </div >
    );
}

export default SidebarAdmin;