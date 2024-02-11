// @ts-check
 const {devices} = require("@playwright/test");



 const config = {
    testDir: './tests',
    /* Run tests in files in parallel */
    timeout : 30 * 1000, 
    expect : {
    timeout : 5000
    },

    reporter : "html",
  
    use: {
    
      browserName : "chromium",
      headless : false,
      screenshot : "on",
      trace: "on"

    },

};

  module.exports = config;

