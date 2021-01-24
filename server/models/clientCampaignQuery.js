const getClientDetailsById = "SELECT * FROM clients WHERE id = $1";
const getCampaignDetailsById = "SELECT * FROM campaigns WHERE id = $1";
const fetchAllCampaigns = "SELECT * FROM campaigns";

export {
  getClientDetailsById,
  getCampaignDetailsById,
  fetchAllCampaigns
};
