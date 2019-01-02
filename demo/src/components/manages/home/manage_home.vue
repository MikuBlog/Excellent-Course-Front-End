<template>

    <div id="manage-home">
        
        <div class="manage-home-box">

            <div class="manage-home-box-list">

                <div class="manage-home-box-child">
                    <div>
                        <span>最新公告</span>
                    </div>
                    <ul>
                        <li v-for="item in storageInfoList">{{item.title}}</li>
                    </ul>
                </div>

                <div class="manage-home-box-child">
                    <div>
                        <span>最新文章</span>
                    </div>
                    <ul>
                        <li v-for="item in storagePageList">{{item.name}}</li>
                    </ul>
                </div>

            </div>

        </div>

    </div>

</template>

<script>

    export default {

        data() {

            return {

                //存放最新公告列表
                storageInfoList:[],
                //存放最新文章列表
                storagePageList:[]

            }

        },

        methods: {

            //初始化公告列表数组(只放出前八条公告数据)
            initialInfoList(list) {

                if(list.length < 8) {

                    for(var i = list.length - 1 ; i >=0 ; i --) {

                        this.storageInfoList.push(list[i])

                    }

                }else {

                    for(var i = list.length - 1 ; i >=list.length - 8 ; i --) {

                        this.storageInfoList.push(list[i])

                    }

                }

            },

            //请求公告列表
            getInfoList() {

                var _this = this

                $.ajax({

                    url:"http://qwebfx-test.deali.cn/api/announcement/list",

                    type:"GET",

                    success(data) {

                        var list = data.list

                        _this.initialInfoList(list)

                    },error() {

                        console.log("请求失败")

                    }

                })

            },

            initialPageList(list) {

                if(list.length < 8) {

                    for(var i = list.length - 1 ; i >=0 ; i --) {

                        this.storagePageList.push(list[i])

                    }

                }else {

                    for(var i = list.length - 1 ; i >=list.length - 8 ; i --) {

                        this.storagePageList.push(list[i])

                    }

                }

            },

            getPageList() {

                var _this = this

                $.ajax({

                    url: "http://qwebfx-test.deali.cn/api/post/list?page=1",

                    type: "GET",

                    success(data) {

                        var list = data.list;

                        _this.initialPageList(list)
                    },
                    error() {

                        console.log("请求失败");
                    }

                });

            }

        },

        mounted() {

            this.getInfoList()

            this.getPageList()

        }

    }
    
</script>

<style lang="scss">

    #manage-home {

        ul {
            li {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }

        .manage-home-box {

            .manage-home-box-list {
                position: relative;
                box-shadow: 0 0 1px 1px rgb(240, 240, 240);
                background:white;
                height:100%;

                .manage-home-box-child {
                    position: relative;
                    cursor: pointer;
                    div {
                        position: relative;
                        top:1.5rem;
                        left:1.5rem;
                        font-size: 1.8rem;
                        span {
                            position: relative;
                            display: inline-block;
                            padding-bottom:1rem;
                            color:#5088b9;
                            border-bottom: .1rem solid #5088b9;
                            cursor: pointer;
                            transition: .3s;
                        }

                        span:hover {
                            color:#2666af;
                            border-bottom: .1rem solid #2666af;
                        }
                    }
                    ul {
                        position: relative;
                        font-size: 1.3rem;
                        margin:4rem 4rem 4rem 4rem;
                        padding:2rem;
                        border: .1rem solid rgb(240, 240, 240);
                        li {
                            text-indent: 1rem;
                            position: relative;
                            padding:1.5rem 1rem;
                            border-bottom: .1rem solid rgb(240, 240, 240);
                            list-style: none;
                            transition: .3s;
                        }
                        li:hover {
                             color:#2666af;
                        }
                    }
                }
            }

        }
    }

</style>
