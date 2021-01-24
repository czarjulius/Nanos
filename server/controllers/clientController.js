import dotenv from "dotenv";
import db from "../models/db";
import {
  getClientDetailsById
} from "../models/clientQuery";


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
          id: result.rows[0].id,
          name: result.rows[0].name,
          country: result.rows[0].country,
          vat_number: result.rows[0].vat_number,
          stripe_customer_id: result.rows[0].stripe_customer_id,
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
