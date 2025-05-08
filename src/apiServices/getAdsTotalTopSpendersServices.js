import * as request from '~/utils/request';
const getAdsTotalTopSpendersServices = async (start, end, token) => {
    try {
        const config = {
            params: {
                start,
                end,
                limit: 5
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        const res = await request.get('ads-total/top-spenders', config)
        return res;

    } catch (error) {
        return error;
    }
}
export default getAdsTotalTopSpendersServices