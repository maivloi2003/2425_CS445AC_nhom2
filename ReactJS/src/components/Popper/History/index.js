import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './History.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { useState, useMemo } from 'react';
import HistoryItem from './HistoryItem';
import Header from './Header';

const cx = classNames.bind(styles);

function History({ children, items = [], title, textBtn }) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];

    const handleItemClick = (item) => {
        if (item.onClick) {
            item.onClick();
        } else if (item.children) {
            setHistory((prev) => [...prev, item.children]);
        }
    };

    const renderItems = useMemo(
        () =>
            current.data.map((item, index) => (
                <HistoryItem key={index} data={item} onClick={() => handleItemClick(item)} />
            )),
        [current.data]
    );

    return (
        //Using a wrapper <div> or <span> tag around the reference
        //element solves this by creating a new parentNode context. 
        <div>
            <HeadlessTippy
                trigger='click'
                offset={[12, 8]}
                interactive
                hideOnClick='toggle'
                delay={[0, 100]}
                placement="bottom-end"
                render={(attrs) => (
                    <ul className={cx('history-list')} tabIndex="-1" {...attrs}>
                        <PopperWrapper className={cx('history-popper')}>
                            <Header title={title} textBtn={textBtn} />
                            <div className={cx('history-body')}>
                                {renderItems}
                            </div>
                        </PopperWrapper>
                    </ul>
                )}
            >
                {children}
            </HeadlessTippy>
        </div>
    );
}

export default History;
