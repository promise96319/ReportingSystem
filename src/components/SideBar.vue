<template>
	<div class="aside-bar">
		<template v-for="(item, index) in sideBarItems">
			<div :key="index">
				<el-tooltip effect="dark" :content="item.title" placement="right">
					<div
						:class="[isSideBarActive && selectedIndex == index ? 'selected' : '', 'item']"
						@click="toggleSideBar(index)"
					>
						<svg-icon :icon-class="item.icon"></svg-icon>
					</div>
				</el-tooltip>
				<div
					:class="[isSideBarActive && selectedIndex == index + 1 ? 'bottom-border' : '', isSideBarActive && selectedIndex === index ? 'top-border' : '' , 'gap']"
				>
					<div class="bg"></div>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
export default {
	data() {
		return {
			selectedIndex: -1,
			sideBarItems: [
				{
					icon: "upload",
					title: "Data import",
					components: ["DataImport", "DataMaintenance"]
				},
				{
					icon: "edit",
					title: "Chart of accounts",
					components: ["AccountList"]
				},
				{
					icon: "repeat",
					title: "Mapping table",
					components: ["Mapping"]
				},
				{
					icon: "file",
					title: "Accounting entries",
					components: ["ReportResult"]
				}
			]
		};
	},
	computed: {
		isSideBarActive() {
			this.selectedIndex = this.sideBarItems.findIndex(item => {
				return item.components.indexOf(this.$route.name) !== -1;
			});
			return this.$store.state.app.isSideBarActive;
		}
	},
	created() {
		this.selectedIndex = this.sideBarItems.findIndex(item => {
			return item.components.indexOf(this.$route.name) !== -1;
		});
	},
	methods: {
		toggleSideBar(index) {
			if (this.selectedIndex === index) {
				return;
			}
			this.selectedIndex = index;
			this.$router.push({
				name: this.sideBarItems[index].components[0]
			});
		}
	}
};
</script>

<style scoped lang="scss">
.aside-bar {
	position: fixed;
	left: 0;
	top: 0;
	width: 60px;
	height: 100%;
	z-index: 999;
	padding-top: 120px;
	// background-color: #f5f5f5;
	// background-color: #eee;
	background-color: rgb(48, 65, 86);
	line-height: 60px;
	text-align: center;
	font-size: 28px;
	.item {
		height: 60px;
		// margin-bottom: 10px;
		stroke: #606266;
		stroke: #eee;
		cursor: pointer;
		&.selected {
			svg {
				stroke: #66b1ff;
			}
			background-color: #fff;
		}
		&:hover {
			svg {
				stroke: #66b1ff;
			}
		}
	}
	.gap {
		width: 100%;
		height: 12px;
		background-color: #fff;
		.bg {
			height: 100%;
			background-color: rgb(48, 65, 86);
		}
		&.top-border .bg {
			border-top-right-radius: 6px;
		}
		&.bottom-border .bg {
			border-bottom-right-radius: 6px;
		}
	}
}
</style>

