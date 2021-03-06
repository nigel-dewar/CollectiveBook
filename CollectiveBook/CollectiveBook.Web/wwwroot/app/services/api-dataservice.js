(function () {
    'use strict';

angular.module('app')
        .factory('apiDataService', data);

data.$inject = ['$http', '$q', 'constantService'];


function data($http, $q, constantService) {

    var testmode = constantService.testMode;

    var appUrl = constantService.appUrl;

    return {
        getUserWall: getUserWall,
        getAllPosts: getAllPosts,
        createPost: createPost,
        deletePost: deletePost,
        createReply: createReply,
        deleteReply: deleteReply,
        getUser: getUser,
        createUser: createUser,     
        getAllStaff: getAllStaff,
        getStaffMember: getStaffMember
    };

    // use if wanting to get all posts from a specific user
    function getUserWall(id) {

        var dfd = $q.defer();

        var query = "?$filter=PersonId eq " + id + "&$orderby=Created desc";
        var endpoint = appUrl + "api/posts/" + query;

        $http.get(endpoint)
          .then(function (response) {
              dfd.resolve(response.data);
          }, function (error) {
              dfd.reject("failed to users posts");
          });

        return dfd.promise;
    } 

    // post functions
    function getAllPosts() {

        var dfd = $q.defer();
        var query = "?$orderby=Created asc";
        var endpoint = appUrl + "api/posts/";

        $http.get(endpoint)
          .then(function (response) {
              dfd.resolve(response.data);
          }, function (error) {
              dfd.reject("failed to get all posts");
          });

        return dfd.promise;
    } 

    function createPost(item) {

        var dfd = $q.defer();
        var endpoint = appUrl + "api/posts";

        $http.post(endpoint, item)
          .then(function (response) {
              dfd.resolve(response.data);
          }, function (error) {
              dfd.reject("failed to create post");
          });

        return dfd.promise;
    }

    function deletePost(item) {

        var dfd = $q.defer();
        var endpoint = appUrl + "api/posts/" + item.id;

        $http.delete(endpoint)
          .then(function (response) {
              dfd.resolve(response.data);
          }, function (error) {
              dfd.reject("failed to delete post");
          });

        return dfd.promise;
    }

    // reply functions
    function createReply(item) {

        var dfd = $q.defer();
        var endpoint = appUrl + "api/replies";

        $http.post(endpoint, item)
          .then(function (response) {
              dfd.resolve(response.data);
          }, function (error) {
              dfd.reject("failed to create reply");
          });

        return dfd.promise;
    }

    function deleteReply(item) {

        var dfd = $q.defer();
        var endpoint = appUrl + "api/replies/" + item.id;

        $http.delete(endpoint)
          .then(function (response) {
              dfd.resolve(response.data);
          }, function (error) {
              dfd.reject("failed to delete reply");
          });

        return dfd.promise;
    }
 
    // gets user from DB
    function getUser(upn) {
  
        var dfd = $q.defer();

        var query = "?$filter=Upn eq '" + upn + "'";
        var endpoint = appUrl + "api/users" + query;

        $http.get(endpoint)
          .then(function (response) {
              dfd.resolve(response);   
          }, function (error) {
              dfd.reject("failed to get user from db");
          });

        return dfd.promise;
    } 

    // use if wanting to create a user in DB 
    function createUser(user) {

        var dfd = $q.defer();

        var endpoint = appUrl + "api/users/";

        $http.post(endpoint, user)
          .then(function (response) {
              dfd.resolve(response);
          }, function (error) {
              dfd.reject("failed to create user");
          });

        return dfd.promise;
    } 
    
    // use if wanting to perform searches accross all staff in Azure AD
    function getAllStaff(term) {

         var term = encodeURI(term);

         var dfd = $q.defer();

         var query = "?$filter=startswith(givenName, '" + term + "') or startswith(surname, '" + term + "')&$top=300";

         var endpoint = "https://graph.microsoft.com/beta/users" + query;

         $http.get(endpoint)
           .then(function (response) {
               dfd.resolve(response.data.value);
           }, function (error) {
               dfd.reject("failed to read task");
           });

         return dfd.promise;

     }
    
    // user if wanting to get all info about individual user from Azure AD
    function getStaffMember(name) {

         //var term = encodeURI(name);

         var dfd = $q.defer();

         var query = "?$filter=userPrincipalName eq '" + name + "'";

         var endpoint = "https://graph.microsoft.com/beta/users" + query;

         $http.get(endpoint)
           .then(function (response) {
               dfd.resolve(response.data.value);
           }, function (error) {
               dfd.reject("failed to return staff member info");
           });

         return dfd.promise;

     }

    }

})();