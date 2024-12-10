import classNames from 'classnames/bind';
import styles from './History.module.scss';
import { Link } from "react-router-dom";
import Image from "~/components/Image";

const cx = classNames.bind(styles);

function HistoryItem({ data }) {



    return (
        <Link to='/' className={cx('history-item')}>
            <Image src={data.img} className={cx('avatar')}/>
            <div className={cx('message')}>
                <div className={cx('content')}>{data.content}</div>
                <div className={cx('createdTime')}>{data.createdTime}</div>
            </div>
        </Link>
    );
}

export default HistoryItem;