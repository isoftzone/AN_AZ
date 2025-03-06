import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { BASE_URL } from "../../config";


const ExchangePolicy: React.FC = () => {
  const [content, setContent] = useState<string>("");
  const [sectionname, setSectionname] = useState<string>("");
  
  // Fetch existing content when the component loads
  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const response = await fetch(`${BASE_URL}/get-exchange-policy`);
        const data = await response.json();
        setContent(data.content || "");
      } catch (error) {
        console.error("Error fetching exchange policy:", error);
      }
    };
    fetchPolicy();
  }, []);

  // Save the updated content
  const handleSave = async () => {
    try {
      const response = await fetch(`${BASE_URL}/save-exchange-policy`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyid: "1",
          sectionname,
          content,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Exchange policy saved successfully!");
        setContent("");
      setSectionname("");
      } else {
        alert("Failed to save policy.");
      }
    } catch (error) {
      console.error("Error saving exchange policy:", error);
    }
  };

  return (
    <div className="privacy-policy-editor">
      <h1 className="mb-3" style={{ fontWeight: "700" }}>Exchange Policy</h1>
       {/* Section Name Input */}
       <Form.Group className="mb-3">
        <Form.Label>Section Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Section Name"
          value={sectionname}
          onChange={(e) => setSectionname(e.target.value)}
        />
      </Form.Group>
      <ReactQuill
        value={content}
        onChange={setContent}
        placeholder="Edit your Exchange policy here..."
      />
      <div className="mt-4 flex gap-3">
        <Button onClick={handleSave} className="bg-green-500">Save</Button>
        <Button variant="outline" onClick={() => setContent("")}>Reset</Button>
      </div>
    </div>
  );
};

export default ExchangePolicy;

