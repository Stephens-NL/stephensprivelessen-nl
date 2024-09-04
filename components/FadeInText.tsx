import { motion } from "framer-motion";

const FadeInText: React.FC<{ text: string; delay?: number }> = ({ text, delay = 0 }) => {
    const words = text.split(' ');
  
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay }}>
        {words.map((word, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + index * .075 }}
            style={{ display: 'inline-block', marginRight: '5px' }}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    );
  };

  export default FadeInText;