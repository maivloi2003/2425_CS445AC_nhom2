import * as request from '~/utils/request'

const search = async (page, size = 4, content = '', language = '') => {
    try {
        const res = await request.get('posts', {
            params: {
                page,
                size,
                content,
                language
            }
        })

        return res.result.content;
    } catch (error) {
        alert('Hết bài viết')
        return [];
    }
}

export default search;