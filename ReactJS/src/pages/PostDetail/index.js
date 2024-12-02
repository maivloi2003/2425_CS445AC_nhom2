import classNames from 'classnames/bind';
import styles from './PostDetail.module.scss'
import Post from '~/components/Post';

const cx = classNames.bind(styles)

function PostDetail() {
    return (
        <div className={cx('wrapper')}>
            <Post />
            <div className={cx('post-cmt')}>
                <div className={cx('post-cmt__frame')}>
                    <textarea name="comment" className={cx('post-cmt__textarea" placeholder="Add Comment" id="')}></textarea>
                    <button className={cx('post-cmt__btn" type="button')}>Comment</button>
                </div>

                <div className={cx('body-cmt')}>

                </div>

            </div>
        </div>
    );
}

export default PostDetail;
