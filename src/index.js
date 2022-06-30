import 'dotenv/config';
import Realm from 'realm-web';
import axios from 'axios';

// Realm setup
const app = new Realm.App({
  id: process.env.APP_ID,
});
const credentials = Realm.Credentials.anonymous();
const user = await app.logIn(credentials);
console.assert(user.id === app.currentUser.id);

// Endpoint setup
const endpoint =
  'https://ap-southeast-2.aws.realm.mongodb.com/api/client/v2.0/app/qa-mwchg/graphql';
const token = user.accessToken;

const headers = {
  Authorization: `Bearer ${token}`,
};

const query = {
  operationName: '',
  query: `query {
    qandAS {
      _id
      content {
        title
        description
        comments
      }
    }
  }`,
  variables: {},
};

const options = {
  method: 'POST',
  headers: headers,
  body: JSON.stringify(query),
};

//Requesting from the API and sending response 
(async function fetchData() {
  try {
    const response = await axios({
      url: endpoint,
      method: 'POST',
      headers: headers,
      data: query,
    });
    console.log(response.data.data.qandAS);
  } catch (err) {
    console.error(err);
  }
})();
