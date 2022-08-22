import React, {useState} from 'react';

import styled from 'styled-components';

const StyledFileUploader = styled.label`
    border: 1px solid #4CAF50;
    border-radius: 5px;
    width: 120px;
    padding: 5px 8px;
    font-size: 14px;
    text-align: center;
    cursor: pointer;
    color: #4CAF50;
    transition: all 0.3s ease-in-out;
    &:hover {
        background-color: #4CAF50;
        color: #fff;
    }
    &:active {
        transform: translateY(2px);
    }
`;

const StyledFileName = styled.span`
    display: block;
    font-size: 15px;
    margin-top: 5px;
`;

export default function ScannerSlotFileUpload({ onFileSelectSuccess }) {

    const supportedFiles = ['application/pdf','image/png','image/jpeg'];
    const supportedFileEnds = supportedFiles.map(file => file.split('/')[1]).join(', ');
    const [fileName, setFileName] = useState("");
    const handleFileInput = (e) => {
        const files = e.target.files;
        onFileSelectSuccess(files);
    };

    return (
        <div className="file-uploader" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <StyledFileUploader>
                <input style={{display: "none"}} type="file" onChange={handleFileInput} accept={supportedFiles.join(",")} multiple />
                Slot QR Code
            </StyledFileUploader>
            <StyledFileName>{fileName}{fileName==="" && `Supports: ${supportedFileEnds}`}</StyledFileName>
        </div>
    );
};
