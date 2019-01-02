<template>
    
    <div id="manage-articleadd">

        <div class="manage-articleadd-box">

            <div class="manage-articleadd-box-correct">
                <form>
                    <div>
                        <label for="name">文章名称:</label>
                        <input v-model="articleName" type="text" id="name">
                    </div>
                    <div>
                        <label for="title">文章标题:</label>
                        <input v-model="articleTitle" type="text" id="title">
                    </div>
                    <div>
                        <label for="content">文章描述: </label>
                        <textarea name="content" id="content" cols="30" rows="10" v-model="articleDescription" ></textarea>
                    </div>
                    <div>
                        <label for="author">文章作者:</label>
                        <select name="author" id="author" @change="getId('author')">
                            <option v-for= "item in storageAuthorList" :value="item.id">{{item.name}}</option>
                        </select>
                    </div>
                    <div>
                        <label for="type">文章类别: </label>
                        <select name="type" id="type" @change="getId('type')">
                            <option v-for= "item in storageArticleTypeList" :value="item.id">{{item.name}}</option>
                        </select>
                    </div>
                    <div>
                        <label for="status">发送状态: </label>
                        <select name="status" id="status" @change="getId('status')">
                            <option value="publish">已发布</option>
                            <option value="draft">草稿</option>
                        </select>
                    </div>
                </form>
                <div class="manage-head">文章内容</div>
                <editor></editor>
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
                /*
                    存放文章列表
                    name:文章分类名称
                    id:文章分类id
                    description:文章分类描述
                */
                storageArticleTypeList:[],
                /* 
                    存放作者信息
                    name:作者名称
                    id:作者的id
                */
                storageAuthorList:[],
                //存放文章名称
                articleName:"",
                //存放文章标题
                articleTitle:"",
                //存放文章描述
                articleDescription:"",
                //是否弹出提示框
                showWarning:false,
                //警告框内容
                warningMessage:"",
                //提交状态
                state:"",
                //存放作者id
                authodId:"",
                //存放文章类型id
                articleTypeId:"",
                //存放文章状态的值
                status:"",
                //存放作者页数
                authorPageNumber:"",
                //存放文章分类页数
                articleTypePageNumber:"",
                //每页的数量
                eachPageNumber:10

            }

        },

        methods: {

            //初始化文章分类列表
            initialArticleTypeList(list) {

                var _this = this

                list.forEach(function(value) {

                    _this.storageArticleTypeList.push(value)

                })

                this.articleTypeId = this.storageArticleTypeList[0].id

            },

            //获取文章分类信息
            getArticleTypeList(id) {

                var _this = this

                this.nowPageNumber = id

                $.ajax({

                    url:"http://qwebfx-test.deali.cn/api/post/category/list?page="+id,

                    type:"GET",

                    success(data) {

                        var list = data.list

                        _this.initialArticleTypeList(list)

                    },error() {

                        console.log("请求失败")

                    }

                })

            },

            //获取id
            getId(id) {

                switch(id) {

                    case "author":
                        var mySelect = document.querySelector("#"+id)
                        var index = mySelect.selectedIndex
                        this.authodId = mySelect.options[index].value
                        break
                    case "type":
                        var mySelect = document.querySelector("#"+id)
                        var index = mySelect.selectedIndex
                        this.articleTypeId = mySelect.options[index].value
                        break
                    case "status":
                        var mySelect = document.querySelector("#"+id)
                        var index = mySelect.selectedIndex
                        this.status = mySelect.options[index].value
                        break

                }

            },

            //发送文章修改数据
            sendMessage() {
                
                var _this = this 

                var data = {

                    "session_id":this.$store.state.userId,

                    "name":this.articleName,

                    "post_category":this.articleTypeId,

                    "post_author":this.authodId,

                    "post_content":document.querySelector('.ql-editor').innerHTML,

                    "post_title":this.articleTitle,

                    "post_summary":this.articleDescription,

                    "post_status":this.status

                }

                $.ajax({

                    url:"http://qwebfx-test.deali.cn/api/post/add",

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

            //初始化作者列表
            initialAuthorList(list) {

                var _this = this

                list.forEach(function(value) {

                    _this.storageAuthorList.push(value)

                })

                this.authodId = this.storageAuthorList[0].id

            },

            //获取作者列表
            getAuthorList(id) {

                var _this = this

                this.nowPageNumber = id

                $.ajax({

                    url:"http://qwebfx-test.deali.cn/api/post/author/list?page="+id,

                    type:"GET",

                    success(data) {

                        var list = data.list

                        _this.initialAuthorList(list)

                    },error() {

                        console.log("请求失败")

                    }

                })

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

            },

        },

        mounted() {

            this.status = "publish"

            this.getAllPageNumber("http://qwebfx-test.deali.cn/api/post/author/count","authorPageNumber","getAuthorList")

            this.getAllPageNumber("http://qwebfx-test.deali.cn/api/post/category/count","acticleTypePageNumber","getArticleTypeList")

        }

    }

</script>

<style lang="scss">

    #manage-articleadd {

        .manage-articleadd-box {
            position: relative;
            text-align: center;
            overflow: hidden;
            background:white;
            box-shadow: 0 0 1px 1px rgb(240, 240, 240);

            .manage-articleadd-box-correct {
                position: relative;
                background: white;
                box-shadow: 0 0 1px 1px rgb(240, 240, 240);
                height:100rem;
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
                            }

                            select {
                                width:81%;
                                height:2rem;
                                text-indent: .5rem;
                            }

                        }
                }

                .manage-head {

                    position: relative;
                	top:46rem;
                	font-size: 1.5rem;

                }

                .quill-editor{
                    position: absolute;
                    z-index: 1;
                    left:0;
                    right:0;
                    margin: auto;
                    top:50rem;
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
