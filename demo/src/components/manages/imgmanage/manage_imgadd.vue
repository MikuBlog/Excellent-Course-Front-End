<template>
    
    <div id="manage-imgadd">

        <div class="manage-imgadd-box">

            <div class="manage-imgmanage-box-correct">
                <form>
                    <div>
                        <label for="name">图片名称:</label>
                        <input v-model="imgName" type="text" id="name">
                    </div>
                    <div>
                        <label for="title">图片标题:</label>
                        <input v-model="imgTitle" type="text" id="title">
                    </div>
                    <div>
                        <label for="type">相册类别:</label>
                        <select name="type" id="type" @change="getId('type')">
                            <option v-for= "item in storageGalleryList" :value="item.id">{{item.name}}</option>
                        </select>
                    </div>
                    <div>
                        <label for="file">缩略图: </label>
                        <select name="thumb" id="file" @change="getId('file')">
                            <option v-for= "item in storageThumbList" :value="item.id">
                                {{item.name}}
                            </option>
                        </select>
                    </div>
                    <div>
                        <label for="content">图片描述: </label>
                        <textarea name="content" id="content" cols="30" rows="10" v-model="imgDescription"></textarea>
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

                /* 
                    存放缩略图信息
                    name:缩略图名称
                    description:缩略图描述
                    id:缩略图的id
                */
                storageThumbList:[],
                /*
                    存放当页相册信息
                    id:相册分类id
                    description:相册描述
                    name:相册名称
                */
                storageGalleryList:[],
                //存放图片标题
                imgTitle:"",
                //存放图片名称
                imgName:"",
                //存放图片描述
                imgDescription:"",
                //相册名称
                imgGallery:"",
                //存放相册分类Id
                categoryId:"",
                //存放缩略图Id
                thumbId:"",
                //存放文件名称
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

            //获取表单名字
            getFileName() {

                this.fileName = document.querySelector('.inline-file').value

            },

            //初始化相册列表
            initialGalleryList(list) {

                var _this = this

                list.forEach(function(value) {

                    _this.storageGalleryList.push(value)

                })

                this.categoryId = this.storageGalleryList[0].id

            },

            //获取相册列表
            getGallery() {

                var _this = this

                $.ajax({

                    url:"http://qwebfx-test.deali.cn/api/image/category-list",

                    type:"GET",

                    success(data) {

                        var list = data.list

                        _this.initialGalleryList(list)

                    },error() {

                        console.log("请求失败")

                    }

                })

            },

            //获取id
            getId(id) {

                switch(id) {

                    case "type":
                        var mySelect = document.querySelector("#"+id)
                        var index = mySelect.selectedIndex
                        this.categoryId = mySelect.options[index].value
                        break
                    case "file":
                        var mySelect = document.querySelector("#"+id)
                        var index = mySelect.selectedIndex
                        this.thumbId = mySelect.options[index].value
                        break

                }

            },

            //初始化缩略图数组
            initialThumbList(list) {

                var _this = this

                this.storageThumbList.length = 0

                list.forEach(function(value) {

                    _this.storageThumbList.push(value)

                })

                this.thumbId = this.storageThumbList[0].id 

            },

            //请求缩略图列表
            getThumbList() {

                var _this = this

                $.ajax({

                    url:"http://qwebfx-test.deali.cn/api/thumb/list",

                    type:"GET",

                    success(data) {

                        var list = data.list

                        _this.initialThumbList(list)

                    },error() {

                        console.log("请求失败")

                    }

                })

            },

            //发送文件信息修改数据
            sendMessage() {
                
                var _this = this 

                var formData = new FormData()

                formData.append("session_id",this.$store.state.userId)

                formData.append("name",this.imgName)

                formData.append("category",this.categoryId)

                formData.append("thumb",this.thumbId)

                formData.append("title",this.imgTitle)

                formData.append("description",this.imgDescription)

                formData.append('upload',document.querySelector('.inline-file').files[0])

                $.ajax({

                    url:"http://qwebfx-test.deali.cn/api/image/add",

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

                    },

                })

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

                this.fileName = ""

            },

        },

        mounted() {

            this.getGallery()

            this.getThumbList()

        }

    }

</script>

<style lang="scss">

    #manage-imgadd {

         .manage-imgadd-box {
            position: relative;
            text-align: center;
            overflow: hidden;
            background:white;
            box-shadow: 0 0 1px 1px rgb(240, 240, 240);

            .manage-imgmanage-box-correct {
                position: relative;
                background: white;
                box-shadow: 0 0 1px 1px rgb(240, 240, 240);
                height:55rem;
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

                            .inline {
                                position: absolute;
                                top:-3.2rem;
                                left:2.5rem;
                                z-index: 1;
                                width:82%;
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
                            }

                            select {
                                width:81%;
                                height:2rem;
                                text-indent: .5rem;
                            }

                            #file {
                                margin-left:1.1rem;
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
