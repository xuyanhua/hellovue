Vue.component('input-number', {
    props: {
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 10000
        },
        // value从父组件接收值
        value: {
            type: Number,
            default: 0
        }
    },
    template: '<div><input type="text" :value="currentValue" @input="handleChange" @keyup.up="handleIncrease" @keyup.down="handleReduce"></input>\
                <button @click="handleReduce" :disabled="currentValue<=min">-</button>\
                <button @click="handleIncrease" :disabled="currentValue>=max">+</button>\
                </div>',
    data: function () {
        return {
            // Vue组件是意向数据流，无法直接在组件内部修改props.value的值。
            // 解决办法：给组件声明一个data，默认引用value的值，然后在组件内部维护这个data
            // 但这样只解决了初始化引用父组件的问题，当父组件的修改了value的值，input-number组件如何更新currentValue呢？
            // 看下方watch选项
            currentValue: this.value
        }
    },
    // 监听
    // watch选项用来监听某个prop或data的改变，当发生变化时，应付触发watch配置的函数，从而完成业务逻辑
    watch: {
        // 监听currentValue，以更新value
        currentValue: function (val) {
            this.$emit('input', val);//这个与父组件的v-model相对应。v-model是一个语法糖，相当于:value=xxx && @input='xxx'
            this.$emit('on-change', val);//触发自定义事件
        },
        // 监听从父组件修改value的值
        value: function (val) {
            this.updateValue(this.value);
        }
    },
    methods: {
        updateValue: function (val) {
            // 防止父组件的value不符合min~max的条件，所以做一个验证
            if (val < this.min) val = this.min;
            if (val > this.max) val = this.max;
            this.currentValue = val;
        },
        handleReduce: function () {
            if (this.currentValue < this.min) return;
            this.currentValue--;
        },
        handleIncrease: function () {
            if (this.currentValue > this.max) return;
            this.currentValue++;
        },
        isNumber: function (val) {
            return /^\d+$/.test(val);
        },
        handleChange: function (event) {
            var val = event.target.value.trim();
            this.currentValue = val;
            if (this.isNumber(val)) {
                val = Number(val)
                if (val < this.min) {
                    this.currentValue = this.min;
                } else if (val > this.max) {
                    this.currentValue = this.max;
                }
            } else {
                event.target.value = this.currentValue;
            }
        },
    },
    mounted: function () {
        // 第一次赋值时进行更新
        this.updateValue(this.value);
    }

})