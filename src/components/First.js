import React from "react";
import { useQuery, gql } from "@apollo/client";

const FILMS_QUERY = gql`
query Query {
    getAllUser {
      id
      firstName
      lastName
      email
      password
    }
  }
`;

export default function First() {
  const { loading, error, data} = useQuery(FILMS_QUERY);

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>

  return (
    <div>
      <h1>SpaceX Launches</h1>
      <ul>
        {data.getAllUser.map((launch) => (
          <li key={launch.id}>{launch.firstName}</li>
        ))}
      </ul>
    </div>
  );
}
