import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Header from './components/Header';
import ContentSection from './components/ContentSection';
import Footer from './components/Footer';
import Upload from './components/upload';

import image1 from './assets/img/04.jpg';
import image2 from './assets/img/05.jpg';
import image3 from './assets/img/07.jpg';

function App() {
  const[uploadVisible, setuploadVisible] = useState(false);
  const showUpload = () => {
    setuploadVisible(!uploadVisible);
  }
  return (
    <div className="App">
      <Navbar onPress={showUpload}/>
      <Header/>
      <ContentSection
        orderClass="order-lg-2"
        imgSrc={image1}
        title="Phantom Xerox"
        text="Copy. Print. Phantom Fast. Disappear into Quality Phantom Xerox: The Invisible Standard Copy with Clarity, Print with Precision Unseen Excellence, Every Time Make Your Mark, with Phantom Xerox The Phantom Difference: Quality You Can See Invisible Service, Visible Results"
      />
      <ContentSection
        imgSrc={image2}
        title="We salute you! Our CEO"
        text="The Most technical guy in our team is our beloved CEO, Priyanshu Kumar, A profound proffesional in AIML Field."
      />
      <ContentSection
        orderClass="order-lg-2"
        imgSrc={image3}
        title="My Motivation Behind This"
        text="I started my online startup driven by the challenges I faced during my college days. With only one printer shop on campus, it was always crowded, and the lack of nearby options near the hostel made it even more difficult. Plus, with the restriction of not being allowed to leave the hostel after 7 PM, I realized the need for a convenient and accessible printing service. This motivated me to create a solution that could cater to students' needs anytime, from anywhere."
      />
      <Footer />
      {uploadVisible && <Upload/>}
    </div>
  );
}

export default App;
