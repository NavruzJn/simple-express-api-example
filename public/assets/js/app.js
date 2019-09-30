Vue.http.options.emulateJSON = true;

const app = new Vue({
    el: '#app',
    data: {
        users: [],
        dates: [],
    },

    methods: {
        getUsers: function (e) {
            this.$http.get('/users')
                .then(response => {
                    this.users = response.body
                })
        },

        getDates: function (e) {
            this.$http.get('/dates')
                .then(response => {
                    this.dates = response.body
                })
        },
    },
    created() {
        this.getUsers();
        this.getDates();
    }
});

