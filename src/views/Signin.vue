<template lang="pug">
  v-layout(row)
    v-flex(xs6).blue.frm-container.img-container
      div.txtHolder
        h2.white--text
          strong Nexus
        p.white--text A nexus of ideas and conversation.
        p.white--text Join us now...
        v-btn.white--text.lighten-1(flat, router, to="/register") click here to create your account

    v-flex(xs6).frm-container
      h3.blue--text Sign in
      div.mb-2
        i Let's start sharing ideas!
      v-alert(error,:value="hasErrors") {{ message }}
      v-alert(success,:value="isSuccess") {{ message }}

      v-text-field(name="email",label="Email Address",v-model="User.email")
      v-text-field(name="password", type="password",label="Password",v-model="User.password",@keyup.enter="Login")

      v-btn(primary,dark,@click.prevent="Login",:loading="loading", :disabled="loading", :class="loading ? 'blue--text' : ''") Sign in

</template>

<script>
	import Firebase from 'firebase'
	let auth = Firebase.auth()
	export default {
		name: 'login',
		data() {
			return {
				User: {
					email: '',
					password: '',
				},
				message: '',
				hasErrors: false,
				isSuccess: false,
        loader: null,
        loading: false
			}
		},
		methods: {
			Login: function(event){
				var vm = this;
      	vm.message = '';
			  vm.hasErrors = false;

				if (vm.email === '' || vm.password === '') {
					vm.message = "Please provide the email and password"
			  		vm.hasErrors = true;
					return;
				}

        vm.loader = 'loading'
        vm.loading = true
			      // Sign-in the user with the email and password
				auth.signInWithEmailAndPassword(vm.User.email, vm.User.password)
					.then(function (data) {
				  		vm.message = "Successfully Login."
				  		vm.isSuccess = true;
              vm.loader = null;
							vm.loading = false;
				  		vm.$router.push('/');
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
		padding: 26% 10%;
	}
	.img-container {
		background: url('../assets/macbook2.jpg');
		background-size: cover;
	}
</style>
