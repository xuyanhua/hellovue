var app = new Vue({
    el: "#app",
    data: {
        value: 0
    },
    methods: {
        handleChange: function (val) {
            console.info('父组件收到。。。' + val)
        }
    }
});