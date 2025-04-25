import React from 'react';

const SPECIALTIES = [
  'General Physician',
  'Dentist',
  'Dermatologist',
  'Paediatrician',
  'Gynaecologist',
  'ENT',
  'Diabetologist',
  'Cardiologist',
  'Physiotherapist',
  'Endocrinologist',
  'Orthopaedic',
  'Ophthalmologist',
  'Gastroenterologist',
  'Pulmonologist',
  'Psychiatrist',
  'Urologist',
  'Dietitian/Nutritionist',
  'Psychologist',
  'Sexologist',
  'Nephrologist',
  'Neurologist',
  'Oncologist',
  'Ayurveda',
  'Homeopath',
];

function FilterPanel({
  consultationType,
  setConsultationType,
  specialties,
  setSpecialties,
  sortOption,
  setSortOption,
  doctors,
}) {
  const handleConsultationChange = (e) => {
    setConsultationType(e.target.value);
  };

  const handleSpecialtyChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setSpecialties([...specialties, value]);
    } else {
      setSpecialties(specialties.filter((spec) => spec !== value));
    }
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div className="filter-panel">
      <div className="filter-section">
        <h3 data-testid="filter-header-moc">Consultation Mode</h3>
        <div className="button-group">
          <label className={`button ${consultationType === 'Video Consult' ? 'active' : ''}`}>
            <input
              type="radio"
              name="consultation"
              value="Video Consult"
              checked={consultationType === 'Video Consult'}
              onChange={handleConsultationChange}
              data-testid="filter-video-consult"
            />
            Video Consult
          </label>
          <label className={`button ${consultationType === 'In Clinic' ? 'active' : ''}`}>
            <input
              type="radio"
              name="consultation"
              value="In Clinic"
              checked={consultationType === 'In Clinic'}
              onChange={handleConsultationChange}
              data-testid="filter-in-clinic"
            />
            In Clinic
          </label>
        </div>
      </div>

      <div className="filter-section" style={{ marginTop: '20px' }}>
        <h3 data-testid="filter-header-speciality">Speciality</h3>
        <div className="specialties-container">
          {SPECIALTIES.map((spec) => (
            <label key={spec} className="checkbox-label">
              <input
                type="checkbox"
                value={spec}
                checked={specialties.includes(spec)}
                onChange={handleSpecialtyChange}
                data-testid={`filter-specialty-${spec.replace(/\s|\/|-/g, '-')}`}
              />
              {spec}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section" style={{ marginTop: '20px' }}>
        <h3 data-testid="filter-header-sort">Sort</h3>
        <div className="button-group">
          <label className={`button ${sortOption === 'fees' ? 'active' : ''}`}>
            <input
              type="radio"
              name="sort"
              value="fees"
              checked={sortOption === 'fees'}
              onChange={handleSortChange}
              data-testid="sort-fees"
            />
            Fees (Low to High)
          </label>
          <label className={`button ${sortOption === 'experience' ? 'active' : ''}`}>
            <input
              type="radio"
              name="sort"
              value="experience"
              checked={sortOption === 'experience'}
              onChange={handleSortChange}
              data-testid="sort-experience"
            />
            Experience (High to Low)
          </label>
        </div>
      </div>
    </div>
  );
}

export default FilterPanel;
