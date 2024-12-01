import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import { faCircleInfo, faUser, faGear, faPlus, faSignOut, faClose, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import styles from './Header.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import Image from '~/components/Image';
import { Link } from 'react-router-dom';
import Menu from '~/components/Popper/Menu';

const cx = classNames.bind(styles);

const MENU_ITEMS = [

    {
        icon: faUser,
        title: 'Mai Văn Lợi',
        to: '/vloi03',
        separate: true
    },
    {
        icon: faGear,
        title: 'Setting',
        to: '/setting'
    },
    {
        icon: faCircleInfo,
        title: 'Support',
        to: '/support'
    },
    {
        icon: faSignOut,
        title: 'Logout',
        onClick: () => { localStorage.removeItem('authToken') },
        to: '/login',
    }
]

function Header() {
    const [searchValue, setSearchValue] = useState('');
    const [currentUser, setCurrentUser] = useState(localStorage.getItem('authToken'));
    const inputRef = useRef()

    useEffect(() => {
        const handleStorageChange = () => {
            setCurrentUser(localStorage.getItem('authToken'));
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [localStorage.getItem('authToken')]);

    const handleClear = () => {
        setSearchValue('')
        inputRef.current.focus()
    }

    const handleKeyUp = e => {
        if (e.target.code === 13) {
            alert('Enter')
        }
    }

    const handleSearch = () => {
        alert('Search')
    }

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <Link to="/">
                        <img src={images.logo} alt="Forum " />
                        <h4 className={cx('logo-title')}>ForumLanguages</h4>
                    </Link>
                </div>

                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyUp={(e) => handleKeyUp(e)}
                        placeholder="Search posts with content..."
                    />
                    {!!searchValue && (
                        <button onClick={handleClear} className={cx('clear')}>
                            <FontAwesomeIcon icon={faClose} />
                        </button>
                    )}
                    <button onClick={handleSearch} className={cx('search-btn')}>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>

                <div className={cx('action')}>
                    {
                        currentUser ? (
                            <>
                                <Tippy content="Create new post" placement='bottom'>
                                    <Button to={'/upload'} primary round leftIcon={faPlus}>Create</Button>
                                </Tippy>
                                <Button iconText leftIcon={faBell} />
                                <Menu items={MENU_ITEMS}>
                                    <Image className={cx('user-avatar')} src='https://fullstack.edu.vn/assets/images/f8_avatar.png' />
                                </Menu>
                            </>
                        ) : (
                            <>
                                <Button to={'/login'} primary round >Login</Button>
                                <Button to={'/register'} primary round >Register</Button>
                            </>
                        )
                    }

                </div>
            </div>
        </header>
    );
}

export default Header;
