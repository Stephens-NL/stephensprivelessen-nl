// components/FAQItem.tsx
interface FAQItemProps {
    question: string
    answer: string
  }
  
  const FAQItem = ({ question, answer }: FAQItemProps) => {
    return (
      <div className="faq-item">
        <h3>{question}</h3>
        <p>{answer}</p>
      </div>
    )
  }
  
  export default FAQItem