import classNames from 'classnames/bind';
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
import { useEffect, useState } from 'react';

import styles from './Sidebar.module.scss';
import routesConfig from '~/config/routes';
import { Link, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Sidebar() {
    const [language, setLanguage] = useState({});
    const navigate = useNavigate();

    const url = document.URL
    const urlParams = url.substring(url.lastIndexOf('/') + 1);

    useEffect(() => {
        const lang = JSON.parse(localStorage.getItem('lang'));
        if (lang) {
            setLanguage(lang || {});
        }
    }, [language]);

    const handleGetPostByLanguage = (language) => {
        const langParam = `?language="${language}"`;

        if (urlParams === '' ||
            (urlParams.startsWith('?language') &&
                urlParams.substring(urlParams.indexOf('%22') + 3, urlParams.lastIndexOf('%22')) !== language)) {
            navigate(`/${langParam}`);
        } else if (urlParams.startsWith('?content')) {
            navigate(`${urlParams}&language="${language}"`);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('navbar')}>
                <ul className={cx('navList')}>
                    <Link to='/' className={cx('navItem')}>
                        <FontAwesomeIcon icon={faHome} />
                        <span>{language.homeNavHome || 'Home'}</span>
                    </Link>
                    <li className={cx('navItem')}>
                        <FontAwesomeIcon icon={faFire} />
                        <span>{language.homeNavPopular || 'Popular'}</span>
                    </li>
                    <li className={cx('navItem')}>
                        <FontAwesomeIcon icon={faSquareArrowUpRight} />
                        <span>{language.homeNavNew || 'New'}</span>
                    </li>
                </ul>
            </div>
            <div className={cx('languages')}>
                <span className={cx('title')}>{language.homeNavLang || 'Language'}</span>
                <ul className={cx('languageList')}>
                    <li onClick={() => handleGetPostByLanguage('English')} className={cx('languageItem')}>
                        <FontAwesomeIcon icon={faNewspaper} />
                        <span>{language.homeLangEng || 'English'}</span>
                    </li>
                    <li onClick={() => handleGetPostByLanguage('China')} className={cx('languageItem')}>
                        <FontAwesomeIcon icon={faNewspaper} />
                        <span>{language.homeLangChina || 'China'}</span>
                    </li>
                    <li onClick={() => handleGetPostByLanguage('Japan')} className={cx('languageItem')}>
                        <FontAwesomeIcon icon={faNewspaper} />
                        <span>{language.homeLangJapan || 'Japan'}</span>
                    </li>
                </ul>
            </div>
            <div className={cx('other')}>
                <span className={cx('title')}>{language.homeNavOther || 'Other'}</span>
                <div className={cx('otherList')}>
                    <Link to={routesConfig.aboutFL} className={cx('otherItem')}>
                        <FontAwesomeIcon icon={faAddressCard} />
                        <span>{language.homeOtherAbout || 'About FL'}</span>
                    </Link>
                    <Link to='' className={cx('otherItem')}>
                        <FontAwesomeIcon icon={faFlag} />
                        <span>{language.homeOtherAdv || 'Advertise'}</span>
                    </Link>
                    <Link to={routesConfig.help} className={cx('otherItem')}>
                        <FontAwesomeIcon icon={faQuestion} />
                        <span>{language.homeOtherHelp || 'Help'}</span>
                    </Link>
                    <Link to={routesConfig.policy} className={cx('otherItem')}>
                        <FontAwesomeIcon icon={faScroll} />
                        <span >{language.homeOtherPolicy || 'Policy'}</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
