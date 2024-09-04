import React, { useState } from "react";
import "./Home.css";
import SampleForm from "../../components/sampleForm/SampleForm";

const Home: React.FC = () => {
  const [openForm, setOpenForm] = useState<boolean>(false);

  const handleOpenForm = (): void => {
    setOpenForm(true);
  };

  const handleCloseForm = (): void => {
    setOpenForm(false);
  };

  return (
    <div className="dashboard">
      <main className="dashboard-main">
        <h1>Welcome to the Practice Project Website</h1>
        <p>
          This project is a practical exercise in implementing authentication
          modules, making basic API calls, and handling sorting and filtering of
          data.
        </p>
        <p>Just to clear a few interviews !!!</p>
        <button onClick={handleOpenForm}>Open Form</button>
      </main>

      {openForm && <SampleForm onClose={handleCloseForm} />}
    </div>
  );
};

export default Home;
