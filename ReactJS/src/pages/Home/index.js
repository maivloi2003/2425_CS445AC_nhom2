import { useEffect, useState } from 'react'
import classNames from 'classnames/bind';

import searchService from '~/apiServices/searchServices'
import Post from '~/components/Post';
import styles from './Home.module.scss'
import { useScroll } from '~/hooks'

const cx = classNames.bind(styles)

function Home({ contentRef }) {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    const fetchPosts = async (page) => {
        const res = await searchService(page)

        setPosts((prev) => [...prev, ...res]);
    }

    useEffect(() => {
        fetchPosts(currentPage);
    }, [currentPage])

    useScroll(contentRef, () => {
        setCurrentPage(prev => prev + 1)
    })

    return (
        <div className={cx('wrapper')}>
            {posts && posts.map((post, index) => (
                <Post data={post} key={index} />
            ))}
        </div>
    );
}

export default Home;
