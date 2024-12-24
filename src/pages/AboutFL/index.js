import classNames from "classnames/bind";
import styles from './AboutFL.module.scss'
import Image from "~/components/Image";
import images from "~/assets/images";
import { useEffect, useState } from "react";
import { getLangService } from "~/apiServices";

const cx = classNames.bind(styles)

function AboutFL() {
    const [language, setLanguage] = useState({});
    useEffect(() => {
        const lang = JSON.parse(localStorage.getItem('lang'));
        if (lang) {
            setLanguage(lang);
        } else {
            const languageRes = getLangService('English')
            if (languageRes?.result) {
                const resultObj = languageRes.result.reduce((acc, item) => {
                    acc[item.keyName] = item.translated;
                    return acc;
                }, {});
                localStorage.setItem('lang', JSON.stringify(resultObj))
                setLanguage(resultObj)
            }
        }
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('intro')}>
                <div className={cx('wrapper-intro')}>
                    <div className={cx('into-heading')}>
                        <h2>{language?.aboutHeading}</h2>
                    </div>
                    <div className={cx('intro-body')}>
                        <div className={cx('intro-header')}>
                            <div className={cx('intro-logo')}>
                                <Image src={images.logo} alt='Forum' className={cx('intro-img')} />
                            </div>
                            <div className={cx('intro-context')}>
                                <h3>{language?.introHeading}</h3>
                                <p>{language?.introText1}</p>
                                <p>{language?.introText2}</p>
                                <p>{language?.introText3}</p>
                                <p>{language?.introText4}</p>
                            </div>
                        </div>
                        <p>{language?.introTitle1}</p>
                        <p>{language?.introTitle2}</p>
                    </div>
                </div>
            </div>
            <div className={cx('section')}>
                <div className={cx('vision')}>
                    <div className={cx('wrapper-vision')}>
                        <h3>{language?.visionHeading}</h3>
                        <p>{language?.visionText}</p>
                    </div>
                </div>
                <div className={cx('core-values')}>
                    <div className={cx('wrapper-values')}>
                        <h3>{language?.valuesHeading}</h3>
                        <p><strong>{language?.valueText1Strong}</strong>{language?.valueText1}</p>
                        <p><strong>{language?.valueText2Strong}</strong>{language?.valueText2}</p>
                        <p><strong>{language?.valueText3Strong}</strong>{language?.valueText3}</p>
                        <p><strong>{language?.valueText4Strong}</strong>{language?.valueText4}</p>
                    </div>
                </div>
                <div className={cx('benefits')}>
                    <div className={cx('wrapper-benefits')}>
                        <h3>{language?.benefitsHeading}</h3>
                        <div className={cx('benefits-content')}>
                            <div className={cx('benefits-item')}>
                                <p><strong>{language?.benefitsText1Strong}</strong>{language?.benefitsText1}</p>
                                <p><strong>{language?.benefitsText2Strong}</strong>{language?.benefitsText2}</p>
                            </div>
                            <div className={cx('benefits-item')}>
                                <p><strong>{language?.benefitsText3Strong}</strong>{language?.benefitsText3}</p>
                                <p><strong>{language?.benefitsText4Strong}</strong>{language?.benefitsText4}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('strategy')}>
                    <div className={cx('wrapper-strategy')}>
                        <h3>{language?.strategyHeading}</h3>
                        <p><strong>{language?.strategyText1Strong}</strong></p>
                        <p>{language?.strategyText1}</p>
                        <p><strong>{language?.strategyText2Strong}</strong></p>
                        <p>{language?.strategyText2}</p>
                        <p><strong>{language?.strategyText3Strong}</strong></p>
                        <p>{language?.strategyText3}</p>
                        <p><strong>{language?.strategyText4Strong}</strong></p>
                        <p>{language?.strategyText4}</p>
                    </div>
                </div>
            </div>
            <div className={cx('footer')}>
                <div className={cx('wrapper-footer')}>
                    <div className={cx('slogan')}>
                        <p>{language?.slogan}</p>
                    </div>
                </div>
            </div >
        </div>
    );
}

export default AboutFL;