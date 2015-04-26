define(function(require,exports,module){

    var TMP = {
        /**
         * 渲染模板
         *
         * @param $dom
         * @param data
         * @param $template
         */
        refreshTemplate: function ($dom, data, $template, append) {
            // 原生方法
            var source = $template.html();
            // 预编译模板
            var tm = tp.compile(source);
            // 匹配json内容
            var html = tm(data);
            // // 输入模板
            if (append)
                $dom.append(html);

            else
                $dom.html(html);
        }
    }

    module.exports = TMP;

});