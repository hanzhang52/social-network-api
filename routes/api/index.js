const router = require('express').Router();
const userRoutes = require('./users-routes');
const thoughtsRoutes = require('./thoughts-routes');

router.use('/users', userRoutes);
router.use('/toughts', thoughtsRoutes);

module.exports = router;
