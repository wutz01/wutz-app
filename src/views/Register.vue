<template lang="pug">
v-container
	v-layout(row)
		v-flex(xs10, offset-xs1)
			h3.blue--text Create Account
			v-alert(error,:value="hasErrors") {{ message }}
			v-alert(success,:value="isSuccess") {{ message }}

			v-text-field(name="email",label="Email Address",v-model="newUser.email")
			v-text-field(name="password", type="password",label="Password",v-model="newUser.password")
			<!-- v-btn.blue--text.darken-1(flat) Have an account already? click here to sign in. -->
			v-btn(primary,dark,@click.native="Register") Create Account
        
</template>

<script>
	import Firebase from 'firebase'
	// import { store }
	let auth = Firebase.auth()
	export default {
		name: 'register',
		data() {
			return {
				newUser: {
					email: '',
					password: ''
				},
				message: '',
				hasErrors: false,
				isSuccess: false
			}
		},
		methods: {
			Register: function(event){
				var vm = this;
      			vm.message = '';
			    vm.hasErrors = false;

				if (vm.email === '' || vm.password === '') {
					vm.message = "Please provide the email and password"
			  		vm.hasErrors = true;
					return;
				}
			      // Sign-in the user with the email and password
				auth.createUserWithEmailAndPassword(vm.newUser.email, vm.newUser.password)
					.then(function (data) {
				  		// this.$store.state.user = auth.currentUser;
				  		vm.message = "Successfully registered."
				  		vm.isSuccess = true;
				  		this.router.push('/')
					}).catch(function(error) {
				  		vm.message = error.message;
				  		vm.hasErrors = true;
					});

			}
		}
	}
</script>