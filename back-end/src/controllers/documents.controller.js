const documentsController = {};

const Documents = require('../models/Document');

documentsController.getDocuments = async(req, res) => {
    try{
        await Documents.find( {userID: req.userId}, { userID: 0, content: 0}, (error, documents) => {

            if (error) {
                return res.json({ status: 400, success: false, error: error.errmsg })
            }
            if (!documents.length) {
                return res
                    .json({ status: 404, success: false, error: `Have not documents` })
            }

            return res.json({
                status: 200,
                success: true,
                documents
            });

        });
    }catch (error){
        return res.json({
            status: 400,
            success: false,
            message: `Error: ${error}`
        });
    }
}

documentsController.getDocument = async(req, res) => {
    try{
        const { id } = req.body;

        await Documents.findById( (id), async(error, document) => {

            if (!document || document.userID != req.userId) {
                return res
                    .json({ status: 404, success: false, error: `Document not found` })
            }
            if (error) {
                return res.json({ status: 400, success: false, error })
            }

            document = document.toObject();
            delete document.userID; 
            return res.json({
                status: 200,
                success: true,
                document
            });

        }).catch((error) => {console.log(error)});
    }catch (error){
        return res.json({
            status: 400,
            success: false,
            message: `Error: ${error}`
        });
    }
}

documentsController.createDocument = async(req, res) =>{
    try{
        const { title, content } = req.body; 
 
        if(!req.body){
            return res.json({
                status: 400,
                success: false,
                error: 'You must provide a document',
            })
        }

        const newDocument = new Documents({ userID: req.userId, title, content });
    
        if (!newDocument) {
            return res.json({ status: 400, success: false, error: err.errmsg });
        }
        
        /*const repeatTitle = await Documents.countDocuments({userID: req.userId, title: title});
        if( repeatTitle > 0 ){
            newDocument.title = `${title} (${repeatTitle})`;
            console.log(repeatTitle)
        }*/

        await newDocument.save();
        
        
        return res.json({
            status: 201,
            success: true,
            message: 'Document created',
            newDocument,
        })

    }catch (error){
        
        if(error.code == 11000){
            return res.json({
                status: 400,
                success: false,
                error: `Note not created, The ${Object.keys(error.keyValue)} already exists`
            });
        }
        return res.json({
            status: 400,
            success: false,
            error: error.message
        });
    }
}  

documentsController.updateDocument = async(req, res) => {
    try{
        const { _id, updateContent } = req.body;

        if(!req.body){
            return res.json({
                status: 400,
                success: false,
                error: 'You must provide a atributes with values',
            })
        }

        const updateDocument = await Documents.findOneAndUpdate( { _id }, //findOneAndUpdate( { name: req.params.name } 
            updateContent,
            { returnOriginal: false }
        );
        //DECIR QUE NO SE ENCONTRO EL USUARIO
        return res.json({
            status: 200,
            success: true,
            updatedAt: updateDocument.updatedAt,
            message: 'Dcoument updated!',
        })
    }catch(error){
        return res.json({
            status: 400,
            success: false,
            error: error.message
        }); 
    }
}

documentsController.deleteDocument = async(req, res) => {
    try{
        const { id } = req.query;
        await Documents.findByIdAndDelete( (id), (error, document) =>{

            if (!document) {
                return res
                    .json({ status: 404, success: false, error: `Document not found` });
            }

            if (error) {
                return res.json({ status: 400, success: false, error: error})
            }

            return res.json({ status: 200, success: true, message: `Document ${document.title} deleted!`});

        });

    }catch (error){
        return res.json({
            status: 400,
            success: false,
            error: error.message
        });
    }
}

module.exports = documentsController;