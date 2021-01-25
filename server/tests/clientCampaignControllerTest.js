import { expect } from 'chai';
import { describe } from 'mocha';
import supertest from 'supertest';
import server from '../../server';

const api = supertest(server);

  
  describe('get_client_details Test', () => {
    it('should fetch a single client details successfully', (done) => {
        api.get(`/api/v1/client/1`)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.message).to.equal('Client fetched successfully');
            expect(res.body.data.stripe_customer_id).to.equal('cus_IokscW9UPbH3xm');
            done();
          });
      });
    it('should fail to fetch client details ', (done) => {
        api.get(`/api/v1/client/12`)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal('Client not found');
            done();
          });
      });
  });

  describe('get_campaign_details Test', () => {
    it('should fetch a single campaign details successfully', (done) => {
        api.get(`/api/v1/campaign/1`)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.message).to.equal("Campaign fetched successfully");
            expect(res.body.data.name).to.equal('Campaign_one');
            done();
          });
      });
    it('should fail to fetch campaign details ', (done) => {
        api.get(`/api/v1/campaign/12`)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal('Campaign not found');
            done();
          });
      });
  });
  describe('list_all_campaigns Test', () => {
    it('should fetch all campaigns successfully', (done) => {
        api.get(`/api/v1/campaigns`)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            done();
          });
      });
  });
