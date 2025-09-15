export const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: User not authenticated'
    });
  }

  if (req.user.role === 'Admin') {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: 'Only Admin has access to this functionality'
    });
  }
};
