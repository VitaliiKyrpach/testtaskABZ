import svg from '../../img/sprite.svg'
import { Container } from "../Container/Container"
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from "yup";
import { Button } from "../Button/Button";
import { RadioButton } from "../RadioButton/RadioButton";
import { getRadio } from "../../services/api";
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
		.email("Invalid email address"),
    phone: yup.string().max(13)
		.matches(num, { message: "Please enter a valid number" }).required("required"),
    position: yup.number().required('required').min(1),
    file: yup
        .mixed()
        .required('required')
        .test('File is required', 'File ', (file) => file)
        .test('fileSize', 'File size must be less than 3MB', file => {
            if (file) {
              return file.size <= 3145728;
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

    const handleSubmit = async (values, { resetForm }) => {
        console.log(values)
		resetForm();
	};

    // const handleSetAvatar = (event, set) => {
    //     const avatar = event.target.files[0];
    //     if (avatar) {
    //         set("file", avatar);
    //         setIsAvatar(avatar)
    //         console.log(avatar)
    //     }
        
    //   };
    return <section id='register' className="register">
        <Container>
            <h2 className='title'>Working with POST request</h2>
            <Formik
                validationSchema={validSchema}
                initialValues={{ name: '', email: '', phone: '', position: '', file: '' }}
                onSubmit={handleSubmit}
            >
                {props => (
                <Form>
                    <div className="inputGroup">
                        <div className="inputCover">
                        <Field className={`input ${props.errors.name && props.touched.name && 'inputError'}`} id='name' type="text" name="name" placeholder=" "/>
                        <label className={`label ${props.errors.name && props.touched.name && 'labelError'}`} htmlFor="name">Your name</label>
                        {/* {props.errors.name && props.touched.name && (
                            <p className='error'>{props.errors.name}</p>
                        )} */}
                        <ErrorMessage name="name" component="p" className='error' />
                        </div>
                        <div className="inputCover">
                        <Field className={`input ${props.errors.email && props.touched.email && 'inputError'}`} id='email' type="email" name="email" placeholder=" "/>
                        <label className={`label ${props.errors.email && props.touched.email && 'labelError'}`} htmlFor="firstName">Email</label>
                        {/* {props.errors.email && props.touched.email && (
                            <p className='error'>{props.errors.email}</p>
                        )} */}
                        <ErrorMessage name="email" component="p" className='error' />
                        </div>
                        <div className="inputCover">
                        <Field className={`input ${props.errors.phone && props.touched.phone && 'inputError'}`} id='phone' type="number" name="phone" placeholder=" "/>
                        <label className={`label ${props.errors.phone && props.touched.phone && 'labelError'}`} htmlFor="firstName">Phone</label>
                        {/* {props.errors.phone && props.touched.phone && (
                            <p className='error'>{props.errors.phone}</p>
                        )} */}
                        <ErrorMessage name="phone" component="p" className='error' />
                        </div>
                    </div>
                    <div className='radioCover'>
                        <label htmlFor="position" className={`labelPosition ${props.errors.position && props.touched.position && 'labelError'}`}>Select your position</label>
                        {radio && radio.map(option => ( 
                        <RadioButton
                            key={option.id}
                            id={option.id}
                            name="position"
                            value={option.name}
                            checked={props.values.position === option.id}
                            label={option.name}
                            onChange={() => props.setFieldValue('position', option.id)}
                        />
                        ))}
                    </div>
                    <div className='uploadCover'>
                        {/* <input
                            type="file"
                            id="file"
                            name="file"
                            accept=".jpeg, .jpg"
                            onChange={()=> handleSetAvatar(e, props.setFieldValue)}
                            
                        /> */}
                        <input
                            type="file"
                            id="file"
                            name="file"
                            accept=".jpeg, .jpg"
                            onChange={(e)=> { 
                                const avatar = e.target.files[0];
                                if (avatar) {
                                    props.setFieldValue("file", avatar);
                                    setIsAvatar(avatar)
                                    console.log(avatar)
                                }}}
                            hidden
                        />
                        <label className='upload' htmlFor="file">Upload</label>
                        <div className={`status ${isAvatar && 'item'}`}>{isAvatar ? isAvatar.name : 'Upload your photo'}</div>
                        {/* {props.errors.file && props.touched.file && (
                            <p className='error'>{props.errors.file}</p>
                        )} */}
                        <ErrorMessage name="file" component="p" className='error' />
                    </div>
                    <Button type='submit'>Sign up</Button>
                </Form>
                )}
            </Formik>
        </Container>
    </section>
}