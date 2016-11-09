/**
 * Created by suny on 2016/11/9.
 */
(function($){
    $(function(){
        ({
            initalize: function(){
                var self = this;
                this.events();
                $.init();
            },
            events: function(){
                $("#e_toast").on("click",function(){
                    $.toast("操作成功");
                });
            }
        }).initalize();
    });
})($);




