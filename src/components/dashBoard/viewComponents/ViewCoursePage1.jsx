import React from 'react';

const ViewCoursePage1 = () => {
  const courses = [
    {
      title: "Enrich Your Maths Class With GeoGebra",
      content: "For Middle Grade Teachers... 08 Webinars | Fee: 599 INR (Including GST)",
      details: [
        "Interactive webinars",
        "Hands-on GeoGebra tutorials",
        "Certificate of Completion"
      ],
      duration: "Course Duration: 4 Weeks"
    },
    {
      title: "Introduction to Useful Tools and Online Teaching Strategies",
      content: "5 Webinars | Free",
      details: [
        "Effective online teaching strategies",
        "Utilization of digital tools",
        "Engage students in a virtual classroom"
      ],
      duration: "Course Duration: 3 Weeks"
    }
  ];

  const handleEdit = (course) => {
    console.log("Edit course:", course);
    // Add your edit logic here
  };

  const handleDelete = (course) => {
    console.log("Delete course:", course);
    // Add your delete logic here
  };

  return (
    <div className="flex flex-col">
      {/* Header Section */}
      <section className="bg-no-repeat bg-right-top bg-[url('#')] p-10 lg:p-20 text-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="text-center w-full lg:w-2/3">
            <h1 className="text-4xl lg:text-6xl font-serif font-bold mb-5">Courses for School Teachers</h1>
            <p className="text-lg lg:text-xl mb-4">
              Globally the education is shifting to an online platform. With the COVID-19 pandemic, schools & colleges have moved online. This is our effort to empower teachers to learn, understand, and utilize tools for teaching in a technology-enabled online environment.
            </p>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {courses.map((course, index) => (
              <div key={index} className="p-6 bg-white border border-gray-200 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
                <p>{course.content}</p>
                <ul className="list-disc list-inside my-4">
                  {course.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
                <p className="font-semibold">{course.duration}</p>
                <div className="flex space-x-4 mt-4">
                  <button 
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleEdit(course)}
                  >
                    Edit
                  </button>
                  <button 
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDelete(course)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ViewCoursePage1;
