<template>
	<div class="user-management">
		<SubHeader title="User management">
			<el-button type="primary" class="invite-button" @click="inviteMember">
				<svg-icon icon-class="member"></svg-icon>Invite new member
			</el-button>
		</SubHeader>
		<div class="main">
			<div class="container">
				<el-table :data="usersData" style="width: 100%" border v-loading="isGettingUserData">
					<el-table-column prop="id" label="User ID" align="center" header-align="center"></el-table-column>
					<!-- <el-table-column prop="username" label="User name" align="center" header-align="center"></el-table-column> -->
					<el-table-column prop="email" label="Email address" align="center" header-align="center"></el-table-column>
					<el-table-column label="Password" align="center" header-align="center">
						<template slot-scope="scope">
							<span v-if="!scope.row.isEditable">{{ scope.row.username }}</span>
							<el-input v-else v-model="scope.row.username" size="medium"></el-input>
						</template>
					</el-table-column>
					<el-table-column label="Action" align="center" header-align="center" width="350">
						<template slot-scope="scope">
							<span v-if="scope.row.is_super_admin" class="admin">
								<svg-icon icon-class="admin"></svg-icon>Administrator
							</span>
							<el-button
								v-else-if="!scope.row.isEditable"
								type="primary"
								size="medium"
								@click="scope.row.isEditable=true"
							>
								<i class="el-icon-edit-outline"></i>
								Edit
							</el-button>
							<el-row v-else type="flex" justify="center" align="middle">
								<el-button type="success" size="medium" @click="scope.row.isEditable=false">
									<i class="el-icon-success"></i>
									Save
								</el-button>
								<el-button @click="scope.row.isEditable=false" type="info" plain size="medium">
									<i class="el-icon-refresh-right"></i>
									Cancel
								</el-button>
								<el-button type="danger" size="medium" @click="deleteMember(scope.$index)">
									<i class="el-icon-delete"></i>
									Delete
								</el-button>
							</el-row>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>

		<!-- <el-dialog title="Invite new member" :visible.sync="isInviteDialogShow" label-position="left">
			<el-form :model="newUserData">
				<el-form-item label="User name" label-width="108px">
					<el-input v-model="newUserData.username" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="Email address" label-width="108px">
					<el-input v-model="newUserData.emailAddress" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="Password" label-width="108px">
					<el-input v-model="newUserData.password" show-password autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="isInviteDialogShow = false">Cancel</el-button>
				<el-button type="primary" @click="isInviteDialogShow = false">Invite</el-button>
			</div>
		</el-dialog>-->
	</div>
</template>

<script>
import SubHeader from "@/components/SubHeader";
import api from "@/api";

export default {
	data() {
		return {
			usersData: [],
			isGettingUserData: false,

			isInviteDialogShow: false,
			newUserData: {
				username: "",
				emailAddress: "",
				password: ""
			}
		};
	},
	components: {
		SubHeader
	},
	computed: {
		currentCompany() {
			return this.$store.getters.currentCompany;
		}
	},
	created() {
		this.getUserList();
	},
	methods: {
		async getUserList() {
			if (!this.currentCompany || !this.currentCompany.id) {
				return;
			}

			this.isGettingUserData = true;
			const res = await api.getUserList(this.currentCompany.id);
			this.isGettingUserData = false;
			if (res.data.error_code === 0) {
				this.usersData = res.data.data;
			}
		},
		inviteMember() {
			this.$msgbox
				.prompt("Please enter the email", "Invite new member", {
					confirmButtonText: "Confirm",
					cancelButtonText: "Cancel",
					inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
					inputErrorMessage: "Incorrect mailbox format"
				})
				.then(async ({ value }) => {
					const res = await api.inviteUser(this.currentCompany.id, value);
					if (res.data.error_code === 0) {
						this.$message({
							type: "success",
							message:
								"The invitation has been sent to the mailbox, please check it in time"
						});
					}
				})
				.catch(() => {});
		},
		deleteMember(index) {
			const user = this.usersData[index];
			this.$msgbox
				.confirm(
					`Would you want to remove this user
      (${user.emailAddress})?`,
					"Notice",
					{
						confirmButtonText: "Confirm",
						cancelButtonText: "Cancel",
						type: "warning",
						center: true
					}
				)
				.then(() => {
					this.$message({
						type: "success",
						message: "Delete success!"
					});
				})
				.catch(() => {});
		}
	}
};
</script>

<style lang="scss" scoped>
@import "../../styles/customTable.scss";
.user-management {
	.invite-button .svg-icon {
		margin-right: 6px;
	}
	.main {
		padding: 30px;

		.el-button {
			width: 100px;
		}
		.container {
			// width: 600px;
			// margin: 40px auto 0;
			text-align: left;
			.remove-button.el-button {
				color: #f56c6c;
			}
			.remove-button:hover {
				border-color: #f56c6c !important;
			}
			.remove-button:focus {
				border-color: #f56c6c !important;
			}

			.admin {
				color: #409eff;
				font-weight: 500;
			}
		}
	}
}
</style>
