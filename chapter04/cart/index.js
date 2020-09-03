var app = new Vue({
    el: "#app",
    data: {
        selectAll: false,
        list: [
            {
                name: 'iPhone',
                price: 5188,
                count: 1
            }, {
                name: 'iPad',
                price: 4888,
                count: 1
            }, {
                name: 'MacbookPro',
                price: 21888,
                count: 1
            }
        ]
    },
    methods: {
        handleDelete: function (index) {
            if (this.list[index].count == 1) {
                return;
            }
            this.list[index].count--;
        },
        handleAdd: function (index) {
            this.list[index].count++;
        },
        handleRemove: function (index) {
            this.list.splice(index, 1)
        },
        handleSelect: function () {
            // for (i in this.list) {
            //     this.list[i].selected = this.selectAll
            // }
        }
    },
    computed: {
        totalPrice: function () {
            console.info('jisuan...')
            var totalPrice = 0;
            for (i in this.list) {
                if (this.list[i].selected) {
                    totalPrice += this.list[i].price * this.list[i].count;
                }
            }
            return totalPrice;
        }
    },
    mounted: function () {
        for (i in this.list) {
            this.list[i].selected = this.selectAll
        }
    }
});