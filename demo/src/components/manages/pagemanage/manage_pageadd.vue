<template>
    
    <div id="manage-pageadd">

        <div class="manage-pageadd-box">

            <div class="manage-pageadd-box-correct">
                <form>
                    <div>
                        <label for="name">页面名称:</label>
                        <input v-model="pageName" type="text" id="name">
                    </div>
                    <div>
                        <label for="title">页面标题:</label>
                        <input v-model="pageTitle" type="text" id="title">
                    </div>
                    <div>
                        <label for="type">页面类型:</label>
                        <select name="type" id="type" @change="getPageType()">
                            <option value="post_all">文章目录列表</option>
                            <option value="post_category">指定目录的文章列表页</option>
                            <option value="post_author">指定作者的文章列表页</option>
                            <option value="post">文章页面</option>
                            <option value="img_all">相册列表</option>
                            <option value="img_category">指定目录的图片列表页面</option>
                            <option value="video_all">视频目录列表</option>
                            <option value="video_category">视频列表页面</option>
                            <option value="video">视频播放页面</option>
                            <option value="file_all">文件目录页面</option>
                            <option value="file_category">文件列表页面</option>
                            <option value="file">文件下载页面</option>
                        </select>
                    </div>
                </form>
                <div class="manage-site-button">
                    <span @click="sendMessage()"><i class="fa fa-check fa-lg"></i>提交</span><span @click="reset()"><i class="fa fa-refresh fa-lg"></i>重置</span>
                </div>
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

                //存放单个标题的名称
                pageName:"",
                //存放单个页面的标题
                pageTitle:"",
                //存放单个页面的类型
                pageType:"post_all",
                //是否弹出提示框
                showWarning:false,
                //警告框内容
                warningMessage:"",
                //提交状态
                state:""

            }

        },

        methods: {

            //获取页面类别
            getPageType() {

                var mySelect = document.querySelector('select')

                var index = mySelect.selectedIndex

                this.pageType = mySelect.options[index].value

            },

            //修改提示框内容
            warningContent(content) {

                if(content == "error") {

                    this.state = "Error!"

                    this.warningMessage = "A form information error."

                }else {

                    this.state = "Success!"

                    this.warningMessage = "Add success!"

                }

            },

            //隐藏提示框
            hideWarning() {

                this.showWarning = false

            },

            //重置表单
            reset() {

                document.querySelector('form').reset()

            },

            //发送页面修改数据
            sendMessage() {
                
                var _this = this 

                var data = {

                    "session_id":this.$store.state.userId,

                    "name":this.pageName,

                    "title":this.pageTitle,

                    "type":this.pageType

                }

                $.ajax({

                    url:"http://qwebfx-test.deali.cn/api/page/add",

                    type:"POST",

                    data:JSON.stringify(data),

                    success(data) {

                        if(data.status == "error") {

                            _this.warningContent("error")

                        }else {

                            _this.warningContent("success")

                        }

                        _this.showWarning = true

                    },error() {

                        _this.warningContent("error")

                        _this.showWarning = true

                    },

                })

            },

        }

    }

</script>

<style lang="scss">

    #manage-pageadd {


        .manage-pageadd-box {
            position: relative;
            text-align: center;
            overflow: hidden;
            background:white;
            box-shadow: 0 0 1px 1px rgb(240, 240, 240);

            .manage-pageadd-box-correct {
                position: relative;
                background: white;
                box-shadow: 0 0 1px 1px rgb(240, 240, 240);
                height:30rem;
                    form {
                        position: absolute;
                        width:50rem;
                        display: inline-block;
                        left:0;
                        right:0;
                        margin: auto;
                        overflow: hidden;
                        text-align: left;
                        div {
                            position: relative;
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

                            select {
                                width:81%;
                                height:2rem;
                                text-indent: .5rem;
                            }

                        }
                }
                .manage-site-button {
	                position: absolute;
	                width:100%;
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

    }

</style>
