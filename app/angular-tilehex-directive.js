
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
                    hexClass: '@',
                    rotateTime: '@',
                    screenSize: '@'

                },
                link: function ($scope, el, attrs) {

                    var param = {};

                    param.hexSize = $scope.hexSize || 'medium';
                    param.cardinality = $scope.cardinality || 'false';
                    param.defaultSrc = $scope.defaultSrc || 'false'; // if we want an alternate image when off hover
                    param.hoverSrc = $scope.hoverSrc || 'false';
                    param.className = $scope.hexClass || 'tilehex';
                    param.rotateTime = $scope.rotateTime || 3000;
                    param.screenSize = $scope.screenSize || 'all'; // format "min-width x" "max-width x" or "all"
                    
                    el.addClass(param.className);
                    el.addClass('hex');
                    el.addClass(param.hexSize);

                    console.log(el);
                    /* DOM manipulation */
                    /* 
                     * Check to see if the hex should be displayed at the current screen size.
                     * uses parameter screenSize. Skip this if size is set to 'all'.
                     */
                     /*if (param.screenSize != 'all'){
                        if( param.screenSize.indexOf('min-width') >= 0) {
                            /* set minimum screen size */
                            /*var minWidth = param.screenSize.split(' ')[1];
                            var currentWidth = window.innerWidth;
                            console.log ("current width: " + currentWidth + ", min-width set to " + minWidth);
                            if(currentWidth < minWidth){
                                el.addClass("hidden");
                                el.addClass("gone");
                            }
                            angular.element(window).bind('resize', function () {
                                var minWidth = param.screenSize.split(' ')[1];
                                var currentWidth = window.innerWidth;
                                console.log(window.innerWidth);
                                if(currentWidth < minWidth){
                                    el.addClass("hidden");
                                    el.addClass("gone");
                                } else {

                                    el.removeClass("hidden");
                                    el.removeClass("gone");
                                }
                            });
                        }
                        if( param.screenSize.indexOf('max-width') >= 0) {
                            /* set maximum screen size */
                        /*}
                     }*/

                    /*
                     * Add Cardinality class if given.
                     * north, south, east and west are valid
                     * sets the cardinality as a class so that applicable css styles apply
                     * styles visible in hex.scss
                     */
                    if(param.cardinality) {

                        el.addClass(param.cardinality + "Hex"); // class northHex, eastHex etc...
                    }
                    /* 
                     * add hover source for image to display on hover.
                     * note that hover is not supported for hex galleries
                     * of rotating images.
                     */
                    if (param.hoverSrc != 'false'){
                        /* If we were given an image source for hover */
                        param.theSrc = el[0].children[0].src;
                        console.log(param.theSrc)
                        el.bind('mouseover', function(){
                            el[0].children[0].src = param.hoverSrc; /* set the image source on mouseover */
                        });

                        if (param.defaultSrc != 'false') { /* if a default source was set, it will revert to the default after the first hover */
                            el.bind('mouseout', function(){
                                el[0].children[0].src = param.defaultSrc;       
                            });
                        } else{ /* if no default was set, use whatever is the source of the first child, which should be an image */
                            el.bind('mouseout', function(){
                                el[0].children[0].src = param.theSrc;       
                            });
                        }
                    }
                    /*
                     * Add gallery functionality for multiple hex images fading in and out.
                     * uses parameter rotateTime if set.  Default 3000ms
                     */
                    if (el[0].children.length > 1) /* if we have multiple images as children within the tileHex */
                    {
                        var childList = [el[0].children[0]];
                        var theChildren = el[0].children;
                        for(var i = 1; i < theChildren.length; i++) { /* hide everybody but the first child , index 0, which remains visible */
                            var theChild = theChildren[i];
                            theChild.className = "hidden";
                            childList.push(theChild); // add the new children to the childList
                        }  
                        setInterval(function(){ return rotate(childList); }, param.rotateTime); // switch images periodically.                          
                    }
                    var childId = 0;
                    function rotate(childList){
                        //console.log(childList);
                        //console.log(param.rotateTime);
                        el[0].children[childId].className = "opacityZ"; //opacity zero
                        var prevChildId = childId;
                        childId ++;
                        if (childId == childList.length)
                            childId = 0;
                        /* Now we have the next child and the previous child */
                        setTimeout(function(){
                            el[0].children[prevChildId].className = "gone"; // opacity and height 0
                            el[0].children[childId].className = "opacityA"; // opacity 1
                        }, 180);
                   }

                   
                }
            };
        }]);
}));
