import Vue from 'vue'
import VueRouter from 'vue-router'
import Sign from '../components/sign.vue'
import Home from '../components/Home.vue'
import Official from '../components/official'
import Info from '../components/info.vue'
import Fold from '../components/fold.vue'
import Page from '../components/page.vue'
import Video from '../components/video.vue'
import Gallery from '../components/gallery.vue'
import First from '../components/first.vue'
import Manage from '../components/manage.vue'
import ManageHome from '../components/manages/home/manage_home.vue'
import SiteConfig from '../components/manages/siteconfig/manage_site.vue'
import ThumbnailManage from "../components/manages/thumbnail/manage_thumbnailmanage.vue"
import ThumbnailAdd from "../components/manages/thumbnail/manage_thumbnailadd.vue"
import LinkAdd from "../components/manages/link/manage_linkadd.vue"
import LinkManage from "../components/manages/link/manage_linkmanage.vue"
import InfoAdd from "../components/manages/info/manage_infoadd.vue"
import InfoManage from "../components/manages/info/manage_infomanage.vue"
import PageAdd from "../components/manages/pagemanage/manage_pageadd.vue"
import PageManage from "../components/manages/pagemanage/manage_pagemanage.vue"
import FoldAdd from "../components/manages/foldmanage/manage_foldadd.vue"
import FoldManage from "../components/manages/foldmanage/manage_foldmanage.vue"
import FoldTypeAdd from "../components/manages/foldmanage/manage_foldtypeadd.vue"
import FoldTypeManage from "../components/manages/foldmanage/manage_foldtypemanage.vue"
import ImgAdd from "../components/manages/imgmanage/manage_imgadd.vue"
import ImgManage from "../components/manages/imgmanage/manage_imgmanage.vue"
import GalleryAdd from "../components/manages/imgmanage/manage_galleryadd.vue"
import GalleryManage from "../components/manages/imgmanage/manage_gallerymanage.vue"
import VideoAdd from "../components/manages/videomanage/manage_videoadd.vue"
import VideoManage from "../components/manages/videomanage/manage_videomanage.vue"
import VideoTypeAdd from "../components/manages/videomanage/manage_videotypeadd.vue"
import VideoTypeManage from "../components/manages/videomanage/manage_videotypemanage.vue"
import ArticleAdd from "../components/manages/article/manage_articleadd.vue"
import ArticleManage from "../components/manages/article/manage_articlemanage.vue"
import ArticleTypeAdd from "../components/manages/article/manage_articletypeadd.vue"
import ArticleTypeManage from "../components/manages/article/manage_articletypemanage.vue"
import AuthorAdd from "../components/manages/article/manage_authoradd.vue"
import AuthorManage from "../components/manages/article/manage_authormanage.vue"
import MenuManage from "../components/manages/menu/manage_menumanage.vue"

Vue.use(VueRouter)

var router = new VueRouter({
    mode: 'history',
    routes:[
        {path:'/sign',component:Sign},
        {path:'/home',component:Home},
        {
            path:'/manage',
            component:Manage,
            children:[
                {path:"managehome",component:ManageHome},
                {path:"managesite",component:SiteConfig},
                {path:"thumbnailmanage",component:ThumbnailManage},
                {path:"thumbnailadd",component:ThumbnailAdd},
                {path:"linkadd",component:LinkAdd},
                {path:"linkmanage",component:LinkManage},
                {path:"infoadd",component:InfoAdd},
                {path:"infomanage",component:InfoManage},
                {path:"pageadd",component:PageAdd},
                {path:"pagemanage",component:PageManage},
                {path:"foldadd",component:FoldAdd},
                {path:"foldmanage",component:FoldManage},
                {path:"foldtypeadd",component:FoldTypeAdd},
                {path:"foldtypemanage",component:FoldTypeManage},
                {path:"imgadd",component:ImgAdd},
                {path:"imgmanage",component:ImgManage},
                {path:"galleryadd",component:GalleryAdd},
                {path:"gallerymanage",component:GalleryManage},
                {path:"videoadd",component:VideoAdd},
                {path:"videomanage",component:VideoManage},
                {path:"videotypeadd",component:VideoTypeAdd},
                {path:"videotypemanage",component:VideoTypeManage},
                {path:"articleadd",component:ArticleAdd},
                {path:"articlemanage",component:ArticleManage},
                {path:"articletypeadd",component:ArticleTypeAdd},
                {path:"articletypemanage",component:ArticleTypeManage},
                {path:"authoradd",component:AuthorAdd},
                {path:"authormanage",component:AuthorManage},
                {path:"menumanage",component:MenuManage}
            ]
        },
        {
            path:'/first',
            component:First,
            children:[
                {path:"info",component:Info},
                {path:"fold",component:Fold},
                {path:"video",component:Video},
                {path:"gallery",component:Gallery},
                {path:"page",component:Page},
                {path:'official',component:Official}
            ]
        },
        {path:'*',redirect:'/first/official'}
    ]

})

export default router