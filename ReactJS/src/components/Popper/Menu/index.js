import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper'
import { useState } from 'react';
import MenuItem from './MenuItem';
import Header from './Header';

const cx = classNames.bind(styles);

function Menu({ children, items = [] }) {
    const [history, setHistory] = useState([{ data: items }]);

    const current = history[history.length - 1]

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (item.onClick) {
                            item.onClick()
                        } else if (isParent) {
                            setHistory(prev => [...prev, item.children])
                        }
                    }}
                />
            )
        })
    }

    return (
        <HeadlessTippy
            offset={[12, 8]}
            interactive
            delay={[0, 500]}
            placement='bottom-end'
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex='-1' {...attrs}>
                    <PopperWrapper className={cx('menu-popper')}>
                        {history.length > 1 && <Header title='' onClick={() => {
                            setHistory(prev => prev.slice(0, history.length - 1))
                        }} />}
                        {renderItems()}
                    </PopperWrapper>
                </ div>
            )}
        >
            {children}
        </HeadlessTippy>
    );
}

export default Menu;