import React from 'react';

const CoursePage2 = () => {
  return (
    <div className="font-sans bg-gray-50">
      <Header />
      <CourseDetails />
      <Objectives />
      <Footer />
    </div>
  );
};

const Header = () => {
  return (
    <section className="bg-no-repeat bg-top-right bg-cover py-16" style={{ backgroundImage: 'url(https://mathscifound.org/wp-content/uploads/2019/09/language-school-06.png)' }}>
      <div className="max-w-6xl mx-auto flex flex-wrap items-center">
        <div className="w-full lg:w-1/2 px-4">
          <h1 className="font-serif text-5xl lg:text-6xl leading-tight mb-6 text-gray-800">Courses for College Students</h1>
          <p className="text-justify text-lg mb-8 text-gray-700">If you are currently studying in university or going to join the workforce, you are expected to have some skills of the 21st century - Data Driven Thinking and Digital Skills. These skills not only enhance your employment opportunities but also improve your academic or professional performance.</p>
          <Blurb title="Level - Beginner to Intermediate" icon="icon-160" />
          <Blurb title="Open for Enrolment" icon="icon-128" text="We are running multiple batches of the course as per registrations" />
        </div>
      </div>
      <Button text="Available Courses" />
    </section>
  );
};

const Blurb = ({ title, icon, text }) => {
  return (
    <div className="flex items-center mb-4">
      <i className={`text-xl text-teal-500 mr-2 ${icon}`}/>
      <div>
        <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
        {text && <p className="text-base text-gray-700">{text}</p>}
      </div>
    </div>
  );
};

const Button = ({ text }) => {
  return (
    <div className="text-center mt-8">
      <button className="bg-red-500 hover:bg-red-600 text-white rounded-full py-3 px-8 text-lg font-semibold tracking-wide transition duration-300">{text}</button>
    </div>
  );
};

const CourseDetails = () => {
  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-6xl mx-auto flex flex-wrap">
        <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0">
          <CallToAction title="Getting Started with Data Analysis on MS Excel with Basic Statistics" buttonText="Click Here" />
          <CourseDescription />
        </div>
        <div className="w-full lg:w-1/2 px-4">
          <CallToAction title="Essential Digital Skills for College Students" buttonText="Click Here" />
          <DigitalSkillsDescription />
        </div>
      </div>
      <div className="text-center mt-12">
        <Button text="Register for Courses on The Internet College" />
      </div>
    </section>
  );
};

const CallToAction = ({ title, buttonText }) => {
  return (
    <div className="bg-teal-600 text-white text-center p-8 rounded-lg mb-6 shadow-lg hover:bg-teal-700 transition duration-300">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <button className="bg-white hover:bg-gray-200 text-teal-600 rounded-full py-3 px-8 text-lg font-semibold tracking-wide transition duration-300">{buttonText}</button>
    </div>
  );
};

const CourseDescription = () => {
  return (
    <div>
      <p className="font-bold text-lg mb-4">10 Webinars | Fee: 599 INR (Including GST)</p>
      <p className="text-base mb-4 text-gray-700">Inferencing valuable information from data has become a valuable skill in today’s workplace...</p>
      <ul className="list-none mb-4 space-y-2">
        <li className="font-bold text-gray-800">Use spreadsheets for data management and analysis</li>
        <li className="font-bold text-gray-800">Identify relevant data for your research problem</li>
        <li className="font-bold text-gray-800">Become familiar with basic statistical concepts</li>
        <li className="font-bold text-gray-800">Apply quantitative methods to answer real-world questions in business and social sector</li>
        <li className="font-bold text-gray-800">Design and Conduct survey research</li>
        <li className="font-bold text-gray-800">Comprehend and analyze quantitative data</li>
      </ul>
      <h4 className="text-xl font-semibold mb-2 text-gray-800">Who Should Attend</h4>
      <p className="text-base text-gray-700">Students of any stream or budding professionals, interested in exploring the area of statistical data analysis and drawing inferences from data.</p>
    </div>
  );
};

const DigitalSkillsDescription = () => {
  return (
    <div>
      <p className="font-bold text-lg mb-4">10 Webinars | Fee: 599 INR (Including GST)</p>
      <p className="text-base mb-4 text-gray-700">The technological advancements in today’s society have changed the way students acquire knowledge...</p>
      <ul className="list-none mb-4 space-y-2">
        <li className="font-bold text-gray-800">Understand basics of research methodology</li>
        <li className="font-bold text-gray-800">Acquire skills for online research</li>
        <li className="font-bold text-gray-800">Verify and use information available on Web</li>
        <li className="font-bold text-gray-800">Use and analyze open data</li>
        <li className="font-bold text-gray-800">Learn various uses of MS Office and Google tools for academic purposes</li>
        <li className="font-bold text-gray-800">Start own Blog or personal website</li>
        <li className="font-bold text-gray-800">Build effective presence on Social Media</li>
      </ul>
      <h4 className="text-xl font-semibold mb-2 text-gray-800">Who Should Attend</h4>
      <p className="text-base text-gray-700">Students of any stream or budding professionals, interested in learning new skills required for the digital era.</p>
    </div>
  );
};

const Objectives = () => {
  return (
    <section className="bg-teal-600 py-20">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl mx-auto flex flex-wrap">
        <Objective title="Live Webinars" imgSrc="https://cdn3.iconfinder.com/data/icons/network-communication-vol-3-1/48/109-512.png" />
        <Objective title="Discussion with Peer Group" imgSrc="https://cdn4.iconfinder.com/data/icons/got-an-idea/128/discussion-512.png" />
        <Objective title="Projects and Hands-on Activities" imgSrc="https://cdn1.iconfinder.com/data/icons/teamwork-24/64/collective-project-data-processing-analysis-512.png" />
      </div>
    </section>
  );
};

const Objective = ({ title, imgSrc }) => {
  return (
    <div className="w-full lg:w-1/3 p-6 text-center">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">{title}</h3>
      <img className="mx-auto mb-4 transform transition duration-300 hover:scale-105" src={imgSrc} alt={title} />
    </div>
  );
};

const Footer = () => {
  return (
    <section className="bg-teal-700 text-white text-center py-16">
      <h2 className="text-2xl font-semibold mb-4">Register for a Course Today!</h2>
      <Button text="Register Now" />
    </section>
  );
};

export default CoursePage2;