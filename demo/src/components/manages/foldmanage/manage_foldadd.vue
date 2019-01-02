<template>
    
    <div id="manage-foldadd">

        <div class="manage-foldadd-box">

            <div class="manage-foldadd-box-correct">
                <form>
                    <div>
                        <label for="name">文件名称:</label>
                        <input v-model="foldName" type="text" id="name">
                    </div>
                    <div>
                        <label for="title">文件标题:</label>
                        <input v-model="foldTitle" type="text" id="title">
                    </div>
                    <div>
                        <label for="number">文件数量:</label>
                        <input value="1" type="text" id="number" disabled="true">
                    </div>
                    <div>
                        <label for="type">文件类别:</label>
                        <select name="type" id="type" @change="getId('type')">
                            <option v-for= "item in storageFoldTypeList" :value="item.id">{{item.name}}</option>
                        </select>
                    </div>
                    <div>
                        <label for="file">缩略图: </label>
                        <select name="thumb" id="file" @change="getId('file')">
                            <option v-for= "item in storageThumbList" :value="item.id">{{item.name}}</option>
                        </select>
                    </div>
                    <div>
                        <label for="style">文件类型:</label>
                        <select name="style" id="style" @change="getId('style')">
                            <option value="audio">Audio File</option>
                            <option value="doc">Word Document</option>
                            <option value="ppt">PowerPoint Document</option>
                            <option value="xle">Excel Document</option>
                            <option value="program">Executable Program</option>
                            <option value="other">Other File</option>
                        </select>
                    </div>
                    <div>
                        <label for="content">文件描述: </label>
                        <textarea name="content" id="content" cols="30" rows="10" v-model="foldDescrition" :placeholder="foldDescrition"></textarea>
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
                    存放文件分类列表
                    description:文件描述
                    id:文件分类id
                    name:文件分类名称
                */
               storageFoldTypeList:[],
                /* 
                    存放缩略图信息
                    name:缩略图名称
                    description:缩略图描述
                    id:缩略图的id
                */
                storageThumbList:[],
                /* 
                    存放当页文件信息
                    file_object.name:文件名称
                    file_object.title:文件标题
                    file_object.category.name:文件类别
                    file_object.id:文件id
                    file_object.category_id:文件分类id
                    file_object.type:文件类型/文件格式
                    file_object.date:时间戳
                    file_object.descrition:文件描述
                */
                storageFoldList:[],
                //单个文件的名称
                foldName:"",
                //单个文件的标题
                foldTitle:"",
                //单个文件的描述
                foldDescrition:"",
                //单个文件的分类
                foldType:"",
                //单个文件的格式
                foldStyle:"",
                //存放文件id
                foldId:"",
                //文件上传的时间
                time:"",
                //存放文件分类id
                categoryId:"",
                //保存缩略图id
                thumbId:"",
                //保存文件类型值
                foldStyle:"audio",
                //文件名称
                fileName:"",
                //是否弹出提示框
                showWarning:false,
                //警告框内容
                warningMessage:"",
                //提交状态
                state:"",
                //文章分类数目
                foldTypePageNumber:"",
                //分页数量
                eachPageNumber:10

            }

        },

        methods: {

            //获取表单名字
            getFileName() {

                this.fileName = document.querySelector('.inline-file').value

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
                    case "style":
                        var mySelect = document.querySelector("#"+id)
                        var index = mySelect.selectedIndex
                        this.foldStyle = mySelect.options[index].value
                        break

                }

            },

            //初始化文件分类列表
            initialFoldTypeList(list) {

                var _this = this

                list.forEach(function(value) {

                    _this.storageFoldTypeList.push(value)

                })

                this.categoryId = this.storageFoldTypeList[0].id

            },

            //获取文件分类列表
            getFoldTypeList(id) {

                var _this = this

                $.ajax({

                    url:"http://qwebfx-test.deali.cn/api/file/category-list?page="+id,

                    type:"GET",

                    success(data) {

                        var list = data.list

                        _this.initialFoldTypeList(list)

                    },error() {

                        console.log("请求失败")

                    }

                })

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

                formData.append("name",this.foldName)

                formData.append("category",this.categoryId)

                formData.append("thumb",this.thumbId)

                formData.append("type",this.foldStyle)

                formData.append("size",0)

                formData.append("title",this.foldTitle)

                formData.append("description",this.foldDescrition)

                formData.append("upload",document.querySelector('.inline-file').files[0])

                $.ajax({

                    url:"http://qwebfx-test.deali.cn/api/file/add",

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

            //获取页数
            getAllPageNumber(url,val,fName) {

                var _this = this

                $.ajax({

                    url:url,

                    type:"GET",

                    success(data) {

                        _this[val] = Math.ceil(data.count/_this.eachPageNumber)

                        _this.getAllList(val,fName)

                    },error() {

                        console.log("请求失败")

                    }

                })

            },

            //获取单选框中的所有元素
            getAllList(val,fName) {

                for(var i = 1 ; i <= this[val] ; i ++) {

                    this[fName](i)

                }

                console.log(this.storageFoldTypeList)

            },

        },

        mounted() {

            this.getThumbList()

            this.getAllPageNumber("http://qwebfx-test.deali.cn/api/file/category/count","foldTypePageNumber","getFoldTypeList")

        }

    }

</script>

<style lang="scss">

    #manage-foldadd {


        .manage-foldadd-box {
            position: relative;
            text-align: center;
            overflow: hidden;
            background:white;
            box-shadow: 0 0 1px 1px rgb(240, 240, 240);

            .manage-foldadd-box-correct {
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
                                    z-index:-1;
                                    top:-.1rem;
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
