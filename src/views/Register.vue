<template lang="pug">
	v-layout(row)
		v-flex(xs6).blue.frm-container.img-container
			div.txtHolder
				h2.white--text
					strong Wutz
				h2.white--text(style="line-height: 10px")
					strong Application
				br
				p.white--text A place for every conversation.
				p.white--text Have an account already?
				v-btn.lighten-1(router, to="/login", primary, flat).white--text.text-xs-right Click here to sign in

		v-flex(xs6).frm-container
			h3.blue--text Create Account
			div.mb-2
				i Don't have an account yet? Create your account now.
			v-alert(error,:value="hasErrors") {{ message }}
			v-alert(success,:value="isSuccess") {{ message }}

			v-text-field(name="displayName",label="Name",v-model="newUser.displayName")
			v-text-field(name="email",label="Email Address",v-model="newUser.email")
			v-text-field(name="password", type="password",label="Password",v-model="newUser.password",@keyup.enter="Register")
			v-btn(primary,dark,@click.native="Register",:loading="loading", :disabled="loading",:class="loading ? 'blue--text' : ''") Create Account

</template>

<script>
	import Firebase from 'firebase'
	import db from '../db'
	import router from '../router'
	let auth = Firebase.auth()
	export default {
		name: 'register',
		data() {
			return {
				newUser: {
					email: '',
					password: '',
					displayName: ''
				},
				message: '',
				hasErrors: false,
				isSuccess: false,
				loading: false,
				loader: null
			}
		},
		methods: {
			Register: function(event){
				var vm = this;
      			vm.message = '';
			    vm.hasErrors = false;

				if (vm.newUser.email === '' || vm.newUser.password === '' || vm.newUser.displayName === '') {
						vm.message = "Please provide the name, email, and password"
			  		vm.hasErrors = true;
						return;
				}

				vm.loading = true;
				vm.loader = 'loading3';
			      // Sign-in the user with the email and password
				auth.createUserWithEmailAndPassword(vm.newUser.email, vm.newUser.password)
					.then(function (data) {
				  		// this.$store.state.user = auth.currentUser;
							// var user = auth.currentUser;
							var url = "https://randomuser.me/api/portraits/men/" + Math.ceil(Math.random()*100) + ".jpg"
							data.updateProfile({
							  displayName: vm.newUser.displayName,
							  photoURL: url
							});
							db.ref('users').push({email: vm.newUser.email, online: true, location: '', user: vm.newUser.displayName, avatar: url});
							vm.message = "Successfully registered."
							vm.isSuccess = true;
							vm.loader = null;
							vm.loading = false;
							router.push('/')
					}).catch(function(error) {
				  		vm.message = error.message;
				  		vm.hasErrors = true;
							vm.loader = null;
							vm.loading = false;
					});

			}
		}
	}
</script>

<style scoped>
	.frm-container{
		padding: 20% 10%
	}
	.img-container {
		background: url('../assets/macbook2.jpg');
		background-size: cover;
	}
</style>
