import supabaseClient from "@/utils/supabase";

export async function getJobs(token, { location, company_id, searchQuery }) {
  const supabase = await supabaseClient(token);

  let query = supabase
    .from("jobs")
    .select("*,company:companies(name,logo_url),saved:saved_jobs(id)"); //company (name,logo_url) plus saved jobs accessed through query modification

  if (location) {
    //if location is present
    query = query.eq("location", location);
  }
  if (company_id) {
    //if company_id is present
    query = query.eq("location", location);
  }
  if (searchQuery) {
    //if search query is present
    query = query.ilike("title", "%${searchQuery}%");
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching jobs: ", error);
    return null;
  }

  return data;
}
