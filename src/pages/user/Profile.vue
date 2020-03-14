<template>
	<div class="company-profile">
		<SubHeader title="Profile"></SubHeader>
		<div class="main">
			<div class="container">
				<el-form
					:model="companyProfile"
					ref="companyProfile"
					label-width="128px"
					label-position="left"
					class="company-info"
				>
					<el-form-item label="Company logo:">
						<el-upload
							class="avatar-uploader"
							action="https://jsonplaceholder.typicode.com/posts/"
							:show-file-list="false"
						>
							<!-- :on-success="handleAvatarSuccess" -->
							<!-- :before-upload="beforeAvatarUpload" -->
							<img v-if="logoImg" :src="logoImg" class="avatar" />
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>

					<el-form-item label="Company name:">
						<el-input
							v-model="companyProfile.companyName"
							:disabled="!isCompanyNameEditable"
							placeholder="Company Name"
						>
							<el-button
								slot="append"
								class="lock"
								@click="isCompanyNameEditable = !isCompanyNameEditable"
							>
								<svg-icon :icon-class="isCompanyNameEditable ? 'unlock' : 'lock'"></svg-icon>
							</el-button>
						</el-input>
					</el-form-item>

					<el-form-item label="Contact address:">
						<el-row class="gap">
							<el-col :span="24">
								<el-input v-model="companyProfile.contactAddress.street" placeholder="Street"></el-input>
							</el-col>
						</el-row>
						<el-row :gutter="20" class="gap">
							<el-col :span="12">
								<el-input v-model="companyProfile.contactAddress.city" placeholder="City"></el-input>
							</el-col>
							<el-col :span="12">
								<el-input v-model="companyProfile.contactAddress.postalCode" placeholder="Postal code"></el-input>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="12">
								<el-select v-model="companyProfile.contactAddress.country" placeholder="Country">
									<el-option v-for="(item, index) in COUNTRIES" :key="index" :label="item" :value="item"></el-option>
								</el-select>
							</el-col>
							<el-col :span="12"></el-col>
						</el-row>
					</el-form-item>

					<el-form-item label="Website:">
						<el-input v-model="companyProfile.website" placeholder="Example: www.example.com"></el-input>
					</el-form-item>

					<el-form-item label="Business scope:">
						<el-input
							type="textarea"
							placeholder="Business scope"
							rows="4"
							v-model="companyProfile.businessScope"
						></el-input>
					</el-form-item>
					<el-form-item>
						<el-row :gutter="20">
							<el-col :span="12">
								<el-row type="flex" justify="space-between" :gutter="12">
									<el-col :span="12">
										<el-button type="primary" class="full-width">Confirm</el-button>
									</el-col>
									<el-col :span="12">
										<el-button plain class="full-width">Cancel</el-button>
									</el-col>
								</el-row>
							</el-col>
							<el-col :span="12"></el-col>
						</el-row>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
import SubHeader from "@/components/SubHeader";
import COUNTRIES from "@/constant/countries.js";

export default {
	data() {
		return {
			COUNTRIES,

			logoImg: "",
			isCompanyNameEditable: false,
			companyProfile: {
				companyName: "Company Name",
				contactAddress: {
					street: "",
					city: "",
					postalCode: "",
					country: ""
				},
				website: "",
				businessScope: ""
			}
		};
	},
	components: {
		SubHeader
	},
	created() {}
};
</script>

<style scoped lang="scss">
.company-profile {
	.main {
		padding: 30px;
		.container {
			width: 800px;
			margin: 60px auto 0;
			text-align: left;
			.company-info {
				.lock {
					font-size: 20px;
					stroke: #606266;
				}
				/deep/ .el-form-item__label {
					color: #303133;
					font-weight: 600;
				}
				.el-select {
					width: 100%;
				}
				.gap {
					margin-bottom: 16px;
				}
			}
			.avatar-uploader {
				height: 120px;
				/deep/ .el-upload {
					border: 1px solid #d9d9d9;
					border-radius: 6px;
					cursor: pointer;
					position: relative;
					overflow: hidden;
					:hover {
						border-color: #409eff;
					}
					.avatar-uploader-icon {
						font-size: 28px;
						color: #8c939d;
						width: 120px;
						height: 120px;
						line-height: 120px;
						text-align: center;
					}
					.avatar {
						width: 120px;
						height: 120px;
						display: block;
					}
				}
			}
		}
	}
}
</style>
