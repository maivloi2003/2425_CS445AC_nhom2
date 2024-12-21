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
    const [language, setLanguage] = useState({});
    useEffect(() => {
        const lang = JSON.parse(localStorage.getItem('lang'));
        if (lang) {
            setLanguage(lang);
        }
    }, []);

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
                        <p>{language?.helpRegisterTitle}</p>
                        <p>{language?.helpRegisterStep1}</p>
                        <ul>
                            <li>{language?.helpRegisterUsername}</li>
                            <li>{language?.helpRegisterMail}</li>
                            <li>{language?.helpRegisterLang}</li>
                            <li>{language?.helpRegisterPW}</li>
                        </ul>
                        <Image className={cx('img-help')} src={images.register} />
                        <p>{language?.helpRegisterStep2}</p>
                        <p>{language?.helpRegisterCondition}</p>
                        <Image className={cx('img-help')} src={images.registerSuccess} />
                    </Fragment>
                )
                break;
            case 'Log in':
                renderContent = (
                    <Fragment>
                        <p>{language?.helpLoginTitle}</p>
                        <Image className={cx('img-help')} src={images.login} />
                        <p>{language?.helpLoginStep1}</p>
                        <p>{language?.helpLoginCheckIncorrect}</p>
                        <p>{language?.helpLoginCheckActive}</p>
                        <p>{language?.helpLoginDirect}</p>
                        <Image className={cx('img-help')} src={images.activeAccount} />
                        <p>{language?.helpLoginStep2}</p>
                        <p>{language?.helpLoginStep3}</p>
                        <Image className={cx('img-help')} src={images.sendMailAA} />
                        <p>{language?.helpLoginSendMail}</p>
                        <Image className={cx('img-help')} src={images.gmailAA} />
                        <p>{language?.helpLoginStep4}</p>
                        <Image className={cx('img-help')} src={images.activeSuccess} />
                        <p>{language?.helpLoginActiveSuccess}</p>
                    </Fragment>
                )
                break;
            case 'Forgot password':
                renderContent = (
                    <Fragment>
                        <p>{lang.helpForgotPWStep1}</p>
                        <Image className={cx('img-help')} src={images.login} />
                        <p>{language?.helpForgotPWStep2}</p>
                        <Image className={cx('img-help')} src={images.forgotPW} />
                        <p>{language?.helpForgotSendMail}</p>
                        <Image className={cx('img-help')} src={images.sendMailPW} />
                        <p>{language?.helpForgotPWStep3}</p>
                        <Image className={cx('img-help')} src={images.gmailPW} />
                        <p>{language?.helpForgotPWStep4}</p>
                        <Image className={cx('img-help')} src={images.resetPW} />
                    </Fragment>
                )
                break;
            case 'Post articles':
                renderContent = (
                    <Fragment>
                        <p>{language?.helpUploadStep1}</p>
                        <Image className={cx('img-help')} src={images.homeCreate} />
                        <p>{language?.helpUploadStep2}</p>
                        <ul>
                            <li>{language?.helpUploadLang}</li>
                            <li>{language?.helpUploadTitle}</li>
                            <li>{language?.helpUploadImage}</li>
                            <li>{language?.helpUploadContent}</li>
                        </ul>
                        <Image className={cx('img-help')} src={images.upload} />
                        <p>{language?.helpUploadStep3}</p>
                    </Fragment>
                );
                break;
            case 'View personal information':
                renderContent = (
                    <Fragment>
                        <p>{language?.helpInfoStep1}</p>
                        <Image className={cx('img-help')} src={images.homeInfo} />
                        <p>{language?.helpInfoStep2}</p>
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
                    <Link to='/' className={cx('home')}>{language?.helpHome}</Link>
                    <FontAwesomeIcon icon={faChevronRight} />
                    <p className={cx('help')}>{language?.helpHeading}</p>
                </div>
                <div className={cx('body')}>
                    <ul className={cx('nav')}>
                        <li className={cx('heading')}>
                            <FontAwesomeIcon icon={faQuestionCircle} className={cx('icon-heading')} />
                            {language?.helpQuestions}
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
