export function handlePostLoginRedirect(user, navigate) {
  if (user) {
    navigate("/user/courses");
  }
}
