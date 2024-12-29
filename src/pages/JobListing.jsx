import { useEffect, useState } from "react";
import { getJobs } from "@/api/apiJobs";
import { useSession, useUser } from "@clerk/clerk-react";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";
import JobCard from "@/components/job-card";
import { getCompanies } from "@/api/apiCompanies";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { State } from "country-state-city";

// import { JobCard } from "../components/job-card";
const JobListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");
  const { isLoaded } = useUser();
  const {
    fn: fnJobs,
    data: Jobs,
    loading: loadingJobs,
  } = useFetch(getJobs, { location, company_id, searchQuery });
  console.log(Jobs);
  // console.log(loadingJobs);

  const { fn: fnCompanies, data: companies } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) {
      //fetch only if loading is done
      fnJobs();
    }
  }, [isLoaded, location, company_id, searchQuery]);

  useEffect(() => {
    if (isLoaded) {
      //fetch only if loading is done
      fnCompanies();
    }
  }, [isLoaded]);

  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    const query = formData.get("search-query");
    if (query) setSearchQuery(query);
  };

  if (!isLoaded) {
    //what to display if screen not loaded yet
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div>
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Latest Jobs
      </h1>

      {/* add filters here */}

      <form
        onSubmit={handleSearch}
        className="h-14 flex w-full gap-2 items-center mb-3"
      >
        <Input
          type="text"
          placeholder="Search jobs by title..."
          name="search-query"
          className="h-full flex-1 px-4 text-md"
        />

        <Button type="submit" className="h-full sm:w-28" variant="blue">
          Search
        </Button>
      </form>

      <Select value={location} onValueChange={(value) => setLocation(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a state" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {State.getStatesOfCountry("IN").map(({ name }) => {
              return (
                <SelectLabel value={name} key={name}>
                  {name}
                </SelectLabel>
              );
            })}
            {/* <SelectItem value="apple">Apple</SelectItem> */}
          </SelectGroup>
        </SelectContent>
      </Select>
      {/*
      <Select
        value={company_id}
        onValueChange={(value) => setCompany_id(value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by company" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {companies.map(({ name }) => {
              return (
                <SelectLabel value={name} key={name}>
                  {name}
                </SelectLabel>
              );
            })}

          </SelectGroup>
        </SelectContent>
      </Select> */}

      {loadingJobs && (
        <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
      )}

      {loadingJobs === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Jobs?.length ? (
            Jobs.map((job) => {
              return (
                <JobCard
                  key={job.id}
                  job={job}
                  savedInit={job?.saved?.length > 0}
                />
              );
            })
          ) : (
            <div>No Jobs Found 😢</div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobListing;
