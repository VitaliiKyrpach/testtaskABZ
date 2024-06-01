import * as yup from "yup";

export const validSchema = yup.object().shape({
  name: yup.string().required("required").min(2).max(60),
  email: yup
    .string()
    .required("required")
    .min(2)
    .max(100)
    .matches(/^\w+@[a-zA-Z]+?\.[a-zA-Z]{2,3}$/, {
      message: "Please enter a valid email address",
    })
    .email("Invalid email address"),
  phone: yup
    .string()
    .max(13)
    .matches(/^\+?380\d{9}$/, { message: "Please enter a valid number" })
    .required("required"),
  position_id: yup.number().required("required").min(1),
  photo: yup
    .mixed()
    .required("required")
    .test("File is required", "File ", (file) => file)
    .test("fileSize", "File size must be less than 5MB", (file) => {
      if (file) {
        return file.size <= 5000000;
      }
      return false;
    })
    .test("fileFormat", "Only jpeg/jpg files are allowed", (file) => {
      if (file) {
        const isValid = ["jpeg", "jpg"];
        return isValid.includes(file.name.split(".").pop());
      }
      return false;
    }),
});
