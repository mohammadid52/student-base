import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Avatar from "../Layout/Avatar";
import { useFirestore, isLoaded } from "react-redux-firebase";
import Loader from "../Layout/Loader";

function Student() {
  const { id } = useParams();
  const firestore = useFirestore();
  const [student, setStudent] = useState(null);
  const loadStudent = async () => {
    try {
      const docRef = firestore.collection("students").doc(id);
      const result = await docRef.get();
      if (result.exists) {
        setStudent(result.data());
      }
      console.log("No Such Student");
    } catch (error) {
      console.log("error: ", error);
    }
  };
  useEffect(() => {
    loadStudent();
  }, []);
  if (!student) {
    return <Loader loading={isLoaded} />;
  }
  const { name, email, phone, standard, address1, address2 } = student;
  return (
    <div className="container">
      <div className="py-4">
        <div className="row">
          <div className="col-md-10 mx-auto">
            <div className="card card-body shadow">
              <div className="row">
                <div className="col-md-4">
                  <Avatar url={`https://i.pravatar.cc/300?img=${id}`} />
                </div>
                <div className="col-md-8">
                  <ul className="list-group">
                    <li className="d-flex justify-content-between align-items-center list-group-item list-group-item-action">
                      <h3 className="m-0">{name}</h3>
                      <Link
                        className="btn btn-primary"
                        to={`/studentForm/${id}`}
                      >
                        edit profile
                      </Link>
                    </li>
                    <li className="list-group-item">
                      <p>email: {email}</p>
                      <p>phone: {phone}</p>
                      <p>class: {standard}</p>
                      <p>address 1: {address1}</p>
                      <p>address 2: {address2}</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Student;
