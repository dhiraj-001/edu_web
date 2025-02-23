import React, { useState } from 'react';
import '../CSS/SSC.css';

function SSC() {
  const [activeSection, setActiveSection] = useState('');
  const [activeTopic, setActiveTopic] = useState('');
  const [activeMockTest, setActiveMockTest] = useState('');
  const [activeQuestionPaper, setActiveQuestionPaper] = useState('');
  const [detailsContent, setDetailsContent] = useState('');

  const handleSectionClick = (section) => {
    setActiveSection((prevSection) => (prevSection === section ? '' : section));
    setActiveTopic('');
    setActiveMockTest('');
    setActiveQuestionPaper('');
    setDetailsContent('');
  };

  const handleTopicClick = (topic) => {
    setActiveTopic(topic);
    setDetailsContent(`Details about ${topic}`);
  };

  const handleMockTestClick = (mockTest) => {
    setActiveMockTest(mockTest);
    setDetailsContent(`Details about ${mockTest}`);
  };

  const handleQuestionPaperClick = (year) => {
    setActiveQuestionPaper(year);
    setDetailsContent(`Details about Question Paper ${year}`);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'topics':
        return (
          <div className="subject">
            {activeTopic === '' ? (
              <>
                <div className="sub" onClick={() => handleTopicClick('Math')}>
                  <a href='/QuizPage'><h3>Mathematics</h3></a>
                </div>
                <div className="sub" onClick={() => handleTopicClick('Science')}>
                  <a href='/QuizPage'><h3>Science</h3></a>
                </div>
                <div className="sub" onClick={() => handleTopicClick('History')}>
                  <a href='/QuizPage'><h3>History</h3></a>
                </div>
              </>
            ) : (
              <div className="details">{detailsContent}</div>
            )}
          </div>
        );
      case 'mockTest':
        return (
          <div className="subject">
            {activeMockTest === '' ? (
              <>
                <div className="sub" onClick={() => handleMockTestClick('Mock Test 1')}>
                  <a href='/QuizPage'><h3>Mock Test 1</h3></a>
                </div>
                <div className="sub" onClick={() => handleMockTestClick('Mock Test 2')}>
                  <a href='/QuizPage'><h3>Mock Test 2</h3></a>
                </div>
                <div className="sub" onClick={() => handleMockTestClick('Mock Test 3')}>
                  <a href='/QuizPage'><h3>Mock Test 3</h3></a>
                </div>
              </>
            ) : (
              <div className="details">{detailsContent}</div>
            )}
          </div>
        );
      case 'previousYear':
        return (
          <div className="subject">
            {activeQuestionPaper === '' ? (
              <>
                {[2020, 2021, 2022, 2023, 2024, 2025].map((year) => (
                  <div className="sub" key={year}>
                    <h3>Question Paper {year}</h3>
                    <a href={`/path/to/download/${year}`}><button className='butn'>Download</button></a>
                    <a href={`/PYQ/${year}`}><button className='butn'>Solve it</button></a>
                  </div>
                ))}
              </>
            ) : (
              <div className="details">{detailsContent}</div>
            )}
          </div>
        );
      default:
        return <div>Click on a section to see details</div>;
    }
  };

  return (
    <div className="EXAM">
      <div className={`box1 ${activeSection === 'topics' ? 'active' : ''}`} onClick={() => handleSectionClick('topics')}>
        <h2>DPP</h2>{activeSection === 'topics' && renderSection()}
      </div>
      <div className={`box1 ${activeSection === 'mockTest' ? 'active' : ''}`} onClick={() => handleSectionClick('mockTest')}>
        <h2>Mock Test</h2>{activeSection === 'mockTest' && renderSection()}
      </div>
      <div className={`box1 ${activeSection === 'previousYear' ? 'active' : ''}`} onClick={() => handleSectionClick('previousYear')}>
        <h2>PYQ</h2>{activeSection === 'previousYear' && renderSection()}
      </div>
    </div>
  );
}

export default SSC;
