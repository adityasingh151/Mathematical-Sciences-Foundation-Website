import React, { useState } from 'react';

function People() {
    const [openSection, setOpenSection] = useState(null);
    const [hoveredMember, setHoveredMember] = useState(null);

    const toggleSection = (section) => {
        const newOpenSection = openSection === section ? null : section;
        setOpenSection(newOpenSection);
    };

    return (
        <div className="py-8 bg-coolGray-100">
            {/* Container to standardize the width across sections */}
            <div className=" mx-auto px-4 md:px-6 lg:px-12">
                {/* Top section with Professor Dinesh Singh's image and quote */}
                <div className="flex flex-wrap items-center mb-10">
                    <div className="md:flex w-full bg-gradient-to-r from-teal-700 to-cyan-500 text-white rounded-lg shadow-lg">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Pro._Dinesh_Singh_Photo-_High_resolution_1.jpg/1280px-Pro._Dinesh_Singh_Photo-_High_resolution_1.jpg"
                            alt="Prof. Dinesh Singh"
                            className="md:w-1/2 w-full h-auto object-cover rounded-l-lg"
                        />
                        <div className="md:w-1/2 w-full p-8">
                            <h2 className="text-4xl font-bold">Prof. Dinesh Singh - Director</h2>
                            <p className="italic text-xl mt-4">"Let your heart dictate your actions. Listen to your heart’s inner drumbeat."</p>
                        </div>
                    </div>
                </div>
                
                {/* Collapsible sections */}
                {sections.map((section, index) => (
                    <div key={section.title} className="mb-5">
                        <button
                            onClick={() => toggleSection(index)}
                            className="flex justify-between items-center w-full py-4 px-6 text-left text-xl font-bold text-white bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 rounded-lg focus:outline-none"
                        >
                            {section.title}
                            <span>{openSection === index ? '−' : '+'}</span>
                        </button>
                        {openSection === index && (
                            <div className="grid gap-12 md:grid-cols-3 p-6 bg-white rounded-b-lg">
                                {section.members.map(member => (
                                    <div key={member.id} className="space-y-4 text-center relative">
                                        <div
                                            onMouseEnter={() => setHoveredMember(member.id)}
                                            onMouseLeave={() => setHoveredMember(null)}
                                            className="relative"
                                        >
                                            <img
                                                className="w-64 h-64 mx-auto object-cover rounded-xl md:w-48 md:h-64 lg:w-64 lg:h-80"
                                                src={member.photoUrl}
                                                alt={member.name}
                                                loading="lazy"
                                            />
                                            {hoveredMember === member.id && (
                                                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center rounded-xl p-4">
                                                    <div className="text-white text-sm p-3 bg-gray-900 bg-opacity-80 rounded">
                                                        <p><strong>Position:</strong> {member.position}</p>
                                                        <p><strong>Details:</strong> {member.details}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="text-2xl">{member.name}</h4>
                                            <span className="block text-sm text-gray-500">{member.position}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

const sections = [
    {
        title: 'Office Bearers',
        members: [
            {
                id: 1,
                name: 'Prof. Dinesh Singh',
                position: 'Director',
                photoUrl: 'https://example.com/photo-dinesh.jpg',
                details: 'Chancellor, KRM University; Former Vice-Chancellor, University of Delhi; Adjunct Professor, University of Houston'
            },
            {
                id: 2,
                name: 'Prof. Sanjeev Agrawal',
                position: 'Secretary',
                photoUrl: 'https://example.com/photo-sanjeev.jpg',
                details: 'Professor, Department of Mathematics, Shiv Nadar University; Institute for Innovations & Inventions with Mathematics and IT'
            },
            {
                id: 3,
                name: 'Dr. Geetha Venkataraman',
                position: 'Treasurer',
                photoUrl: 'https://example.com/photo-geetha.jpg',
                details: 'Professor, Department of Mathematics, Dr. B.R. Ambedkar University; St. Stephen\'s College'
            }
        ]
    },
    {
        title: 'Executive Committee',
        members: [
            {
                id: 4,
                name: 'Prof. Radha Mohan',
                position: 'Associate Professor, Department of Mathematics',
                photoUrl: 'https://example.com/photo-radha.jpg',
                details: 'Associate Professor at St. Stephen\'s College, University of Delhi'
            },
            {
                id: 5,
                name: 'Mr. John Alexander',
                position: 'Senior VP, Business Development',
                photoUrl: 'https://example.com/photo-john.jpg',
                details: 'Senior Vice President (Business Development) at J.M. Baxi & Co., Mumbai'
            },
            {
                id: 6,
                name: 'Mr. Ravi Bahl',
                position: 'Advisor, ChrysCapital',
                photoUrl: 'https://example.com/photo-ravi.jpg',
                details: 'Advisor at ChrysCapital; Former Head of Citibank (Indonesia)'
            }
        ]
    },
    {
        title: 'Fellow',
        members: [
            {
                id: 7,
                name: 'Prof. Shobha Bagai',
                position: 'Director, Cluster Innovation Centre',
                photoUrl: 'https://th.bing.com/th/id/OIP.zyqApn9_GANNpYtfOSTD2QHaHp?rs=1&pid=ImgDetMain',
                details: 'Director and Professor at Cluster Innovation Centre, University of Delhi; Specializes in Computational Fluid Dynamics'
            },
            {
                id: 8,
                name: 'Prof. Amitabh Tripathi',
                position: 'Chair Professor, IIT Delhi',
                photoUrl: 'https://i1.rgstatic.net/ii/profile.image/372950147584010-1465929652457_Q512/Amitabha_Tripathi.jpg',
                details: 'Vaidya Saolapurkar Chair Professor at the Department of Mathematics, IIT Delhi; Specializes in Number Theory, Graph Theory'
            },
            {
                id: 9,
                name: 'Prof. Sachi Srivastava',
                position: 'Professor, Department of Mathematics, DU',
                photoUrl: 'https://example.com/photo-sachi.jpg',
                details: 'Professor at Department of Mathematics, University of Delhi; Expert in Functional Analysis, Operator Theory'
            }
        ]
    },
    {
        title: 'Staff',
        members: [
            {
                id: 10,
                name: 'Pragati Verma',
                position: 'Office Manager',
                photoUrl: 'https://example.com/photo-pragati.jpg',
                details: 'Manages office operations and administrative tasks efficiently.'
            },
            {
                id: 11,
                name: 'Kanhaya Lal',
                position: 'Office Assistant',
                photoUrl: 'https://example.com/photo-kanhaya.jpg',
                details: 'Assists in daily office needs and managing general administrative activities.'
            }
        ]
    },
    {
        title: 'Team',
        members: [
            {
                id: 12,
                name: 'Chetanya',
                position: 'Intern',
                photoUrl: 'https://example.com/photo-chetanya.jpg',
                details: 'Intern involved in various projects, learning and contributing to team objectives.'
            }
        ]
    }
];

export default People;