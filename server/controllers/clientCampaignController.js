import dotenv from "dotenv";
import db from "../models/db";
import {
  getClientDetailsById,
  getCampaignDetailsById,
  fetchAllCampaigns
} from "../models/clientCampaignQuery";
import {CLIENTS} from '../services/dummy_clients'
import {CHARGES} from '../services/dummy_charge'
import Calculation from '../services/calculate'

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
          name: rows[0].name
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
  static async update_Customer_vat(req, res) {
    try {
      const { id } = req.params;

      const { rows } = await db.query(getClientDetailsById, [id]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: "Customer not found"
        });
      }

     let currentClient = CLIENTS[rows[0].stripe_customer_id]
     currentClient['tax_ids'] = rows[0].vat_number
     currentClient['tax_exempt'] = 'none'

     if (currentClient['company'] === 'nanos' && currentClient['address'] !== 'switzerland') {
      currentClient['tax_exempt'] = 'exempt'
     }

      res.status(200).json({
        status: 200,
        message: "Customer VAT updated successfully",
        data: currentClient
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.message
      });
    }

  }

  static async render_tax_invoice(req, res) {
    try {
      const { id } = req.params;

      const { rows } = await db.query(getCampaignDetailsById, [id]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: "Campaign not found"
        });
      }

      const client = await db.query(getClientDetailsById, [rows[0].client_id]);
      const chargeAmount = CHARGES[rows[0].stripe_charge_id]
      const clientStripeDetails = CLIENTS[client.rows[0].stripe_customer_id]

      const VAT = Calculation.calc_vat_amount(chargeAmount.amount)

      const NET = Calculation.calc_net_amount(chargeAmount.amount, VAT)


      res.status(200).json({
        status: 200,
        message: "Invoice generated successfully",
        data: {
          ad_campaign_id: rows[0].id,
          client_name: client.rows[0].name,
          email: clientStripeDetails.email,
          address: clientStripeDetails.country,
          campaign_name: rows[0].name,
          invoice_currency: clientStripeDetails.currency,
          invoice_amount: chargeAmount.amount,
          vat_amount: VAT,
          net_amount: NET,
        }
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
