import classNames from "classnames/bind";
import styles from './Profile.module.scss'
import Image from "~/components/Image";

const cx = classNames.bind(styles)

function Profile() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('avatar')}>
                    <Image className={cx('avatar-src')} alt='' />
                </div>
                <div className={cx('fullname')}>
                </div>
            </div>

            <div className={cx('body')}>
            </div>
        </div>

    );
}

export default Profile;
