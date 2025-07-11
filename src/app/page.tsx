"use client";

import { useEffect, useState, useCallback } from "react";
import { Advocate, AdvocatesApiResponse } from "@/types";
import { formatPhoneDisplay, formatPhoneTel } from "@/utils/phoneFormatter";

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

      const jsonResponse: AdvocatesApiResponse = await response.json();
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
    const searchTermValue = e.target.value.trim().toLowerCase();
    setSearchTerm(e.target.value);

    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        advocate.firstName.toLowerCase().includes(searchTermValue) ||
        advocate.lastName.toLowerCase().includes(searchTermValue) ||
        advocate.city.toLowerCase().includes(searchTermValue) ||
        advocate.degree.toLowerCase().includes(searchTermValue) ||
        advocate.specialties
          .join(" ")
          .toLowerCase()
          .includes(searchTermValue) ||
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
      <main className="min-h-screen bg-gradient-to-br from-solace-accent via-solace-secondary to-solace-mint/20 p-6 font-lato">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-solace-primary via-solace-emerald to-solace-sage bg-clip-text text-transparent animate-pulse font-mollie-glaston">
              Solace Advocates
            </h1>
            <div className="flex items-center justify-center space-x-3">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-solace-mint border-t-solace-primary shadow-lg"></div>
              <p className="text-solace-primary font-medium text-lg">
                Finding your perfect healthcare advocate...
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-solace-accent via-solace-secondary to-solace-mint/20 p-6 font-lato">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-solace-primary via-solace-emerald to-solace-sage bg-clip-text text-transparent font-mollie-glaston">
              Solace Advocates
            </h1>
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-red-200 p-8 max-w-md mx-auto">
              <p className="text-red-600 mb-6 font-medium">Oops! {error}</p>
              <button
                onClick={fetchAdvocates}
                className="bg-gradient-to-r from-solace-primary via-solace-emerald to-solace-sage hover:from-solace-primary-dark hover:via-solace-emerald-dark hover:to-solace-forest text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-solace-accent via-solace-secondary to-solace-mint/20 p-6 font-lato">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-solace-primary via-solace-emerald to-solace-sage bg-clip-text text-transparent font-mollie-glaston">
            Solace Advocates
          </h1>
          <p className="text-solace-primary text-xl font-medium mb-6">
            Find experienced healthcare advocates in your area
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-solace-mint/50 p-8 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-solace-mint/10 via-transparent to-solace-sage/10 pointer-events-none"></div>
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <div className="flex-1">
                <label
                  htmlFor="search"
                  className="block text-lg font-bold text-solace-primary mb-3"
                >
                  Search Advocates
                </label>
                <input
                  id="search"
                  type="text"
                  placeholder="Search by name, city, degree, or specialty..."
                  className="w-full px-6 py-4 border-2 border-solace-mint/30 rounded-2xl focus:ring-4 focus:ring-solace-emerald/30 focus:border-solace-emerald transition-all duration-300 text-solace-primary placeholder-solace-gray-medium bg-white/80 backdrop-blur-sm text-lg font-medium shadow-inner"
                  value={searchTerm}
                  onChange={onChange}
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={onClick}
                  className="px-6 py-3 bg-gradient-to-r from-solace-sage/20 to-solace-mint/20 hover:from-solace-sage/30 hover:to-solace-mint/30 text-solace-primary rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-solace-emerald/30 font-medium border border-solace-mint/30 hover:border-solace-emerald/50 transform hover:scale-[1.02]"
                >
                  Clear
                </button>
              </div>
            </div>
            {searchTerm && (
              <div className="mt-4 p-4 bg-gradient-to-r from-solace-emerald/10 to-solace-mint/10 rounded-2xl border border-solace-mint/30">
                <div className="text-lg text-solace-primary font-medium">
                  Showing results for:{" "}
                  <span className="font-bold text-solace-emerald">
                    {searchTerm}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-center">
          <div className="inline-block bg-gradient-to-r from-solace-emerald to-solace-sage text-white px-6 py-3 rounded-full font-medium text-base shadow-lg">
            {filteredAdvocates.length} advocate
            {filteredAdvocates.length !== 1 ? "s" : ""} found
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gradient-to-r from-solace-secondary via-solace-mint/20 to-solace-sage/20">
              <tr>
                <th className="px-6 py-6 text-left text-sm font-black text-solace-primary uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-6 text-left text-sm font-black text-solace-primary uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-6 text-left text-sm font-black text-solace-primary uppercase tracking-wider">
                  Credentials
                </th>
                <th className="px-6 py-6 text-left text-sm font-black text-solace-primary uppercase tracking-wider">
                  Specialties
                </th>
                <th className="px-6 py-6 text-left text-sm font-black text-solace-primary uppercase tracking-wider">
                  Experience
                </th>
                <th className="px-6 py-6 text-left text-sm font-black text-solace-primary uppercase tracking-wider">
                  Contact
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-solace-mint/20">
              {filteredAdvocates.map((advocate, index) => (
                <tr
                  key={advocate.phoneNumber}
                  className={`hover:bg-gradient-to-r hover:from-solace-mint/10 hover:to-solace-sage/10 transition-all duration-200 transform hover:scale-[1.01] ${
                    index % 2 === 0 ? "bg-white/80" : "bg-solace-secondary/30"
                  }`}
                >
                  <td className="px-6 py-6 whitespace-nowrap">
                    <div className="text-lg font-bold text-solace-primary">
                      {advocate.firstName} {advocate.lastName}
                    </div>
                  </td>
                  <td className="px-6 py-6 whitespace-nowrap">
                    <div className="text-base text-solace-gray-dark font-medium">
                      {advocate.city}
                    </div>
                  </td>
                  <td className="px-6 py-6 whitespace-nowrap">
                    <div className="text-base text-solace-gray-dark font-medium">
                      {advocate.degree}
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex flex-wrap gap-1">
                      {advocate.specialties.map((specialty, idx) => {
                        const colors = [
                          "bg-gradient-to-r from-solace-emerald-dark to-solace-emerald text-white",
                          "bg-gradient-to-r from-solace-primary to-solace-primary-dark text-white",
                          "bg-gradient-to-r from-solace-forest to-solace-emerald-dark text-white",
                          "bg-gradient-to-r from-solace-primary-dark to-solace-forest text-white",
                        ];
                        return (
                          <span
                            key={`${advocate.phoneNumber}-${idx}`}
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium shadow-sm transform hover:scale-105 transition-all duration-200 ${
                              colors[idx % colors.length]
                            }`}
                          >
                            {specialty}
                          </span>
                        );
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-6 whitespace-nowrap">
                    <div className="text-base text-solace-gray-dark font-bold">
                      {advocate.yearsOfExperience} years
                    </div>
                  </td>
                  <td className="px-6 py-6 whitespace-nowrap">
                    <a
                      href={`tel:${formatPhoneTel(advocate.phoneNumber)}`}
                      className="text-solace-primary hover:text-solace-primary-dark transition-colors text-sm font-medium"
                    >
                      {formatPhoneDisplay(advocate.phoneNumber)}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-6">
          {filteredAdvocates.map((advocate) => (
            <div
              key={advocate.phoneNumber}
              className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border-2 border-solace-mint/30 p-6 transform hover:scale-105 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-solace-mint/5 via-transparent to-solace-sage/5 pointer-events-none"></div>
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-solace-primary mb-2">
                      {advocate.firstName} {advocate.lastName}
                    </h3>
                    <p className="text-lg text-solace-gray-dark font-medium">
                      {advocate.city}
                    </p>
                  </div>
                  <a
                    href={`tel:${formatPhoneTel(advocate.phoneNumber)}`}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-solace-primary to-solace-emerald hover:from-solace-primary-dark hover:to-solace-emerald-dark text-white rounded-full font-bold transition-all duration-300 transform hover:scale-110 shadow-lg text-lg"
                  >
                    {formatPhoneDisplay(advocate.phoneNumber)}
                  </a>
                </div>

                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-solace-secondary/50 to-solace-mint/20 rounded-2xl p-4">
                    <dt className="text-sm font-bold text-solace-primary mb-1">
                      Credentials
                    </dt>
                    <dd className="text-base text-solace-gray-dark font-medium">
                      {advocate.degree}
                    </dd>
                  </div>

                  <div className="bg-gradient-to-r from-solace-mint/20 to-solace-sage/20 rounded-2xl p-4">
                    <dt className="text-sm font-bold text-solace-primary mb-1">
                      Experience
                    </dt>
                    <dd className="text-base text-solace-gray-dark font-medium">
                      {advocate.yearsOfExperience} years
                    </dd>
                  </div>

                  <div className="bg-gradient-to-r from-solace-sage/20 to-solace-emerald/20 rounded-2xl p-4">
                    <dt className="text-sm font-bold text-solace-primary mb-2">
                      Specialties
                    </dt>
                    <dd className="flex flex-wrap gap-1">
                      {advocate.specialties.map((specialty, idx) => {
                        const colors = [
                          "bg-gradient-to-r from-solace-emerald-dark to-solace-emerald text-white",
                          "bg-gradient-to-r from-solace-primary to-solace-primary-dark text-white",
                          "bg-gradient-to-r from-solace-forest to-solace-emerald-dark text-white",
                          "bg-gradient-to-r from-solace-primary-dark to-solace-forest text-white",
                        ];
                        return (
                          <span
                            key={`${advocate.phoneNumber}-${idx}`}
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium shadow-sm transform hover:scale-105 transition-all duration-200 ${
                              colors[idx % colors.length]
                            }`}
                          >
                            {specialty}
                          </span>
                        );
                      })}
                    </dd>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAdvocates.length === 0 && (
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border-2 border-solace-mint/30 p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-solace-mint/10 via-transparent to-solace-sage/10 pointer-events-none"></div>
            <div className="relative z-10">
              <svg
                className="mx-auto h-16 w-16 text-solace-primary/40 mb-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <h3 className="text-3xl font-bold text-solace-primary mb-4">
                No advocates found!
              </h3>
              <p className="text-xl text-solace-gray-dark mb-6">
                Try adjusting your search criteria or clearing the search to see
                all advocates.
              </p>
              <div className="flex justify-center space-x-2">
                <div className="w-3 h-3 bg-solace-primary rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-solace-emerald rounded-full animate-pulse [animation-delay:200ms]"></div>
                <div className="w-3 h-3 bg-solace-sage rounded-full animate-pulse [animation-delay:400ms]"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
