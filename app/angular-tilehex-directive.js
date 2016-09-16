
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['angular'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('angular'));
    } else {
        factory(root.angular);
    }
}(this, function (angular) {

    angular
        .module('tilehex-directive', [])
        .directive('tilehex', ['$document', '$timeout', function ($document, $timeout) {

            return {
                restrict: 'A',
                transclude: false,
                scope: {
                    cardinality: '@',
                    defaultSrc: '@',
                    hoverSrc: '@',
                    hexSize: '@', 
                    hexClass: '@'

                },
                link: function ($scope, el, attrs) {

                    var param = {};

                    param.hexSize = $scope.hexSize || 'medium';
                    param.cardinality = $scope.cardinality || 'false';
                    param.defaultSrc = $scope.defaultSrc || 'false'; // if we want an alternate image when off hover
                    param.hoverSrc = $scope.hoverSrc || 'false';
                    param.className = $scope.hexClass || 'tilehex';
                    
                    el.addClass(param.className);
                    el.addClass('hex');
                    el.addClass(param.hexSize);

                    console.log(el);
                    /* DOM manipulation */

                    if(param.cardinality) {

                        el.addClass(param.cardinality + "Hex"); // class northHex, eastHex etc...
                    }
                    if (param.hoverSrc != 'false'){
                        param.theSrc = el[0].children[0].src;
                        console.log(param.theSrc)
                        el.bind('mouseover', function(){
                            el[0].children[0].src = param.hoverSrc;
                        });

                        if (param.defaultSrc != 'false') {
                            el.bind('mouseout', function(){
                                el[0].children[0].src = param.defaultSrc;       
                            });
                        } else{
                            el.bind('mouseout', function(){
                                el[0].children[0].src = param.theSrc;       
                            });
                        }
                    }
                    if (el[0].children.length > 1)
                    {
                        var childList = [el[0].children[0]];
                        var theChildren = el[0].children;
                        for(var i = 1; i < theChildren.length; i++) {
                            var theChild = theChildren[i];
                            theChild.className = "hidden";
                            childList.push(theChild);
                        }  
                        setInterval(function(){ return rotate(childList); }, 3 * 1000)                          
                    }
                    var childId = 0;
                    function rotate(childList){
                        console.log(childList)
                        el[0].children[childId].className = "visuallyhidden";
                        /*setTimeout(function(){
                            el[0].children[childId].className = "hidden";
                        }, 300);*/
                        childId ++;
                        if (childId == childList.length)
                            childId = 0;
                        setTimeout(function(){
                            el[0].children[childId].className = "visible";
                        }, 300);
                   }

                   
                }
            };
        }]);
}));
