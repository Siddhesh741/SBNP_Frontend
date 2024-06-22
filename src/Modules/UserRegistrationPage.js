import React, { useState,useEffect } from 'react';
import { FaUser, FaMobileAlt, FaIdBadge, FaLock, FaEye, FaEyeSlash, FaUserCog, FaTrash } from 'react-icons/fa';
import './UserRegistrationPage.css';
import Popup from '../Common-compo/Popup';
import config from '../config';  // Import the configuration file

const UserRegistrationPage = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
 
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('Owner');

  
  const [moduleAccess, setModuleAccess] = useState({
    CustomerBooking: true,
    Expenses: false,
    Food: false,
    Calendar: false,
    Inventory: false,
    Settlement: false,
    Report: false,
  });
  
  
  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {          //Fetch all users data from backend
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/users`);
        if (response.ok) {
          const data = await response.json();
          setUsers(data.reverse());
          setLoading(false);
        } else {
          console.error('Failed to fetch users:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);




  
  const handleDeleteUser = async (id) => {
    try {
      // Call delete API endpoint with user id
      const response = await fetch(`http://localhost:8080/api/users/deleteUser/${id}`, { method: 'DELETE' });
      if (response.ok) {
        // If deletion is successful, update users state excluding the deleted user
        setUsers(users.filter(user => user.id !== id));
        // Show success message
        setPopupMessage('User deleted successfully.');
        setShowPopup(true);
      } else {
        console.error('Failed to delete user:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const handleClickNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handleClickPrev = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = users.slice(startIndex, endIndex);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let error = '';

    switch (name) {
      case 'fullName':
        setFullName(value);
        if (!/^[a-zA-Z\s]*$/.test(value)) {
          error = 'Full name should contain only letters and spaces.';
        }
        break;
      case 'mobile':
        setMobile(value);
        if (!/^\d{0,10}$/.test(value)) {
          error = 'Mobile number should contain exactly 10 digits.';
        }
        break;
      case 'userId':
        setUserId(value);
        if (!/^[a-zA-Z0-9]{0,15}$/.test(value)) {
          error = 'User ID should be up to 15 characters long and contain only letters and numbers.';
        }
        break;
      case 'password':
        setPassword(value);
        if (value.length < 8) {
          error = 'Password should be at least 8 characters long.';
        }
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        if (value !== password) {
          error = 'Passwords do not match.';
        }
        break;
      case 'userType':
        setUserType(value);
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleModuleChange = (e) => {   //module acess checkbox
    const { name, checked } = e.target;
    setModuleAccess((prevAccess) => ({
      ...prevAccess,
      [name]: checked,
    }));
  };
 
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      const userData = { fullName, mobile, userId, password, userType, moduleAccess };
      // console.log(JSON.stringify(userData));// Log data being sent to backend
      console.log("Submitting user data:", userData); 
      const url = `${config.apiUrl}/users/createUser`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      };

      try {
        const response = await fetch(url, options);

        if (response.ok) {
          // After successful submission, fetch the updated list of users
          const updatedResponse = await fetch(`${config.apiUrl}/users`);
          if (updatedResponse.ok) {
            const updatedData = await updatedResponse.json();
            // Update the users state with the new list of users
            setUsers(updatedData.reverse());
            setPopupMessage(`Congratulations! ${userType} saved successfully.`);
            setShowPopup(true);
            clearForm();
          } else {
            console.error('Failed to fetch updated users:', updatedResponse.statusText);
          }
        } else {
          console.error('Form submission failed:', response.statusText);
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    } else {
      setErrors(validationErrors);
    }
  };


  const validateForm = () => {
    const errors = {};
    if (!/^[a-zA-Z\s]*$/.test(fullName)) {
      errors.fullName = 'Full name should contain only letters and spaces.';
    }
    if (!/^\d{10}$/.test(mobile)) {
      errors.mobile = 'Mobile number should contain exactly 10 digits.';
    }
    if (!/^[a-zA-Z0-9]{5,15}$/.test(userId)) {
      errors.userId = 'User ID should be 5-15 characters long and contain only letters and numbers.';
    }
    if (password.length < 8) {
      errors.password = 'Password should be at least 8 characters long.';
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }
    return errors;
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  }; 

  if (!isVisible) {
    return null;
  }

 //Clearform after submit 
  const clearForm = () => {
    setFullName('');
    setMobile('');
    setUserId('');
    setPassword('');
    setConfirmPassword('');
    setUserType('Owner');
    setModuleAccess({
      CustomerBooking: true,
      Expenses: false,
      Food: false,
      Calendar: false,
      Inventory: false,
      Settlement: false,
      Report: false,
  });
  };
 
  return (
    <div className="registration-pagee">
      <div className="registration-cont">
        <div className="registration-header">
          <h2>User Registration</h2>
          <button className="close-button" onClick={handleClose}>
            X
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <FaUser className="input-icon" />
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={fullName}
              onChange={handleChange}
              required
            />
            {errors.fullName && <span className="error">{errors.fullName}</span>}
          </div>
          <div className="input-field">
            <FaMobileAlt className="input-icon" />
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile No"
              value={mobile}
              onChange={handleChange}
              required
            />
            {errors.mobile && <span className="error">{errors.mobile}</span>}
          </div>
          <div className="input-field">
            <FaIdBadge className="input-icon" />
            <input
              type="text"
              name="userId"
              placeholder="Username"
              value={userId}
              onChange={handleChange}
              required
            />
            {errors.userId && <span className="error">{errors.userId}</span>}
          </div>
          <div className="input-field">
            <FaLock className="input-icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
              required
            />
            <span className="password-toggle" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
          <div className="input-field">
            <FaLock className="input-icon" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleChange}
              required
            />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          </div>
          <div className="input-field">
            <FaUserCog className="input-icon" />
            <select name="userType" value={userType} onChange={handleChange} required>
              <option value="Owner">Owner</option>
              <option value="Employee">Employee</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <div className="module-access">
            <label>Module Access:</label>
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="CustomerBooking"
                  checked={moduleAccess.CustomerBooking}
                  onChange={handleModuleChange}
                />
                Customer Booking
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Expenses"
                  checked={moduleAccess.Expenses}
                  onChange={handleModuleChange}
                />
                Expenses
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Food"
                  checked={moduleAccess.Food}
                  onChange={handleModuleChange}
                />
                Food
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Calendar"
                  checked={moduleAccess.Calendar}
                  onChange={handleModuleChange}
                />
                Calendar
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Inventory"
                  checked={moduleAccess.Inventory}
                  onChange={handleModuleChange}
                />
                Inventory
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Settlement"
                  checked={moduleAccess.Settlement}
                  onChange={handleModuleChange}
                />
                Settlement
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Report"
                  checked={moduleAccess.Report}
                  onChange={handleModuleChange}
                />
                Report
              </label>
            </div>
          </div>

          <div className="button-group">
            <button type="submit" className="submit-button">Submit</button>
            <button type="button" className="close-button" onClick={handleClose}>Close</button>
          </div>
        </form>
      </div>
       {showPopup && <Popup message={popupMessage} onClose={handlePopupClose} />} 
    
  <div className="user-table-container">
  <h2 className="user-table-heading">User Table</h2>
  <div className="user-table">
    {loading ? (
      <div className='loading'>Loading...</div>
    ) : (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Action</th> {/* New column for delete action */}
            <th>Full Name</th>
            <th>Mobile</th>
            <th>User ID</th>
            <th>Password</th>
            <th>User Type</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map(user => (
            <tr key={user.id}>
              
              <td>{user.id}</td>
              <td>
                      {/* Delete icon with onClick event to prompt user for deletion */}
                      <FaTrash onClick={() => handleDeleteUser(user.id)} className="delete-icon" />
                    </td>
              <td>{user.fullName}</td>
              <td>{user.mobile}</td>
              <td>{user.userId}</td>
              <td>{user.password}</td>
              <td>{user.userType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
  
  {/* Pagination buttons */}
  <div class="pagination">
    <button onClick={handleClickPrev} disabled={currentPage === 1}>Prev</button>
    <span>{`Page ${currentPage} of ${totalPages}`}</span>
    <button onClick={handleClickNext} disabled={currentPage === totalPages}>Next</button>
  </div>
  </div>
   {/* Popup for delete confirmation */}
   {showPopup && <Popup message={popupMessage} onClose={handlePopupClose} />}
</div>
  );
  
};

export default UserRegistrationPage;
