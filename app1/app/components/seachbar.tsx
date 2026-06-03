"use client";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}




export default function SearchBar({ searchTerm, setSearchTerm }: SearchBarProps) {


  return (
    <div className="search-bar">

      <input className="search-bar input" 
      type="search" 
      placeholder="Search  by products or categories..." 
      value = {searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    </div>

  );
}