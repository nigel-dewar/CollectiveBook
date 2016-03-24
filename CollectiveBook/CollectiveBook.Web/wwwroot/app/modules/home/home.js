(function () {
    angular
      .module('app')
      .controller('homeController', homeController);

    /**
     * The HomeController code.
     */
    function homeController($scope, $rootScope, $http, apiDataService, $q) {
    
        var vm = this;
        vm.isBusy = true;

        vm.post = {};

        vm.createPost = function (post) {
            post.personId = $rootScope.user.id;
            apiDataService.createPost(post).then(function (result) {
                vm.posts.unshift(result);
                vm.post = {};
            });  
        }

        $scope.deletePost = function (post) {
            console.log('the delete function ran');
            var index = vm.posts.indexOf(post);
            apiDataService.deletePost(post).then(function (result) {
                vm.posts.splice(index, 1);                      
            });
        }

        var upn = $rootScope.userInfo.profile.upn;
        var userPromise = apiDataService.getUser(upn);
        var postsPromise = apiDataService.getAllPosts();

        $q.all([userPromise, postsPromise])
            .then(getAllDataSuccess)
            .catch(getAllDataError)
            .finally(allCompleted);

        function getAllDataSuccess(dataArray) {
            $rootScope.user = dataArray[0].data[0];
            vm.posts = dataArray[1];
            $scope.userPic = $rootScope.user.profilePic;

            // get users individual wall -- not using (would do if turning into proper app)
            //apiDataService.getUserWall($rootScope.user.id).then(function (result) {
            //    vm.userposts = result; 
            //});
        }

        function getAllDataError(reason) {
            console.log(reason);
        }

        function allCompleted(notification) {
            vm.isBusy = false;
        }

        // Use if getting users info from Azure AD, and populating user in DB dynamically - not using -- //

        //var upn = $rootScope.userInfo.profile.upn;
        //// get user info - if none found then create in db - apply user to $rootScope
        //apiDataService.getUser(upn).then(function (result) {
        //    console.log('no user was found ' + JSON.stringify(result));
        //    // if no user in db found then create in db
        //    if (result.length == 0) {
        //        $rootScope.user = result;
        //        //var user = {};
        //        //user.upn = $rootScope.userInfo.profile.upn;
        //        //user.firstName = $rootScope.userInfo.profile.given_name;
        //        //user.lastName = $rootScope.userInfo.profile.family_name;

        //        //apiDataService.createUser(user).then(function (result) {
        //        //    $rootScope.user = result;
        //        //});
        //        console.log('no user was found ' + JSON.stringify(result));
        //    } else {
        //        // user found - add to $rootScope user
        //        console.log('user was found');
        //        $rootScope.user = result;
        //    }
        //    vm.isBusy = false;
        //});

        //$http.get("https://localhost:443022/api/users")
        // .then(function (response) {
         
        //     console.log(JSON.stringify(response));
        // }, function (error) {
     
        // });

    };
})();
