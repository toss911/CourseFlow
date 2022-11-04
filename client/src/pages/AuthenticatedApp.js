const logout = () => {
	localStorage.removeItem("token")
	setState({ user: null })
};