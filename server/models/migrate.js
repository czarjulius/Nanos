import pool from './db';

const tableQuery = async () => {
  try {
    const dropClientTable = await pool.query('DROP TABLE IF EXISTS clients CASCADE;');
    const dropCampaignsTable = await pool.query('DROP TABLE IF EXISTS campaigns CASCADE;');
    const dropCampaignTable = await pool.query('DROP TABLE IF EXISTS campaign CASCADE;');

    const clientTable = await pool.query(`CREATE TABLE IF NOT EXISTS clients(
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) UNIQUE NOT NULL,
      country VARCHAR(50),
      vat_number VARCHAR(50),
      stripe_customer_id VARCHAR(50),
      registeredOn DATE DEFAULT CURRENT_TIMESTAMP )`);

    const campaignTable = await pool.query(`CREATE TABLE IF NOT EXISTS campaigns(
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) UNIQUE NOT NULL,
      client_id VARCHAR(50),
      stripe_charge_id VARCHAR(50),
      registeredOn DATE DEFAULT CURRENT_TIMESTAMP )`);

    const clientValues = ['Julius Ngwu','switzerland','CHE-4534800-TEST','cus_IokscW9UPbH3xm'];
    const clientQuery = await pool.query('INSERT into clients( name,country,vat_number,stripe_customer_id)VALUES($1,$2,$3,$4)', clientValues);
    
    const campaignValues = ['Campaign_one',1,'ch_1ICzI62eZvKYlo2C7JMiZ5fG'];
    const campaignQuery = await pool.query('INSERT into campaigns( name,client_id,stripe_charge_id)VALUES($1,$2,$3)', campaignValues);
        
    console.log('All Tables Created Successfully');
  } catch (err) {
    console.log(err.stack);
    return err.stack;
  }
};

tableQuery();