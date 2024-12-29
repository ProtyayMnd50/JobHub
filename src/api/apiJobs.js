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
    query = query.ilike("title", `%${searchQuery}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching jobs: ", error);
    return null;
  }

  return data;
}
// export async function saveJob(token, { alreadySaved }, saveData) {
//   const supabase = await supabaseClient(token);
//   if (alreadySaved) {
//     const { data, error: deleteError } = await supabase
//       .from("saved_jobs")
//       .delete()
//       .eq("job_id", saveData.job_id);

//     if (deleteError) {
//       console.error("Error deleting saved jobs ", deleteError);
//       return null;
//     }
//     return data;
//   } else {
//     const { data, error: insertError } = await supabase
//       .from("saved_jobs")
//       .insert([saveData])
//       .select();

//     if (insertError) {
//       console.error("Error inserting saved jobs ", insertError);
//       return null;
//     }

//     return data;
//   }
// }

//redefined savedjobs from GPT

export async function saveJob(token, { alreadySaved }, saveData) {
  try {
    const supabase = await supabaseClient(token);

    if (alreadySaved) {
      const { data, error: deleteError } = await supabase
        .from("saved_jobs")
        .delete()
        .eq("job_id", saveData.job_id); // Ensure job_id matches the column name in the table

      if (deleteError) {
        console.error("Error deleting saved jobs: ", deleteError.message);
        console.error("Details: ", deleteError);
        return null;
      }

      console.log("Job unsaved successfully: ", data);
      return data;
    } else {
      const { data, error: insertError } = await supabase
        .from("saved_jobs")
        .insert([saveData])
        .select();

      if (insertError) {
        console.error("Error inserting saved jobs: ", insertError.message);
        console.error("Details: ", insertError);
        return null;
      }

      console.log("Job saved successfully: ", data);
      return data;
    }
  } catch (err) {
    console.error("Unexpected error: ", err.message);
    return null;
  }
}
