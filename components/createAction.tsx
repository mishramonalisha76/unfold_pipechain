import React, { useState } from 'react';

interface CreatePluginCompProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreatePluginComp: React.FC<CreatePluginCompProps> = ({ isOpen, onClose }) => {
  const [inputKeyFields, setInputKeyFields] = useState<string[]>(['']);
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [iconUrl, setIconUrl] = useState<string>('');
  const [iconPreview, setIconPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const addInputField = () => {
    setInputKeyFields([...inputKeyFields, '']);
  };

  const removeInputField = (index: number) => {
    const updatedFields = [...inputKeyFields];
    updatedFields.splice(index, 1);
    setInputKeyFields(updatedFields);
  };

  const handleIconFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIconFile(file);
      setIconUrl('');
      setIconPreview(null); // Clear the icon preview when a new file is selected
      previewImage(file);
    }
  };

  const handleIconUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIconFile(null);
    setIconUrl(event.target.value);
    setIconPreview(event.target.value);
  };

  const previewImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setIconPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteIcon = () => {
    setIconFile(null);
    setIconUrl('');
    setIconPreview(null);
  };

  const handleSubmit = () => {
    setLoading(true);

    // Get form field values
    const formData: any = {
      name: '', // Get the name value
      description: '', // Get the description value
      inputKeyFields: inputKeyFields, // Use the input key fields
    };

    if (iconFile) {
      // User uploaded an image, send the image blob to the backend
      formData.icon = iconFile; // Add the image blob to formData
      sendFormDataToBackend(formData);
    } else if (iconUrl) {
      // User provided an image URL, send the URL to the backend
      formData.iconUrl = iconUrl; // Add the image URL to formData
      sendFormDataToBackend(formData);
    } else {
      // No image provided, send the formData without an image
      sendFormDataToBackend(formData);
    }
  };

  const sendFormDataToBackend = (formData: any) => {
    // Here, you can send the formData object to your backend using an HTTP request
    // For example, if you're using fetch:
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set the content type accordingly
      },
      body: JSON.stringify(formData), // Convert formData to JSON and send it in the request body
    };

    // Mock API request for demonstration purposes
    // Replace with your actual API endpoint and handling
    fetch('YOUR_BACKEND_API_URL', requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Handle the response from the backend
        console.log('Backend Response:', data);
        setLoading(false);
        onClose();
      })
      .catch((error) => {
        // Handle errors
        console.error('Error sending data to the backend:', error);
        setLoading(false);
      });
  };

  const isDisabled = () => {
    return !(
      inputKeyFields.length > 0 &&
      (iconFile || iconUrl) &&
      !loading
    );
  };

  return (
    <div className={`w-[90%] mx-auto mt-16 ${isOpen ? '' : 'hidden'} flex flex-col gap-10 overflow-y-auto rounded-2xl bg-white p-8 shadow-2xl`}>
      <p className="mb-4 text-center text-2xl font-extrabold">CREATE PLUGIN</p>

      <div className="flex flex-col gap-4">
        <p className="text-[1.1rem] font-medium tracking-wide">Name</p>
        <input className="w-full rounded-md bg-slate-200 p-2" placeholder="Enter name" />
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-[1.1rem] font-medium tracking-wide">Description</p>
        <textarea rows={5} className="w-full rounded-md bg-slate-200 p-2" placeholder="Enter description" />
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-[1.1rem] font-medium tracking-wide">Icon</p>
        <div className="relative">
          {iconFile || iconUrl ? (
            <div className="absolute top-0 right-0 mt-1 mr-1 text-red-500 hover:text-red-700 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                onClick={handleDeleteIcon}
                //title="Delete Icon"
              >
                <path
                  fillRule="evenodd"
                  d="M14.293 5.293a1 1 0 011.414 1.414L11.414 12l4.293 4.293a1 1 0 11-1.414 1.414L10 13.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 12 4.293 7.707a1 1 0 111.414-1.414L10 10.586l4.293-4.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          ) : null}
          <input
            type="file"
            accept="image/*"
            onChange={handleIconFileChange}
            className="hidden"
            id="iconUploadInput"
          />
          <label htmlFor="iconUploadInput" className="cursor-pointer text-blue-500 hover:text-blue-700">
            Upload Image
          </label>
          <input
            className="w-full rounded-md bg-slate-200 p-2"
            placeholder="Or Paste Icon URL"
            value={iconUrl}
            onChange={handleIconUrlChange}
          />
        </div>
      </div>

      {iconPreview && (
        <div>
          <p>Icon Preview:</p>
          <img src={iconPreview} alt="Icon Preview" className="w-16 h-16" />
        </div>
      )}

      <div className="flex flex-col items-center gap-4">
        {inputKeyFields.map((key, index) => (
          <div className="flex gap-4" key={index}>
            <input
              className="w-full rounded-md bg-slate-200 p-2"
              placeholder="Key"
              type="text"
              value={key}
              onChange={(e) => {
                const updatedFields = [...inputKeyFields];
                updatedFields[index] = e.target.value;
                setInputKeyFields(updatedFields);
              }}
            />
            {index > 0 && (
              <button
                className="rounded-lg border-2 border-teal-500 px-2 py-1 text-sm font-bold text-teal-500 hover:bg-teal-500 hover:text-white"
                onClick={() => removeInputField(index)}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          onClick={addInputField}
          className="rounded-lg border-2 border-teal-500 px-2 py-1 text-sm font-bold text-teal-500 hover:bg-teal-500 hover:text-white"
        >
          Add Key
        </button>
      </div>

      <button
        onClick={handleSubmit}
        className={`rounded-lg ${isDisabled() ? 'bg-slate-400' : 'bg-teal-500/75'} px-4 py-4 font-bold text-white hover:bg-teal-500`}
      >
        {loading ? 'Creating...' : 'CREATE PLUGIN'}
      </button>
    </div>
  );
};

export default CreatePluginComp;
