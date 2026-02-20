import { m } from "framer-motion";

const FadeInText: React.FC<{ text: string; delay?: number }> = ({ text, delay = 0 }) => {
    const wordsWithKeys = text.split(' ').reduce<{ word: string; key: string; pos: number }[]>(
      (acc, word, pos) => {
        acc.push({ word, key: `${word}-${pos}`, pos });
        return acc;
      },
      []
    );
  
    return (
      <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay }}>
        {wordsWithKeys.map(({ word, key, pos }) => (
          <m.span
            key={key}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + pos * .075 }}
            style={{ display: 'inline-block', marginRight: '5px' }}
          >
            {word}
          </m.span>
        ))}
      </m.div>
    );
  };

  export default FadeInText;