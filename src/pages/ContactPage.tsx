import React from 'react';
import styles from './ContactPage.module.css';
import { useForm, ValidationError } from '@formspree/react';

const ContactPage: React.FC = () => {

  // 👇 Reemplaza tu useState y tu handleSubmit
  const [state, handleSubmit] = useForm("xeobzrba");

  return (
    <div className={styles.pageContainer}>
      
      <header className={styles.header}>
        <h1 className={styles.title}>Contáctanos</h1>
      </header>

      <div className={styles.contentWrapper}>

        {/* --- IZQUIERDA: INFORMACIÓN --- */}
        <div className={styles.infoSection}>
          <div className={styles.infoBlock}>
            <h3>Visítanos</h3>
            <p>Zarco 302 Sur, Zona Centro.</p>
            <p>Gregorio Torres 104, Fraccionamiento Granja Graciela.</p>
            <p>Durango, Dgo.</p>
          </div>

          <div className={styles.infoBlock}>
            <h3>Llámanos</h3>
            <p>+52 (618) 8035-385</p>
            <p>+52 (618) 8047-416</p>
          </div>

          <div className={styles.infoBlock}>
            <h3>Escríbenos</h3>
            <p>magnifique.renta.vestidos@gmail.com</p>
          </div>

          <div className={styles.infoBlock}>
            <h3>Horario de Atención</h3>
            <p>Lunes a Sábado: 10:00 AM - 8:00 PM</p>
          </div>
        </div>

        {/* --- DERECHA: FORMULARIO --- */}
        <div className={styles.formSection}>

          {/* Si se envió exitosamente */}
          {state.succeeded ? (
            <p style={{ fontSize: "1.2rem", color: "#111" }}>
              ¡Gracias por escribirnos! Te responderemos muy pronto.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>

              <div className={styles.inputGroup}>
                <label htmlFor="name">Nombre Completo</label>
                <input id="name" type="text" name="name" required />
                <ValidationError prefix="Nombre" field="name" errors={state.errors} />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="email">Correo Electrónico</label>
                <input id="email" type="email" name="email" required />
                <ValidationError prefix="Email" field="email" errors={state.errors} />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="subject">Asunto</label>
                <input id="subject" type="text" name="subject" required />
                <ValidationError prefix="Asunto" field="subject" errors={state.errors} />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="message">Mensaje</label>
                <textarea id="message" name="message" rows={5} required />
                <ValidationError prefix="Mensaje" field="message" errors={state.errors} />
              </div>

              <button 
                type="submit" 
                disabled={state.submitting} 
                className={styles.submitButton}
              >
                {state.submitting ? "Enviando..." : "Enviar Mensaje"}
              </button>

            </form>
          )}

        </div>
      </div>

      {/* --- MAPA --- */}
      <div className={styles.mapContainer}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14578.129533271926!2d-104.67201609596918!3d24.012284455878767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x869bc98b7e242e0d%3A0x3cdc25f70f72e6ab!2sMagnifique%20Renta%20y%20Venta%20de%20Vestidos%20Zona%20Centro!5e0!3m2!1ses-419!2smx!4v1764282415369!5m2!1ses-419!2smx"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

    </div>
  );
};

export default ContactPage;
