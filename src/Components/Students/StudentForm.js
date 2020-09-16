import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Input from "../../Controls/Input";
import { useFirestore } from "react-redux-firebase";

function StudentForm() {
  const { id } = useParams();
  const firestore = useFirestore();
  const docRef = id ? firestore.collection("students").doc(id) : null;
  const history = useHistory();
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    standard: "",
    address1: "",
    address2: "",
  };
  const [values, setValues] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  useEffect(() => {
    if (id) {
      loadStudent();
    }
  }, [id]);

  const loadStudent = async () => {
    try {
      const result = await docRef.get();
      if (result.exists) {
        setValues(result.data());
      }
      console.log("No Such Student");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      try {
        await docRef.update({
          ...values,
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });
        console.log("Updated");
      } catch (error) {
        console.error(error);
      }
    } else {
      firestore.collection("students").add({
        ...values,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
    }
    history.push("/");
  };
  return (
    <div className="container">
      <div className="py-4">
        <div className="row">
          <div className="col-md-10 mx-auto">
            <div className="card card-body shadow">
              <form onSubmit={handleSubmit}>
                <div className="form-row form-group mb-4">
                  <div className="col-md-6">
                    <Input
                      name="name"
                      placeholder="Enter Student Name"
                      value={values.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      name="email"
                      placeholder="Enter Student Email"
                      value={values.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-row form-group mb-4">
                  <div className="col-md-6">
                    <Input
                      name="phone"
                      placeholder="Enter Student Phone"
                      value={values.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      name="standard"
                      placeholder="Enter Student Standard"
                      value={values.standard}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-row form-group">
                  <div className="col-md-6">
                    <Input
                      name="address1"
                      placeholder="Enter Student Address1"
                      value={values.address1}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      name="address2"
                      placeholder="Enter Student Address2"
                      value={values.address2}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary">
                  {id ? "Update Student" : "Add Student"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentForm;
