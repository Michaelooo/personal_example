(function ($) {

    /**
     * 图片的预加载方法，包括有序加载以及无序加载
     * 
     * @param {String,Array} img 图片url数组
     * @param {Object} options 包含一个加载一次和加载完成的回调
     */
    function Preload(img, options) {
        this.imgs = (typeof img === "string" ? [img] : imgs);
        this.opts = $.extend({}, options, this.DEFAULT);

        if (this.opts.isOrdered) {
            this._ordered();
        } else {
            this._unOrdered();
        }

    }

    Preload.DEFAULT = {
        isOrdered: true, //是否有序加载
        loadOnce: null, //加载一次执行
        loadAll: null //加载所有完成后执行
    }

    Preload.prototype._ordered = function () {
        var imgs = this.imgs,
            opts = this.opts,
            len = imgs.length,
            count = 0;

        load();

        function load() {
            var imgobj = new Image();

            $(imgobj).on('load error', function () {
                opts.loadOnce && opts.loadOnce(count);
                if (count >= len) {
                    opts.all && opts.all();
                } else {
                    load();
                }
                count++;
            });

            imgobj.src = imgs[count];
        }
    }

    Preload.prototype._unOrdered = function () {
        var imgs = this.imgs,
            opts = this.opts,
            len = imgs.length,
            count = 0;

        $.each(imgs, function (index, src) {
            if (typeof src !== "string") return;
            var imgobj = new Image();

            $(imgobj).on('load error', function () {
                opts.loadOnce && opts.loadOnce(count)
                if (count >= len - 1) {
                    opts.all && opts.all()
                }
                count++;
            });

            imgobj.src = src;
        });
    }

    $.extend({
        Preload: function (img, options) {
            new Preload(img, options);
        }
    });
    
})(jQuery);