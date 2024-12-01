import * as request from '~/utils/request'

const resetPassword = async (email) => {
    try {
        const res = request.post('mail/reset', {
            email,
        })
        return res
    } catch (error) {
        return error        
    }
}

export default resetPassword;