import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import moment from 'moment';
import {
    getDocuments,
    getDocument,
    createDocument,
    updateDocument,
    deleteDocument,
    textAnalyze
} from '../../../services';
import './index.scss'

//CAMBIAR FORMATO DE CLASS FUNCTION A FUNCTIONAL COMPONENTS(HOOK)
//IMPLEMENTAR AUTOSIZE PARA TEXTAREA
export default class MyConversation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            document: {
                title: '',
                content: '',
                processContent: []
            },
            documents: [],
            isLoadPredicction: false,
            isDrop: false,
            isReady: false,//ver casos en los que sirve
            isCreate: true,
        }
    }

    componentDidMount = async () => {

        await this.getListDocuments();

        if (this.props.match.params.documentId) {
            await this.documentInformation(this.props.match.params.documentId);
        }

    }

    getListDocuments = async () => {
        try {
            const documents = await getDocuments();
            if (documents.success) {
                this.setState({ documents: documents.documents.reverse() })
            } else {
                toast.info(documents.error);
            }
        } catch (error) {
            toast.error(error);
        }
    }

    documentInformation = async (idDocument) => {
        try {
            const { document, success, error } = await getDocument(idDocument);

            if (success) {
                const { title, content } = document;
                this.setState({ document: { title, content, processContent: [] }, isCreate: false, isDrop: false });
            }
            else {
                toast.error(error);
                this.props.history.push('/myconversations');
            }
        } catch (error) {
            toast.error(error);
        }
    }

    saveDocument = async () => {

        const { documents } = this.state;
        const { _id, title, content } = this.state.document;
        let response;

        if (_id) {
            response = await updateDocument(_id, title, content);
            if (response.success) {
                const indexUpdateDocument = documents.findIndex(documentInArray => documentInArray._id === _id);
                documents[indexUpdateDocument].title = title;
                documents[indexUpdateDocument].updatedAt = response.updatedAt;
                this.setState({ documents });
                return toast.success(response.message);
            }
        }
        else {
            response = await createDocument(title, content);
            if (response.success) {
                const { createdAt, updatedAt, title, _id } = response.newDocument;
                documents.unshift({ createdAt, updatedAt, title, _id });
                this.setState({ documents });
                this.newDocument();
                return toast.success(response.message);
            }
        }

        return toast.error(response.error);
    }

    deleteDocument = async (title, idDocument, index) => {
        try {

            if (window.confirm(`Seguro desea eliminar el documento ${title}`)) {

                const { documents } = this.state;
                const response = await deleteDocument(idDocument);
                if (response.success) {

                    documents.splice(index, 1);
                    this.setState({ documents });

                    if (this.props.match.params.documentId === idDocument) {
                        this.props.history.push('/myconversations');
                        this.newDocument();
                    }

                    return toast.success(response.message);

                }
                else {
                    return toast.error(response.error);
                }
            }
            return;

        } catch (error) {
            toast.error(error);
        }
    }

    newDocument = () => {
        this.setState({
            document: {
                title: '',
                content: '',
                processContent: []
            },
            isDrop: false,
            isReady: true,
            isCreate: true,
        });
    }

    handleDrop = () => {
        const { isDrop } = this.state;
        this.setState({ isDrop: !isDrop });
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        const { document } = this.state;
        document[name] = value;
        this.setState({ document });
    }

    emotionalPredicction = async () => {
        try { 
            this.setState({isLoadPredicction: true});
            let { document } = this.state;
            const response = await textAnalyze(document.content);
            if (response.success) {
                document.processContent = response.data;
                return this.setState({ document, isLoadPredicction: false });
            }
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    //VER TEMA DE DIFERENTES PROPS || VER SITUACIONES EN QUE EL TITULO  ES MUY LARGO || hacer texto responsivo

    render() {
        const { isDrop, isCreate, isLoadPredicction, document, documents } = this.state;
        const buttonTitle = isCreate ? 'Save' : 'Update';
        return (
            <>
                {
                    <>
                        <div className='btn-group'>
                            <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded={isDrop ? true : false} onClick={() => this.handleDrop()}>
                                <h1>Your <div className={isDrop ? 'rotate-letter' : ''}> Notes</div></h1>
                            </button>
                            <ul className={`dropdown-menu dropdown-menu-dark ${!isDrop ? 'close' : ''}`}>
                                <li className='list-notes' ><Link to='#' className="dropdown-item disabled" type="button">Last note</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                {   
                                    documents.length > 0 ?
                                        documents.map((document, index) => (
                                            <li className='list-notes' key={index}>
                                                <Link to={{ pathname: `/myconversations/${document._id}` }} className="dropdown-item" type="button" onClick={() => this.documentInformation(document._id)}>
                                                    <p><b>Name</b>: <i className="capitalize" >{document.title}</i> </p>
                                                    <div>
                                                        <p><b>Date</b>: <i>{moment(`${document.createdAt}`).format("dddd, DD-MM-YYYY, LT")}</i></p>
                                                        <p><b>Update</b>: <i>{moment(`${document.updatedAt}`).format("dddd, DD-MM-YYYY, LT")}</i></p>
                                                    </div>
                                                </Link>
                                                <button className="btn btn-danger" onClick={() => this.deleteDocument(document.title, document._id, index)} >Delete</button>
                                            </li>
                                        ))
                                        : <li className='list-notes' ><p>Upss notes not charging :(</p></li>
                                }
                                <li className='list-notes' ><Link to='#' className="dropdown-item" type="button">Something else here</Link></li>
                            </ul>
                        </div>

                        <div className="input-content">

                            <form>
                                <div className="mb-3">
                                    <input className="form-control" icon="envelope" type="text" name="title" value={document.title} onChange={(event) => this.handleChange(event)} placeholder="Title" />
                                </div>
                                <div className="mb">
                                    <textarea name="content" value={document.content} onChange={(event) => this.handleChange(event)} placeholder="Content"></textarea>
                                </div>
                            </form>

                        </div>
                        <div>
                            {
                                isLoadPredicction ? 
                                    <div className="spinner-grow text-primary" role="status"/>
                                :
                                    document.processContent.length > 0 ?
                                        <p>
                                            {
                                                document.processContent.map(({ keyword, color }, index) => (
                                                    <span key={index} style={{ color: `${color}` }}>{keyword} </span>
                                                ))
                                            }
                                        </p>
                                        : null
                            }
                        </div>

                        <div className="buttons-content">
                            <Link className={` btn btn-secondary ${isCreate ? 'd-none' : ''}`} role="button" onClick={this.newDocument} to='/myconversations' >New note</Link>
                            <button className="btn btn-secondary" onClick={() => this.saveDocument()} >{buttonTitle}</button>
                            <button className="btn btn-secondary" onClick={() => this.emotionalPredicction()} >Make a precction</button>
                        </div>
                    </>
                }

            </>
        );
    }

}