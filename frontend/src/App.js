import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/employees';

function App() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    department: '',
    salary: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(API_URL);
      setEmployees(res.data);
    } catch (err) {
      console.error('Lỗi tải danh sách nhân viên:', err);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, formData);
        setEditingId(null);
      } else {
        await axios.post(API_URL, formData);
      }
      setFormData({ name: '', email: '', position: '', department: '', salary: '' });
      fetchEmployees();
    } catch (err) {
      console.error('Lỗi lưu dữ liệu:', err);
    }
  };

  const handleEdit = (emp) => {
    setEditingId(emp._id);
    setFormData({
      name: emp.name || '',
      email: emp.email || '',
      position: emp.position || '',
      department: emp.department || '',
      salary: emp.salary || ''
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa nhân viên này?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchEmployees();
      } catch (err) {
        console.error('Lỗi xóa nhân viên:', err);
      }
    }
  };

  return (
    <div className="App" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>HỆ THỐNG QUẢN LÝ NHÂN SỰ</h2>
      <p><strong>Họ và tên:</strong> Dương Ngọc Thạch Như Ý - <strong>MSSV:</strong> 237399</p>

      <form onSubmit={handleSubmit} style={{ marginBottom: '30px', maxWidth: '500px' }}>
        <h3>{editingId ? 'Cập nhật nhân viên' : 'Thêm nhân viên mới'}</h3>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            name="name"
            placeholder="Họ và tên"
            value={formData.name}
            onChange={handleInputChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            name="position"
            placeholder="Chức vụ"
            value={formData.position}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            name="department"
            placeholder="Phòng ban"
            value={formData.department}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="number"
            name="salary"
            placeholder="Lương"
            value={formData.salary}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
          {editingId ? 'Cập nhật' : 'Thêm mới'}
        </button>
      </form>

      <h3>Danh sách nhân viên</h3>
      <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th>STT</th>
            <th>Họ và tên</th>
            <th>Email</th>
            <th>Chức vụ</th>
            <th>Phòng ban</th>
            <th>Lương</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center' }}>Chưa có dữ liệu nhân viên</td>
            </tr>
          ) : (
            employees.map((emp, index) => (
              <tr key={emp._id || index}>
                <td>{index + 1}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.position}</td>
                <td>{emp.department}</td>
                <td>{emp.salary}</td>
                <td>
                  <button onClick={() => handleEdit(emp)} style={{ marginRight: '5px' }}>Sửa</button>
                  <button onClick={() => handleDelete(emp._id)}>Xóa</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;