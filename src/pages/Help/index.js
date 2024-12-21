import classNames from "classnames/bind";
import styles from './Help.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Fragment, useState } from "react";
import Image from "~/components/Image";
import images from "~/assets/images";

const cx = classNames.bind(styles);

function Help() {
    const [typeHelp, setTypeHelp] = useState('Register an account');
    const [isSelected, setIsSelected] = useState(0);

    const handleSelected = (e, index) => {
        setTypeHelp(e.target.innerHTML);
        setIsSelected(index);
    };

    const renderHelp = () => {
        let renderContent = ''
        switch (typeHelp) {
            case 'Register an account':
                renderContent = (
                    <Fragment>
                        <p>To register for a Forum account, users go to the link https://forumlanguages-2fbac.web.app/register.</p>
                        <p>Step 1: Fill in all information, includes: </p>
                        <ul>
                            <li>UserName: Use your account name to log in</li>
                            <li>Email: The system will send a confirmation message to this email</li>
                            <li>Language: The system will use this to suggest articles as well as browser language.</li>
                            <li>Password: Enter a password of more than 5 characters</li>
                        </ul>
                        <Image className={cx('img-help')} src={images.register} />
                        <p>Step 2: After filling in all the information, the user clicks on the register button.</p>
                        <p>If the registration is successful, the user will receive a "Register Successful" message and be redirected to the login page.</p>
                        <Image className={cx('img-help')} src={images.registerSuccess} />
                    </Fragment>
                )
                break;
            case 'Log in':
                renderContent = (
                    <Fragment>
                        <p>To log in to the Forum, users access the link https://forumlanguages-2fbac.web.app/login.</p>
                        <Image className={cx('img-help')} src={images.login} />
                        <p>Step 1: Fill in all information and clicks on the login button.</p>
                        <p>The system will check the accuracy of the information the user has just entered.</p>
                        <p>If the account and password are correct, the system will check whether the account has been activated or not.</p>
                        <p>If activated, the system will redirect the user to the home page. If not activated, the system will redirect the user to the account activation page.</p>
                        <Image className={cx('img-help')} src={images.activeAccount} />
                        <p>Step 2: Click the send button to send the account activation link to your email.</p>
                        <p>Step 3: After clicking the send button, the system will notify whether the sending was successful or not.</p>
                        <Image className={cx('img-help')} src={images.sendMailAA} />
                        <p>Then, the user should access the email of the account that just sent the activation code and click on the link to activate the account.</p>
                        <Image className={cx('img-help')} src={images.gmailAA} />
                        <p>Step 4: After clicking on the link, the system will lead the user to a page notifying whether the account activation was successful or not.</p>
                        <Image className={cx('img-help')} src={images.activeSuccess} />
                        <p>After successful activation, users can click on the link below "Go to the login page" to log in again.</p>
                    </Fragment>
                )
                break;
            case 'Forgot password':
                renderContent = (
                    <Fragment>
                        <p>Step 1: At the login interface, select the "Forgot password" feature.</p>
                        <Image className={cx('img-help')} src={images.login} />
                        <p>Step 2: Enter the email address used to register your account. Then select "Send"</p>
                        <Image className={cx('img-help')} src={images.forgotPW} />
                        <p>The system will automatically send an email with a link for you to set a new password.</p>
                        <Image className={cx('img-help')} src={images.sendMailPW} />
                        <p>Step 3: After receiving the email, the user clicks on the link the system sent to reset the password.</p>
                        <Image className={cx('img-help')} src={images.gmailPW} />
                        <p>Step 4: Enter the new password you want to set in the form below</p>
                        <Image className={cx('img-help')} src={images.resetPW} />
                    </Fragment>
                )
                break;
            case 'Post articles':
                renderContent = (
                    <Fragment>
                        <p>Step 1: Click the Create button on the header bar of the home page</p>
                        <Image className={cx('img-help')} src={images.homeCreate} />
                        <p>Step 2: Fill in all information, includes: </p>
                        <ul>
                            <li>Language: The language of the post.</li>
                            <li>Title: The title of the post.</li>
                            <li>Image: may or may not be present.</li>
                            <li>Content: The content of the post.</li>
                        </ul>
                        <Image className={cx('img-help')} src={images.upload} />
                        <p>Step 3: Click the post button to post</p>
                    </Fragment>
                );
                break;
            case 'View personal information':
                renderContent = (
                    <Fragment>
                        <p>Step 1: Click the Settings button in the avatar dialog box on the header bar.</p>
                        <Image className={cx('img-help')} src={images.homeInfo} />
                        <p>Step 2: Complete your real information and select "Save".</p>
                        <Image className={cx('img-help')} src={images.information} />
                    </Fragment>
                )
                break;
            default:
        }

        return renderContent
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('contain')}>
                <div className={cx('header')}>
                    <Link to='/' className={cx('home')}>Home</Link>
                    <FontAwesomeIcon icon={faChevronRight} />
                    <p className={cx('help')}>Help</p>
                </div>
                <div className={cx('body')}>
                    <ul className={cx('nav')}>
                        <li className={cx('heading')}>
                            <FontAwesomeIcon icon={faQuestionCircle} className={cx('icon-heading')} />
                            Frequently asked questions
                        </li>
                        {['Register an account', 'Log in', 'Forgot password', 'Post articles', 'View personal information'].map((item, index) => (
                            <li
                                key={index}
                                onClick={(e) => handleSelected(e, index)}
                                className={cx('item', { selected: isSelected === index })}
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                    <div className={cx('content')}>
                        {renderHelp()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Help;
