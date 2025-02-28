import { useState, useRef, useMemo, useEffect, useContext, useCallback } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faUser, faGear, faPlus, faSignOut, faClose, faSearch, faEarthAsia, faMagnifyingGlass, faBars } from '@fortawesome/free-solid-svg-icons';
import { faBell, faCommentDots } from '@fortawesome/free-regular-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Link, useNavigate } from 'react-router-dom';

import styles from './Header.module.scss';
import images from 'assets/images';
import Button from '~/components/Button';
import Image from '~/components/Image';
import Menu from '~/components/Popper/Menu';
import History from '~/components/Popper/History';
import routesConfig from '~/config/routes';
import { infoUserCurrentService } from '~/apiServices';
import Notifications from '~/components/Notifications';
import { UserContext } from '~/context/UserContext';
import { ChatContext } from '~/context/ChatContext';
import { NavBarsContext } from '~/context/NavBarsContext';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

function Header() {
    const { t, i18n } = useTranslation();
    const [searchValue, setSearchValue] = useState('');
    const [notify, setNotify] = useState({});
    const navigate = useNavigate();
    const inputRef = useRef();
    const { user, setUser } = useContext(UserContext);
    const { setShowNav } = useContext(NavBarsContext);
    const { toggleChat } = useContext(ChatContext);

    useEffect(() => {
        const initializeUser = async () => {
            const userCurrent = JSON.parse(localStorage.getItem('currentUser'));

            if (userCurrent) {
                setUser(userCurrent);
                const token = localStorage.getItem('authToken');
                if (token) {
                    const isValid = await fetchInfoUser();
                    if (!isValid) {
                        localStorage.clear();
                        setUser(null);
                    }
                }
            }
        };

        initializeUser();
        // eslint-disable-next-line
    }, [setUser]);


    const fetchInfoUser = useCallback(async () => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                return false;
            }

            const res = await infoUserCurrentService(token);
            if (!res?.data) {
                localStorage.clear();
                return false;
            }
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }, []);


    const handlers = useMemo(() => ({
        clearSearch: () => {
            setSearchValue('');
            inputRef.current?.focus();
        },
        search: () => {
            if (searchValue.trim()) {
                navigate(`/?content="${searchValue.trim()}"`);
            }
        },
        handleKeyUp: (e) => {
            if (e.code === 'Enter') handlers.search();
        },
    }), [searchValue, navigate]);

    const handleChange = useCallback((e) => {
        const valueSearch = e.target.value;
        if (!valueSearch.startsWith(' ')) {
            setSearchValue(valueSearch);
        }
    }, []);

    const menuItems = useMemo(() => [
        {
            icon: faUser,
            title: user?.name || '',
            to: `/users/${user?.id || ''}`,
            separate: true,
        },
        {
            icon: faGear, title: t('setting'), to: routesConfig.setting
        },
        {
            icon: faCircleInfo, title: t('support'), to: routesConfig.help
        },
        {
            icon: faEarthAsia,
            title: t('language'),
            children: {
                title: t('language'),
                data: [
                    {
                        type: 'language',
                        code: 'en',
                        title: t('langEnglish'),
                    },
                    {
                        type: 'language',
                        code: 'jp',
                        title: t('langJapanese'),
                    },
                    {
                        type: 'language',
                        code: 'cn',
                        title: t('langChinese'),
                    },
                ]
            }
        },
        {
            icon: faSignOut, title: t('logout'), to: routesConfig.login
        },
        // eslint-disable-next-line
    ], [user]);

    const handleMenuChange = async (menuItem) => {
        if (menuItem.type === 'language') {
            i18n.changeLanguage(menuItem.code)
        }
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                {/* Navbar Mobile */}
                <div onClick={() => setShowNav(prev => !prev)} className={cx('bars')}>
                    <FontAwesomeIcon icon={faBars} />
                </div>
                {/* Logo */}
                <div className={cx('logo')}>
                    <Link to={routesConfig.home}>
                        <img src={images.logo} alt="Forum" />
                        <h4 className={cx('logo-title')}>ForumLanguages</h4>
                    </Link>
                </div>

                {/* Search */}
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        onChange={handleChange}
                        onKeyUp={handlers.handleKeyUp}
                        placeholder={t('searchPlaceholder')}
                    />
                    {searchValue && (
                        <button onClick={handlers.clearSearch} className={cx('clear')}>
                            <FontAwesomeIcon icon={faClose} />
                        </button>
                    )}
                    <button onMouseDown={(e) => e.preventDefault()} onClick={handlers.search} className={cx('search-btn')}>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>

                <div className={cx('btn-search__mobile')}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>

                {/* Actions */}
                <div className={cx('action')}>
                    {user?.name ? (
                        <>
                            <Tippy content={t('createTooltip')} placement="bottom">
                                <Button className={cx('create')} to={routesConfig.upload} normal round leftIcon={faPlus}>
                                    {t('create')}
                                </Button>
                            </Tippy>
                            <Button className={cx('chat')} onClick={toggleChat} iconText leftIcon={faCommentDots} />
                            <History
                                // items={notifications}
                                avatar={user.img}
                                header
                                title={t('notifications')}
                                textBtn={t('markRead')}>
                                <Button className={cx('notify-btn')} iconText leftIcon={faBell} />
                            </History>
                            <Menu items={menuItems} onChange={handleMenuChange}>
                                <Image
                                    className={cx('user-avatar')}
                                    src={user?.img}
                                    alt={user?.name || 'User Avatar'}
                                />
                            </Menu>
                        </>
                    ) : (
                        <>
                            <Button className={cx('btn-login')} to={routesConfig.login} normal round>
                                Login
                            </Button>
                            <Button className={cx('btn-register')} to={routesConfig.register} normal round>
                                Register
                            </Button>
                        </>
                    )}
                </div>
            </div>

            {notify.display && <Notifications message={notify.message} onClose={() => setNotify({})} />}
        </header>
    );
}

export default Header;
