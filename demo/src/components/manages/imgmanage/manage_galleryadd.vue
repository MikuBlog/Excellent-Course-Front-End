<template>
    
    <div id="manage-galleryadd">

        <div class="manage-galleryadd-box">

            <div class="manage-gallerymanage-box-correct">
                <form>
                    <div>
                        <label for="name">相册名称:</label>
                        <input v-model="galleryName" type="text" id="name">
                    </div>
                    <div>
                        <label for="description">相册描述:</label>
                        <textarea v-model="galleryDescription" type="text" id="description"></textarea><br/>
                    </div>
                    <div>
                        <label for="file">缩略图: </label>
                        <select name="thumb" id="file" @change="getId('file')">
                            <option v-for= "item in storageThumbList" :value="item.id">{{item.name}}</option>
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

                /* 
                    存放缩略图信息
                    name:缩略图名称
                    description:缩略图描述
                    id:缩略图的id
                */
                storageThumbList:[],
                //存放相册名称
                galleryName:"",
                //相册描述
                galleryDescription:"",
                //存放缩略图id
                thumbId:"",
                //是否弹出提示框
                showWarning:false,
                //警告框内容
                warningMessage:"",
                //提交状态
                state:"",

            }

        },

        methods: {

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

            //发送修改后的缩略图信息
            sendMessage() {

                var _this = this

                var data = {

                    "session_id":this.$store.state.userId,

                    "name":this.galleryName,

                    "description":this.galleryDescription,

                    "thumb":this.thumbId

                }

                $.ajax({

                    url:"http://qwebfx-test.deali.cn/api/image/category/add",

                    type:"POST",

                    data:JSON.stringify(data),

                    success(data) {

                        console.log(data)

                        if(data.status == "error") {

                            _this.warningContent("error")

                        }else {

                            _this.warningContent("success")

                        }

                        _this.showWarning = true

                    },error() {

                        console.log("请求失败")

                        _this.warningContent("error")

                        _this.showWarning = true

                    },

                })


            },

            //重置表单
            reset() {

                document.querySelector('form').reset()

            },

        },

        mounted() {

            this.getThumbList()

        }

    }

</script>

<style lang="scss">

    #manage-galleryadd {

        .manage-galleryadd-box {
            position: relative;
            text-align: center;
            overflow: hidden;
            background:white;
            box-shadow: 0 0 1px 1px rgb(240, 240, 240);

            .manage-gallerymanage-box-correct {
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

                            textarea {
                                width:81%;
                                height:20rem;
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
