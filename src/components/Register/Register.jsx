import { Container } from "../Container/Container"
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from "yup";
import { Button } from "../Button/Button";
import { RadioButton } from "../RadioButton/RadioButton";
import { createUser, getRadio, getToken } from "../../services/api";
import { useEffect, useState } from "react";

// const num = /^((\+?3)?8)?((0\(\d{2}\)?)|(\(0\d{2}\))|(0\d{2}))\d{7}$/;
const num = /^[\+]{0,1}380([0-9]{9})$/;

const validSchema = yup.object().shape({
    name: yup.string().required("required").min(2).max(60),
	email: yup
		.string()
		.required("required")
        .min(2)
        .max(100)
        .matches(/^\w+@[a-zA-Z]+?\.[a-zA-Z]{2,3}$/)
		.email("Invalid email address"),
    phone: yup.string().max(13)
		.matches(num, { message: "Please enter a valid number" }).required("required"),
    position_id: yup.number().required('required').min(1),
    photo: yup
        .mixed()
        .required('required')
        .test('File is required', 'File ', (file) => file)
        .test('fileSize', 'File size must be less than 5MB', file => {
            if (file) {
              return file.size <= 5000000;
            }
            return false;
          })
        .test('fileFormat', 'Only jpeg/jpg files are allowed', file => {
                if (file) {
              const isValid = ['jpeg', 'jpg'];
              return isValid.includes(file.name.split('.').pop());
            }
            return false;
          })
});

export const Register = () => {
    const [radio, setRadio] = useState(null);
    const [isAvatar, setIsAvatar] = useState(false);

    useEffect(() => {
    const getCategories = async () => {
      const result = await getRadio();
      setRadio(result.data.positions);
    };
    getCategories();
  }, []);

    const handleSubmit = async (values, { resetForm}) => {
        console.log(values)
        await getToken()
        const response = await createUser(values);
        console.log(response)
        resetForm();
        setIsAvatar(false)
	};

    return <section id='register' className="register">
        <Container>
            <h2 className='title'>Working with POST request</h2>
            <Formik
                validationSchema={validSchema}
                initialValues={{ name: '', email: '', phone: '', position_id: '', photo: '' }}
                onSubmit={handleSubmit}
            >
                {props => (
                <Form className="form">
                    <div className="inputGroup">
                        <div className="inputCover">
                        <Field className={`input ${props.errors.name && props.touched.name ? 'inputError' : ''}`} id='name' type="text" name="name" placeholder=" "/>
                        <label className={`label ${props.errors.name && props.touched.name ? 'labelError' : ''}`} htmlFor="name">Your name</label>
                        <ErrorMessage name="name" component="p" className='error' />
                        </div>
                        <div className="inputCover">
                        <Field className={`input ${props.errors.email && props.touched.email ? 'inputError' : ''}`} id='email' type="email" name="email" placeholder=" "/>
                        <label className={`label ${props.errors.email && props.touched.email ? 'labelError' : ''}`} htmlFor="firstName">Email</label>
                        <ErrorMessage name="email" component="p" className='error' />
                        </div>
                        <div className="inputCover">
                        <Field className={`input ${props.errors.phone && props.touched.phone ? 'inputError' : ''}`} id='phone' type="number" name="phone" placeholder=" "/>
                        <label className={`label ${props.errors.phone && props.touched.phone ? 'labelError' : ''}`} htmlFor="firstName">Phone</label>
                        {props.errors.phone && props.touched.phone ? <ErrorMessage name="phone" component="p" className='error' /> : 
                        <p className='helper'>+38 (XXX) XXX - XX - XX</p>}
                        </div>
                    </div>
                    <div className='radioCover'>
                        <label htmlFor="position" className={`positionLabel ${props.errors.position_id && props.touched.position_id ? 'labelError' : ''}`}>Select your position</label>
                        {radio && radio.map(option => ( 
                        <RadioButton
                            key={option.id}
                            id={option.id}
                            name="position_id"
                            value={option.name}
                            checked={props.values.position_id === option.id}
                            label={option.name}
                            onChange={() => props.setFieldValue('position_id', option.id)}
                        />
                        ))}
                    </div>
                    <div className='uploadCover'>
                        <input
                            type="file"
                            id="photo"
                            name="photo"
                            accept=".jpeg, .jpg"
                            onChange={(e)=> { 
                                const avatar = e.target.files[0];
                                if (avatar) {
                                    props.setFieldValue("photo", avatar);
                                    setIsAvatar(avatar)
                                    console.log(avatar)
                                }}}
                            hidden
                            />
                        <label className={`upload ${props.errors.photo && props.touched.photo ? 'inputError' : ''}`} htmlFor="photo">Upload</label>
                        <div className={`status ${isAvatar && 'item'} ${props.errors.photo && props.touched.photo ? 'inputError' : ''}`}>{isAvatar ? isAvatar.name : 'Upload your photo'}</div>
                        <ErrorMessage name="photo" component="p" className='error' />
                    </div>
                        <Button type='submit' disable={!(props.isValid && props.dirty)}>Sign up</Button>     
                </Form>
                )}
            </Formik>
        </Container>
    </section>
}