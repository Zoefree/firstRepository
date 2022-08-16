import Mock from 'mockjs'
import homeApi from './mockserver/home'
import userApi from './mockserver/user'
import permissionApi from './mockserver/permission'

//；拦截getmenu 接口  通过正则匹配或者确切路径
Mock.mock('/home/getData',homeApi.getStatisticalData)
Mock.mock(/user\/add/,'post',userApi.createUser)
Mock.mock(/user\/edit/,'post',userApi.updateUser)
Mock.mock(/user\/getUser/,'get',userApi.getUserList)
Mock.mock(/user\/del/,'post',userApi.deleteUser)
Mock.mock(/permission\/getMenu/,'post',permissionApi.getMenu)