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
          if (params.state) {
        // return dealership with this state
        cloudant
          .postFind({ db: "dealerships", selector: { state: params.state } })
          .then((result) => {
            let code = 200;
            if (result.result.docs.length == 0) {
              code = 404;
            }
            resolve({
              statusCode: code,
              headers: { "Content-Type": "application/json" },
              body: result.result.docs,
            });
          })
          .catch((err) => {
            reject(err);
          });
      } else if (params.dealerId) {
        id = parseInt(params.dealerId);
        // return dealership with this id
        cloudant
          .postFind({
            db: "dealerships",
            selector: {
              id: parseInt(params.dealerId),
            },
          })
          .then((result) => {
            let code = 200;
            if (result.result.docs.length == 0) {
              code = 404;
            }
            resolve({
              statusCode: code,
              headers: { "Content-Type": "application/json" },
              body: result.result.docs,
            });
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        // return all documents
        cloudant
          .postAllDocs({ db: "dealerships", includeDocs: true })
          .then((result) => {
            let code = 200;
            if (result.result.rows.length == 0) {
              code = 404;
            }
            resolve({
              statusCode: code,
              headers: { "Content-Type": "application/json" },
              body: result.result.rows,
            });
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  }