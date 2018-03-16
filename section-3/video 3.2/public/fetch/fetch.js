// var xhr = new XMLHttpRequest();
// xhr.open('GET', 'https://reqres.in/api/users/2');
// xhr.responseType = 'json';

// xhr.onload = function () {
//   console.log(xhr.response);
// };

// xhr.onerror = function () {
//   console.log('Error!');
// };

// xhr.send();

/*
$.ajax({
    url: "https://reqres.in/api/users/2",
    type: "POST",
    data: {
        name: "paul rudd",
        movies: ["I Love You Man", "Role Models"]
    },
    success: function(response){
        console.log(response);
    }
});
*/


// fetch('https://reqres.in/api/users/2')
//   .then(function (response) {
//     console.log(response);
//     return response.json();
//   })
//   .then(function (res) {
//     console.log(res);
//   })
//   .catch(function (e) {
//     console.error(e);
//   });

// fetch('https://reqres.in/api/users/2')
//   .then(function (response) {
//     // console.log(response);
//     return response.json();
//   })
//   .then(function (res) {
//     // console.log(res);
//     var firstName = document.getElementById('firstname');
//     var lastName = document.getElementById('lastname');
//     var avatar = document.getElementById('avatar');
//     firstName.innerHTML = res.data.first_name;
//     lastName.innerHTML = res.data.first_name;
//     avatar.src = res.data.avatar;
//   })
//   .catch(function (error) {
//     console.log('fetchError', error);
//   });

// fetch('./theme.html')
//   .then(function (response) {
//     return response.text();
//   })
//   .then(function (res) {
//     var el = document.getElementById('something');
//     el.innerHTML = res;
//   })
//   .catch(function (error) {
//     console.log('fetchError', error);
//   });


fetch('https://reqres.in/api/users', {
    method: 'post', //or PUT
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      name: 'Majid',
      job: 'Instructor'
    }),
    mode: 'cors',
    cache: 'default',
  })
  .then(function (response) {
    // console.log(response);
    return response.json();
  })
  .then(function (res) {
    console.log(res);
    var el = document.getElementById('something');
    el.innerHTML = res.name;
  })
  .catch(function (error) {
    console.log('fetchError', error);
  });

// You can define a mode for a fetch request such that only certain requests will resolve. The modes you can set are as follows:
// same-origin: only succeeds for requests for assets on the same origin, all other requests will reject.
// cors: will allow requests for assets on the same-origin and other origins which return the appropriate CORs headers.
// cors-with-forced-preflight: will always perform a preflight check before making the actual request.
// no-cors: is intended to make requests to other origins that do not have CORS headers and result in an opaque response, but as stated, this isn't possible in the window global scope at the moment.

// cache
// “default” means use the default behavior of browsers when downloading resources.  The browser first looks inside the HTTP cache to see if there is a matching request.  If there is, and it is fresh, it will be returned from fetch().  If it exists but is stale, a conditional request is made to the remote server and if the server indicates that the response has not changed, it will be read from the HTTP cache.  Otherwise it will be downloaded from the network, and the HTTP cache will be updated with the new response.
// “no-store” means bypass the HTTP cache completely.  This will make the browser not look into the HTTP cache on the way to the network, and never store the resulting response in the HTTP cache.  Using this cache mode, fetch() will behave as if no HTTP cache exists.
// “reload” means bypass the HTTP cache on the way to the network, but update it with the newly downloaded response.  This will cause the browser to never look inside the HTTP cache on the way to the network, but update the HTTP cache with the downloaded response. Future requests can use that updated response if appropriate.
// “no-cache” means always validate a response that is in the HTTP cache even if the browser thinks that it’s fresh.  This will cause the browser to look for a matching request in the HTTP cache on the way to the network.  If such a request is found, the browser always creates a conditional request to validate it even if it thinks that the response should be fresh.  If a matching cached entry is not found, a normal request will be made.  After a response has been downloaded, the HTTP cache will always be updated with that response.
// “force-cache” means that the browser will always use a cached response if a matching entry is found in the cache, ignoring the validity of the response.  Thus even if a really old version of the response is found in the cache, it will always be used without validation.  If a matching entry is not found in the cache, the browser will make a normal request, and will update the HTTP cache with the downloaded response.

