var app = angular.module('IndexApp', []);
app.controller('IndexCtrl', function ($scope) {

    $scope.PictureList = [
        { src: 'https://banner.9splay.com/Global/SHOP/BANNER/20191015142212.png' },
        { src: 'https://banner.9splay.com/Global/SHOP/BANNER/20190920155337.jpg' }
    ];
    $scope.ItemList = [
        1,2,3,4
    ];
});