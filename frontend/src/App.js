import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name: '', position: '', salary: '' });
  const [editingId, setEditingId] = useState(null);

  const API_URL = 'http://localhost:5000/api/employees';

  // Lấy danh sách nhân viên từ Backend
  const fetchEmployees = async () => {
    try {
      const res = await axios.get(API_URL);
      setEmployees(res.data);
    } catch (err) {
      console.error('Lỗi lấy dữ liệu:', err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Xử lý thay đổi dữ liệu trong ô nhập
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Xử lý Thêm mới hoặc Cập nhật nhân viên
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, form);
        setEditingId(null);
      } else {
        await axios.post(API_URL, form);
      }
      setForm({ name: '', position: '', salary: '' });
      fetchEmployees();
    } catch (err) {
      console.error('Lỗi lưu nhân viên:', err);
    }
  };

  // Chọn nhân viên để sửa
  const handleEdit = (employee) => {
    setEditingId(employee._id);
    setForm({ 
      name: employee.name || employee.fullName || employee.ten || '', 
      position: employee.position || employee.chucVu || '', 
      salary: employee.salary || employee.luong || employee.pay || '' 
    });
  };

  // Xóa nhân viên
  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa nhân viên này?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchEmployees();
      } catch (err) {
        console.error('Lỗi xóa nhân viên:', err);
      }
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '850px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>
        HỆ THỐNG QUẢN LÝ NHÂN VIÊN - DƯƠNG NGỌC THẠCH NHƯ Ý (237399)
      </h2>
      
      {/* Form Thêm / Sửa Nhân Viên */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
        <h3>{editingId ? 'Cập Nhật Nhân Viên' : 'Thêm Nhân Viên Mới'}</h3>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <input
            type="text"
            name="name"
            placeholder="Tên nhân viên"
            value={form.name}
            onChange={handleChange}
            required
            style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <input
            type="text"
            name="position"
            placeholder="Chức vụ"
            value={form.position}
            onChange={handleChange}
            required
            style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <input
            type="number"
            name="salary"
            placeholder="Lương"
            value={form.salary}
            onChange={handleChange}
            required
            style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <button 
            type="submit" 
            style={{ padding: '10px 20px', backgroundColor: editingId ? '#007bff' : '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {editingId ? 'Cập nhật' : 'Thêm'}
          </button>
        </div>
      </form>

      {/* Bảng Danh Sách Nhân Viên */}
      <table border="1" cellPadding="12" cellSpacing="0" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', borderColor: '#ddd' }}>
        <thead>
          <tr style={{ backgroundColor: '#007bff', color: '#fff' }}>
            <th>Tên</th>
            <th>Chức vụ</th>
            <th>Lương</th>
            <th style={{ textAlign: 'center' }}>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((emp)