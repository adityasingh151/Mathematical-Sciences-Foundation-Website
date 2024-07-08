import React, { useEffect, useRef } from 'react';

const MathematicalSciencesFoundation = () => {
  const sectionRefs = {
    first: useRef(null),
    second: useRef(null),
    third: useRef(null),
    fourth: useRef(null),
    fifth: useRef(null),
    sixth: useRef(null),
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(entry.target.dataset.animation);
          }
        });
      },
      { threshold: 0.5 }
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  return (
    <div className="font-lato text-gray-900 bg-gradient-to-r from-cyan-50 to-blue-100">
      <section ref={sectionRefs.first} data-animation="animate-fly-in" className="relative w-full h-96 bg-gray-800">
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center p-8">
          <h2 className="text-blue-300 text-4xl font-bold mb-4 animate-bounce">
            Mathematical Sciences Foundation
          </h2>
          <div className="mt-6 space-x-4">
            <button className="text-white bg-blue-500 px-6 py-3 border-4 border-blue-500 rounded-sm font-bold transition duration-300 ease-in-out transform hover:bg-transparent hover:text-blue-500 hover:scale-105">
              Button One
            </button>
            <button className="text-gray-800 bg-white px-6 py-3 border-4 border-white rounded-sm font-bold transition duration-300 ease-in-out transform hover:bg-gray-800 hover:text-white hover:scale-105">
              Button Two
            </button>
          </div>
        </div>
      </section>

      <section ref={sectionRefs.second} data-animation="animate-slide-in" className="py-20 bg-gradient-to-r from-cyan-50 to-blue-100">
        <div className="container mx-auto px-8">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 p-4">
              <img src="https://mathscifound.org/wp-content/uploads/2019/02/blackboard-606627_960_720-1.jpg" alt="Our Story" className="w-full h-auto rounded-lg shadow-lg transition transform hover:scale-105 duration-300" />
            </div>
            <div className="w-full md:w-1/2 p-4">
              <h2 className="text-indigo-600 text-3xl font-bold mb-4">Our Story</h2>
              <p className="text-lg leading-relaxed mb-4 font-serif">
                In 1998, these varied activities were consolidated into the Centre for Mathematical Sciences (CMS), housed at St. Stephen’s College. In 2000, significant funding was obtained from the ICICI Bank leading to CMS becoming the ICICI Centre for Mathematical Sciences or ICMS. Many innovative programmes were created under the rubric of ICMS which soon grew to a point where it was no longer sufficient to house and support them.
              </p>
              <p className="text-lg leading-relaxed font-serif">
                Thus, Mathematical Sciences Foundation was founded in July 2002, with the support of many leading citizens of India and with ICICI Bank as an institutional member. The Founder Chairman of the Foundation was Dr. Anil Wilson, Principal of St. Stephen’s College and former Vice-Chancellor of Himachal Pradesh University.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section ref={sectionRefs.third} data-animation="animate-slide-in" className="py-20 bg-gradient-to-r from-cyan-50 to-blue-100">
        <div className="container mx-auto px-8">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 p-4">
              <h2 className="text-indigo-600 text-3xl font-bold mb-4">How We Got Started</h2>
              <p className="text-lg leading-relaxed mb-4 font-serif">
                The roots of MSF go back to the mid-1990s with educational and research activities undertaken by a group of mathematicians from several institutions, such as University of Delhi, St. Stephen’s College, Indian Institute of Technology, Delhi, and the Indian Statistical Institute, Delhi. They were subsequently joined by members of the Economics and Physics faculties from St. Stephen’s College.
              </p>
              <p className="text-lg leading-relaxed font-serif">
                The early projects were mostly carried out with funding from the Department of Science and Technology (DST), Government of India. Notable amongst these was the project titled Mathematics in the Modern World (MMW), which ran from 1995 to 2001, and aimed at showing the applicability of mathematics in solving real-life problems.
              </p>
            </div>
            <div className="w-full md:w-1/2 p-4">
              <img src="https://mathscifound.org/wp-content/uploads/2019/02/1917286_120551681601_4593531_n_120551681601.jpg" alt="How We Got Started" className="w-full h-auto rounded-lg shadow-lg transition transform hover:scale-105 duration-300" />
            </div>
          </div>
        </div>
      </section>

      <section ref={sectionRefs.fourth} data-animation="animate-slide-in-right" className="py-20 bg-gradient-to-r from-cyan-50 to-blue-100">
        <div className="container mx-auto px-8">
          <h2 className="text-indigo-600 text-3xl font-bold mb-8 text-center">Our Programmes</h2>
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/3 p-4">
              <div className="bg-white p-6 rounded-lg shadow-lg transition transform hover:scale-105 duration-300">
                <img src="https://mathscifound.org/wp-content/uploads/2019/02/iconfinder_JD-04_2246801.png" alt="Online/Hybrid Programmes" className="w-16 h-16 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Online/Hybrid Programmes</h3>
                <div>
                  Under The Internet College, we offer courses delivered online and in hybrid mode under the following tracks:
                  <ul className="list-disc pl-5">
                    <li>Language and communication</li>
                    <li>Data science</li>
                    <li>Technology</li>
                    <li>Humanities and creative disciplines</li>
                  </ul>
                </div>
                <button className="mt-4 text-green-500 hover:text-green-700 font-bold">Find Out More</button>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-4">
              <div className="bg-white p-6 rounded-lg shadow-lg transition transform hover:scale-105 duration-300">
                <img src="https://mathscifound.org/wp-content/uploads/2019/02/iconfinder_graduation-cap_3688484.png" alt="Certificates/Diplomas" className="w-16 h-16 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Certificates/Diplomas</h3>
                <p className="text-lg leading-relaxed font-serif">
                  We offer various certificate and diploma courses that are short-term in nature. These courses are in areas pertaining to the application of mathematics to different disciplines. We also create bespoke courses for specific corporate training requirements.
                </p>
                <button className="mt-4 text-green-500 hover:text-green-700 font-bold">Find Out More</button>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-4">
              <div className="bg-white p-6 rounded-lg shadow-lg transition transform hover:scale-105 duration-300">
                <img src="https://mathscifound.org/wp-content/uploads/2019/02/iconfinder_statistic_job_seeker_employee_unemployee_work_2620500.png" alt="Internships" className="w-16 h-16 mb-4" />
                <h3 className="text-2xl font-bold mb-2 ">Internships</h3>
                <p className="text-lg leading-relaxed font-serif">
                  One of our main aims is to enable young students to be more employable as well as to spur entrepreneurship. One of the ways in which we offer such real-world skills is through short-term internships. These allow a student to learn within a flexible work environment.
                </p>
                <button className="mt-4 text-green-500 hover:text-green-700 font-bold">Find Out More</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={sectionRefs.fifth} data-animation="animate-fly-in" className="py-20 bg-gradient-to-r from-cyan-50 to-blue-100">
        <div className="container mx-auto px-8">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/3 p-4">
              <h2 className="text-indigo-600 text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-lg leading-relaxed mb-4 font-serif">
                The Mathematical Sciences Foundation aims to create a role model for education in India. The engine that drives this role model is the discipline of mathematics and its myriad connections to all aspects of human endeavour.
              </p>
              <p className="text-lg leading-relaxed font-serif">
                Our mission is to provide a dynamic and strong institutional platform that will nurture out-of-the-box thinking, work together with the industry, attract leading mathematicians and scientists from all over the world, and serve the needs of society and our nation at large.
              </p>
            </div>
            <div className="w-full md:w-2/3 p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-lg shadow-lg transition transform hover:scale-105 duration-300">
                  <h3 className="text-2xl font-bold mb-2">Nurture Out-of-the-Box Thinking</h3>
                  <p className="text-lg leading-relaxed font-serif">
                    We aim to spur innovation and invention that is relevant - both for the industry and the world at large.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg transition transform hover:scale-105 duration-300">
                  <h3 className="text-2xl font-bold mb-2 ">Industry Partnership</h3>
                  <p className="text-lg leading-relaxed font-serif">
                    Our consulting programmes foster close interaction with the corporate world to create relevant solutions.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg transition transform hover:scale-105 duration-300">
                  <h3 className="text-2xl font-bold mb-2 ">Attract the Best Thought-Leaders</h3>
                  <p className="text-lg leading-relaxed font-serif">
                    We provide a collaboration platform for leading mathematicians, scientists, and educationists from around the world.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg transition transform hover:scale-105 duration-300">
                  <h3 className="text-2xl font-bold mb-2 ">Offer Innovative Learning Modules</h3>
                  <p className="text-lg leading-relaxed font-serif">
                    Our online and hybrid delivery programmes are designed to impart relevant skills for job creators and job seekers.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg transition transform hover:scale-105 duration-300">
                  <h3 className="text-2xl font-bold mb-2 ">Collaborate with Universities</h3>
                  <p className="text-lg leading-relaxed font-serif">
                    Our programmes are offered in collaboration with leading universities and institutions internationally.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg transition transform hover:scale-105 duration-300">
                  <h3 className="text-2xl font-bold mb-2 ">Serve the Needs of the Nation</h3>
                  <p className="text-lg leading-relaxed font-serif">
                    Helping the young minds of today gain the skills that would help the growth of the nation for tomorrow.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={sectionRefs.sixth} data-animation="animate-slide-in-bottom-right" className="py-20 bg-gradient-to-r from-cyan-50 to-blue-100">
        <div className="container mx-auto px-8">
          <h2 className="text-4xl font-bold mb-8 text-center text-indigo-600">Some of our past programmes</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-lg transition transform hover:scale-105 duration-300">
              <h3 className="text-2xl font-bold mb-2 ">From a Life of Mathematics</h3>
              <p className="text-lg leading-relaxed font-serif">
                We invited some leading mathematicians of the world to reside, interact with, and lecture students and faculty at the University of Delhi. The lectures covered their work as well as various personal experiences and were informal and spontaneous, taking place in lecture rooms, offices, over meals, or on walks in the city - anywhere and anytime.
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-lg transition transform hover:scale-105 duration-300">
              <h3 className="text-2xl font-bold mb-2 ">Nurture Programme</h3>
              <p className="text-lg leading-relaxed font-serif">
                We conducted a series of very popular seminars on diverse topics such as graph theory, group actions, topological groups, econometrics, game theory, optimisation, encryption, image recognition, spectral theory for compact operators, applications in linear algebra, stellar systems, and more.
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-lg transition transform hover:scale-105 duration-300">
              <h3 className="text-2xl font-bold mb-2 ">Training Programmes</h3>
              <p className="text-lg leading-relaxed font-serif">
                We have successfully offered certificate programmes in applications of mathematics - Mathematical Finance, Corporate Finance, Mathematical Simulation with Information Technology. Our Excel for Business Finance course has been taken by over 2,000 students at various b-school campuses.
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-lg transition transform hover:scale-105 duration-300">
              <h3 className="text-2xl font-bold mb-2 ">Outreach Efforts</h3>
              <p className="text-lg leading-relaxed font-serif">
                A significant portion of our training programmes have been offered free-of-cost. We have granted scholarships, fee waivers and interest-free loans to students from economically deprived backgrounds. We also strive to make a special effort to reach out to students from backgrounds, locations or communities where education is at a premium.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MathematicalSciencesFoundation;
