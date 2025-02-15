import React, { useState } from "react";
import "./upload.css";
import { db, storage } from "./firebase";
import { ref as dbRef, get, set, update, push, child } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";


const Upload = () => {
    const [imageUpload, setImageUpload] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        usn: '',
        branch: '',
        section: '',
        sem: '',
        event: '',
        certificateFile: null,
        reportFile: null
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            const updatedValue = name === 'usn' ? value.toUpperCase() : value;
            setFormData({ ...formData, [name]: updatedValue });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            let currentTime = new Date();
            let imageURL = null;
            if (imageUpload == null) return;
            const imageRef = storageRef(storage, `files/${formData.usn}/${formData.usn}_${formData.event}_${currentTime}`);
            const snapshot = await uploadBytes(imageRef, imageUpload);
            imageURL = await getDownloadURL(snapshot.ref);
            //console.log(imageURL);
            alert("File Uploaded Sucessfully.");


            let eventData = {
                eventName: formData.event,
                eventURL: imageURL
            };

            const userRef = dbRef(db, `uploads/${formData.usn}`);
            const userSnapshot = await get(userRef);

            if (userSnapshot.exists()) {
                // Append the new event if the document exists
                const existingData = userSnapshot.val();
                const newEventKey = push(child(userRef, 'events')).key;
                const updates = {};
                updates[`events/${newEventKey}`] = eventData;

                if (formData.name) updates['name'] = formData.name;
                if (formData.branch) updates['branch'] = formData.branch;
                if (formData.sem) updates['sem'] = formData.sem;
                if (formData.section) updates['section'] = formData.section;

                await update(userRef, updates);
            } else {
                // Create a new document if it doesn't exist
                await set(userRef, {
                    name: formData.name,
                    usn: formData.usn,
                    branch: formData.branch,
                    section: formData.section,
                    sem: formData.sem,
                    events: {
                        [push(child(userRef, 'events')).key]: eventData
                    }
                });
            }
            alert("Data Uploaded Sucessfully");

             // Reset the form data and file input
        setFormData({
            name: '',
            usn: '',
            branch: '',
            section: '',
            sem: '',
            event: '',
            certificateFile: null,
            reportFile: null
        });
        setImageUpload(null);

        // Reset the file input in the DOM
        document.getElementById('file').value = null;

            console.log('Form Data Submitted:');
            console.log('Name:', formData.name);
            console.log('USN:', formData.usn);
            console.log('Branch:', formData.branch);
            console.log('Section:', formData.section);
            console.log('Sem:', formData.sem);
            console.log('Event:', formData.event);
            console.log('Certificate File:', formData.certificateFile ? formData.certificateFile.name : 'No file selected');
            console.log('Report File:', formData.reportFile ? formData.reportFile.name : 'No file selected');

        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };
    return(
        <>
        <div className="mainDiv">
            <p className="mainDivHeading">Upload A File To Print</p>
        <form onSubmit={handleSubmit} className="form-container">
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter Name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="usn">USN:</label>
                        <input
                            type="text"
                            id="usn"
                            name="usn"
                            value={formData.usn}
                            onChange={handleChange}
                             placeholder="Enter USN"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="branch">Branch:</label>
                        <select
                            id="branch"
                            name="branch"
                            value={formData.branch}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Branch</option>
                            <option value="CSE">CSE</option>
                            <option value="CSD">CSD</option>
                            <option value="CI">CI</option>
                            <option value="AS">AS</option>
                            <option value="AE">AE</option>
                            <option value="ME">ME</option>
                            <option value="CV">CV</option>
                            <option value="AIML">AIML</option>
                            <option value="AIDS">AIDS</option>
                            <option value="ECE">ECE</option>
                            <option value="EE">EE</option>
                            <option value="ISE">ISE</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="section">Section:</label>
                        <select
                            id="section"
                            name="section"
                            value={formData.section}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Section</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="sem">Sem:</label>
                        <select
                            id="sem"
                            name="sem"
                            value={formData.sem}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Semester</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="file">Upload File To Print:</label>
                        <input
                            type="file"
                            id="file"
                            name="file[]"
                            onChange={(event) => { setImageUpload(event.target.files[0]); }}
                            required
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
        </div>
        </>
    );
}

export default Upload;