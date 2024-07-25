import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from "firebase/database";
import Loading from './LoadSaveAnimation/Loading';

function People() {
    const [openSection, setOpenSection] = useState(null);
    const [hoveredMember, setHoveredMember] = useState(null);
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const defaultImage = "https://via.placeholder.com/150?text=No+Image+Available";

    useEffect(() => {
        const db = getDatabase();
        const sectionsRef = ref(db, 'people');

        const unsubscribe = onValue(sectionsRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                // Create a structure that groups members by position
                const positionGroups = {};
                Object.keys(data).forEach(key => {
                    const member = data[key];
                    const position = member.position || 'Unknown'; // Default group for unclassified positions
                    if (!positionGroups[position]) {
                        positionGroups[position] = {
                            title: position,
                            members: [],
                            key: position
                        };
                    }
                    positionGroups[position].members.push(member);
                });
                setSections(Object.values(positionGroups));
                setLoading(false);
            } else {
                console.log("No data available");
                setError('No data available');
                setLoading(false);
            }
        }, (error) => {
            console.error(error);
            setError('Failed to fetch data');
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const toggleSection = (section) => {
        const newOpenSection = openSection === section ? null : section;
        setOpenSection(newOpenSection);
    };

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="py-8 bg-coolGray-100">
            <div className="mx-auto px-4 md:px-6 lg:px-12">
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

                {/* Collapsible section for different members */}
                {sections.map((section, index) => (
                    <div key={section.key} className="mb-5">
                        <button
                            onClick={() => toggleSection(index)}
                            className="flex justify-between items-center w-full py-4 px-6 text-left text-xl font-bold text-white bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 rounded-lg focus:outline-none"
                        >
                            {section.title}
                            <span>{openSection === index ? '−' : '+'}</span>
                        </button>
                        {openSection === index && (
                            <div className="grid gap-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-6 bg-white rounded-b-lg">
                                {section.members.map((member, idx) => (
                                    <div key={idx} className="space-y-4 text-center relative">
                                        <div
                                            onMouseEnter={() => setHoveredMember(member.name)}
                                            onMouseLeave={() => setHoveredMember(null)}
                                            className="relative"
                                        >
                                            <img
                                                className="w-fit h-fit mx-auto object-cover rounded-xl md:w-48 md:h-64 lg:w-64 lg:h-80"
                                                src={member.photoUrl || defaultImage}
                                                alt={member.name}
                                                loading="lazy"
                                            />
                                            {hoveredMember === member.name && (
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
                                            <span className="block text-sm text-gray-500">{member.designation}</span>
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

export default People;
