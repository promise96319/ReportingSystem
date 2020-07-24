<template>
  <div class="company-profile">
    <SubHeader title="Profile"></SubHeader>
    <div class="main">
      <div class="container">
        <el-form
          :model="companyProfile"
          class="company-info"
          label-position="left"
          label-width="144px"
          ref="companyProfile"
        >
          <el-form-item label="Company logo:">
            <el-upload
              :action="URL.uploadCompanyLogo"
              :on-success="uploadSuccessed"
              :show-file-list="false"
              class="avatar-uploader"
            >
              <!-- :on-success="handleAvatarSuccess" -->
              <!-- :before-upload="beforeAvatarUpload" -->
              <img :src="companyProfile.logo" class="avatar" v-if="companyProfile.logo" />
              <i class="el-icon-plus avatar-uploader-icon" v-else></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="Company name:">
            <el-input
              :disabled="!isCompanyNameEditable"
              placeholder="Company Name"
              v-model="companyProfile.name"
            >
              <el-button
                @click="isCompanyNameEditable = !isCompanyNameEditable"
                class="lock"
                slot="append"
              >
                <svg-icon :icon-class="isCompanyNameEditable ? 'unlock' : 'lock'"></svg-icon>
              </el-button>
            </el-input>
          </el-form-item>

          <el-form-item label="Chart of accounts type:" label-width="200px">
            <el-select :disabled="!isAccountTypeEditable" v-model="companyProfile.current_region">
              <el-option :key="item" :label="item" :value="item" v-for="item in accountTypes"></el-option>
            </el-select>
            <el-button @click="isAccountTypeEditable=!isAccountTypeEditable" class="lock append">
              <svg-icon :icon-class="isAccountTypeEditable ? 'unlock' : 'lock'"></svg-icon>
            </el-button>
          </el-form-item>

          <el-form-item label="Contact address:">
            <el-row class="gap">
              <el-col :span="24">
                <el-input placeholder="Street" v-model="street"></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="gap">
              <el-col :span="12">
                <el-input placeholder="City" v-model="city"></el-input>
              </el-col>
              <el-col :span="12">
                <el-input placeholder="Postal code" v-model="companyProfile.postal_code"></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-select placeholder="Country" v-model="country">
                  <el-option
                    :key="index"
                    :label="item"
                    :value="item"
                    v-for="(item, index) in COUNTRIES"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :span="12"></el-col>
            </el-row>
          </el-form-item>

          <el-form-item label="Website:">
            <el-input placeholder="Example: www.example.com" v-model="companyProfile.website"></el-input>
          </el-form-item>

          <el-form-item label="Business scope:">
            <el-input
              placeholder="Business scope"
              rows="4"
              type="textarea"
              v-model="companyProfile.business_scope"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-row :gutter="12" justify="space-between" type="flex">
                  <el-col :span="12">
                    <el-button
                      :loading="isUpdatingCompany"
                      @click="updateCompany"
                      class="full-width"
                      type="primary"
                    >Confirm</el-button>
                  </el-col>
                  <el-col :span="12">
                    <el-button @click="()=>{$router.go(-1)}" class="full-width" plain>Cancel</el-button>
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
import SubHeader from '@/components/SubHeader'
import COUNTRIES from '@/constant/countries.js'
import api from '@/api'
import URL from '@/api/config'
import { SET_CURRENT_COMPANY, SET_COMPANY_LIST } from '@/store/modules/company'
import accountTypes from '@/constant/accountType'

// 国家，城市，街道 分隔符-> 国家$$$城市$$$街道
const ADDRESS_DELIMITER = '$$$'

export default {
	data() {
		return {
			COUNTRIES,
			URL,

			accountTypes,
			isAccountTypeEditable: false,

			isCompanyNameEditable: false,
			companyProfile: {},
			country: '',
			city: '',
			street: '',

			isGettingCompanyData: false,
			isUpdatingCompany: false
		}
	},
	computed: {
		currentCompanyID() {
			return this.$store.getters.currentCompany.id
		},
	},
	components: {
		SubHeader
	},
	created() {
		this.getCompanyDetail()
	},
	methods: {
		async getCompanyDetail() {
			if (!this.currentCompanyID) {
				return
			}
			this.isGettingCompanyData = true
			const res = await api.getCompanyDetail(this.currentCompanyID)
			this.isGettingCompanyData = false
			if (res.data.error_code === 0) {
				const data = res.data.data
				this.companyProfile = data
				const { address } = data
				// 国家$$$城市$$$街道
				let addressArr = address.split(ADDRESS_DELIMITER)
				this.country = addressArr[0] || ''
				this.city = addressArr[1] || ''
				this.street = addressArr[2] || ''
			}
		},
		uploadSuccessed(res) {
			this.companyProfile.logo = res.data.file_path
		},
		async updateCompany() {
			if (this.companyProfile.name === '') {
				return this.$message.error('Company name is empty')
			}
			if (this.country === '') {
				return this.$message.error('Country is empty')
			}
			if (this.city === '') {
				return this.$message.error('City is empty')
			}
			if (this.street === '') {
				return this.$message.error('Street is empty')
			}
			if (this.companyProfile.postal_code === '') {
				return this.$message.error('Postal code is empty')
			}
			if (this.companyProfile.website === '') {
				return this.$message.error('Website is empty')
			}
			if (this.companyProfile.business_scope === '') {
				return this.$message.error('Business scope is empty')
			}

			this.companyProfile.address = [this.country, this.city, this.street].join(
				ADDRESS_DELIMITER
			)

			this.isUpdatingCompany = true
			const res = await api.updateCompany(
				this.currentCompanyID,
				this.companyProfile
			)

			this.isUpdatingCompany = false

			if (res.data.error_code === 0) {
				this.$store.commit(SET_CURRENT_COMPANY, res.data.data)
				this.$message.success('更新成功!')
				this.isAccountTypeEditable = false
				this.isCompanyNameEditable = false
				// 重新获取company list
				const result = await api.getCompanyList()
				if (result.data.error_code === 0) {
					const { companies } = result.data.data
					this.$store.commit(SET_COMPANY_LIST, companies)
				}
			}
		}
	},
}
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
				.el-select {
					width: 100%;
					/deep/ .el-input__suffix {
						right: 68px;
					}
				}

				.append {
					background-color: #f5f7fa;
					position: absolute;
					height: 40px;
					width: 64px;
					top: 0px;
					right: 0px;
					border-top-left-radius: 0;
					border-bottom-left-radius: 0;
					display: table-cell;
					vertical-align: middle;
					border-color: #dcdfe6 !important;
					.svg-icon {
						transform: translateY(-3px);
					}
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
