cimport React, { useState } from "react";

const Employee = () => {
  const [employees, setEmployees] = useState([]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
    jobRole: "",
    jobDescription: "",
  });

  const [editId, setEditId] = useState(null);

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      
      setEmployees(
        employees.map((emp) =>
          emp.id === editId ? { ...emp, ...formData } : emp
        )
      );
      setEditId(null);
    } else {
      
      setEmployees([
        ...employees,
        { id: Date.now(), ...formData },
      ]);
    }

    
    setFormData({
      firstName: "",
      lastName: "",
      jobTitle: "",
      jobRole: "",
      jobDescription: "",
    });
  };


  const handleEdit = (emp) => {
    setFormData(emp);
    setEditId(emp.id);
  };


  const handleDelete = (id) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Employee Management</h2>

      {/* Employee Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
        />

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
        />

        <input
          type="text"
          name="jobTitle"
          placeholder="Job Title"
          value={formData.jobTitle}
          onChange={handleChange}
        />

        <input
          type="text"
          name="jobRole"
          placeholder="Job Role"
          value={formData.jobRole}
          onChange={handleChange}
        />

        <input
          type="text"
          name="jobDescription"
          placeholder="Job Description"
          value={formData.jobDescription}
          onChange={handleChange}
        />

        <button type="submit">
          {editId ? "Update Employee" : "Add Employee"}
        </button>
      </form>

      <br />

      {/* Employee Table */}
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Job Title</th>
            <th>Job Role</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan="5">No Employees Added</td>
            </tr>
          ) : (
            employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.firstName} {emp.lastName}</td>
                <td>{emp.jobTitle}</td>
                <td>{emp.jobRole}</td>
                <td>{emp.jobDescription}</td>
                <td>
                  <button onClick={() => handleEdit(emp)}>Edit</button>
                  <button onClick={() => handleDelete(emp.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};


