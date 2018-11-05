<template>
	<div :class="['r-titlebar-box',
			theme=='a'? 'r-tb-theme-a' : '',
			theme=='b'? 'r-tb-theme-b' : '',
			theme=='c'? 'r-tb-theme-c' : '',
			theme=='d'? 'r-tb-theme-d' : '',
			theme=='e'? 'r-tb-theme-e' : ''
			]" :style="tbStyle">
			<div :class="[(Evn.isFullpage && Evn.isRong360 && Evn.isIphoneX)?'ipx':(Evn.isFullpage && Evn.isRong360)?'noipx':'']"></div>
		<div  :class="['l-operate',(Evn.isFullpage && Evn.isRong360 && Evn.isIphoneX)?'margin-top-35':(Evn.isFullpage && Evn.isRong360)?'margin-top-20':'']" v-show='showleft'>
			<slot name="l">
				<div @click="onBack" class="slot-l-box">
					<a>
						<span :class="['icon-back',theme?'icon-white':'']"></span>
					</a>
				</div>
			</slot>
		</div>
		<div class="height-100 width-100">
			<slot name="content">
				<div>{{title}}</div>
			</slot>
		</div>
		<div :class="['r-operate',(Evn.isFullpage && Evn.isRong360 && Evn.isIphoneX)?'margin-top-35':(Evn.isFullpage && Evn.isRong360)?'margin-top-20':'']">
			<slot name="r">
			</slot>
		</div>
	</div>
</template>
<script>
	import {Evn} from '../../service/env'
	import mixins from '../../mixins/index'

	export default{
		name: "Titlebar",
		mixins:[mixins],
		data(){
			return {
				Evn:Evn
			}
		},
		props: {
			showleft:{
				type:Boolean,
				default:true
			},
			theme: {
				type: String,
			},
			tbStyle: {
				type: Object
			},
			title: String,
			// 是否使用默认返回 针对有特殊情况返回到指定页面 开的口子
			autoBack:{
				type:Boolean,
				default:true
			}
		},
		methods: {
			onBack(){
				this.autoBack && this.routerBack()
				this.$emit("onBack");
			}
		},
	}
</script>
<style lang="less" scoped>
.r-titlebar-box{
	background: #fff;
	width: 100%;
	line-height: 45px;
	color: #333;
	font-size: 14px;
	position: relative;
	text-align: center;
	.ipx{
		height: 35px;
	}
	.noipx{
		height: 20px;
	}
	.slot-l-box{
		height: 100%;
		padding-left: 15px;
		padding-right: 15px;
		a{
			display: inline-block;
			height: 100%;
			width: 100%;
		}
	}
	.l-operate{
		z-index: 2;
		position: absolute;
		min-width: 32px;
		height: 100%;
		top: 0;
		left: 0;
	}
	.r-operate{
		z-index: 2;
		position: absolute;
		top: 0;
		right: 15px;
	}
	&[class*="r-tb-theme-"]{
		color: #fff;
	}
	&.r-tb-theme-a{
		background-image: linear-gradient(90deg, #51C1EC 0%, #4080E8 100%);
	}
	&.r-tb-theme-b{
		background-image: linear-gradient(-90deg,  #4D78F6 2%,#919FFF 100%);
	}
	&.r-tb-theme-c{
		background-image: linear-gradient(-269deg, #15DDC5 1%, #01A6D0 99%);
	}
	&.r-tb-theme-d{
		background-image: linear-gradient(-90deg, #F86B4A 0%, #FEC351 100%);	
	}
	&.r-tb-theme-e{
		background-image: linear-gradient(-90deg, #FF3061 0%, #FE8166 100%);
	}
	.icon-back{
		position: relative;
		width: 8px;
		height: 16px;
		line-height: 16px;
		&:before,
		&:after{
			position: absolute;
			left: 5px;
			top: 22px;
			-webkit-transform-origin: left center;
			transform-origin: left center;
			width: 10px;
			height: 1px;
			overflow: hidden;
			background-color: #333;
			display: block;
			content: " ";
		}
		&:before{
			transform: rotate(45deg);
		}
		&:after{
			transform: rotate(-45deg);
		}
	}
	.icon-white{
		&:before{
			background-color: #fff;
		}
		&:after{
			background-color: #fff;
		}

	}
}
</style>