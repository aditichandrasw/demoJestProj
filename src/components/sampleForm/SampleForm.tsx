import React from 'react';
import './SampleForm.css'; // Assuming you save the CSS in a file named SampleForm.css

interface SampleFormProps {
  onClose: () => void;
}

const SampleForm: React.FC<SampleFormProps> = ({ onClose }) => {
  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal">
        <div>Sample Form: Fill the details below</div>
        <input type="email" placeholder="Email" />
        <input type="text" placeholder="First Name" />
        <input type="text" placeholder="Last Name" />
        <input type="text" placeholder="Phone Number" />
        <select>
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
        </select>
        <button onClick={onClose}>Close</button>
      </div>
    </>
  );
};

export default SampleForm;
