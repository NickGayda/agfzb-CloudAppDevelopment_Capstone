function main(params) {
    return new Promise(function (resolve, reject) {
      const { CloudantV1 } = require("@ibm-cloud/cloudant");
      const { IamAuthenticator } = require("ibm-cloud-sdk-core");
      const authenticator = new IamAuthenticator({
        apikey: "7nvyP4NGtMesmKiyqZDYLVZqfKkdriE-8kA28WAhjxyl",
      });
      const cloudant = CloudantV1.newInstance({
        authenticator: authenticator,
      });
      cloudant.setServiceUrl("https://eb1985c7-5a17-475e-afef-52a29c1d6ba0-bluemix.cloudantnosqldb.appdomain.cloud");
      // add id to review
      doc = params.review;
      doc.id = Math.floor(Math.random() * 100);
      cloudant
        .postDocument({
          db: "reviews",
          document: doc,
        })
        .then((result) => {
          let code = 201;
          resolve({
            statusCode: code,
            headers: { "Content-Type": "application/json" },
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }