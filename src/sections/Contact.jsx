import React, { useState } from "react";
import styled from "styled-components";

const Section = styled.section`
  min-height: 100vh;
  width: 80vw;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 48em) {
    width: 90vw;
  }
  @media (max-width: 30em) {
    width: 100vw;
  }
`;

const Left = styled.div`
  width: 50%;
  margin-top: 5%; /* Ajusta el margen superior */
  
  @media (max-width: 64em) {
    width: 100%; /* Ocupa todo el ancho en pantallas medianas y pequeñas */
    margin-top: 2rem; 
    padding: 2rem;
    backdrop-filter: blur(2px);
    background-color: ${(props) => `rgba(${props.theme.textRgba},0.4)`};
    border-radius: 20px;
  }

  @media (max-width: 30em) {
    width: 100%; /* Ajuste completo para pantallas pequeñas */
    padding: 1.5rem;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
  text-align: center;

  @media (max-width: 64em) {
    font-size: 2rem; /* Ajuste para pantallas medianas */
  }
  @media (max-width: 48em) {
    font-size: 1.75rem; /* Más pequeño para móviles */
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  input, textarea {
    padding: 0.75rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%; /* Asegura que los inputs ocupen todo el ancho */
  }

  textarea {
    resize: none;
  }

  button {
    padding: 0.75rem;
    background-color: #000; /* Color del botón */
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;

    &:hover {
      background-color: #007bff; /* Color al hacer hover */
    }

    @media (max-width: 64em) {
      font-size: 1rem;
    }
    @media (max-width: 48em) {
      font-size: 0.875rem; /* Ajuste para pantallas pequeñas */
    }
  }
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Maneja cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8085/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Mensaje enviado con éxito");
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert("Hubo un problema al enviar el mensaje");
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      alert("Error al enviar el mensaje");
    }
  };

  return (
    <Section id="fixed-target" className="contact">
      <Left>
        <Title>Contáctanos</Title>
        <Form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Tu nombre"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Tu correo electrónico"
            required
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tu mensaje"
            rows="5"
            required
          />
          <button type="submit">Enviar</button>
        </Form>
      </Left>
    </Section>
  );
};

export default Contact;
