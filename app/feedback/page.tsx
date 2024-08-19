'use client';

import { longVersion, shortVersion } from "../../data";
import { FeedbackSystem } from "../../components/FeedbackSystem"; 

const page = () => {

  // Placeholder onSubmit function
  const handleSubmit = (formData: any) => {
    // Log the form data or display a placeholder message
    console.log("Form submitted with data:", formData);
    alert("Form submitted!"); // You can replace this with more advanced logic
  };

  return (
    <>
      <FeedbackSystem longVersion={longVersion} shortVersion={shortVersion}/>
    </>
  );
};

export default page;