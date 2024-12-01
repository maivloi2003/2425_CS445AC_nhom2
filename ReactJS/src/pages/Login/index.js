import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import stylesGrid from '~/styles/grid.module.scss'
import styles from '~/styles/share.module.scss'
import images from "~/assets/images";
import Image from "~/components/Image";
import { useValidator } from '~/hooks';
import FormGroup from '~/components/FormGroup';
import { loginService, checkActiveService } from '~/apiServices'

function Login() {
    const navigate = useNavigate()
    const [messageError, setMessageError] = useState({});
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const { errors, validateField, clearError, validateAll } = useValidator({
        rules: [
            useValidator.isRequired('username', 'This field is required'),
            useValidator.isRequired('password', 'This field is required'),
        ],
    });

    const fetchApiCheckActive = async (token) => {
        const res = await checkActiveService(token)
        if (res.result) {
            if (res.result.active === false) {
                return false
            } else {
                return true
            }
        }
    }

    const fetchApiLogin = async (data) => {
        const res = await loginService(data);
        if (!res.result) {
            const { code, message } = res.response.data
            if (code === 40401) {
                setMessageError({ username: message });
            } else if (code === 40101) {
                setMessageError({ password: message });
            }
        }
        else {
            const token = res.result.token
            if (await fetchApiCheckActive(token)) {
                localStorage.setItem('authToken', token)
                navigate('/')
            }
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        clearError(name);
    };

    const handleBlur = (e) => {
        validateField(e.target.name, formData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateAll(formData)) {
            await fetchApiLogin(formData);
        } else {
            console.log('Có lỗi xảy ra:', errors);
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={`${stylesGrid.grid} ${styles.register}`}>
                <div className={`${stylesGrid['grid__row-6']} ${styles.registerLogo}`}>
                    <Image className={styles.img} src={images.logo} />
                </div>
                <div className={`${stylesGrid['grid__row-6']} ${styles.registerContent}`}>
                    <form className={styles.form} id="form-2">
                        <h3 className={styles.heading}>Login</h3>
                        <p className={styles.desc}>Welcome To Forum Language</p>

                        <div className={styles.spacer}></div>

                        <FormGroup
                            name="username"
                            text='Username'
                            placeholder='Ex: maivanloi'
                            classNameFormGroup={styles.formGroup}
                            classNameLabel={styles.formLabel}
                            classNameInput={styles.formControl}
                            classNameError={styles.formMessage}
                            classNameInvalid={styles.invalid}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            value={formData.username}
                            valid={errors.username}
                            error={messageError.username}
                        />

                        <FormGroup
                            name="password"
                            text='Password'
                            type='password'
                            placeholder='Password'
                            classNameFormGroup={styles.formGroup}
                            classNameLabel={styles.formLabel}
                            classNameInput={styles.formControl}
                            classNameError={styles.formMessage}
                            classNameInvalid={styles.invalid}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            value={formData.password}
                            valid={errors.password}
                            error={messageError.password}
                        />

                        <button onClick={handleSubmit} className={styles.formSubmit}>Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
