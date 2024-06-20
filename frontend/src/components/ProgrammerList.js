import React from 'react';
import ProgrammerCard from './ProgrammerCard';

const programmers = [
  { id: 1, name: 'John Doe', profile_picture: 'Users01.jpeg', sector: 'Web Developer', skills: 'React, JavaScript, HTML, CSS' },
  { id: 2, name: 'Jane Smith', profile_picture: 'Users04.jpeg', sector: 'Backend Developer', skills: 'Python, Django, SQL' },
  { id: 3, name: 'Michael Johnson', profile_picture: 'Users02.jpeg', sector: 'AI/Machine Learning', skills: 'TensorFlow, Python, Data Science' },
  { id: 4, name: 'Emily Brown', profile_picture: 'Users03.jpeg', sector: 'Cloud Services', skills: 'AWS, Azure, DevOps' },
  { id: 5, name: 'David Wilson', profile_picture: 'Users04.jpeg', sector: 'Networking', skills: 'Cisco, Network Security' },
  { id: 6, name: 'Sophia Martinez', profile_picture: 'Users01.jpeg', sector: 'Web Developer', skills: 'JavaScript, HTML, CSS, React' },
  { id: 7, name: 'Andrew Thompson', profile_picture: 'Users02.jpeg', sector: 'Backend Developer', skills: 'Java, Spring Boot, MySQL' },
  { id: 8, name: 'Olivia Garcia', profile_picture: 'Users03.jpeg', sector: 'AI/Machine Learning', skills: 'Python, Machine Learning Algorithms' },
  { id: 9, name: 'Daniel Clark', profile_picture: 'Users04.jpeg', sector: 'Cloud Services', skills: 'AWS, Google Cloud, Kubernetes' },
];

const ProgrammerList = () => {
  return (
    <div className="container">
        <h1 className="text-center mt-4 mb-4">List of Programmers </h1>
    <div className="container mt-4">
      <div className="row">
        {programmers.map(programmer => (
          <div key={programmer.id} className="col-lg-4 col-md-6 mb-4">
            <ProgrammerCard programmer={programmer} />
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default ProgrammerList;