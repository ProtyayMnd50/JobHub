import supabaseClient from "@/utils/supabase";
import { State, City } from "country-state-city";

export async function getJobs(token, { location, company_id, searchQuery }) {
  // console.log(location);
  // console.log(company_id);
  // console.log(searchQuery);
  const states = State.getStatesOfCountry("IN"); //all states of country

  const statesnCode = [...states.map((state) => [state.name, state.isoCode])];
  function getStateIsoCode(location) {
    const state = statesnCode.find(([name]) => name === location);
    return state ? state[1] : "State not found"; // Return ISO code or error message
  }
  const locationISO = getStateIsoCode(location); // Get ISO code for location (state)
  const allstatesofCities = City.getCitiesOfState("IN", locationISO); //get all cities of states object format
  const sirfcities = allstatesofCities.map((state) => state.name); //all state names
  if (location === "Karnataka") sirfcities.push("Bangalore");
  // console.log(locationISO);
  // console.log(sirfcities);
  const supabase = await supabaseClient(token);

  let query = supabase
    .from("jobs")
    .select("*, saved: saved_jobs(id), company: companies(name,logo_url)");

  if (location) {
    //if location is present
    query = query.in("location", sirfcities);
    // query = query.ilike("location", "Noida");
  }
  if (company_id) {
    //if company_id is present
    query = query.eq("company_id", company_id);
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

export async function getSingleJob(token, { job_id }) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("jobs")
    .select(
      "*, company: companies(name,logo_url), applications:applications(*)"
    )
    .eq("id", job_id)
    .single();

  if (error) {
    console.error("error fetching comapany", error);
    return null;
  }

  return data;
}

export async function updateHiringStatus(token, { job_id }, isOpen) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("jobs")
    .update({ isOpen })
    .eq("id", job_id)
    .select();

  if (error) {
    console.error("error updating job", error);
    return null;
  }

  return data;
}
//post job functionality
export async function addNewJob(token, _, jobData) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .insert([jobData])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Error Creating Job");
  }

  return data;
}

// Read Saved Jobs
export async function getSavedJobs(token) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("saved_jobs")
    .select("*, job: jobs(*, company: companies(name,logo_url))");

  if (error) {
    console.error("Error fetching Saved Jobs:", error);
    return null;
  }

  return data;
}
