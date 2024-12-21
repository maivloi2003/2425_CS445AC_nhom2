import classNames from "classnames/bind";
import styles from './AboutFL.module.scss'
import Image from "~/components/Image";
import images from "~/assets/images";

const cx = classNames.bind(styles)

function AboutFL() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('intro')}>
                <div className={cx('wrapper-intro')}>
                    <div className={cx('into-heading')}>
                        <h2>FORUM - A PLACE TO CONNECT, SHARE AND DEVELOP WITH LANGUAGE</h2>
                    </div>
                    <div className={cx('intro-body')}>
                        <div className={cx('intro-header')}>
                            <div className={cx('intro-logo')}>
                                <Image src={images.logo} alt='Forum' className={cx('intro-img')} />
                            </div>
                            <div className={cx('intro-context')}>
                                <h3>DID YOU KNOW?</h3>
                                <p>There are many people out there who struggle to learn a foreign language, not knowing where to start or how to stay motivated</p>
                                <p>Those in their 20s are confused by ineffective learning methods</p>
                                <p>Those in their 30s are busy with work and family, not having enough time to invest in themselves</p>
                                <p>By their 40s, many people regret not starting their language learning journey sooner.</p>
                            </div>
                        </div>
                        <p>Things would be different if they found a supportive community where people could learn from each other, share experiences, and motivate each other.</p>
                        <p>The Forum was built with the mission of becoming a multilingual forum (English, Chinese, Japanese), a bridge to help people overcome language barriers, accompany each other on the journey of conquering knowledge and developing themselves.</p>
                    </div>
                </div>
            </div>
            <div className={cx('section')}>
                <div className={cx('vision')}>
                    <div className={cx('wrapper-vision')}>
                        <h3>VISION</h3>
                        <p>To become the leading platform in the field of foreign language learning, where people can connect, learn and develop comprehensively. Forum will be trusted by the community not only for its quality content, but also for the way we bring inspiration and real value to each user.</p>
                    </div>
                </div>
                <div className={cx('core-values')}>
                    <div className={cx('wrapper-values')}>
                        <h3>CORE VALUES</h3>
                        <p><strong>Kindness:</strong> Every post, document or video on the Forum is carefully prepared and of high quality, ensuring usefulness for learners. We always put ourselves in your shoes, doing everything with the mindset of "if I were a learner, what would I need?".</p>
                        <p><strong>Connected thinking:</strong> The Forum is not only a place for you to learn foreign languages, but also a place for you to connect with fellow learners from all over the world. We believe that learning from others is the fastest and most effective way to learn.</p>
                        <p><strong>Always innovate and constantly learn:</strong> The Forum learns from its users, from the world's leading forums and always listens to feedback to improve the product.</p>
                        <p><strong>Sustainable thinking:</strong> The Forum does not aim for instant glitz. We focus on investing in content quality and building a community to create long-term value for learners.</p>
                    </div>
                </div>
                <div className={cx('benefits')}>
                    <div className={cx('wrapper-benefits')}>
                        <h3>WHAT DO YOU GET FROM FORUM?</h3>
                        <div className={cx('benefits-content')}>
                            <div className={cx('benefits-item')}>
                                <p><strong>1. Practical knowledge:</strong> The system of documents, lectures and visual tests helps you not only grasp the theory but also apply it immediately in practice.</p>
                                <p><strong>2. Self-study motivation:</strong> Forum builds an active learning community, where you can share difficulties, successes and receive support to maintain learning motivation.</p>
                            </div>
                            <div className={cx('benefits-item')}>
                                <p><strong>3. Save time:</strong> Learn what you need to learn. Don't get bogged down in too many ineffective methods.</p>
                                <p><strong>4. Inspiration:</strong> Your foreign language learning journey will not only be boring lessons, but also stories and articles that bring joy and inspiration.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('strategy')}>
                    <div className={cx('wrapper-strategy')}>
                        <h3>DEVELOPMENT STRATEGY</h3>
                        <p><strong>1. Training and community development:</strong></p>
                        <p>Forum will not only be a place to learn languages, but also a place where you can find trustworthy companions, experienced advisors to develop together.</p>
                        <p><strong>2 Quality products:</strong></p>
                        <p>Each post, each document or video tutorial is carefully moderated to ensure effectiveness and usefulness.</p>
                        <p><strong>3. Focus on users:</strong></p>
                        <p>Forum understands that the journey of learning a foreign language is sometimes very difficult. Therefore, we design a learning experience with many emotions, from images, sounds to attractive content, motivating you not to give up.</p>
                        <p><strong>4. Maintain and expand the community:</strong></p>
                        <p>Forum believes that success comes from satisfied users and willingness to share their experiences with others. We always listen to feedback and constantly improve the product to meet all the needs of learners.</p>
                    </div>
                </div>
            </div>
            <div className={cx('footer')}>
                <div className={cx('wrapper-footer')}>
                    <div className={cx('slogan')}>
                        <p>Hãy để Forum trở thành người bạn đồng hành của bạn trên hành trình chinh phục ngoại ngữ!</p>
                    </div>
                </div>
            </div >
        </div>
    );
}

export default AboutFL;