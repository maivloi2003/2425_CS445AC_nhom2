import classNames from "classnames/bind";
import styles from './Help.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import Image from "~/components/Image";
import images from "~/assets/images";
import { getLangService } from "~/apiServices";

const cx = classNames.bind(styles);

function Help() {
    const [isSelected, setIsSelected] = useState(0);
    const [language, setLanguage] = useState({});

    const fetchLanguage = async () => {
        const languageRes = await getLangService('English');
        if (languageRes?.result) {
            const resultObj = languageRes.result.reduce((acc, item) => {
                acc[item.keyName] = item.translated;
                return acc;
            }, {});
            localStorage.setItem('lang', JSON.stringify(resultObj));
            setLanguage(resultObj);
        }
    };

    useEffect(() => {
        const lang = JSON.parse(localStorage.getItem('lang'));
        if (lang) {
            setLanguage(lang);
        } else {
            fetchLanguage();
        }
    }, []);

    const handleSelected = (index) => {
        setIsSelected(index);
    };

    const renderHelp = () => {
        let renderContent = ''
        switch (isSelected) {
            case 0:
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
            case 1:
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
            case 2:
                renderContent = (
                    <Fragment>
                        <p>{language.helpForgotPWStep1}</p>
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
            case 3:
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
            case 4:
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
                        {[language?.helpRegister, language?.helpLogin, language?.helpForgot, language?.helpUpload, language?.helpInfo].map((item, index) => (
                            <li
                                key={index}
                                onClick={() => handleSelected(index)}
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
