import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const USER_MUTATION = gql`
mutation Mutation($firstName: String, $lastName: String, $email: String, $password: String) {
    createUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      id
      firstName
      lastName
      email
      password
    }
  }
`;
const Second = () => {
  const [UserMutation, { data}] = useMutation(USER_MUTATION);
  
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

 

  return (
    <div>
      <div className="flex flex-column mt3">
        <input
          className="mb2"
          value={state.firstName}
          onChange={(e) => setState({ ...state, firstName: e.target.value })}
          type="text"
          placeholder="firstName"
        />
        <input
          className="mb2"
          value={state.lastName}
          onChange={(e) => setState({ ...state, lastName: e.target.value })}
          type="text"
          placeholder="lastName"
        />
        <input
          className="mb2"
          value={state.email}
          onChange={(e) => setState({ ...state, email: e.target.value })}
          type="text"
          placeholder="email"
        />
        <input
          className="mb2"
          value={state.password}
          onChange={(e) => setState({ ...state, password: e.target.value })}
          type="password"
          placeholder="password"
        />
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          UserMutation({
            variables: { firstName: state.firstName, lastName: state.lastName , password: state.password, email:state.email},
          });
        }}
      >
        Submit
      </button>
      <div>
          <div>
       <h3>  user Deatails</h3> 
       <ul> 
        <li>firstName: {data?.createUser?.firstName}</li>
        <li>lastName: {data?.createUser?.lastName}</li>
        <li>email: {data?.createUser?.email}</li>
        <li> password: {data?.createUser?.password}</li>
         </ul> 
          </div>
      </div>
    </div>
  );
};

export default Second;
