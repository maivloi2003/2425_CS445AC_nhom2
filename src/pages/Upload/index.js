import classNames from 'classnames/bind';
import {
    faBold,
    faImage,
    faItalic,
    faListUl,
    faPlus,
    faSquarePollVertical,
    faTrashCan,
    faUnderline,
    faXmarkCircle
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState, useCallback } from 'react';

import styles from './Upload.module.scss';
import Button from '~/components/Button';
import Image from '~/components/Image';
import { upImagePostService, uploadPostContentServices, uploadPostPollServices } from '~/apiServices';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

function Upload() {
    const [isSelected, setIsSelected] = useState(0);
    const [typePost, setTypePost] = useState('Content');
    const [showImg, setShowImg] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [textFormat, setTextFormat] = useState({ bold: false, italic: false, underline: false });
    const [languagePost, setLanguagePost] = useState('');

    const [contentForm, setContentForm] = useState({
        title: '',
        content: '',
        img_url: '',
    });

    const [pollForm, setPollForm] = useState({
        question: '',
        typePoll: '',
        createOptionDtoList: [{ option_text: '' }, { option_text: '' }],
    });

    const fileInputRef = useRef();
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        document.title = contentForm?.title || 'ForumLanguages';
    }, [contentForm]);

    useEffect(() => {
        if (typePost === 'Content') {
            setIsButtonDisabled(!(contentForm.title && contentForm.content && languagePost));
        } else {
            const hasValidOption = pollForm.createOptionDtoList.some(option => option.option_text.trim() !== '');
            setIsButtonDisabled(!(pollForm.question && languagePost && pollForm.typePoll && hasValidOption));
        }
    }, [contentForm, pollForm, languagePost, typePost]);

    const handleInputChange = (field, formType = 'content') => (e) => {
        const value = e.target.value;
        if (formType === 'content') {
            setContentForm(prev => ({ ...prev, [field]: value }));
        } else {
            setPollForm(prev => ({ ...prev, [field]: value }));
        }
    };

    const handleTypePoll = (e) => {
        setPollForm(prev => ({ ...prev, typePoll: e.target.id }))

    }

    const handleToggleFormat = useCallback((format) => {
        setTextFormat((prev) => ({ ...prev, [format]: !prev[format] }));
    }, []);

    const handleImageUpload = () => fileInputRef.current.click();

    const handleFileChange = (e) => {
        e.preventDefault();
        const imgFile = e.target.files[0];
        if (imgFile) {
            const reader = new FileReader();
            reader.onload = () => {
                setContentForm((prev) => ({ ...prev, img_url: reader.result }));
                setShowImg(true);
            };
            reader.readAsDataURL(imgFile);
        }
    };

    const removeOption = (index) => {
        setPollForm(prev => ({
            ...prev,
            createOptionDtoList: prev.createOptionDtoList.filter((_, i) => i !== index)
        }));
    };

    const handleOptionChange = (index) => (e) => {
        const value = e.target.value;
        setPollForm(prev => ({
            ...prev,
            createOptionDtoList: prev.createOptionDtoList.map((option, i) =>
                i === index ? { ...option, option_text: value } : option
            )
        }));
    };

    const addOption = (e) => {
        e.preventDefault();
        setPollForm((prev) => ({
            ...prev,
            createOptionDtoList: [...prev.createOptionDtoList, { option_text: '' }]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('authToken')
        if (typePost === 'Content') {
            let imgLink = contentForm.img_url;
            if (fileInputRef.current.files[0]) {
                imgLink = await upImagePostService(fileInputRef.current.files[0]);
                imgLink = imgLink?.result?.valid ? imgLink.result.link : '';
            }
            const data = { ...contentForm, img_url: imgLink || contentForm.img, language: languagePost };
            const res = await uploadPostContentServices(data, token);
            if (res?.data) {
                alert(t('uploadSuccess'))
                navigate(`/post/${res.data.id}`);
            } else {
                console.log(res);
            }

        } else if (typePost === 'Poll') {
            const data = { ...pollForm, language: languagePost };
            const res = await uploadPostPollServices(data, token);
            if (res?.data) {
                alert(t('uploadSuccess'))
                navigate(`/post/${res.data.id}`);
            } else {
                console.log(res);
            }
        }

    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h3 className={cx('header-heading')}>{t('createPost')}</h3>
            </div>
            <div className={cx('type')}>
                <Button
                    primary={isSelected === 0}
                    leftIcon={faListUl}
                    normal
                    onClick={() => {
                        setIsSelected(0);
                        setTypePost('Content')
                    }
                    }>Content</Button>
                <Button
                    primary={isSelected === 1}
                    leftIcon={faSquarePollVertical}
                    normal
                    onClick={() => {
                        setIsSelected(1);
                        setTypePost('Poll')
                    }
                    }>Poll</Button>
            </div>
            <form className={cx('form')} onSubmit={handleSubmit}>
                <div className={cx('kind')}>
                    <span className={cx('kind-title')}>{t('lang')}:</span>
                    <select
                        value={languagePost}
                        onChange={(e) => setLanguagePost(e.target.value)}
                        className={cx('kind-select')}
                    >
                        <option value='' disabled>{t('language')}</option>
                        <option value='English'>{t('langEnglish')}</option>
                        <option value='China'>{t('langChinese')}</option>
                        <option value='Japan'>{t('langJapanese')}</option>
                    </select>
                </div>
                <div className={cx('body')}>
                    {typePost === 'Content' ?
                        (
                            <>
                                <div className={cx('title')}>
                                    <input
                                        type='text'
                                        value={contentForm.title}
                                        onChange={handleInputChange('title')}
                                        className={cx('title-input')}
                                        placeholder={t('postTitlePlaceholder')}
                                    />
                                </div>
                                <div className={cx('content')}>
                                    <div className={cx('content-header')}>
                                        <Button iconNav leftIcon={faBold} onClick={() => handleToggleFormat('bold')} />
                                        <Button iconNav leftIcon={faItalic} onClick={() => handleToggleFormat('italic')} />
                                        <Button iconNav leftIcon={faUnderline} onClick={() => handleToggleFormat('underline')} />
                                        <Button type='button' iconNav leftIcon={faImage} onClick={handleImageUpload}>
                                            <input type='file' accept='image/*' hidden ref={fileInputRef} onChange={handleFileChange} />
                                        </Button>
                                        <Button iconNav leftIcon={faTrashCan} onClick={() => setContentForm((prev) => ({ ...prev, content: '' }))} />
                                    </div>
                                    <textarea
                                        className={cx('content-text', { bold: textFormat.bold, italic: textFormat.italic, underline: textFormat.underline })}
                                        value={contentForm.content}
                                        onChange={handleInputChange('content')}
                                        placeholder={t('content')}
                                    />
                                </div>
                                {showImg && contentForm.img_url && (
                                    <div className={cx('file')}>
                                        <Image className={cx('file-img')} src={contentForm.img} alt='Uploaded' />
                                    </div>
                                )}
                                <div className={cx('upload')}>
                                    <Button type='submit' round normal={!isButtonDisabled} disabled={isButtonDisabled} className={cx('upload-btn')}>
                                        {t('postBtn')}
                                    </Button>
                                </div>
                            </>
                        )
                        :
                        (
                            <>
                                <div className={cx('typePoll')}>
                                    <span className={cx('type-title')}>Type Poll</span>
                                    <label htmlFor='Single'>
                                        <input value={pollForm.typePoll} onChange={handleTypePoll} type='radio' id='Single' name='answer' />
                                        Single Answer
                                    </label>
                                    <label htmlFor='Multiple'>
                                        <input value={pollForm.typePoll} onChange={handleTypePoll} type='radio' id='Multiple' name='answer' />
                                        Multiple Answer
                                    </label>
                                </div>
                                <div className={cx('question')}>
                                    <textarea
                                        value={pollForm.question}
                                        onChange={handleInputChange('question', 'poll')}
                                        className={cx('question-text')}
                                        placeholder={'Question'}
                                    />
                                </div>
                                <div className={cx('options')}>
                                    {pollForm.createOptionDtoList.map((option, index) => (
                                        <div key={index} className={cx('option-item')}>
                                            <input
                                                value={pollForm.createOptionDtoList[index].option_text}
                                                onChange={handleOptionChange(index)}
                                                key={index}
                                                type='text'
                                                placeholder={`Option ${index + 1}`}
                                            />
                                            {pollForm.createOptionDtoList.length > 2 && (
                                                <Button className={cx('remove-btn')} onClick={() => removeOption(index)} leftIcon={faXmarkCircle} />
                                            )}
                                        </div>
                                    ))}
                                    <Button className={cx('option-btn')} leftIcon={faPlus} normal onClick={addOption}>Add Option</Button>
                                </div>
                                <div className={cx('upload')}>
                                    <Button type='submit' round normal={!isButtonDisabled} disabled={isButtonDisabled} className={cx('upload-btn')}>
                                        {t('postBtn')}
                                    </Button>
                                </div>
                            </>
                        )
                    }
                </div>
            </form>
        </div>
    );
}

export default Upload;
