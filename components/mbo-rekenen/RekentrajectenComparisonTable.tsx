'use client';

import { m } from 'framer-motion';
import { rekentrajectenComparison } from '@/data/pricingData';

function getCourseValue(course: (typeof rekentrajectenComparison.courses)[0], featureId: string, language: 'NL' | 'EN') {
  switch (featureId) {
    case 'duration': return course.duration[language];
    case 'lessons': return course.lessons[language];
    case 'personalSupport': return course.personalSupport[language];
    case 'contactHours': return course.contactHours[language];
    case 'pricePerPerson': return course.pricePerPerson;
    case 'pricePerLessonHour': return course.pricePerLessonHour;
    case 'refundPolicy': return course.refundPolicy[language];
    default: return '—';
  }
}

export function RekentrajectenComparisonTable({ language }: { language: 'NL' | 'EN' }) {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
      <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white p-8">
        <h3 className="text-3xl font-black tracking-tight mb-2">VOLLEDIGE VERGELIJKING</h3>
        <p className="text-gray-300">Alle details op een rij</p>
      </div>
      <div className="lg:hidden">
        {rekentrajectenComparison.courses.map((course, courseIndex) => (
          <m.div
            key={course.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: courseIndex * 0.1 }}
            className="border-b border-gray-200 last:border-b-0"
          >
            <div className={`p-6 bg-gradient-to-r ${course.color} bg-opacity-5`}>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">{course.name[language]}</h4>
              <div className="space-y-3">
                {rekentrajectenComparison.features.map((feature) => (
                  <div key={feature.id} className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">{feature.short[language]}:</span>
                    <span className="font-bold text-gray-900">{getCourseValue(course, feature.id, language)}</span>
                  </div>
                ))}
              </div>
            </div>
          </m.div>
        ))}
      </div>
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left p-6 text-gray-900 font-black text-lg">KENMERK</th>
              {rekentrajectenComparison.courses.map((course) => (
                <th
                  key={course.id}
                  className={`text-center p-6 font-black relative ${
                    course.featured ? `bg-gradient-to-b ${course.color} bg-opacity-5` : ''
                  }`}
                >
                  <div className="text-xl text-gray-900 mb-2">{course.name[language]}</div>
                  <div className="text-3xl font-black text-gray-900">{course.pricePerPerson}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rekentrajectenComparison.features.map((feature, index) => (
              <m.tr
                key={feature.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors duration-200"
              >
                <td className="p-6 text-gray-900 font-bold">{feature.label[language]}</td>
                {rekentrajectenComparison.courses.map((course) => (
                  <td
                    key={`${course.id}-${feature.id}`}
                    className={`p-6 text-center font-bold ${
                      course.featured ? `bg-gradient-to-b ${course.color} bg-opacity-5` : ''
                    }`}
                  >
                    <span
                      className={
                        feature.id === 'pricePerPerson' ? 'text-2xl font-black text-gray-900' : 'text-gray-700'
                      }
                    >
                      {getCourseValue(course, feature.id, language)}
                    </span>
                  </td>
                ))}
              </m.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
