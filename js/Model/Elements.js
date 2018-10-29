window.Elements = (function() {
    'use strict';
    const Elements = function Elements() {
        this.$canvas = $('#my-canvas');
        this.ctx = this.$canvas.getContext('2d');
        this.$restartButton = $('#restart');
        this.$controlButtons = $('.controlButtons');
        this.$audioButton = document.createElement('img');
        this.$audioButton.setAttribute('src', './images/high-volume.png');
        this.$audioButton.setAttribute('class', 'icon');
        this.$controlButtons.appendChild(this.$audioButton);
        //this.$scoreHistory = $('.scoreHistory>ul');
    };
    return Elements;
})();