import classNames from "classnames/bind";
import styles from './Setting.module.scss'
import Button from "~/components/Button";

const cx = classNames.bind(styles)

function Setting() {
    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('heading')}>Setting</h1>

            <ul className={cx('category')}>
                <li className={cx('item')} >Account</li>
                <li className={cx('item')} >Notify</li>
                <li className={cx('item')} >Privacy</li>
                <li className={cx('item')} >Theme</li>
                <li className={cx('item')} >Advance</li>
            </ul>

            <div className={cx('account')}>
                <span className={cx('account-heading')}>Account Information</span>
            </div>

            <div className={cx('email')}>
                <span className={cx('email-heading')}>
                    Email Address
                </span>
                <span className={cx('email-content')}>
                </span>
            </div>

            <div className={cx('gender')}>
                <div className={cx('gender-title')}>
                    <span className={cx('gender-heading')}>
                        Gender
                    </span>
                    <span className={cx('gender-content')}>
                        This information may be used to improve your recommendations
                    </span>
                </div>
                <select className={cx('gender-btn')}>
                    <option value="" disabled>Select your gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <div className={cx('language')}>
                <div className={cx('language-title')}>
                    <span className={cx('language-heading')}>
                        Display Language
                    </span>
                    <span className={cx('language-content')}>
                        Select the language you'd like to experience the Forum interface in
                    </span>
                </div>
                <select className={cx('language-btn')}>
                    <option value="" disabled>Select your language</option>
                    <option value="English">English</option>
                    <option value="China">China</option>
                    <option value="Japan">Japan</option>
                </select>
            </div>

            <div className={cx('delete')}>
                <div className={cx('delete-title')}>
                    <span className={cx('delete-heading')}>
                        Delete Account
                    </span>
                    <span className={cx('delete-content')}>
                        Be sure of your intention to delete your account.
                    </span>
                </div>
                <Button deleted round className={cx('delete-btn')}>Deleted Account</Button>
            </div>

            <div className={cx('save')}>
                <Button className={cx('save-btn')} round normal>Save</Button>
            </div>
        </div>
    );
}

export default Setting;
