import { AvatarGenerator } from "random-avatar-generator";
import React from "react";
import { Link } from "react-router-dom";
import {
  useFirestoreConnect,
  useFirestore,
  isLoaded,
} from "react-redux-firebase";
import { useSelector } from "react-redux";

import Loader from "../Layout/Loader";

const Students = () => {
  const generator = new AvatarGenerator();
  const img = generator.generateRandomAvatar("avatar");
  const firestore = useFirestore();
  const students = useSelector((state) => state.firestore.ordered.students);
  useFirestoreConnect([
    { collection: "students", orderBy: ["createdAt", "desc"] },
  ]);
  const deleteStudent = async (id) => {
    try {
      await firestore.collection("students").doc(id).delete();
      return;
    } catch (error) {
      console.error(error);
    }
  };
  if (!students) {
    return <Loader loading={isLoaded} />;
  }

  return (
    <div className="container">
      <div className="py-4">
        <div className="row">
          {students.map(({ name, email, id }) => (
            <div className="col-lg-3 col-md-6 mb-4" key={id}>
              <div className="card shadow text-center py-2">
                <div className="card-body">
                  <img
                    src={img}
                    height="150px"
                    style={{ marginBottom: "1rem" }}
                    alt="Avatar Img"
                  />
                  <h5 className="card-title mb-0">{name}</h5>
                  <p className="text-muted small">{email}</p>
                  <Link
                    to={`student/${id}`}
                    className="btn btn-primary btn-profile"
                  >
                    View Profile
                  </Link>
                  <button
                    className="btn btn-edit"
                    onClick={() => deleteStudent(id)}
                  >
                    <span className="material-icons">delete_outline</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Students;
