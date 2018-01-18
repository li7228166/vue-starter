<template>
    <div class="wrapper">
        <img class="animated fadeIn" src="../assets/images/1.png">
        <div>{{name}}</div>
    </div>
</template>

<script>
    export default {
        name: "app",
        data() {
            return {
                name: '阿狸'
            }
        }
    }
</script>

<style scoped lang="less">
    .wrapper {
        background-image: url(../assets/images/1.png);
        img {
            width: 200px;
            height: 200px;
            border: 2px solid red;
        }
    }
</style>