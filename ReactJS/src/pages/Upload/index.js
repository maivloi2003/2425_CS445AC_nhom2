import classNames from "classnames/bind";
import styles from './Upload.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "~/components/Button";

const cx = classNames.bind(styles)

function Upload() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h3 className={cx('header-heading')}>Create a Post</h3>
            </div>
            <form className={cx('form')}>
                <div className={cx('kind')}>
                    <span className={cx('kind-title')}>Language:</span>
                    <select name="language" className={cx('kind-select')}>
                        <option value="" disabled selected>Select your kind</option>
                        <option value="English">English</option>
                        <option value="China">China</option>
                        <option value="Japan">Japan</option>
                    </select>
                </div>
                <div className={cx('body')}>
                    <div className={cx('title')}>
                        <input type="text" className={cx('title-input')} name="title" placeholder="Title" />
                    </div>

                    <div className={cx('content')}>
                        <div className={cx('content-header')}></div>
                        <textarea name="content" className={cx('content-text" placeholder="Content Post..')}></textarea>
                    </div>

                    <div className={cx('file')}>
                        <label for="file-input" className={cx('file-label')}>
                            <div className={cx('file-icon')}>
                                <FontAwesomeIcon icon={faPlus} />
                                <FontAwesomeIcon icon={faImage} />
                            </div>
                        </label>
                        <img className={cx('file-img')} src="" alt="PreviewImage" />
                        <input className={cx('file-input')} type="file" name="image" id="file-input" accept=".jpg,.png" />
                    </div>
                    <div className={cx('upload')}>
                        <Button round normal className={cx('upload-btn')}>Post</Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Upload;
