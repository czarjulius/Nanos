import express from 'express';
import ClientCampaignController from '../controllers/clientCampaignController';

const router = express.Router();

router.get('/client/:id', ClientCampaignController.get_client_details);
router.get('/campaign/:id', ClientCampaignController.get_campaign_details);
router.get('/campaign', ClientCampaignController.list_all_campaigns);

export default router; 