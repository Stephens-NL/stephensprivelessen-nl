'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { motion } from 'framer-motion'

const LanguageToggle = () => {
    const { language, setLanguage } = useLanguage()

    const toggleLanguage = () => {
        setLanguage(language === 'EN' ? 'NL' : 'EN')
    }

    return (
        <motion.button
            onClick={toggleLanguage}
            className="px-3 py-1.5 rounded-full text-sm font-medium bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {language === 'EN' ? 'Nederlands?' : 'English?'}
        </motion.button>
    )
}

export default LanguageToggle 