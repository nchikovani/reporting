import React from 'react';
import PropTypes from "prop-types";
import {Document, Page, pdfjs} from "react-pdf";
import {Button, Typography} from "@material-ui/core";
import store from "../../store";
import {openModal} from "../../actions";
import TaskCreate from './TaskCreate';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class PdfView extends React.Component {
    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
    }
    async handleSave() {
        if (!this.startX) {
            alert('Укажите место подписи');
            return;
        }
        const {values, pdfFile, setTasks} = this.props,
            documentElement =document.querySelector('.pdf-view__document-container'),
            documentCoords = documentElement && documentElement.getBoundingClientRect();

        store.dispatch(openModal(<TaskCreate
            task={{
                title: values.title,
                description: values.description,
                type: values.type,
                deadline: values.deadline,
                extension: {
                    pdfFile: pdfFile,
                    signatureInfo: {
                        x: this.startX/documentCoords.width,
                        y: 1-((this.startY+this.height)/documentCoords.height),
                        width: this.width/documentCoords.width,
                        height: this.height/documentCoords.height,
                    }
                },
            }}
            setTasks={setTasks}
            action='create'
        />));
    }
    documentMouseDown(event) {
        const signatureElement =document.querySelector('.pdf-view__signature-field'),
            documentElement =document.querySelector('.pdf-view__document-container'),
            documentCoords = documentElement && documentElement.getBoundingClientRect();
        this.mouseDown = true;
        this.startX = event.clientX - documentCoords.left;
        this.startY = event.clientY - documentCoords.top;
        signatureElement.style.display = 'block';
        signatureElement.style.top = this.startY +'px';
        signatureElement.style.left = this.startX +'px';
        signatureElement.style.height = '0px';
        signatureElement.style.width = '0px';
    }
    documentMouseMove(event) {
        const signatureElement =document.querySelector('.pdf-view__signature-field'),
            documentElement =document.querySelector('.pdf-view__document-container'),
            documentCoords = documentElement && documentElement.getBoundingClientRect();
        if (this.mouseDown === false) return;
        this.height = event.clientY - documentCoords.top - this.startY;
        this.width = event.clientX - documentCoords.left - this.startX
        signatureElement.style.height = this.height +'px';
        signatureElement.style.width = this.width +'px';
    }
    documentMouseUp(event) {
        this.mouseDown = false;
    }
    render() {
        return (
            <div className='pdf-view'>
                <Typography className='pdf-view__text'>Укажите место подписи</Typography>
                <div className="pdf-view__document-container"
                     onMouseDown={(e) => this.documentMouseDown(e)}
                     onMouseMove={(e) => this.documentMouseMove(e)}
                     onMouseUp={(e) => this.documentMouseUp(e)}
                >
                    <Document
                        file={this.props.pdfFile}
                    >
                        <Page pageNumber={1} height={750}/>

                    </Document>
                    <div className="pdf-view__signature-field"/>
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    className="pdf-view__button-save"
                    onClick={this.handleSave}
                >Сохранить</Button>
            </div>
        );
    }
}
PdfView.propTypes = {
    values: PropTypes.object,
    pdfFile: PropTypes.string,
    setTasks: PropTypes.func,
};
export default PdfView;