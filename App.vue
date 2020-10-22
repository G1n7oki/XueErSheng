<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
		font-family: 'PingFang SC', 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
	}
	
	.container {
		width: 100%;
		height: 100%;
		position: relative;
		box-sizing: border-box;
	}
	
	button {
		margin: 0;
		padding: 0;
	}
	
	button:after {
		border: none;
	}
</style>
