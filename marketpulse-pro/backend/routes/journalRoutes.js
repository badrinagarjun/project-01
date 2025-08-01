import express from 'express';
import JournalEntry from '../models/JournalEntry.js';

const router = express.Router();

// GET all journal entries
router.get('/', async (req, res) => {
  try {
    const entries = await JournalEntry.find().sort({ tradeDate: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new journal entry
router.post('/', async (req, res) => {
  const entry = new JournalEntry({
    symbol: req.body.symbol,
    tradeType: req.body.tradeType,
    quantity: req.body.quantity,
    price: req.body.price,
    notes: req.body.notes
  });

  try {
    const newEntry = await entry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// DELETE a journal entry
router.delete('/:id', async (req, res) => {
  try {
    const entry = await JournalEntry.findByIdAndDelete(req.params.id);
    if (!entry) return res.status(404).json({ message: 'Cannot find entry' });
    res.json({ message: 'Deleted journal entry' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// PUT (update) a journal entry
router.put('/:id', async (req, res) => {
  try {
    const updatedEntry = await JournalEntry.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true } // This option returns the updated document
    );
    res.json(updatedEntry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;