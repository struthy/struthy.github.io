import axios from "axios";
const callPath = `https://balfourmanson.master.d8digital.com//umbraco/api/NewsAndEventsApi/getall`;

let newsService = async () => {
  let response = await axios.get(callPath);

  return response.data;
};

export { newsService };
