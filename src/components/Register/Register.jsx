import { Container } from "../Container/Container";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Button } from "../Button/Button";
import { RadioButton } from "../RadioButton/RadioButton";
import { Modal } from "../Modal/Modal";
import { getRadio, getToken } from "../../services/api";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../redux/catalogOperations";
import { handleSuccess } from "../../redux/catalogSlice.js";
import { selectSuccess } from "../../redux/catalogSelectors";
import { validSchema } from "../../schemas/schemas.js";

export const Register = () => {
  const isSuccess = useSelector(selectSuccess);
  const [modal, setModal] = useState(false);
  const [radio, setRadio] = useState(null);
  const [isAvatar, setIsAvatar] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategories = async () => {
      const result = await getRadio();
      setRadio(result.data.positions);
    };
    getCategories();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setModal(true);
      setTimeout(() => {
        setModal(false);
        dispatch(handleSuccess(false));
      }, 3000);
    }
  }, [isSuccess, dispatch]);

  const handleSubmit = async (values, { resetForm }) => {
    await getToken();
    dispatch(createUser(values));
    resetForm();
    setIsAvatar(false);
  };

  return (
    <section id="register" className="register">
      <Container>
        <h2 className="title">Working with POST request</h2>
        <Formik
          validationSchema={validSchema}
          initialValues={{
            name: "",
            email: "",
            phone: "",
            position_id: "",
            photo: "",
          }}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <Form className="form">
              <div className="inputGroup">
                <div className="inputCover">
                  <Field
                    className={`input ${
                      props.errors.name && props.touched.name
                        ? "inputError"
                        : ""
                    }`}
                    id="name"
                    type="text"
                    name="name"
                    placeholder=" "
                  />
                  <label
                    className={`label ${
                      props.errors.name && props.touched.name
                        ? "labelError"
                        : ""
                    }`}
                    htmlFor="name"
                  >
                    Your name
                  </label>
                  <ErrorMessage name="name" component="p" className="error" />
                </div>
                <div className="inputCover">
                  <Field
                    className={`input ${
                      props.errors.email && props.touched.email
                        ? "inputError"
                        : ""
                    }`}
                    id="email"
                    type="email"
                    name="email"
                    placeholder=" "
                  />
                  <label
                    className={`label ${
                      props.errors.email && props.touched.email
                        ? "labelError"
                        : ""
                    }`}
                    htmlFor="firstName"
                  >
                    Email
                  </label>
                  <ErrorMessage name="email" component="p" className="error" />
                </div>
                <div className="inputCover">
                  <Field
                    className={`input ${
                      props.errors.phone && props.touched.phone
                        ? "inputError"
                        : ""
                    }`}
                    id="phone"
                    type="number"
                    name="phone"
                    placeholder=" "
                  />
                  <label
                    className={`label ${
                      props.errors.phone && props.touched.phone
                        ? "labelError"
                        : ""
                    }`}
                    htmlFor="firstName"
                  >
                    Phone
                  </label>
                  {props.errors.phone && props.touched.phone ? (
                    <ErrorMessage
                      name="phone"
                      component="p"
                      className="error"
                    />
                  ) : (
                    <p className="helper">+38 (XXX) XXX - XX - XX</p>
                  )}
                </div>
              </div>
              <div className="radioCover">
                <label
                  htmlFor="position"
                  className={`positionLabel ${
                    props.errors.position_id && props.touched.position_id
                      ? "labelError"
                      : ""
                  }`}
                >
                  Select your position
                </label>
                {radio &&
                  radio.map((option) => (
                    <RadioButton
                      key={option.id}
                      id={option.id}
                      name="position_id"
                      value={option.name}
                      checked={props.values.position_id === option.id}
                      label={option.name}
                      onChange={() =>
                        props.setFieldValue("position_id", option.id)
                      }
                    />
                  ))}
              </div>
              <div className="uploadCover">
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  accept=".jpeg, .jpg"
                  onChange={(e) => {
                    const avatar = e.target.files[0];
                    if (avatar) {
                      props.setFieldValue("photo", avatar);
                      setIsAvatar(avatar);
                    }
                  }}
                  hidden
                />
                <label
                  className={`upload ${
                    props.errors.photo && props.touched.photo
                      ? "inputError"
                      : ""
                  }`}
                  htmlFor="photo"
                >
                  Upload
                </label>
                <div
                  className={`status ${isAvatar && "item"} ${
                    props.errors.photo && props.touched.photo
                      ? "inputError"
                      : ""
                  }`}
                >
                  {isAvatar ? isAvatar.name : "Upload your photo"}
                </div>
                <ErrorMessage name="photo" component="p" className="error" />
              </div>
              <Button type="submit" disable={!(props.isValid && props.dirty)}>
                Sign up
              </Button>
            </Form>
          )}
        </Formik>
        {modal && <Modal />}
      </Container>
    </section>
  );
};
