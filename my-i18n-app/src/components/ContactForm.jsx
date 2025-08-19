import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const schema = Yup.object({
  name: Yup.string()
    .trim()
    .required("Name is required"),
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email is required"),
});

export default function ContactForm() {
  const formik = useFormik({
    initialValues: { name: "", email: "" },
    validationSchema: schema,
    onSubmit: async (values, helpers) => {
      // Simulate submit; replace with your API call
      console.log("Submitting:", values);
      await new Promise(r => setTimeout(r, 500));
      helpers.setSubmitting(false);
      helpers.resetForm();
      alert("Form submitted!");
    },
  });

  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = formik;

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 360, margin: "24px auto", fontFamily: "system-ui" }}>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        type="text"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Your name"
        style={{ display: "block", width: "100%", padding: 8, marginTop: 4 }}
      />
      {touched.name && errors.name && (
        <div style={{ color: "crimson", fontSize: 13, marginTop: 4 }}>{errors.name}</div>
      )}

      <div style={{ height: 12 }} />

      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="name@example.com"
        style={{ display: "block", width: "100%", padding: 8, marginTop: 4 }}
      />
      {touched.email && errors.email && (
        <div style={{ color: "crimson", fontSize: 13, marginTop: 4 }}>{errors.email}</div>
      )}

      <div style={{ height: 16 }} />

      <button type="submit" disabled={isSubmitting} style={{ padding: "8px 12px" }}>
        {isSubmitting ? "Submitting…" : "Submit"}
      </button>
    </form>
  );
}
