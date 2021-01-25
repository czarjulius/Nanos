import express from 'express';
import ClientCampaignController from '../controllers/clientCampaignController';

const router = express.Router();

router.get('/client/:id', ClientCampaignController.get_client_details);
router.get('/campaign/:id', ClientCampaignController.get_campaign_details);
router.get('/campaigns', ClientCampaignController.list_all_campaigns);
router.patch('/add_vat/:id', ClientCampaignController.update_Customer_vat);
router.get('/invoice/:id', ClientCampaignController.render_tax_invoice);

export default router; 