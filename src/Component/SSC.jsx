import React, { useState } from 'react';
import '../CSS/SSC.css'; 

function SSC() {
  const [activeSection, setActiveSection] = useState('');
  const [activeTopic, setActiveTopic] = useState('');
  const [activeQuestionPaper, setActiveQuestionPaper] = useState('');
  const [detailsContent, setDetailsContent] = useState('');

  const handleSectionClick = (section) => {
    setActiveSection(section);
    setActiveTopic('');
    setActiveQuestionPaper('');
    setDetailsContent(''); 
  };

  const handleTopicClick = (topic) => {
    setActiveTopic(topic);
    setDetailsContent(`Details about ${topic}`);
  };

  const handleQuestionPaperClick = (year) => {
    setActiveQuestionPaper(year);
    setDetailsContent(`Details about Question Paper ${year}`);
  };

  const renderSection = () => {
    if (detailsContent) {
      return <div>{detailsContent}</div>; 
    }
    
    switch (activeSection) {
      case 'topics':
        return (
          <div className='subject'>
            <h1>Topics</h1>
            <div className='sub' onClick={() => handleTopicClick('Math')}><h3>Math</h3></div>
            <div className='sub' onClick={() => handleTopicClick('Science')}><h3>Science</h3></div>
            <div className='sub' onClick={() => handleTopicClick('History')}><h3>History</h3></div>
          </div>
        );
      case 'mockTest':
        return (
          <div className='subject'>
            <h1>Mock Test</h1>
            <div className='sub' onClick={() => setDetailsContent('Details about Mock Test 1')}><h3>Mock Test 1</h3></div>
            <div className='sub' onClick={() => setDetailsContent('Details about Mock Test 2')}><h3>Mock Test 2</h3></div>
            <div className='sub' onClick={() => setDetailsContent('Details about Mock Test 3')}><h3>Mock Test 3</h3></div>
          </div>
        );
      case 'previousYear':
        return (
          <div className='subject'>
            <h1>Previous Year Question Papers</h1>
            {[2020, 2021, 2022, 2023, 2024, 2025].map((year) => (
              <div className='sub' key={year} onClick={() => handleQuestionPaperClick(year)}>
              <h3>  Question Paper {year}</h3>
              </div>
            ))}
          </div>
        );
      default:
        return <div>Click on a section to see details</div>;
    }
  };

  return (
    <div className="EXAM">
      <div className='box1' onClick={() => handleSectionClick('topics')}><h2>Topics</h2></div>
      <div className='box1' onClick={() => handleSectionClick('mockTest')}><h2>Mock Test</h2></div>
      <div className='box1' onClick={() => handleSectionClick('previousYear')}><h2>Previous Year Question Paper</h2></div>
      <div className="details">
        {renderSection()}
      </div>
    </div>
  );
}

export default SSC;
