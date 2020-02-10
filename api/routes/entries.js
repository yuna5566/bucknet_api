const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const EntriesController = require('../controllers/EntryController');


router.get('/', EntriesController.get_entries);

router.post('/', auth, EntriesController.create_entry);

router.get('/:entryId', auth, EntriesController.get_entry_by_id);

router.patch('/:entryId', auth, EntriesController.update_entry);

router.delete('/:entryId', auth, EntriesController.delete_entry);

module.exports = router;