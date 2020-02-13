const Entry = require('../models/entry');

exports.get_entries = async (req, res, next) => {
    try {
        const allEntries = await Entry.find().populate('userId', '-password -__v').exec();
        if (allEntries.length > 0){
            const data = {
                count: allEntries.length,
                entries: allEntries.map( entry => {
                    return {
                        name: entry.name,
                        description: entry.description,
                        category: entry.category,
                        date: entry.date,
                        image: entry.image,
                        privacy: entry.privacy,
                        user: entry.userId,
                        _id: entry.id,
                        request: {
                            type: 'GET',
                            url: process.env.DOMAIN + 'entry/' + entry.id
                        }
                    }
                })
            }
            res.status(200).json(data);
        } else {
            res.status(200).json({
                message: 'Bucket list is empty...'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
}

exports.create_entry = async (req, res, next) => {
    const entry = new Entry({
        // _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        date: req.body.date,
        image: req.body.image,
        privacy: req.body.privacy,
        userId: req.body.userId
    });

    try{
        const data = await entry.save();
        res.status(201).json({
            message: "Entry has been successfully created",
            entry: {
                name: data.name,
                description: data.description,
                category: data.category,
                date: data.date,
                image: data.image,
                privacy: data.privacy
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
}

exports.get_entry_by_id = async (req, res, next) => {
    const id = req.params.entryId;
    try {
        const data = await Entry.findById(id).exec();
        console.log(data);
        if (data){
            res.status(200).json({
                entry: {
                    name: data.name,
                    description: data.description,
                    category: data.category,
                    date: data.date,
                    image: data.image,
                    privacy: data.privacy
                },
                request: {
                    type: 'GET',
                    description: 'To look for all public entries',
                    url: process.env.DOMAIN,
                }
            });
        } else {
            res.status(404).json({
                status: '404',
                message: 'Entry does not exist...'
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
}

exports.update_entry = async (req, res, next) => {
    const id = req.params.entryId;
    const updatedEntry = {};
    for (const key of req.body){
        updatedEntry[key.propName] = key.value; 
    }

    try {
        await Entry.update({_id: id}, { $set: updatedEntry }).exec();
        res.status(400).json({
            message: "Entry has been updated...",
            request: {
                type: 'GET',
                description: 'To look at the updated entry',
                url: process.env.DOMAIN + 'entry/' + id
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
}

exports.delete_entry = async (req, res, next) => {
    const id = req.params.entryId;
    try {  
        const data = await Entry.deleteOne({_id: id}).exec();
        res.status(200).json({
            entry: data,
            message: 'Entry successfully deleted...'
        })
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

exports.get_entries_by_userId = async (req, res, next) => {
    const user_id = req.params.userId;
    try {
        const userEntries = await Entry.find({userId: user_id}).exec();
        res.status(400).json({
            count: userEntries.length,
            entries: userEntries.map(entry => {
                return {
                    name: entry.name,
                    description: entry.description,
                    category: entry.category,
                    date: entry.date,
                    image: entry.image,
                    privacy: entry.privacy
                }
            })
        });
    } catch (error) {
        res.status(500).json({ error: error });
    }
}