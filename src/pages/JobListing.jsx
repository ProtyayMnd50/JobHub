import { useEffect } from "react";
import { getJobs } from "@/api/apiJobs";
import { useSession } from "@clerk/clerk-react";

const JobListing = () => {
  const { session } = useSession();

  const fetchJobs = async () => {
    if (!session) {
      console.error("Session is not available yet");
      return;
    }

    try {
      const supabaseAccessToken = await session.getToken({
        template: "supabase",
      });
      const data = await getJobs(supabaseAccessToken, {});
      console.log(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    if (session) {
      fetchJobs();
    }
  }, [session]);

  return <div>JobListing</div>;
};

export default JobListing;
