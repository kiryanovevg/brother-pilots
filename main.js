new Vue({
    el: '#app',
    data: {
        isWin: false,
        message: null,
        array: null
    },

    mounted() {
        this.start();
    },

    computed: {
        size() { return 4 },
    },

    methods: {
        start() {
            this.isWin = false;
            this.array = [];
            this.message = "Расположи все объекты горизонтально: <--->";

            for (let i = 0; i < this.size; i++) {
                const nested = [];
                for (let j = 0; j < this.size; j++) {
                    nested.push(this.generator(i + j));
                }
                this.array.push(nested);
            }
        },

        generator(n) {
            //Build full array with all possibilities
            n = 3 + n;
            let numbers = [], temp = n;
            while (temp--)
                numbers[temp] = temp+1;
            //Remember 1 randomly removed number
            let index = Math.floor(Math.random() * n--),
                last = numbers.splice(index, 1)[0];

            index = Math.floor(Math.random() * n);
            temp = last;
            last = numbers[index];
            numbers[index] = temp;
            return (last) % 2;
        },

        clickOn(i, j) {
            if (!this.isWin) {
                this.rotate(i, j);
                this.checkWin()
            }
        },

        checkWin() {
            for (let i = 0; i < this.size; i++) {
                for (let j = 0; j < this.size; j++) {
                    if (this.array[i][j] === 1) return;
                }
            }

            this.message = "YOU ARE WINNER!";
            this.isWin = true;
        },

        rotate(i, j) {
            const arr = [...this.array];
            this.rotateRow(arr, i);
            this.rotateColumn(arr, j);
            arr[i][j] = this.revert(arr[i][j]);
            this.array = arr;
        },

        rotateRow(arr, row) {
            for (let i = 0; i < this.size; i++) {
                arr[row][i] = this.revert(arr[row][i])
            }
        },

        rotateColumn(arr, col) {
            for (let i = 0; i < this.size; i++) {
                arr[i][col] = this.revert(arr[i][col])
            }
        },

        revert(n) {
            if (n === 0) return 1;
            else return 0;
        },

        indexOfRow(row) {
            return this.array.indexOf(row)
        }
    }
});
