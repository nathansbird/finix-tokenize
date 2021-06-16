const { default: fetch } = require("node-fetch");

class Finix {
  constructor(applicationId, host){
    this.applicationId = applicationId;
    this.host = host;
  }

  tokenize = async (name, number, expiration_month, expiration_year, security_code) => {
    return (await fetch(`https://${this.host || 'finix.sandbox-payments-api.com'}/applications/${this.applicationId}/tokens`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'PAYMENT_CARD',
        number,
        security_code,
        expiration_month,
        expiration_year,
        name
      })
    })).json();
  }
}

module.exports = (env, applicationId) => new Finix(env, applicationId)