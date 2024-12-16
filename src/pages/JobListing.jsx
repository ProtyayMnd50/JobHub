import { useEffect, useState } from "react";
import { getJobs } from "@/api/apiJobs";
import { useSession, useUser } from "@clerk/clerk-react";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";

const JobListing = () => {
  // const { session } = useSession();

  // const fetchJobs = async () => {
  //   if (!session) {
  //     console.error("Session is not available yet");
  //     return;
  //   }

  //   try {
  //     const supabaseAccessToken = await session.getToken({
  //       template: "supabase",
  //     });
  //     const data = await getJobs(supabaseAccessToken, {});
  //     console.log("data", data);
  //   } catch (error) {
  //     console.error("Error fetching jobs:", error);
  //   }
  // };

  // useEffect(() => {
  //   if (session) {
  //     fetchJobs();
  //   }
  // }, [session]);

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

  useEffect(() => {
    if (isLoaded) {
      //fetch only if loading is done
      fnJobs();
    }
  }, [isLoaded, location, company_id, searchQuery]);

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

      {loadingJobs && (
        <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
      )}
      {loadingJobs === false && (
        <div>
          {Jobs?.length ? (
            <div>
              {Jobs.map((job, index) => (
                <span key={index}>{job.title}</span>

                // <JobCard/>
              ))}
            </div>
          ) : (
            <div>No jobs found 😔</div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobListing;
