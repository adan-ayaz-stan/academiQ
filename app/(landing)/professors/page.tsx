import Navbar from "../_components/Navbar";
import FilterSidebar from "./_components/FilterSidebar";
import ProfessorsList from "./_components/ProfessorsList";

export default function Professors() {
  return (
    <div className="min-h-screen h-[300vh] bg-scampi-50 pt-24 px-4">
      <Navbar />
      <div className="w-full max-w-5xl mx-auto gap-4">
        <FilterSidebar />
        <ProfessorsList />
      </div>
    </div>
  );
}
