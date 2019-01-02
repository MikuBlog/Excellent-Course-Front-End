<template>
    <div id="manage-thumbnailadd">
        
        <div class="manage-thumbnailadd-box">

            <div class="manage-thumbnailadd-box-add">
                <form>
                    <div>
                        <label for="name">缩略图名称:</label>
                        <input v-model="thumbName" type="text" id="name">
                    </div>
                    <div>
                        <label for="description">缩略图描述:</label>
                        <textarea v-model="thumbDescription" type="text" id="description"></textarea><br/>
                    </div>
                    <div>
                        <label for="file">文件上传:</label>
                        <div class="inline">
                            <input type="file" id="file" class="inline-file" @change="getFileName()">
                            <span class="file-head">{{fileName}}</span>
                            <span class="icon"><i class="fa fa-image fa-lg"></i>select</span>
                        </div>
                    </div>
                </form>
                <div class="manage-site-button">
                    <span @click="sendMessage()"><i class="fa fa-check fa-lg"></i>提交</span>
                    <span @click="reset()"><i class="fa fa-refresh fa-lg"></i>重置</span>
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

                //缩略图名称
                thumbName:"",
                //缩略图描述
                thumbDescription:"",
                //文件名
                fileName:"",
                //是否弹出提示框
                showWarning:false,
                //警告框内容
                warningMessage:"",
                //提交状态
                state:""

            }

        },

        methods: {

            //修改提示框内容
            warningContent(content) {

                if(content == "error") {

                    this.state = "Error!"

                    this.warningMessage = "Format error of form input."

                }else {

                    this.state = "Success!"

                    this.warningMessage = "Add success!"

                }

            },

            //隐藏提示框并进行路由跳转
            hideWarning() {

                this.showWarning = false

            },

            //获取表单名字
            getFileName() {

                this.fileName = document.querySelector('.inline-file').value

                console.log("牛V")

            },

            //提交表单信息
            sendMessage() {

                var _this = this

                var formData = new FormData()

                formData.append("session_id",this.$store.state.userId)

                formData.append("name",this.thumbName)

                formData.append("description",this.thumbDescription)

                formData.append('upload',document.querySelector('.inline-file').files[0])

                $.ajax({

                    url:"http://qwebfx-test.deali.cn/api/thumb/add",

                    type:"POST",

                    data:formData,

                    contentType:false,

                    processData:false,

                    xhr() {

                        var xhr = $.ajaxSettings.xhr()

                        if(xhr.upload) {

                            var progress = document.querySelector('.progress')

                            xhr.upload.addEventListener('progress',function(e) {

                                progress.style.width =  100*e.loaded/e.total+"%"

                            })

                        }

                        return xhr

                    },

                    success(data) {

                        if(data.status == "error") {

                            var progress = document.querySelector('.progress')

                            _this.warningContent("error")

                            progress.style.width = 0

                        }else {

                            var progress = document.querySelector('.progress')

                            progress.style.width = 0

                            _this.warningContent("success")

                        }

                        _this.showWarning = true

                    },error() {

                        _this.warningContent("error")

                        _this.showWarning = true

                    }

                })


            },

            //重置表单
            reset() {

                document.querySelector('form').reset()

                this.fileName = ""

            }

        }
    }
    
</script>

<style lang="scss">

    #manage-thumbnailadd {


        .manage-thumbnailadd-box {
            position: relative;
            text-align: center;
            overflow: hidden;
            width:100%;
            background:white;
            box-shadow: 0 0 1px 1px rgb(240, 240, 240);

            .manage-thumbnailadd-box-add {
                position: relative;
                background: white;
                box-shadow: 0 0 1px 1px rgb(240, 240, 240);
                height:50rem;
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
                            margin:3rem;
                            position: relative;

                            .inline {
                                position: absolute;
                                top:-3.2rem;
                                left:3.8rem;
                                z-index: 1;
                                width:80%;
                                display: inline-block;
                                border:1px #a8a8a8 solid;

                                .file-head {
                                    position: absolute;
                                    width:80%;
                                    left: 1rem;
                                    top:.3rem;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
                                }


                                input {
                                    position: relative;
                                    left:-.5em;
                                    width:100%;
                                    opacity: 0;
                                }

                                .icon {
                                    position: absolute;
                                    top:0;
                                    z-index: -1;
                                    right:-.1rem;
                                    display: inline-block;
                                    padding:.4rem .6rem;
                                    color:white;
                                    background:#6fb2de;
                                    cursor: pointer;

                                    i {
                                        margin-right:.2rem; 
                                    }
                                }
                            }

                            .inline:active {
                                border:1px #6fb3df solid;
                            }

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
                                height:20rem;
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
    }

</style>
