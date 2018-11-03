<template>
    <div id="sign">
        <div class="head-first"><span class="color">L</span>ogin</div>
        <div id = "register">
            <form class="form" v-if="!show">
                    <div><img src="../images/姓名.png" height = "25" width = "25"><input type="text" id = "name" placeholder="用户名" v-model="RegisterName" @keydown="enter('Register',$event)"></div>
                    <div><img src="../images/邮箱.png" height = "25" width = "25"><input type="email" id = "email" placeholder="邮箱" v-model="RegisterEmail" @keydown="enter('Register',$event)"></div>
                    <div><img src="../images/密码.png" height = "25" width = "25"><input type="password" id = "number" placeholder = "密码" v-model="RegisterPassword" @keydown="enter('Register',$event)"></div>
                    <input type="button" @click="send('Register')" value="submit" class="button">
                    <div class="message"></div>
            </form>
            <form class="form" v-if="show">
                <div><img src="../images/姓名.png" height = "25" width = "25"><input type="text" id = "name" placeholder="用户名" v-model="LoginName" @keydown="enter('Login',$event)"></div>
                <div><img src="../images/密码.png" height = "25" width = "25"><input type="password" id = "number" placeholder = "密码" v-model="LoginPassword" @keydown="enter('Login',$event)"></div>
                <input type="button" @click="send('Login')"  @keydown="enter('Login',$event)" class="button" value="submit">
                <div class="message"></div>
            </form>
            <div class="switch">
                <div class="Login" @click="handleClick(true)">Login</div>
                <div class="Register" @click="handleClick(false)">Register</div>
            </div>
        </div>
    </div>
</template>


<script>

    import ballRun from '../js/ballRun.main.min.js'

    import md5 from "js-md5"

    export default {

        data() {

            return {

                show:true,

                LoginName:"",

                RegisterEmail:"",

                LoginPassword:"",

                RegisterName:"",

                RegisterPassword:""

            }

        },

        methods: {

            //回车登录/注册
            enter(way,event) {

                if(event.keyCode == 13) {

                    this.send(way)

                }

            },

            //注册与登录的切换
            handleClick(justify) {

                this.show = justify

                if(this.show) {

                    document.querySelector('.head-first').innerHTML = "<span class='color'>L</span>ogin"

                }else {

                    document.querySelector('.head-first').innerHTML = "<span class='color'>R</span>egister"

                }

            },

            //发送数据
            send(way) {

                var _this = this

                //登录进行的操作
                if(way == "Login") {

                    var data = {
                        "username":this.LoginName,
                        "password":md5(this.LoginPassword)
                    }

                    $.ajax({

                        url:"http://qwebfx-test.deali.cn/api/user/login",

                        type:"POST",

                        data: JSON.stringify(data),

                        beforeSend() {

                            document.querySelector('.button').disabled = true

                        },

                        success(data) {

                            if(data.msg) {

                                document.querySelector('.message').style.color = "#56dcfe"

                                document.querySelector('.message').innerHTML = data.msg+",即将跳转到官网"

                                _this.$store.commit('setUserName',data.session.user.username)

                                _this.$store.commit('setUserId',data.session.id)

                                _this.$store.commit('setRole',data.session.user.role)

                                setTimeout(function() {

                                    document.querySelector('.message').innerHTML = ""

                                    if(_this.$store.state.position != "") {

                                         _this.$router.push({path:_this.$store.state.position})

                                    }else {

                                        _this.$router.push({path:"/first/official"})

                                    }

                                },1000)

                            }else {

                                document.querySelector('.message').style.color = "red"

                                document.querySelector('.message').innerHTML = data.exception

                                setTimeout(function() {

                                    document.querySelector('.message').innerHTML = ""

                                },2000)

                            }

                            document.querySelector('.button').disabled = false

                        },
                        
                        error() {

                            console.log("请求失败")

                             document.querySelector('.button').disabled = false

                        }

                    })
                //注册进行的操作
                }else {

                    var data = {
                        "username":this.RegisterName,
                        "password":md5(this.RegisterPassword),
                        "email":this.RegisterEmail
                    }

                    $.ajax({

                        url:"http://qwebfx-test.deali.cn/api/user/create",

                        type:"POST",

                        data: JSON.stringify(data),

                        beforeSend() {

                            document.querySelector('.button').disabled = true

                        },

                        success(data) {

                            if(data.msg) {

                                document.querySelector('.message').style.color = "#56dcfe"

                                document.querySelector('.message').innerHTML = data.msg

                                setTimeout(function() {

                                    _this.show = true;

                                    document.querySelector('.message').innerHTML = ""

                                },1000)

                            }else {

                                document.querySelector('.message').style.color = "red"

                                document.querySelector('.message').innerHTML = data.exception

                                setTimeout(function() {

                                    document.querySelector('.message').innerHTML = ""

                                },2000)

                            }

                            document.querySelector('.button').disabled = false


                        },
                        
                        error() {

                            console.log("请求失败")

                             document.querySelector('.button').disabled = false

                        }

                    })

                }

            }

        },

        mounted() {
            
            ballRun({

                Element:"#sign",

                Number:15,

                Radius:13,

                spotColor: ["rgba(56, 255, 255,.5)","#f1e3b2"]

            })

        }
    }

