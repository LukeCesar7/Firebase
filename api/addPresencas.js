const db = require('../firebaseAdmin');

module.exports = async (req, res) => {
  const { ra, codigo } = req.body;

  if (!ra || !codigo) {
    return res.status(400).json({ error: 'RA e código são necessários' });
  }

  const ref = db.ref('/presencas');
  const newPresencaRef = ref.push();
  await newPresencaRef.set({ ra, codigo });

  res.status(201).json({ success: true });
};
