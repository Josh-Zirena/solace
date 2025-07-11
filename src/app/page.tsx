"use client";

import { useEffect, useState, useCallback } from "react";
import { Advocate } from "@/types";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAdvocates = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/advocates");

      if (!response.ok) {
        throw new Error(`Failed to fetch advocates: ${response.status}`);
      }

      const jsonResponse = await response.json();
      setAdvocates(jsonResponse.data);
      setFilteredAdvocates(jsonResponse.data);
    } catch (err) {
      console.error("Error fetching advocates:", err);
      setError(
        err instanceof Error ? err.message : "Failed to fetch advocates"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAdvocates();
  }, [fetchAdvocates]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTermValue = e.target.value;
    setSearchTerm(searchTermValue);

    console.log("filtering advocates...");
    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        advocate.firstName.includes(searchTermValue) ||
        advocate.lastName.includes(searchTermValue) ||
        advocate.city.includes(searchTermValue) ||
        advocate.degree.includes(searchTermValue) ||
        advocate.specialties.join(" ").includes(searchTermValue) ||
        advocate.yearsOfExperience.toString().includes(searchTermValue)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const onClick = () => {
    console.log(advocates);
    setSearchTerm("");
    setFilteredAdvocates(advocates);
  };

  if (loading) {
    return (
      <main className="p-6">
        <h1 className="text-3xl font-bold mb-4">Solace Advocates</h1>
        <p className="text-gray-600">Loading advocates...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="p-6">
        <h1 className="text-3xl font-bold mb-4">Solace Advocates</h1>
        <p className="text-red-600 mb-4">Error: {error}</p>
        <button 
          onClick={fetchAdvocates}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Try Again
        </button>
      </main>
    );
  }

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span>{searchTerm}</span>
        </p>
        <input
          style={{ border: "1px solid black" }}
          value={searchTerm}
          onChange={onChange}
        />
        <button onClick={onClick}>Reset Search</button>
      </div>
      <br />
      <br />
      <table>
        <thead>
          <th>First Name</th>
          <th>Last Name</th>
          <th>City</th>
          <th>Degree</th>
          <th>Specialties</th>
          <th>Years of Experience</th>
          <th>Phone Number</th>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate) => {
            return (
              <tr key={advocate.phoneNumber}>
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  {advocate.specialties.map((s, idx) => (
                    <div key={`${advocate.phoneNumber}-${idx}`}>{s}</div>
                  ))}
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
