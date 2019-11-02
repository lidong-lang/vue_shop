<template>
    <div class="login_container">
        <div ref="ceshi">测试</div>
        <input type="text" @input="fn($event)">
       <div class="login_box">
           <!-- 头像区域 -->
           <div class="avatar_box">
               <img src="../assets/logo.png" alt="">
           </div>
           <!-- 登录表单区 -->
           <el-form ref="loginFormRef" :model="loginForm" label-width="0px" class="login_form" :rules="loginFormRules">
            <el-form-item prop="username">
                <el-input  v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input  type="password" v-model="loginForm.password" prefix-icon="iconfont icon-3702mima"></el-input>
            </el-form-item>
              <el-form-item class="btns">
                <el-button type="primary" @click="login">登录</el-button>
                <el-button type="info" @click="reset">重置</el-button>

            </el-form-item>
            </el-form>
       </div>
    </div>
</template>
<script>
export default {
    name : 'login',
    data () {
        return {
            // 这是登录表单的数据对象
            loginForm:{
                username:'admin',
                password:'123456'
            },
            loginFormRules:{
                username:[
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3到 10 个字符', trigger: 'blur' }
                ],
                 password:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        fn(e){
        console.log(this.$refs.ceshi.innerHTML);
        },
        reset(){
            this.$refs.loginFormRef.resetFields()
        },
        login(){
            this.$refs.loginFormRef.validate(async valid=>{
                // console.log(valid);
                if(!valid) return console.log('验证失败')
                const {data:res}= await this.$http.post('login',this.loginForm)
                console.log(res);
                
                if(res.meta.status!=200)return this.$message.error('用户名或密码输入有误')
               this.$message.success('验证通过')
                
                // 存储token
                window.sessionStorage.setItem('token',res.data.token)
                this.$router.push('/home')
            })
        }
    }
}
</script>
<style scoped lang="less">
    .login_container{
        height: 100%;
        background:#2b4b6b;
        .login_box{
           width: 450px;
           height: 300px;
           background: #fff;
           border-radius: 3px;
           position: absolute;
           left: 50%;
           top:50%;
           transform: translate(-50%,-50%);
           .avatar_box{
               height: 130px;
               width: 130px;
               background:#fff;
               border:1px solid #eee;
               border-radius: 50%;
               padding: 10px;
               box-shadow: 0 0 10px #ddd;
               position: absolute;
               left: 50%;
               top:0;
               transform: translate(-50%,-50%);
            img{
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background-color: #eee;
            }
           }
        }
       
    }
    .login_form{
        position:absolute;
        left: 0;
        bottom:0;
        width: 100%;
        box-sizing: border-box;
        padding: 0 20px;
        .btns{
            display: flex;
            justify-content: flex-end;
        }
    }
</style>