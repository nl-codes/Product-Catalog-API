export const attachRole = (role) => (req, res, next) => {
    req.body.role = role;
    next();
};
