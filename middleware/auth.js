import Cookies from 'js-cookie'

export default function ({ store, error, redirect }) {
  console.log('$$$$ Cookies.get(token): ')
  console.log(Cookies.get('token'))
  if (!store.state.user.token) {
    if(Cookies.get('token')) {
      
      this.$store.commit('user/SET_TOKEN', Cookies.get('token'))
      this.$store.commit('user/SET_USERINFO', Cookies.get('userInfo'))
    } else {
      redirect('/login')
    }
  }
}
