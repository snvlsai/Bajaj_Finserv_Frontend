import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import AutocompleteSearch from './AutocompleteSearch';
import FilterPanel from './FilterPanel';
import DoctorList from './DoctorList';
import "./App.css"

const API_URL = 'https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json';

function App() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [consultationType, setConsultationType] = useState('');
  const [specialties, setSpecialties] = useState([]);
  const [sortOption, setSortOption] = useState('');

  // Load filters from URL query params on mount
  useEffect(() => {
    const params = queryString.parse(window.location.search);
    if (params.search) setSearchTerm(params.search);
    if (params.consultation) setConsultationType(params.consultation);
    if (params.specialties) {
      const specs = Array.isArray(params.specialties)
        ? params.specialties
        : params.specialties.split(',');
      setSpecialties(specs);
    }
    if (params.sort) setSortOption(params.sort);
  }, []);

  // Fetch doctors data on mount
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
      });
  }, []);

  // Update filteredDoctors whenever filters change or doctors data changes
  useEffect(() => {
    let filtered = [...doctors];
  
    // Filter by search term (doctor name)
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter((doc) =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  
    // Filter by consultation type
    if (consultationType) {
      filtered = filtered.filter((doc) =>
        Array.isArray(doc.consultation) &&
        consultationType === 'Video Consult'
          ? doc.consultation.includes('Video Consult')
          : doc.consultation.includes('In Clinic')
      );
    }
  
    // Filter by specialties (multi-select)
    if (specialties.length > 0) {
      filtered = filtered.filter(
        (doc) =>
          Array.isArray(doc.speciality) &&
          specialties.every((spec) => doc.speciality.includes(spec))
      );
    }
  
    // Sort
    if (sortOption === 'fees') {
      filtered.sort((a, b) => a.fees - b.fees);
    } else if (sortOption === 'experience') {
      filtered.sort((a, b) => b.experience - a.experience);
    }
  
    setFilteredDoctors(filtered);
  
    // Update URL query params
    const query = {};
    if (searchTerm) query.search = searchTerm;
    if (consultationType) query.consultation = consultationType;
    if (specialties.length > 0) query.specialties = specialties.join(',');
    if (sortOption) query.sort = sortOption;
  
    const newUrl =
      window.location.protocol +
      '//' +
      window.location.host +
      window.location.pathname +
      '?' +
      queryString.stringify(query);
    window.history.replaceState({ path: newUrl }, '', newUrl);
  }, [searchTerm, consultationType, specialties, sortOption, doctors]);
  


  return (
    <>
      <div className="navbar">
        <div className="searchbar-container">
          <AutocompleteSearch
            doctors={doctors}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
      </div>
      <div className="app-container">
        <div className="main-content">
          <div className="filter-panel-container">
            <FilterPanel
              consultationType={consultationType}
              setConsultationType={setConsultationType}
              specialties={specialties}
              setSpecialties={setSpecialties}
              sortOption={sortOption}
              setSortOption={setSortOption}
              doctors={doctors}
            />
          </div>
          <div className="doctor-list-container">
            <DoctorList doctors={filteredDoctors} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
