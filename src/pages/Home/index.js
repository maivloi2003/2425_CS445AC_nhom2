import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';

import { searchService } from '~/apiServices';
import Post from '~/components/Post';
import styles from './Home.module.scss';
import { useScroll } from '~/hooks';

const cx = classNames.bind(styles);

function Home() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [currentUser, setCurrentUser] = useState({});
    const [language, setLanguage] = useState({});
    const location = useLocation();
    const [isLoadUser, setIsLoadUser] = useState(false);

    useEffect(() => {
        const userCurrent = JSON.parse(localStorage.getItem('currentUser'));
        const lang = JSON.parse(localStorage.getItem('lang'));
        setCurrentUser(userCurrent);
        setLanguage(lang);
        setIsLoadUser(true)
    }, []);

    useEffect(() => {
        if (isLoadUser) {
            initializePosts();
        }
        // eslint-disable-next-line
    }, [location.search, language, isLoadUser]);

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
        if (res?.result) {
            if (res.result.content.length > 0) {
                const data = res.result.content;
                setPosts((prev) => (page === 0 ? data : [...prev, ...data]));
            } else {
                alert(language?.notFoundPost);
            }
        } else {
            if (res.response.data.code === 40405) {
                alert(res.response.data.message);
            }
        }
    };

    const initializePosts = async () => {
        const { content, lang } = getParamsFromURL();
        const token = currentUser ? localStorage.getItem('authToken') : undefined;

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
        const token = currentUser ? localStorage.getItem('authToken') : undefined;

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
                <Post language={language} data={post} key={post.id || index} />
            ))}
        </div>
    );
}

export default Home;