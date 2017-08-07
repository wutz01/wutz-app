<template lang="pug">
	v-dialog(v-model="loginToggle", persistent, width="600px")
	    v-card
	      v-alert(error,:value="hasErrors") {{ message }}
	      v-card-title
	        span.headline Login
	      v-card-text
	        v-text-field(name="email",label="Email Address",v-model="email")
	        v-text-field(name="password", type="password",label="Password",v-model="password")
	      v-card-actions
	        v-spacer
	        v-btn.blue--text.darken-1(flat, @click.native="toggleLogin") Close
	        v-btn(primary, dark,@click.prevent="Login") Login
</template>

<script>
	import Firebase from 'firebase'
	let auth = Firebase.auth()
	export default {
		name: 'login',
		props: {
			loginForm: {
				type: Boolean,
				required: true
			}
		},
		data() {
			return {
				loginToggle: this.loginForm,
				email: '',
				password: '',
				message: '',
				hasErrors: false,
				userName: ''
			}
		},
		methods: {
			toggleLogin: function(){
				this.loginToggle = false
				this.$emit('closeParentLogin');
			},
			Login: function(event){
				var vm = this;
      			vm.message = '';
			    vm.hasErrors = false;

				if (vm.email === '' || vm.password === '') {
					vm.message = 'Please provide the email and password'
					vm.hasErrors = true;
					return;
				}
			      // Sign-in the user with the email and password
				auth.signInWithEmailAndPassword(vm.email, vm.password)
					.then(function (data) {
				  		// this.$store.state.user = auth.currentUser;
				  		console.log('Welcome!')
				  		this.email = ''
				  		this.password = ''
				  		vm.toggleLogin()
					}).catch(function(error) {
				  		vm.message = error.message;
				  		console.log(vm.message);
				  		vm.hasErrors = true;
					});

			}
		},
		watch: {
			loginForm: function(){
				this.loginToggle = this.loginForm
			}
		}
	}
</script>