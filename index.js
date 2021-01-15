// require your server and start it
require('dotenv').config()
const server=require('./api/server')

const PORT=process.env.PORT || 4000

server.listen(PORT, () => {
    console.log('\n* Server Running on http://localhost:4000 *\n');
  });