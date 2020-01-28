import axios from 'axios'
import Nprogress from 'nprogress'

const apiClient = axios.create({
  baseURL: `http://localhost:3000`,
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

// Using axios interceptors to call the loading bar
// -> To prevent multiple api calls conflict we can create a 'loading.js' file and inside:
// ---> apiWaitingCount: How many API calls are waiting 
// ---> starLoading if apiWaitingCount is 0 -> Add 1 to apiWaitingCount and Nprogress.start()
// ---> doneLoading if apiWaitingCount is bigger than 0 -> Subtract 1 to apiWaitingCount and if apiWaitingCount is 0, Nprogress.done() 

// When any request is about to start we call the progress bar
/*apiClient.interceptors.request.use(config => {
  Nprogress.start();
  return config;
})*/

// When any response arrive we dismiss the progress bar
/*apiClient.interceptors.response.use(response => {
  Nprogress.done();
  return response;
})*/

export default {
  getEvents(perPage, page) {
    return apiClient.get('/events?_limit=' + perPage + '&_page=' + page)
  },
  getEvent(id) {
    return apiClient.get('/events/' + id)
  },
  postEvent(event) {
    return apiClient.post('/events', event)
  }
}
