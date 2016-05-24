'use strict';

$(document).ready(function () {
    $('.small img').click(function () {
        $('.inner img').attr('src' ,this.src)
    });
});