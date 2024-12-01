import { useState } from 'react';
import stylesGrid from '~/styles/grid.module.scss';
import styles from '~/styles/share.module.scss';
import images from '~/assets/images';
import Image from '~/components/Image';
import { useValidator } from '~/hooks';
import { registerService } from '~/apiServices'
import { useNavigate } from 'react-router-dom';
import FormGroup from '~/components/FormGroup';

function Register() {

    const [messageError, setMessageError] = useState({});
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        language: '',
        sex: '',
        username: '',
        password: '',
        repassword: ''
    });

    const navigate = useNavigate();

    const { errors, validateField, clearError, validateAll } = useValidator({
        rules: [
            useValidator.isRequired('fullname', 'This field is required'),
            useValidator.isRequired('email', 'This field is required'),
            useValidator.isEmail('email', 'Email address is not valid'),
            useValidator.isRequired('language', 'This field is required'),
            useValidator.isRequired('sex', 'This field is required'),
            useValidator.isRequired('username', 'This field is required'),
            useValidator.isRequired('password', 'This field is required'),
            useValidator.minLength('password', 5, 'Password must have at least 5 characters'),
            useValidator.isRequired('repassword', 'This field is required'),
            useValidator.isPasswordMatch('repassword', 'password', 'Passwords do not match'),
        ]
    });

    const fetchApi = async (data) => {
        const res = await registerService(data);

        if (res.result) {
            alert('Register Success!!')
            navigate('/login');
        } else {
            const { code, message } = res.response.data
            if (code === 40001) {
                setMessageError({ 'username': message })
            } else if (code === 40002) {
                setMessageError({ 'email': message })
            }

        }
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        clearError(name);
    };

    const handleBlur = e => validateField(e.target.name, formData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateAll(formData)) {
            await fetchApi(formData)
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={`${stylesGrid.grid} ${styles.register}`}>
                <div className={`${stylesGrid['grid__row-6']} ${styles.registerLogo}`}>
                    <Image className={styles.img} src={images.logo} />
                </div>
                <div className={`${stylesGrid['grid__row-6']} ${styles.registerContent}`}>
                    <form className={styles.form} id="form-1">
                        <h3 className={styles.heading}>Register</h3>
                        <p className={styles.desc}>Welcome To Forum Language</p>

                        <div className={styles.spacer}></div>

                        <FormGroup
                            name="fullname"
                            text='Full Name'
                            placeholder='Ex: Nguyen Van A'
                            classNameFormGroup={styles.formGroup}
                            classNameLabel={styles.formLabel}
                            classNameInput={styles.formControl}
                            classNameError={styles.formMessage}
                            classNameInvalid={styles.invalid}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            value={formData.fullname}
                            valid={errors.fullname}
                        />

                        <FormGroup
                            name="email"
                            text='Email'
                            placeholder='Ex: outlook@domain.com'
                            classNameFormGroup={styles.formGroup}
                            classNameLabel={styles.formLabel}
                            classNameInput={styles.formControl}
                            classNameError={styles.formMessage}
                            classNameInvalid={styles.invalid}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            value={formData.email}
                            valid={errors.email}
                            error={messageError.email}
                        />

                        <div className={`${styles.formGroup} ${errors.language ? styles.invalid : ''}`}>
                            <label htmlFor="language" className={styles.formLabel}>Language</label>
                            <select
                                className={styles.formControl}
                                id="language"
                                name="language"
                                value={formData.language}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                                <option value="" disabled>Select your language</option>
                                <option value="English">English</option>
                                <option value="China">China</option>
                                <option value="Japan">Japan</option>
                            </select>
                            {errors.language && <span className={styles.formMessage}>{errors.language}</span>}
                        </div>

                        <div className={`${styles.formGroup} ${errors.sex ? styles.invalid : ''}`}>
                            <label htmlFor="sex" className={styles.formLabel}>Gender</label>
                            <select
                                className={styles.formControl}
                                id="sex"
                                name="sex"
                                value={formData.sex}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                                <option value="" disabled>Select your gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.sex && <span className={styles.formMessage}>{errors.sex}</span>}
                        </div>

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
                            type='password'
                            text='Password'
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
                        />

                        <FormGroup
                            name="repassword"
                            type='password'
                            text='Password Confirm'
                            placeholder='Password Confirm'
                            classNameFormGroup={styles.formGroup}
                            classNameLabel={styles.formLabel}
                            classNameInput={styles.formControl}
                            classNameError={styles.formMessage}
                            classNameInvalid={styles.invalid}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            value={formData.repassword}
                            valid={errors.repassword}
                        />

                        <button onClick={handleSubmit} className={styles.formSubmit}>Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
