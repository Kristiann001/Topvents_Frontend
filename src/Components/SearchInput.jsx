import { Search } from "lucide-react";

export default function SearchInput({ onSearch, placeholder = "Search..." }) {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-500" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-full leading-5 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent sm:text-sm bg-white/90 backdrop-blur-md shadow-sm transition-all duration-300 hover:shadow-md text-gray-900"
        placeholder={placeholder}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}
