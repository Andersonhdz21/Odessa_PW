import "./FAQ.css";

export default function FAQ() {
  return (
    <section id="faq-section" className="faq">
      <h2 className="faq-title">Preguntas Frecuentes</h2>

      <div className="faq-container">

        <div className="faq-item">
          <h3 className="faq-question">¿Los lotes cuentan con acceso a electricidad y agua potable?</h3>
          <p className="faq-answer">
            Sí. Todos nuestros lotes están diseñados para ofrecerte comodidad desde el primer día. 
            El servicio de agua se contrata fácilmente con <strong>Andrómeda Medusa</strong>, una empresa 
            reconocida por su excelente cobertura. La electricidad también está disponible para instalación inmediata.
          </p>
        </div>

        <div className="faq-item">
          <h3 className="faq-question">¿Debo pagar prima para adquirir un lote?</h3>
          <p className="faq-answer">
            ¡No! En ODESSA puedes iniciar tu proceso <strong>sin prima</strong>, lo que hace mucho más accesible 
            comenzar tu inversión o tu proyecto residencial.
          </p>
        </div>

        <div className="faq-item">
          <h3 className="faq-question">¿Puedo escriturar el lote al finalizar el pago?</h3>
          <p className="faq-answer">
            Sí. Una vez completes el pago del lote, podés realizar la <strong>escrituración de inmediato</strong>. 
            Contamos con una abogada interna que puede asistir durante el proceso, aunque también podés 
            realizarlo con tu abogado de confianza.
          </p>
        </div>

      </div>
    </section>
  );
}
