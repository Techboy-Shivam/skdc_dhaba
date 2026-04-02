
// // File: Admin.jsx (Enhanced with Update and Delete functionality)
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Admin = () => {
//   const [adminId, setAdminId] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [reservations, setReservations] = useState([]);
//   const [editingReservation, setEditingReservation] = useState(null);
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     date: '',
//     time: ''
//   });
//   const navigate = useNavigate();

//   // Check if admin is already logged in
//   useEffect(() => {
//     const storedAdminId = localStorage.getItem('adminId');
//     const storedPassword = localStorage.getItem('adminPassword');
    
//     if (storedAdminId && storedPassword) {
//       setAdminId(storedAdminId);
//       setPassword(storedPassword);
//       setIsLoggedIn(true);
//       fetchReservations(storedAdminId, storedPassword);
//     }
//   }, []);

//   // Handle login
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post(
//         'http://localhost:5000/admin/login',
//         { adminId, password },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           withCredentials: true,
//         }
//       );
      
//       if (data.success) {
//         setIsLoggedIn(true);
//         // Store admin credentials in localStorage
//         localStorage.setItem('adminId', adminId);
//         localStorage.setItem('adminPassword', password);
//         fetchReservations(adminId, password);
//       }
//     } catch (error) {
//       alert('Login failed: ' + (error.response?.data?.message || error.message));
//     }
//   };

//   // Sort reservations by date and time in descending order
//   const sortReservations = (reservations) => {
//     return [...reservations].sort((a, b) => {
//       // First compare dates
//       const dateComparison = new Date(b.date) - new Date(a.date);
//       if (dateComparison !== 0) return dateComparison;
      
//       // If dates are the same, compare times
//       return b.time.localeCompare(a.time);
//     });
//   };

//   // Fetch all reservations
//   const fetchReservations = async (id = adminId, pwd = password) => {
//     try {
//       const { data } = await axios.get(
//         `http://localhost:5000/admin/reservations?adminId=${id}&password=${pwd}`,
//         { withCredentials: true }
//       );
      
//       // Sort the reservations client-side as well to ensure correct order
//       setReservations(sortReservations(data.data));
//     } catch (error) {
//       alert('Failed to fetch reservations: ' + (error.response?.data?.message || error.message));
//     }
//   };

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Set up edit mode for a reservation
//   const handleEdit = (reservation) => {
//     setEditingReservation(reservation._id);
//     setFormData({
//       firstName: reservation.firstName,
//       lastName: reservation.lastName,
//       email: reservation.email,
//       phone: reservation.phone,
//       date: reservation.date,
//       time: reservation.time
      
//     });
//   };

//   // Cancel edit mode
//   const handleCancelEdit = () => {
//     setEditingReservation(null);
//     setFormData({
//       firstName: '',
//       lastName: '',
//       email: '',
//       phone: '',
//       date: '',
//       time: '',
//       payment: ''
//     });
//   };

//   // Update a reservation
//   const handleUpdate = async (id) => {
//     try {
//       const { data } = await axios.put(
//         `http://localhost:5000/admin/reservations/${id}`,
//         formData,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           params: {
//             adminId,
//             password
//           },
//           withCredentials: true,
//         }
//       );
      
//       if (data.success) {
//         alert('Reservation updated successfully!');
//         setEditingReservation(null);
//         fetchReservations();
//       }
//     } catch (error) {
//       alert('Failed to update reservation: ' + (error.response?.data?.message || error.message));
//     }
//   };

//   // Delete a reservation
//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this reservation?')) {
//       try {
//         const { data } = await axios.delete(
//           `http://localhost:5000/admin/reservations/${id}`,
//           {
//             params: {
//               adminId,
//               password
//             },
//             withCredentials: true,
//           }
//         );
        
//         if (data.success) {
//           alert('Reservation deleted successfully!');
//           fetchReservations();
//         }
//       } catch (error) {
//         alert('Failed to delete reservation: ' + (error.response?.data?.message || error.message));
//       }
//     }
//   };

//   // Handle logout
//   const handleLogout = () => {
//     localStorage.removeItem('adminId');
//     localStorage.removeItem('adminPassword');
//     setIsLoggedIn(false);
//     setAdminId('');
//     setPassword('');
//     setReservations([]);
//   };

//   return (
//     <div className="admin-panel">
//       {!isLoggedIn ? (
//         <div className="login-form">
//           <h2>Admin Login</h2>
//           <form onSubmit={handleLogin}>
//             <input
//               type="text"
//               placeholder="Admin ID"
//               value={adminId}
//               onChange={(e) => setAdminId(e.target.value)}
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <button type="submit">Login</button>
//           </form>
//         </div>
//       ) : (
//         <div className="reservations-list">
//           <div className="header-actions">
//             <h2>All Reservations (Newest First)</h2>
//             <button onClick={handleLogout} className="logout-btn">Logout</button>
//           </div>
//           <table>
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Phone</th>
//                 <th>Date</th>
//                 <th>Time</th>
//                 <th>Payment</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {reservations.map((reservation) => (
//                 <tr key={reservation._id}>
//                   {editingReservation === reservation._id ? (
//                     <>
//                       <td>
//                         <input
//                           type="text"
//                           name="firstName"
//                           value={formData.firstName}
//                           onChange={handleInputChange}
//                           placeholder="First Name"
//                         />
//                         <input
//                           type="text"
//                           name="lastName"
//                           value={formData.lastName}
//                           onChange={handleInputChange}
//                           placeholder="Last Name"
//                         />
//                       </td>
//                       <td>
//                         <input
//                           type="email"
//                           name="email"
//                           value={formData.email}
//                           onChange={handleInputChange}
//                           placeholder="Email"
//                         />
//                       </td>
//                       <td>
//                         <input
//                           type="number"
//                           name="phone"
//                           value={formData.phone}
//                           onChange={handleInputChange}
//                           placeholder="Phone"
//                         />
//                       </td>
//                       <td>
//                         <input
//                           type="date"
//                           name="date"
//                           value={formData.date}
//                           onChange={handleInputChange}
//                         />
//                       </td>
//                       <td>
//                         <input
//                           type="time"
//                           name="time"
//                           value={formData.time}
//                           onChange={handleInputChange}
//                         />
//                       </td>
//                       <td>
//                         <button onClick={() => handleUpdate(reservation._id)} className="save-btn">Save</button>
//                         <button onClick={handleCancelEdit} className="cancel-btn">Cancel</button>
//                       </td>
//                     </>
//                   ) : (
//                     <>
//                       <td>{`${reservation.firstName} ${reservation.lastName}`}</td>
//                       <td>{reservation.email}</td>
//                       <td>{reservation.phone}</td>
//                       <td>{reservation.date}</td>
//                       <td>{reservation.time}</td>
//                       <td>
//                         <button onClick={() => handleEdit(reservation)} className="edit-btn">Edit</button>
//                         <button onClick={() => handleDelete(reservation._id)} className="delete-btn">Delete</button>
//                       </td>
//                     </>
//                   )}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Admin;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [editingReservation, setEditingReservation] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    payment: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedAdminId = localStorage.getItem('adminId');
    const storedPassword = localStorage.getItem('adminPassword');

    if (storedAdminId && storedPassword) {
      setAdminId(storedAdminId);
      setPassword(storedPassword);
      setIsLoggedIn(true);
      fetchReservations(storedAdminId, storedPassword);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'http://localhost:5000/admin/login',
        { adminId, password },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      if (data.success) {
        setIsLoggedIn(true);
        localStorage.setItem('adminId', adminId);
        localStorage.setItem('adminPassword', password);
        fetchReservations(adminId, password);
      }
    } catch (error) {
      alert('Login failed: ' + (error.response?.data?.message || error.message));
    }
  };

  const sortReservations = (reservations) => {
    return [...reservations].sort((a, b) => {
      const dateComparison = new Date(b.date) - new Date(a.date);
      return dateComparison !== 0 ? dateComparison : b.time.localeCompare(a.time);
    });
  };

  const fetchReservations = async (id = adminId, pwd = password) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/admin/reservations?adminId=${id}&password=${pwd}`,
        { withCredentials: true }
      );
      setReservations(sortReservations(data.data));
    } catch (error) {
      alert('Failed to fetch reservations: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = (reservation) => {
    setEditingReservation(reservation._id);
    setFormData({
      firstName: reservation.firstName,
      lastName: reservation.lastName,
      email: reservation.email,
      phone: reservation.phone,
      date: reservation.date,
      time: reservation.time,
      payment: reservation.payment || '',
    });
  };

  const handleCancelEdit = () => {
    setEditingReservation(null);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      payment: '',
    });
  };

  const handleUpdate = async (id) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/admin/reservations/${id}`,
        formData,
        {
          headers: { 'Content-Type': 'application/json' },
          params: { adminId, password },
          withCredentials: true,
        }
      );
      if (data.success) {
        alert('Reservation updated successfully!');
        setEditingReservation(null);
        fetchReservations();
      }
    } catch (error) {
      alert('Failed to update reservation: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this reservation?')) {
      try {
        const { data } = await axios.delete(
          `http://localhost:5000/admin/reservations/${id}`,
          {
            params: { adminId, password },
            withCredentials: true,
          }
        );
        if (data.success) {
          alert('Reservation deleted successfully!');
          fetchReservations();
        }
      } catch (error) {
        alert('Failed to delete reservation: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminId');
    localStorage.removeItem('adminPassword');
    setIsLoggedIn(false);
    setAdminId('');
    setPassword('');
    setReservations([]);
  };

  return (
    <div className="admin-panel">
      {!isLoggedIn ? (
        <div className="login-form">
          <h2>Admin Login</h2>
          <form onSubmit={handleLogin}>
            <input type="text" placeholder="Admin ID" value={adminId} onChange={(e) => setAdminId(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Login</button>
          </form>
        </div>
      ) : (
        <div className="reservations-list">
          <div className="header-actions">
            <h2>All Reservations (Newest First)</h2>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Date</th>
                <th>Time</th>
                <th>Payment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation._id}>
                  {editingReservation === reservation._id ? (
                    <>
                      <td>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First Name" />
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last Name" />
                      </td>
                      <td>
                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" />
                      </td>
                      <td>
                        <input type="number" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone" />
                      </td>
                      <td>
                        <input type="date" name="date" value={formData.date} onChange={handleInputChange} />
                      </td>
                      <td>
                        <input type="time" name="time" value={formData.time} onChange={handleInputChange} />
                      </td>
                      <td>
                        <select name="payment" value={formData.payment} onChange={handleInputChange}>
                          <option value="">Select</option>
                          <option value="Cash">Cash</option>
                          <option value="UPI">UPI</option>
                          <option value="Card">Card</option>
                        </select>
                      </td>
                      <td>
                        <button onClick={() => handleUpdate(reservation._id)} className="save-btn">Save</button>
                        <button onClick={handleCancelEdit} className="cancel-btn">Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{`${reservation.firstName} ${reservation.lastName}`}</td>
                      <td>{reservation.email}</td>
                      <td>{reservation.phone}</td>
                      <td>{reservation.date}</td>
                      <td>{reservation.time}</td>
                      <td>{reservation.payment}</td>
                      <td>
                        <button onClick={() => handleEdit(reservation)} className="edit-btn">Edit</button>
                        <button onClick={() => handleDelete(reservation._id)} className="delete-btn">Delete</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin;
