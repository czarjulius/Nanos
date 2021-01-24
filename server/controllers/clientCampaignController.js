import dotenv from "dotenv";
import db from "../models/db";
import {
  getClientDetailsById,
  getCampaignDetailsById,
  fetchAllCampaigns
} from "../models/clientCampaignQuery";

dotenv.config();

class Client {
  static async get_client_details(req, res) {
    try {
      const { id } = req.params;

      const { rows } = await db.query(getClientDetailsById, [id]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: "Client not found"
        });
      }

      res.status(200).json({
        status: 200,
        message: "Client fetched successfully",
        data: {
          id: rows[0].id,
          name: rows[0].name,
          country: rows[0].country,
          vat_number: rows[0].vat_number,
          stripe_customer_id: rows[0].stripe_customer_id,
        }
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.message
      });
    }
  }
  static async get_campaign_details(req, res) {
    try {
      const { id } = req.params;

      const { rows } = await db.query(getCampaignDetailsById, [id]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: "Campaign not found"
        });
      }

      res.status(200).json({
        status: 200,
        message: "Campaign fetched successfully",
        data: {
          id: rows[0].id,
          name: rows[0].name,
          country: rows[0].client_id,
          vat_number: rows[0].stripe_charge_id,
        }
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.message
      });
    }
  }
  static async list_all_campaigns(req, res) {
    try {

      const { rows } = await db.query(fetchAllCampaigns);
      if (!rows) {
        return res.status(404).json({
          status: 404,
          error: "Campaigns not created yet!"
        });
      }

      res.status(200).json({
        status: 200,
        message: "Campaign fetched successfully",
        data: rows
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.message
      });
    }
  }

}

export default Client;
