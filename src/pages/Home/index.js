import { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';

import { searchService } from '~/apiServices';
import Post from '~/components/Post';
import styles from './Home.module.scss';
import { useScroll } from '~/hooks';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

function Home() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const location = useLocation();
    const { t } = useTranslation();

    useEffect(() => {
        initializePosts();
        // eslint-disable-next-line
    }, [location.search]);

    const getParamsFromURL = () => {
        const urlParams = new URLSearchParams(location.search);
        const content = urlParams.get('content')?.replace(/"/g, '') || ''
        const lang = urlParams.get('language')?.replace(/"/g, '') || ''
        return {
            content,
            lang,
        };
    };

    const fetchPosts = async ({ page, size, content, lang, token }) => {
        const res = await searchService(page, size, content, lang, token);
        if (res?.data) {
            if (res.data?.content.length > 0) {
                const data = res.data.content;

                setPosts((prev) => (page === 0 ? data : [...prev, ...data]));
            } else {
                alert(t('notFoundPost'));
            }
        } else {
            if (res.response.data.code === 40405) {
                alert(res.response.data.message);
            }
        }
    };

    const initializePosts = async () => {
        const { content, lang } = getParamsFromURL();
        const token = localStorage.getItem('authToken');

        setCurrentPage(0);
        setPosts([]);
        await fetchPosts({
            page: currentPage,
            size: 5,
            content,
            lang,
            token,
        });
    };

    useScroll(() => {
        const { content, lang } = getParamsFromURL();
        const token = localStorage.getItem('authToken');

        const nextPage = currentPage + 1;
        fetchPosts({
            page: nextPage,
            size: 5,
            content,
            lang,
            token,
        });
        setCurrentPage(nextPage);
    });

    return (
        <div className={cx('wrapper')}>
            {posts.map((post, index) => (
                <Fragment key={post.id || index}>
                    <Post data={post} />
                    <hr />
                </Fragment>
            ))}
        </div>
    );
}

export default Home;
