const install = (Vue, vm) => {
	const login =()=> {
		let wxUserInfo = {};
		wx.getUserProfile({
			  desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
			  success: (userInfoRes) => {
				  console.log('getUserProfile success');
				  console.log(userInfoRes);
				  wxUserInfo = userInfoRes.userInfo;
				  
				  wx.login({
					success: (res) => {
						let code = res.code;
						var param = {};
						param.code = res.code;
						param.wxUserInfo = wxUserInfo;
						
						vm.$u.api.login(param).then(res => {
						vm.$u.vuex('vuex_token',res.token);
						vm.$u.vuex('vuex_token_type',res.tokenType)
						console.log('login success');
						
						vm.$u.utils.getUserInfo()
					})
					}
				  })
			  },
			  fail: (userInfoRes) => {
				  console.log('getUserProfile error');
				  console.log(userInfoRes);
			  }
			})
	 }
	
	const isLogin =()=> {
		const token = vm.vuex_token
		// 没有token，跳转登录页面
		if(!token){
			// 回源跳转，拿到当前页
			/* let currentRoute;
			if(getCurrentPages().pop().goodsId){
				// 如果url带参数，加上参数
				currentRoute=`/${getCurrentPages().pop().route}?id=${getCurrentPages().pop().goodsId}`
			}else{
				currentRoute=`/${getCurrentPages().pop().route}`
			}
			uni.setStorageSync("currentRoute",currentRoute)
			
			uni.showToast({
				title:"请先登入",
				icon:"error",
				mask:true
			})
			setTimeout(()=>{
				// 跳转登录页
				vm.$u.route({
					url:'/pages/center/index'
				})
			},1500) */
			return false
		}
		return true
	}
	
	const getUserInfo=()=> {
		  vm.$u.api.getUserInfo().then(res => {
		  const userInfo = {};
		  userInfo.nickName = res.nickName;
		  userInfo.avatarUrl = res.avatarUrl
		  userInfo.roles = res.roles;
		  vm.$u.vuex('vuex_user',userInfo)
		})
	}
	
	vm.$u.utils={
		login,
		isLogin,
		getUserInfo
	}
}

export default {
	install
}