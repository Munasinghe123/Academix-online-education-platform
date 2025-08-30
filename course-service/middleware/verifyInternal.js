
module.exports = (req, res, next) => {
  const expected = process.env.INTERNAL_SECRET;
  if (!expected) {
    return res.status(500).json({ message: 'INTERNAL_SECRET not configured' });
  }
  const provided = req.get('x-internal-secret');
  if (provided !== expected) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};
