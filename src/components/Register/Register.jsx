import { Container } from "../Container/Container"
import { Formik, Field, Form } from 'formik';
import * as yup from "yup";
import { Button } from "../Button/Button";
import { RadioButton } from "../RadioButton/RadioButton";
import { getRadio } from "../../services/api";
import { useEffect, useState } from "react";

const num = /^((\+?3)?8)?((0\(\d{2}\)?)|(\(0\d{2}\))|(0\d{2}))\d{7}$/;

const validSchema = yup.object().shape({
    name: yup.string().required("required"),
	email: yup
		.string()
		.required("required")
		.email("Invalid email address"),
    phone: yup.string().max(13)
		.matches(num, { message: "Please enter a valid number" }).required("required"),
    
});

export const Register = () => {
    const [radio, setRadio] = useState(null)
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
    return <section id='register' className="register">
        <Container>
            <h2 className='title'>Working with POST request</h2>
            <Formik
                validationSchema={validSchema}
                initialValues={{ name: '', email: '', phone: '', position: '' }}
                onSubmit={handleSubmit}
            >
                {props => (
                <Form>
                    <div className="inputGroup">
                    <div className="inputCover">
                    <Field className={`input ${props.errors.name && props.touched.name && 'inputError'}`} id='name' type="text" name="name" placeholder=" "/>
                    <label className={`label ${props.errors.name && props.touched.name && 'labelError'}`} htmlFor="name">Your name</label>
                    {props.errors.name && props.touched.name && (
						<p className='error'>{props.errors.name}</p>
					)}
                    </div>
                    <div className="inputCover">
                    <Field className={`input ${props.errors.name && props.touched.name && 'inputError'}`} id='email' type="email" name="email" placeholder=" "/>
                    <label className={`label ${props.errors.name && props.touched.name && 'labelError'}`} htmlFor="firstName">Email</label>
                    {props.errors.email && props.touched.email && (
						<p className='error'>{props.errors.email}</p>
					)}            
                    </div>
                    <div className="inputCover">
                    <Field className={`input ${props.errors.name && props.touched.name && 'inputError'}`} id='phone' type="number" name="phone" placeholder=" "/>
                    <label className={`label ${props.errors.name && props.touched.name && 'labelError'}`} htmlFor="firstName">Phone</label>
                    {props.errors.phone && props.touched.phone && (
						<p className='error'>{props.errors.phone}</p>
					)}           
                    </div>
                        </div>
                    <div >
                    <label htmlFor="position" >Select your position</label>
                    {radio && radio.map(option => ( 
                        <RadioButton
                            key={option.id}
                            id={option.id}
                            name="position"
                            value={option.name}
                            checked={props.values.position === option.name}
                            label={option.name}
                            onChange={() => props.setFieldValue('position', option.name)}
                        />
                    ))}
                </div>
                    <Button type='submit'>Sign up</Button>
                </Form>
                )}
            </Formik>
        </Container>
    </section>
}