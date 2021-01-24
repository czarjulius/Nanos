/* eslint-disable consistent-return */
import pool from './db';

const tableQuery = async () => {
  try {
    const dropClientTable = await pool.query('DROP TABLE IF EXISTS clients CASCADE;');
    const dropCampaignTable = await pool.query('DROP TABLE IF EXISTS campaign CASCADE;');

    const clientTable = await pool.query(`CREATE TABLE IF NOT EXISTS clients(
      id SERIAL PRIMARY KEY,
      name VARCHAR(10) UNIQUE NOT NULL,
      country VARCHAR(50),
      vat_number VARCHAR(50),
      stripe_customer_id VARCHAR(50),
      registeredOn DATE DEFAULT CURRENT_TIMESTAMP )`);

    const campaignTable = await pool.query(`CREATE TABLE IF NOT EXISTS campaign(
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) UNIQUE NOT NULL,
      client_id INTEGER,
      stripe_charge_id INTEGER,
      registeredOn DATE DEFAULT CURRENT_TIMESTAMP )`);

    const clientValues = ['Julius Ngwu','Nigeria','CHE-4534800-TEST',1245];
    const clientQuery = await pool.query('INSERT into clients( name,country,vat_number,isadmin,stripe_customer_id)VALUES($1,$2,$3,$4', clientValues);
    
    const campaignValues = ['Rock Music',1,'ST-4534800-TEST'];
    const campaignQuery = await pool.query('INSERT into campaign( name,client_id,stripe_charge_id)VALUES($1,$2,$3', campaignValues);
        
    console.log('All Tables Created Successfully');
  } catch (err) {
    console.log(err.stack);
    return err.stack;
  }
};

tableQuery();