'use client';

import { longVersion, shortVersion } from "../../data";
import { FeedbackSystem } from "../../components/FeedbackSystem";

export default function FeedbackContent() {
  return (
    <FeedbackSystem longVersion={longVersion} shortVersion={shortVersion} />
  );
}
