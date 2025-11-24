import { useState } from "react";
import "./FAQ.css";

export default function FAQ() {
  const [selected, setSelected] = useState(null);

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };

  const data = [
    {
      question: "¿Cuales son los horarios de atencion?",
      answer:
        "Nuestro horario de atención es de lunes a viernes, de 8:30 AM a 4:30 PM. Estamos disponibles para responder tus consultas y ayudarte en lo que necesites durante estos horarios.",
    },
    {
      question: "¿Los lotes cuentan con acceso a electricidad y agua potable?",
      answer: (
        <>
          Sí. Todos nuestros lotes están diseñados para ofrecerte comodidad desde el primer día. El servicio de agua se contrata fácilmente con <strong>CLESA</strong>, una empresa reconocida por su excelente cobertura. La electricidad también está disponible para instalación inmediata.
        </>
      ),
    },
    {
      question: "¿Debo pagar prima para adquirir un lote?",
      answer: (
        <>
          ¡No! En ODESSA puedes iniciar tu proceso <strong>sin prima</strong>, lo que hace mucho más accesible comenzar tu inversión o tu proyecto residencial.
        </>
      ),
    },
    {
      question: "¿Puedo escriturar el lote al finalizar el pago?",
      answer: (
        <>
          Sí. Una vez completes el pago del lote, podés realizar la <strong>escrituración de inmediato</strong>. Contamos con una abogada interna que puede asistir durante el proceso, aunque también podés realizarlo con tu abogado de confianza.
        </>
      ),
    },
  ];

  return (
    <section id="faq-section" className="faq">
      <h2 className="faq-title">Preguntas Frecuentes</h2>

      <div className="faq-container">
        {data.map((item, i) => (
          <div key={i} className="faq-item">
            <div className="faq-header" onClick={() => toggle(i)}>
              <h3 className="faq-question">{item.question}</h3>
              <span className={selected === i ? "faq-icon active" : "faq-icon"}>
                +
              </span>
            </div>
            <div className={selected === i ? "faq-content show" : "faq-content"}>
              <p className="faq-answer">{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}