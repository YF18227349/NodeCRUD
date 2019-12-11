$(function () {
    $("#form").validate({
        rules: {
            name: {
                required: true,
                regName: true
            },
            age: {
                required: true,
                nianling: true
            },
            sex: {
                required: true,
                xingbie: true
            },
            hobby: {
                required: true
            }
        },
        messages: {
            name: {
                required: "请输入姓名",
                regName: '请输入2-4位中文名'
            },
            age: {
                required: "请输入年龄",
                nianling: "输入的年龄应为1-120"
            },
            sex: {
                required: "请输入性别",
                xingbie: "请输入正确的性别"

            },
            hobby: {
                required: "请输入爱好",
            }
        }
    })
    $.validator.addMethod(
        'regName',
        function (value, element, param) {
            var pattern1 = /^[\u4E00-\u9FA5]{2,4}$/;
            return pattern1.test(value);
        },
        '请输入2-4位中文名'
    )
    $.validator.addMethod(
        'nianling',
        function (value, element, param) {
            var pattern2 = /^(?:[1-9][0-9]?|1[01][0-9]|120)$/
            return pattern2.test(value);
        },
        '输入年龄应为1-120'
    )
    $.validator.addMethod(
        'xingbie',
        function (value, element, param) {
            var pattern3 = /^['男'|'女']$/;
            return pattern3.test(value);
        },
        '请输入正确的性别'
    )
})