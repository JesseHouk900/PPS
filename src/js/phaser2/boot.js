var boot = {
    preload: function() {
        game.load.image('loading_border', 'assets/images/loading_border.png')
        game.load.image('loading', 'assets/images/loading_interior.png')

    },
    create: function() {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL

        if (this.isDeviceMobile()) {
            console.log(this.isDeviceMobile());
            this.scale.minWidth = window.outerWidth;
            this.scale.minHeight = window.outerHeight;
            this.scale.maxWidth = window.outerWidth;
            this.scale.maxHeight = window.outerHeight;
            
        }
        else {
            this.scale.minWidth = 750;
            this.scale.minHeight = 422;
            this.scale.maxWidth = 750;
            this.scale.maxHeight = 422;
        }

        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.setScreenSize = true;
        game.state.start('preload');
    },
    isDeviceMobile: function() {
        var isMobile = {
            Android: function() {
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function() {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function() {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function() {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function() {
                return navigator.userAgent.match(/IEMobile/i);
            },
            any: function() {
                return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
            }
            
        }
        return isMobile.any()
    }

}