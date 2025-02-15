import React from 'react';

function ContentSection({ orderClass, imgSrc, title, text }) {
  return (
    <section id='scroll'>
      <div className="container px-5">
        <div className="row gx-5 align-items-center">
          <div className={`col-lg-6 ${orderClass}`}>
            <div className="p-5"><img className="img-fluid rounded-circle" src={imgSrc} alt="..." /></div>
          </div>
          <div className="col-lg-6">
            <div className="p-5">
              <h2 className="display-4" >{title}</h2>
              <p style={{ color: 'blue', fontSize: '200px !important' }}>{text}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContentSection;
