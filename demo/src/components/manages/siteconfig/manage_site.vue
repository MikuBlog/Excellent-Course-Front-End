<template>
    
    <div id="manage-site">

        <div class="manage-site-box">
            <form>
                <div>
                    <label for="main_title">网站标题:</label>
                    <input v-model="main_title" type="text" id="main_title">
                </div>
                <div>
                    <label for="cover_title">主页标题:</label>
                    <input v-model="cover_title" type="text" id="cover_title"><br/>
                </div>
                <div>
                    <label for="cover_text">主页描述:</label>
                    <textarea v-model="cover_text"  id="cover_text" cols="30" rows="10"></textarea>
                </div>
            </form>
            <div class="manage-site-button">
                <span @click="sendMessage()"><i class="fa fa-check fa-lg"></i>提交</span><span @click="reset()"><i class="fa fa-refresh fa-lg"></i>重置</span>
            </div>
        </div>

        <div class="manager" v-if="showWarning">
            <div class="manager-box">
                <div class="manager-color">
                    <img src="../../../images/水果.png">
                </div>
                <div class="manager-head">
                    <span>{{state}}</span>
                    <div>
                        {{warningMessage}}
                    </div>
                </div>
                <div class="manager-cancel" @click="hideWarning()">
                    <i class="fa fa-location-arrow fa-2x"></i>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
    
    export default {

        data() {

            return {

                //网站标题
                main_title:"",
                //主页标题
                cover_title:"",
                //主页描述
                cover_text:"",
                //弹出警告框
                showWarning:false,
                //警告框内容
                warningMessage:"",
                //提交状态
                state:""
            }

        },

        methods: {

            //隐藏警告框
            hideWarning() {

                this.showWarning = false

            },

            //重置表单
            reset() {

                document.querySelector('form').reset()

            },

            //发送数据
            sendMessage() {

                var _this = this

                var data = {
                    //存放用户ID
                    "session_id":this.$store.state.userId,
                    //存放网站标题
                    "main_title":this.main_title,
                    //存放主页标题
                    "cover_title":this.cover_title,
                    //存放主页描述
                    "cover_text":this.cover_text
                }

                if(data.session_id == "" || data.main_title == "" || data.cover_title == "" || data.cover_text == "") {

                    this.state = "Error!"

                    this.warningMessage = "You haven't finished the input of the content yet."

                    this.showWarning = true

                }else {

                    $.ajax({

                        url:"http://qwebfx-test.deali.cn/api/site/update",

                        type:"POST",

                        data:JSON.stringify(data),

                        success(data) {

                            _this.state = "Success!"

                            _this.warningMessage = "Change Success!"

                            _this.showWarning = true

                            console.log(data)

                        },error() {

                            console.log("修改失败")

                        }

                    })

                }

            },

            //获取站点信息
            getSiteMsg() {

                var _this = this

                $.ajax({

                    url:"http://qwebfx-test.deali.cn/api/site/info",

                    type:"GET",

                    success(data) {

                        var site = data.site

                        _this.main_title = site.main_title

                        _this.cover_title = site.cover_title

                        _this.cover_text = site.cover_text

                    },error() {

                        console.log("请求站点配置信息失败")

                    }

                })

            }

        },

        mounted() {

            this.getSiteMsg()

        }

    }

</script>

<style lang="scss">

    #manage-site {

        .manage-site-box {
            position: relative;
            background: white;
            box-shadow: 0 0 1px 1px rgb(240, 240, 240);
            height:40rem;
            form {
                position: absolute;
                width:40rem;
                display: inline-block;
                left:0;
                right:0;
                margin: auto;
                overflow: hidden;
                text-align: left;
                div {
                    margin:3rem;

                    label {
                        vertical-align: top;
                        font-size: 1.2rem;
                    }

                    input {
                        width:80%;
                        height:2rem;
                        text-indent: .5rem;
                    }

                    textarea {
                        width:81%;
                        text-indent: 1rem;
                    }
                }
            }
            .manage-site-button {
                position: absolute;
                width:100%;
                left:2.5rem;
                line-height:5rem;
                text-align: center;
                bottom:2rem;

                span {
                    padding:1rem 2rem;
                    margin:0 2rem;
                    font-size: 1.5rem;
                    color: white;
                    transition: .3s;
                    cursor: pointer;

                    i {
                        margin-right:.5rem;
                    }
                }

                span:first-of-type {
                    background:#6fb3df;
                    border:.2rem #6fb3df solid;
                }

                span:last-of-type {
                    background:#aab9c2;
                    border:.2rem #aab9c2 solid;
                }

                span:first-of-type:hover {
                    background:white;
                    color:#6fb3df;
                }

                span:last-of-type:hover {
                    background:white;
                    color:#aab9c2;
                }
            }

        }

    }

</style>

