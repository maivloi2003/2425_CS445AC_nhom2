import classNames from "classnames/bind";
import styles from './ChatPopup.module.scss';
import Button from "../Button";
import Image from "../Image";
import images from "assets/images";
import { faChevronDown, faClose, faCommentMedical, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { ChatContext } from "~/context/ChatContext";

const cx = classNames.bind(styles)

function ChatPopup() {
    const { isOpenChat, toggleChat } = useContext(ChatContext);

    return (
        <div>
            {isOpenChat && (
                <div className={cx('wrapper')}>
                    <div className={cx('nav')}>
                        <div className={cx('nav-header')}>
                            <Image src={images.logo} className={cx('logo-chat')} />
                            <h3 className={cx('title-chat')}>Chats</h3>
                            <Button leftIcon={faCommentMedical} />
                        </div>
                        <div className={cx('nav-body')}></div>
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('content-header')}>
                            <div>
                                <h4 className={cx('fullname-chat')}>vanloi2003</h4>
                            </div>
                            <div>
                                <Button leftIcon={faChevronDown} />
                                <Button onClick={toggleChat} leftIcon={faClose} />
                            </div>
                        </div>
                        <div className={cx('content-body')}>
                            <div className={cx('view-chat')}></div>
                            <div className={cx('box-chat')}>
                                <input type="text" placeholder="Message" />
                                <Button leftIcon={faPaperPlane} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ChatPopup;