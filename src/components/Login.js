import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";

const LOGIN_QUERY = gql`
  query LoginQuery($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      id
      firstName
      lastName
      email
    }
  }
`;

export default function First() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState(null);

  const { loading, error, data } = useQuery(LOGIN_QUERY, {
    variables: { email,password }, skip: !email || !password,
    // Skip the query if email or password is not provided
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <pre>{error.message}</pre>;

  const user = data ? data.loginUser : userData;

  return (
    <div>
      <h1>User Login</h1>
      <div>
        <label>Email: </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password: </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={() => setUserData(user)}>Login</button>

      {user && (
        <div>
          <h2>User Profile</h2>
          <ul>
            <li>ID: {user.id}</li>
            <li>Name: {user.firstName} {user.lastName}</li>
            <li>Email: {user.email}</li>
          </ul>
        </div>
      )}
    </div>
  );
}
