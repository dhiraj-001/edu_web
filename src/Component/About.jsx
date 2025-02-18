import React from 'react';


function About() {
  return (
    <div className="container mx-auto p-6 bg-white text-[#272343]">
      <section className="mb-8">
        <h2 className="text-3xl font-bold mb-4">About Us</h2>
        <p>Welcome to QuizNest.com! We are dedicated to providing engaging and educational quiz content for users worldwide. Our mission is to inspire curiosity and foster learning through interactive quizzes.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">CEO</h3>
            <p>HatLEriya</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Founder</h3>
            <p>EmonJyoti</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">CTO</h3>
            <p>Banjit</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Our Branches</h2>
        <ul className="list-disc list-inside pl-4">
          <li>Mongoldoi</li>
          <li>Udalguri</li>
          <li>Namkhala</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Features</h2>
        <ul className="list-disc list-inside pl-4">
          <li>Wide range of quiz topics</li>
          <li>Interactive and user-friendly interface</li>
          <li>Regular updates and new quizzes</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <p>If you have any questions, feel free to reach out to us:</p>
        <ul className="list-disc list-inside pl-4">
          <li>Email: Emon@quiznest.com</li>
          <li>Phone: 87986521654</li>
        </ul>
      </section>
    </div>
  );
}

export default About;
