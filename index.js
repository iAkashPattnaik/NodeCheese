const fastify = require('fastify')({ logger: false, });
const chalk = require('chalk');
const { join } = require('path');
const fs = require('fs');
const nodes = require('./src/nodes');
const users = require('./src/users');
const api = require('./app/api');

fastify.register(require('fastify-formbody'));
fastify.register(require('fastify-static'), {
  root: join(__dirname, 'app'),
  prefix: '/',
});
(async () => {
  await users.createTable();
  await nodes.createTable();
})();

// Index, HomePage
fastify.get('/', async (req, res) => {
  console.log(chalk.magentaBright(`[ Request ] GET "${chalk.green('/')}" IP "${chalk.green(req.ips || req.ip)}"`));
  res.header('Content-Type', 'text/html');
  return res.send(fs.createReadStream(join(__dirname, 'app', 'index.html'), 'utf8'));
});

// Auth, AuthenticatePage
fastify.get('/Auth', async (req, res) => {
  console.log(chalk.magentaBright(`[ Request ] GET "${chalk.green('/Auth')}" IP "${chalk.green(req.ips || req.ip)}"`));
  res.header('Content-Type', 'text/html');
  return res.send(fs.createReadStream(join(__dirname, 'app', 'auth.html'), 'utf8'));
});

// Profile, ProfilePage
fastify.get('/Profile', async (req, res) => {
  console.log(chalk.magentaBright(`[ Request ] GET "${chalk.green('/Profile')}" IP "${chalk.green(req.ips || req.ip)}"`));
  res.header('Content-Type', 'text/html');
  return res.send(fs.createReadStream(join(__dirname, 'app', 'profile.html'), 'utf8'));
});


// NodeScrapper, NodeScrapperPage
fastify.get('/NodeScrapper', async (req, res) => {
  console.log(chalk.magentaBright(`[ Request ] GET "${chalk.green('/NodeScrapper')}" IP "${chalk.green(req.ips || req.ip)}"`));
  res.header('Content-Type', 'text/html');
  return res.send(fs.createReadStream(join(__dirname, 'app', 'nodeScrapper.html'), 'utf8'));
});

// Login
fastify.post('/api/login', async (req, res) => {
  console.log(chalk.magentaBright(`[ Request ] POST "${chalk.green('/api/login')}" IP "${chalk.green(req.ips || req.ip)}"`));
  return api.login(req, res);
});

// SignUp
fastify.post('/api/signup', async (req, res) => {
  console.log(chalk.magentaBright(`[ Request ] POST "${chalk.green('/api/signup')}" IP "${chalk.green(req.ips || req.ip)}"`));
  return api.signup(req, res);
});

// Add Node
fastify.post('/api/AddNode', async (req, res) => {
  console.log(chalk.magentaBright(`[ Request ] POST "${chalk.green('/api/AddNode')}" IP "${chalk.green(req.ips || req.ip)}"`));
  return api.addNode(req, res);
});

// Add Node
fastify.post('/api/GetNode', async (req, res) => {
  console.log(chalk.magentaBright(`[ Request ] POST "${chalk.green('/api/getNode')}" IP "${chalk.green(req.ips || req.ip)}"`));
  return api.getNode(req, res);
});

// Account Info
fastify.post('/api/accountInfo', async (req, res) => {
  console.log(chalk.magentaBright(`[ Request ] POST "${chalk.green('/api/accountInfo')}" IP "${chalk.green(req.ips || req.ip)}"`));
  return api.accountInfo(req, res);
});

// Run the server !
const start = async () => {
  try {
    await fastify.listen(process.env.PORT || 3000, '0.0.0.0');
    console.log(chalk.magentaBright(`[ Info ] Server Started At ${chalk.green('http://localhost:')}${chalk.green(process.env.PORT || 3000)}`));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
start();