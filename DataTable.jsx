import React, { useState } from 'react';
import './DataTable.css'; 
function DataTable() {
  const [data, setData] = useState([
    { lastName: 'Buma-at', firstName: 'Dwight', course: 'IT', birthdate: '1990-01-01' },
    { lastName: 'Abellera', firstName: 'Mil', course: 'IS', birthdate: '1995-05-15' },
    { lastName: 'Navarro', firstName: 'Justin', course: 'CS', birthdate: '2000-10-10' },
    
  ]);

  const [filterText, setFilterText] = useState('');
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  const handleMinDateChange = (event) => {
    setMinDate(event.target.value);
  };

  const handleMaxDateChange = (event) => {
    setMaxDate(event.target.value);
  };

  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
  };

  const calculateAge = (birthdate) => {
    const birthDateObj = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }

    return age;
  };

  const filteredData = data.filter((item) => {
    const fullName = `${item.lastName} ${item.firstName}`.toLowerCase();
    const birthdate = item.birthdate; // This is already in 'YYYY-MM-DD' format
    const age = calculateAge(item.birthdate);
    
    return (
      fullName.includes(filterText.toLowerCase()) &&
      (selectedCourse === '' || item.course === selectedCourse) &&
      (minDate === '' || birthdate >= minDate) &&
      (maxDate === '' || birthdate <= maxDate)
    );
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Filter by name"
        value={filterText}
        onChange={handleFilterChange}
      />
      <br />
      <select value={selectedCourse} onChange={handleCourseChange}>
        <option value="">All Courses</option>
        <option value="IT">IT</option>
        <option value="IS">IS</option>
        <option value="CS">CS</option>
        <option value="DS">DS</option>
      </select>
      <br />
      <input
        type="date"
        value={minDate}
        onChange={handleMinDateChange}
      />
      <input
        type="date"
        value={maxDate}
        onChange={handleMaxDateChange}
      />
      <table>
        <thead>
          <tr>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Course</th>
            <th>Birthdate</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.birthdate}>
              <td>{item.lastName}</td>
              <td>{item.firstName}</td>
              <td>{item.course}</td>
              <td>{item.birthdate}</td>
              <td>{calculateAge(item.birthdate)}</td>
            </tr>
          ))}
          {filteredData.length === 0 && (
            <tr>
              <td colSpan="5">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
