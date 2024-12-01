import classNames from "classnames/bind";
import styles from './ActiveAccount.module.scss'
import stylesGrid from '~/styles/grid.module.scss' 
import Button from "~/components/Button";
import Image from "~/components/Image";
import images from "~/assets/images";
import { sendEmailService } from "~/apiServices";
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from "react";


const cx = classNames.bind(styles)


function ActiveAccount() {

    const navigate = useNavigate()
    const timeRef = useRef()
    const btnSendRef = useRef()

    const [timer, setTimer] = useState(10)
    const [disable, setDisable] = useState(false)

    const handleCountdown = () => {
        // timeRef.current.style.display = 'block'
        const timeOut = setInterval(()=>{
            setTimer(prev => prev - 1)
            if(timer <= 0){
                console.log('het gio');
                
                clearInterval(timeOut)
                // timeRef.current.style.display = 'none'
                setDisable(false)
            }
        },1000)
        setDisable(true)
        
    }

    const fetchApi = async (token) => {
        const res = await sendEmailService(token)

        if(res.result && res.result.success === true){
            return true
        }

        return false
    }

    const handleSendEmail = async () => {
        const token = localStorage.getItem('authToken')
        if(token) {
            if(await fetchApi(token)) {
                handleCountdown()
                // navigate('/sendEmail')
            }
        }
    }

    return (
        <div className={`${cx('wrapper')} ${stylesGrid.grid}`}>
            <div className={` ${stylesGrid['grid__row-6']} ${cx('logo')}`}>
                <Image className={cx('logo-img')} src={images.logo} alt='Logo'/>
            </div>
            <div className={` ${stylesGrid['grid__row-6']} ${cx('content')} `}>
                <div className={cx('header')}>
                    <h4 className={cx('heading')}>Active Your Account</h4>  
                    <p className={cx('title')}>To active your account, we need to verify your email. Please press the send button and check your email.</p>
                </div>
                <div className={cx('body')}>
                    <div className={cx('send')}>
                        <Button ref={btnSendRef} disable={disable} onClick={handleSendEmail} className={cx('btn-send')} primary round>Send</Button>
                        <div ref={timeRef} className={cx('time-send')}>{`${timer}s`}</div>
                    </div>
                    <div className={cx('other')}>
                        <Button className={cx('link')} to='/login'>Sign in with another account?</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ActiveAccount;
