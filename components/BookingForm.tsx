// components/BookingForm.tsx
import React, { useState } from 'react'

interface FormData {
  email: string
  date: string
  hours: string
  package: string
  subject: string
}

const BookingForm = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    date: '',
    hours: '',
    package: '',
    subject: ''
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle form submission
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Add form fields */}
    </form>
  )
}

export default BookingForm