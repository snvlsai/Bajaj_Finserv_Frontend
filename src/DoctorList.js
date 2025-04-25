import React from 'react';

function DoctorList({ doctors }) {
  if (!Array.isArray(doctors) || doctors.length === 0) {
    return <p>No doctors found.</p>;
  }

  return (
    <div className="doctor-list">
      {doctors.map((doc) => (
        <div key={doc.id} data-testid="doctor-card" className="doctor-card">
          <div className="doctor-photo">
            <img src={doc.photo} alt={doc.name} />
          </div>
          <div className="doctor-info">
            <h2 data-testid="doctor-name" className="doctor-name">{doc.name}</h2>
            <p className="doctor-intro">{doc.doctor_introduction}</p>
            <p data-testid="doctor-specialty" className="doctor-specialty">
              {Array.isArray(doc.specialities)
                ? doc.specialities.map((s) => s.name).join(', ')
                : 'N/A'}
            </p>
            <p data-testid="doctor-experience" className="doctor-experience">{doc.experience}</p>
            <p data-testid="doctor-fee" className="doctor-fee">{doc.fees}</p>
            <p className="doctor-languages">
              Languages: {Array.isArray(doc.languages) ? doc.languages.join(', ') : 'N/A'}
            </p>
            <p className="doctor-clinic">
              Clinic: {doc.clinic?.name}, {doc.clinic?.address?.address_line1}
            </p>
            <div className="doctor-consult-types">
              {doc.video_consult && <span className="consult-badge video">Video Consult</span>}
              {doc.in_clinic && <span className="consult-badge clinic">In Clinic</span>}
            </div>
            <div className="btn-primary">
              <button className="btn">Book Appointment</button>
              </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DoctorList;
