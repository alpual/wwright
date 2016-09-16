
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
            var defaults = {};


            return {
                restrict: 'A',
                transclude: false,
                scope: {
                    /*psOpen: '=?',
                    psAutoClose: '@',
                    psSide: '@',
                    psSpeed: '@',
                    psClass: '@',
                    psSize: '@',
                    psZindex: '@',
                    psPush: '@',
                    psContainer: '@',
                    psKeyListener: '@',
                    psBodyClass: '@',
                    psClickOutside: '@',
                    onopen: '=?',
                    onclose: '=?'*/
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
                        var theChildren = el[0].children;
                        for(var i = 1; i < theChildren.length; i++) {
                            var theChild = theChildren[i];
                            theChild.className = "hidden";

                        }                            
                    }
                    /*var content, slider, body;

                    if (param.container) {
                        body = document.getElementById(param.container);
                    } else {
                        body = document.body;
                    }*/

                    /*
                    function setBodyClass(value){
                        if (param.bodyClass) {
                            var bodyClass = param.className + '-body';
                            var bodyClassRe = new RegExp(' ' + bodyClass + '-closed| ' + bodyClass + '-open');
                            body.className = body.className.replace(bodyClassRe, '');
                            body.className += ' ' + bodyClass + '-' + value;
                        }
                    }

                    setBodyClass('closed');

                    slider = el[0];

                    if (slider.tagName.toLowerCase() !== 'div' &&
                        slider.tagName.toLowerCase() !== 'pageslide') {
                        throw new Error('Pageslide can only be applied to <div> or <pageslide> elements');
                    }

                    if (slider.children.length === 0) {
                        throw new Error('You need to have content inside the <pageslide>');
                    }

                    content = angular.element(slider.children);

                    body.appendChild(slider);

                    slider.style.zIndex = param.zindex;
                    slider.style.position = 'fixed';
                    slider.style.transitionDuration = param.speed + 's';
                    slider.style.webkitTransitionDuration = param.speed + 's';
                    slider.style.height = param.size;
                    slider.style.transitionProperty = 'top, bottom, left, right';

                    if (param.push) {
                        body.style.position = 'absolute';
                        body.style.transitionDuration = param.speed + 's';
                        body.style.webkitTransitionDuration = param.speed + 's';
                        body.style.transitionProperty = 'top, bottom, left, right';
                    }

                    if (param.container) {
                        slider.style.position = 'absolute';
                        body.style.position = 'relative';
                        body.style.overflow = 'hidden';
                    }

                    function onTransitionEnd() {
                        if ($scope.psOpen) {
                            if (typeof $scope.onopen === 'function') {
                                $scope.onopen();
                            }
                        } else {
                            if (typeof $scope.onclose === 'function') {
                                $scope.onclose();
                            }
                        }
                    }

                    slider.addEventListener('transitionend', onTransitionEnd);

                    initSlider();

                    function initSlider() {
                        switch (param.side) {
                            case 'right':
                                slider.style.width = param.size;
                                slider.style.height = '100%';
                                slider.style.top = '0px';
                                slider.style.bottom = '0px';
                                slider.style.right = '0px';
                                break;
                            case 'left':
                                slider.style.width = param.size;
                                slider.style.height = '100%';
                                slider.style.top = '0px';
                                slider.style.bottom = '0px';
                                slider.style.left = '0px';
                                break;
                            case 'top':
                                slider.style.height = param.size;
                                slider.style.width = '100%';
                                slider.style.left = '0px';
                                slider.style.top = '0px';
                                slider.style.right = '0px';
                                break;
                            case 'bottom':
                                slider.style.height = param.size;
                                slider.style.width = '100%';
                                slider.style.bottom = '0px';
                                slider.style.left = '0px';
                                slider.style.right = '0px';
                                break;
                        }
                    }

                    function psClose(slider, param) {
                        switch (param.side) {
                            case 'right':
                                slider.style.right = "-" + param.size;
                                if (param.push) {
                                    body.style.right = '0px';
                                    body.style.left = '0px';
                                }
                                break;
                            case 'left':
                                slider.style.left = "-" + param.size;
                                if (param.push) {
                                    body.style.left = '0px';
                                    body.style.right = '0px';
                                }
                                break;
                            case 'top':
                                slider.style.top = "-" + param.size;
                                if (param.push) {
                                    body.style.top = '0px';
                                    body.style.bottom = '0px';
                                }
                                break;
                            case 'bottom':
                                slider.style.bottom = "-" + param.size;
                                if (param.push) {
                                    body.style.bottom = '0px';
                                    body.style.top = '0px';
                                }
                                break;
                        }

                        if (param.keyListener) {
                            $document.off('keydown', handleKeyDown);
                        }

                        if (param.clickOutside) {
                            $document.off('touchend click', onBodyClick);
                        }
                        isOpen = false;
                        setBodyClass('closed');
                        $scope.psOpen = false;
                    }

                    function psOpen(slider, param) {
                        switch (param.side) {
                            case 'right':
                                slider.style.right = "0px";
                                if (param.push) {
                                    body.style.right = param.size;
                                    body.style.left = '-' + param.size;
                                }
                                break;
                            case 'left':
                                slider.style.left = "0px";
                                if (param.push) {
                                    body.style.left = param.size;
                                    body.style.right = '-' + param.size;
                                }
                                break;
                            case 'top':
                                slider.style.top = "0px";
                                if (param.push) {
                                    body.style.top = param.size;
                                    body.style.bottom = '-' + param.size;
                                }
                                break;
                            case 'bottom':
                                slider.style.bottom = "0px";
                                if (param.push) {
                                    body.style.bottom = param.size;
                                    body.style.top = '-' + param.size;
                                }
                                break;
                        }

                        $scope.psOpen = true;

                        if (param.keyListener) {
                            $document.on('keydown', handleKeyDown);
                        }

                        if (param.clickOutside) {
                            $document.on('touchend click', onBodyClick);
                        }
                        setBodyClass('open');
                    }

                    function handleKeyDown(e) {
                        var ESC_KEY = 27;
                        var key = e.keyCode || e.which;

                        if (key === ESC_KEY) {
                            psClose(slider, param);

                            // FIXME check with tests
                            // http://stackoverflow.com/questions/12729122/angularjs-prevent-error-digest-already-in-progress-when-calling-scope-apply

                            $timeout(function () {
                                $scope.$apply();
                            });
                        }
                    }


                    // Watchers

                    $scope.$watch('psOpen', function(value) {
                        if (!!value) {
                            psOpen(slider, param);
                        } else {
                            psClose(slider, param);
                        }
                    });

                    $scope.$watch('psSize', function(newValue, oldValue) {
                        if (oldValue !== newValue) {
                            param.size = newValue;
                            initSlider();
                        }
                    });


                    // Events

                    $scope.$on('$destroy', function () {
                        if (slider.parentNode === body) {
                            if (param.clickOutside) {
                                $document.off('touchend click', onBodyClick);
                            }
                            body.removeChild(slider);
                        }

                        slider.removeEventListener('transitionend', onTransitionEnd);
                    });

                    if ($scope.psAutoClose) {
                        $scope.$on('$locationChangeStart', function() {
                            psClose(slider, param);
                        });
                        $scope.$on('$stateChangeStart', function() {
                            psClose(slider, param);
                        });
                    }
                    /**/
                }
            };
        }]);
}));