</script>

<style lang="scss">

#sign {
    height:100%;
    overflow: hidden;
    background:linear-gradient(to bottom,#d1fdff,#cafcff,#fddb92);

    .head-first {
        margin-top:5rem;
        text-align: center;
        font-size:5rem;
        font-style: italic;
    }

    .color {

        color:#eee4b5;
        font-size: 8rem;

    }

    #register {
        position: absolute;
        width:25rem;
        height:33rem;
        top:0;
        right:0;
        left:0;
        bottom:0;
        margin:auto;
        overflow: hidden;

        form{
                position: relative;
                margin-top:10%;
                display: inline-block;
                text-align: center;
                vertical-align: middle;
                padding:4rem 0;
                width:100%;
                height:100%;
                background:rgba(255,255,255,.5);

                .message {
                    margin-top:1.5rem;
                    color:red;
                    font-size: 1.1rem;
                }
            }
            input{
                text-indent: 10mm;
                border:1px solid silver;
                outline:none;
                height:3rem;
                width:80%;
                margin:.5rem;
                border-radius:5px;
            }
            input:focus{
                background: rgb(241, 237, 237);
                border:1px solid rgb(0, 0, 0);
            }
            div{
                position: relative;
            }
            img{
                position:absolute;
                top:.8rem;
                left:11%;
            }
            .button{
                position: relative;
                margin-top:1rem;
                text-indent: 0;
                outline: none;
                border:1px solid silver;
                height:3rem;
                width:80%;
                background-color:black;
                color:white;
                border-radius:.5rem;
                cursor: pointer;
                font-size: 1.2rem;
                transition: .5s;
            }
            .button:hover{
                color:white;
                background: rgb(0, 217, 255);
            }

            .switch{
                    position: relative;
                    width:100%;
                    margin-top:-16rem;
                    white-space: nowrap;
                    text-align: center;

                    .Login,.Register{
                        width:4rem;
                        text-align: center;
                        padding: .6rem 1.3rem;
                        background:white;
                        display: inline-block;
                        border-radius: .5rem;
                        border:2px solid white;
                        font-size: 1rem;
                        margin:0 .5rem;
                        cursor: pointer;
                        transition: .5s;
                    }

                    .Login {
                        color:white;
                        background:red;
                        border:2px solid red;
                    }

                    .Login:hover {
                         color:red;
                         background:white;
                    }

                    .Register:hover {
                        color:rgb(0, 217, 255);
                        border:2px solid rgb(0, 217, 255);
                    }
                }
    }
}

@media screen and (min-width:0) and (max-width:500px){
    #sign {
        .head-first {
            margin-top:1.5rem;
            text-align: center;
            font-size:3rem;
            font-style: italic;
        }

        .color {

            color:#eee4b5;
            font-size: 6rem;

        }
    }
}

</style>
