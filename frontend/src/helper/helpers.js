export const getSender = (currentUser, user) => {
  return user._id === currentUser._id ? user.name : "Bot Ngaos";
};
