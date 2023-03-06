import axios from "axios";

const consultantTypesURL0 =
  "https://staging-api.expertplans.co.uk/consultantTypes/0";
const consultantTypesURL1 =
  "https://staging-api.expertplans.co.uk/consultantTypes/1";

export async function fetchConsultantTypes() {
  try {
    const response0 = await axios.get(consultantTypesURL0);
    const response1 = await axios.get(consultantTypesURL1);

    if (!response0.status === 200 || !response1.status === 200) {
      throw new Error("Failed to fetch consultant types data");
    }

    const consultantTypesData0 = response0.data;
    const consultantTypesData1 = response1.data;
    const consultantTypes = [...consultantTypesData0, ...consultantTypesData1];
    return consultantTypes;
  } catch (error) {
    return null;
  }
}

const projectTypesURL = "https://staging-api.expertplans.co.uk/projectTypes";

export async function fetchProjectTypes() {
  try {
    const response = await axios.get(projectTypesURL);

    if (!response.status === 200) {
      throw new Error("Failed to fetch consultant types data");
    }

    const projectTypesData = response.data;
    // sort the data array by id
    const orderedProjectTypes = projectTypesData.sort((a, b) => a.id - b.id);
    const projectTypes = [...orderedProjectTypes];

    return projectTypes;
  } catch (error) {
    return null;
  }
}

