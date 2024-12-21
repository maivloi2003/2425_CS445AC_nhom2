import classNames from "classnames/bind";
import styles from './Policy.module.scss'
import { Fragment, useEffect, useState } from "react";

const cx = classNames.bind(styles)

function Policy() {
    const [policy, setPolicy] = useState('Content');
    const [isSelected, setIsSelected] = useState(0);
    const [language, setLanguage] = useState({});
    useEffect(() => {
        const lang = JSON.parse(localStorage.getItem('lang'));
        if (lang) {
            setLanguage(lang);
        }
    }, []);

    const handleSelected = (e, index) => {
        const targetId = e.target.innerText.toLowerCase();
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({ block: 'start' });
        }
        setIsSelected(index);
    };

    const renderContentPolicy = () => {
        return (
            <Fragment>
                <p>{language?.contentHeading1}</p>
                <p>{language?.contentHeading2}</p>
                <p>{language?.contentHeading3}</p>
                <p>{language?.contentHeading4}</p>
                <p>{language?.contentHeading5}</p>
                <p>{language?.contentHeading6}</p>
                <div className={cx('rules')} id="rules">
                    <h2>{language?.contentRules}</h2>
                    <div>
                        <h3>{language?.contentRule1}</h3>
                        <p>{language?.contentRule1Text}</p>
                        <h3>{language?.contentRule2}</h3>
                        <p>{language?.contentRule2Text}</p>
                        <h3>{language?.contentRule3}</h3>
                        <p>{language?.contentRule3Text}</p>
                        <h3>{language?.contentRule4}</h3>
                        <p>{language?.contentRule4Text}</p>
                        <h3>{language?.contentRule5}</h3>
                        <p>{language?.contentRule5Text}</p>
                        <h3>{language?.contentRule6}</h3>
                        <p>{language?.contentRule6Text}</p>
                        <h3>{language?.contentRule7}</h3>
                        <p>{language?.contentRule7Text}</p>
                        <h3>{language?.contentRule8}</h3>
                        <p>{language?.contentRule8Text}</p>
                    </div>
                </div>
                <div className={cx('enforcement')} id="enforcement">
                    <h2>{language?.contentEnforce}</h2>
                    <p>{language?.contentEnforceTitle}</p>
                    <ul>
                        <li>{language?.contentEnforceText1}</li>
                        <li>{language?.contentEnforceText2}</li>
                        <li>{language?.contentEnforceText3}</li>
                        <li>{language?.contentEnforceText4}</li>
                        <li>{language?.contentEnforceText5}</li>
                        <li>{language?.contentEnforceText6}</li>
                        <li>{language?.contentEnforceText7}</li>
                    </ul>
                </div>
            </Fragment>
        );
    }

    const renderPrivacyPolicy = () => {
        return (
            <Fragment>
                <h3>{language?.privacyHeading1}</h3>
                <p>{language?.privacyHeading1Text1}</p>
                <p>{language?.privacyHeading1Text2}</p>
                <p>{language?.privacyHeading1Text3}</p>
                <p>{language?.privacyHeading1Text4}</p>
                <h3>{language?.privacyHeading2}</h3>
                <p>{language?.privacyHeading2Title}</p>
                <ul>
                    <li>{language?.privacyHeading2Text1}</li>
                    <li>{language?.privacyHeading2Text2}</li>
                    <li>{language?.privacyHeading2Text3}</li>
                    <li>{language?.privacyHeading2Text4}</li>
                    <li>{language?.privacyHeading2Text5}</li>
                </ul>
                <h3>{language?.privacyHeading3}</h3>
                <p>{language?.privacyHeading3Text1}</p>
                <p>{language?.privacyHeading3Text2}</p>
                <p>{language?.privacyHeading3Text3}</p>
                <h3>{language?.privacyHeading4}</h3>
                <p>{language?.privacyHeading4Title}</p>
                <ul>
                    <li>{language?.privacyHeading4Text1}</li>
                    <li>{language?.privacyHeading4Text2}</li>
                </ul>
                <h3>{language?.privacyHeading5}</h3>
                <p>{language?.privacyHeading5Title}</p>
                <ul>
                    <li>{language?.privacyHeading5Text1}</li>
                    <li>{language?.privacyHeading5Text2}</li>
                    <li>{language?.privacyHeading5Text3}</li>
                    <li>{language?.privacyHeading5Text4}</li>
                </ul>
                <h3>{language?.privacyHeading6}</h3>
                <p>{language?.privacyHeading6Title1}</p>
                <p>{language?.privacyHeading6Title2}</p>
                <ul>
                    <li>{language?.privacyHeading6Text1}</li>
                    <li>{language?.privacyHeading6Text2}</li>
                    <li>{language?.privacyHeading6Text3}</li>
                    <li>{language?.privacyHeading6Text4}</li>
                    <li>{language?.privacyHeading6Text5}</li>
                </ul>
                <p>{language?.privacyHeading6Title3}</p>
                <ul>
                    <li>{language?.privacyHeading6Text5}</li>
                    <li>{language?.privacyHeading6Text6}</li>
                    <li>{language?.privacyHeading6Text7}</li>
                </ul>
                <h3>{language?.privacyHeading7}</h3>
                <p>{language?.privacyHeading7Text1}</p>
                <p>{language?.privacyHeading7Text2}</p>
                <p>{language?.privacyHeading7Text3}</p>
                <p>{language?.privacyHeading7Text4}</p>
                <p>{language?.privacyHeading7Text5}</p>
                <p>{language?.privacyHeading7Text6}</p>
                <p>{language?.privacyHeading7Text7}</p>

            </Fragment>
        );
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('category')}>
                    <select
                        className={cx('policy')}
                        id="policy"
                        name="policy"
                        value={policy}
                        onChange={(e) => setPolicy(e.target.value)}
                    >
                        <option value='Content'>{language?.policyContent}</option>
                        <option value='Privacy'>{language?.policyPrivacy}</option>
                    </select>
                    {policy === 'Content' && <div className={cx('nav')}>
                        {["rules", "enforcement"].map((item, index) => (
                            <li
                                key={index}
                                onClick={(e) => handleSelected(e, index)}
                                className={cx('item', { selected: isSelected === index })}
                            >
                                {item}
                            </li>
                        ))}
                    </div>}
                </div>
                <div className={cx('content')}>
                    <div className={cx('body')}>
                        {policy === 'Content' ? renderContentPolicy() : renderPrivacyPolicy()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Policy;