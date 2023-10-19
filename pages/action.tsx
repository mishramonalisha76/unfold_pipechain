import React, { useState } from "react";
import ActionForm from "../components/createAction"; // Import your different form

function YourPage() {
  const [actionFormOpen, setIsActionFormOpen] = useState(false); // State to control the different form visibility

  // Function to open the different form
  const openDifferentForm = () => {
    setIsActionFormOpen(true);
  };

  // Function to close the different form
  const closeDifferentForm = () => {
    setIsActionFormOpen(false);
  };

  return (
    <div>
      <h1>Your Page</h1>

      {/* Button to open the different form */}
      <button
        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={openDifferentForm}
      >
        Open Action Form
      </button>

      {/* Render the different form if it's open */}
      {actionFormOpen && (
        <ActionForm isOpen={actionFormOpen} onClose={closeDifferentForm} />
      )}

      {/* Other page content goes here */}
    </div>
  );
}

export default YourPage;
