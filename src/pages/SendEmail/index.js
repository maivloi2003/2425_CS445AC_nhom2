import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { useLocation } from "react-router-dom";

import styles from './SendEmail.module.scss'
import stylesGrid from '~/styles/grid.module.scss'
import Image from "~/components/Image";
import images from "assets/images";
import routesConfig from '~/config/routes'
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Button from "~/components/Button";
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles)

function SendEmail() {
    const [message, setMessage] = useState('');
    const { t } = useTranslation();
    const location = useLocation()
    useEffect(() => {
        const pageName = location.state?.fromPage;
        if (pageName === 'activeAccount') {
            setMessage(t('titleSendMailActive'))
        } else if (pageName === 'forgotPassword') {
            setMessage(t('titleSendMailResetPW'))
        }
        // eslint-disable-next-line
    }, [location])

    return (
        <div className={`${cx('wrapper')} ${stylesGrid.grid}`}>
            <div className={`${cx('logo')} ${stylesGrid['grid__row-6']}`}>
                <Image src={images.logo} alt='logo' className={cx('img')} />
            </div>
            <div className={cx('nav')}>
                <Button to={routesConfig.forgotPassword} className={cx('icon-back')} leftIcon={faArrowLeft} />
            </div>
            <div className={`${cx('content')} ${stylesGrid['grid__row-6']}`}>
                <div className={cx('body')}>
                    <div className={cx('heading')}>
                        {t('checkMail')}
                    </div>
                    <div className={cx('title')}>
                        {message}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SendEmail;
