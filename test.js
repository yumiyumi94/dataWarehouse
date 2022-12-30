const bcrypt = require('bcryptjs');

const main = async () =>{
    const hash = await bcrypt.hash('acamica123', 10);
    console.log('HASH: ', hash);
};

main();