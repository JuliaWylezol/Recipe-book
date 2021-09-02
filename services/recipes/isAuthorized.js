const isAuthorized = (recipe, session) => {
  if (!session) return false;
  if (session.user.id === recipe.users[0]) return true;

  return false;
};

export default isAuthorized;
