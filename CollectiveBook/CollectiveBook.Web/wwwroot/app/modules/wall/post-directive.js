(function() {
    'use strict';

    angular
        .module('app')
        .directive('postDirective', function(){
        
            return {
                templateUrl: "app/modules/wall/post-directive.html",
                restrict: "EA",
                scope: {
                    post: '=',
                    deletePost: '&'
                    //userInfo: "@"
                },
                controller: function ($scope, apiDataService, $q, $rootScope) {


                    $scope.reply = {};

                    // create reply
                    $scope.createReply = function (reply) {

                        var item = {};
                        item.replyContent = reply.replyContent;
                        item.personId = $rootScope.user.id;
                        item.postId = $scope.post.id;

                        apiDataService.createReply(item).then(function (result) {
                            $scope.post.replies.push(result);
                            $scope.reply = {};
                        });
                    };

                    // delete reply
                    $scope.deleteReply = function (reply) {
                        var index = $scope.post.replies.indexOf(reply);
                        apiDataService.deleteReply(reply).then(function (result) {
                            $scope.post.replies.splice(index, 1);                      
                        });
                    }
                    //+ $scope.post.creator.profilePic;
                    $scope.userPic = function () {
                        
                        return "images/" + $scope.post.creator.profilePic;
                    }
                    //$scope.userPic = "images/"+ $scope.post.creator.profilePic;
                }
            }
        
        });

})();