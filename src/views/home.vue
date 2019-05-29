<template>
    <div>
        <el-button @click="test" type="primary">Click</el-button>
    </div>
</template>

<script>
import { Button } from 'element-ui'
import LoginApi from '@/apis/login'
    export default {
        name: 'home',
        components: {
            ElButton: Button
        },
        methods: {
            test(){
                LoginApi.testjwt();
            }
        }
    }
</script>

