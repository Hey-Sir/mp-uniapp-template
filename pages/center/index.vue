<template>
	<view>
		<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30">
			<view class="u-flex" v-if="$u.utils.isLogin()">
				<view class="u-m-r-10">
					<u-avatar :src="vuex_user.avatarUrl" size="140"></u-avatar>
				</view>
				<view class="u-flex-1">
					<view class="u-font-18 u-p-b-20">{{vuex_user.nickName}}</view>
				</view>
			</view>
			<view class="u-flex" v-else @click="$u.utils.login()">
				<view class="u-m-r-10">
					<u-avatar :src="pic" size="140"></u-avatar>
				</view>
				<view class="u-flex-1">
					<view class="u-font-18 u-p-b-20">点击登录</view>
				</view>
			</view>
		</view>
		
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="setting" title="设置"></u-cell-item>
			</u-cell-group>
		</view>
		<u-button type="primary" @click="loginOut" v-if="$u.utils.isLogin()">退出登录</u-button>
		<u-button type="primary" open-type="contact" @contact="handleContact">联系客服</u-button>
		<u-button type="primary" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">绑定手机号</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pic:'',
				show:true,
				sDKVersion : ''
			}
		},
		onLoad() {
			
		},
		methods: {
			  async loginOut() {
				  // 退出登录
				  await this.$u.api.loginOut()
				  // 清楚缓存
				  this.$u.vuex('vuex_token',"");
				  this.$u.vuex('vuex_token_type',"");
				  this.$u.vuex('vuex_user',"")
				  
				  this.$u.toast('退出登录')
				  // 跳转到首页
				  this.$u.route({
					  type: 'reLaunch',
					  url: 'pages/index/index'
				  })
			  },
			  handleContact (e) {
				  console.log('联系客服');
				  console.log(e.detail.path)
				  console.log(e.detail.query)
			  },
			  getPhoneNumber(e) {
				  console.log(e);
				  // 判断 e 状态
				  // TODO 登录获取code
				  const { iv, encryptedData } = e.target
				  const params = {
					  code: this.code,
					  iv,
					  encryptedData
					}
				
					// 后端解密 获取手机号
			  }
					
		}
	}
</script>

<style lang="scss">

</style>

