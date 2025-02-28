import classNames from "classnames/bind";
import styles from './Comment.module.scss'
import Button from '~/components/Button'
import Image from '~/components/Image';
import { faEllipsisVertical, faPen, faTrash, faFlag, faClose } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import Menu from "~/components/Popper/Menu";
import { useState } from "react";
import { deletedCommentService } from "~/apiServices";
import { format } from "date-fns";
const cx = classNames.bind(styles)

function Comment({ data, onDeleteSuccess }) {
    const [showModal, setShowModal] = useState(false);
    const { t } = useTranslation();
    const token = localStorage.getItem('authToken')

    const handleToggleModal = () => setShowModal((prev) => !prev);

    const getMenuItems = () => {
        if (data._user) {
            return [
                { icon: faPen, title: t('edit') },
                { icon: faTrash, title: t('deleted'), onClick: handleToggleModal },
            ];
        }
        return [{ icon: faFlag, title: t('report') }];
    };

    const handleDeleteComment = async () => {
        const token = localStorage.getItem('authToken')
        const res = await deletedCommentService(data.id, token)
        if (res?.data) {
            onDeleteSuccess(data.id)
        }

        setShowModal(false)
    }


    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <div className={cx('user')}>
                        <Image src={data.user_img} alt={data.user_name} className={cx('img')} />
                        <h3 className={cx('username')}>{data.user_name}</h3>
                        <span className={cx('datetime')}>{format(new Date(data.created_at), "dd/MM/yyyy HH:mm")}</span>
                    </div>
                    <div className={cx('more-btn')}>
                        {token && (
                            token ? (
                                <Menu
                                    hideOnClick={true}
                                    post={true}
                                    items={getMenuItems()}
                                >
                                    <Button iconText leftIcon={faEllipsisVertical} />
                                </Menu>
                            ) : (
                                <Button iconText leftIcon={faEllipsisVertical} />
                            )
                        )}
                    </div>
                </div>

                <div className={cx('content')}>
                    <span>{data.content}</span>
                </div>

                <div className={cx('interact')}>
                    <Button iconText className={cx('like')} >{t('reply')}</Button>
                    <Button iconText className={cx('reply')} >{t('like')}</Button>
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
                                <Button onClick={handleDeleteComment} round deleted className={cx('btn-confirm')}>{t('deletedBtnYes')}</Button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
}

export default Comment;