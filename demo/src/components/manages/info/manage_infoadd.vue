<template>
    
    <div id="manage-infoadd">

        <div class="manage-infoadd-box">

            <div class="manage-infoadd-box-correct">
                <form>
                    <div>
                        <label for="head">公告标题:</label>
                        <input type="text" id="head" v-model="title">
                    </div>
                    <div>
                        <label for="file">附件:</label>
                        <select name="thumb" id="file"  @change="getFoldId()">
                            <option v-for="item in foldContentList" :value="item.id">{{item.file_object.name}}</option>
                        </select>
                    </div>
                </form>
                <div class="manage-head">公告内容</div>
                <editor class="editor"></editor>
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

import editor from '../../editor'

    export default {

        components:{editor},

        data() {

            return {

                //存放文件标题
                title:"",
                /*
                    存放文件数据
                    id:文件id
                    file_object.name:文件名
                */
                foldContentList:[],
                //存放文件Id
                FoldId:"",
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

                document.querySelector('.ql-editor').innerText = ""                

            },

            //获取文件Id
            getFoldId() {

                var mySelect = document.querySelector('select')

                var index = mySelect.selectedIndex

                this.FoldId = mySelect.options[index].value

            },

            //获取文件列表
            getContent() {
            
                var _this = this

                $.ajax({

                    url:"http://qwebfx-test.deali.cn/api/file/list",

                    type:"GET",

                    success(data) {

                        var list = data.list

                        list.forEach(function(value) {

                            _this.foldContentList.push(value)

                        })

                        console.log(_this.foldContentList)

                        _this.FoldId = _this.foldContentList[0].id

                    },error() {

                        console.log("请求失败")

                    }

                })

            },

            //将数据发送到服务器
            sendMessage() {

                var _this = this

                var data = {

                    "session_id":this.$store.state.userId,

                    "title":this.title,

                    "content":document.querySelector('.ql-editor').innerHTML,

                    "attachment":[this.FoldId]

                }

                $.ajax({

                    url:"http://qwebfx-test.deali.cn/api/announcement/add",

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

                    }

                })

            },

        },

        mounted() {

            this.getContent()

        }

    }

</script>

<style lang="scss">

    #manage-infoadd {

        .manage-infoadd-box {
            position: relative;
            text-align: center;
            overflow: hidden;
            background:white;
            box-shadow: 0 0 1px 1px rgb(240, 240, 240);

            .manage-infoadd-box-correct {
                    position: relative;
                    background: white;
                    box-shadow: 0 0 1px 1px rgb(240, 240, 240);
                    height:65rem;
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

                                select  {
                                    width:81%;
                                    height:2rem;
                                    margin-left:2.3rem;
                                }
                            }
                    }
                    
                    .manage-head {
                        
                        position: relative;
                        top:15rem;
                        font-size: 1.5rem;
                        
                    }

                    .quill-editor{
                        position: absolute;
                        left:0;
                        right:0;
                        margin: auto;
                        top:18rem;
                        width:80%;
                        height: 30rem;

                        .ql-toolbar {
                            white-space: normal;
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
