const db = require('../firebaseAdmin');

module.exports = async (req, res) => {
  const snapshot = await db.ref('/presencas').once('value');
  const presencas = snapshot.val() || [];
  res.status(200).json(presencas);
};
