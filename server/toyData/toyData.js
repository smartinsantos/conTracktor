var data = {};


data.admin = {
      first: 'Admin',
      last: 'Admin',
      email: 'admin@admin.com',
      password: '123456',
      token:'Katz!' 
};

data.propertie = {
     name: 'Red River',
     address: 'Adress of RedRiver',
     contacts: [{Len:'210 210 2100'}, {Jackeline: 'Yara Yara'}],
     description: 'This is a cool propertie' 

};

data.job = {

    propertie: 'Red River',
    unit: '725',
    description: 'This is a Job....',
    worker: 'worker@worker.com',
    date_assigned: Date(),
    date_completed: Date(),
    status: 'Completed',
    price: 10000,
    poNumber: 214245,
    invoiceNumber: 23423423,
    notes: 'This are notes for the job',
    quote: 'http://www.google.com' // Link to the quote PDF


};

data.worker = {

      first: 'Worker',
      last: 'Woker',
      email: 'worker@worker.com',
      password: '123456',
      phone: '210 210 2100',
      address: 'i live here, here, TX, 78111' 

};  

module.exports = data;
