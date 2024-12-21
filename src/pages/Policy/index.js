import classNames from "classnames/bind";
import styles from './Policy.module.scss'
import { Fragment, useState } from "react";

const cx = classNames.bind(styles)

function Policy() {
    const [policy, setPolicy] = useState('Content');
    const [isSelected, setIsSelected] = useState(0);

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
                <p>Forum is a vast network of communities that are created, run, and populated by you, the Forum users.</p>

                <p>Through these communities, you can post, comment, discuss, learn, debate, support, and connect with people who share your interests.</p>

                <p>While not every community may be for you (and you may find some unrelatable or even offensive), no community should be used as a weapon. Communities should create a sense of belonging for their members, not try to diminish it for others. Likewise, everyone on Forum should have an expectation of privacy and safety, so please respect the privacy and safety of others.</p>

                <p>Every community on Forum is defined by its users. Some of these users help manage the community as moderators. The culture of each community is shaped explicitly, by the community rules enforced by moderators, and implicitly, by the upvotes, downvotes, and discussions of its community members. Please abide by the rules of communities in which you participate and do not interfere with those in which you are not a member.</p>

                <p>Below the rules governing each community are the platform-wide rules that apply to everyone on Forum. These rules are enforced by us, the admins.</p>

                <p>Forum and its communities are only what we make of them together, and can only exist if we operate by a shared set of rules. We ask that you abide by not just the letter of these rules, but the spirit as well.</p>

                <div className={cx('rules')} id="rules">
                    <h2>Rules</h2>
                    <div>
                        <h3>Rule 1</h3>
                        <p>Remember the human. Forum is a place for creating community and belonging, not for attacking marginalized or vulnerable groups of people. Everyone has a right to use Forum free of harassment, bullying, and threats of violence. Communities and users that incite violence or that promote hate based on identity or vulnerability will be banned.</p>

                        <h3>Rule 2</h3>
                        <p>Abide by community rules. Post authentic content into communities where you have a personal interest, and do not cheat or engage in content manipulation (including spamming, vote manipulation, ban evasion, or subscriber fraud) or otherwise interfere with or disrupt Forum communities.</p>

                        <h3>Rule 3</h3>
                        <p>Respect the privacy of others. Instigating harassment, for example by revealing someone’s personal or confidential information, is not allowed. Never post or threaten to post intimate or sexually-explicit media of someone without their consent.</p>

                        <h3>Rule 4</h3>
                        <p>Do not share or encourage the sharing of sexual, abusive, or suggestive content involving minors. Any predatory or inappropriate behavior involving a minor is also strictly prohibited.</p>

                        <h3>Rule 5</h3>
                        <p>You don’t have to use your real name to use Forum, but don’t impersonate an individual or an entity in a misleading or deceptive manner.</p>

                        <h3>Rule 6</h3>
                        <p>Ensure people have predictable experiences on Forum by properly labeling content and communities, particularly content that is graphic, sexually-explicit, or offensive.</p>

                        <h3>Rule 7</h3>
                        <p>Keep it legal, and avoid posting illegal content or soliciting or facilitating illegal or prohibited transactions.</p>

                        <h3>Rule 8</h3>
                        <p>Don’t break the site or do anything that interferes with normal use of Forum.</p></div>

                </div>
                <div className={cx('enforcement')} id="enforcement">
                    <h2>Enforcement:</h2>
                    <p>We have a variety of ways of enforcing our rules, including, but not limited to</p>
                    <ul>
                        <li>Asking you nicely to knock it off</li>
                        <li>Asking you less nicely</li>
                        <li>Temliorary or liermanent susliension of accounts</li>
                        <li>Removal of lirivileges from, or adding restrictions to, accounts</li>
                        <li>Adding restrictions to Forum communities, such as adding NSFW tags or Quarantining</li>
                        <li>Removal of content</li>
                        <li>Banning of Forum communities</li>
                    </ul>
                </div>
            </Fragment>
        );
    }

    const renderPrivacyPolicy = () => {
        return (
            <Fragment>
                <h3>1. Collection of personal information</h3>

                <p>Forum will collect Customer information including: Full name; Contact address; Email; Phone number; Login name; Login password to set up a personal profile</p>
                <p>The content includes the required information declared by the Customer when registering an account on Forum</p>
                <p>When collecting personal information of Customers, Forum wishes to provide the most practical utilities to Customers, protect the rights and ensure respect for the privacy of Customers</p>
                <p>Within the scope of the terms, Forum commits not to sell, rent or exchange collected Customer information data to any subjects other than those listed in this Regulation</p>

                <h3>2. Use of personal information</h3>
                <p>Information collected from Customers is used within the scope of:</p>
                <ul>
                    <li>Providing consulting services to Customers based on the information provided by Customers.</li>
                    <li>Sending Customers notifications about information exchange activities between Forum and members.</li>
                    <li>Ensuring Customer safety when there is a risk of destruction, appropriation of Customer accounts and Customer impersonation activities.</li>
                    <li>Contacting Customers to provide goods/services when Customers purchase products/services on Forum's website. Confirming information when making purchases and deliveries.</li>
                    <li>Conducting surveys; promotional activities, providing updated information on website terms of operation that affect Customers; Customer information security is Forum's top priority when collecting Customer information data. Forum always tries to keep up with the standards for protecting customers' personal information; Forum requires re-confirmation of passwords when logging in to prevent unauthorized access to the Customer's personal information system. In case the Customer leaves the computer and has not logged out on the website, the system will automatically log out after a period of time.</li>
                </ul>

                <h3>3. Information storage time</h3>
                <p>Forum will retain the information collected from the Customer from the time the Customer declares the information until the Customer's account is deactivated.</p>

                <p>Forum will retain and use the customer's information when necessary to comply with legal obligations, resolve disputes and enforce Forum's agreements.</p>

                <p>The Customer may also withdraw consent to the collection, use and/or disclosure of the Customer's personal data that Forum is holding or controlling by emailing the Forum Administration's Customer Care Department at the email address contact@fullstack.edu.vn or by phone, and we will process these requests in accordance with the Privacy Policy as well as relevant laws. However, the Customer's withdrawal of consent may mean that Forum will not be able to continue to provide the Services to the Customer, and the Forum Administration may need to terminate your current relationship and/or your contract with Forum.</p>

                <h3>4. Change or remove personal information</h3>
                <p>Customers can check, update, adjust or cancel their personal information in the following ways:</p>
                <ul>
                    <li>Customers log into their accounts, go to settings and edit personal information.</li>
                    <li>Customers call the support phone number/support email of Forum Administration and request to edit personal information.</li>
                </ul>

                <h3>5. Personal information protection policy</h3>
                <p>Forum Management Board commits to protect Customer's personal information according to the following contents:</p>
                <ul>
                    <li>Commit to absolute confidentiality according to Forum's personal information protection policy.</li>
                    <li>Commit to absolute confidentiality of all online transaction information of Customers including information about transaction history; information about digital documents in the secure central data area.</li>
                    <li>Commit to not use, not transfer, not provide or disclose to any third party about the Customer's personal information without the Customer's permission except for other terms specified in this Regulation and according to the provisions of the Law.</li>
                    <li>In case of technical errors or data attacks, Forum Management Board is responsible for notifying the authorities and Customers within 03 days from the time the incident occurs.</li>
                </ul>

                <h3>6. Payment information protection policy</h3>
                <p>Forum is committed to ensuring strict implementation of necessary security measures for all payment activities performed on Forum's website/application.</p>
                <p>Payment transaction policy using international and domestic cards (internet banking) ensures compliance with the security standards of Payment Gateway Partners including:</p>
                <ul>
                    <li>Customer financial information will be protected during the transaction using SSL (Secure Sockets Layer) protocol.</li>
                    <li>Payment Card Industry Data Security Standard (PCI DSS) certification provided by Trustwave.</li>
                    <li>One-time password (OTP) sent via SMS to ensure authenticated account access.</li>
                    <li>128-bit MD5 encryption standard.</li>
                    <li>Principles and regulations on information security in the banking and finance industry as prescribed by the State Bank of Vietnam.</li>
                </ul>
                <p>Forum's payment transaction security policy applies to Customers:</p>
                <ul>
                    <li>Forum chỉ lưu chuỗi đã được mã hóa bởi Đối Tác Cổng Thanh Toán cung cấp cho Forum. Forum không trực tiếp lưu trữ thông tin thẻ khách hàng. Việc bảo mật thông tin thẻ thanh toán Khách hàng được thực hiện bởi Đối Tác Cổng Thanh Toán đã được cấp phép.</li>
                    <li>Đối với thẻ quốc tế: thông tin thẻ thanh toán của Khách hàng mà có khả năng sử dụng để xác lập giao dịch không được lưu trên hệ thống của Forum. Đối Tác Cổng Thanh Toán sẽ lưu trữ và bảo mật.</li>
                    <li>For domestic cards (internet banking), Forum only stores order code, transaction code and bank name.</li>
                </ul>

                <h3>7. Subjects of sharing personal information</h3>
                <p>Forum Management Board may share and disclose Customer's personal information when it believes that doing so is necessary to protect the Customer's interests, ensure the safety of transactions for the Customer and at the request of a competent third party.</p>

                <p>Forum Management Board may share Customer's personal information with the group of Companies within the Forum Group Education Technology Complex to research and introduce to Customers better products and services to each individual Customer. In case the Customer does not want to share information, Forum fully agrees when receiving a request from the Customer.</p>

                <p>Forum may disclose Customer's personal information at the request of lawyers as well as competent authorities.</p>
                <p>If Forum is involved in a merger or acquisition of all or a portion of its assets, you will be notified by email or a prominent notice on Forum's website of any change in ownership or uses of your personal information, as well as any rights you may have in relation to your personal information, to any third party with your consent.</p>

                <p>Forum and its partners use Cookies to remember your information when you visit the website. Cookies are small pieces of information that a website stores in your computer browser or on your hard drive when you visit any website.</p>

                <p>Forum uses third-party services to monitor the usefulness of the company to track the behavior of customers visiting our website. However, we have no access to or control over their Cookies. The information we collect through third-party tracking is completely anonymous and is used to improve our services and marketing effectiveness.</p>

                <p>Like most websites, we automatically aggregate information and store it in log files. This information includes Internet addresses, browser type and language, Internet service provider, incoming and outgoing pages, operating system, dates and times, and click information. We use this information to understand and analyze trends, to administer the site, and to research customer behavior, and to collect personal information about users.</p>

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
                        <option value='Content'>Content Policy</option>
                        <option value='Privacy'>Privacy Policy</option>
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