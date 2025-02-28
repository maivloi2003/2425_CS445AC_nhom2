import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";

import styles from './Post.module.scss'
import Image from "~/components/Image";
import Button from "~/components/Button";
import { faEllipsisVertical, faHeart as faHeartSolid, faEyeSlash, faBookmark, faPen, faShare, faTrash, faFlag, faClose } from "@fortawesome/free-solid-svg-icons";
import { faComment, faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { deletedPostService, getPostContentServices, getPostPollServices, likeService, voteMultipleServices, voteSingleServices } from "~/apiServices";
import Menu from "~/components/Popper/Menu";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";

const cx = classNames.bind(styles)

function Post({ data, profile = false }) {
    const [showLike, setShowLike] = useState(data.user_like || false);
    const [showModal, setShowModal] = useState(false);
    const [dataPost, setDataPost] = useState({});
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [deleteState, setDeleteState] = useState(false)
    const [likesCount, setLikesCount] = useState(data.like || 0);
    const { t } = useTranslation();

    const handleToggleModal = () => setShowModal((prev) => !prev);

    const token = localStorage.getItem('authToken')

    const getMenuItems = () => {
        const commonItems = [
            { icon: faBookmark, title: t('saveBtn') },
            { icon: faEyeSlash, title: t('hidden') },
        ];

        if (data.user_post) {
            return [
                { icon: faPen, title: t('edit') },
                ...commonItems,
                { icon: faTrash, title: t('deleted'), onClick: handleToggleModal },
            ];
        }
        return [...commonItems, { icon: faFlag, title: t('report') },
        ];
    };

    const handleDeletePost = async () => {
        const res = await deletedPostService(data.id, token)
        if (res?.data) {
            setDeleteState(true)
        }

        setShowModal(false)
    }

    useEffect(() => {
        const fetchApiTypePost = async () => {
            let res;
            if (data.type_post === 'CONTENT') {
                res = await getPostContentServices(data.id, token);
            } else {
                res = await getPostPollServices(data.id, token);
                const votedOptions = res?.data?.pollOptions
                    ?.filter(option => option.isSelected)  // Lọc các option đã được chọn
                    .map(option => option.id); // Lấy ID của các option đã vote
                setSelectedOptions(votedOptions || []);
            }
            if (res?.data) {
                setDataPost(res.data);
            }
        };

        fetchApiTypePost();
        // eslint-disable-next-line
    }, [data.id]);

    const handleToggleLike = async () => {
        if (!token) {
            alert('Login is required to like posts.');
            return;
        }
        const res = await likeService(data.id, token);
        if (res?.data) {
            setShowLike(res.data.liked);
            setLikesCount((prev) => (res.data.liked ? prev + 1 : Math.max(0, prev - 1)));
        } else {
            console.log(res);
        }
    }

    const handleShare = () => {
        const postUrl = `http://localhost:1407/post/${data.id}`
        navigator.clipboard.writeText(postUrl);
        alert(t('shareSuccess'));
    }

    const renderContent = () => {
        return dataPost.content?.split('\n').map((item, index) => (
            <Fragment key={index}>
                {item}
                <br />
            </Fragment>
        ));
    };

    const handleVote = async (e) => {
        e.preventDefault();
        if (selectedOptions.length > 0) {
            if (dataPost.typePoll === 'Multiple') {
                await voteMultipleServices(selectedOptions, token);
            } else {
                await voteSingleServices(selectedOptions[0], token);
            }
        }
    }

    const handleSelectOption = (optionId) => {
        setSelectedOptions(prev => {
            if (dataPost.typePoll === "Multiple") {
                return prev.includes(optionId) ? prev.filter(id => id !== optionId) : [...prev, optionId];
            } else {
                return [optionId];
            }
        });
    };

    if (deleteState) {
        return (
            <div className={cx("wrapper", { profile })}>
                <h3>{t('deleteSuccess')}</h3>
            </div>
        );
    }

    return (
        <Fragment>

            <div className={cx('wrapper', { profile })}>
                <div className={cx('header')}>
                    <div className={cx('user')}>
                        <Link to={`/users/${data.id_user}`} >
                            <Image className={cx('avatar')} src={data.img_user} />
                        </Link>
                        <Link className={cx('name')} to={`/users/${data.id_user}`}>{data.user_name}</Link>
                        <Link className={cx('date')} to={`/post/${data.id}`}>{format(new Date(data.created_at), 'dd/MM/yyyy HH:mm')}</Link>
                        <Link className={cx('language')} to={`/post/${data.id}`}>{data.language}</Link>

                    </div>
                    <div className={cx('more-btn')}>

                        {token ? (
                            <Menu
                                hideOnClick={true}
                                post={true}
                                items={getMenuItems()}
                            >
                                <Button iconText leftIcon={faEllipsisVertical} />
                            </Menu>
                        ) : (
                            <Button iconText leftIcon={faEllipsisVertical} />
                        )}
                    </div>
                </div>
                {data.type_post === 'CONTENT' ?
                    (
                        <>
                            <div className={cx('title')}>
                                <Link className={cx('text-title')} to={`/post/${data.id}`}>{dataPost.title}</Link>
                            </div>
                            <div className={cx('content')}>
                                <Link className={cx('text-content')} to={`/post/${data.id}`}>
                                    {renderContent()}
                                </Link>
                            </div>
                            {data.img && (
                                <div className={cx('img')}>
                                    <Link to={`/post/${data.id}`} className={cx('img-link')}>
                                        <Image src={dataPost.img_url} className={cx('img-src')} />
                                    </Link>
                                </div>
                            )}</>
                    ) : (
                        <>
                            <div className={cx('question')}>
                                <Link className={cx('text-question')} to={`/post/${data.id}`}>{dataPost.question}</Link>
                            </div>
                            <form className={cx('form-vote')} onSubmit={handleVote}>
                                {
                                    dataPost.pollOptions?.map(item => (
                                        <label htmlFor={item.id} key={item.id}>
                                            <input
                                                checked={selectedOptions.includes(item.id)}
                                                type={dataPost.typePoll === 'Multiple' ? "checkbox" : "radio"}
                                                id={item.id}
                                                name="answer"
                                                onChange={() => handleSelectOption(item.id)}
                                            />
                                            {item.optionText}
                                        </label>
                                    ))
                                }
                                <Button className={cx('vote-btn')} normal>Vote</Button>
                            </form>
                        </>
                    )}
                <div className={cx('interact')}>
                    <div className={cx('like')}>
                        <Button
                            like={showLike}
                            onClick={handleToggleLike}
                            className={cx('like-btn')}
                            round
                            normal
                            rightIcon={showLike ? faHeartSolid : faHeartRegular}
                        >
                            {likesCount}
                        </Button>
                    </div>
                    <div className={cx('comment')}>
                        <Button
                            to={`/post/${data.id}`}
                            className={cx('comment-btn')}
                            round
                            normal
                            rightIcon={faComment}
                        >
                            {`${data.comment || 0}`}
                        </Button>
                    </div>
                    <div className={cx('share')}>
                        <Button onClick={handleShare} className={cx('share-btn')} round normal rightIcon={faShare} />
                    </div>
                </div>
            </div>
            {
                showModal && (
                    <div className={cx('modal')}>
                        <div className={cx('container')}>
                            <div className={cx('modal-header')}>
                                <h3 className={cx('modal-heading')}>{t('deletedHeading')}</h3>
                                <Button onClick={handleToggleModal} iconCircle className={cx('modal-close')} leftIcon={faClose} />
                            </div>
                            <div className={cx('modal-body')}>
                                <p className={cx('modal-title')}>{t('deletedConfirm')}</p>
                            </div>
                            <div className={cx('modal-footer')}>
                                <Button onClick={handleToggleModal} round normal className={cx('btn-cancel')}>{t('deletedBtnCancel')}</Button>
                                <Button onClick={handleDeletePost} round deleted className={cx('btn-confirm')}>{t('deletedBtnYes')}</Button>
                            </div>
                        </div>
                    </div>
                )
            }
        </Fragment >
    );
}

export default Post;