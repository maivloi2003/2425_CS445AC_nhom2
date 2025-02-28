import classNames from "classnames/bind";
import styles from './Profile.module.scss';
import Image from "~/components/Image";
import { useContext, useEffect, useState } from "react";
import { getUserByIdService, getPostByIdUserService } from "~/apiServices";
import Post from "~/components/Post";
import { useScroll } from "~/hooks";
import Button from "~/components/Button";
import { ChatContext } from "~/context/ChatContext";
import { useLocation } from "react-router-dom";
import images from "assets/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function Profile() {
    const [user, setUser] = useState({ id: '', img: '', name: '' });
    const [currentPage, setCurrentPage] = useState(0);
    const [postsUser, setPostsUser] = useState([]);
    const [option, setOption] = useState('Post');
    const [userPrimary, setUserPrimary] = useState(false)
    const { toggleChat } = useContext(ChatContext);
    const idUserPrimary = JSON.parse(localStorage.currentUser);
    const location = useLocation();
    const token = localStorage.getItem("authToken");

    const getUserIdFromURL = () => {
        const url = window.location.pathname;
        return url.substring(url.lastIndexOf("/") + 1);
    };

    const handleGetPost = async (id, page) => {
        const res = await getPostByIdUserService(id, page, 5, token);
        if (res?.data) {
            const data = res.data.content;
            setPostsUser((prev) => (page === 0 ? data : [...prev, ...data]));
        } else {
            if (res.response.data.code === 40405) {
                alert(res.response.data.message);
            }
        }
    };

    const handleGetUser = async (id) => {
        const res = await getUserByIdService(id);
        if (res?.data) {
            const tempUser = res.data;
            if (tempUser.id === idUserPrimary.id) {
                setUserPrimary(true);
                console.log(userPrimary);

            }
            setUser({ id: tempUser.id, img: tempUser.img, name: tempUser.name });
            if (token) handleGetPost(tempUser.id, 0);
        }
    };

    useEffect(() => {
        const userId = getUserIdFromURL();
        if (userId) {
            setUserPrimary(false)
            setPostsUser([]);
            setCurrentPage(0);
            handleGetUser(userId);
        }
        // eslint-disable-next-line
    }, [location.pathname]);

    useScroll(() => {
        setCurrentPage((prev) => prev + 1);
    });

    useEffect(() => {
        if (user.id) {
            handleGetPost(user.id, currentPage);
        }
        // eslint-disable-next-line
    }, [currentPage]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Image src={user.img || images.avatar} className={cx('avatar')} alt='' />
                <div className={cx('fullname')}>{user.name}</div>
                {userPrimary ?
                    <div className={cx('action')}>
                        <Button onClick={() => setOption('Post')} primary={option === 'Post'} normal>Post</Button>
                        <Button onClick={() => setOption('Friends')} primary={option === 'Friends'} normal>Friends</Button>
                    </div> :
                    <div className={cx('action')}>
                        <Button primary>Add Friend</Button>
                        <Button onClick={toggleChat} normal>Chat</Button>
                    </div>
                }
            </div>

            {option === 'Post' ?
                <div className={cx('body')}>
                    {postsUser.map((post, index) => (
                        <Post profile key={post.id || index} data={post} />
                    ))}
                </div>
                :
                <div className={cx('body')}>
                    <div className={cx('list')}>
                        <div className={cx('item')}>
                            <div className={cx('box-left')}>
                                <Image src={images.avatar} className={cx('avatar-friends')} />
                                <h3 className={cx('name-friends')}>Van Loi</h3>
                            </div>
                            <div className={cx('box-right')}>
                                <Button className={cx('chat-friends')} normal>Chat</Button>
                                <FontAwesomeIcon className={cx('btn-more')} icon={faChevronDown} />
                            </div>
                        </div>
                        <div className={cx('item')}>
                            <div className={cx('box-left')}>
                                <Image src={images.avatar} className={cx('avatar-friends')} />
                                <h3 className={cx('name-friends')}>Van Loi</h3>
                            </div>
                            <div className={cx('box-right')}>
                                <Button className={cx('chat-friends')} normal>Chat</Button>
                                <FontAwesomeIcon className={cx('btn-more')} icon={faChevronDown} />
                            </div>
                        </div>
                        <div className={cx('item')}>
                            <div className={cx('box-left')}>
                                <Image src={images.avatar} className={cx('avatar-friends')} />
                                <h3 className={cx('name-friends')}>Van Loi</h3>
                            </div>
                            <div className={cx('box-right')}>
                                <Button className={cx('chat-friends')} normal>Chat</Button>
                                <FontAwesomeIcon className={cx('btn-more')} icon={faChevronDown} />
                            </div>
                        </div>
                        <div className={cx('item')}>
                            <div className={cx('box-left')}>
                                <Image src={images.avatar} className={cx('avatar-friends')} />
                                <h3 className={cx('name-friends')}>Van Loi</h3>
                            </div>
                            <div className={cx('box-right')}>
                                <Button className={cx('chat-friends')} normal>Chat</Button>
                                <FontAwesomeIcon className={cx('btn-more')} icon={faChevronDown} />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default Profile;
