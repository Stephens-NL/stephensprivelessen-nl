const testSubmission = async () => {
  const testData = {
    name: "Test Student",
    email: "test@example.com",
    phone: "0612345678",
    age: 20,
    level: "University",
    subject: "Calculus",
    goals: "Improve understanding of derivatives",
    location: "Online",
    preferredSchedule: "Weekday evenings",
    status: "Nieuw"
  };

  try {
    const response = await fetch('http://localhost:3000/api/submit-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const result = await response.json();
    console.log('Submission result:', result);
  } catch (error) {
    console.error('Test failed:', error);
  }
};

testSubmission(); 