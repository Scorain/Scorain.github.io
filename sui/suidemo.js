/**
 * Created by suny on 2016/11/9.
 */
$(function(){
    ({
        initalize: function(){
            var self = this;
            $.init();
            this.events();
            this.pickers("n_picker_one","one");
            this.pickers("n_picker_two","two");
        },
        events: function(){
            $("#e_toast").on("click",function(){
                $.toast("操作成功");
            });
        },
        pickers:(function(){
            var configs = {
                "one": {
                    toolbarTemplate: '<header class="bar bar-nav">\
                            <button class="button button-link pull-left">按钮</button>\
                            <button class="button button-link pull-right close-picker">确定</button>\
                            <h1 class="title">标题</h1>\
                            </header>',
                    cols: [
                        {
                            textAlign: 'center',
                            values: ['赵', '钱', '孙', '李', '周', '吴', '郑', '王']
                            //如果你希望显示文案和实际值不同，可以在这里加一个displayValues: [.....]
                        },
                        {
                            textAlign: 'center',
                            values: ['杰伦', '磊', '明', '小鹏', '燕姿', '菲菲', 'Baby']
                        },
                        {
                            textAlign: 'center',
                            values: ['先生', '小姐'],
                            displayValues: ['sir','lady']
                        }
                    ]
                },
                "two": {
                    toolbarTemplate: '<header class="bar bar-nav">\
                            <button class="button button-link pull-right close-picker">确定</button>\
                            <h1 class="title">标题</h1>\
                            </header>',
                    cols: [
                        {
                            textAlign: 'center',
                            values: ['赵', '钱', '孙', '李', '周', '吴', '郑', '王']
                            //如果你希望显示文案和实际值不同，可以在这里加一个displayValues: [.....]
                        }
                    ]
                }
            };
            return function(eleId,configId){
                $("#"+eleId).picker(configs[configId]);
            };
        })()
    }).initalize();
});




