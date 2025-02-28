import { useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './SidebarMobile.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAddressCard,
    faFire,
    faFlag,
    faHome,
    faNewspaper,
    faQuestion,
    faScroll,
    faSquareArrowUpRight,
} from '@fortawesome/free-solid-svg-icons';
import routesConfig from '~/config/routes';
import { NavBarsContext } from '~/context/NavBarsContext';
import { useTranslation } from 'react-i18next';



const cx = classNames.bind(styles);

function SidebarMobile() {
    const { setShowNav } = useContext(NavBarsContext);
    const { t } = useTranslation();
    const navigate = useNavigate();

    const url = document.URL
    const urlParams = url.substring(url.lastIndexOf('/') + 1);
    const handleGetPostByLanguage = (language) => {
        const langParam = `?language="${language}"`;

        if (urlParams === '' ||
            (urlParams.startsWith('?language') &&
                urlParams.substring(urlParams.indexOf('%22') + 3, urlParams.lastIndexOf('%22')) !== language)) {
            navigate(`/${langParam}`);
        } else if (urlParams.startsWith('?content')) {
            if (urlParams.includes('&') && (urlParams.substring(urlParams.lastIndexOf('=') + 4, urlParams.lastIndexOf('%22')) !== language)) {
                const urlTemp = urlParams.substring(urlParams.indexOf('?'), urlParams.indexOf('&'))
                navigate(`${urlTemp}&language="${language}"`);
            } else {
                navigate(`${urlParams}&language="${language}"`);
            }
        }
    };

    return (
        <div className={cx('overlay')} onClick={() => setShowNav(prev => !prev)}>
            <div className={(cx('nav'))}>
                <div className={cx('navbar')}>
                    <ul className={cx('navList')}>
                        <Link to='/' className={cx('navItem')}>
                            <FontAwesomeIcon icon={faHome} />
                            <span>{t('home')}</span>
                        </Link>
                        <li className={cx('navItem')}>
                            <FontAwesomeIcon icon={faFire} />
                            <span>{t('popular')}</span>
                        </li>
                        <li className={cx('navItem')}>
                            <FontAwesomeIcon icon={faSquareArrowUpRight} />
                            <span>{t('new')}</span>
                        </li>
                    </ul>
                </div>
                <div className={cx('languages')}>
                    <ul className={cx('languageList')}>
                        <li onClick={() => handleGetPostByLanguage('English')} className={cx('languageItem')}>
                            <FontAwesomeIcon icon={faNewspaper} />
                            <span>{t('langEnglish')}</span>
                        </li>
                        <li onClick={() => handleGetPostByLanguage('China')} className={cx('languageItem')}>
                            <FontAwesomeIcon icon={faNewspaper} />
                            <span>{t('langChinese')}</span>
                        </li>
                        <li onClick={() => handleGetPostByLanguage('Japan')} className={cx('languageItem')}>
                            <FontAwesomeIcon icon={faNewspaper} />
                            <span>{t('langJapanese')}</span>
                        </li>
                    </ul>
                </div>
                <div className={cx('other')}>
                    <div className={cx('otherList')}>
                        <Link to={routesConfig.aboutFL} className={cx('otherItem')}>
                            <FontAwesomeIcon icon={faAddressCard} />
                            <span>{t('aboutFL')}</span>
                        </Link>
                        <Link to='' className={cx('otherItem')}>
                            <FontAwesomeIcon icon={faFlag} />
                            <span>{t('advertise')}</span>
                        </Link>
                        <Link to={routesConfig.help} className={cx('otherItem')}>
                            <FontAwesomeIcon icon={faQuestion} />
                            <span>{t('help')}</span>
                        </Link>
                        <Link to={routesConfig.policy} className={cx('otherItem')}>
                            <FontAwesomeIcon icon={faScroll} />
                            <span >{t('policy')}</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SidebarMobile;