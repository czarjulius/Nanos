import express from 'express';
import ClientCampaignController from '../controllers/clientCampaignController';
import Validation from '../middlewares/validation'

const router = express.Router();

router.get('/client/:id', ClientCampaignController.get_client_details);
router.get('/campaign/:id', Validation.validateId, ClientCampaignController.get_campaign_details);
router.get('/campaign', ClientCampaignController.list_all_campaigns);
router.patch('/add_vat/:id', ClientCampaignController.update_Customer_vat);
router.get('/invoice/:id', ClientCampaignController.render_tax_invoice);

export default router; 